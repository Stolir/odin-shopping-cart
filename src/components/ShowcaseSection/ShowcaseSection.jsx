import ProductCard from '../ProductCard/ProductCard';
import styles from './ShowcaseSection.module.css';

function ShowcaseSection({ heading = null, category, products }) {
  return (
    <section className={styles.showcaseSection}>
      <h4>{category.toUpperCase()}</h4>
      {heading && <h2>{heading}</h2>}
      <div className={styles.cardContainer}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ShowcaseSection;
