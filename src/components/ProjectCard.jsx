import { Link } from "react-router-dom"
import projectContext from "../contexts/projectContext"
import { useContext } from "react"
import Emoji from "./Emoji";

export default function ProjectCard({project}){

    const {setprojects} = useContext(projectContext);



    const changeValue = (projectId, taskId, type) => {
    setprojects((prevProjects) =>
        prevProjects.map((oproject) =>
            oproject.id === projectId
                ? {
                    ...oproject,
                    tasks: oproject.tasks.map((otask) =>
                        otask.id === taskId
                            ? {
                                ...otask,
                                ...(type === 'priority'
                                    ? {
                                        priority:
                                            otask.priority === 'high'
                                                ? 'low'
                                                : otask.priority === 'low'
                                                ? 'medium'
                                                : 'high',
                                    }
                                    : {
                                        status:
                                            otask.status === 'todo'
                                                ? 'in-progress'
                                                : otask.status === 'in-progress'
                                                ? 'done'
                                                : otask.status,
                                    }),
                            }
                            : otask
                    ),
                }
                : oproject
        )
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
                    return <div className={`${task.status==='in-progress'&&'bg-green-500/20'} px-2 flex gap-2 text-xs py-2`}>
                            <button 
                            disabled={task.status==='done'}
                            onClick={()=>changeValue(project.id,task.id,'priority')} className={`cursor-pointer`}>
                                {task.priority==='high'?'🔴':task.priority==='medium'?'🟡':'🟢'}
                            </button>
                            
                            <p className={`${task.status === 'done'&&'line-through'}`}>{task.title}</p>

                            <p>{date.toLocaleDateString()}</p>

                            <button 
                            onClick={()=>changeValue(project.id,task.id,'status')}
                            disabled={task.status==='done'} 
                            className={`ml-auto  ${task.status === 'done' ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer'}`}>{task.status==='todo'?'Start':'Done'}</button>
                            </div>
                    
                })}
            </div>
        </div>
    )
}