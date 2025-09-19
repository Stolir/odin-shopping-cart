import { render, screen } from '@testing-library/react'
import SearchOverlay from './SearchOverlay'
import { MemoryRouter } from 'react-router'
import userEvent from '@testing-library/user-event'
import { beforeEach, expect } from 'vitest'

describe('Search Overlay', () => {

  const renderSearchOverlay = (isOpen = false) => {
    render(
      <MemoryRouter>
        <SearchOverlay isOpen={isOpen} onClose={onClose}/>
      </MemoryRouter>
  )
  }

  const onClose = vi.fn();

  beforeEach(() => {
    onClose.mockReset();
  })

  it('should render correct base content', () => {
    renderSearchOverlay();

    expect(screen.getByRole('button', {name: /stolaris/i})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: /close.*search.*/i})).toBeInTheDocument()
    expect(screen.getByRole('searchbox', {name: /.*search.*/i})).toBeInTheDocument()
  })

  it('should call onClose when close button is clicked', async () => {
    renderSearchOverlay();
    const user = userEvent.setup()
    const closeBtn = screen.getByRole('button', {name: /close.*search.*/i})

    await user.click(closeBtn);

    expect(onClose).toHaveBeenCalledTimes(1);
  })

  it('should call onClose when search overlay is open and Escape is pressed', async () => {
    renderSearchOverlay(true);
    const user = userEvent.setup()

    await user.keyboard('{Escape}');

    expect(onClose).toHaveBeenCalledTimes(1);
  })

  it('should not call onClose when search overlay is closed and Escape is pressed', async () => {
    renderSearchOverlay(false);
    const user = userEvent.setup()

    await user.keyboard('{Escape}');

    expect(onClose).not.toHaveBeenCalled();
  })

  it('should not render erase button when input is empty', async () => {
    renderSearchOverlay()
    const user = userEvent.setup();
    const searchInput = screen.getByRole('searchbox', {name: /.*search.*/i})

    await user.clear(searchInput)
    
    expect(screen.queryByRole('button', {name: /erase/i})).not.toBeInTheDocument();
  })

  it('should render erase button when input is not empty', async () => {
    renderSearchOverlay()
    const user = userEvent.setup();
    const searchInput = screen.getByRole('searchbox', {name: /.*search.*/i})

    await user.type(searchInput, 'Shirt')

    expect(screen.getByRole('button', {name: /erase/i})).toBeInTheDocument();
  })

  it('should erase search text when erase button is clicked', async() => {
    renderSearchOverlay()
    const user = userEvent.setup();
    const searchInput = screen.getByRole('searchbox', {name: /.*search.*/i})
    await user.type(searchInput, 'Shirt')
    const eraseBtn = screen.getByRole('button', {name: /erase/i})

    await user.click(eraseBtn);
    
    expect(searchInput).toHaveValue('')
  }) 
})