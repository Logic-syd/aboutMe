'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import { Html, OrbitControls, Line } from '@react-three/drei';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { projects } from '@/lib/projects';
import { graphLeaves, graphTitles, type GraphSelection } from '@/lib/graph';

type Point = [number, number, number];
type Item = { id: string; kind: 'root' | 'project' | 'technology' | 'leaf'; label: string; position: Point; color: string; active: boolean; index: number; onSelect?: () => void };
type LabelPortal = React.RefObject<HTMLDivElement>;
type Props = { selection: GraphSelection; onProject: (index: number) => void; onTechnology: (index: number) => void; onReset: () => void; animate: boolean; reducedMotion: boolean; visible: boolean; view: { reset: number; zoom: number } };
const colors = ['#dba0b3', '#d4bf98', '#b7aad2', '#a8c4c0', '#bac797', '#a7bdd6'];
const compactPositions: Point[] = [[-3.1, 2.4, .6], [-3.1, -1.8, 1], [0, -4.8, -.5], [3.1, -1.8, .1], [3.1, 2.4, -1], [0, 5.4, -.2]];
const initialPositions: Point[] = [[-4.3, 2.1, .6], [-4.1, -1.7, 1], [-.3, -3, -.5], [4.2, -1.8, .1], [4, 2, -1], [.1, 3.3, -.2]];

