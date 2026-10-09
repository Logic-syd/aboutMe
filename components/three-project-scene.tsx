'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import { Html, OrbitControls, Line } from '@react-three/drei';
import Link from 'next/link';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { projects } from '@/lib/projects';
import { graphLeaves, graphTitles, type GraphSelection } from '@/lib/graph';

type Gradient = readonly [string, string, string];
type Point = [number, number, number];
type Item = { id: string; kind: 'root' | 'project' | 'technology' | 'leaf'; label: string; position: Point; spawn?: Point; spawnFrom?: string; delay?: number; quiet?: boolean; satellite?: boolean; gradient?: Gradient; color: string; active: boolean; index: number; onSelect?: () => void };
type LabelPortal = React.RefObject<HTMLDivElement>;
type Props = { onUnavailable: () => void; onReady: () => void; interaction: { nodeId: string; revision: number }; selection: GraphSelection; onProject: (index: number) => void; onTechnology: (index: number) => void; onReset: () => void; animate: boolean; reducedMotion: boolean; visible: boolean; view: { reset: number; zoom: number } };
const colors = ['#dba0b3', '#d4bf98', '#b7aad2', '#a8c4c0', '#bac797', '#a7bdd6', '#e7ad95'];
const rootGradient: Gradient = ['#ffe3cc', '#dd719f', '#8771d2'];
const leafGradient: Gradient = ['#f0f7c8', '#79bea8', '#748dc8'];
const gradients: Gradient[] = [rootGradient, ['#fff0ab', '#daa06e', '#ae6eb5'], ['#f1c4ff', '#a282e4', '#689bd3'], ['#d0f3dd', '#68b8b3', '#8979ce'], ['#f2f5b6', '#aac477', '#6eaaa7'], ['#d4f3ff', '#7faadd', '#a17ac9'], ['#ffe2ae', '#dc967d', '#a377ad']];
// All projects remain in one scene. Wider screens use four curved columns;
// narrow screens use two, with spacing measured in pixels to protect labels.
function initialProjectPosition(index: number, count: number, width: number, worldPerPixel: number): Point {
  if (count <= 6 && width >= 650) {
    const angle = Math.PI * 5 / 6 + index * Math.PI * 2 / count;
    return [Math.cos(angle) * 4.9, Math.sin(angle) * 3.9 + 50 * worldPerPixel, Math.sin(index * 1.3) * .6];
  }
  const columns = width >= 900 && count > 10 ? 4 : 2;
  const perColumn = Math.floor(count / columns);
  const extra = count % columns;
  let column = 0;
  let row = index;
  while (row >= perColumn + (column < extra ? 1 : 0)) {
    row -= perColumn + (column < extra ? 1 : 0);
    column++;
  }
  const rows = perColumn + (column < extra ? 1 : 0);
  const side = column < columns / 2 ? -1 : 1;
  const offset = columns === 4 ? [0.39, 0.2, 0.2, 0.39][column] : width < 650 ? .32 : .34;
  const bow = .94 + .06 * Math.cos((row - (rows - 1) / 2) * Math.PI / rows);
  const y = ((rows - 1) / 2 - row) * (width < 650 ? 108 : 118) * worldPerPixel;
  return [side * offset * width * worldPerPixel * bow, (side < 0 ? y : -y) + 50 * worldPerPixel, Math.sin(index * 1.3) * .4];
}

