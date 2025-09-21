import styles from './Navbar.module.css';
import logo from '../../assets/logo.png';
import { Search, Menu, User, ShoppingBag } from 'iconoir-react';
import { Link } from 'react-router';
import { useState } from 'react';
import SearchOverlay from '../SearchOverlay/SearchOverlay';
import MenuOverlay from '../MenuOverlay/MenuOverlay';

function Navbar() {
  const [isSearching, setIsSearching] = useState(false);

  const toggleSearching = () => {
    setIsSearching(isSearching ? false : true);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(isMenuOpen ? false : true);
  };

  return (
    <>
      <header className={styles.header}>
        <button
          className={`${styles.menu} ${styles.button}`}
          onClick={toggleMenu}
          aria-label='open menu'
        >
          <Menu width={18} height={18} aria-hidden='true' />
          <span aria-hidden='true'>Menu</span>
        </button>

        <button
          className={`${styles.search} ${styles.button}`}
          onClick={toggleSearching}
          aria-label='search'
        >
          <Search width={18} height={18} aria-hidden='true' />
          <span aria-hidden='true'>Search</span>
        </button>

        <Link to='/' className={`${styles.link} ${styles.logo}`}>
          <img src={logo} alt='stolaris' />
        </Link>

        <Link
          to='/profile'
          className={`${styles.link} ${styles.profile}`}
          aria-label='go to profile'
        >
          <User width={18} height={18} aria-hidden='true' />
        </Link>

        <Link
          to='/cart'
          className={`${styles.link} ${styles.cart}`}
          aria-label='go to cart'
        >
          <ShoppingBag width={18} height={18} aria-hidden='true' />
        </Link>
      </header>

      <SearchOverlay isOpen={isSearching} onClose={toggleSearching} />
      <MenuOverlay isOpen={isMenuOpen} onClose={toggleMenu} />
    </>
  );
}

export default Navbar;
