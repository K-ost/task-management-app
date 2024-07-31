import { describe, expect, it } from "vitest";
import appSlice, { setSidebar } from "../../store/appSlice";

describe("Sidebar toggling", () => {
  it("Hiding sidebar", () => {
    const sidebarVisibility = appSlice(
      { sidebar: true, loading: true, boards: [], theme: false },
      setSidebar(false)
    );
    expect(sidebarVisibility.sidebar).toBe(false);
  });

  it("Showing sidebar", () => {
    const sidebarVisibility = appSlice(
      { sidebar: false, loading: true, boards: [], theme: false },
      setSidebar(true)
    );
    expect(sidebarVisibility.sidebar).toBe(true);
  });
});
