# BST Academy

BST Academy is an interactive learning app for understanding trees and binary search trees (BSTs). Learners work through short lessons with visual diagrams, answer checkpoint questions and quizzes, earn achievements, and track their progress over time.

## Features

- **Dashboard** with a "continue learning" card, overall stats, and a card for each topic.
- **Lessons** organized by topic, with sections, highlighted key terms, embedded videos, and tree diagrams that illustrate each idea.
- **Checkpoint questions and quizzes** that score answers and reward points.
- **Achievements** such as Tree Explorer (complete Understanding Trees), Node Navigator (complete Understanding Nodes), and Perfect Score (score 100% on a quiz).
- **Glossary** of key terms used throughout the lessons.
- **Progress page** with per-topic status and a learning streak.
- **Settings** for accessibility options, including text-to-speech playback of lesson content.

## Topics

1. **Understanding Trees** - what trees are, everyday examples, and how nodes connect to form a hierarchy.
2. **Understanding Nodes** - what a node holds, how parents and children relate, and how a binary search tree orders its values.

A "BST Playground" is listed in the navigation as coming soon.

## Tech stack

- [Next.js](https://nextjs.org/) 13 (App Router) with React 18 and TypeScript
- [MUI](https://mui.com/) (Material UI) for components and icons
- Emotion for styling
- Browser `localStorage` for saving learner progress
- Browser speech synthesis for read-aloud features

## Getting started

Requirements: Node.js 18 or newer and npm.

```bash
npm install
npm run dev        # start the development server
```

Other scripts:

| Command | What it does |
| --- | --- |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run the linter |
| `npm run typecheck` | Check TypeScript types without emitting files |

## How progress is saved

Learner progress (points, topic status, achievements, and streak) is stored in the browser's local storage under a versioned key. Progress stays on the device and browser where it was made; clearing site data resets it.

## Adding content

- **New lessons** are written as data in `data/curriculum/lessons/`, then registered in `data/curriculum/topics.ts`.
- **Glossary terms** live in `data/curriculum/glossary.ts`.
- **Achievements** are defined in `lib/learning/achievements.ts`.
