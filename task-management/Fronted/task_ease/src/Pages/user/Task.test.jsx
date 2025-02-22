import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Tasks from "./Tasks";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { ToastContainer } from "react-toastify";
import '@testing-library/jest-dom'; // Include Jest DOM utilities
import { vi } from "vitest";


// Mock axios
const mock = new MockAdapter(axios);


describe("Tasks Component", () => {
  beforeEach(() => {
    localStorage.setItem("authToken", "test-token");
    mock.reset();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test("renders the Tasks component with no tasks initially", async () => {
    mock.onGet("http://localhost:8080/api/users/tasks/user-tasks").reply(200, []);

    render(
      <Router>
        <Tasks />
      </Router>
    );

    expect(screen.getByText("Your Tasks")).toBeInTheDocument();
    expect(await screen.findByText("Please add your First Task!")).toBeInTheDocument();
  });

  test("renders tasks from API and displays them", async () => {
    const tasks = [
      {
        id: 1,
        title: "Test Task 1",
        description: "This is a test task",
        scheduleTime: new Date().toISOString(),
        deadLine: new Date().toISOString(),
        completed: false,
      },
      {
        id: 2,
        title: "Test Task 2",
        description: "Another test task",
        scheduleTime: new Date().toISOString(),
        deadLine: new Date().toISOString(),
        completed: false,
      },
    ];

    mock.onGet("http://localhost:8080/api/users/tasks/user-tasks").reply(200, tasks);

    render(
      <Router>
        <Tasks />
        <ToastContainer />
      </Router>
    );

    expect(await screen.findByText("Test Task 1")).toBeInTheDocument();
    expect(await screen.findByText("Test Task 2")).toBeInTheDocument();
  });

  });
