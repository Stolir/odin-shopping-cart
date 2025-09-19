import { FocusTrap } from 'focus-trap-react'
import styles from './MenuOverlay.module.css'
import { NavArrowRight, Xmark } from 'iconoir-react'

function MenuOverlay({ isOpen, onClose}) {

  return (
    <FocusTrap active={isOpen} focusTrapOptions={{ fallbackFocus: '[aria-label="close menu"]' }}>
      <div className={`${styles.menuOverlay} ${isOpen ? styles.active : ''}`}>
        <div className={styles.menuPanel}>
          <button type='button' aria-label='close menu' onClick={onClose}>
            <Xmark width={20} height={20}/>
            <span aria-hidden="true">Close</span>
          </button>
          <nav className={styles.navMenu} aria-label='main menu'>
            <ul className={styles.navList}>
              <li><a href="">Men</a> <NavArrowRight /></li>
              <li><a href="">Women</a> <NavArrowRight /></li>
              <li><a href="">Perfumes</a> <NavArrowRight /></li>
              <li><a href="">Watches</a> <NavArrowRight /></li>
            </ul>
          </nav>
          <br />
          <div className={styles.contactUs}>
            <h6>Need help?</h6>
            <p>+1 234 576 789</p>
            <p>stolaris@example.com</p>
          </div>
        </div>

      </div>
    </FocusTrap>
  )
}

export default MenuOverlay