'use client';

import { useState } from 'react';
import Link from 'next/link';
import { projects } from '@/lib/projects';
import styles from './pixel-town.module.css';

type PlaceId = 'studio' | 'cafe' | 'cabin' | 'bottles' | 'station' | 'post';
const places: { id: PlaceId; name: string; subtitle: string; x: number; y: number; color: string; roof: string; title: string; story: string; slugs: string[]; href: string; action: string }[] = [
  { id: 'studio', name: 'The studio', subtitle: 'Commercial work', x: 21, y: 25, color: '#e7d7c4', roof: '#978fa6', title: 'A place for complex problems.', story: 'Energy APIs, city dashboards, payments and tools for teams. My work connects frontend implementation with the details that make a product usable.', slugs: ['renewable-energy-api'], href: '#work', action: 'Browse all projects' },
  { id: 'cafe', name: 'Coffee corner', subtitle: 'An independent product', x: 49, y: 19, color: '#eedbd6', roof: '#ae8390', title: 'Good places are worth finding.', story: 'I’m building a coffee and craft beer discovery map around more than 500 curated venues. It brings together a map interface, location data and full-stack development.', slugs: ['discovery-map'], href: '/projects/discovery-map', action: 'Visit the case study' },
  { id: 'cabin', name: 'Mountain hut', subtitle: 'Hiking meets chess', x: 77, y: 25, color: '#dcc9b0', roof: '#8b9c94', title: 'A chessboard for a mountain break.', story: 'I enjoy hiking and chess. Mountain Chess grew from wanting to play during a solo hiking break, with a computer opponent and offline play after the first online setup.', slugs: ['mountain-chess'], href: '/projects/mountain-chess', action: 'Explore Mountain Chess' },
  { id: 'station', name: 'The station', subtitle: 'Places & experience', x: 21, y: 62, color: '#e0ddd0', roof: '#9aabb1', title: 'Different places. A growing perspective.', story: 'My work has taken me through Hangzhou, Shanghai and Munich. Each team brought a different product domain, a different way to collaborate, and something to carry forward.', slugs: [], href: '#professional-work', action: 'Follow my work experience' },
  { id: 'bottles', name: 'Bottle shop', subtitle: 'A playful everyday idea', x: 49, y: 67, color: '#d8e4d9', roof: '#8baaa2', title: 'Small routines can become playful ideas.', story: 'After moving to Germany, unfamiliar drinks bottles inspired Pfand Pause: a fictional sorting puzzle with six bottle designs and ten levels.', slugs: ['pfand-pause'], href: '/projects/pfand-pause', action: 'Explore Pfand Pause' },
  { id: 'post', name: 'The post office', subtitle: 'Say hello', x: 77, y: 62, color: '#ead9ce', roof: '#bb9991', title: 'There’s room for a new conversation.', story: 'I’m based in Munich, open to relocation, and looking for frontend and full-stack engineering opportunities. Let’s talk about a product, a team, or a new challenge.', slugs: [], href: 'mailto:yidanshao622@gmail.com', action: 'Send me a note' },
];

function Building({ place }: { place: typeof places[number] }) {
  return <svg viewBox="0 0 144 124" aria-hidden="true" shapeRendering="crispEdges">
    <rect x="14" y="109" width="122" height="8" fill="#65736a" opacity=".14" />
    <rect x="26" y="43" width="96" height="68" fill={place.color} /><rect x="26" y="102" width="96" height="9" fill="#b6a89b" />
    <path d="M18 48V36H30V26H42V16H106V26H118V36H130V48Z" fill={place.roof} /><rect x="26" y="44" width="96" height="6" fill="#514e56" opacity=".18" />
    <rect x="94" y="4" width="12" height="24" fill="#c3b4a6" /><rect x="91" y="4" width="18" height="6" fill="#ad9a8e" />
    <rect x="38" y="60" width="22" height="24" fill="#a6bec5" /><path d="M48 60V84M38 72H60" stroke="#f4ead9" strokeWidth="4" /><rect x="90" y="60" width="20" height="24" fill="#a6bec5" /><path d="M100 60V84M90 72H110" stroke="#f4ead9" strokeWidth="4" />
    <rect x="66" y="72" width="18" height="39" fill="#857a73" /><rect x="70" y="77" width="10" height="19" fill="#c7d6cd" /><rect x="78" y="99" width="3" height="3" fill="#eee1bf" />
    {place.id === 'studio' && <><rect x="43" y="28" width="57" height="14" fill="#eae5df" /><rect x="49" y="32" width="8" height="6" fill="#9daab7" /><rect x="61" y="32" width="8" height="6" fill="#b699aa" /><rect x="73" y="32" width="20" height="6" fill="#a4b9a9" /></>}
    {place.id === 'cafe' && <><path d="M30 52H118V63H30Z" fill="#f3e7d6" /><path d="M30 52H42V63H30ZM54 52H66V63H54ZM78 52H90V63H78ZM102 52H114V63H102Z" fill="#b88796" /><rect x="48" y="26" width="30" height="12" fill="#f6ece0" /><path d="M78 28H87V35H78" fill="none" stroke="#f6ece0" strokeWidth="4" /></>}
    {place.id === 'cabin' && <><path d="M35 52H112M35 91H112" stroke="#b89c83" strokeWidth="4" /><rect x="44" y="26" width="50" height="10" fill="#c8d3c8" /><path d="M50 34L60 24L70 34L79 23L91 34" fill="#798d83" /></>}
    {place.id === 'station' && <><rect x="55" y="21" width="33" height="25" fill="#f5eddf" /><rect x="69" y="25" width="4" height="10" fill="#7e8f93" /><rect x="71" y="32" width="9" height="4" fill="#7e8f93" /><rect x="5" y="93" width="23" height="17" fill="#ac9eae" /><rect x="9" y="96" width="8" height="7" fill="#d9e6e4" /></>}
    {place.id === 'bottles' && <><rect x="47" y="28" width="52" height="15" fill="#e8eee1" />{[0,1,2].map(i => <g key={i} fill={['#91b3a2','#b1a2bc','#c9af8b'][i]}><rect x={55+i*13} y="31" width="4" height="3" /><rect x={53+i*13} y="34" width="8" height="7" /></g>)}<rect x="104" y="94" width="30" height="18" fill="#a9bdac" /><path d="M108 99H130M108 105H130" stroke="#789681" strokeWidth="2" /></>}
    {place.id === 'post' && <><rect x="48" y="26" width="46" height="16" fill="#f0e5d5" /><path d="M51 28L71 38L91 28" fill="none" stroke="#b38c8e" strokeWidth="3" /><rect x="111" y="85" width="15" height="21" fill="#ba8690" /><rect x="110" y="82" width="17" height="6" fill="#a66f7e" /><rect x="116" y="105" width="5" height="13" fill="#847f77" /></>}
  </svg>;
}

