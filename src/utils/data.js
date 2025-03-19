export const INITIAL_DATA = {
  personalDetails: {
    fullName: 'Alejandro Martínez Fernández',
    email: 'alejandro.martinez@example.com',
    phoneNumber: '+34 678 123 456',
    location: 'Barcelona, Spain',
  },
  experience: [
    {
      id: crypto.randomUUID(),
      companyName: 'PixelCraft Web Solutions',
      position: 'Frontend Developer',
      location: 'Madrid, Spain',
      startDate: '2024-06',
      endDate: '',
      description: `Developed responsive and accessible web interfaces using React and Tailwind CSS.
          Optimized website performance, reducing load times by 30% through efficient asset management.
          Collaborated with backend developers to integrate APIs and improve user experience. 
          Led UI/UX improvements, enhancing website navigation and conversion rates.`,
      visible: true,
    },
    {
      id: crypto.randomUUID(),
      companyName: 'CodeWave Digital Agency',
      position: 'Web Developer',
      location: 'Barcelona, Spain',
      startDate: '2021-01',
      endDate: '2024-02',
      description: `Built and maintained client websites using JavaScript, HTML, and CSS. 
          Implemented SEO best practices, improving search rankings for multiple projects.  
          Created reusable components and templates to streamline development.  
          Provided technical support and debugging for website issues.`,
      visible: false,
    },
  ],
};