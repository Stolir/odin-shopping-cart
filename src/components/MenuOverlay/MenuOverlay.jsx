import { FocusTrap } from 'focus-trap-react';
import styles from './MenuOverlay.module.css';
import { NavArrowRight, Xmark } from 'iconoir-react';
import { Link } from 'react-router';

function MenuOverlay({ isOpen, onClose }) {
  const categories = [
    {
      category: "men's clothing",
      displayName: 'Men',
    },
    {
      category: "women's clothing",
      displayName: 'Women',
    },
    {
      category: 'jewelery',
      displayName: 'Jewelery',
    },
  ];

  const handleEscape = (e) => {
    if (e.key === 'Escape' && isOpen) {
      onClose();
    }
  };

  return (
    <FocusTrap
      active={isOpen}
      focusTrapOptions={{ fallbackFocus: '[aria-label="close menu"]' }}
    >
      <div
        className={`${styles.menuOverlay} ${isOpen ? styles.active : ''}`}
        onClick={onClose}
        onKeyDown={(e) => handleEscape(e)}
        inert={!isOpen}
      >
        <div className={styles.menuPanel} onClick={(e) => e.stopPropagation()}>
          <button type='button' aria-label='close menu' onClick={onClose}>
            <Xmark width={20} height={20} />
            <span aria-hidden='true'>Close</span>
          </button>
          <nav className={styles.navMenu} aria-label='main menu'>
            <ul className={styles.navList}>
              <li onClick={onClose}>
                <Link to='/store'>
                  <span>All Products</span> <NavArrowRight />
                </Link>
              </li>
              {categories.map((category) => (
                <li onClick={onClose} key={category.category}>
                  <Link to={`store/${encodeURIComponent(category.category)}`}>
                    <span>{category.displayName}</span> <NavArrowRight />
                  </Link>
                </li>
              ))}
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
  );
}

export default MenuOverlay;