function SphereNode({ item, animate, reducedMotion, onDrag, onPosition, labelPortal }: { labelPortal: LabelPortal; item: Item; animate: boolean; reducedMotion: boolean; onDrag: (dragging: boolean) => void; onPosition: (id: string, position: THREE.Vector3) => void }) {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const offset = useRef(new THREE.Vector3());
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const moved = useRef(0);
  const bounce = useRef(0);
  const size = item.kind === 'root' ? .88 : item.kind === 'project' ? .5 : item.kind === 'technology' ? .27 : .16;
  const { viewport, size: screen, invalidate } = useThree();
  useEffect(() => { offset.current.set(0, 0, 0); invalidate(); }, [item.position, invalidate]);
  useFrame((state, delta) => {
    if (!group.current) return;
    const time = state.clock.elapsedTime;
    const float = animate && !dragging.current ? Math.sin(time * .8 + item.index * 1.1) * .095 : 0;
    const target = new THREE.Vector3(...item.position).add(offset.current);
    target.y += float;
    const speed = reducedMotion ? 1 : 1 - Math.exp(-delta * 8);
    group.current.position.lerp(target, speed);
    bounce.current = Math.max(0, bounce.current - delta * 3);
    const scale = (hovered ? 1.12 : 1) + Math.sin(bounce.current * Math.PI * 3) * bounce.current * .12;
    shell.current?.scale.lerp(new THREE.Vector3(scale, scale, scale), speed);
    onPosition(item.id, group.current.position);
    if (group.current.position.distanceTo(target) > .002 || bounce.current > 0) invalidate();
  });
  function down(event: ThreeEvent<PointerEvent>) {
    event.stopPropagation(); dragging.current = true; moved.current = 0; last.current = { x: event.clientX, y: event.clientY }; onDrag(true);
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
    event.stopPropagation(); dragging.current = false; onDrag(false); bounce.current = reducedMotion ? 0 : 1;
    (event.target as unknown as { releasePointerCapture: (id: number) => void }).releasePointerCapture(event.pointerId);
    if (moved.current < 6) item.onSelect?.();
    invalidate();
  }
  return <group ref={group} position={item.position}>
    <mesh ref={shell} castShadow onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={() => { dragging.current = false; onDrag(false); }} onPointerOver={event => { event.stopPropagation(); setHovered(true); }} onPointerOut={() => setHovered(false)}>
      <sphereGeometry args={[size, 40, 32]} />
      <meshPhysicalMaterial color={item.color} metalness={.22} roughness={.2} clearcoat={1} clearcoatRoughness={.12} emissive={item.active ? '#9e3159' : '#000000'} emissiveIntensity={item.active ? .14 : 0} />
    </mesh>
    {item.kind === 'root' && <mesh rotation={[.8, .1, .3]}><torusGeometry args={[1.18, .018, 8, 96]} /><meshStandardMaterial color="#b46282" metalness={.6} roughness={.2} /></mesh>}
    {item.active && item.kind !== 'root' && <mesh rotation={[.5, .2, -.4]}><torusGeometry args={[size * 1.35, .025, 8, 64]} /><meshStandardMaterial color="#d3497c" emissive="#d3497c" emissiveIntensity={.4} /></mesh>}
    <Html portal={labelPortal} center position={[0, -size - .24, .05]} zIndexRange={[20, 1]} style={{ pointerEvents: 'none' }}>
      {item.onSelect ? <button className={`space-label label-${item.kind} ${item.active ? 'active' : ''}`} onClick={item.onSelect} aria-pressed={item.active} style={{ pointerEvents: 'auto' }}>{item.kind === 'root' ? <><span>YIDAN SHAO</span><strong>My work</strong></> : <>{item.kind === 'project' && <span>PROJECT / 0{item.index + 1}</span>}<strong>{item.label}</strong></>}</button> : <span className="space-label label-leaf"><strong>{item.label}</strong></span>}
    </Html>
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
    const key = `${a.x.toFixed(3)},${a.y.toFixed(3)},${a.z.toFixed(3)},${b.x.toFixed(3)},${b.y.toFixed(3)},${b.z.toFixed(3)}`;
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
  const items = useMemo(() => {
    const result: Item[] = [{ id: 'root', kind: 'root', label: 'My work', position: expanded ? compact ? compactLeaves ? [-2.5, 3.3, -1.2] : [-2.5, 3.5, -1.2] : [-5.6, .4, -1.2] : [0, 0, 0], color: '#dca3b9', active: false, index: 0, onSelect: onReset }];
    projects.forEach((project,index) => { if (compact && expanded && selection.project !== index) return; result.push({ id: project.slug, kind: 'project', label: graphTitles[index], position: compact && expanded ? compactLeaves ? [2.5, 3.3, .7] : [-2.5, .1, .7] : expanded ? [-2.7 + Math.sin(index) * .22, 3.4 - index * 1.36, Math.cos(index * 1.4) * .7] : compact ? compactPositions[index] : initialPositions[index], color: colors[index], active: selection.project === index, index, onSelect: () => onProject(index) }); });
    if (selection.project !== null) {
      const project = projects[selection.project];
      project.tags.forEach((tag,index) => { if (compactLeaves && selection.technology !== index) return; result.push({ id: `tech-${index}`, kind: 'technology', label: tag, position: compact ? compactLeaves ? [-2.5, 0, .6] : [2.1, (project.tags.length - 1) * .95 - index * 1.9, .6] : [1.4 + Math.sin(index * 1.5) * .45, (project.tags.length - 1) * .7 - index * 1.4, .6 + Math.cos(index) * .7], color: '#ead8df', active: selection.technology === index, index, onSelect: () => onTechnology(index) }); });
      if (selection.technology !== null) graphLeaves(selection.project, selection.technology).forEach((label,index,all) => result.push({ id: `leaf-${index}`, kind: 'leaf', label, position: [compact ? 2.5 : 5, (all.length - 1) * .95 - index * 1.9, index % 2 ? .5 : -.5], color: '#b9cebd', active: true, index }));
    }
    return result;
  }, [expanded, compact, compactLeaves, selection, onReset, onProject, onTechnology]);
  useEffect(() => {
    const distance = compact ? expanded ? 24 : 29 : expanded ? 19 : 17;
    destination.current = new THREE.Vector3(expanded ? .3 : 0, 3.5, distance);
    lookAt.current.set(0, 0, 0);
    invalidate();
  }, [expanded, compact, props.view.reset, invalidate]);
  useEffect(() => {
    if (!controls.current) return;
    const base = compact ? expanded ? 24 : 29 : expanded ? 19 : 17;
    const distance = THREE.MathUtils.clamp(base - props.view.zoom * 2, compact ? 13 : 9, 42);
    const direction = camera.position.clone().sub(controls.current.target).normalize();
    destination.current = controls.current.target.clone().addScaledVector(direction, distance);
    invalidate();
  }, [props.view.zoom, props.view.reset, compact, expanded, camera, invalidate]);
  useFrame((_, delta) => {
    if (!destination.current || !controls.current) return;
    const speed = props.reducedMotion ? 1 : 1 - Math.exp(-delta * 4);
    camera.position.lerp(destination.current, speed); controls.current.target.lerp(lookAt.current, speed); controls.current.update();
    if (camera.position.distanceTo(destination.current) < .01) destination.current = null; else invalidate();
  });
  const root = items[0];
  return <>
    <color attach="background" args={['#f0efeb']} /><fog attach="fog" args={['#f0efeb', 25, 65]} />
    <ambientLight intensity={1.4} /><hemisphereLight args={['#fff8f5', '#a8b7ac', 2]} /><directionalLight position={[-5, 9, 7]} intensity={3.2} /><pointLight position={[5, 4, -3]} intensity={25} color="#f4a9c4" />
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -4.8, 0]}><mesh receiveShadow><circleGeometry args={[16, 80]} /><meshStandardMaterial color="#e8e8e1" roughness={1} transparent opacity={.6} /></mesh>{[3, 6, 9, 12].map(radius => <Line key={radius} points={Array.from({length:97},(_,i)=>[Math.cos(i/96*Math.PI*2)*radius,Math.sin(i/96*Math.PI*2)*radius,.01] as Point)} color="#c7c8c0" lineWidth={.5} />)}</group>
    {items.filter(item => item.kind === 'project').map(item => <Connection key={`root-${item.id}`} start={root} end={item} active={item.active || !expanded} positions={positions} animate={props.animate} />)}
    {expanded && items.filter(item => item.kind === 'technology').map(item => <Connection key={`tech-${item.id}`} start={items.find(node => node.id === projects[props.selection.project!].slug)!} end={item} active={props.selection.technology === null || item.active} positions={positions} animate={props.animate} />)}
    {props.selection.technology !== null && items.filter(item => item.kind === 'leaf').map(item => <Connection key={`leaf-${item.id}`} start={items.find(node => node.id === `tech-${props.selection.technology}`)!} end={item} active positions={positions} animate={props.animate} />)}
    {items.map(item => <SphereNode labelPortal={props.labelPortal} key={item.id} item={item} animate={props.animate} reducedMotion={props.reducedMotion} onDrag={setDragging} onPosition={(id,position) => { const cached = positions.current.get(id); if (cached) cached.copy(position); else positions.current.set(id, position.clone()); }} />)}
    <OrbitControls ref={controls} makeDefault enabled={!dragging} enablePan={false} enableZoom={false} enableDamping={!props.reducedMotion} minPolarAngle={.45} maxPolarAngle={Math.PI * .7} onStart={() => { destination.current = null; }} />
  </>;
}

export default function ThreeProjectScene(props: Props) {
  const [failed, setFailed] = useState(false);
  const labelPortal = useRef<HTMLDivElement>(null!);
  if (failed) return <div className="three-loading">3D rendering is unavailable. All projects and connections remain accessible below.</div>;
  return <div className="three-renderer"><div className="three-label-layer" ref={labelPortal} /><Canvas camera={{ position: [0, 3.5, 17], fov: 43 }} dpr={[1, 1.5]} frameloop={props.animate && props.visible ? 'always' : 'demand'} gl={{ antialias: true, alpha: false, powerPreference: 'low-power' }} fallback={<div className="three-loading">3D is unavailable. Use the project buttons below.</div>} onCreated={({ gl }) => { gl.domElement.addEventListener('webglcontextlost', event => { event.preventDefault(); setFailed(true); }, { once: true }); }}><Scene {...props} labelPortal={labelPortal} /></Canvas></div>;
}
