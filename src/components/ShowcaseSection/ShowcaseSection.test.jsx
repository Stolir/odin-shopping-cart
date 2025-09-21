import { render, screen } from '@testing-library/react';
import { expect, vi } from 'vitest';
import ShowcaseSection from './ShowcaseSection';
import mockImage from '../../assets/mockImage.png';

vi.mock('../ProductCard/ProductCard', () => {
  return {
    default: ({ product }) => (
      <div data-testid='product-card'>{product.title}</div>
    ),
  };
});

describe('Showcase Section', () => {
  const category = "men's clothing";

  const heading = 'Explore our collection';

  const products = [
    {
      id: 0,
      title: 'Mens Cotton Jacket',
      price: 55.99,
      image: mockImage,
    },
    {
      id: 1,
      title: 'Mens Shirt',
      price: 10.99,
      image: mockImage,
    },
  ];

  it('should render correct heading', () => {
    render(
      <ShowcaseSection
        heading={heading}
        category={category}
        products={products}
      />,
    );

    expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();
  });

  it('should not render a heading when none is provided', () => {
    render(<ShowcaseSection category={category} products={products} />);

    expect(
      screen.queryByRole('heading', { name: heading }),
    ).not.toBeInTheDocument();
  });

  it('should render correct category', () => {
    render(
      <ShowcaseSection
        heading={heading}
        category={category}
        products={products}
      />,
    );

    expect(
      screen.getByRole('heading', { name: category.toUpperCase() }),
    ).toBeInTheDocument();
  });

  it('should render correct number of product cards', () => {
    render(
      <ShowcaseSection
        heading={heading}
        category={category}
        products={products}
      />,
    );
    const productCards = screen.getAllByTestId('product-card');
    expect(productCards).toHaveLength(2);
  });
});
