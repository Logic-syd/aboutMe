'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import { Html, OrbitControls, Line, useCursor } from '@react-three/drei';
import Link from 'next/link';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { projects } from '@/lib/projects';
import type { SceneFailure } from '@/lib/scene-status';
import { graphLeaves, graphTitles, constellationPoints, projectFocusSide, type FocusSide, type GraphSelection } from '@/lib/graph';

type Gradient = readonly [string, string, string];
type Point = [number, number, number];
type Orbit = { center: Point; radiusX: number; radiusY: number; angle: number };
type Item = { id: string; kind: 'root' | 'project' | 'technology' | 'leaf'; label: string; position: Point; orbit?: Orbit; kickDirection?: Point; spawn?: Point; spawnFrom?: string; delay?: number; quiet?: boolean; satellite?: boolean; muted?: boolean; gradient?: Gradient; color: string; radius: number; active: boolean; index: number; onSelect?: () => void };
type LabelPortal = React.RefObject<HTMLDivElement>;
type Props = { projectDirections: React.RefObject<Map<number, FocusSide>>; onUnavailable: (reason: SceneFailure) => void; onReady: () => void; interaction: { nodeId: string; revision: number }; selection: GraphSelection; onProject: (index: number) => void; onTechnology: (index: number) => void; onReset: () => void; animate: boolean; reducedMotion: boolean; visible: boolean; view: { reset: number; zoom: number } };
const colors = ['#9eb6a0', '#98b9cc', '#c2a0aa', '#8cb6ad', '#c8bd8d', '#9caec3', '#c3ad88', '#96b9a9', '#c7acb4', '#9cacc2', '#9fb39a', '#a3bfc0', '#b5adbf'];
const sceneFog = '#dce9e9';
const rootRingColor = '#b8ad7e';
// The meadow-pearl core, colored planets and pale glass satellites
// distinguish roles without depending only on their radius.
const rootGradient: Gradient = ['#f7f9ee', '#cfdfc9', '#9fbea9'];
const leafGradient: Gradient = ['#f7faf5', '#e5ece2', '#cad8ca'];
const gradients: Gradient[] = [
  ['#e6eee0', '#c2d5bc', '#a3bea5'],
  ['#e0edf1', '#bfd8e3', '#9fbfce'],
  ['#f3e8e9', '#ddc6cd', '#c5a6b0'],
  ['#e0ede6', '#b6d4c8', '#94bcb2'],
  ['#f4efdb', '#e0d7b5', '#c9bf96'],
  ['#e7ecf0', '#c6d2df', '#a6b7cc'],
  ['#f2eadd', '#dfcdb3', '#c7b18f'],
  ['#e5efe3', '#bfd9c8', '#9dbfac'],
  ['#f4ebea', '#e0ccd1', '#c8afb7'],
  ['#e8ecf1', '#c8d1e0', '#a8b6ca'],
  ['#e9eee0', '#c9d8be', '#a9bf9e'],
  ['#e5eeeb', '#c6dbd7', '#a6c3c0'],
  ['#efebf0', '#d8d0df', '#bcb2c7'],
];
function satelliteGradient(gradient: Gradient): Gradient {
  const lighten = (color: string) => `#${new THREE.Color(color).lerp(new THREE.Color('#ffffff'), .42).getHexString()}`;
  return [lighten(gradient[0]), lighten(gradient[1]), lighten(gradient[2])];
}
function SphereNode({ item, animate, reducedMotion, onDrag, onPosition, labelPortal, positions, anchors, pixelScale, pulse }: { anchors: Item[]; pixelScale: number; pulse: number; positions: React.RefObject<Map<string, THREE.Vector3>>; labelPortal: LabelPortal; item: Item; animate: boolean; reducedMotion: boolean; onDrag: (dragging: boolean) => void; onPosition: (id: string, position: THREE.Vector3) => void }) {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered, 'grab');
  const offset = useRef(new THREE.Vector3());
  const velocity = useRef(new THREE.Vector3());
  const age = useRef(-(item.delay ?? 0));
  const [initialPosition] = useState<Point>(() => item.spawn ?? item.position);
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const moved = useRef(0);
  const pressed = useRef(false);
  const scaleValue = useRef(1);
  const scaleVelocity = useRef(0);
  const spinVelocity = useRef(0);
  const lastPulse = useRef(0);
  const orbit = useRef(item.orbit ? { ...item.orbit, center: new THREE.Vector3(...item.orbit.center) } : null);
  const size = item.radius;
  const { camera, size: screen, invalidate } = useThree();
  const geometry = useMemo(() => {
    const sphere = new THREE.SphereGeometry(size, item.kind === 'leaf' ? 24 : 40, item.kind === 'leaf' ? 16 : 32);
    const points = sphere.getAttribute('position');
    const shades = (item.gradient ?? rootGradient).map(color => new THREE.Color(color));
    const colors = new Float32Array(points.count * 3);
    const tint = new THREE.Color();
    for (let index = 0; index < points.count; index++) {
      const blend = THREE.MathUtils.clamp((points.getY(index) - points.getX(index) * .18) / (size * 2.05) + .5, 0, 1);
      if (blend < .5) tint.copy(shades[2]).lerp(shades[1], THREE.MathUtils.smoothstep(blend * 2, 0, 1));
      else tint.copy(shades[1]).lerp(shades[0], THREE.MathUtils.smoothstep((blend - .5) * 2, 0, 1));
      tint.toArray(colors, index * 3);
    }
    sphere.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return sphere;
  }, [size, item.gradient, item.kind]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  useEffect(() => {
    if (pulse > 0 && pulse !== lastPulse.current && !reducedMotion) {
      scaleValue.current = .96; scaleVelocity.current = .8;
      velocity.current.addScaledVector(new THREE.Vector3(...(item.kickDirection ?? [0, 1, 0])), pixelScale * 110);
      spinVelocity.current = (item.kickDirection?.[0] ?? 1) * 2.4;
    }
    lastPulse.current = pulse;
    invalidate();
  }, [pulse, reducedMotion, pixelScale, item.kickDirection, invalidate]);
  function kick() {
    if (!reducedMotion) {
      scaleValue.current = .96; scaleVelocity.current = .8;
      velocity.current.addScaledVector(new THREE.Vector3(...(item.kickDirection ?? [0, 1, 0])), pixelScale * 110);
      spinVelocity.current = (item.kickDirection?.[0] ?? 1) * 2.4;
    }
    invalidate();
  }
  useEffect(() => {
    const origin = item.spawnFrom ? positions.current.get(item.spawnFrom) : null;
    if (origin && group.current && !reducedMotion) group.current.position.copy(origin);
    invalidate();
  }, [item.spawnFrom, positions, reducedMotion, invalidate]);
  useEffect(() => { offset.current.set(0, 0, 0); invalidate(); }, [item.position, invalidate]);
  useFrame((state, delta) => {
    if (!group.current) return;
    const time = state.clock.elapsedTime;
    const target = new THREE.Vector3(...item.position).add(offset.current);
    let turning = false;
    if (item.orbit && orbit.current) {
      const current = orbit.current;
      const angleDelta = Math.atan2(Math.sin(item.orbit.angle - current.angle), Math.cos(item.orbit.angle - current.angle));
      const speed = reducedMotion ? 1 : 1 - Math.exp(-Math.min(delta, .05) * 4.5);
      turning = Math.abs(angleDelta) > .002 || Math.abs(current.radiusX - item.orbit.radiusX) > .002 || Math.abs(current.radiusY - item.orbit.radiusY) > .002 || current.center.distanceTo(new THREE.Vector3(...item.orbit.center)) > .002;
      current.angle += angleDelta * speed;
      current.radiusX = THREE.MathUtils.lerp(current.radiusX, item.orbit.radiusX, speed);
      current.radiusY = THREE.MathUtils.lerp(current.radiusY, item.orbit.radiusY, speed);
      current.center.lerp(new THREE.Vector3(...item.orbit.center), speed);
      target.set(current.center.x + Math.cos(current.angle) * current.radiusX, current.center.y + Math.sin(current.angle) * current.radiusY, item.position[2]).add(offset.current);
    }
    if (animate && !dragging.current) {
      const phase = item.index * 1.37 + (item.kind === 'technology' ? 2 : 0);
      const drift = item.kind === 'project' && !item.active ? 7 : 2;
      const sway = Math.sin(time * .24 + phase) * pixelScale * drift;
      if (orbit.current) {
        target.x -= Math.sin(orbit.current.angle) * sway;
        target.y += Math.cos(orbit.current.angle) * sway;
      } else {
        target.x += sway;
        target.y += Math.sin(time * .31 + phase) * pixelScale * drift;
      }
      target.z += Math.cos(time * .22 + phase) * pixelScale * drift * 2;
    }
    if (!reducedMotion && !dragging.current) {
      // Small coupled springs let a pulled sphere gently tug its connections.
      const tug = new THREE.Vector3();
      for (const anchor of anchors) {
        const current = positions.current.get(anchor.id);
        if (current) {
          const weight = item.kind === 'root' ? .025 : anchor.id === (item.kind === 'project' ? 'root' : item.spawnFrom) ? .09 : .035;
          tug.addScaledVector(current.clone().sub(new THREE.Vector3(...anchor.position)), weight);
        }
      }
      tug.clampLength(0, pixelScale * 9);
      target.add(tug);
    }
    const step = Math.min(delta, 1 / 30);
    age.current += step;
    const positionChanged = group.current.position.distanceToSquared(target) > .000001;
    if (reducedMotion) { group.current.position.copy(target); velocity.current.set(0, 0, 0); }
    else if (age.current >= 0) {
      velocity.current.addScaledVector(target.clone().sub(group.current.position), step * 64);
      velocity.current.multiplyScalar(Math.exp(-step * 8.5));
      group.current.position.addScaledVector(velocity.current, step);
    }
    const scaleTarget = (hovered ? 1.05 : 1) * (pressed.current ? .94 : 1);
    if (reducedMotion) { scaleValue.current = scaleTarget; scaleVelocity.current = 0; }
    else {
      scaleVelocity.current += (scaleTarget - scaleValue.current) * step * 75;
      scaleVelocity.current *= Math.exp(-step * 10);
      scaleValue.current += scaleVelocity.current * step;
    }
    shell.current?.scale.setScalar(scaleValue.current);
    if (shell.current && !reducedMotion) {
      shell.current.rotation.y += step * ((animate ? .12 + item.index % 4 * .035 : 0) + spinVelocity.current * .3);
      shell.current.rotation.z -= step * spinVelocity.current;
      spinVelocity.current *= Math.exp(-step * 4);
    }
    onPosition(item.id, group.current.position);
    // HTML labels need the next frame's updated world matrices after an immediate move.
    if (turning || Math.abs(spinVelocity.current) > .01 || (reducedMotion && positionChanged) || group.current.position.distanceTo(target) > .002 || velocity.current.length() > .01 || age.current < 0 || Math.abs(scaleValue.current - scaleTarget) > .002 || Math.abs(scaleVelocity.current) > .01) invalidate();
  });
  function down(event: ThreeEvent<PointerEvent>) {
    event.stopPropagation(); pressed.current = true; dragging.current = true; moved.current = 0; last.current = { x: event.clientX, y: event.clientY }; onDrag(true);
    (event.target as unknown as { setPointerCapture: (id: number) => void }).setPointerCapture(event.pointerId);
    invalidate();
  }
  function move(event: ThreeEvent<PointerEvent>) {
    if (!dragging.current) return;
    event.stopPropagation();
    const dx = event.clientX - last.current.x; const dy = event.clientY - last.current.y;
    moved.current += Math.abs(dx) + Math.abs(dy);
    const depth = group.current ? camera.position.distanceTo(group.current.position) : camera.position.length();
    const pixel = 2 * depth * Math.tan(THREE.MathUtils.degToRad((camera as THREE.PerspectiveCamera).fov / 2)) / screen.height;
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
    const up = new THREE.Vector3(0, 1, 0).applyQuaternion(camera.quaternion);
    offset.current.addScaledVector(right, dx * pixel).addScaledVector(up, -dy * pixel).clampLength(0, pixelScale * 85);
    last.current = { x: event.clientX, y: event.clientY }; invalidate();
  }
  function up(event: ThreeEvent<PointerEvent>) {
    if (!dragging.current) return;
    event.stopPropagation(); pressed.current = false; dragging.current = false; onDrag(false);
    (event.target as unknown as { releasePointerCapture: (id: number) => void }).releasePointerCapture(event.pointerId);
    offset.current.set(0, 0, 0);
    if (moved.current < 6 && item.onSelect) item.onSelect(); else kick();
    invalidate();
  }
  return <group ref={group} name={`${item.kind}-${item.id}`} position={initialPosition}>
    <mesh ref={shell} geometry={geometry} castShadow onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={() => { pressed.current = false; dragging.current = false; offset.current.set(0, 0, 0); onDrag(false); invalidate(); }} onPointerOver={event => { event.stopPropagation(); setHovered(true); }} onPointerOut={() => setHovered(false)}>
      <meshPhysicalMaterial vertexColors color="#ffffff" metalness={0}
        roughness={item.kind === 'leaf' ? .75 : item.kind === 'technology' ? .16 : item.muted ? .45 : .22}
        clearcoat={item.kind === 'leaf' ? 0 : item.muted ? .2 : .85}
        clearcoatRoughness={.3} specularIntensity={item.kind === 'leaf' ? .18 : item.muted ? .35 : .9}
        transparent={item.kind === 'technology'} opacity={item.kind === 'technology' ? .62 : 1} depthWrite={item.kind !== 'technology'}
        sheen={item.kind === 'root' ? .2 : item.kind === 'project' && !item.muted ? .15 : 0} sheenColor="#e8eee0" sheenRoughness={.65} />
    </mesh>
    {item.kind === 'technology' && <mesh><sphereGeometry args={[size * .35, 20, 16]} /><meshBasicMaterial color={item.color} transparent opacity={.24} depthWrite={false} /></mesh>}
    {item.kind === 'root' && <mesh rotation={[.8, .1, .3]}><torusGeometry args={[size * 1.35, pixelScale * 1.1, 8, 96]} /><meshStandardMaterial color={rootRingColor} metalness={.12} roughness={.65} /></mesh>}
    {item.active && (item.kind === 'project' || item.kind === 'technology') && <mesh rotation={[.5, .2, -.4]}><torusGeometry args={[size * 1.35, pixelScale * .8, 8, 64]} /><meshStandardMaterial color={item.color} roughness={.65} emissive={item.color} emissiveIntensity={.08} /></mesh>}
    {(!item.quiet || hovered && item.kind !== 'leaf') && <Html portal={labelPortal} center position={[0, -size - pixelScale * (item.kind === 'project' ? 32 : 25), .05]} zIndexRange={[20, 1]} style={{ pointerEvents: 'none' }}>
      <div data-node-id={item.id} className={`space-node-label ${item.kind === 'project' ? 'is-project' : ''} ${item.satellite ? 'is-satellite' : ''}`}>{item.onSelect ? <button className={`space-label label-${item.kind} ${item.active ? 'active' : ''}`} onClick={item.onSelect} aria-pressed={item.active} style={{ pointerEvents: 'auto' }}>{item.kind === 'root' ? <><span>YIDAN SHAO</span><strong>My work</strong></> : <>{item.kind === 'project' && <span>{projects[item.index].kind === 'commercial' ? 'WORK' : 'PERSONAL'}</span>}<strong>{item.label}</strong></>}</button> : <span className="space-label label-leaf"><strong>{item.label}</strong></span>}
        {item.kind === 'project' && <Link className="space-case-link" href={`/projects/${projects[item.index].slug}`} aria-label={`Read ${projects[item.index].title} case study`} title="Read case study" style={{ pointerEvents: 'auto' }}><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M7 7h10v10" /></svg></Link>}
      </div>
    </Html>}
  </group>;
}

function Connection({ start, end, active, positions, animate }: { start: Item; end: Item; active: boolean; positions: React.RefObject<Map<string, THREE.Vector3>>; animate: boolean }) {
  const particle = useRef<THREE.Mesh>(null);
  const curveRef = useRef(new THREE.QuadraticBezierCurve3());
  const sample = useRef(new THREE.Vector3());
  const line = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(33 * 3), 3));
    const result = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: end.color, transparent: true, opacity: active ? .52 : .18, depthWrite: false }));
    result.frustumCulled = false;
    return result;
  }, [active, end.color]);
  useEffect(() => () => { line.geometry.dispose(); line.material.dispose(); }, [line]);
  useFrame(state => {
    const curve = curveRef.current;
    const a = positions.current.get(start.id) ?? sample.current.set(...start.position);
    curve.v0.copy(a);
    const b = positions.current.get(end.id) ?? sample.current.set(...end.position);
    curve.v2.copy(b); curve.v1.copy(curve.v0).lerp(b, .5); curve.v1.z -= .5;
    const points = line.geometry.getAttribute('position');
    for (let index = 0; index <= 32; index++) {
      curve.getPoint(index / 32, sample.current);
      points.setXYZ(index, sample.current.x, sample.current.y, sample.current.z);
    }
    points.needsUpdate = true;
    if (particle.current) particle.current.position.copy(curve.getPoint((state.clock.elapsedTime * .12 + end.index * .14) % 1, sample.current));
  });
  return <><primitive object={line} />{active && animate && <mesh ref={particle}><sphereGeometry args={[.035, 10, 8]} /><meshBasicMaterial color={end.color} /></mesh>}</>;
}

