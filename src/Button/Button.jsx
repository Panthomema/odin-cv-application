import clsx from 'clsx';
import styles from './Button.module.css';

export default function Button({
  type,
  onClick,
  children,
  variant = 'primary',
}) {
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
