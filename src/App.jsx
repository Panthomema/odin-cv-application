import styles from './App.module.css';
import FormManager from './FormManager';
import Header from './Header';
import Preview from './Preview';

export default function App() {
  return (
    <div className={styles.app}>
      <div className={`${styles.column} ${styles['controls-wrapper']}`}>
        <div className={styles['header-wrapper']}>
          <Header />
        </div>
        <div className={styles['forms-wrapper']}>
          <FormManager />
        </div>
      </div>
      <div className={`${styles.column} ${styles['preview-wrapper']}`}>
        <Preview />
      </div>
    </div>
  );
}
