import { BrowserRouter, data } from 'react-router-dom';
import { useState,useEffect } from 'react';
import AllRoutes from './AllRoutes'; 
import SideBar from './components/Sidebar';
import projectContext from './contexts/projectContext';
import Emoji from './components/Emoji';
import { MdClose } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function App() {

  const [projectName, setprojectName] = useState('');
  const [projectDsc, setprojectDsc] = useState('');
  const [projectType, setprojectType] = useState('personal');


  const [taskTitle, settaskTitle] = useState('');
  const [taskDueDate, settaskDueDate] = useState('');
  const [taskPriorty, settaskPriorty] = useState('low');
  const [projectTasks,setprojectTasks] = useState([]);
  
  const [projects, setprojects] = useState(() => {
  const savedProjects = localStorage.getItem("projects");
  return JSON.parse(savedProjects);
  });

    useEffect(() => {
      localStorage.setItem("projects", JSON.stringify(projects));
    }, [projects]);

  const [showModal, setshowModal] = useState(false);

  const createTask = ()=>{
    if(taskTitle==='' || taskDueDate==='')
      return console.log('empty task');
    else
    {const newTask = {
      id: `task_${Date.now()}`,
        title: taskTitle,
        dueDate: new Date(taskDueDate).getTime(),
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
    
    console.log(newProject);
    setprojects(prev=>[...prev,newProject])
    setprojectName('')
    setprojectDsc('')
    setprojectType('personal')
      settaskTitle('')
      settaskDueDate('')
      settaskPriorty('low')
      setprojectTasks([])
      setshowModal(false)
  }

  }



  return (
    <BrowserRouter>
      <div className="flex relative">
        <projectContext.Provider value={{ projects, setprojects }}>
          <SideBar />
          <AllRoutes />
        </projectContext.Provider>



        <div 
        className={`fixed z-20 bg-black/50 top-0 left-0 right-0 bottom-0 backdrop-blur-[5px] transition-opacity duration-300
        ${showModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
          <div className={`duration-300 bg-white absolute bottom-5  top-5 right-5 rounded-lg px-5 py-3 shadow-xl 
          transform transition-transform ${showModal ? 'translate-x-0' : 'translate-x-full'}`}>
            <button className='absolute right-1 top-1 cursor-pointer text-stone-500 text-3xl z-40' onClick={()=>setshowModal(false)}><MdClose /></button>

            
            <div className='h-full overflow-y-auto '>
            
            
            <div className='flex flex-col gap-2 h-full'>
              <h2 className='text-3xl font-semibold mb-5'>New Project</h2>
              {/* type list */}
            <div className=' flex gap-2'>
              {
              [`work`,`personal`,`hobby`].map(type=>
                <>
                <label className={`${projectType===type&& 'bg-stone-300 border-stone-400'} border px-2 py-[2px] text-xs border-2 border-stone-300 rounded`} htmlFor={type}>{type} <Emoji type={type}/></label>
                <input 
                className='hidden'
                id={type}
                name='projectType'
                type='radio'
                value={type}
                checked={projectType===type}
                onClick={()=>{setprojectType(type)}}
                />
                </>
              )
            }

            </div>
            {/* Project Name */}
            <div className='bg-stone-300 rounded-lg p-1'>
              <p className=' font-semibold px-2 pb-1'>Name:(Max length 30)</p>
              <input maxLength={30} className='outline-none w-full rounded-md p-2 bg-white' type="text" value={projectName} onChange={(e)=>setprojectName(e.target.value)} />
            </div>
            {/* Project desc */}
            <div className='bg-stone-300 rounded-lg p-1 pb-0'>
              <p className=' font-semibold px-2 pb-1'>Description:</p>
              <textarea  className='outline-none w-full rounded-md p-2 bg-white' value={projectDsc} onChange={(e)=>setprojectDsc(e.target.value)}/>
            </div>
            {/* tasks */}
            <div className='bg-stone-300 rounded-lg p-1'>
              <p className='text-lg font-semibold px-2 pb-1'>Tasks:</p>
              <div>
                
              </div>
              

              <div className='bg-white rounded-t-md flex gap-5 px-5 py-2 pb-3'>
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
                    {/* <input
                      type="datetime-local"
                      step="3600" // 3600 seconds = 1 hour
                      value={taskDueDate}
                      onChange={(e) => settaskDueDate(e.target.value)}
                    /> */}
                    <DatePicker
                      selected={taskDueDate ? new Date(taskDueDate) : null}
                      onChange={(date) => {
                        // Round to nearest hour
                        date.setMinutes(0, 0, 0);
                        settaskDueDate(date.toISOString());
                      }}
                      showTimeSelect
                      timeIntervals={60}
                      dateFormat="Pp"
                      placeholderText="Select date and hour"
                    />
                  </div>
                </div>
                
                <div>
                <p className='font-semibold mb-2'>
                  Priority:<Emoji type={taskPriorty}/>
                </p>
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
              <button className='w-full bg-stone-400 rounded-b-md mb-2' onClick={()=>createTask()}>Add Task</button>

              {
                projectTasks.length>0&&(
                  <div className=' divide-y-1 divide-stone-400 bg-stone-200 rounded-md px-1 max-h-30 overflow-y-auto'>
                    {
                      projectTasks.map(task=>
                        <div className='flex gap-2 justify-between p-1'>
                          <Emoji type={task.priority}/> {task.dueDate} {task.title}
                        </div>
                      )

                    }
                  </div>
                )
              }
            
              </div>
              {/* create button */}
              <button 
              className='self-end bg-green-600 text-white px-3 py-1 rounded-md mt-auto' 
              onClick={()=>createProject()}>
                Create Project 
              </button> 
            </div>
            

            </div>
        </div>
        </div>
        
        <button className='absolute bottom-6 right-6' onClick={()=>setshowModal(true)}>Add Project</button>
        <button className='absolute bottom-12 right-6' onClick={()=>setprojects([])}>reset</button>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
