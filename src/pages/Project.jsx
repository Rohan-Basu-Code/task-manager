import { useParams } from "react-router-dom";
import projectContext from "../contexts/projectContext"
import { useContext } from "react"
import Emoji from "../components/Emoji";
export default function Project(){
    const { projectID } = useParams();
    const {projects} = useContext(projectContext);
    const project = projects.find(project => project.id === projectID);

    return<main className="pl-3 h-[100vh]">
        <div className="h-[60px] flex gap-2 items-center ">
            <h1 className="text-4xl font-semibold capitalize">{project.name}
            </h1>
        </div>
        
        <p className="text-xl">Description: {project.description}</p>
        <p className="text-2xl font-semibold">Tasks:</p>
        {
            project.tasks.map(task=><div>{task.priority} | {task.title} | {task.dueDate} | {task.status}</div>
            )
        }


    </main>
    
}