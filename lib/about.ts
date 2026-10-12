export type Education = { school: string; degree: string; college: string; context: string; year?: string };
export type PersonalPhoto = { src: string; alt: string; caption: string; width: number; height: number; position?: string; fit?: 'cover' | 'contain'; shortCaption?: string };

// Education and photo contexts are owner-confirmed. Display framing preserves the original files.
export const education: Education = { school: 'Jilin University', degree: 'Bachelor’s degree', college: 'School of Software', context: 'A leading research university in China, part of the national Project 985 initiative.' };
export const personalPhotos: PersonalPhoto[] = [
  { src: '/images/personal/current-office.jpg', alt: 'Yidan outside her current office', caption: 'Outside my current office', width: 960, height: 1280, position: '50% 34%' },
  { src: '/images/personal/graduation-portrait.jpg', alt: 'Graduation portrait at Jilin University', caption: 'Graduation day · Jilin University', width: 1280, height: 960, position: '65% 50%' },
  { src: '/images/personal/graduation-classmates.jpg', alt: 'Graduation celebration with classmates', caption: 'Caps, classmates & a new beginning', width: 1280, height: 960, fit: 'contain' },
];
export const workPhotos: Record<string, PersonalPhoto> = {
  fingard: { src: '/images/personal/fingard-team.jpg', alt: 'Fingard colleagues in an outdoor group photo', caption: 'With the Fingard team', width: 1280, height: 960, fit: 'contain' },
};
export const cityPhotos: Record<string, PersonalPhoto> = {
  sungrow: { src: '/images/personal/allianz-matchday.jpg', alt: 'Watching football at Allianz Arena in Munich', caption: 'Match day · Allianz Arena', shortCaption: 'Allianz Arena', width: 959, height: 1280, position: '63% 35%' },
};

export const coursework: string[] = ['Data Structures & Algorithms', 'Operating Systems', 'Databases', 'Computer Networks', 'Software Engineering'];
