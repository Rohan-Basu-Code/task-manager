import { Link } from "react-router-dom"
import projectContext from "../contexts/projectContext"
import { useContext } from "react"

export default function ProjectCard({project}){

    const {setprojects} = useContext(projectContext);

    const toggle = (projectId, taskId) => {
        setprojects((prevProjects) =>
            prevProjects.map((oproject) =>
            oproject.id === projectId
                ? {
                    ...oproject,
                    tasks: oproject.tasks.map((otask) =>
                    otask.id === taskId
                        ? {
                            ...otask,
                            priority:
                            otask.priority === 'high'
                                ? 'low'
                                : otask.priority === 'low'
                                ? 'medium'
                                : 'high',
                        }
                        : otask
                    ),
                }
                : oproject
            )
        );
    };

    const statusUpdate = (projectId, taskId)=>{
        setprojects((prevProjects)=>
            prevProjects.map((oProject)=>
                oProject.id===projectId
                ?{
                    ...oProject,
                    tasks:
                    oProject.tasks.map((otask)=>
                        otask.id===taskId
                    ? 
                    {
                        ...otask,
                        status:otask.status==='todo'?'in-progress':otask.status==='in-progress'&&'done'}
                    :otask
                    )
                }
                :oProject
            )
        )}

    return(
        <div className={`h-full w-full border shadow-lg bg-white px-4 py-1 pb-3  relative border-stone-200 rounded-lg`}>
            <h2 className="text-lg font-semibold">
                {project.name}{project.category.map((tag)=>{
                return <Link to={`/category/${tag}`}>{tag==='work'?'💼':(tag==='personal'?'🐼':(tag==='hobby'?'☘️':'🚨'))}</Link>
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
                    return <div className={`${task.status==='in-progress'&&'bg-green-500/20'} px-2 flex gap-2 text-xs py-2`}>
                            <button 
                            disabled={task.status==='done'}
                            onClick={()=>toggle(project.id,task.id)} className={`cursor-pointer`}>
                                {task.priority==='high'?'🔴':task.priority==='medium'?'🟡':'🟢'}
                            </button>
                            
                            <p className={`${task.status === 'done'&&'line-through'}`}>{task.title}</p>

                            <button 
                            onClick={()=>statusUpdate(project.id,task.id)}
                            disabled={task.status==='done'} 
                            className={`ml-auto  ${task.status === 'done' ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer'}`}>{task.status==='todo'?'Start':'Done'}</button>
                            </div>
                    
                })}
            </div>
        </div>
    )
}