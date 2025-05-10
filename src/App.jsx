import { BrowserRouter, data } from 'react-router-dom';
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

  const [projectName, setprojectName] = useState('');
  const [projectDsc, setprojectDsc] = useState('');
  const [projectType, setprojectType] = useState('');


  const [taskTitle, settaskTitle] = useState('');
  const [taskDueDate, settaskDueDate] = useState('');
  const [taskPriorty, settaskPriorty] = useState('low');
  const [projectTasks,setprojectTasks] = useState([]);
  
  const [projects, setprojects] = useState(dp);


  const createTask = ()=>{
    if(taskTitle==='' || taskDueDate==='')
      return console.log('empty task');
    else
    {const newTask = {
      id: `task_${Date.now()}`,
        title: taskTitle,
        dueDate: new Date(taskDueDate).getTime() / 1000,
        status: "todo",
        priority: taskPriorty
      }
      setprojectTasks(prev=>[...prev,newTask]);
      settaskTitle('')
      settaskDueDate('')
      settaskPriorty('low')
    }
  }

  const createProject = ()=>{
    if(projectName==='' || projectDsc=== '' ||projectType=== ''|| projectTasks.length<1)
      console.log(`empty`);
    else
    {const newProject = {
      id: `${projectName.trim().split(/\s+/).map(word => word[0]).join('').toLowerCase()}_${Date.now()}`,
      name: projectName,
      description: projectDsc,
      category: [projectType],
      tasks: projectTasks
    }
    setprojectName('')
    setprojectDsc('')
    setprojectType('')
      settaskTitle('')
      settaskDueDate('')
      settaskPriorty('low')
      setprojectTasks([])
    console.log(newProject);
    setprojects(prev=>[...prev,newProject])
  }

  }



  return (
    <BrowserRouter>
      <div className="flex relative">
        <projectContext.Provider value={{ projects, setprojects }}>
          <SideBar />
          <AllRoutes />
        </projectContext.Provider>
        <div>
          name:<input className='border-b' type="text" value={projectName} onChange={(e)=>setprojectName(e.target.value)} /><br />
          dsc:<textarea  className='border-b' value={projectDsc} onChange={(e)=>setprojectDsc(e.target.value)}/><br/>
          type: <br />
          {
            [`work`,`personal`,`hobby`].map(type=>
              <div>
              <label htmlFor={type}>{type}</label>
              <input 
              id={type}
              name='projectType'
              type='radio'
              value={type}
              checked={projectType===type}
              onClick={()=>{setprojectType(type)}}
              />
              </div>
            )
          }
          <div className=''>
            <p className='text-lg font-semibold'>Tasks:</p>
            {
              projectTasks.length>0&&(
                <div>
                  {
                    projectTasks.map(task=>
                      <div className='flex'>
                        {task.priority} {task.dueDate} {task.title}
                      </div>
                    )

                  }
                </div>
              )
            }

             <div className='rounded-lg flex gap-5 border-2 border-stone-300 px-5 py-2 pb-3'>
              <div className='flex flex-col justify-between'>
                <div>
                  <span className='font-semibold mr-2'>Title:</span>
                  <input 
                  className='border-b-2 border-stone-400 w-full' 
                  type="text"
                  value={taskTitle}
                  onChange={(e) => settaskTitle(e.target.value)}
                  />
                </div>           
                <div>
                  <span className='font-semibold mr-2'>Due:</span>
                  <input className='border-b-2 border-stone-400' type="datetime-local" value={taskDueDate} onChange={(e)=>settaskDueDate(e.target.value)} name="" />
                </div>
              </div>
              
              <div>
              <p className='font-semibold mb-2'>Priority:{taskPriorty==='high'?'🔴':taskPriorty==='low'?'🟢':'🟡'}</p>
              <div className='flex flex-col gap-2'>
                {
                ['high','medium', 'low'].map(priority=>
                  <div className='h-4'>
                    <input
                    className='hidden'
                    type="radio" 
                    name='taskPriorty' 
                    id={priority}
                    value={priority}
                    onClick={()=>settaskPriorty(priority)}
                    checked={taskPriorty===priority}
                    />
                    <label className={` border-2  duration-100 text-xs block text-center py-[2px] cursor-pointer capitalize rounded ${taskPriorty===priority ? ' bg-stone-200 font-semibold border-stone-300':'border-white'}`} htmlFor={priority}>{priority} </label>
                  </div>
                )
              }
              </div>
              
              </div>
      
             </div>
             <button onClick={()=>createTask()}>Add Task</button>
          
          </div>
          
          <button className='border px-2 bg-red-300' onClick={()=>createProject()}>Create Project</button>
        </div>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
