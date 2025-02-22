import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AuthContext from '../../Providers/AuthProvider';
import Home from './Home';
import { vi } from 'vitest';
import { describe, test } from 'vitest';


// Mock carousel images
vi.mock('../../assets/user/carousel1.jpg', () => ({ default: 'mockedImage1.jpg' }));
vi.mock('../../assets/user/carousel2.jpg', () => ({ default: 'mockedImage2.jpg' }));
vi.mock('../../assets/user/carousel3.jpg', () => ({ default: 'mockedImage3.jpg' }));

const renderWithContext = (ui, { auth } = { auth: {} }) => {
  return render(
    // for mock the authentication context recive the user info......
    <AuthContext.Provider value={auth}> 

    {/* provides the routing support  ui is parameter the react componet to render */}
      <BrowserRouter>{ui}</BrowserRouter>
    </AuthContext.Provider>
  );
};
//describe group all tests related to the home component
describe('Home Component', () => {
 

  test('renders and navigates carousel slides', () => {
    // Render the home component inside the mock context
    renderWithContext(<Home />);
    const nextButton = screen.getByRole('button', { name: /❯/i });
    const prevButton = screen.getByRole('button', { name: /❮/i });

    expect(screen.getByAltText(/slide 1/i)).toBeInTheDocument();

    fireEvent.click(nextButton);
    expect(screen.getByAltText(/slide 2/i)).toBeInTheDocument();

    fireEvent.click(prevButton);
    expect(screen.getByAltText(/slide 1/i)).toBeInTheDocument();
  });

  test('shows carousel indicators and changes slide on click', () => {
    renderWithContext(<Home />);
    const indicators = screen.getAllByRole('button', { name: '' });
    fireEvent.click(indicators[1]);
    expect(screen.getByAltText(/slide 2/i)).toBeInTheDocument();
  });
});
