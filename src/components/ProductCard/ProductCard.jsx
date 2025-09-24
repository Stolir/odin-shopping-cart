import { Link } from 'react-router';
import styles from './ProductCard.module.css';

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className={styles.productCard}>
      <img src={product.image} alt='' />
      <div className={styles.details}>
        <h6>{product.title}</h6>
        <p aria-label='product price'>
          {product.price} <span>$</span>
        </p>
      </div>
    </Link>
  );
}

export default ProductCard;
