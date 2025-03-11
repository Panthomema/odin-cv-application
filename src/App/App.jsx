import { useState } from 'react';
import styles from './App.module.css';
import FormManager from '../FormManager/FormManager';
import Header from '../Header/Header';
import Preview from '../Preview/Preview';

export default function App() {
  const dataBlueprint = {
    fullName: 'Jonander García Fernández',
    email: 'ion_and_er@kerejeta.eus',
    phoneNumber: '+35678290393',
    location: 'Infrarreformatorio, Euskadi',
  };

  const [resumeData, setResumeData] = useState(dataBlueprint);

  return (
    <div className={styles.app}>
      <div className={`${styles.column} ${styles.controlsWrapper}`}>
        <div className={styles.headerWrapper}>
          <Header />
        </div>
        <div className={styles.formsWrapper}>
          <FormManager resumeData={resumeData} onFormSubmit={setResumeData} />
        </div>
      </div>
      <div className={`${styles.column} ${styles.previewWrapper}`}>
        <Preview resumeData={resumeData} />
      </div>
    </div>
  );
}
