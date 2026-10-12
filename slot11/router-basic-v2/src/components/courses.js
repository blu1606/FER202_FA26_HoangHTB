export const COURSES = [
    { code: 'PRF192', name: 'Lập trình C cơ bản', credits: 3, semester: 1, desc: 'Tư duy thuật toán và lập trình C.' },
    { code: 'WED201c', name: 'Thiết kế Web', credits: 3, semester: 2, desc: 'HTML5, CSS3 và Responsive design.' },
    { code: 'PRO192', name: 'Lập trình Java (OOP)', credits: 3, semester: 2, desc: 'Lập trình hướng đối tượng với Java.' },
    { code: 'FER202', name: 'Front-End với React', credits: 3, semester: 5, desc: 'React 19, Hooks và React Router 7.' },
    { code: 'SWP391', name: 'Dự án thực tế', credits: 5, semester: 5, desc: 'Phát triển ứng dụng theo quy trình Scrum.' },
];

export function findCourse(code) {
    if (!code) return null;
    return COURSES.find((c) => c.code.toLowerCase() === code.trim().toLowerCase());
}
