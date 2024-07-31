import appSlice, { setColumn } from "../../store/appSlice";

test("Add new column", () => {
  const { boards } = appSlice(
    {
      boards: [{ columns: [], id: 1, name: "Board 1", slug: "board-1" }],
      loading: true,
      sidebar: true,
      theme: false,
    },
    setColumn({
      boardId: 1,
      name: "New column",
    })
  );
  expect(boards[0].columns).toHaveLength(1);
});
