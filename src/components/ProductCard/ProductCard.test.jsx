import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';
import mockImage from '../../assets/mockImage.png';
import { expect } from 'vitest';
import { MemoryRouter } from 'react-router';

describe('Product Card', () => {
  const product = {
    id: 0,
    title: 'Mens Cotton Jacket',
    price: 55.99,
    image: mockImage,
  };

  const renderProductCard = () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>,
    );
  };

  it('should be a link', () => {
    renderProductCard();

    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should render product image', () => {
    renderProductCard();

    expect(screen.getByRole('presentation')).toBeInTheDocument();
  });

  it('should render product title', () => {
    renderProductCard();

    expect(
      screen.getByRole('heading', { name: product.title }),
    ).toBeInTheDocument();
  });

  it('should render product price', () => {
    renderProductCard();

    expect(screen.getByLabelText(/.*price/i)).toBeInTheDocument();
  });
});
