import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import CreateTaskForm from "./CreateTaskForm";
import { vi } from "vitest";
// Mocks the axios library...it will simulate the behavior of axios.
vi.mock("axios");

describe("CreateTaskForm", () => {
  test("submits form and creates a task successfully", async () => {
    // fake  response to simulate  api call
    const mockResponse = { data: { createdAt: "2025-01-14T10:00:00Z" } };
    axios.post.mockResolvedValue(mockResponse);

    // Mock functions
    const onClose = vi.fn();

    // Render the component
    render(
      <Router>
        <CreateTaskForm token="mockToken" onClose={onClose} />
      </Router>
    );

    // Fill out the form fields
    fireEvent.change(screen.getByPlaceholderText("Enter title"), {
      target: { value: "Test Task" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter Description"), {
      target: { value: "This is a test task description" },
    });
    fireEvent.change(screen.getByPlaceholderText("Deadline"), {
      target: { value: "2025-02-14T12:00" },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Submit"));

    // Wait for the Axios request
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:8080/api/users/tasks/create",
        {
          title: "Test Task",
          description: "This is a test task description",
          deadLine: "2025-02-14T12:00",
        },
        expect.objectContaining({
          headers: {
            Authorization: "Bearer null",
            "Content-Type": "application/json",
          },
        })
      );
    });

    // Check if onClose was called
    expect(onClose).toHaveBeenCalled();

    
    
  });

  test("handles API error gracefully", async () => {
    // Mock Axios rejection
    axios.post.mockRejectedValue(new Error("Failed to create task"));

    // Mock functions
    const onClose = vi.fn();

    // Render the component
    render(
      <Router>
        <CreateTaskForm token="mockToken" onClose={onClose} />
      </Router>
    );

    // Fill out the form fields
    fireEvent.change(screen.getByPlaceholderText("Enter title"), {
      target: { value: "Test Task" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter Description"), {
      target: { value: "This is a test task description" },
    });
    fireEvent.change(screen.getByPlaceholderText("Deadline"), {
      target: { value: "2025-02-14T12:00" },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Submit"));

    // Wait for the Axios request
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
    });

    // onClose should not be called due to the error
    expect(onClose).not.toHaveBeenCalled();

    // Optionally check if an error message is displayed (implement in your component)
  });
});
