import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { beforeAll, beforeEach, expect, vi } from 'vitest';
import CartItem from './CartItem';
import mockImage from '../../assets/mockImage.png';
import userEvent from '@testing-library/user-event';

const mockNavigate = vi.fn();

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockIncrement = vi.fn();
const mockDecrement = vi.fn();

vi.mock('../../context/CartContext', async () => {
  const actual = await vi.importActual('../../context/CartContext');
  return {
    ...actual,
    useCart: () => ({
      incrementCartItem: mockIncrement,
      decrementCartItem: mockDecrement,
    }),
  };
});

describe('Cart Item', () => {
  const mockItem = {
    id: 1,
    title: 'Very cool product',
    image: mockImage,
    quantity: 4,
    unitPrice: 9.99,
    totalPrice: 9.99 * 4,
  };

  function DummyPage({ text }) {
    return <div data-testid='product-page'>{text}</div>;
  }

  const renderCartItem = () => {
    render(
      <MemoryRouter initialEntries={['/cart']}>
        <Routes>
          <Route path='/cart' element={<CartItem item={mockItem} />} />
          <Route
            path='/product/:id'
            element={<DummyPage text='Product Page' />}
          />
        </Routes>
      </MemoryRouter>,
    );
  };

  beforeEach(() => {
    mockNavigate.mockReset();
    mockDecrement.mockReset();
    mockIncrement.mockReset();
  });

  it('should render product image', () => {
    renderCartItem();

    expect(screen.getByRole('presentation')).toBeInTheDocument();
  });

  it('should call navigate with product id when image is clicked', async () => {
    renderCartItem();
    const user = userEvent.setup();
    const image = screen.getByRole('presentation');

    await user.click(image);

    expect(mockNavigate).toHaveBeenCalledWith(`/product/${mockItem.id}`);
  });

  it('should render item title as a link', () => {
    renderCartItem();

    expect(
      screen.getByRole('link', { name: mockItem.title }),
    ).toBeInTheDocument();
  });

  it('should navigate user to correct path when title is clicked', async () => {
    renderCartItem();
    const user = userEvent.setup();
    const titleLink = screen.getByRole('link', { name: mockItem.title });

    await user.click(titleLink);

    await waitFor(() => {
      expect(screen.getByTestId('product-page')).toBeInTheDocument();
    });
  });

  it('should render initial quantity selector', () => {
    renderCartItem();

    expect(
      screen.getByRole('button', { name: /remove (1||one)/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/product quantity/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /add (1||one)/i }),
    ).toBeInTheDocument();
  });

  it('should call decrement when remove button is clicked', async () => {
    renderCartItem();
    const user = userEvent.setup();
    const removeButton = screen.getByRole('button', {
      name: /remove (1||one)/i,
    });

    await user.click(removeButton);

    expect(mockDecrement).toHaveBeenCalled();
  });

  it('should call increment when add button is clicked', async () => {
    renderCartItem();
    const user = userEvent.setup();
    const addButton = screen.getByRole('button', {
      name: /add (1||one)/i,
    });

    await user.click(addButton);

    expect(mockIncrement).toHaveBeenCalled();
  });

  it('should render product price correctly', () => {
    renderCartItem();
    const priceField = screen.getByLabelText(/product price/i);

    expect(priceField).toHaveTextContent(`${mockItem.totalPrice}$`);
  });
});
