import type { ColumnId, Columns, TodoStyle } from "./type";

export const formatDate = (date = new Date()): string => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const DEFAULT_COLUMNS: Columns = {
  todo: {
    name: "To Do",
    items: [
      { id: "1", title: "Task 1", date: formatDate() },
      { id: "2", title: "Task 2", date: formatDate() },
    ],
  },
  inProgress: {
    name: "In Progress",
    items: [{ id: "3", title: "Task 3 ", date: formatDate() }],
  },
  done: {
    name: "Done",
    items: [{ id: "4", title: "Task 4", date: formatDate() }],
  },
};

export const COLUMN_STYLE: Record<ColumnId, TodoStyle> = {
  todo: {
    header: "bg-gradient-to-r from-blue-600 to-blue-400",
    border: "border-blue-400",
  },
  inProgress: {
    header: "bg-gradient-to-r from-yellow-600 to-yellow-400",
    border: "border-yellow-400",
  },
  done: {
    header: "bg-gradient-to-r from-green-600 to-green-400",
    border: "border-green-400",
  },
};
