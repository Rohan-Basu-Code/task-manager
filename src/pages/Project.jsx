import { useParams } from "react-router-dom";
import projectContext from "../contexts/projectContext"
import { useContext } from "react"
import Emoji from "../components/Emoji";
import ChangeValue from "../components/ChangeValue" 
import { Link } from 'react-router-dom';

export default function Project(){
    const { projectID } = useParams();
    const {projects, setprojects} = useContext(projectContext);
    const project = projects.find(project => project.id === projectID);

    const updatePriorityStatus = (projectId, taskId, type) => {
        setprojects((prevProjects) =>
            ChangeValue(prevProjects, projectId, taskId, type)
        );
    };



    return<main className="pl-3 h-[100vh]">
        <div className="h-[60px] flex gap-2 items-center ">
            <h1 className="text-4xl font-semibold capitalize"> 
                     <Link className='duration:100 hover:underline' to="/projects/all">Projects</Link> / <Link className='duration:100 hover:underline' to={`/projects/${project.category[0]}`}>{project.category[0]}</Link> / {project.name}
            </h1>
        </div>
        
        <p className="text-xl">Description: {project.description}</p>
        <p>Project type:{project.category[0]} <Emoji type={project.category[0]}/></p>
        <p className="text-2xl font-semibold">Tasks:</p>
        {
            project.tasks.map(task=>
                (<div>
                    <button onClick={()=>updatePriorityStatus(projectID, task.id, 'priority')}>{task.priority}</button> | {task.title} | {task.dueDate} | <button onClick={()=>updatePriorityStatus(projectID, task.id, 'status')}>{task.status}</button> <button>Reset task</button>
                </div>)
            )
        }


    </main>
    
}