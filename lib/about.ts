export type Education = { school: string; degree: string; college: string; context: string; year?: string };
export type PersonalPhoto = { src: string; alt: string; caption: string; width: number; height: number; position?: string; fit?: 'cover' | 'contain'; shortCaption?: string; previewCrop?: { x: number; y: number; width: number; height: number } };

// Education and photo contexts are owner-confirmed. Display framing preserves the original files.
export const education: Education = { school: 'Jilin University', degree: 'Bachelor’s degree', college: 'School of Software', context: 'A member of China’s Project 985 university initiative.' };
export const profilePhoto: PersonalPhoto = { src: '/images/personal/current-office.jpg', alt: 'Yidan outside her current office in Munich', caption: 'Outside my current office · Munich', shortCaption: 'Working in Munich', width: 960, height: 1280, position: '50% 34%' };
export const heroPhoto: PersonalPhoto = { src: '/images/personal/window-portrait.jpg', alt: 'Yidan sitting by a window in a soft pink blouse', caption: 'Yidan by the window', width: 960, height: 1280, previewCrop: { x: 170, y: 180, width: 600, height: 750 } };
export const personalPhotos: PersonalPhoto[] = [
  { src: '/images/personal/graduation-portrait.jpg', alt: 'Graduation portrait at Jilin University', caption: 'Graduation day · Jilin University', shortCaption: 'Jilin University', width: 1280, height: 960, position: '65% 50%' },
  { src: '/images/personal/graduation-classmates.jpg', alt: 'Graduation celebration with classmates', caption: 'Graduation with classmates', shortCaption: 'With classmates', width: 1280, height: 960, position: '40% 60%' },
  profilePhoto,
];
export const kilimanjaroPhotos: PersonalPhoto[] = [
  { src: '/images/personal/kilimanjaro-summit.jpg', alt: 'Yidan at the Uhuru Peak summit sign on Mount Kilimanjaro', caption: 'Uhuru Peak · Mount Kilimanjaro · 5,895 m', shortCaption: 'At the summit · 5,895 m', width: 2880, height: 3840, fit: 'contain' },
  { src: '/images/personal/tanzania-school-visit.jpg', alt: 'Yidan visiting a school after climbing Kilimanjaro, with students and donated supplies', caption: 'A school visit after the climb · Tanzania', shortCaption: 'Visiting a school after the climb', width: 960, height: 1280, fit: 'contain' },
];
export const workPhotos: Record<string, PersonalPhoto> = {
  fingard: { src: '/images/personal/fingard-team.jpg', alt: 'Fingard colleagues in an outdoor group photo', caption: 'With the Fingard team', width: 1280, height: 960, fit: 'contain' },
};
export const cityPhotos: Record<string, PersonalPhoto> = {
  sungrow: { src: '/images/personal/allianz-matchday.jpg', alt: 'Watching football at Allianz Arena in Munich', caption: 'Match day · Allianz Arena', shortCaption: 'Allianz Arena', width: 959, height: 1280, position: '63% 35%' },
  berlin: { src: '/images/personal/berlinale-red-carpet.jpg', alt: 'Yidan on the red carpet in front of the blue Berlinale festival backdrop', caption: 'At a Berlinale premiere · Berlin', shortCaption: 'Berlinale · cropped view', width: 959, height: 1280, previewCrop: { x: 260, y: 380, width: 600, height: 900 } },
};

export const coursework: string[] = ['Data Structures & Algorithms', 'Operating Systems', 'Databases', 'Computer Networks', 'Software Engineering'];
