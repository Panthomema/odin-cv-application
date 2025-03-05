import Card from './Card';
import styles from './PersonalForm.module.css';

export default function PersonalForm() {
  return (
    <form className={styles.form}>
      <Card>
        <h2>Personal Information</h2>
      </Card>
    </form>
  );
}
