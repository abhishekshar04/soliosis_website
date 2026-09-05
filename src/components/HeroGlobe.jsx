import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { useMediaQuery } from '../hooks/useMediaQuery'
import './HeroGlobe.css'

/* ─── Geographic Math ──────────────────────────────────────────────────────── */

/**
 * Convert lat/lng to a 3D point on a sphere of given radius.
 * Standard equirectangular texture mapping:
 * lat: -90 (South Pole) to +90 (North Pole)
 * lng: -180 to +180 (Greenwich = 0)
 */
function latLngToVector3(lat, lng, radius) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  )
}

/**
 * Generate 3D parabolic arc points between two surface coordinates.
 */
function createArc(p1, p2, altitude = 0.32, segments = 64) {
  const mid = p1.clone().add(p2).multiplyScalar(0.5)
  const dist = p1.distanceTo(p2)
  const lift = 1.0 + Math.max(0.18, Math.min(altitude, dist * 0.26))
  mid.normalize().multiplyScalar(lift)

  const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2)
  return curve.getPoints(segments)
}

/* ─── Client Locations: Exclusively US & India ─────────────────────────────── */

const US_CLIENTS = [
  { name: 'San Francisco', lat: 37.7749, lng: -122.4194, tag: 'Cloud Architecture' },
  { name: 'New York', lat: 40.7128, lng: -74.0060, tag: 'FinTech Systems' },
  { name: 'Austin', lat: 30.2672, lng: -97.7431, tag: 'Silicon Platforms' },
  { name: 'Seattle', lat: 47.6062, lng: -122.3321, tag: 'Enterprise AI' },
  { name: 'Chicago', lat: 41.8781, lng: -87.6298, tag: 'High-Frequency Data' },
]

const INDIA_CLIENTS = [
  { name: 'Bengaluru', lat: 12.9716, lng: 77.5946, tag: 'Global Tech Hub' },
  { name: 'Mumbai', lat: 19.0760, lng: 72.8777, tag: 'Financial Core' },
  { name: 'New Delhi', lat: 28.6139, lng: 77.2090, tag: 'Strategic Infrastructure' },
  { name: 'Hyderabad', lat: 17.3850, lng: 78.4867, tag: 'Cyber Systems' },
  { name: 'Chennai', lat: 13.0827, lng: 80.2707, tag: 'Software Engineering' },
]

// High-speed enterprise corridors between US and India
const CONNECTIONS = [
  { from: US_CLIENTS[0], to: INDIA_CLIENTS[0] }, // SF -> Bengaluru
  { from: US_CLIENTS[1], to: INDIA_CLIENTS[1] }, // NYC -> Mumbai
  { from: US_CLIENTS[3], to: INDIA_CLIENTS[2] }, // Seattle -> New Delhi
  { from: US_CLIENTS[2], to: INDIA_CLIENTS[3] }, // Austin -> Hyderabad
  { from: US_CLIENTS[4], to: INDIA_CLIENTS[4] }, // Chicago -> Chennai
  { from: US_CLIENTS[1], to: INDIA_CLIENTS[0] }, // NYC -> Bengaluru
  { from: US_CLIENTS[0], to: INDIA_CLIENTS[2] }, // SF -> New Delhi
]

/* ─── Atmospheric Fresnel Shader ───────────────────────────────────────────── */
const AtmosphereShader = {
  vertexShader: `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec3 vNormal;
    void main() {
      // Smooth fresnel glow that vanishes toward center and drops softly at the limb
      float intensity = pow(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.2);
      vec3 atmosphereColor = vec3(0.35, 0.65, 1.0);
      gl_FragColor = vec4(atmosphereColor, intensity * 0.85);
    }
  `,
}

