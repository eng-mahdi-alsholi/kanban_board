import type { ColumnId } from "../utils/type";

type ButtonProps = {
  handleSubmit: () => void;
  editingTask: {
    columnId: ColumnId;
    taskId: string;
  } | null;
};

const Button = ({ handleSubmit, editingTask }: ButtonProps) => {
  return (
    <button
      onClick={handleSubmit}
      className="px-6  bg-gradient-to-r from-yellow-600 to-amber-500 text-white font-medium hover:from-yellow-500 hover:to-amber-400 transition"
    >
      {editingTask ? "Update" : "Add"}
    </button>
  );
};

export default Button;
