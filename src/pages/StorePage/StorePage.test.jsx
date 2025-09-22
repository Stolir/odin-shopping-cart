import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import StorePage from './StorePage';
import { expect } from 'vitest';

vi.mock('../../components/ShowcaseSection/ShowcaseSection', () => {
  return {
    default: ({ category }) => (
      <h4 data-testid='showcase-section'>{category}</h4>
    ),
  };
});

const mockData = {
  "men's clothing": ['item1', 'item2'],
  "women's clothing": ['item1', 'item2'],
  jewelery: ['item1'],
};

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useLoaderData: () => mockData,
  };
});

describe('Store Page', () => {
  const renderStorePage = () => {
    render(
      <MemoryRouter>
        <StorePage />
      </MemoryRouter>,
    );
  };

  it('should render a section for each category', () => {
    renderStorePage();

    expect(screen.getAllByTestId('showcase-section')).toHaveLength(3);
  });
});
