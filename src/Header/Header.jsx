import clsx from 'clsx';
import utils from '../styles/Utils.module.css';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={clsx(utils.card, styles.header)}>
      <h1>Easy CV</h1>
    </header>
  );
}
