import styles from './FeaturedProduct.module.css';

function FeaturedProduct({
  imgBig = null,
  imgMedium = null,
  imgSmall = null,
  heading = 'Full Product Name Placeholder',
}) {
  return (
    <div className={styles.featuredContainer}>
      <h1>{heading}</h1>
      <picture>
        <source media='(max-width: 500px)' srcSet={imgSmall} />
        <source media='(max-width: 800px)' srcSet={imgMedium} />
        <img src={imgBig} alt='dragon bracelet' />
      </picture>
    </div>
  );
}

export default FeaturedProduct;
