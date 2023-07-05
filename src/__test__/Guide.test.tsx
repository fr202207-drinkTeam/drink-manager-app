import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Guide from "../components/pages/Guide";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import Contact from "../components/pages/Contact";
import "@testing-library/jest-dom/extend-expect";

describe("Guide page", () => {
  it("Should render all elements correctly", () => {
    render(
      <BrowserRouter>
        <Guide />
      </BrowserRouter>
    );
    expect(screen.getAllByRole("heading")[0]).toHaveTextContent("ご利用ガイド");
  });
  it("Should link work correctly", async () => {
    render(
      <MemoryRouter initialEntries={["/home/guide"]}>
        <Routes>
          <Route path={"/home/guide"} element={<Guide />} />
          <Route path={"/home/contact"} element={<Contact />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByRole("link")).toBeTruthy();
    userEvent.click(screen.getByRole("link"));
    expect(await screen.findByTestId("contact-title")).toHaveTextContent(
      "お問い合わせ"
    );
  });
});
