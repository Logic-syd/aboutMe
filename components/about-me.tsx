import Image from 'next/image';
import { coursework, education, personalPhotos } from '@/lib/about';

export function AboutMe() {
  return <section id="about" className="about-section"><div className="shell about-grid">
    <div className="about-introduction"><p className="eyebrow">02 / A LITTLE ABOUT ME</p><h2>The person<br /><em>behind the projects.</em></h2><p className="about-motivation">From China to Berlin to Munich — curious about the places, people and everyday stories along the way.</p>
      {personalPhotos.length > 0 && <div className="about-photo-gallery" data-count={personalPhotos.length}>{personalPhotos.map(photo => <figure key={photo.src}><Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 800px) 90vw, 420px" /><figcaption>{photo.caption}</figcaption></figure>)}</div>}
      <p className="about-technical-note">Frontend engineer · React, TypeScript & Vue</p>
    </div>
    <div className="about-copy"><p className="eyebrow">MY PATH, SO FAR</p><ul className="about-story-list">
      {education && <li><h3>Education.</h3><p className="about-school">{education.school}</p><p>{education.degree} · {education.college}{education.year && ` · ${education.year}`}</p><p className="about-education-context">{education.context}</p>{coursework.length > 0 && <p className="about-coursework"><strong>Core coursework:</strong> {coursework.join(' · ')}</p>}<p className="about-prior-school">Before university: Hefei No. 1 High School, Anhui, China.</p></li>}
      <li><h3>Why Germany.</h3><p>Interest in Germany brought me here to experience life for myself.</p></li>
      <li><h3>A first home in Berlin.</h3><p>Berlin was my first home in Germany. I spent over a year job-searching and building my own projects; Munich is my current base.</p></li>
      <li><h3>Beyond the screen.</h3><p>Coffee, films, theatre, exhibitions and food from around the world — my favourite ways to get to know a city.</p><a className="text-link" href="#experience">Explore my cities <span aria-hidden="true">↗</span></a></li>
    </ul></div>
  </div></section>;
}
