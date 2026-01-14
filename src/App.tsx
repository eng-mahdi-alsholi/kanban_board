import { useState, useRef, useEffect } from "react";
import type { ColumnId, Columns, DraggedItem, Item } from "./utils/type";
import { COLUMN_STYLE, DEFAULT_COLUMNS, formatDate } from "./utils/data";
import Card from "./components/Card";
import Button from "./components/Button";

const STORAGE_KEY = "kanban-columns";

const App = () => {
  const [columns, setColumns] = useState<Columns>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_COLUMNS;
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [activeColumn, setActiveColumn] = useState<ColumnId>("todo");

  const [editingTask, setEditingTask] = useState<{
    columnId: ColumnId;
    taskId: string;
  } | null>(null);

  const draggedItemRef = useRef<DraggedItem | null>(null);

  /**
   * LocalStorage Sync
   */

  useEffect(() => {
    // 
    localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
  }, [columns]);

  /*
   * Add / Update Task
   */
  const handleSubmit = () => {
    if (!title.trim()) return;

    if (editingTask) {
      const { columnId, taskId } = editingTask;

      setColumns((prev) => ({
        ...prev,
        [columnId]: {
          ...prev[columnId],
          items: prev[columnId].items.map((item) =>
            item.id === taskId ? { ...item, title, description } : item
          ),
        },
      }));

      setEditingTask(null);
    } else {
      setColumns((prev) => ({
        ...prev,
        [activeColumn]: {
          ...prev[activeColumn],
          items: [
            ...prev[activeColumn].items,
            {
              id: Date.now().toString(),
              title,
              description,
              date: formatDate(),
            },
          ],
        },
      }));
    }

    setTitle("");
    setDescription("");
  };

  /*
   *  Delete
   */
  const removeTask = (columnId: ColumnId, taskId: string) => {
    setColumns((prev) => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        items: prev[columnId].items.filter((i) => i.id !== taskId),
      },
    }));
  };

  /*
   *  Edit
   */
  const editTask = (columnId: ColumnId, item: Item) => {
    setTitle(item.title);
    setDescription(item.description ?? "");
    setActiveColumn(columnId);
    setEditingTask({ columnId, taskId: item.id });
  };

  /*
   *Drag & Drop
   */
  const handleDragStart = (
    columnId: ColumnId,
    item: Item,
    e: React.DragEvent<HTMLDivElement>
  ) => {
    draggedItemRef.current = { columnId, item };
    e.currentTarget.classList.add("opacity-50");
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("opacity-50");
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetColumn: ColumnId
  ) => {
    e.preventDefault();
    const dragged = draggedItemRef.current;
    if (!dragged) return;

    const { columnId, item } = dragged;
    if (columnId === targetColumn) return;

    setColumns((prev) => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        items: prev[columnId].items.filter((i) => i.id !== item.id),
      },
      [targetColumn]: {
        ...prev[targetColumn],
        items: [...prev[targetColumn].items, item],
      },
    }));

    draggedItemRef.current = null;
  };
  /*
   * Render
   */
  return (
    <div
      className="p-6 w-full min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-800 
   flex items-center justify-center
    
    
    "
    >
      <div className="flex flex-col gap-4 w-full max-w-6xl">
        <h1 className="text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-400 to-rose-400 text-center">
          React Kanban Board
        </h1>

        {/* Add / Update Task */}
        <div className="mb-8 w-full flex max-w-lg shadow-lg rounded-lg overflow-hidden mx-auto">
          <div className="flex-grow flex flex-col">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              className="flex-grow p-3 bg-zinc-700 text-white outline-none mb-2"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description..."
              className="flex-grow p-3 bg-zinc-700 text-white outline-none"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>

          <select
            value={activeColumn}
            onChange={(e) => setActiveColumn(e.target.value as ColumnId)}
            className="p-3 bg-zinc-700 text-white border-l border-zinc-600"
          >
            {(Object.keys(columns) as ColumnId[]).map((colId) => (
              <option key={colId} value={colId}>
                {columns[colId].name}
              </option>
            ))}
          </select>

          <Button handleSubmit={handleSubmit} editingTask={editingTask} />
        </div>

        {/* Columns */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6  overflow-x-auto pb-6">
          {(Object.keys(columns) as ColumnId[]).map((columnId) => (
            <div
              key={columnId}
              className={`flex-shrink-0  w-full bg-zinc-800 rounded-lg shadow-lg border-t-4 ${COLUMN_STYLE[columnId].border}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, columnId)}
            >
              <div
                className={`p-4 text-white font-bold text-xl rounded-t-md ${COLUMN_STYLE[columnId].header}`}
              >
                {columns[columnId].name}
                <span className="ml-2 px-2 py-1 bg-zinc-800 bg-opacity-30 rounded-full text-sm">
                  {columns[columnId].items.length}
                </span>
              </div>

              <div className="p-3 min-h-64">
                {columns[columnId].items.length === 0 ? (
                  <div className="text-center py-10 text-zinc-500 italic">
                    Drop tasks here
                  </div>
                ) : (
                  columns[columnId].items.map((item) => (
                    <Card
                      item={item}
                      handleDragEnd={handleDragEnd}
                      handleDragStart={handleDragStart}
                      columnId={columnId}
                      removeTask={removeTask}
                      editTask={editTask}
                    />
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
