import projectContext from "../contexts/projectContext"
import { useContext } from "react"
import Emoji from "./Emoji";
import { Link } from 'react-router-dom';

export default function ProjectListHead({category = 'all'}){
    const {projects} = useContext(projectContext);
    if(category==='all')
    {
        const types = ['personal', 'work', 'hobby', 'urgent'];
        return(
        
        <div className="h-[60px] pl-3 flex gap-2 items-center ">
                <p className="text-4xl font-semibold capitalize">
                     Projects  {projects.length}
                </p>
                {types.map(type=>
                    <p className="capitalize">
                        <Emoji type={type}/> {type}: {projects.filter(project => project.category.includes(type)
                        ).length}
                    </p>)}
        </div>
    )}
    else
    return(
        
        <div className="h-[60px] pl-3 flex gap-2 items-center ">
            
                <p className="text-4xl font-semibold capitalize"> 
                     <Link className='duration:100 hover:underline' to="/projects/all">Projects /</Link> <span className="capitalize">{category}</span>
                     
                        
                </p>
                <p>{projects.filter(project =>
                    project.category.includes(category)
                    ).length}</p>
        </div>
    )
}