function OrbitalAtmosphere({ width, height, pixelScale, animate }: { width: number; height: number; pixelScale: number; animate: boolean }) {
  const field = useRef<THREE.Group>(null);
  const stars = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const points = new Float32Array(110 * 3);
    const random = (seed: number) => { const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453; return value - Math.floor(value); };
    for (let index = 0; index < 110; index++) {
      points[index * 3] = (random(index * 3) - .5) * width * 1.15;
      points[index * 3 + 1] = (random(index * 3 + 1) - .5) * height;
      points[index * 3 + 2] = -3 - random(index * 3 + 2) * 5;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(points, 3));
    return geometry;
  }, [width, height]);
  useEffect(() => () => stars.dispose(), [stars]);
  const trails = useMemo(() => [0, 1].map(orbit => Array.from({ length: 100 }, (_, index): Point => {
    const angle = index / 99 * Math.PI * 1.25 + orbit * 2.8;
    const x = Math.cos(angle) * width * (orbit ? .46 : .36);
    const y = Math.sin(angle) * height * (orbit ? .3 : .22);
    return [x, y + x * (orbit ? -.13 : .17), -2 + Math.sin(angle) * 1.4];
  })), [width, height]);
  useFrame((state, delta) => {
    if (!field.current || !animate) return;
    const easing = 1 - Math.exp(-Math.min(delta, .05) * 2);
    field.current.rotation.y = THREE.MathUtils.lerp(field.current.rotation.y, state.pointer.x * .035, easing);
    field.current.rotation.x = THREE.MathUtils.lerp(field.current.rotation.x, -state.pointer.y * .025, easing);
  });
  return <group ref={field}>
    <points geometry={stars}><pointsMaterial color="#7398a9" size={pixelScale * 1.1} transparent opacity={.36} depthWrite={false} /></points>
    {trails.map((points, index) => <Line key={index} points={points} color={index ? '#b4a88c' : '#87a9b5'} transparent opacity={.2} lineWidth={.6} depthWrite={false} />)}
  </group>;
}

