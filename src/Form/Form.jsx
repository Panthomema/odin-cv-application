import clsx from 'clsx';
import utils from '../styles/Utils.module.css';
import styles from './Form.module.css';

export default function Form({ title, children, onSubmit, onCancel }) {
  return (
    <form
      className={clsx(utils.card, utils.borderRadius, styles.form)}
      onSubmit={onSubmit}
      noValidate
    >
      <h2>{title}</h2>
      {children}
      <div className={styles.buttonsArea}>
        <Button type="button" onClick={onCancel} variant="secondary">
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}

function Button({ type, onClick, children, variant = 'primary' }) {
  return (
    <button
      type={type}
      className={clsx(styles.button, {
        [styles.buttonPrimary]: variant === 'primary',
        [styles.buttonSecondary]: variant === 'secondary',
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
