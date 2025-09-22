import { useLoaderData } from 'react-router';
import styles from './StorePage.module.css';
import ShowcaseSection from '../../components/ShowcaseSection/ShowcaseSection';

function StorePage() {
  const productsData = useLoaderData();
  console.log(productsData);

  return (
    <div className={styles.storePage}>
      {Object.entries(productsData).map(([category, products]) => (
        <ShowcaseSection
          key={category}
          category={category}
          products={products}
        />
      ))}
    </div>
  );
}

export default StorePage;

const baseUrl = 'https://fakestoreapi.com';
const categories = ["men's clothing", "women's clothing", 'jewelery'];

export const allProductsLoader = async () => {
  try {
    const responses = await Promise.all(
      categories.map((cat) =>
        fetch(`${baseUrl}/products/category/${encodeURIComponent(cat)}`),
      ),
    );

    const data = await Promise.all(responses.map((res) => res.json()));

    const result = categories.reduce((acc, cat, index) => {
      acc[cat] = data[index];
      return acc;
    }, {});
    return result;
  } catch (err) {
    throw new Error(`Failed to load products ${err.message}`);
  }
};
