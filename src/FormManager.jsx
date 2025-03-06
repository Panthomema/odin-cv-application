import PersonalForm from './PersonalForm';
import styles from './FormManager.module.css';

export default function FormManager() {
  return (
    <nav className={styles['form-manager']}>
      <PersonalForm />
    </nav>
  );
}
