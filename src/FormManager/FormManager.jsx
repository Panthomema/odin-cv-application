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
  const UI_STATES = {
    MAIN_MENU: { mode: 'main-menu' },
    EDIT_PERSONAL: { mode: 'edit-personal' },
    CREATE_EXPERIENCE: { mode: 'create-experience' },
  };

  const [uiState, setUiState] = useState(UI_STATES.MAIN_MENU);
  const { personal, experience } = resumeData;

  const handleCancel = () => {
    setUiState(UI_STATES.MAIN_MENU);
  };

  const handleEditPersonalSubmit = (newPersonal) => {
    onPersonalEdit(newPersonal);
    setUiState(UI_STATES.MAIN_MENU);
  };

  const handleCreateExperienceSubmit = (newExperience) => {
    onExperienceCreate(newExperience);
    setUiState(UI_STATES.MAIN_MENU);
  };

  if (uiState.mode === UI_STATES.EDIT_PERSONAL.mode) {
    return (
      <EditPersonalForm
        data={personal}
        onSubmit={handleEditPersonalSubmit}
        onCancel={handleCancel}
      />
    );
  }

  if (uiState.mode === UI_STATES.CREATE_EXPERIENCE.mode) {
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
        className={clsx(utils.card, utils.borderRadius, styles.personal)}
        onClick={() => setUiState(UI_STATES.EDIT_PERSONAL)}
      >
        {personal.fullName.trim() != '' ? (
          <h2>{personal.fullName}</h2>
        ) : (
          <h2 className={styles.placeholderText}>Your name</h2>
        )}
        <ul>
          <PersonalListItem
            label="Email"
            iconName="email"
            value={personal.email}
          />
          <PersonalListItem
            label="Phone Number"
            iconName="phone"
            value={personal.phoneNumber}
          />
          <PersonalListItem
            label="Location"
            iconName="location_on"
            value={personal.location}
          />
        </ul>
      </button>
      <Widget
        title="Professional Experience"
        icon="work"
        onAddClick={() => setUiState(UI_STATES.CREATE_EXPERIENCE)}
        onVisibilityToggle={onExperienceEdit}
        items={experience}
      />
    </nav>
  );
}

function PersonalListItem({ label, iconName, value }) {
  return value.trim() != '' ? (
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

  const handleVisibilityToggle = (e, itemId, isVisible) => {
    e.stopPropagation();
    onVisibilityToggle(itemId, { visible: isVisible });
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
              <p>{item.companyName}</p>
              <span
                className="material-symbols-outlined"
                onClick={(e) =>
                  handleVisibilityToggle(e, item.id, !item.visible)
                }
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
