import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import AllRoutes from './AllRoutes'; 
import SideBar from './components/Sidebar';
import projectContext from './contexts/projectContext';

function App() {
  const dp = [
  {
    "id": "proj-BuildPortfolioWebsite-001",
    "name": "Build Portfolio Website",
    "description": "Create a personal portfolio to showcase work.",
    "category": ["work"],
    "tasks": [
      {
        "id": "task-001",
        "title": "Design layout",
        "dueDate": 1746792000,
        "status": "todo",
        "priority": "high"
      },
      {
        "id": "task-002",
        "title": "Code homepage",
        "dueDate": 1746885600,
        "status": "in-progress",
        "priority": "medium"
      }
    ]
  },
];

  const [projects, setprojects] = useState(dp);

  return (
    <BrowserRouter>
      <div className="flex relative">
        <projectContext.Provider value={{ projects, setprojects }}>
          <SideBar />
          <AllRoutes />
        </projectContext.Provider>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
