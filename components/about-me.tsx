import { PhotoAlbum } from '@/components/photo-album';
import { coursework, education, personalPhotos } from '@/lib/about';

export function AboutMe() {
  return <section id="about" className="about-section"><div className="shell about-grid">
    <div className="about-introduction"><h2>About me</h2>
      <PhotoAlbum photos={personalPhotos} />
      <p className="about-motivation">From graduation at Jilin University to working in Munich.</p>
    </div>
    <div className="about-copy"><ul className="about-story-list">
      {education && <li><h3>Education</h3><p className="about-school">{education.school}</p><p>{education.degree} · {education.college}{education.year && ` · ${education.year}`}</p><p className="about-education-context">{education.context}</p>{coursework.length > 0 && <p className="about-coursework"><strong>Core coursework:</strong> {coursework.join(' · ')}</p>}<p className="about-prior-school">Before university: Hefei No. 1 High School, Anhui, China.</p></li>}
      <li><h3>Berlin, then Munich</h3><p>Wedding in Berlin was my first home in Germany. I spent over a year job-searching and building my own projects; Munich is my current base.</p></li>
      <li><h3>Outside work</h3><p>Coffee, films, theatre, exhibitions and food from around the world — my favourite ways to get to know a city.</p><a className="text-link" href="#experience">Explore my cities <span aria-hidden="true">↗</span></a></li>
    </ul></div>
  </div></section>;
}
