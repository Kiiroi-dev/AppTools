import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.icon}>𝄞</span>
        <span className={styles.name}>TabLab</span>
      </div>
      <nav className={styles.nav}>
        <span className={styles.badge}>MVP · Guitare Classique</span>
      </nav>
    </header>
  )
}
