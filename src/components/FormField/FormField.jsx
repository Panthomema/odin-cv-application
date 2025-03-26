import clsx from 'clsx';
import utils from '../../styles/Utils.module.css';
import styles from './FormField.module.css';

export default function FormField({
  name,
  type,
  label,
  tag,
  value,
  onBlur,
  constraints = {},
  error,
  ref,
}) {
  return (
    <div className={styles.formField}>
      <label htmlFor={name}>
        {label} {tag && <span className={utils.textSecondary}>{tag}</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          id={name}
          className={clsx(
            styles.input,
            styles.textarea,
            error && styles.invalid,
          )}
          defaultValue={value}
          onBlur={onBlur}
          {...constraints}
        ></textarea>
      ) : (
        <input
          ref={ref}
          type={type}
          name={name}
          id={name}
          className={clsx(styles.input, error && styles.invalid)}
          defaultValue={value}
          onBlur={onBlur}
          {...constraints}
        />
      )}
      <span className={utils.formError} aria-live="polite">
        {error}
      </span>
    </div>
  );
}
