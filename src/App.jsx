import { useState } from 'react';
import styles from './App.module.css';
import FormManager from './FormManager';
import Header from './Header';
import Preview from './Preview';

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
      <div className={`${styles.column} ${styles['controls-wrapper']}`}>
        <div className={styles['header-wrapper']}>
          <Header />
        </div>
        <div className={styles['forms-wrapper']}>
          <FormManager resumeData={resumeData} setResumeData={setResumeData} />
        </div>
      </div>
      <div className={`${styles.column} ${styles['preview-wrapper']}`}>
        <Preview />
      </div>
    </div>
  );
}
