import utils from '../styles/Utils.module.css';
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
}) {
  return (
    <div className={styles.formField}>
      <label htmlFor={name}>
        {label} {tag && <span className={utils.textSecondary}>{tag}</span>}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className={styles.input}
        defaultValue={value}
        onBlur={onBlur}
        {...constraints}
      />
      <span className={utils.formError}>{error}</span>
    </div>
  );
}
