import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { beforeEach, expect, vi } from 'vitest';
import CartPage from './CartPage';
import mockImage from '../../assets/mockImage.png';

let mockItems = [
  {
    id: 1,
    title: 'Very cool product',
    image: mockImage,
    quantity: 4,
    unitPrice: 9.99,
    totalPrice: 9.99 * 4,
  },
  {
    id: 2,
    title: 'Another very cool product',
    image: mockImage,
    quantity: 2,
    unitPrice: 99.99,
    totalPrice: 99.99 * 2,
  },
];

vi.mock('../../context/CartContext', async () => {
  const actual = await vi.importActual('../../context/CartContext');
  return {
    ...actual,
    useCart: () => ({ cartItems: mockItems }),
  };
});

describe('Cart Page', () => {
  beforeEach(() => {
    mockItems = [
      {
        id: 1,
        title: 'Very cool product',
        image: mockImage,
        quantity: 4,
        unitPrice: 9.99,
        totalPrice: 9.99 * 4,
      },
      {
        id: 2,
        title: 'Another very cool product',
        image: mockImage,
        quantity: 2,
        unitPrice: 99.99,
        totalPrice: 99.99 * 2,
      },
    ];
  });

  const renderCartPage = () => {
    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    );
  };

  it("should render 'Shopping Page' heading", () => {
    renderCartPage();

    expect(
      screen.getByRole('heading', { name: /shopping bag/i }),
    ).toBeInTheDocument();
  });

  it('should render default message when cart is empty', () => {
    mockItems = [];
    renderCartPage();

    expect(screen.getByRole('heading', { name: /^add.*first.*here.*/i }));
  });

  it('should render order summary section', () => {
    renderCartPage();

    expect(screen.getByText(/order summary/i)).toBeInTheDocument();
  });

  it('should render correct pricing details', () => {
    renderCartPage();

    const delivery = 7;
    const subtotal = mockItems.reduce(
      (total, item) => total + item.totalPrice,
      0,
    );

    expect(screen.getByText(/subtotal/i)).toBeInTheDocument();
    expect(screen.getByText(/delivery/i)).toBeInTheDocument();
    expect(screen.getByText(/subtotal/i)).toBeInTheDocument();

    expect(screen.getByText(`${subtotal.toFixed(2)}$`)).toBeInTheDocument();
    expect(screen.getByText(`${delivery.toFixed(2)}$`)).toBeInTheDocument();
    expect(
      screen.getByText(`${(subtotal + delivery).toFixed(2)}$`),
    ).toBeInTheDocument();
  });

  it('should not render order summary section when cart is empty', () => {
    mockItems = [];
    renderCartPage();

    expect(screen.queryByText(/order summary/i)).not.toBeInTheDocument();
  });

  it('should render checkout button', () => {
    renderCartPage();

    expect(
      screen.getByRole('button', { name: /checkout/i }),
    ).toBeInTheDocument();
  });
});
