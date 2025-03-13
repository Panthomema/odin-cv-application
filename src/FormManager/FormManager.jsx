import clsx from 'clsx';
import { useState } from 'react';
import EditPersonalDetailsForm from '../EditPersonalDetailsForm/EditPersonalDetailsForm';
import utils from '../styles/Utils.module.css';
import styles from './FormManager.module.css';

export default function FormManager({ resumeData, onFormSubmit }) {
  const [status, setStatus] = useState('viewing');

  const handleClick = () => {
    setStatus('editing-personal');
  };

  const handleCancel = () => {
    setStatus('viewing');
  };

  const handleSubmit = (data) => {
    onFormSubmit(data);
    setStatus('viewing');
  };

  if (status === 'editing-personal') {
    return (
      <EditPersonalDetailsForm
        data={resumeData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <nav className={styles.formManager}>
      <button
        className={clsx(utils.card, utils.borderRadius, styles.personalData)}
        onClick={handleClick}
      >
        {resumeData.fullName != '' ? (
          <h2>{resumeData.fullName}</h2>
        ) : (
          <h2 className={styles.placeholderText}>Your name</h2>
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
      </button>
      <Widget title="Work Experience" icon="work" />
    </nav>
  );
}

function PersonalDataListItem({ label, iconName, value }) {
  return value != '' ? (
    <li>
      <span className="material-symbols-outlined">{iconName}</span>
      {value}
    </li>
  ) : (
    <li className={styles.placeholderText}>
      <span className="material-symbols-outlined">{iconName}</span>
      {label}
    </li>
  );
}

function Widget({ title, icon }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.widget}>
      <button
        className={clsx(
          utils.card,
          isOpen ? utils.borderRadiusTop : utils.borderRadius,
          styles.widgetHeader,
        )}
        onClick={handleClick}
      >
        <h2 className={styles.widgetTitle}>
          <span className="material-symbols-outlined">{icon}</span>
          {title}
        </h2>
        <span
          className={clsx(
            'material-symbols-outlined',
            isOpen && utils.rotated180,
          )}
        >
          arrow_drop_down
        </span>
      </button>
      {isOpen && (
        <div
          className={clsx(
            utils.card,
            utils.borderRadiusBottom,
            styles.widgetAdd,
          )}
        >
          <button>
            <span className="material-symbols-outlined">add</span> {title}
          </button>
        </div>
      )}
    </div>
  );
}
