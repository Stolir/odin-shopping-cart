import CartItem from '../../components/CartItem/CartItem';
import { useCart } from '../../context/CartContext';
import styles from './CartPage.module.css';

function CartPage() {
  const { cartItems } = useCart();
  const isCartItems = cartItems.length > 0;
  const deliveryFee = 7;
  const subtotal = cartItems.reduce(
    (total, item) => total + item.totalPrice,
    0,
  );
  console.log(cartItems);
  return (
    <div className={styles.cartPage}>
      <section className={styles.itemsContainer}>
        <h2>Shopping Bag</h2>
        {isCartItems ? (
          cartItems.map((item) => <CartItem item={item} key={item.id} />)
        ) : (
          <h3 className={styles.emptyCart}>
            Add your first item to see it here!
          </h3>
        )}
      </section>
      {isCartItems && (
        <section className={styles.orderSummary}>
          <h3>Order Summary</h3>
          <div className={styles.details}>
            <p>
              <span>Subtotal</span>
              {subtotal.toFixed(2)}$
            </p>
            <p>
              <span>Delivery</span>
              {deliveryFee.toFixed(2)}$
            </p>
            <p className={styles.totalPrice}>
              <span>Total</span> {(subtotal + deliveryFee).toFixed(2)}$
            </p>
          </div>
          <button type='button'>Checkout</button>
        </section>
      )}
    </div>
  );
}

export default CartPage;
