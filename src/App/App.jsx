import clsx from 'clsx';
import { useState } from 'react';
import FormManager from '../FormManager/FormManager';
import Header from '../Header/Header';
import Preview from '../Preview/Preview';
import { INITIAL_DATA } from '../utils/data';
import styles from './App.module.css';

export default function App() {
  const [resumeData, setResumeData] = useState(INITIAL_DATA);

  const updatePersonal = (updatedPersonal) => {
    setResumeData((prevData) => ({
      ...prevData,
      personal: { ...prevData.personal, ...updatedPersonal },
    }));
  };

  const addExperience = (newExperience) => {
    setResumeData((prevData) => ({
      ...prevData,
      experience: [
        ...(prevData.experience ?? []),
        newExperience,
      ],
    }));
  };

  const updateExperience = (id, updatedExperience) => {
    setResumeData((prevData) => ({
      ...prevData,
      experience: prevData.experience.map(
        (experience) =>
          experience.id === id
            ? { ...experience, ...updatedExperience }
            : experience,
      ),
    }));
  };

  return (
    <div className={styles.app}>
      <div className={clsx(styles.column, styles.controlsWrapper)}>
        <div className={styles.headerWrapper}>
          <Header />
        </div>
        <div className={styles.formsWrapper}>
          <FormManager
            resumeData={resumeData}
            onPersonalEdit={updatePersonal}
            onExperienceCreate={addExperience}
            onExperienceEdit={updateExperience}
          />
        </div>
      </div>
      <div className={clsx(styles.column, styles.previewWrapper)}>
        <Preview resumeData={resumeData} />
      </div>
    </div>
  );
}
