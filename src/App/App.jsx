import clsx from 'clsx';
import { useState } from 'react';
import FormManager from '../FormManager/FormManager';
import Header from '../Header/Header';
import Preview from '../Preview/Preview';
import { INITIAL_DATA } from '../utils/data';
import styles from './App.module.css';

export default function App() {
  const [resumeData, setResumeData] = useState(INITIAL_DATA);

  const updatePersonalDetails = (newDetails) => {
    setResumeData((prevData) => ({
      ...prevData,
      personalDetails: { ...prevData.personalDetails, ...newDetails },
    }));
  };

  const addProfessionalExperience = (newExperience) => {
    setResumeData((prevData) => ({
      ...prevData,
      professionalExperience: [
        ...(prevData.professionalExperience ?? []),
        newExperience,
      ],
    }));
  };

  const updateProfessionalExperience = (id, updatedExperience) => {
    setResumeData((prevData) => ({
      ...prevData,
      professionalExperience: prevData.professionalExperience.map(
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
            onDataModify={setResumeData}
            onPersonalDetailsEdit={updatePersonalDetails}
            onProfessionalExperienceCreate={addProfessionalExperience}
            onProfessionalExperienceEdit={updateProfessionalExperience}
          />
        </div>
      </div>
      <div className={clsx(styles.column, styles.previewWrapper)}>
        <Preview resumeData={resumeData} />
      </div>
    </div>
  );
}
