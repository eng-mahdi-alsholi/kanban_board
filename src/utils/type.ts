export type ColumnId = "todo" | "inProgress" | "done";

export type Item = {
  id: string;
  title: string;
  description?: string;
  date: string;
};

export type Column = {
  name: string;
  items: Item[];
};

export type Columns = Record<ColumnId, Column>;

export type DraggedItem = {
  columnId: ColumnId;
  item: Item;
};

export type TodoStyle = {
  header: string;
  border: string;
};
