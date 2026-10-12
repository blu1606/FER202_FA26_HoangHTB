export const COURSES = [
  {
    code: 'PRF192',
    name: 'Programming Fundamentals',
    credits: 3,
    semester: 1,
    desc: 'Làm quen với tư duy lập trình căn bản, ngôn ngữ lập trình C, giải thuật, cấu trúc điều khiển và thao tác con trỏ.',
  },
  {
    code: 'WED201c',
    name: 'Web Design',
    credits: 3,
    semester: 2,
    desc: 'Thiết kế website chuẩn W3C với HTML5, CSS3, Flexbox/Grid, nguyên lý Responsive và bố cục giao diện thân thiện.',
  },
  {
    code: 'PRO192',
    name: 'Object-Oriented Programming',
    credits: 3,
    semester: 2,
    desc: 'Lập trình hướng đối tượng với ngôn ngữ Java: tính đóng gói, kế thừa, đa hình, trừu tượng hóa và xử lý Collection.',
  },
  {
    code: 'FER202',
    name: 'Front-End Web Development',
    credits: 3,
    semester: 5,
    desc: 'Phát triển ứng dụng Web Front-End hiện đại với React 19, Hooks (useState, useReducer, useContext), React Router 7 và React-Bootstrap.',
  },
  {
    code: 'SWP391',
    name: 'Application Development Project',
    credits: 5,
    semester: 5,
    desc: 'Thực chiến phát triển dự án phần mềm theo nhóm với quy trình Agile/Scrum, từ phân tích yêu cầu đến kiểm thử và triển khai.',
  },
];

export function findCourse(code) {
  if (!code) return null;
  return COURSES.find((c) => c.code.toLowerCase() === code.trim().toLowerCase()) ?? null;
}
