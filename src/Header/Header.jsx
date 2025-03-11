import styles from './Header.module.css';
import { card } from '../styles/Utils.module.css'

export default function Header() {
  return (
    <header className={`${card} ${styles.header}`}>
      <h1>Easy CV</h1>
    </header>
  );
}
