import clsx from 'clsx';
import { useState } from 'react';
import FormManager from '../FormManager/FormManager';
import Header from '../Header/Header';
import Preview from '../Preview/Preview';
import styles from './App.module.css';

export default function App() {
  const dataBlueprint = {
    personalDetails: {
      fullName: 'Alejandro Martínez Fernández',
      email: 'alejandro.martinez@example.com',
      phoneNumber: '+34 678 123 456',
      location: 'Barcelona, Spain',
    },
    professionalExperience: [
      {
        companyName: 'PixelCraft Web Solutions',
        position: 'Frontend Developer',
        location: 'Madrid, Spain',
        startDate: '2024-06',
        endDate: '',
        description:
          `Developed responsive and accessible web interfaces using React and Tailwind CSS.
          Optimized website performance, reducing load times by 30% through efficient asset management.
          Collaborated with backend developers to integrate APIs and improve user experience. 
          Led UI/UX improvements, enhancing website navigation and conversion rates.`,
      },
      {
        companyName: 'CodeWave Digital Agency',
        position: 'Web Developer',
        location: 'Barcelona, Spain',
        startDate: '2021-01',
        endDate: '2024-02',
        description:
          `Built and maintained client websites using JavaScript, HTML, and CSS. 
          Implemented SEO best practices, improving search rankings for multiple projects.  
          Created reusable components and templates to streamline development.  
          Provided technical support and debugging for website issues.`,
      },
    ],
  };

  const [resumeData, setResumeData] = useState(dataBlueprint);

  return (
    <div className={styles.app}>
      <div className={clsx(styles.column, styles.controlsWrapper)}>
        <div className={styles.headerWrapper}>
          <Header />
        </div>
        <div className={styles.formsWrapper}>
          <FormManager resumeData={resumeData} onFormSubmit={setResumeData} />
        </div>
      </div>
      <div className={clsx(styles.column, styles.previewWrapper)}>
        <Preview resumeData={resumeData} />
      </div>
    </div>
  );
}
