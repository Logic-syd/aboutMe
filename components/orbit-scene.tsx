import Link from 'next/link';
import { projects } from '@/lib/projects';

const labels = ['Energy APIs', 'Discovery map', 'Data exports', 'Sports & training', 'Low-code tools', 'Operations'];
const details = ['European release', 'Independent product', 'Async workflows', 'Web + mobile', 'Configurable interfaces', 'Charts + maps'];

export function OrbitScene() {
  return <>
    <div className="orbit-lines" aria-hidden="true">
      <svg viewBox="0 0 1400 850" preserveAspectRatio="xMidYMid slice">
        <g transform="translate(700 425) rotate(-24)" fill="none" stroke="currentColor">
          <ellipse rx="250" ry="180" /><ellipse rx="410" ry="290" /><ellipse rx="585" ry="415" /><ellipse rx="770" ry="550" />
          <path d="M-800 0H800M0-610V610" strokeDasharray="2 12" />
          <path d="M-595 -9v18M-419 -9v18M-259 -9v18M250 -9v18M410 -9v18M585 -9v18" />
        </g>
      </svg>
    </div>
    <nav className="orbit-projects" aria-label="Explore project case studies">
      {projects.map((project, index) => <Link className={`orbit-card orbit-card-${index + 1}`} href={`/projects/${project.slug}`} key={project.slug}>
        <span className="orbit-card-meta"><span>PROJECT / {project.number}</span><span aria-hidden="true">↗</span></span>
        <strong>{labels[index]}</strong>
        <span className="orbit-card-detail">{details[index]}</span>
        <span className={`orbit-card-state ${project.inDevelopment ? 'is-progress' : ''}`}><i />{project.inDevelopment ? 'In development' : index === 0 ? 'Launched' : 'Case study'}</span>
      </Link>)}
    </nav>
    <div className="orbit-axis" aria-hidden="true"><span>01</span><span>02</span><span>03</span><span>04</span></div>
  </>;
}
