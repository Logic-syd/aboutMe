import Link from 'next/link';
import { technologyGroups } from '@/lib/profile';
import { ArtworkPlaceholder } from '@/components/artwork-placeholder';
import { PhotoAlbum } from '@/components/photo-album';
import { PhotoViewer } from '@/components/photo-viewer';
import { coursework, education, personalPhotos, kilimanjaroPhotos } from '@/lib/about';

export function AboutMe() {
  return <section id="about" className="about-section"><div className="shell about-grid">
    <div className="about-introduction"><h2>About me</h2>
      <PhotoAlbum photos={personalPhotos} />
    </div>
    <div className="about-copy"><ul className="about-story-list">
      <li><h3>Berlin, then Munich</h3><p>Wedding in Berlin was my first home in Germany. I spent over a year job-searching and building my own projects; Munich is my current base.</p></li>
      {education && <li><h3>Education</h3><p className="about-school">{education.school}</p><p>{education.degree}, {education.college}{education.year && ` (${education.year})`}</p><p className="about-education-context">{education.context}</p>{coursework.length > 0 && <p className="about-coursework"><strong>Core coursework:</strong> {coursework.join(', ')}</p>}<p className="about-prior-school">Before university: Hefei No. 1 High School, Anhui, China.</p></li>}
      <li><h3>Everyday life</h3><p>Coffee, films, theatre, exhibitions and food from around the world — my favourite ways to get to know a city.</p><a className="text-link" href="#experience">Explore my cities</a></li>
    </ul></div>
    <section id="skills" className="skills-section" aria-labelledby="skills-title">
      <h3 id="skills-title">Skills</h3>
      <div className="skills-overview">{technologyGroups.map(group => <div className="skills-group" key={group.label}><h4>{group.label}</h4><ul>{group.skills.map(skill => <li key={skill}>{skill}</li>)}</ul></div>)}</div>
      <p className="skills-context">Payments experience: <Link href="/projects/ronghe-pay">premium collections, claim payouts and payment reconciliation</Link>.</p>
    </section>
    <ArtworkPlaceholder />
    <section className="about-outside-work" aria-labelledby="kilimanjaro-title">
      <div className="outside-work-story">
        <p className="eyebrow">Outside work in Tanzania</p>
        <h3 id="kilimanjaro-title">Kilimanjaro, and the days after.</h3>
        <p>I reached the summit of Mount Kilimanjaro. After the descent, I visited a school and donated some notebooks, ballpoint pens and sanitary pads.</p>
        <p>I want to do work that is useful to people, and contribute to a better world in the ways I can.</p>
      </div>
      <div className="outside-work-photos">{kilimanjaroPhotos.map(photo => <PhotoViewer key={photo.src} photo={photo} className="outside-work-photo" previewFit="cover" />)}</div>
    </section>
  </div></section>;
}
