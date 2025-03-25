import clsx from 'clsx';
import utils from '../styles/Utils.module.css';
import styles from './Header.module.css';
import Button from '../Button/Button';

export default function Header({ onPrint }) {
  return (
    <header className={clsx(utils.card, utils.borderRadius, styles.header)}>
      <h1>Easy CV</h1>
      <Button onClick={onPrint} icon>
        Download<span className="material-symbols-outlined">download</span>
      </Button>
    </header>
  );
}