function Scene(props: Props & { labelPortal: LabelPortal }) {
  const controls = useRef<OrbitControlsImpl>(null);
  const positions = useRef(new Map<string, THREE.Vector3>());
  const [dragging, setDragging] = useState(false);
  const { camera, size, invalidate } = useThree();
  const destination = useRef<THREE.Vector3 | null>(null);
  const lookAt = useRef(new THREE.Vector3());
  const dense = size.height < 600;
  const compact = size.width < 650;
  const { selection, onProject, onTechnology, onReset } = props;
  const expanded = selection.project !== null;
  const compactLeaves = (compact || dense) && selection.technology !== null;
  const aspect = size.width / size.height;
  const tangent = Math.tan(THREE.MathUtils.degToRad(43 / 2));
  const frameWidth = compact ? 16 : 26;
  const distance = Math.max(22, frameWidth / (2 * tangent * aspect));
  const worldPerPixel = 2 * tangent * distance / size.height;
  const items = useMemo(() => {
    const width = size.width, height = size.height;
    const point = (x: number, y: number, z = 0): Point => [x * worldPerPixel, y * worldPerPixel, z];
    // The adjacent catalog carries names; a short scene reserves labels for focus and hover.
    const radiusY = Math.max(65, (height - 180) / 2);
    const focusSide = selection.focusSide ?? 1;
    const rootX = expanded ? -focusSide * width * .12 : 0;
    const rootY = 14;
    const radiusX = Math.min(width * (expanded ? .26 : .4), width / 2 - Math.abs(rootX) - 32);
    const overview = constellationPoints(projects.length);
    if (compact && !expanded) {
      // Keep a real gap on small canvases, including the clearing below the core.
      // This relaxation runs on layout changes only, not in the animation loop.
      const points = overview.map(node => ({ x: Math.cos(node.angle) * radiusX * node.spread, y: Math.sin(node.angle) * radiusY * node.spread }));
      const separation = Math.min(44, width / Math.sqrt(projects.length) * .52);
      for (let pass = 0; pass < 28; pass++) {
        for (let index = 0; index < points.length; index++) {
          const current = points[index];
          for (let next = index + 1; next < points.length; next++) {
            const other = points[next];
            const dx = other.x - current.x, dy = other.y - current.y;
            const length = Math.max(.001, Math.hypot(dx, dy));
            if (length >= separation) continue;
            const push = (separation - length) * .51;
            current.x -= dx / length * push; current.y -= dy / length * push;
            other.x += dx / length * push; other.y += dy / length * push;
          }
          if (Math.abs(current.x) < 67 && current.y < -22 && current.y > -91) current.x = (current.x < 0 ? -1 : 1) * 67;
          const edge = Math.hypot(current.x / radiusX, current.y / radiusY);
          if (edge > .98) { current.x *= .98 / edge; current.y *= .98 / edge; }
        }
      }
      points.forEach((position, index) => {
        overview[index].angle = Math.atan2(position.y / radiusY, position.x / radiusX);
        overview[index].spread = Math.hypot(position.x / radiusX, position.y / radiusY);
      });
    }
    const angles = overview.map(position => position.angle);
    const rotation = selection.project === null ? 0 : (focusSide > 0 ? 0 : Math.PI) - angles[selection.project];
    const rootPosition = point(rootX, rootY);
    const selectedPosition = point(rootX + focusSide * radiusX, rootY, .2);
    const result: Item[] = [{ id: 'root', kind: 'root', label: 'My work', position: rootPosition, radius: (compact ? 20 : 27) * worldPerPixel, gradient: rootGradient, color: rootRingColor, quiet: compact && expanded, active: false, index: 0, onSelect: onReset }];
    projects.forEach((project, index) => {
      const active = selection.project === index;
      const commercial = project.kind === 'commercial';
      const angle = angles[index] + rotation;
      const projectRadius = (compact ? commercial ? 14 : 11 : commercial ? 21 : 15) * (1 + Math.sin(index * 2.1) * .16) * worldPerPixel * (expanded && !active ? .7 : active ? 1.15 : 1);
      const satelliteRadius = (commercial ? 12 : 9) * worldPerPixel;
      const spread = active ? 1 : overview[index].spread;
      const position = point(rootX + Math.cos(angle) * radiusX * spread, rootY + Math.sin(angle) * radiusY * spread, active ? .2 : overview[index].depth);
      result.push({ id: project.slug, kind: 'project', label: graphTitles[index], position,
        orbit: { center: rootPosition, radiusX: radiusX * spread * worldPerPixel, radiusY: radiusY * spread * worldPerPixel, angle },
        kickDirection: expanded && active ? [focusSide, 0, 0] : [Math.cos(angle), Math.sin(angle), 0],
        radius: expanded && compact && !active ? satelliteRadius : projectRadius, quiet: !active || compactLeaves && compact, muted: expanded && !active, gradient: gradients[index % gradients.length], color: colors[index % colors.length], active, index, onSelect: () => onProject(index) });
    });
    if (selection.project !== null) {
      const project = projects[selection.project];
      const branchX = focusSide * width * (width < 400 ? .29 : .35);
      const branchTop = dense ? height / 2 - 90 : height * .2;
      const branchStep = dense ? Math.min(62, Math.max(30, (height - 210) / Math.max(1, project.tags.length - 1))) : 82;
      project.tags.forEach((tag, index) => {
        if (compactLeaves && selection.technology !== index) return;
        const position = point(branchX, branchTop - (compactLeaves ? 0 : index * branchStep), .1);
        result.push({ id: `${project.slug}-tech-${index}`, kind: 'technology', label: tag, position, quiet: compact && selection.technology !== index,
          kickDirection: [focusSide, 0, 0], radius: (compact ? 11 : 15) * worldPerPixel,
          spawn: selectedPosition, spawnFrom: project.slug, delay: .18 + index * .075,
          gradient: satelliteGradient(gradients[selection.project! % gradients.length]), color: colors[selection.project! % colors.length],
          active: selection.technology === index, index, onSelect: () => onTechnology(index) });
      });
      if (selection.technology !== null) {
        const technology = result.find(node => node.id === `${project.slug}-tech-${selection.technology}`)!;
        graphLeaves(selection.project, selection.technology).forEach((label, index, all) => result.push({
          id: `${technology.id}-leaf-${index}`, kind: 'leaf', label,
          position: compactLeaves ? point(branchX, branchTop - 96 - index * Math.min(70, Math.max(30, (height - 240) / Math.max(1, all.length - 1))), .1)
            : point(focusSide * width * .414, technology.position[1] / worldPerPixel + (all.length - 1) * 44 - index * 88, .1),
          kickDirection: [focusSide, 0, 0], radius: 8 * worldPerPixel, spawn: technology.position, spawnFrom: technology.id, delay: index * .09,
          gradient: leafGradient, color: '#a9b9a7', quiet: compact, active: true, index }));
      }
    }
    return result;
  }, [expanded, dense, compact, compactLeaves, selection, onReset, onProject, onTechnology, size.width, size.height, worldPerPixel]);
  useEffect(() => {
    destination.current = new THREE.Vector3(0, 0, distance);
    lookAt.current.set(0, 0, 0);
    invalidate();
  }, [distance, props.view.reset, invalidate]);
  useEffect(() => {
    if (!controls.current) return;
    const zoomDistance = THREE.MathUtils.clamp(distance - props.view.zoom * 2, compact ? 13 : 9, Math.max(50, distance + 20));
    const direction = camera.position.clone().sub(controls.current.target).normalize();
    destination.current = controls.current.target.clone().addScaledVector(direction, zoomDistance);
    invalidate();
  }, [props.view.zoom, props.view.reset, distance, compact, camera, invalidate]);
  useFrame((_, delta) => {
    const rootScreen = (positions.current.get('root') ?? new THREE.Vector3(...items[0].position)).clone().project(camera);
    for (const item of items) {
      if (item.kind !== 'project') continue;
      const screen = (positions.current.get(item.id) ?? new THREE.Vector3(...item.position)).clone().project(camera);
      props.projectDirections.current.set(item.index, projectFocusSide((screen.x - rootScreen.x) * size.width, (screen.y - rootScreen.y) * size.height));
    }
    if (!destination.current || !controls.current) return;
    const speed = props.reducedMotion ? 1 : 1 - Math.exp(-delta * 4);
    camera.position.lerp(destination.current, speed); controls.current.target.lerp(lookAt.current, speed); controls.current.update();
    if (camera.position.distanceTo(destination.current) < .01) destination.current = null; else invalidate();
  });
  const root = items[0];
  return <>
    <fog attach="fog" args={[sceneFog, distance + 10, distance + 55]} />
    <OrbitalAtmosphere width={size.width * worldPerPixel} height={size.height * worldPerPixel} pixelScale={worldPerPixel} animate={props.animate} />
    <ambientLight intensity={.9} /><hemisphereLight args={['#f7faf3', '#c7d4c1', 1.5]} /><directionalLight position={[-6, 8, 6]} intensity={2.3} color="#fffdf3" /><directionalLight position={[4, -3, 3]} intensity={.7} color="#d5e4ed" />
    {expanded && items.filter(item => item.kind === 'project' && item.active).map(item => <Connection key={`root-${item.id}`} start={root} end={item} active positions={positions} animate={props.animate} />)}
    {expanded && items.filter(item => item.kind === 'technology').map(item => <Connection key={`tech-${item.id}`} start={items.find(node => node.id === projects[props.selection.project!].slug)!} end={item} active={props.selection.technology === null || item.active} positions={positions} animate={props.animate} />)}
    {props.selection.technology !== null && items.filter(item => item.kind === 'leaf').map(item => <Connection key={`leaf-${item.id}`} start={items.find(node => node.id === `${projects[props.selection.project!].slug}-tech-${props.selection.technology}`)!} end={item} active positions={positions} animate={props.animate} />)}
    {items.map(item => <SphereNode pixelScale={worldPerPixel} anchors={items.filter(anchor => (item.kind === 'root' && anchor.kind === 'project') || anchor.id === (item.kind === 'project' ? 'root' : item.spawnFrom) || anchor.spawnFrom === item.id)} pulse={props.interaction.nodeId === item.id ? props.interaction.revision : 0} positions={positions} labelPortal={props.labelPortal} key={item.id} item={item} animate={props.animate} reducedMotion={props.reducedMotion} onDrag={setDragging} onPosition={(id,position) => { const cached = positions.current.get(id); if (cached) cached.copy(position); else positions.current.set(id, position.clone()); }} />)}
    <OrbitControls ref={controls} makeDefault enabled={!dragging} enablePan={false} enableZoom={false} enableDamping={!props.reducedMotion} minPolarAngle={.45} maxPolarAngle={Math.PI * .7} onStart={() => { destination.current = null; }} />
  </>;
}

