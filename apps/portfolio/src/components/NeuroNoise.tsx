import { useLayoutEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { getReducedMotionPreference } from '@/lib/utils'

interface NeuroNoiseProps {
  opacity?: number
  speed?: number
}

function NeuroNoiseShader({ opacity = 0.3, speed = 0.5 }: NeuroNoiseProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const timeRef = useRef(0)
  
  const vertexShader = `
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `
  
  const fragmentShader = `
    uniform float u_time;
    uniform float u_opacity;
    uniform vec2 u_resolution;
    varying vec2 vUv;
    
    // Noise function
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }
    
    float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      
      vec2 u = f * f * (3.0 - 2.0 * f);
      
      return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }
    
    // Neural network-inspired patterns
    float neuroPattern(vec2 uv, float time) {
      vec2 pos = uv * 8.0;
      
      // Base noise layers
      float n1 = noise(pos + time * 0.3);
      float n2 = noise(pos * 2.0 - time * 0.5) * 0.5;
      float n3 = noise(pos * 4.0 + time * 0.2) * 0.25;
      
      // Neural connections pattern
      vec2 grid = fract(pos) - 0.5;
      float connections = smoothstep(0.8, 1.0, 1.0 - length(grid)) * 0.3;
      
      // Synaptic pulses
      float pulse = sin(time * 2.0 + pos.x * 0.5 + pos.y * 0.3) * 0.1;
      
      return (n1 + n2 + n3 + connections + pulse) * 0.4;
    }
    
    void main() {
      vec2 uv = vUv;
      
      // Create neural noise pattern
      float pattern = neuroPattern(uv, u_time);
      
      // Dark red/black color scheme
      vec3 color1 = vec3(0.04, 0.04, 0.05); // Very dark background
      vec3 color2 = vec3(0.12, 0.02, 0.02); // Dark red
      vec3 color3 = vec3(0.25, 0.05, 0.05); // Medium dark red
      
      // Mix colors based on pattern
      vec3 finalColor = mix(color1, color2, pattern);
      finalColor = mix(finalColor, color3, pattern * 0.5);
      
      // Add subtle red highlights
      float highlight = smoothstep(0.7, 1.0, pattern);
      finalColor += vec3(0.15, 0.02, 0.02) * highlight;
      
      gl_FragColor = vec4(finalColor, u_opacity);
    }
  `
  
  const uniforms = {
    u_time: { value: 0 },
    u_opacity: { value: opacity },
    u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
  }
  
  useFrame((state, delta) => {
    if (!getReducedMotionPreference() && meshRef.current) {
      timeRef.current += delta * speed
      const material = meshRef.current.material as THREE.ShaderMaterial
      material.uniforms.u_time.value = timeRef.current
    }
  })
  
  useLayoutEffect(() => {
    const handleResize = () => {
      if (meshRef.current) {
        const material = meshRef.current.material as THREE.ShaderMaterial
        material.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight)
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  return (
    <mesh ref={meshRef} scale={[2, 2, 1]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={true}
      />
    </mesh>
  )
}

export function NeuroNoise({ opacity = 0.3, speed = 0.5 }: NeuroNoiseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  // Fallback for reduced motion - static dark background
  if (getReducedMotionPreference()) {
    return (
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(17, 18, 21, 0.8) 0%, rgba(11, 11, 13, 0.9) 100%)',
          opacity: opacity
        }}
      />
    )
  }
  
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        ref={canvasRef}
        style={{ 
          width: '100%', 
          height: '100%',
          background: 'transparent'
        }}
        camera={{ 
          position: [0, 0, 1],
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        gl={{
          alpha: true,
          premultipliedAlpha: false,
          powerPreference: "low-power"
        }}
      >
        <NeuroNoiseShader opacity={opacity} speed={speed} />
      </Canvas>
    </div>
  )
}