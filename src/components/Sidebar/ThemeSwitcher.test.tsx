import { expect } from "vitest";
import appSlice, { setTheme } from "../../store/appSlice";

it("ThemeSwitcher", () => {
  const { theme } = appSlice(
    {
      boards: [],
      loading: true,
      sidebar: true,
      theme: false,
    },
    setTheme(true)
  );
  expect(theme).toBe(true);
});
