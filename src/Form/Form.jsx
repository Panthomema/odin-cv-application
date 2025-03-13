import utils from '../styles/Utils.module.css';
import styles from './Form.module.css';

export default function Form({ title, children, onSubmit, onCancel }) {
  return (
    <form
      className={`${utils.card} ${styles.form}`}
      onSubmit={onSubmit}
      noValidate
    >
      <h2>{title}</h2>
      {children}
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
