import '@testing-library/jest-dom'

// Mock GSAP
vi.mock('gsap', () => ({
  default: {
    timeline: vi.fn(() => ({
      from: vi.fn().mockReturnThis(),
      to: vi.fn().mockReturnThis(),
      play: vi.fn().mockReturnThis(),
      reverse: vi.fn().mockReturnThis(),
      pause: vi.fn().mockReturnThis(),
    })),
    fromTo: vi.fn(),
    to: vi.fn(),
    from: vi.fn(),
    set: vi.fn(),
    registerPlugin: vi.fn(),
    defaults: vi.fn(),
    utils: {
      toArray: vi.fn((selector) => Array.from(document.querySelectorAll(selector)))
    }
  },
  ScrollTrigger: {}
}))

// Mock Three.js
vi.mock('three', () => ({
  Scene: vi.fn(() => ({
    add: vi.fn(),
    remove: vi.fn(),
    children: []
  })),
  OrthographicCamera: vi.fn(() => ({
    position: { z: 0 },
    updateProjectionMatrix: vi.fn()
  })),
  WebGLRenderer: vi.fn(() => ({
    setSize: vi.fn(),
    setClearColor: vi.fn(),
    render: vi.fn(),
    dispose: vi.fn(),
    domElement: document.createElement('canvas')
  })),
  Vector2: vi.fn(() => ({
    distanceTo: vi.fn(() => 100),
    lerpVectors: vi.fn().mockReturnThis(),
    add: vi.fn().mockReturnThis(),
    normalize: vi.fn().mockReturnThis(),
    multiplyScalar: vi.fn().mockReturnThis()
  })),
  BufferGeometry: vi.fn(() => ({
    setAttribute: vi.fn(),
    dispose: vi.fn()
  })),
  Float32BufferAttribute: vi.fn(),
  ShaderMaterial: vi.fn(() => ({
    uniforms: { time: { value: 0 }, opacity: { value: 1 } },
    dispose: vi.fn()
  })),
  Line: vi.fn(),
  AdditiveBlending: 'AdditiveBlending'
}))

// Mock window.matchMedia for reduced motion
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock requestAnimationFrame
global.requestAnimationFrame = vi.fn((cb) => setTimeout(cb, 16)) as any
global.cancelAnimationFrame = vi.fn(clearTimeout) as any