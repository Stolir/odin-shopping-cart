import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router';
import { expect, vi } from 'vitest';

const mockCartItems = [
  { id: 0, quantity: 3 },
  { id: 1, quantity: 2 },
];

const cartItemCount = 5;

vi.mock('../../context/CartContext', async () => {
  const actual = await vi.importActual('../../context/CartContext');
  return {
    ...actual,
    useCart: () => ({
      cartItems: mockCartItems,
    }),
  };
});

describe('Navbar', () => {
  const mockRoutes = [
    { path: '/', element: <h1>Home Page</h1> },
    { path: 'profile', element: <h1>Profile Page</h1> },
    { path: 'cart', element: <h1>Cart Page</h1> },
  ];
  const renderNavbar = () => {
    render(
      <MemoryRouter>
        <Navbar />
        <Routes>
          {mockRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </MemoryRouter>,
    );
  };

  it('should render correct content', () => {
    renderNavbar();

    expect(
      screen.queryByRole('button', { name: /open menu/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /^search$/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: /go.*profile/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: /go.*cart/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: /stolaris/i }),
    ).toBeInTheDocument();
  });

  it('should expand menu when menu button is clicked', async () => {
    renderNavbar();
    const menuBtn = screen.getByRole('button', { name: /open menu/i });
    const user = userEvent.setup();

    await user.click(menuBtn);
    const navList = await screen.findByRole('navigation', {
      name: /^main menu$/i,
    });

    expect(navList).toBeInTheDocument();
  });

  it('should show search overlay when search button is clicked', async () => {
    renderNavbar();
    const user = userEvent.setup();
    const searchBtn = screen.getByRole('button', { name: /^search$/i });

    await user.click(searchBtn);
    const searchBar = await screen.findByRole('searchbox', {
      name: /.*search.*/i,
    });

    expect(searchBar).toBeInTheDocument();
  });

  it('should render profile page when profile is clicked', async () => {
    renderNavbar();
    const user = userEvent.setup();
    const profileBtn = screen.getByRole('link', { name: /go.*profile/i });

    await user.click(profileBtn);

    expect(
      await screen.findByRole('heading', { name: /profile page/i }),
    ).toBeInTheDocument();
  });

  it('should render cart page when cart is clicked', async () => {
    renderNavbar();
    const user = userEvent.setup();
    const cartBtn = screen.getByRole('link', { name: /go.*cart/i });

    await user.click(cartBtn);

    expect(
      await screen.findByRole('heading', { name: /cart page/i }),
    ).toBeInTheDocument();
  });

  it('should render home page when logo is clicked', async () => {
    renderNavbar();
    const user = userEvent.setup();
    const logo = screen.getByRole('link', { name: /stolaris/i });

    await user.click(logo);

    expect(
      await screen.findByRole('heading', { name: /home page/i }),
    ).toBeInTheDocument();
  });

  it('should render correct amount of cart items', () => {
    renderNavbar();

    expect(screen.getByLabelText(/.*cart.*item.*/i)).toHaveTextContent(
      cartItemCount,
    );
  });
});
