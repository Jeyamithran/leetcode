# CodePractice Hub

A mobile-friendly web application for practicing coding interview problems, inspired by LeetCode.

## Features

- **Question Catalog**: Browse problems with filtering by difficulty, tags, and search.
- **Problem Details**: View problem descriptions, examples, and constraints.
- **Code Editor**: Write your own solution (auto-saved to your browser).
- **Official Solutions**: View collapsible Java solutions with time/space complexity and explanations.
- **Discussion**: Read and post comments for each question.
- **Responsive Design**: Works great on mobile and desktop.

## Tech Stack

- **Frontend**: React (Next.js App Router)
- **Backend**: Next.js API Routes
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Adding New Questions

To add more questions to the platform:

1. Open `data/questions.ts`.
2. Add a new object to the `questions` array following the `Question` interface.
   ```typescript
   {
     id: '6',
     title: 'New Problem',
     difficulty: 'Medium',
     tags: ['Array'],
     description: 'Problem description...',
     examples: [...],
     timeComplexity: 'O(n)',
     spaceComplexity: 'O(1)',
     javaSolution: 'class Solution { ... }',
     solutionExplanation: ['Step 1...', 'Step 2...']
   }
   ```

## Editing Content

- **Java Solutions**: Edit the `javaSolution` string in `data/questions.ts`.
- **Complexity Info**: Edit `timeComplexity` and `spaceComplexity` in `data/questions.ts`.
- **UI Styling**:
  - Global styles: `app/globals.css`
  - Components: `components/` directory
  - Pages: `app/page.tsx` and `app/question/[id]/page.tsx`

## Deployment

This app is ready to be deployed on Vercel or any platform that supports Next.js.
