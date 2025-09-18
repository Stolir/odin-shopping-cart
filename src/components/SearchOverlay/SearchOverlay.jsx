import { useNavigate } from 'react-router'
import logo from '../../assets/logo.png'
import { Xmark } from 'iconoir-react'
import styles from './SearchOverlay.module.css'
import { useState } from 'react'
import { FocusTrap } from 'focus-trap-react'

function SearchOverlay({ isOpen, onClose }) {

  let navigate = useNavigate()

  const [value, setValue] = useState('')

  return (
    <FocusTrap 
      active={isOpen}  
      focusTrapOptions={{fallbackFocus: '#search'
    }}>
      <div className={`${styles.searchOverlay} ${isOpen ? styles.active : ''}`}>
        <div className={styles.overlayControls}>
          <button onClick={() => {
            navigate('/')
            onClose();
            }}
            className={`${styles.logo}`}>
            <img src={logo} alt='stolaris'/>
          </button>
          <button className={styles.closeButton} onClick={onClose} aria-label='close search'>
            <Xmark />
          </button>
        </div>
        <div className={styles.searchContainer}>
            <label htmlFor="search" className='sr-only'>Search for products</label>
            <input
              type="search"
              id='search'
              placeholder='Search...'
              value={value}
              onChange={(e) => {setValue(e.target.value)}}
              />
            {value && <button className={styles.clearButton} onClick={() => setValue('')}>
                Erase
              </button>}
        </div>
      </div>
    </FocusTrap>
  )
}

export default SearchOverlay