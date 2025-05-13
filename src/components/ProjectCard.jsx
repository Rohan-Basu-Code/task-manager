import { Link } from "react-router-dom"
import projectContext from "../contexts/projectContext"
import { useContext } from "react"
import Emoji from "./Emoji";
import ChangeValue from "./ChangeValue";
export default function ProjectCard({project}){

    const {setprojects} = useContext(projectContext);



    const updatePriorityStatus = (projectId, taskId, type) => {
        setprojects((prevProjects) =>
            ChangeValue(prevProjects, projectId, taskId, type)
        );
    };


    return(
        <div className={`h-full w-full border shadow px-4 py-1 pb-3  relative border-stone-200 rounded-lg`}>
            <h2 className="text-lg font-semibold">
                {project.name}{project.category.map((tag)=>{
                return <Link to={`/projects/${tag}`}> <Emoji type={tag}/></Link>
                })}
            </h2>
            <p className="text-xs m-2">{project.description}</p>
            <div className="flex pr-3 between w-full items-center">
                <h3 className="font-semibold">Tasks </h3>
            <div className=" ml-auto text-xs flex gap-2">
                <p>Total: <strong>{project.tasks.length}</strong></p>
                <p>completed: <strong>{project.tasks.filter((task) => task.status === 'done').length!==0?project.tasks.filter((task) => task.status === 'done').length:'None'}</strong></p>
            </div>

            </div>
            
            <div className="max-h-30 overflow-y-auto divide-y-1 divide-[#0002]  flex flex-col ">
                {project.tasks.filter((task) => task.status !== 'done').map((task)=>{
                    const date = new Date(task.dueDate);
                    const formatted = date.toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        hour12: true
                        });
                    return <div className={`${task.status==='in-progress'&&'after:absolute after:top-0 after:bottom-0 after:w-1 after:right-0 after:bg-green-500'} relative p-2 py-1 pl-1 flex gap-2 text-xs  items-center`}>
                            <button 
                            className={`shadow capitalize w-12 py-[1px] rounded-xs cursor-pointer ${
                                task.priority==='high'?
                                'bg-red-500  text-white'
                                :task.priority==='medium'?
                                'bg-yellow-500'
                                :'bg-green-500'
                            }`}
                            disabled={task.status==='done'}
                            onClick={()=>updatePriorityStatus(project.id,task.id,'priority')} >
                                {/* <Emoji type={task.priority}/> */}
                                {task.priority}
                            </button>
                            
                            <p className={`truncate w-32 ${task.status === 'done'&&'line-through'}`}>{task.title.length>25?task.title.slice(0,22):task.title}</p>

                            
                            <div className="ml-auto flex gap-3 items-center">
                                <p>{formatted}</p>
                                <button 
                                onClick={()=>updatePriorityStatus(project.id,task.id,'status')}
                                disabled={task.status==='done'} 
                                className={`border border-gray-300 w-10 bg-gray-200 py-[1px] rounded-xs ${task.status === 'done' ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer'}`}>{task.status==='todo'?'Start':'Done'}
                                </button>

                            </div>
                            
                            </div>
                    
                })}
            </div>
        </div>
    )
}