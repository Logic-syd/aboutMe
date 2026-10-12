export type Education = { school: string; degree: string; college: string; context: string; year?: string };
export type PersonalPhoto = { src: string; alt: string; caption: string; width: number; height: number };

// Education is owner-confirmed. Add photos once the owner provides chosen images.
export const education: Education = { school: 'Jilin University', degree: 'Bachelor’s degree', college: 'School of Software', context: 'A leading research university in China, part of the national Project 985 initiative.' };
export const personalPhotos: PersonalPhoto[] = [];

export const coursework: string[] = ['Data Structures & Algorithms', 'Operating Systems', 'Databases', 'Computer Networks', 'Software Engineering'];
