import Image from 'next/image';
import { heroPhoto } from '@/lib/about';
import { coreTechnologies } from '@/lib/profile';
import { displayImage } from '@/lib/image-assets';
import styles from './portrait-cover.module.css';

export function PortraitCover() {
  return <section className={styles.cover} aria-labelledby="town-title">
    <div className={styles.photograph} data-hero-portrait>
      <Image src={displayImage(heroPhoto.src)} alt={heroPhoto.alt} width={heroPhoto.width} height={heroPhoto.height} sizes="100vw" preload />
    </div>
    <div className={styles.shade} aria-hidden="true" />
    <p className={styles.availability}>Based in Munich, Germany. Open to relocate.</p>
    <div className={styles.roleCard}><span>Frontend engineering</span><small>Full-stack projects & AI</small></div>
    <a className={styles.educationCard} href="#about"><span>Jilin University</span><small>School of Software</small></a>
    <a className={styles.languageCard} href="#languages">Mandarin · English · German · Cantonese</a>
    <div className={styles.identity}>
      <h1 id="town-title">Yidan Shao</h1>
      <p>Senior Frontend Engineer</p>
      <div className={styles.actions}><a href="#work">View projects</a><a href="mailto:yidanshao622@gmail.com">Email me</a></div>
    </div>
    <div className={styles.skills}><ul aria-label="Core technologies">{coreTechnologies.map(skill => <li key={skill}>{skill}</li>)}</ul><a href="#skills">All skills</a></div>
  </section>;
}
