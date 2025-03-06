import styles from './PersonalForm.module.css';
import utils from './Utils.module.css';

export default function PersonalForm({ data }) {
  return (
    <form className={`${utils.card} ${styles.form}`}>
      <h2>Edit Personal Details</h2>
      <div className={styles['form-group']}>
        <label htmlFor="full-name">
          Full Name <span className={utils['text-secondary']}>required</span>
        </label>
        <input
          type="text"
          name="full-name"
          id="full-name"
          className={styles.input}
          value={data?.fullName}
        />
        <span className={utils['form-error']}></span>
      </div>
      <div className={styles['form-group']}>
        <label htmlFor="email">
          Email <span className={utils['text-secondary']}>recommended</span>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className={styles.input}
          value={data?.email}
        />
        <span className={utils['form-error']}></span>
      </div>
      <div className={styles['form-group']}>
        <label htmlFor="phone-number">
          Phone Number{' '}
          <span className={utils['text-secondary']}>recommended</span>
        </label>
        <input
          type="tel"
          name="phone-number"
          id="phone-number"
          className={styles.input}
          value={data?.phoneNumber}
        />
        <span className={utils['form-error']}></span>
      </div>
      <div className={styles['form-group']}>
        <label htmlFor="location">
          Location <span className={utils['text-secondary']}>optional</span>
        </label>
        <input
          type="text"
          name="location"
          id="location"
          className={styles.input}
          value={data?.location}
        />
        <span className={utils['form-error']}></span>
      </div>
      <div className={styles['buttons-area']}>
        <button
          type="button"
          className={`${styles.button} ${styles['button-secondary']}`}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`${styles.button} ${styles['button-primary']}`}
        >
          Save
        </button>
      </div>
    </form>
  );
}