function Tree({ x, y, small = false }: { x: number; y: number; small?: boolean }) {
  return <g transform={`translate(${x} ${y}) scale(${small ? .65 : 1})`}><rect x="17" y="35" width="8" height="21" fill="#a3947d" /><path d="M8 8H32V16H40V38H32V46H8V38H0V16H8Z" fill="#9cb59f" /><path d="M8 8H26V16H32V27H8Z" fill="#b4c8ac" /><rect x="7" y="36" width="23" height="7" fill="#8aa58e" /></g>;
}

export function PixelTown() {
  const [selected, setSelected] = useState<PlaceId>('studio');
  const [motion, setMotion] = useState(true);
  const place = places.find(item => item.id === selected)!;
  return <section className={styles.townSection} aria-labelledby="town-title">
    <div className={styles.intro}>
      <p className={styles.kicker}>MUNICH, GERMANY · OPEN TO RELOCATE</p>
      <h1 id="town-title">Yidan Shao<span>.</span></h1>
      <p className={styles.role}>Senior Frontend Engineer</p>
      <p className={styles.bio}>I build web and mobile interfaces — from energy API platforms and city dashboards to independent maps and games.</p>
      <ul className={styles.skills} aria-label="Core technologies">{['React', 'TypeScript', 'Vue', 'Next.js'].map(skill => <li key={skill}>{skill}</li>)}</ul>
      <div className={styles.facts}><div><strong>7+</strong><span>years in frontend</span></div><div><strong>{projects.length}</strong><span>project case studies</span></div></div>
      <div className={styles.quickProjects}><p className={styles.kicker}>A FEW THINGS I’VE BUILT</p><Link href="/projects/renewable-energy-api">Energy API platform<span>European release ↗</span></Link><Link href="/projects/smart-city-dashboards">Smart-city dashboards<span>Maps & route tracking ↗</span></Link></div>
      <div className={styles.actions}><a href="#work">View my projects <span>↗</span></a><a href="mailto:yidanshao622@gmail.com">Say hello ↗</a></div>
      <div className={styles.identity}><span className={styles.dot} /> OPEN TO OPPORTUNITIES</div>
    </div>
    <div className={styles.gameWindow}>
      <div className={styles.windowBar}><span><i /> EXPLORE MY LITTLE TOWN</span><button onClick={() => setMotion(value => !value)} aria-pressed={!motion}>{motion ? 'Pause motion' : 'Resume motion'}</button></div>
      <div className={`${styles.map} ${motion ? '' : styles.paused}`}>
        <svg viewBox="0 0 1000 620" className={styles.landscape} aria-hidden="true" shapeRendering="crispEdges">
          <rect width="1000" height="620" fill="#e5ebdf" /><rect width="1000" height="160" fill="#dae5e7" />
          <path d="M0 140V107H60V87H130V107H195V122H250V95H310V65H360V95H410V120H475V95H530V74H590V97H630V115H680V85H745V55H790V85H850V105H930V80H1000V160H0Z" fill="#bacbd0" />
          <path d="M0 163V143H75V123H148V147H220V130H330V143H410V124H490V145H565V130H660V145H745V130H840V143H920V130H1000V180H0Z" fill="#bdcfba" />
          <path d="M895 162H950V250H925V330H956V411H930V500H965V620H910V505H884V403H900V330H875V244H895Z" fill="#b8d5d7" /><path d="M910 185V236M896 265V310M923 355V394M907 438V480M937 534V588" stroke="#d8e9e6" strokeWidth="6" />
          <path d="M0 330H1000V365H0Z" fill="#e9dac5" /><path d="M250 170H282V548H250ZM488 170H520V548H488ZM770 170H802V548H770Z" fill="#e9dac5" /><path d="M125 542H850V565H125Z" fill="#e9dac5" />
          <path d="M0 339H1000M263 170V545M501 170V545M784 170V545" stroke="#f5ead7" strokeWidth="3" strokeDasharray="8 14" />
          <rect x="874" y="321" width="93" height="52" fill="#beac91" /><path d="M883 327V367M897 327V367M911 327V367M925 327V367M939 327V367M953 327V367" stroke="#d9c8ab" strokeWidth="6" />
          <g className={styles.clouds} fill="#f5f2e9"><path d="M86 48H111V38H146V48H167V63H86Z" /><path d="M513 34H537V24H571V34H590V48H513Z" /><path d="M800 44H829V34H860V44H881V58H800Z" /></g>
          {[[55,190],[110,255],[377,181],[645,167],[825,190],[49,431],[344,410],[667,447],[831,492],[84,533],[388,549],[660,559],[950,160]].map(([x,y],i) => <Tree key={i} x={x} y={y} small={i%3===0} />)}
          <g fill="#d5b4be">{[[153,307],[352,292],[635,306],[96,489],[373,510],[678,535],[840,400]].map(([x,y],i)=><path key={i} d={`M${x} ${y}h6v6h-6zM${x+8} ${y+6}h6v6h-6z`} />)}</g>
          <g fill="#91aa91">{[[190,400],[407,320],[561,581],[701,243],[80,575],[824,572]].map(([x,y],i)=><path key={i} d={`M${x} ${y}h4v9h-4zM${x+8} ${y-3}h4v12h-4z`} />)}</g>
          <rect x="584" y="353" width="56" height="9" fill="#a99b87" /><rect x="589" y="362" width="5" height="12" fill="#897f72" /><rect x="629" y="362" width="5" height="12" fill="#897f72" />
          <path d="M136 582H852" stroke="#b0a99d" strokeWidth="9" /><path d="M142 574V590M167 574V590M192 574V590M217 574V590M242 574V590M267 574V590M292 574V590M317 574V590" stroke="#c4b9a7" strokeWidth="4" />
        </svg>
        {places.map(item => <button key={item.id} className={`${styles.building} ${selected === item.id ? styles.selected : ''}`} style={{ left: `${item.x}%`, top: `${item.y}%` }} onClick={() => setSelected(item.id)} aria-label={`Explore ${item.name}`} aria-pressed={selected === item.id}><Building place={item} /><span className={styles.buildingLabel}>{item.name}</span></button>)}
        <div className={styles.avatar} style={{ left: `${place.x+5}%`, top: `${place.y+23}%` }} aria-hidden="true"><span className={styles.avatarBubble}>Hi!</span><svg viewBox="0 0 24 34" shapeRendering="crispEdges"><ellipse cx="12" cy="32" rx="10" ry="2" fill="#65736a" opacity=".2" /><path d="M6 3H18V6H21V19H3V6H6Z" fill="#655867" /><rect x="7" y="8" width="11" height="12" fill="#efd0b5" /><rect x="7" y="7" width="12" height="4" fill="#655867" /><rect x="9" y="13" width="2" height="2" fill="#544c54" /><rect x="15" y="13" width="2" height="2" fill="#544c54" /><rect x="6" y="20" width="14" height="9" fill="#b890a4" /><rect x="3" y="22" width="4" height="7" fill="#efd0b5" /><rect x="19" y="22" width="3" height="7" fill="#efd0b5" /><path d="M7 29H11V33H5V31H7ZM15 29H19V31H21V33H15Z" fill="#6e747d" /></svg></div>
        <span className={styles.mapBadge}>MUNICH BASED · CURIOUS EVERYWHERE</span>
      </div>
      <div className={styles.locationNav} aria-label="Choose a place">{places.map((item,index) => <button key={item.id} aria-pressed={selected === item.id} onClick={() => setSelected(item.id)}><span>0{index+1}</span>{item.name}</button>)}</div>
    </div>
    <div className={styles.story} aria-live="polite"><div className={styles.storyHeading}><p className={styles.kicker}>YOU’RE AT / {place.name}</p><h2>{place.title}</h2><span className={styles.subtitle}>{place.subtitle}</span></div><div className={styles.storyBody}><p>{place.story}</p><div className={styles.storyLinks}>{place.slugs.filter(slug => slug !== place.href.replace('/projects/','')).map(slug => <Link key={slug} href={`/projects/${slug}`}>{projects.find(project => project.slug === slug)?.title}<span>↗</span></Link>)}<a className={styles.primaryLink} href={place.href}>{place.action}<span>↗</span></a></div></div></div>
    <p className={styles.mapHint}>Choose a building to explore. No controls to learn — just follow your curiosity.</p>
  </section>;
}
