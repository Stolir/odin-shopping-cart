import { Link, useNavigate } from 'react-router';
import { useCart } from '../../context/CartContext';
import styles from './CartItem.module.css';
import { BinMinusIn, Minus, Plus, Trash } from 'iconoir-react';

function CartItem({ item }) {
  const { incrementCartItem, decrementCartItem } = useCart();

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className={styles.cartItem}>
      <div
        className={styles.imageContainer}
        onClick={() => {
          handleClick(item.id);
        }}
      >
        <img src={item.image} alt='' />
      </div>
      <Link to={`/product/${item.id}`}>{item.title}</Link>
      <div className={styles.quantityContainer}>
        <button
          aria-label='remove 1'
          onClick={() => {
            decrementCartItem(item);
          }}
        >
          {item.quantity === 1 ? <BinMinusIn /> : <Minus />}
        </button>
        <span aria-label='product quantity' className='no-select'>
          {item.quantity}
        </span>
        <button
          aria-label='add 1'
          onClick={() => {
            incrementCartItem(item);
          }}
        >
          <Plus />
        </button>
      </div>
      <span
        className={`no-select ${styles.priceContainer}`}
        aria-label='product price'
      >
        {item.totalPrice}$
      </span>
    </div>
  );
}

export default CartItem;
