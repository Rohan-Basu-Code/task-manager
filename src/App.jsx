import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import AllRoutes from './AllRoutes'; 
import SideBar from './components/Sidebar';
import projectContext from './contexts/projectContext';

function App() {
  const dp = [
  {
    id: 'proj-BuildPortfolioWebsite-001',
    name: 'Build Portfolio Website',
    description: 'Create a personal portfolio to showcase work.',
    category: ['work'],
    tasks: [
      { id: 'task-001', title: 'Design layout', dueDate: '2025-05-09T12:00:00Z', status: 'todo', priority: 'high' },
      { id: 'task-002', title: 'Code homepage', dueDate: '2025-05-10T14:00:00Z', status: 'in-progress', priority: 'medium' },
    ],
  },
  {
    id: 'proj-WriteTravelBlog-002',
    name: 'Write Travel Blog',
    description: 'Document my recent trip with pictures and stories.',
    category: ['personal'],
    tasks: [
      { id: 'task-003', title: 'Sort photos', dueDate: '2025-05-08T18:00:00Z', status: 'todo', priority: 'high' },
      { id: 'task-004', title: 'Draft post', dueDate: '2025-05-12T10:00:00Z', status: 'todo', priority: 'low' },
    ],
  },
  {
    id: 'proj-SketchNewComic-003',
    name: 'Sketch New Comic',
    description: 'Create a new comic strip series.',
    category: ['hobby'],
    tasks: [
      { id: 'task-005', title: 'Character design', dueDate: '2025-05-15T20:00:00Z', status: 'done', priority: 'medium' },
      { id: 'task-006', title: 'First panel draft', dueDate: '2025-05-08T23:00:00Z', status: 'todo', priority: 'high' },
    ],
  },
  {
    id: 'proj-ResearchAI-004',
    name: 'Research AI Technologies',
    description: 'Learn about current trends and tools in AI.',
    category: ['work'],
    tasks: [
      { id: 'task-007', title: 'Read papers on AI', dueDate: '2025-05-20T09:00:00Z', status: 'todo', priority: 'medium' },
      { id: 'task-008', title: 'Experiment with TensorFlow', dueDate: '2025-05-25T14:00:00Z', status: 'todo', priority: 'high' },
    ],
  },
  {
    id: 'proj-FixLaptop-005',
    name: 'Fix Laptop',
    description: 'Repair performance and overheating issues.',
    category: ['work', 'urgent'],
    tasks: [
      { id: 'task-009', title: 'Replace thermal paste', dueDate: '2025-05-09T17:00:00Z', status: 'in-progress', priority: 'high' },
    ],
  },
  
  {
    id: 'proj-PlanAnniversary-006',
    name: 'Plan Anniversary',
    description: 'Surprise my partner on our anniversary.',
    category: ['personal', 'urgent'],
    tasks: [
      { id: 'task-010', title: 'Book restaurant', dueDate: '2025-05-10T20:00:00Z', status: 'todo', priority: 'high' },
    ],
  },
  {
    id: 'proj-OrganizeDesk-007',
    name: 'Organize Desk',
    description: 'Declutter and arrange workspace.',
    category: ['personal'],
    tasks: [
      { id: 'task-011', title: 'Sort cables', dueDate: '2025-05-12T10:00:00Z', status: 'todo', priority: 'low' },
    ],
  },
  {
    id: 'proj-WritePoem-008',
    name: 'Write Poem',
    description: 'Write a Bengali poem on rain and memory.',
    category: ['hobby'],
    tasks: [
      { id: 'task-012', title: 'First draft', dueDate: '2025-05-14T15:00:00Z', status: 'todo', priority: 'medium' },
    ],
  },
  {
    id: 'proj-UpdateResume-009',
    name: 'Update Resume',
    description: 'Refresh resume with new React projects.',
    category: ['work', 'urgent'],
    tasks: [
      { id: 'task-013', title: 'Add latest project', dueDate: '2025-05-09T16:00:00Z', status: 'todo', priority: 'high' },
    ],
  },
  {
    id: 'proj-BackupData-010',
    name: 'Backup Important Files',
    description: 'Backup to external drive and cloud.',
    category: ['personal'],
    tasks: [
      { id: 'task-014', title: 'Copy to hard drive', dueDate: '2025-05-11T12:00:00Z', status: 'todo', priority: 'medium' },
    ],
  },
  {
    id: 'proj-LearnFramerMotion-011',
    name: 'Learn Framer Motion',
    description: 'Animate React components smoothly.',
    category: ['work'],
    tasks: [
      { id: 'task-015', title: 'Follow tutorial', dueDate: '2025-05-20T11:00:00Z', status: 'todo', priority: 'low' },
    ],
  },
  {
    id: 'proj-GameNightPlan-012',
    name: 'Game Night Plan',
    description: 'Organize online gaming with friends.',
    category: ['hobby'],
    tasks: [
      { id: 'task-016', title: 'Decide games', dueDate: '2025-05-09T21:00:00Z', status: 'todo', priority: 'low' },
    ],
  },
  {
    id: 'proj-MakeYouTubeVideo-013',
    name: 'Make YouTube Video',
    description: 'Record and edit a short coding tutorial.',
    category: ['hobby', 'work'],
    tasks: [
      { id: 'task-017', title: 'Record voiceover', dueDate: '2025-05-10T13:00:00Z', status: 'todo', priority: 'medium' },
    ],
  },
  {
    id: 'proj-BuyGroceries-014',
    name: 'Buy Groceries',
    description: 'Restock fridge and pantry items.',
    category: ['personal', 'urgent'],
    tasks: [
      { id: 'task-018', title: 'Make list', dueDate: '2025-05-08T17:00:00Z', status: 'todo', priority: 'high' },
    ],
  },
];

  const [projects, setprojects] = useState(dp);

  return (
    <BrowserRouter>
      <div className="flex">
        <projectContext.Provider value={{ projects, setprojects }}>
          <SideBar />
          <AllRoutes />
        </projectContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
