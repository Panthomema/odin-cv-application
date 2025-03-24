import clsx from 'clsx';
import utils from '../styles/Utils.module.css';
import styles from './Form.module.css';

export default function Form({
  title,
  children,
  onSubmit,
  onCancel,
  canDelete = false,
  onDeleteClick,
}) {
  return (
    <form
      className={clsx(utils.card, utils.borderRadius, styles.form)}
      onSubmit={onSubmit}
      noValidate
    >
      <h2>{title}</h2>
      {children}
      <div className={styles.buttonsArea}>
        {canDelete && (
          <Button type="button" onClick={onDeleteClick} variant="delete">
            Delete<span className="material-symbols-outlined">delete</span>
          </Button>
        )}
        <Button type="button" onClick={onCancel} variant="secondary">
          Cancel
        </Button>
        <Button type="submit">
          Save<span className="material-symbols-outlined">check</span>
        </Button>
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
        [styles.buttonDelete]: variant === 'delete',
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
