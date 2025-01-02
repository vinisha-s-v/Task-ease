// import React from "react";
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import axios from "axios";
// import MockAdapter from "axios-mock-adapter";
// import { ToastContainer } from "react-toastify";
// import { BrowserRouter as Router } from "react-router-dom";
// import Tasks from "./Tasks";

// const mockAxios = new MockAdapter(axios);

// describe("Tasks Component", () => {
//   beforeEach(() => {
//     mockAxios.reset();
//     localStorage.clear();
//     localStorage.setItem("authToken", "test-token");
//   });

//   afterEach(() => {
//     mockAxios.reset();
//     localStorage.clear();
//   });

//   test("renders the Tasks component correctly", () => {
//     render(
//       <Router>
//         <Tasks />
//       </Router>
//     );

//     expect(screen.getByText(/Your Tasks/i)).toBeInTheDocument();
//     expect(screen.getByText(/Please add your First Task!/i)).toBeInTheDocument();
//   });

//   test("fetches and displays tasks", async () => {
//     mockAxios.onGet("http://localhost:8080/api/users/tasks").reply(200, [
//       {
//         id: 1,
//         title: "Test Task",
//         description: "This is a test task",
//         scheduleTime: "2025-01-01T10:00:00",
//         deadLine: "2025-01-02T10:00:00",
//         createdAt: "2025-01-01T09:00:00",
//       },
//     ]);

//     render(
//       <Router>
//         <Tasks />
//       </Router>
//     );

//     await waitFor(() => {
//       expect(screen.getByText(/Test Task/i)).toBeInTheDocument();
//       expect(screen.getByText(/This is a test task/i)).toBeInTheDocument();
//       expect(screen.getByText(/Scheduled:/i)).toBeInTheDocument();
//       expect(screen.getByText(/Deadline:/i)).toBeInTheDocument();
//     });
//   });

//   test("deletes a task", async () => {
//     const mockTask = {
//       id: 1,
//       title: "Test Task",
//       description: "This is a test task",
//       scheduleTime: "2025-01-01T10:00:00",
//       deadLine: "2025-01-02T10:00:00",
//       createdAt: "2025-01-01T09:00:00",
//     };

//     mockAxios.onGet("http://localhost:8080/api/users/tasks").reply(200, [mockTask]);
//     mockAxios.onDelete(`http://localhost:8080/api/users/tasks/${mockTask.id}`).reply(200);

//     render(
//       <Router>
//         <Tasks />
//         <ToastContainer />
//       </Router>
//     );

//     await waitFor(() => {
//       expect(screen.getByText(/Test Task/i)).toBeInTheDocument();
//     });

//     fireEvent.click(screen.getByText(/Delete/i));

//     await waitFor(() => {
//       expect(screen.queryByText(/Test Task/i)).not.toBeInTheDocument();
//       expect(screen.getByText(/Task deleted successfully!/i)).toBeInTheDocument();
//     });
//   });

//   test("marks a task as completed", async () => {
//     const mockTask = {
//       id: 1,
//       title: "Test Task",
//       description: "This is a test task",
//       scheduleTime: "2025-01-01T10:00:00",
//       deadLine: "2025-01-02T10:00:00",
//       createdAt: "2025-01-01T09:00:00",
//     };

//     mockAxios.onGet("http://localhost:8080/api/users/tasks").reply(200, [mockTask]);
//     mockAxios.onPut(`http://localhost:8080/api/users/complete/${mockTask.id}`).reply(200);

//     render(
//       <Router>
//         <Tasks />
//         <ToastContainer />
//       </Router>
//     );

//     await waitFor(() => {
//       expect(screen.getByText(/Test Task/i)).toBeInTheDocument();
//     });

//     fireEvent.click(screen.getByText(/Mark as Completed/i));

//     await waitFor(() => {
//       expect(screen.getByText(/Task marked as completed/i)).toBeInTheDocument();
//     });
//   });

//   test("opens CreateTaskForm when add button is clicked", () => {
//     render(
//       <Router>
//         <Tasks />
//       </Router>
//     );

//     fireEvent.click(screen.getByRole("button", { name: /add/i }));
//     expect(screen.getByText(/Create Task/i)).toBeInTheDocument();
//   });

//   test("handles error when fetching tasks", async () => {
//     mockAxios.onGet("http://localhost:8080/api/users/tasks").reply(500);

//     render(
//       <Router>
//         <Tasks />
//         <ToastContainer />
//       </Router>
//     );
    

//     await waitFor(() => {
//       expect(screen.getByText(/Failed to fetch tasks/i)).toBeInTheDocument();
//     });
//   });
// });
