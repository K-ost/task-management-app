import appSlice, {
  appState,
  editBoardReducer,
  removeBoard,
  setNewBoard,
} from "../../store/appSlice";
import { BoardType } from "../../types";

type mockedStateProps = {
  boards: BoardType[];
  loading: boolean;
  sidebar: boolean;
  theme: boolean;
};

const mockedState = (props: Partial<mockedStateProps>): appState => {
  const { boards = [], loading = true, sidebar = true, theme = false } = props;
  return { boards, loading, sidebar, theme };
};

describe("Board tests", () => {
  it("Add new board", () => {
    const { boards } = appSlice(
      mockedState({}),
      setNewBoard({
        columns: [],
        name: "New board",
      })
    );
    expect(boards).toHaveLength(1);
    expect(boards[0]).toHaveProperty("name");
    expect(boards[0]).toHaveProperty("columns");
  });

  it("Add new board with columns", () => {
    const { boards } = appSlice(
      mockedState({}),
      setNewBoard({
        columns: [
          { id: 1, title: "First column" },
          { id: 2, title: "Second column" },
          { id: 3, title: "Third column" },
        ],
        name: "New board",
      })
    );
    expect(boards).toHaveLength(1);
    expect(boards[0]).toHaveProperty("name");
    expect(boards[0].columns).toHaveLength(3);
  });

  it("Editing existing board", () => {
    const { boards } = appSlice(
      mockedState({
        boards: [
          {
            columns: [],
            id: 1,
            name: "New board",
            slug: "new-board",
          },
        ],
      }),
      editBoardReducer({
        columns: [{ id: 1, title: "First column" }],
        id: 1,
        name: "Edited new board",
      })
    );
    expect(boards[0].name).toStrictEqual("Edited new board");
  });

  it("Removing existing board", () => {
    const { boards } = appSlice(
      mockedState({
        boards: [
          {
            columns: [],
            id: 1,
            name: "New board",
            slug: "new-board",
          },
          {
            columns: [],
            id: 2,
            name: "Second board",
            slug: "second-board",
          },
        ],
      }),
      removeBoard(1)
    );
    expect(boards).toHaveLength(1);
  });
});
