import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import FormManager from '../components/FormManager/FormManager';
import Header from '../components/Header/Header';
import Preview from '../components/Preview/Preview';
import { INITIAL_DATA } from '../utils/data';
import styles from './App.module.css';

export default function App() {
  const savedData = JSON.parse(localStorage.getItem('resumeData'));

  const [resumeData, setResumeData] = useState(savedData ?? INITIAL_DATA);
  const previewRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  const handlePrint = useReactToPrint({ contentRef: previewRef });

  const updatePersonal = (updatedPersonal) => {
    setResumeData((prevData) => ({
      ...prevData,
      personal: { ...prevData.personal, ...updatedPersonal },
    }));
  };

  const storeExperience = (newExperience) => {
    setResumeData((prevData) => ({
      ...prevData,
      experience: [...(prevData.experience ?? []), newExperience],
    }));
  };

  const updateExperience = (id, updatedExperience) => {
    setResumeData((prevData) => ({
      ...prevData,
      experience: prevData.experience.map((experience) =>
        experience.id === id
          ? { ...experience, ...updatedExperience }
          : experience,
      ),
    }));
  };

  const destroyExperience = (id) => {
    setResumeData((prevData) => ({
      ...prevData,
      experience: prevData.experience.filter(
        (experience) => experience.id !== id,
      ),
    }));
  };

  const storeEducation = (newEducation) => {
    setResumeData((prevData) => ({
      ...prevData,
      education: [...(prevData.education ?? []), newEducation],
    }));
  };

  const updateEducation = (id, updatedEducation) => {
    setResumeData((prevData) => ({
      ...prevData,
      education: prevData.education.map((education) =>
        education.id === id ? { ...education, ...updatedEducation } : education,
      ),
    }));
  };

  const destroyEducation = (id) => {
    setResumeData((prevData) => ({
      ...prevData,
      education: prevData.education.filter((education) => education.id !== id),
    }));
  };

  return (
    <div className={styles.app}>
      <div className={clsx(styles.column, styles.controlsWrapper)}>
        <div className={styles.headerWrapper}>
          <Header onPrint={handlePrint} />
        </div>
        <div className={styles.formsWrapper}>
          <FormManager
            resumeData={resumeData}
            onPersonalEdit={updatePersonal}
            onExperienceCreate={storeExperience}
            onExperienceEdit={updateExperience}
            onExperienceDelete={destroyExperience}
            onEducationCreate={storeEducation}
            onEducationEdit={updateEducation}
            onEducationDelete={destroyEducation}
          />
        </div>
      </div>
      <div className={clsx(styles.column, styles.previewWrapper)}>
        <Preview resumeData={resumeData} ref={previewRef} />
      </div>
    </div>
  );
}
