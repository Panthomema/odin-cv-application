import FormField from '../FormField/FormField';
import utils from '../styles/Utils.module.css';
import styles from './PersonalForm.module.css';

export default function PersonalForm({ data, onSubmit, onCancel }) {
  return (
    <form className={`${utils.card} ${styles.form}`} onSubmit={onSubmit}>
      <h2>Edit Personal Details</h2>
      <FormField
        name="fullName"
        type="text"
        label="Full Name"
        tag="required"
        value={data?.fullName}
      />
      <FormField
        name="email"
        type="email"
        label="Email"
        tag="recommended"
        value={data?.email}
      />
      <FormField
        name="phoneNumber"
        type="tel"
        label="Phone Number"
        tag="recommended"
        value={data?.phoneNumber}
      />
      <FormField
        name="location"
        type="text"
        label="Location"
        tag="optional"
        value={data?.location}
      />
      <div className={styles.buttonsArea}>
        <button
          type="button"
          className={`${styles.button} ${styles.buttonSecondary}`}
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`${styles.button} ${styles.buttonPrimary}`}
        >
          Save
        </button>
      </div>
    </form>
  );
}
