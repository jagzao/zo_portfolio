# Animation Flows

## tlIntro (Page Load)
1. CircuitBackground draws SVG paths (0.8s)
2. Logo hexagon appears with glow (0.4s)
3. Corner menus fade in staggered (0.6s)
4. Hero text slides up (0.3s)
5. CTAs bounce in (0.4s)

## tlLogoHover (Mouse Enter/Leave)
**Enter:**
1. Hexagon scales 1.1x (0.2s)
2. Photo fades in from 0 to 1 (0.3s)
3. Circuit branches draw outward (0.4s)
4. Red glow intensifies (0.2s)
5. Trigger rayTo() to hovered corner

**Leave:**
1. Photo fades out (0.2s)
2. Branches fade out (0.3s)
3. Hexagon scales back to 1x (0.2s)
4. Glow reduces (0.2s)

## rayTo(target) - Electric Arc
**Three.js Mode:**
1. Calculate path from logo to target
2. Create lightning geometry with noise
3. Animate particles along path (0.8s)
4. Shader glow effect
5. Fade out (0.3s)

**Fallback (reduced-motion):**
1. Simple SVG line from logo to target
2. Dash animation (0.5s)
3. Opacity fade (0.2s)

## menuHover(element)
**Enter:**
1. Opacity 0.5 → 1 (0.15s)
2. Red glow appears (0.2s)
3. Underline draws from left (0.3s)

**Leave:**
1. Underline retracts to right (0.2s)
2. Glow fades (0.15s)
3. Opacity back to 0.5 (0.15s)

## ScrollTrigger Reveals
- **Trigger:** 50px before element enters viewport
- **Animation:** translateY(50px) + opacity(0) → translateY(0) + opacity(1)
- **Duration:** 0.6s
- **Stagger:** 0.1s between elements