import clsx from 'clsx';
import { useState } from 'react';
import CreateProfessionalExperienceForm from '../CreateProfessionalExperienceForm/CreateProfessionalExperienceForm';
import EditPersonalDetailsForm from '../EditPersonalDetailsForm/EditPersonalDetailsForm';
import utils from '../styles/Utils.module.css';
import styles from './FormManager.module.css';

export default function FormManager({ resumeData, onFormSubmit }) {
  const [status, setStatus] = useState('viewing');
  const { personalDetails, professionalExperience } = resumeData;

  const handleCancel = () => {
    setStatus('viewing');
  };

  const handleValidData = (data) => {
    onFormSubmit(data);
    setStatus('viewing');
  };

  if (status === 'editing-personal') {
    return (
      <EditPersonalDetailsForm
        data={personalDetails}
        onValidData={handleValidData}
        onCancel={handleCancel}
      />
    );
  }

  if (status === 'creating-experience') {
    return (
      <CreateProfessionalExperienceForm
        onValidData={handleValidData}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <nav className={styles.formManager}>
      <button
        className={clsx(utils.card, utils.borderRadius, styles.personalData)}
        onClick={() => setStatus('editing-personal')}
      >
        {personalDetails.fullName != '' ? (
          <h2>{personalDetails.fullName}</h2>
        ) : (
          <h2 className={styles.placeholderText}>Your name</h2>
        )}
        <ul>
          <PersonalDataListItem
            label="Email"
            iconName="email"
            value={personalDetails.email}
          />
          <PersonalDataListItem
            label="Phone Number"
            iconName="phone"
            value={personalDetails.phoneNumber}
          />
          <PersonalDataListItem
            label="Location"
            iconName="location_on"
            value={personalDetails.location}
          />
        </ul>
      </button>
      <Widget
        title="Professional Experience"
        icon="work"
        onAddClick={() => setStatus('creating-experience')}
        items={professionalExperience}
      />
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

function Widget({ title, icon, onAddClick, items }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  console.log(items);

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
        <>
          {items.map((item) => (
            <button
              key={item.id}
              className={clsx(utils.card, styles.widgetItem)}
            >
              {item.companyName}
              <span className="material-symbols-outlined">visibility_off</span>
            </button>
          ))}
          <div
            className={clsx(
              utils.card,
              utils.borderRadiusBottom,
              styles.widgetAdd,
            )}
          >
            <button onClick={onAddClick}>
              <span className="material-symbols-outlined">add</span> Add New
            </button>
          </div>
        </>
      )}
    </div>
  );
}
