import clsx from 'clsx';
import { useState } from 'react';
import CreateExperienceForm from '../CreateExperienceForm/CreateExperienceForm';
import EditPersonalForm from '../EditPersonalForm/EditPersonalForm';
import utils from '../styles/Utils.module.css';
import styles from './FormManager.module.css';

export default function FormManager({
  resumeData,
  onPersonalEdit,
  onExperienceCreate,
  onExperienceEdit,
}) {
  const [status, setStatus] = useState('viewing');
  const { personal, experience } = resumeData;

  const handleCancel = () => {
    setStatus('viewing');
  };

  const handleEditPersonalSubmit = (newPersonal) => {
    onPersonalEdit(newPersonal);
    setStatus('viewing');
  };

  const handleCreateExperienceSubmit = (newExperience) => {
    onExperienceCreate(newExperience);
    setStatus('viewing');
  };

  if (status === 'editing-personal') {
    return (
      <EditPersonalForm
        data={personal}
        onSubmit={handleEditPersonalSubmit}
        onCancel={handleCancel}
      />
    );
  }

  if (status === 'creating-experience') {
    return (
      <CreateExperienceForm
        onSubmit={handleCreateExperienceSubmit}
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
        {personal.fullName != '' ? (
          <h2>{personal.fullName}</h2>
        ) : (
          <h2 className={styles.placeholderText}>Your name</h2>
        )}
        <ul>
          <PersonalDataListItem
            label="Email"
            iconName="email"
            value={personal.email}
          />
          <PersonalDataListItem
            label="Phone Number"
            iconName="phone"
            value={personal.phoneNumber}
          />
          <PersonalDataListItem
            label="Location"
            iconName="location_on"
            value={personal.location}
          />
        </ul>
      </button>
      <Widget
        title="Professional Experience"
        icon="work"
        onAddClick={() => setStatus('creating-experience')}
        onVisibilityToggle={onDataModify}
        items={experience}
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

function Widget({ title, icon, onAddClick, onVisibilityToggle, items }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleVisibilityToggle = (e, itemId) => {
    e.stopPropagation();

    onVisibilityToggle((prevData) => ({
      ...prevData,
      professionalExperience: prevData.professionalExperience.map((item) => ({
        ...item,
        visible: item.id === itemId ? !item.visible : item.visible,
      })),
    }));
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
        <>
          {items.map((item) => (
            <button
              key={item.id}
              className={clsx(utils.card, styles.widgetItem)}
            >
              {item.companyName}
              <span
                className="material-symbols-outlined"
                onClick={(e) => handleVisibilityToggle(e, item.id)}
              >
                {item.visible ? 'visibility_off' : 'visibility'}
              </span>
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
