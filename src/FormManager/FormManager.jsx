import { useState } from 'react';
import PersonalDataListItem from '../PersonalDataListItem/PersonalDataListItem';
import PersonalForm from '../PersonalForm/PersonalForm';
import utils from '../styles/Utils.module.css';
import styles from './FormManager.module.css';

export default function FormManager({ resumeData, onFormSubmit }) {
  const [status, setStatus] = useState('viewing');

  const handleClick = () => {
    setStatus('editing');
  };

  const handleCancel = () => {
    setStatus('viewing');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    onFormSubmit(data);
    setStatus('viewing');
  };

  if (status === 'editing') {
    return (
      <PersonalForm
        data={resumeData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <nav className={styles.formManager}>
      <div
        className={`${utils.card} ${styles.personalData}`}
        onClick={handleClick}
      >
        {resumeData.fullName != '' ? (
          <h2>{resumeData.fullName}</h2>
        ) : (
          <h2 className={styles.unknown}>Your name</h2>
        )}
        <ul>
          <PersonalDataListItem
            label="Email"
            iconName="email"
            value={resumeData.email}
          />
          <PersonalDataListItem
            label="Phone Number"
            iconName="phone"
            value={resumeData.phoneNumber}
          />
          <PersonalDataListItem
            label="Location"
            iconName="location_on"
            value={resumeData.location}
          />
        </ul>
      </div>
    </nav>
  );
}
