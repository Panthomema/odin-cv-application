import styles from './PersonalForm.module.css';
import { card } from './Utils.module.css';

export default function PersonalForm() {
  return (
    <form className={`${card} ${styles.form}`}>
      <h2>Personal Information</h2>
    </form>
  );
}
