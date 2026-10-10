'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import { Html, OrbitControls, Line } from '@react-three/drei';
import Link from 'next/link';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { projects } from '@/lib/projects';
import type { SceneFailure } from '@/lib/scene-status';
import { graphLeaves, graphTitles, orbitPoints, type GraphSelection } from '@/lib/graph';

type Gradient = readonly [string, string, string];
type Point = [number, number, number];
type Item = { id: string; kind: 'root' | 'project' | 'technology' | 'leaf'; label: string; position: Point; spawn?: Point; spawnFrom?: string; delay?: number; quiet?: boolean; satellite?: boolean; muted?: boolean; gradient?: Gradient; color: string; radius: number; active: boolean; index: number; onSelect?: () => void };
type LabelPortal = React.RefObject<HTMLDivElement>;
type Props = { onUnavailable: (reason: SceneFailure) => void; onReady: () => void; interaction: { nodeId: string; revision: number }; selection: GraphSelection; onProject: (index: number) => void; onTechnology: (index: number) => void; onReset: () => void; animate: boolean; reducedMotion: boolean; visible: boolean; view: { reset: number; zoom: number } };
const colors = ['#d9a2b5', '#8fbbd9', '#94c5b6', '#b7a1d1', '#dbb395', '#a0afdc', '#d9a09b', '#8abfc3', '#d3c296', '#bc9fc2', '#a1bdb0'];
// The warm core, colored planets, pale glass satellites and ivory pearls
// distinguish roles without depending only on their radius.
const rootGradient: Gradient = ['#fff0c9', '#efd3ad', '#e9b3a2'];
const leafGradient: Gradient = ['#f6f0e5', '#e9e4df', '#dedbd8'];
const gradients: Gradient[] = [
  ['#f3d9e3', '#e5b6cd', '#d8a7ba'],
  ['#c9e6f1', '#a9cce6', '#99b6d8'],
  ['#d2ebdb', '#b2d8c8', '#9ccbb9'],
  ['#e6dbf1', '#ccbee6', '#b4a4d4'],
  ['#fae5cb', '#f0cfb5', '#e4b6a3'],
  ['#d9e0f6', '#bac8ed', '#a7b5df'],
  ['#f4d5d0', '#e9bcb7', '#daa6a4'],
  ['#d0ecea', '#a9d4d4', '#92c5c8'],
  ['#faf0cc', '#ebdbb5', '#dbc6a1'],
  ['#eee0ed', '#d6bddb', '#c1a4ca'],
  ['#e3ecdc', '#c6d9bd', '#a9c4ad'],
];
function satelliteGradient(gradient: Gradient): Gradient {
  const lighten = (color: string) => `#${new THREE.Color(color).lerp(new THREE.Color('#ffffff'), .42).getHexString()}`;
  return [lighten(gradient[0]), lighten(gradient[1]), lighten(gradient[2])];
}
function SphereNode({ item, animate, reducedMotion, onDrag, onPosition, labelPortal, positions, anchors, pixelScale, pulse }: { anchors: Item[]; pixelScale: number; pulse: number; positions: React.RefObject<Map<string, THREE.Vector3>>; labelPortal: LabelPortal; item: Item; animate: boolean; reducedMotion: boolean; onDrag: (dragging: boolean) => void; onPosition: (id: string, position: THREE.Vector3) => void }) {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
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
    if (pulse > 0 && !reducedMotion) { scaleValue.current = .92; scaleVelocity.current = 1.7; velocity.current.y += pixelScale * 90; }
    invalidate();
  }, [pulse, reducedMotion, pixelScale, invalidate]);
  function kick() {
    if (!reducedMotion) { scaleValue.current = .92; scaleVelocity.current = 1.7; velocity.current.y += pixelScale * 90; }
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
    if (animate && !dragging.current) {
      const phase = item.index * 1.37 + (item.kind === 'technology' ? 2 : 0);
      target.x += Math.sin(time * .62 + phase) * pixelScale * 2.2;
      target.y += Math.sin(time * .88 + phase) * pixelScale * 4;
      target.z += Math.cos(time * .55 + phase) * pixelScale * 2;
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
    onPosition(item.id, group.current.position);
    // HTML labels need the next frame's updated world matrices after an immediate move.
    if ((reducedMotion && positionChanged) || group.current.position.distanceTo(target) > .002 || velocity.current.length() > .01 || age.current < 0 || Math.abs(scaleValue.current - scaleTarget) > .002 || Math.abs(scaleVelocity.current) > .01) invalidate();
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
        roughness={item.kind === 'leaf' ? .9 : item.kind === 'technology' ? .18 : item.muted ? .68 : item.active ? .28 : .4}
        clearcoat={item.kind === 'leaf' ? 0 : item.kind === 'technology' ? .6 : item.muted ? .05 : .35}
        clearcoatRoughness={.3} specularIntensity={item.kind === 'leaf' ? .18 : item.muted ? .25 : .55}
        transparent={item.kind === 'technology'} opacity={item.kind === 'technology' ? .62 : 1} depthWrite={item.kind !== 'technology'}
        sheen={item.kind === 'root' ? .2 : item.kind === 'project' && !item.muted ? .15 : 0} sheenColor="#f0e1de" sheenRoughness={.65} />
    </mesh>
    {item.kind === 'technology' && <mesh><sphereGeometry args={[size * .35, 20, 16]} /><meshBasicMaterial color={item.color} transparent opacity={.24} depthWrite={false} /></mesh>}
    {item.kind === 'root' && <mesh rotation={[.8, .1, .3]}><torusGeometry args={[size * 1.35, pixelScale * 1.1, 8, 96]} /><meshStandardMaterial color="#d7bc94" metalness={.12} roughness={.65} /></mesh>}
    {item.active && (item.kind === 'project' || item.kind === 'technology') && <mesh rotation={[.5, .2, -.4]}><torusGeometry args={[size * 1.35, pixelScale * .8, 8, 64]} /><meshStandardMaterial color={item.color} roughness={.65} emissive={item.color} emissiveIntensity={.08} /></mesh>}
    {!item.quiet && <Html portal={labelPortal} center position={[0, -size - pixelScale * (item.kind === 'project' ? 32 : 25), .05]} zIndexRange={[20, 1]} style={{ pointerEvents: 'none' }}>
      <div data-node-id={item.id} className={`space-node-label ${item.kind === 'project' ? 'is-project' : ''} ${item.satellite ? 'is-satellite' : ''}`}>{item.onSelect ? <button className={`space-label label-${item.kind} ${item.active ? 'active' : ''}`} onClick={item.onSelect} aria-pressed={item.active} style={{ pointerEvents: 'auto' }}>{item.kind === 'root' ? <><span>YIDAN SHAO</span><strong>My work</strong></> : <>{item.kind === 'project' && <span>{projects[item.index].number}</span>}<strong>{item.label}</strong></>}</button> : <span className="space-label label-leaf"><strong>{item.label}</strong></span>}
        {item.kind === 'project' && <Link className="space-case-link" href={`/projects/${projects[item.index].slug}`} aria-label={`Read ${projects[item.index].title} case study`} title="Read case study" style={{ pointerEvents: 'auto' }}><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M7 7h10v10" /></svg></Link>}
      </div>
    </Html>}
  </group>;
}

function Connection({ start, end, active, positions, animate }: { start: Item; end: Item; active: boolean; positions: React.RefObject<Map<string, THREE.Vector3>>; animate: boolean }) {
  const line = useRef<THREE.Mesh>(null);
  const particle = useRef<THREE.Mesh>(null);
  const curveRef = useRef(new THREE.QuadraticBezierCurve3());
  const previous = useRef('');
  useFrame(state => {
    const curve = curveRef.current;
    const a = positions.current.get(start.id) ?? new THREE.Vector3(...start.position);
    const b = positions.current.get(end.id) ?? new THREE.Vector3(...end.position);
    curve.v0.copy(a); curve.v2.copy(b); curve.v1.copy(a).lerp(b, .5); curve.v1.z -= .5;
    const key = `${active},${a.x.toFixed(3)},${a.y.toFixed(3)},${a.z.toFixed(3)},${b.x.toFixed(3)},${b.y.toFixed(3)},${b.z.toFixed(3)}`;
    if (line.current && previous.current !== key) { line.current.geometry.dispose(); line.current.geometry = new THREE.TubeGeometry(curve, 24, active ? .018 : .009, 5, false); previous.current = key; }
    if (particle.current) particle.current.position.copy(curve.getPoint((state.clock.elapsedTime * .17 + end.index * .14) % 1));
  });
  return <><mesh ref={line}><bufferGeometry /><meshBasicMaterial color={end.color} transparent opacity={active ? .65 : .18} /></mesh>{active && animate && <mesh ref={particle}><sphereGeometry args={[.045, 10, 8]} /><meshBasicMaterial color={end.color} /></mesh>}</>;
}

function Scene(props: Props & { labelPortal: LabelPortal }) {
  const controls = useRef<OrbitControlsImpl>(null);
  const positions = useRef(new Map<string, THREE.Vector3>());
  const [dragging, setDragging] = useState(false);
  const { camera, size, invalidate } = useThree();
  const destination = useRef<THREE.Vector3 | null>(null);
  const lookAt = useRef(new THREE.Vector3());
  const compact = size.width < 650;
  const { selection, onProject, onTechnology, onReset } = props;
  const expanded = selection.project !== null;
  const compactLeaves = compact && selection.technology !== null;
  const aspect = size.width / size.height;
  const tangent = Math.tan(THREE.MathUtils.degToRad(43 / 2));
  const frameWidth = compact ? 16 : 26;
  const distance = Math.max(22, frameWidth / (2 * tangent * aspect));
  const worldPerPixel = 2 * tangent * distance / size.height;
  const items = useMemo(() => {
    const width = size.width, height = size.height;
    const point = (x: number, y: number, z = 0): Point => [x * worldPerPixel, y * worldPerPixel, z];
    const labelWidth = compact ? width < 300 ? 84 : 98 : width < 900 ? 110 : 152;
    const radiusY = (height - 280) / 2;
    const rootX = expanded ? width * (compact ? .21 : .19) : 0;
    const rootY = expanded && compact ? 0 : 40;
    const radiusX = Math.min(width * (expanded && !compact ? .215 : .34), width / 2 - rootX - labelWidth / 2 - (compact ? 10 : 18));
    const overview = orbitPoints(projects.length, radiusX, radiusY, Math.PI / 2, labelWidth + 18, 78);
    const focused = orbitPoints(projects.length, radiusX, radiusY, Math.PI, labelWidth + 18, 78);
    const satellites = orbitPoints(projects.length - 1, width * .19, height * .21);
    const rootPosition = point(rootX, rootY);
    const selectedPosition = compact ? point(-width * .03, height * .29, .2) : point(rootX - radiusX, rootY, .2);
    const projectRadius = (compact ? 18 : 27) * worldPerPixel;
    const result: Item[] = [{ id: 'root', kind: 'root', label: 'My work', position: rootPosition, radius: (compact ? 28 : 39) * worldPerPixel, gradient: rootGradient, color: '#d7bc94', active: false, index: 0, onSelect: onReset }];
    let sibling = 0;
    projects.forEach((project, index) => {
      const active = selection.project === index;
      const rank = active ? 0 : sibling++;
      const anglePoint = expanded ? focused[rank + 1] : overview[index];
      const satellite = satellites[rank];
      const position = expanded && active ? selectedPosition : expanded && compact
        ? point(rootX + satellite.x, satellite.y, -.2)
        : point((expanded ? rootX : 0) + anglePoint.x, anglePoint.y + 40, Math.sin(index * 1.3) * .18);
      result.push({ id: project.slug, kind: 'project', label: graphTitles[index], position, radius: expanded && compact && !active ? worldPerPixel * 9 : projectRadius, quiet: compact && expanded && !active, muted: expanded && !active, gradient: gradients[index % gradients.length], color: colors[index % colors.length], active, index, onSelect: () => onProject(index) });
    });
    if (selection.project !== null) {
      const project = projects[selection.project];
      project.tags.forEach((tag, index) => {
        if (compactLeaves && selection.technology !== index) return;
        const position = compact ? point(-width * .25, height * .12 - (compactLeaves ? 0 : index * 82), .1)
          : point(-width * .245, 40 + (project.tags.length - 1) * 47 - index * 94, .15);
        result.push({ id: `${project.slug}-tech-${index}`, kind: 'technology', label: tag, position, radius: (compact ? 11 : 15) * worldPerPixel, spawn: selectedPosition, spawnFrom: project.slug, delay: index * .075, gradient: satelliteGradient(gradients[selection.project! % gradients.length]), color: colors[selection.project! % colors.length], active: selection.technology === index, index, onSelect: () => onTechnology(index) });
      });
      if (selection.technology !== null) {
        const technology = result.find(node => node.id === `${project.slug}-tech-${selection.technology}`)!;
        graphLeaves(selection.project, selection.technology).forEach((label, index, all) => result.push({ id: `${technology.id}-leaf-${index}`, kind: 'leaf', label,
          position: compact ? point(-width * .25, -height * .04 - index * 90, .1) : point(-width * .414, technology.position[1] / worldPerPixel + (all.length - 1) * 44 - index * 88, .1),
          radius: 8 * worldPerPixel, spawn: technology.position, spawnFrom: technology.id, delay: index * .09, gradient: leafGradient, color: '#c5bcb2', active: true, index }));
      }
    }
    return result;
  }, [expanded, compact, compactLeaves, selection, onReset, onProject, onTechnology, size.width, size.height, worldPerPixel]);
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
    if (!destination.current || !controls.current) return;
    const speed = props.reducedMotion ? 1 : 1 - Math.exp(-delta * 4);
    camera.position.lerp(destination.current, speed); controls.current.target.lerp(lookAt.current, speed); controls.current.update();
    if (camera.position.distanceTo(destination.current) < .01) destination.current = null; else invalidate();
  });
  const root = items[0];
  return <>
    <color attach="background" args={['#f0efeb']} /><fog attach="fog" args={['#f0efeb', distance + 8, distance + 50]} />
    <ambientLight intensity={.9} /><hemisphereLight args={['#faf5f1', '#ccc5d5', 1.5]} /><directionalLight position={[-6, 8, 6]} intensity={2.3} color="#fff5eb" /><directionalLight position={[4, -3, 3]} intensity={.7} color="#f4d7cf" />
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -Math.max(6.2, size.height * worldPerPixel / 2 + 1), 0]}><mesh receiveShadow><circleGeometry args={[16, 80]} /><meshStandardMaterial color="#e8e8e1" roughness={1} transparent opacity={.6} /></mesh>{[3, 6, 9, 12].map(radius => <Line key={radius} points={Array.from({length:97},(_,i)=>[Math.cos(i/96*Math.PI*2)*radius,Math.sin(i/96*Math.PI*2)*radius,.01] as Point)} color="#c7c8c0" lineWidth={.5} />)}</group>
    {items.filter(item => item.kind === 'project').map(item => <Connection key={`root-${item.id}`} start={root} end={item} active={item.active || !expanded} positions={positions} animate={props.animate} />)}
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
    const attributes: WebGLContextAttributes = { alpha: false, depth: true, stencil: false, powerPreference: 'default' };
    let context: WebGL2RenderingContext | null = null;
    try { context = canvas.getContext('webgl2', { ...attributes, antialias: true }); } catch { /* Retry with fewer graphics requirements. */ }
    if (!context) context = canvas.getContext('webgl2', { ...attributes, antialias: false });
    if (!context) throw new Error('Unable to create a WebGL 2 graphics context.');
    return new THREE.WebGLRenderer({ ...defaults, context, alpha: false, antialias: context.getContextAttributes()?.antialias ?? false });
  }} onCreated={({ gl }) => {
    gl.domElement.addEventListener('webglcontextlost', event => { event.preventDefault(); props.onUnavailable('context-lost'); }, { once: true });
    props.onReady();
  }}><Scene {...props} labelPortal={labelPortal} /></Canvas></div>;
}
