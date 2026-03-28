# The Task Manager

Minimal Next.js app with task CRUD and drag-drop workflow.

## Setup

1. Install dependencies

```bash
npm install
```

2. Run local server

```bash
npm run dev
```

3. Visit

`http://localhost:3000`

## Local storage reset

In browser console:

```js
localStorage.removeItem('taskbuddy_tasks')
```

or full clear:

```js
localStorage.clear()
```

## What is implemented

- Next.js 15 app router (`app/`)
- global state in `app/context/TaskContext.tsx`
- persistence with `useLocalStorage`
- UI components in `components/`
- task operations: add, edit, delete, complete toggle
- filter + search
- colors + dark mode toggle
- drag-drop via native HTML5 DnD (list + board views)
- toasts with action context

## Notes

- remove mock data from `data/tasks.ts` and set initial tasks to `[]` in `TaskContext`
- keep consistent component-driven UI in `components/`
- disable heavy linting from CI if local environment gives ENOPRO in container
