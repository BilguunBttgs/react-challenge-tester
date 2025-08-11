export interface Challenge {
  id: string;
  name: string;
  content: string;
  type: "file" | "folder";
  test: string;
}

export const challenges: Challenge[] = [
  {
    id: "1",
    name: "Counter.jsx",
    test: `import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Counter from './Counter';

describe('Counter component', () => {
  test('renders initial count as 0', () => {
    render(<Counter />);
    const counterText = screen.getByText(/Count: 0/i);
    expect(counterText).toBeInTheDocument();
  });

  test('renders an "Increase" button', () => {
    render(<Counter />);
    const button = screen.getByRole('button', { name: /increase/i });
    expect(button).toBeInTheDocument();
  });

  test('increments count by 1 when "Increase" button is clicked', () => {
    render(<Counter />);
    const button = screen.getByRole('button', { name: /increase/i });
    fireEvent.click(button);
    const updatedText = screen.getByText(/Count: 1/i);
    expect(updatedText).toBeInTheDocument();
  });

 
});
`,
    content: `
      // Create a button that increases a counter when clicked.
      // Counter must be start from 0
      // Increase counter by 1 when click "Increase button"

      import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}

export default Counter;`,
    type: "file",
  },
  {
    id: "2",
    name: "Todo.jsx",
    test: `// TodoApp.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoApp from "./TodoApp";

describe("TodoApp", () => {
  test("should add a new todo", () => {
    render(<TodoApp />);

    const input = screen.getByPlaceholderText(/add a todo/i);
    const addButton = screen.getByText(/add/i);

    fireEvent.change(input, { target: { value: "Learn React" } });
    fireEvent.click(addButton);

    expect(screen.getByText("Learn React")).toBeInTheDocument();
  });

  test("should toggle todo completion", () => {
    render(<TodoApp />);

    const input = screen.getByPlaceholderText(/add a todo/i);
    const addButton = screen.getByText(/add/i);

    fireEvent.change(input, { target: { value: "Learn Testing" } });
    fireEvent.click(addButton);

    const todoItem = screen.getByText("Learn Testing");
    expect(todoItem).toHaveStyle("text-decoration: none");

    fireEvent.click(todoItem);
    expect(todoItem).toHaveStyle("text-decoration: line-through");
  });

  test("should clear completed todos", () => {
    render(<TodoApp />);

    const input = screen.getByPlaceholderText(/add a todo/i);
    const addButton = screen.getByText(/add/i);

    // Add two todos
    fireEvent.change(input, { target: { value: "Task 1" } });
    fireEvent.click(addButton);

    fireEvent.change(input, { target: { value: "Task 2" } });
    fireEvent.click(addButton);

    // Mark Task 1 as completed
    fireEvent.click(screen.getByText("Task 1"));

    fireEvent.click(screen.getByText(/clear completed/i));

    expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });

  test("should show correct number of incomplete todos", () => {
    render(<TodoApp />);

    const input = screen.getByPlaceholderText(/add a todo/i);
    const addButton = screen.getByText(/add/i);

    fireEvent.change(input, { target: { value: "One" } });
    fireEvent.click(addButton);

    fireEvent.change(input, { target: { value: "Two" } });
    fireEvent.click(addButton);

    expect(screen.getByText(/todos left: 2/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText("One"));

    expect(screen.getByText(/todos left: 1/i)).toBeInTheDocument();
  });
});
`,
    content: `
    // Goal: Build a todo list where you can add tasks, mark them as complete/incomplete, and display how many are left.

    // Requirements
    // 1. Use useState to store an array of todo objects: { text: string, completed: boolean }.
    // 2. Let the user add new todos from an input field.
    // 3. Clicking a todo toggles its completion state.
    // 4. Display the number of incomplete todos at the top.
    // 5. Bonus: Clear completed todos with a button.

import React, { useState } from "react";

export default function TodoApp() {
  return (
    <div>

    </div>
  );
}
`,
    type: "file",
  },
];
