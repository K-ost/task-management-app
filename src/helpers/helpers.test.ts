import {
  AddFieldColumns,
  AddFieldSubtasks,
  getOptions,
  nameToVal,
} from "./helpers";

describe("Helpers", () => {
  it("nameToVal - turning name to value", () => {
    const value = nameToVal("Add new task");
    expect(value).toStrictEqual("add-new-task");
  });

  it("getOptions", () => {
    const result = getOptions(
      [
        {
          columns: [{ id: 1, name: "Column", tasks: [] }],
          id: 1,
          name: "Board",
          slug: "board",
        },
      ],
      1
    );
    expect(result[0]).toHaveProperty("label");
    expect(result[0]).toHaveProperty("value");
  });

  it("AddFieldColumns", () => {
    const result = AddFieldColumns([{ id: 1, name: "Column", tasks: [] }]);
    expect(result).toHaveLength(1);
    result.forEach((el) => {
      expect(el).toHaveProperty("id");
      expect(el).toHaveProperty("title");
    });
  });

  it("AddFieldSubtasks", () => {
    const result = AddFieldSubtasks([
      { isCompleted: true, title: "Subtask" },
      { isCompleted: false, title: "Subtask 2" },
    ]);
    expect(result).toHaveLength(2);
    result.forEach((el) => {
      expect(el).toHaveProperty("id");
      expect(el).toHaveProperty("title");
    });
  });
});
