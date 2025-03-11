import { useState } from 'react';
import styles from './FormManager.module.css';
import PersonalForm from './PersonalForm';
import utils from './Utils.module.css';

export default function FormManager({ resumeData, setResumeData }) {
  const [status, setStatus] = useState('viewing');

  const handleClick = () => {
    setStatus('editing');
  };

  const handleCancel = () => {
    setStatus('viewing');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    setStatus('viewing');
    setResumeData(data);
  };

  if (status === 'editing') {
    return <PersonalForm data={resumeData} onSubmit={handleSubmit} onCancel={handleCancel}/>;
  }

  return (
    <nav className={styles.formManager}>
      <div
        className={`${utils.card} ${utils.cardLayout}`}
        onClick={handleClick}
      >
        {resumeData.fullName != '' ? (
          <h2>{resumeData.fullName}</h2>
        ) : (
          <h2 className={styles.unknown}>Your name</h2>
        )}
        <ul>
          {resumeData.email != '' ? (
            <li>
              <span className="material-symbols-outlined">mail</span>
              {resumeData.email}
            </li>
          ) : (
            <li className={styles.unknown}>
              <span className="material-symbols-outlined">mail</span>Email
            </li>
          )}
          {resumeData.phoneNumber != '' ? (
            <li>
              <span className="material-symbols-outlined">phone</span>
              {resumeData.phoneNumber}
            </li>
          ) : (
            <li className={styles.unknown}>
              <span className="material-symbols-outlined">phone</span>Phone
              Number
            </li>
          )}
          {resumeData.location != '' ? (
            <li>
              <span className="material-symbols-outlined">location_on</span>
              {resumeData.location}
            </li>
          ) : (
            <li className={styles.unknown}>
              <span className="material-symbols-outlined">location_on</span>
              Location
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
