import styles from './PersonalForm.module.css';
import utils from './Utils.module.css';

export default function PersonalForm({ data, onSubmit, onCancel }) {
  return (
    <form
      className={`${utils.card} ${utils.cardLayout}`}
      onSubmit={onSubmit}
    >
      <h2>Edit Personal Details</h2>
      <div className={styles.formGroup}>
        <label htmlFor="fullName">
          Full Name <span className={utils.textSecondary}>required</span>
        </label>
        <input
          type="text"
          name="fullName"
          id="fullName"
          className={styles.input}
          defaultValue={data?.fullName}
        />
        <span className={utils.formError}></span>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email">
          Email <span className={utils.textSecondary}>recommended</span>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className={styles.input}
          defaultValue={data?.email}
        />
        <span className={utils.formError}></span>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="phoneNumber">
          Phone Number <span className={utils.textSecondary}>recommended</span>
        </label>
        <input
          type="tel"
          name="phoneNumber"
          id="phoneNumber"
          className={styles.input}
          defaultValue={data?.phoneNumber}
        />
        <span className={utils.formError}></span>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="location">
          Location <span className={utils.textSecondary}>optional</span>
        </label>
        <input
          type="text"
          name="location"
          id="location"
          className={styles.input}
          defaultValue={data?.location}
        />
        <span className={utils.formError}></span>
      </div>
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
