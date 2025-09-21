import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';
import mockImage from '../../assets/mockImage.png';
import { expect } from 'vitest';

describe('Product Card', () => {
  const product = {
    title: 'Mens Cotton Jacket',
    price: 55.99,
    image: mockImage,
  };

  it('should render product image', () => {
    render(<ProductCard product={product} />);

    expect(screen.getByRole('presentation')).toBeInTheDocument();
  });

  it('should render product title', () => {
    render(<ProductCard product={product} />);

    expect(
      screen.getByRole('heading', { name: product.title }),
    ).toBeInTheDocument();
  });

  it('should render product price', () => {
    render(<ProductCard product={product} />);

    expect(screen.getByLabelText(/.*price/i)).toBeInTheDocument();
  });
});
