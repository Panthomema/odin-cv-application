import PersonalForm from './PersonalForm';
import styles from './FormManager.module.css';

export default function FormManager({ resumeData, setResumeData }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    setResumeData(data);
  }

  return (
    <nav className={styles['form-manager']}>
      <PersonalForm data={resumeData} handleSubmit={handleSubmit}/>
    </nav>
  );
}