export default function ThreeProjectScene(props: Props) {
  const labelPortal = useRef<HTMLDivElement>(null!);
  return <div className="three-renderer"><div className="three-label-layer" ref={labelPortal} /><Canvas camera={{ position: [0, 0, 26], fov: 43 }} dpr={[1, 1.5]} frameloop={props.animate && props.visible ? 'always' : 'demand'} gl={defaults => {
    const canvas = defaults.canvas as HTMLCanvasElement;
    const attributes: WebGLContextAttributes = { alpha: true, depth: true, stencil: false, powerPreference: 'default' };
    let context: WebGL2RenderingContext | null = null;
    try { context = canvas.getContext('webgl2', { ...attributes, antialias: true }); } catch { /* Retry with fewer graphics requirements. */ }
    if (!context) context = canvas.getContext('webgl2', { ...attributes, antialias: false });
    if (!context) throw new Error('Unable to create a WebGL 2 graphics context.');
    return new THREE.WebGLRenderer({ ...defaults, context, alpha: true, antialias: context.getContextAttributes()?.antialias ?? false });
  }} onCreated={({ gl }) => {
    gl.domElement.addEventListener('webglcontextlost', event => { event.preventDefault(); props.onUnavailable('context-lost'); }, { once: true });
    props.onReady();
  }}><Scene {...props} labelPortal={labelPortal} /></Canvas></div>;
}
