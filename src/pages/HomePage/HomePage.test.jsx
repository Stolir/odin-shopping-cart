import { render, screen } from '@testing-library/react';
import { MemoryRouter, useLoaderData } from 'react-router';
import HomePage from './HomePage';
import { expect } from 'vitest';

vi.mock('../../components/FeaturedProduct/FeaturedProduct', () => {
  return {
    default: ({ heading = 'placeholder heading' }) => (
      <h1 data-testid='featured-product'>{heading}</h1>
    ),
  };
});

vi.mock('../../components/ShowcaseSection/ShowcaseSection', () => {
  return {
    default: ({ category }) => (
      <h4 data-testid='showcase-section'>{category}</h4>
    ),
  };
});

const mockData = {
  jewelery: ['item1'],
};

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useLoaderData: () => mockData,
  };
});

describe('Home Page', () => {
  const renderHomePage = () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
  };

  it('should render featured product banner', () => {
    renderHomePage();

    expect(screen.getByTestId('featured-product')).toBeInTheDocument();
  });

  it('should render a Showcase Sections for the featured category', () => {
    renderHomePage();

    expect(
      screen.getByRole('heading', { name: /jewelery/i }),
    ).toBeInTheDocument();
  });
});
