import { useLoaderData, useParams } from 'react-router';
import ShowcaseSection from '../ShowcaseSection/ShowcaseSection';

function CategoryWrapper() {
  const { category } = useParams();
  const productData = useLoaderData();
  console.log(productData);

  return <ShowcaseSection category={category} products={productData} />;
}

export default CategoryWrapper;

const baseUrl = 'https://fakestoreapi.com';

export const categoryProductsLoader = async ({ params }) => {
  const { category } = params;
  try {
    const response = await fetch(
      `${baseUrl}/products/category/${encodeURIComponent(category)}`,
    );

    if (!response.ok) {
      throw new Error(`An error has occurred! Status:${response.status}`);
    }

    return await response.json();
  } catch (err) {
    throw new Error(`Failed to load products ${err.message}`);
  }
};
