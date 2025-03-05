import Card from "./Card";
import style from './Header.module.css';

export default function Header() {
  return (
    <header className={style.header}>
      <Card>
        <h1>Easy CV</h1>
      </Card>
    </header>
  );
  
}