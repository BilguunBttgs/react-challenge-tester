import UserComponent from "@/app/components/UserComponent";
import { render, screen } from "@testing-library/react";

test("renders Hello World", () => {
  render(<UserComponent />);
  expect(screen.getByText(/hello world/i)).toBeInTheDocument();
});
