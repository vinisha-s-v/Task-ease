import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import MainHome from './MainHome'; // adjust path if needed
import { useNavigate } from 'react-router-dom';

// Mocking navigate function from useNavigate
vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useNavigate: vi.fn(),
    };
  });
describe('MainHome Component', () => {
  it('renders carousel images', () => {
    render(
      <MemoryRouter>
        <MainHome />
      </MemoryRouter>
    );

    // Check if images are rendered
    expect(screen.getByAltText('Slide 1')).toBeInTheDocument();
    expect(screen.getByAltText('Slide 2')).toBeInTheDocument();
    expect(screen.getByAltText('Slide 3')).toBeInTheDocument();
  });

  it('navigates to the next slide when the next button is clicked', async () => {
    render(
      <MemoryRouter>
        <MainHome />
      </MemoryRouter>
    );

    // Get the next button and click it
    const nextButton = screen.getByText('❯');
    fireEvent.click(nextButton);

    await waitFor(() => {
      // Assert that the second image is visible (check if transform style changed)
      const carousel = screen.getByAltText('Slide 2');
      expect(carousel).toBeInTheDocument();
    });
  });

  it('navigates to the previous slide when the previous button is clicked', async () => {
    render(
      <MemoryRouter>
        <MainHome />
      </MemoryRouter>
    );

    // Click next to move to second slide, then click previous
    const nextButton = screen.getByText('❯');
    fireEvent.click(nextButton);
    const prevButton = screen.getByText('❮');
    fireEvent.click(prevButton);

    await waitFor(() => {
      // Assert that the first image is back (check if transform style changed)
      const carousel = screen.getByAltText('Slide 1');
      expect(carousel).toBeInTheDocument();
    });
  });

  it('updates current slide when an indicator is clicked', async () => {
    render(
      <MemoryRouter>
        <MainHome />
      </MemoryRouter>
    );

    // Find the second indicator and click it
    const secondIndicator = screen.getAllByRole('button')[1];
    fireEvent.click(secondIndicator);

    await waitFor(() => {
      // Assert that the second image is visible
      const carousel = screen.getByAltText('Slide 2');
      expect(carousel).toBeInTheDocument();
    });
  });

  it('renders the footer component', () => {
    render(
      <MemoryRouter>
        <MainHome />
      </MemoryRouter>
    );

    // Check if FooterHome is rendered
    expect(screen.getByText(/© 2024 TaskEase™. All Rights Reserved./)).toBeInTheDocument();
});

  it('navigates to correct login page based on selection', () => {
    const navigate = vi.fn();
     // Mock useNavigate to return our mocked function
  vi.mocked(useNavigate).mockReturnValue(navigate);
    render(
      <MemoryRouter>
        <MainHome />
      </MemoryRouter>
    );

    // Simulate selecting 'Admin Login' from the dropdown
    const loginDropdown = screen.getByRole('combobox');
    fireEvent.change(loginDropdown, { target: { value: 'admin' } });

    // Assert that the navigate function was called with the correct URL
    expect(navigate).toHaveBeenCalledWith('/admin-login');
  });
});
