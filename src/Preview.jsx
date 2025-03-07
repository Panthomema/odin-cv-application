import styles from './Preview.module.css';

export default function Preview({ resumeData }) {
  return (
    <div className={styles.preview}>
      <div className={styles.personal}>
        <h1>{resumeData.fullName}</h1>
      </div>
    </div>
  );
}
