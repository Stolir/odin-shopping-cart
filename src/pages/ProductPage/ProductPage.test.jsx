import { render, screen, waitFor } from '@testing-library/react';
import mockImage from '../../assets/mockImage.png';
import { beforeEach, expect, vi } from 'vitest';
import { MemoryRouter, useLoaderData } from 'react-router';
import ProductPage from './ProductPage';
import userEvent from '@testing-library/user-event';
import { useCart } from '../../context/CartContext';
import { act } from 'react';

const mockData = {
  id: 6,
  title: 'Solid Gold Petite Micropave',
  price: 168,
  description:
    '1 Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.',
  category: 'jewelery',
  image: mockImage,
};

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useLoaderData: () => mockData,
  };
});

const mockUpdateCart = vi.fn();
vi.mock('../../context/CartContext', async () => {
  const actual = await vi.importActual('../../context/CartContext');
  return {
    ...actual,
    useCart: () => ({ updateCartItem: mockUpdateCart }),
  };
});

describe('Product Page', () => {
  const renderProductPage = () => {
    render(
      <MemoryRouter>
        <ProductPage />
      </MemoryRouter>,
    );
  };

  beforeEach(() => {
    mockUpdateCart.mockReset();
  });

  it('should render product image', () => {
    renderProductPage();

    expect(screen.getByRole('presentation')).toBeInTheDocument();
  });

  it('should render product title', () => {
    renderProductPage();

    expect(
      screen.getByRole('heading', { name: mockData.title }),
    ).toBeInTheDocument();
  });

  it('should render product description', () => {
    renderProductPage();

    expect(screen.getByText(mockData.description)).toBeInTheDocument();
  });

  it('should render initial quantity selector', () => {
    renderProductPage();

    expect(screen.getByText(/quantity/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /.*add.*1/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /.*remove.*1/i }),
    ).not.toBeInTheDocument();
  });

  it('should increment quantity when plus button is clicked', async () => {
    renderProductPage();
    const user = userEvent.setup();
    const addButton = screen.getByRole('button', { name: /add (1|one)/i });
    const quantity = screen.getByLabelText(/product quantity/i);

    expect(quantity).toHaveTextContent(1);
    await user.click(addButton);

    expect(quantity).toHaveTextContent(2);
  });

  it('should decrement quantity when minus button is clicked', async () => {
    renderProductPage();
    const user = userEvent.setup();
    const addButton = screen.getByRole('button', { name: /add (1|one)/i });
    const quantity = screen.getByLabelText(/product quantity/i);

    await user.click(addButton);
    await user.click(addButton);
    await user.click(addButton);
    expect(quantity).toHaveTextContent(4);
    const removeButton = screen.getByRole('button', {
      name: /remove (1|one)/i,
    });

    await user.click(removeButton);

    expect(quantity).toHaveTextContent(3);
  });

  it('should render add to bag button', () => {
    renderProductPage();

    expect(
      screen.getByRole('button', { name: /add to (bag|cart)/i }),
    ).toBeInTheDocument();
  });

  it('should call update cart function when add to bag is clicked', async () => {
    renderProductPage();
    const user = userEvent.setup();
    const addToBagBtn = screen.getByRole('button', {
      name: /add to (bag|cart)/i,
    });

    await user.click(addToBagBtn);
    expect(mockUpdateCart).toHaveBeenCalled();
  });

  it("should show 'added' then return to normal when add to bag is clicked", async () => {
    renderProductPage();

    const user = userEvent.setup();

    const addToBagBtn = screen.getByRole('button', {
      name: /add to (bag|cart)/i,
    });

    await user.click(addToBagBtn);
    expect(addToBagBtn).toHaveTextContent(/.*added.*/i);

    await waitFor(
      () => {
        expect(addToBagBtn).not.toHaveTextContent(/.*added.*/i);
      },
      { timeout: 1750 },
    );
  });
});
