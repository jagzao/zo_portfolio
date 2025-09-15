import * as THREE from 'three'
import { getReducedMotionPreference } from './utils'

export interface RayToTarget {
  x: number
  y: number
}

export class ElectricRayRenderer {
  private scene: THREE.Scene
  private camera: THREE.Camera
  private renderer: THREE.WebGLRenderer
  private container: HTMLElement
  private animationId: number | null = null
  
  constructor(container: HTMLElement) {
    this.container = container
    this.scene = new THREE.Scene()
    
    // Setup camera
    const rect = container.getBoundingClientRect()
    this.camera = new THREE.OrthographicCamera(
      rect.width / -2, rect.width / 2,
      rect.height / 2, rect.height / -2,
      1, 1000
    )
    this.camera.position.z = 1
    
    // Setup renderer
    this.renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "low-power"
    })
    this.renderer.setSize(rect.width, rect.height)
    this.renderer.setClearColor(0x000000, 0)
    
    // Configure canvas to be behind logo
    const canvas = this.renderer.domElement
    canvas.style.position = 'absolute'
    canvas.style.top = '0'
    canvas.style.left = '0'
    canvas.style.zIndex = '1'
    canvas.style.pointerEvents = 'none'
    
    container.appendChild(canvas)
  }
  
  createLightningPath(start: THREE.Vector2, end: THREE.Vector2): THREE.Vector2[] {
    const points: THREE.Vector2[] = []
    const distance = start.distanceTo(end)
    const segments = Math.floor(distance / 20) + 5
    
    points.push(start)
    
    for (let i = 1; i < segments; i++) {
      const t = i / segments
      const lerped = new THREE.Vector2().lerpVectors(start, end, t)
      
      // Add noise for lightning effect
      const noise = (Math.random() - 0.5) * 30 * (0.5 - Math.abs(t - 0.5))
      const perpendicular = new THREE.Vector2(-(end.y - start.y), end.x - start.x).normalize()
      
      lerped.add(perpendicular.multiplyScalar(noise))
      points.push(lerped)
    }
    
    points.push(end)
    return points
  }
  
  createLightningGeometry(points: THREE.Vector2[]): THREE.BufferGeometry {
    const positions: number[] = []
    const colors: number[] = []
    
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i]
      const next = points[i + 1]
      
      // Main line
      positions.push(current.x, current.y, 0)
      positions.push(next.x, next.y, 0)
      
      // Colors (red gradient with alpha falloff)
      const alpha = 1 - (i / points.length)
      const t = i / (points.length - 1)
      
      // Red gradient (#FF3B3B → #E53935)
      const r = 1.0
      const g = 0.23 + (0.12 * t) // 0.23 → 0.35
      const b = 0.23 + (0.08 * t) // 0.23 → 0.31
      
      colors.push(r, g, b, alpha)
      colors.push(r, g, b, alpha * 0.8)
    }
    
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 4))
    
    return geometry
  }
  
  createLightningMaterial(): THREE.ShaderMaterial {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        opacity: { value: 1 }
      },
      vertexShader: `
        attribute vec4 color;
        varying vec4 vColor;
        varying vec3 vPosition;
        
        void main() {
          vColor = color;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float opacity;
        varying vec4 vColor;
        varying vec3 vPosition;
        
        void main() {
          // Flickering effect
          float flicker = sin(time * 50.0 + vPosition.x * 0.1) * 0.1 + 0.9;
          
          // Glow effect
          float glow = 1.0 + sin(time * 20.0) * 0.3;
          
          vec4 finalColor = vColor;
          finalColor.rgb *= flicker * glow;
          finalColor.a *= opacity;
          
          gl_FragColor = finalColor;
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      linewidth: 1
    })
  }
  
  rayTo(target: RayToTarget): Promise<void> {
    return new Promise((resolve) => {
      if (getReducedMotionPreference()) {
        this.createFallbackRay(target)
        resolve()
        return
      }
      
      // Clear previous animations
      if (this.animationId) {
        cancelAnimationFrame(this.animationId)
      }
      
      // Clear scene
      while (this.scene.children.length > 0) {
        this.scene.remove(this.scene.children[0])
      }
      
      const rect = this.container.getBoundingClientRect()
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      
      const start = new THREE.Vector2(0, 0) // Logo center
      const end = new THREE.Vector2(
        target.x - centerX,
        centerY - target.y
      )
      
      const lightningPoints = this.createLightningPath(start, end)
      const geometry = this.createLightningGeometry(lightningPoints)
      const material = this.createLightningMaterial()
      
      const lightning = new THREE.Line(geometry, material)
      this.scene.add(lightning)
      
      // Animate
      const startTime = Date.now()
      const duration = Math.random() * 100 + 350 // 0.35-0.45s
      
      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        material.uniforms.time.value = elapsed * 0.001
        material.uniforms.opacity.value = 1 - progress
        
        this.renderer.render(this.scene, this.camera)
        
        if (progress < 1) {
          this.animationId = requestAnimationFrame(animate)
        } else {
          // Clean up
          this.scene.remove(lightning)
          geometry.dispose()
          material.dispose()
          resolve()
        }
      }
      
      animate()
    })
  }
  
  private createFallbackRay(target: RayToTarget) {
    // Create SVG fallback for reduced motion
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    
    const rect = this.container.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    svg.style.position = 'absolute'
    svg.style.top = '0'
    svg.style.left = '0'
    svg.style.width = '100%'
    svg.style.height = '100%'
    svg.style.pointerEvents = 'none'
    svg.style.zIndex = '10'
    
    line.setAttribute('x1', centerX.toString())
    line.setAttribute('y1', centerY.toString())
    line.setAttribute('x2', target.x.toString())
    line.setAttribute('y2', target.y.toString())
    line.setAttribute('stroke', '#E53935')
    line.setAttribute('stroke-width', '1')
    line.setAttribute('stroke-dasharray', '5,5')
    
    svg.appendChild(line)
    this.container.appendChild(svg)
    
    // Simple dash animation
    let offset = 0
    const animate = () => {
      offset += 0.5
      line.setAttribute('stroke-dashoffset', (-offset).toString())
      
      if (offset < 50) {
        requestAnimationFrame(animate)
      } else {
        svg.remove()
      }
    }
    
    animate()
  }
  
  resize() {
    const rect = this.container.getBoundingClientRect()
    this.renderer.setSize(rect.width, rect.height)
    
    if (this.camera instanceof THREE.OrthographicCamera) {
      this.camera.left = rect.width / -2
      this.camera.right = rect.width / 2
      this.camera.top = rect.height / 2
      this.camera.bottom = rect.height / -2
      this.camera.updateProjectionMatrix()
    }
  }
  
  dispose() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }
    
    this.renderer.dispose()
    this.container.removeChild(this.renderer.domElement)
  }
}

// Global ray renderer instance
let rayRenderer: ElectricRayRenderer | null = null

export function initializeRayRenderer(container: HTMLElement): ElectricRayRenderer {
  if (rayRenderer) {
    rayRenderer.dispose()
  }
  
  rayRenderer = new ElectricRayRenderer(container)
  return rayRenderer
}

export function getRayRenderer(): ElectricRayRenderer | null {
  return rayRenderer
}

export function cleanupRayRenderer() {
  if (rayRenderer) {
    rayRenderer.dispose()
    rayRenderer = null
  }
}