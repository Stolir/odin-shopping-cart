import { render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router';
import { beforeEach, expect, vi } from 'vitest';
import StoreLayout from './StoreLayout';
import userEvent from '@testing-library/user-event';

const mockNavigate = vi.fn();

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Store Layout', () => {
  const renderLayout = () => {
    render(
      <MemoryRouter>
        <StoreLayout />
      </MemoryRouter>,
    );
  };

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('should render all filter categories', () => {
    renderLayout();

    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  it('should call navigate with correct path', async () => {
    renderLayout();
    const user = userEvent.setup();
    const jeweleryFilter = screen.getByRole('button', {
      name: /.*jewelery.*/i,
    });

    await user.click(jeweleryFilter);

    expect(mockNavigate).toHaveBeenCalledWith('jewelery');
  });
});