export default function HeroGlobe() {
  const mountRef = useRef(null)
  const isCoarsePointer = useMediaQuery('(pointer: coarse)')

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let width = mount.clientWidth || 640
    let height = mount.clientHeight || 640

    /* ── Scene, Camera & Renderer ──────────────────────────────────────────── */
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000)

    // Read once at mount: the renderer is built here and never rebuilt,
    // so this deliberately does not track later media-query changes.
    const isTouch = window.matchMedia?.('(pointer: coarse)').matches ?? false

    const renderer = new THREE.WebGLRenderer({
      // Antialiasing is expensive on mobile GPUs and barely visible at
      // phone pixel densities, where the DPR downsample already smooths edges.
      antialias: !isTouch,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isTouch ? 1.25 : 1.5))
    renderer.setClearColor(0x000000, 0)
    renderer.domElement.style.display = 'block'
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.outline = 'none'
    renderer.domElement.style.border = 'none'
    renderer.domElement.style.cursor = 'grab'
    mount.appendChild(renderer.domElement)

    /* ── Orbit Controls (Drag to rotate Earth) ────────────────────────────── */
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false       // Disable zoom so page scroll is seamless
    controls.enablePan = false        // Keep earth centered at origin
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.6
    controls.rotateSpeed = 0.8
    controls.minPolarAngle = Math.PI * 0.18
    controls.maxPolarAngle = Math.PI * 0.82

    /* ── Let the page scroll through the globe on touch ─────────────────────
       OrbitControls sets `touch-action: none` on the canvas, which makes the
       globe swallow every vertical swipe — on a phone the hero becomes a dead
       zone the visitor cannot scroll past. Overriding to `pan-y` hands
       vertical gestures back to the browser (native page scroll) while
       horizontal drags still spin the Earth. Must run AFTER the constructor. */
    renderer.domElement.style.touchAction = 'pan-y'

    renderer.domElement.addEventListener('pointerdown', () => {
      renderer.domElement.style.cursor = 'grabbing'
    })
    renderer.domElement.addEventListener('pointerup', () => {
      renderer.domElement.style.cursor = 'grab'
    })
    // A vertical swipe becomes a page scroll and the browser cancels the
    // pointer stream — reset the cursor so it does not stay "grabbing".
    renderer.domElement.addEventListener('pointercancel', () => {
      renderer.domElement.style.cursor = 'grab'
    })

    /* ── Precise Camera Fitting: Guaranteed 0% Clipping on Any Screen ─────── */
    const fitCameraToGlobe = () => {
      const w = mount.clientWidth || 640
      const h = mount.clientHeight || 640
      width = w
      height = h
      camera.aspect = w / h

      const vFovRad = (camera.fov * Math.PI) / 180
      const hFovRad = 2 * Math.atan(Math.tan(vFovRad / 2) * camera.aspect)
      const minFovRad = Math.min(vFovRad, hFovRad)

      // Total bounding radius including Earth (1.0), atmosphere (1.14), and arcs (1.28)
      const BOUNDING_RADIUS = 1.25
      // 1.18 factor provides an assured 18% breathing margin around the outer atmosphere
      const requiredDist = (BOUNDING_RADIUS * 1.18) / Math.sin(minFovRad / 2)
      camera.position.set(0, 0, requiredDist)
      controls.target.set(0, 0, 0)
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    fitCameraToGlobe()

    /* ── Realistic Daylight & Space Lighting ──────────────────────────────── */
    // Balanced Daylight Ambient: Keeps continents, vegetation, deserts, and ice vivid
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.15)
    scene.add(ambientLight)

    // Warm Sun Key Light: Simulates solar illumination from space
    const sunLight = new THREE.DirectionalLight(0xfffaed, 2.6)
    sunLight.position.set(4.5, 2.5, 6.0)
    scene.add(sunLight)

    // Soft Blue Orbital Rim Fill: Gives celestial depth to the horizon
    const rimLight = new THREE.DirectionalLight(0x60a5fa, 0.85)
    rimLight.position.set(-6, 2, -4)
    scene.add(rimLight)

    /* ── Earth Sphere Group ────────────────────────────────────────────────── */
    const earthGroup = new THREE.Group()
    scene.add(earthGroup)

    // Realistic axial tilt (~23.4 degrees)
    earthGroup.rotation.z = 0.22

    const textureLoader = new THREE.TextureLoader()

    /* ── NASA Blue Marble Photorealistic Earth ─────────────────────────────── */
    const earthGeo = new THREE.SphereGeometry(1.0, 64, 64)
    const earthMat = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      specular: new THREE.Color(0x3b82f6),
      shininess: 40,
    })
    const earthMesh = new THREE.Mesh(earthGeo, earthMat)
    earthGroup.add(earthMesh)

    // Load High-Res NASA Blue Marble Map
    textureLoader.load('/earth-blue-marble.jpg', (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace
      texture.generateMipmaps = true
      texture.minFilter = THREE.LinearMipmapLinearFilter
      earthMat.map = texture
      earthMat.needsUpdate = true
    })

    // Load Ocean Specular Reflection Map
    textureLoader.load('/earth-specular.jpg', (specularMap) => {
      earthMat.specularMap = specularMap
      earthMat.needsUpdate = true
    })

    /* ── Real Cloud Layer (Semi-transparent drifting clouds) ───────────────── */
    const cloudGeo = new THREE.SphereGeometry(1.012, 64, 64)
    const cloudMat = new THREE.MeshStandardMaterial({
      transparent: true,
      opacity: 0.42,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat)
    earthGroup.add(cloudMesh)

    textureLoader.load('/earth-clouds.png', (cloudTexture) => {
      cloudTexture.colorSpace = THREE.SRGBColorSpace
      cloudMat.map = cloudTexture
      cloudMat.needsUpdate = true
    })

    /* ── Soft Ethereal Atmosphere Fresnel Glow ────────────────────────────── */
    const atmosphereMat = new THREE.ShaderMaterial({
      vertexShader: AtmosphereShader.vertexShader,
      fragmentShader: AtmosphereShader.fragmentShader,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    })
    const atmosphereMesh = new THREE.Mesh(new THREE.SphereGeometry(1.14, 64, 64), atmosphereMat)
    earthGroup.add(atmosphereMesh)

    /* ── US & India Client Markers & Ping Rings ────────────────────────────── */
    const markersGroup = new THREE.Group()
    earthGroup.add(markersGroup)

    const usPinColor = 0xc084fc     // Violet for US
    const indPinColor = 0xf59e0b    // Amber for India

    const pinGeo = new THREE.SphereGeometry(0.016, 16, 16)
    const ringGeo = new THREE.RingGeometry(0.024, 0.034, 32)

    const animatedRings = []

    function addClientPin(client, hexColor, countryCode) {
      const pos = latLngToVector3(client.lat, client.lng, 1.018)

      // Solid emissive core beacon
      const pinMat = new THREE.MeshBasicMaterial({ color: hexColor })
      const pin = new THREE.Mesh(pinGeo, pinMat)
      pin.position.copy(pos)
      pin.userData = { ...client, countryCode }
      markersGroup.add(pin)

      // Expanding radar ring
      const ringMat = new THREE.MeshBasicMaterial({
        color: hexColor,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
      const ring = new THREE.Mesh(ringGeo, ringMat)
      ring.position.copy(pos)
      ring.lookAt(pos.clone().multiplyScalar(2)) // Tangent to sphere
      markersGroup.add(ring)

      animatedRings.push({
        mesh: ring,
        phase: Math.random() * Math.PI * 2,
        speed: 1.8 + Math.random() * 0.4,
      })
    }

    US_CLIENTS.forEach((c) => addClientPin(c, usPinColor, 'US'))
    INDIA_CLIENTS.forEach((c) => addClientPin(c, indPinColor, 'IN'))

    /* ── Cross-Continental Enterprise Arcs ─────────────────────────────────── */
    const arcsGroup = new THREE.Group()
    earthGroup.add(arcsGroup)

    const arcLineMat = new THREE.LineBasicMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const packetGeo = new THREE.SphereGeometry(0.013, 10, 10)
    const packetMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const packets = []

    CONNECTIONS.forEach(({ from, to }, idx) => {
      const p1 = latLngToVector3(from.lat, from.lng, 1.018)
      const p2 = latLngToVector3(to.lat, to.lng, 1.018)
      const pts = createArc(p1, p2, 0.28, 60)

      // Arc curve geometry
      const arcGeometry = new THREE.BufferGeometry().setFromPoints(pts)
      const arcLine = new THREE.Line(arcGeometry, arcLineMat)
      arcsGroup.add(arcLine)

      // Traveling data packet
      const packetMesh = new THREE.Mesh(packetGeo, packetMat.clone())
      arcsGroup.add(packetMesh)

      packets.push({
        mesh: packetMesh,
        points: pts,
        progress: (idx / CONNECTIONS.length),
        speed: 0.0024 + Math.random() * 0.001,
      })
    })

    /* ── Initial Rotation to Showcase Illuminated Earth ────────────────────── */
    earthGroup.rotation.y = 2.2

    /* ── Resize Handler ────────────────────────────────────────────────────── */
    const handleResize = () => {
      fitCameraToGlobe()
    }
    window.addEventListener('resize', handleResize)

    /* ── Optimized Animation Loop with IntersectionObserver & Tab Visibility ── */
    let animId = null
    let isVisible = true
    let isRunning = false
    const clock = new THREE.Clock()

    const animate = () => {
      if (!isRunning) return
      animId = requestAnimationFrame(animate)
      const delta = clock.getDelta()
      const time = clock.getElapsedTime()

      // Update OrbitControls (smooth auto-rotation + drag interaction)
      controls.update()

      // Realistic Cloud Drift
      cloudMesh.rotation.y += 0.00035

      // Radar rings pulse and fade out
      for (let i = 0; i < animatedRings.length; i++) {
        const ring = animatedRings[i]
        const p = ((time * ring.speed + ring.phase) % 3) / 3
        const scale = 1.0 + p * 3.2
        const opacity = Math.max(0, (1.0 - p) * 0.85)
        ring.mesh.scale.setScalar(scale)
        ring.mesh.material.opacity = opacity
      }

      // Traveling data packets
      for (let i = 0; i < packets.length; i++) {
        const pkt = packets[i]
        pkt.progress = (pkt.progress + pkt.speed) % 1.0
        const index = Math.floor(pkt.progress * (pkt.points.length - 1))
        const pos = pkt.points[index]
        if (pos) {
          pkt.mesh.position.copy(pos)
          const pulse = Math.sin(pkt.progress * Math.PI)
          pkt.mesh.material.opacity = 0.4 + pulse * 0.6
        }
      }

      renderer.render(scene, camera)
    }

    const startLoop = () => {
      if (!isRunning && isVisible && !document.hidden) {
        isRunning = true
        clock.start()
        animId = requestAnimationFrame(animate)
      }
    }

    const stopLoop = () => {
      if (isRunning) {
        isRunning = false
        if (animId) {
          cancelAnimationFrame(animId)
          animId = null
        }
        clock.stop()
      }
    }

    // Start immediately
    startLoop()

    // Observe when the globe is visible in the viewport
    const io = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
      if (isVisible) {
        startLoop()
      } else {
        stopLoop()
      }
    }, { threshold: 0.02 })
    io.observe(mount)

    const onVisibilityChange = () => {
      if (document.hidden) {
        stopLoop()
      } else if (isVisible) {
        startLoop()
      }
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    /* ── Cleanup ──────────────────────────────────────────────────────────── */
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
      stopLoop()
      window.removeEventListener('resize', handleResize)
      controls.dispose()

      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose()
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose())
          else obj.material.dispose()
        }
      })

      if (renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* 3D WebGL Canvas */}
      <div
        ref={mountRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          inset: 0,
          display: 'block',
          outline: 'none',
          border: 'none',
          background: 'transparent',
          overflow: 'visible',
        }}
        aria-label="Interactive 3D Earth Globe highlighting US and India enterprise corridors"
      />

      {/* Floating Info Overlay Pill */}
      <div className="globe-legend">
        <span className="globe-legend-item">
          <span className="globe-legend-dot globe-legend-dot--us" />
          <span>US Enterprise Hubs</span>
        </span>
        <span className="globe-legend-sep">•</span>
        <span className="globe-legend-item">
          <span className="globe-legend-dot globe-legend-dot--in" />
          <span>India R&amp;D Centers</span>
        </span>
        <span className="globe-legend-sep">•</span>
        <span className="globe-legend-item globe-legend-hint">
          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>drag_pan</span>
          {isCoarsePointer ? 'Swipe to spin' : 'Drag to spin'}
        </span>
      </div>
    </div>
  )
}
