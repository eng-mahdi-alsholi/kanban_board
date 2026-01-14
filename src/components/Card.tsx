import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";

import type { Item, ColumnId } from "../utils/type";

type CardProps = {
  item: Item;
  columnId: ColumnId;

  handleDragStart: (
    columnId: ColumnId,
    item: Item,
    e: React.DragEvent<HTMLDivElement>
  ) => void;

  handleDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;

  removeTask: (columnId: ColumnId, taskId: string) => void;

  editTask: (columnId: ColumnId, item: Item) => void;
};
const Card = ({
  item,
  handleDragEnd,
  handleDragStart,
  columnId,
  removeTask,
  editTask,
}: CardProps) => {
  return (
    <div
      key={item.id}
      draggable
      onDragStart={(e) => handleDragStart(columnId, item, e)}
      onDragEnd={handleDragEnd}
      className="p-4 mb-3 bg-zinc-700 text-white rounded-lg shadow-md cursor-move flex justify-between items-center transition-shadow hover:shadow-lg"
    >
      <div>
        <span>{item.title}</span>
        {item.description && (
          <p className="text-sm text-zinc-300">{item.description}</p>
        )}
        <p className="text-sm text-zinc-300">{item.date}</p>
      </div>
      <div className="flex gap-2">
        <MdDeleteForever
          onClick={() => removeTask(columnId, item.id)}
          className="text-zinc-400 hover:text-red-400 transition w-6 h-6 flex items-center justify-center rounded-full hover:bg-zinc-600"
        />
        <CiEdit
          onClick={() => editTask(columnId, item)}
          className="text-zinc-400 hover:text-blue-400 transition w-6 h-6 flex items-center justify-center rounded-full hover:bg-zinc-600"
        />
      </div>
    </div>
  );
};

export default Card;
