import appSlice, {
  appState,
  deleteTaskReducer,
  editTaskReducer,
  setNewTask,
} from "../../store/appSlice";
import { TaskType } from "../../types";

const generateState = (tasks: TaskType[] = []): appState => {
  return {
    boards: [
      {
        columns: [{ id: 1, name: "todo", tasks }],
        id: 1,
        name: "Board 1",
        slug: "board-1",
      },
    ],
    loading: true,
    sidebar: true,
    theme: false,
  };
};

describe("Tasks", () => {
  it("Adding new task", () => {
    const { boards } = appSlice(
      generateState(),
      setNewTask({
        boardId: 1,
        description: "",
        status: "todo",
        subtasks: [],
        title: "New task",
      })
    );
    expect(boards[0].columns[0].tasks).toHaveLength(1);
  });

  it("Editing existing task", () => {
    const { boards } = appSlice(
      generateState([
        {
          description: "",
          id: 1,
          status: "todo",
          subtasks: [],
          title: "First title",
        },
      ]),
      editTaskReducer({
        boardId: 1,
        columnId: 1,
        description: "New description",
        id: 1,
        status: "todo",
        subtasks: [{ id: 1, title: "Subtask" }],
        title: "New edited title",
      })
    );
    expect(boards[0].columns[0].tasks[0].title).toBe("New edited title");
    expect(boards[0].columns[0].tasks[0].description).toBe("New description");
    expect(boards[0].columns[0].tasks[0].subtasks).toHaveLength(1);
  });

  it("Deleting task from column", () => {
    const { boards } = appSlice(
      generateState([
        {
          description: "",
          id: 1,
          status: "todo",
          subtasks: [],
          title: "First title",
        },
      ]),
      deleteTaskReducer({ boardId: 1, columnId: 1, taskId: 1 })
    );
    expect(boards[0].columns[0].tasks).toHaveLength(0);
  });
});
