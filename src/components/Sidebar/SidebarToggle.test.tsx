import { expect } from "vitest";
import appSlice, { setSidebar } from "../../store/appSlice";

describe("Sidebar toggling", () => {
  it("Hiding sidebar", () => {
    const { sidebar } = appSlice(
      { sidebar: true, loading: true, boards: [], theme: false },
      setSidebar(false)
    );
    expect(sidebar).toBe(false);
  });

  it("Showing sidebar", () => {
    const { sidebar } = appSlice(
      { sidebar: false, loading: true, boards: [], theme: false },
      setSidebar(true)
    );
    expect(sidebar).toBe(true);
  });
});
