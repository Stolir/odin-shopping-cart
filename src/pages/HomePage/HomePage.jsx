import { Link, useLoaderData } from 'react-router';
import FeaturedProduct from '../../components/FeaturedProduct/FeaturedProduct';
import dragonBraceletBig from '../../assets/dragonring-full-700h.jpg';
import dragonBraceletSmall from '../../assets/dragonring-500w-700h.jpg';
import dragonBraceletMedium from '../../assets/dragonring-800w-700h.jpg';

import styles from './HomePage.module.css';
import ShowcaseSection from '../../components/ShowcaseSection/ShowcaseSection';

function HomePage() {
  const productsData = useLoaderData();

  console.log(productsData);
  return (
    <div className={styles.homePage}>
      <FeaturedProduct
        imgBig={dragonBraceletBig}
        imgSmall={dragonBraceletSmall}
        imgMedium={dragonBraceletMedium}
        heading='Legends Naga Gold & Silver Dragon Station Chain Bracelet'
      />
      {Object.entries(productsData).map(([category, products]) => (
        <ShowcaseSection
          heading={
            category === 'jewelery'
              ? 'Discover our timeless jewelry pieces, crafted to shine with every detail'
              : ''
          }
          key={category}
          category={category}
          products={products}
        />
      ))}
    </div>
  );
}

export default HomePage;

const baseUrl = 'https://fakestoreapi.com';
const featuredCategories = ['jewelery'];

export const featuredProductsLoader = async () => {
  try {
    const responses = await Promise.all(
      featuredCategories.map((cat) =>
        fetch(
          `${baseUrl}/products/category/${encodeURIComponent(cat)}?limit=3`,
        ),
      ),
    );

    const data = await Promise.all(responses.map((res) => res.json()));

    const result = featuredCategories.reduce((acc, cat, index) => {
      acc[cat] = data[index];
      return acc;
    }, {});

    return result;
  } catch (err) {
    throw new Response('Failed to load showcase products', { status: 500 });
  }
};
