**React Kanban Board**
A simple Kanban board built with React, TypeScript, and Tailwind CSS.
It supports creating, editing, deleting, and dragging tasks between columns, with persistence via **localStorage**.

**Setup Steps**

Clone the repository
git clone <https://github.com/eng-mahdi-alsholi/kanban_board>
cd <KANBAN>

**Install dependencies**
`npm install
Run the development server
npm run dev
`
Open in browser
http://localhost:5173

Technical Decisions
State Management

Used React hooks (useState, useRef, useEffect) instead of external state libraries to keep the app lightweight.

Modeled edit state as:
{ columnId, taskId } | null

instead of a boolean to preserve task identity and avoid lossy state.

Drag & Drop

Implemented using the native HTML Drag and Drop API.

Stored the dragged item in useRef to avoid unnecessary re-renders and ensure smooth dragging.

Persistence

Used localStorage as a persistence layer.

State is loaded once via a lazy initializer and synced on every update using useEffect.

React state remains the single source of truth.

TypeScript

Strong typing for tasks, columns, and handlers to prevent runtime errors.

Shared domain types (Item, ColumnId, Columns) across components.

Styling

Used Tailwind CSS for fast iteration and consistent styling.

Kept UI and logic strictly separated.

What I’d Improve With More Time

Add keyboard accessibility for drag-and-drop.

Improve drag feedback (placeholder positioning, smoother animations).

Add task ordering within columns.

Introduce undo / redo support.

Add tests (unit tests for reducers, integration tests for drag behavior).

Consider React DnD or @dnd-kit for more advanced drag interactions.

Notes
This project intentionally avoids unnecessary libraries to keep the focus on:

clean state modeling

correctness

maintainability

clear separation of concerns