function SphereNode({ item, animate, reducedMotion, onDrag, onPosition, labelPortal, positions, pulse }: { pulse: number; positions: React.RefObject<Map<string, THREE.Vector3>>; labelPortal: LabelPortal; item: Item; animate: boolean; reducedMotion: boolean; onDrag: (dragging: boolean) => void; onPosition: (id: string, position: THREE.Vector3) => void }) {
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
  const size = item.kind === 'root' ? .88 : item.kind === 'project' ? item.quiet ? .2 : item.satellite ? .32 : .5 : item.kind === 'technology' ? .27 : .16;
  const { viewport, size: screen, invalidate } = useThree();
  const geometry = useMemo(() => {
    const sphere = new THREE.SphereGeometry(size, 40, 32);
    const points = sphere.getAttribute('position');
    const shades = (item.gradient ?? rootGradient).map(color => new THREE.Color(color));
    const colors = new Float32Array(points.count * 3);
    const tint = new THREE.Color();
    for (let index = 0; index < points.count; index++) {
      const blend = THREE.MathUtils.clamp((points.getY(index) - points.getX(index) * .35 + points.getZ(index) * .2) / (size * 2.16) + .5, 0, 1);
      if (blend < .5) tint.copy(shades[2]).lerp(shades[1], blend * 2);
      else tint.copy(shades[1]).lerp(shades[0], (blend - .5) * 2);
      tint.toArray(colors, index * 3);
    }
    sphere.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return sphere;
  }, [size, item.gradient]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  useEffect(() => {
    if (pulse > 0 && !reducedMotion) { scaleValue.current = .92; scaleVelocity.current = 1.7; velocity.current.y += 2.2; }
    invalidate();
  }, [pulse, reducedMotion, invalidate]);
  function kick() {
    if (!reducedMotion) { scaleValue.current = .92; scaleVelocity.current = 1.7; velocity.current.y += 2.2; }
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
    const float = animate && !dragging.current ? Math.sin(time * .8 + item.index * 1.1) * .095 : 0;
    const target = new THREE.Vector3(...item.position).add(offset.current);
    target.y += float;
    const step = Math.min(delta, 1 / 30);
    age.current += step;
    const positionChanged = group.current.position.distanceToSquared(target) > .000001;
    if (reducedMotion) { group.current.position.copy(target); velocity.current.set(0, 0, 0); }
    else if (age.current >= 0) {
      velocity.current.addScaledVector(target.clone().sub(group.current.position), step * 58);
      velocity.current.multiplyScalar(Math.exp(-step * 9));
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
  }
  function move(event: ThreeEvent<PointerEvent>) {
    if (!dragging.current) return;
    event.stopPropagation();
    const dx = event.clientX - last.current.x; const dy = event.clientY - last.current.y;
    moved.current += Math.abs(dx) + Math.abs(dy);
    offset.current.x = THREE.MathUtils.clamp(offset.current.x + dx * viewport.width / screen.width, -2.3, 2.3);
    offset.current.y = THREE.MathUtils.clamp(offset.current.y - dy * viewport.height / screen.height, -2.3, 2.3);
    last.current = { x: event.clientX, y: event.clientY }; invalidate();
  }
  function up(event: ThreeEvent<PointerEvent>) {
    if (!dragging.current) return;
    event.stopPropagation(); pressed.current = false; dragging.current = false; onDrag(false);
    (event.target as unknown as { releasePointerCapture: (id: number) => void }).releasePointerCapture(event.pointerId);
    if (moved.current < 6 && item.onSelect) item.onSelect(); else kick();
    invalidate();
  }
  return <group ref={group} name={`${item.kind}-${item.id}`} position={initialPosition}>
    <mesh ref={shell} geometry={geometry} castShadow onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={() => { pressed.current = false; dragging.current = false; onDrag(false); }} onPointerOver={event => { event.stopPropagation(); setHovered(true); }} onPointerOut={() => setHovered(false)}>
      <meshPhysicalMaterial vertexColors color="#ffffff" metalness={.1} roughness={.28} clearcoat={1} clearcoatRoughness={.12} emissive={item.active ? '#9e3159' : '#000000'} emissiveIntensity={item.active ? .14 : 0} />
    </mesh>
    {item.kind === 'root' && <mesh rotation={[.8, .1, .3]}><torusGeometry args={[1.18, .018, 8, 96]} /><meshStandardMaterial color="#b46282" metalness={.6} roughness={.2} /></mesh>}
    {item.active && item.kind !== 'root' && <mesh rotation={[.5, .2, -.4]}><torusGeometry args={[size * 1.35, .025, 8, 64]} /><meshStandardMaterial color="#d3497c" emissive="#d3497c" emissiveIntensity={.4} /></mesh>}
    {!item.quiet && <Html portal={labelPortal} center position={[0, -size - (item.kind === 'project' && screen.width < 650 ? 1.9 : .24), .05]} zIndexRange={[20, 1]} style={{ pointerEvents: 'none' }}>
      <div className={`space-node-label ${item.satellite ? 'is-satellite' : ''}`}>{item.onSelect ? <button className={`space-label label-${item.kind} ${item.active ? 'active' : ''}`} onClick={item.onSelect} aria-pressed={item.active} style={{ pointerEvents: 'auto' }}>{item.kind === 'root' ? <><span>YIDAN SHAO</span><strong>My work</strong></> : <>{item.kind === 'project' && <span>PROJECT / {projects[item.index].number}</span>}<strong>{item.label}</strong></>}</button> : <span className="space-label label-leaf"><strong>{item.label}</strong></span>}
        {item.kind === 'project' && <Link className="space-case-link" href={`/projects/${projects[item.index].slug}`} aria-label={`Read ${projects[item.index].title} case study`} style={{ pointerEvents: 'auto' }}>Read case study <span aria-hidden="true">↗</span></Link>}
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
  return <><mesh ref={line}><bufferGeometry /><meshBasicMaterial color={active ? '#bd4d78' : '#acaea8'} transparent opacity={active ? .85 : .35} /></mesh>{active && animate && <mesh ref={particle}><sphereGeometry args={[.045, 10, 8]} /><meshBasicMaterial color="#f581ad" /></mesh>}</>;
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
  const frameWidth = compact ? 14.6 : expanded || projects.length > 6 ? 26 : 20;
  const distance = Math.max(compact ? 29 : 17, frameWidth / (2 * tangent * aspect));
  const worldPerPixel = 2 * tangent * distance / size.height;
  const items = useMemo(() => {
    const rootPosition: Point = expanded ? compact ? [2.5, .8, -.5] : [2.6, .25, -.5] : [0, 50 * worldPerPixel, 0];
    const selectedPosition: Point = compact ? [0, 8, .7] : [-1.5, .4, .7];
    const result: Item[] = [{ id: 'root', kind: 'root', label: 'My work', position: rootPosition, gradient: rootGradient, color: '#dca3b9', active: false, index: 0, onSelect: onReset }];
    let sibling = 0;
    projects.forEach((project, index) => {
      const active = selection.project === index;
      const rank = active ? 0 : sibling++;
      const siblingCount = projects.length - 1;
      const rows = Math.ceil(siblingCount / (siblingCount > 7 ? 2 : 1));
      const column = Math.floor(rank / Math.max(1, rows));
      const row = rank % Math.max(1, rows);
      const spread = row - (rows - 1) / 2;
      const angle = spread * 1.92 / Math.max(1, rows - 1);
      const siblingX = column === 0 ? .265 : size.width < 900 ? .40 : .415;
      const siblingPosition: Point = compact
        ? [4.7 + column * 1.2, -spread * Math.min(1.9, 8 / Math.max(1, rows - 1)), -.6]
        : siblingCount > 7
          ? [siblingX * size.width * worldPerPixel, -spread * 90 * worldPerPixel, -.8 + .2 * Math.cos(row)]
          : [rootPosition[0] + 4.6 * Math.cos(angle), spread * 108 * worldPerPixel, -.8 + .3 * Math.cos(angle)];
      result.push({ id: project.slug, kind: 'project', label: graphTitles[index], position: expanded ? active ? selectedPosition : siblingPosition : initialProjectPosition(index, projects.length, size.width, worldPerPixel), quiet: compact && expanded && !active, satellite: expanded && !active && projects.length > 8, gradient: gradients[index % gradients.length], color: colors[index % colors.length], active, index, onSelect: () => onProject(index) });
    });
    if (selection.project !== null) {
      const project = projects[selection.project];
      project.tags.forEach((tag, index) => {
        if (compactLeaves && selection.technology !== index) return;
        const position: Point = compact ? [-3, 2.5 - (compactLeaves ? 0 : index * 60 * worldPerPixel), .6] : [-6.1 - Math.cos(index * 1.4) * .2, (project.tags.length - 1) * .95 - index * 1.9, .5 + Math.sin(index) * .4];
        result.push({ id: `${project.slug}-tech-${index}`, kind: 'technology', label: tag, position, spawn: selectedPosition, spawnFrom: project.slug, delay: index * .075, gradient: gradients[selection.project! % gradients.length], color: '#ead8df', active: selection.technology === index, index, onSelect: () => onTechnology(index) });
      });
      if (selection.technology !== null) {
        const technology = result.find(node => node.id === `${project.slug}-tech-${selection.technology}`)!;
        graphLeaves(selection.project, selection.technology).forEach((label, index, all) => result.push({ id: `${technology.id}-leaf-${index}`, kind: 'leaf', label, position: compact ? [-3, -.9 - index * 58 * worldPerPixel, index % 2 ? .4 : -.4] : [-10.6, technology.position[1] + (all.length - 1) * .9 - index * 1.8, index % 2 ? .5 : -.5], spawn: technology.position, spawnFrom: technology.id, delay: index * .09, gradient: leafGradient, color: '#b9cebd', active: true, index }));
      }
    }
    return result;
  }, [expanded, compact, compactLeaves, selection, onReset, onProject, onTechnology, size.width, worldPerPixel]);
  useEffect(() => {
    destination.current = new THREE.Vector3(0, 3.5, distance);
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
    <ambientLight intensity={1.4} /><hemisphereLight args={['#fff8f5', '#a8b7ac', 2]} /><directionalLight position={[-5, 9, 7]} intensity={3.2} /><pointLight position={[5, 4, -3]} intensity={25} color="#f4a9c4" />
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -Math.max(6.2, size.height * worldPerPixel / 2 + 1), 0]}><mesh receiveShadow><circleGeometry args={[16, 80]} /><meshStandardMaterial color="#e8e8e1" roughness={1} transparent opacity={.6} /></mesh>{[3, 6, 9, 12].map(radius => <Line key={radius} points={Array.from({length:97},(_,i)=>[Math.cos(i/96*Math.PI*2)*radius,Math.sin(i/96*Math.PI*2)*radius,.01] as Point)} color="#c7c8c0" lineWidth={.5} />)}</group>
    {items.filter(item => item.kind === 'project').map(item => <Connection key={`root-${item.id}`} start={root} end={item} active={item.active || !expanded} positions={positions} animate={props.animate} />)}
    {expanded && items.filter(item => item.kind === 'technology').map(item => <Connection key={`tech-${item.id}`} start={items.find(node => node.id === projects[props.selection.project!].slug)!} end={item} active={props.selection.technology === null || item.active} positions={positions} animate={props.animate} />)}
    {props.selection.technology !== null && items.filter(item => item.kind === 'leaf').map(item => <Connection key={`leaf-${item.id}`} start={items.find(node => node.id === `${projects[props.selection.project!].slug}-tech-${props.selection.technology}`)!} end={item} active positions={positions} animate={props.animate} />)}
    {items.map(item => <SphereNode pulse={props.interaction.nodeId === item.id ? props.interaction.revision : 0} positions={positions} labelPortal={props.labelPortal} key={item.id} item={item} animate={props.animate} reducedMotion={props.reducedMotion} onDrag={setDragging} onPosition={(id,position) => { const cached = positions.current.get(id); if (cached) cached.copy(position); else positions.current.set(id, position.clone()); }} />)}
    <OrbitControls ref={controls} makeDefault enabled={!dragging} enablePan={false} enableZoom={false} enableDamping={!props.reducedMotion} minPolarAngle={.45} maxPolarAngle={Math.PI * .7} onStart={() => { destination.current = null; }} />
  </>;
}

export default function ThreeProjectScene(props: Props) {
  const labelPortal = useRef<HTMLDivElement>(null!);
  return <div className="three-renderer"><div className="three-label-layer" ref={labelPortal} /><Canvas camera={{ position: [0, 3.5, 17], fov: 43 }} dpr={[1, 1.5]} frameloop={props.animate && props.visible ? 'always' : 'demand'} gl={{ antialias: true, alpha: false, powerPreference: 'low-power' }} onCreated={({ gl }) => {
    gl.domElement.addEventListener('webglcontextlost', event => { event.preventDefault(); props.onUnavailable(); }, { once: true });
    props.onReady();
  }}><Scene {...props} labelPortal={labelPortal} /></Canvas></div>;
}
