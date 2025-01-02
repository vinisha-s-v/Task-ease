import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "./Home";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContext from "../../Providers/AuthProvider";

describe("Home Component", () => {
  const mockAuth = { auth: { role: "user" } };

  const renderHome = () =>
    render(
      <AuthContext.Provider value={mockAuth}>
        <Router>
          <Home />
        </Router>
      </AuthContext.Provider>
    );

  test("renders NavigationBar and FooterHome components", () => {
    renderHome();
    // Check if NavigationBar is rendered
    expect(screen.getByText(/navigation/i)).toBeInTheDocument();

    // Check if FooterHome is rendered
    expect(screen.getByText(/footer/i)).toBeInTheDocument();
  });

  test("renders carousel images", () => {
    renderHome();
    // Check if carousel images are rendered
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(3);
  });

  test("navigates to the next slide", async () => {
    renderHome();

    const nextButton = screen.getByText("❯");

    // Simulate clicking the next button
    fireEvent.click(nextButton);

    // Wait for the carousel to move to the next slide
    await waitFor(() => {
      const images = screen.getAllByRole("img");
      expect(images[1]).toBeVisible(); // Check if the second slide is visible
    });
  });

  test("navigates to the previous slide", async () => {
    renderHome();

    const prevButton = screen.getByText("❮");

    // Simulate clicking the previous button
    fireEvent.click(prevButton);

    // Wait for the carousel to move to the previous slide
    await waitFor(() => {
      const images = screen.getAllByRole("img");
      expect(images[2]).toBeVisible(); // Check if the last slide is visible
    });
  });

  test("automatically moves to the next slide after 3 seconds", async () => {
    jest.useFakeTimers(); // Use fake timers to control time

    renderHome();

    // Fast-forward 3 seconds
    jest.advanceTimersByTime(3000);

    // Wait for the carousel to move to the next slide
    await waitFor(() => {
      const images = screen.getAllByRole("img");
      expect(images[1]).toBeVisible(); // Check if the second slide is visible
    });

    jest.useRealTimers(); // Restore real timers
  });

  test("navigates to a specific slide using indicators", () => {
    renderHome();

    const indicators = screen.getAllByRole("button");

    // Click on the second indicator
    fireEvent.click(indicators[1]);

    // Check if the second slide is visible
    const images = screen.getAllByRole("img");
    expect(images[1]).toBeVisible();
  });
});
