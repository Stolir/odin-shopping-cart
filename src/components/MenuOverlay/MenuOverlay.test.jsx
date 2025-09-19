import { it, expect, describe, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import MenuOverlay from './MenuOverlay'
import userEvent from '@testing-library/user-event'

describe('Menu Overlay', () => {

  const onClose = vi.fn()

  const renderMenuOverlay = (isOpen = false) => {
    render(
      <MemoryRouter>
        <MenuOverlay isOpen={isOpen} onClose={onClose}/>
      </MemoryRouter>
    )
  }

  beforeEach(() => {
    onClose.mockReset();
  });

  it('should render correct content', () => {
    renderMenuOverlay()

    expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: /main menu/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', {name: /.*need.*help.*/i})).toBeInTheDocument();
  })

  it('should call onClose when close button is clicked', async () => {
    renderMenuOverlay()
    const user = userEvent.setup();
    const closeBtn = screen.getByRole('button', {name: /close menu/i})

    await user.click(closeBtn);

    expect(onClose).toHaveBeenCalled();
  })
})