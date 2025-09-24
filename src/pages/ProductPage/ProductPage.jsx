import { useLoaderData } from 'react-router';
import styles from './ProductPage.module.css';
import { useCart } from '../../context/CartContext';
import { Check, Minus, Plus } from 'iconoir-react';
import { useState } from 'react';

function ProductPage() {
  const productData = useLoaderData();

  const { updateCartItem } = useCart();
  console.log(useCart());

  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const handleAdd = (product, quantity) => {
    updateCartItem(product, quantity);
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 1750);
  };

  return (
    <section className={styles.productPage}>
      <figure className={styles.imageContainer}>
        <img src={productData.image} alt='' />
      </figure>
      <section className={styles.detailsContainer}>
        <h2>{productData.title}</h2>
        <p className={styles.description}>{productData.description}</p>
        <div className={styles.quantityContainer}>
          Quantity
          <div>
            {quantity > 1 && (
              <Minus
                role='button'
                aria-label='remove 1'
                onClick={() => {
                  setQuantity(quantity - 1);
                }}
              />
            )}
            <span aria-label='product quantity' className='no-select'>
              {quantity}
            </span>
            <Plus
              role='button'
              aria-label='add 1'
              onClick={() => {
                setQuantity(quantity + 1);
              }}
            />
          </div>
        </div>
        <button
          className={styles.addToBag}
          type='button'
          onClick={() => {
            handleAdd(productData, quantity);
          }}
          disabled={addedToCart}
        >
          {!addedToCart ? (
            <>
              <span>{productData.price}$</span>
              Add to bag{' '}
            </>
          ) : (
            <>
              Added to bag <Check />
            </>
          )}
        </button>
      </section>
    </section>
  );
}

export default ProductPage;

const baseUrl = 'https://fakestoreapi.com';

export const productDetailsLoader = async ({ params }) => {
  const { productId } = params;

  try {
    const response = await fetch(`${baseUrl}/products/${productId}`);
    if (!response.ok) {
      throw new Error(`An error has occurred! Status: ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    throw new Error(`Unable to find Product. Error: ${err.message}`);
  }
};
