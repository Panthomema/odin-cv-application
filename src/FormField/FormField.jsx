import styles from './FormField.module.css';
import utils from '../styles/Utils.module.css';

export default function FormField({ name, type, label, tag, value }) {
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
      />
      <span className={utils.formError}></span>
    </div>
  );
}
