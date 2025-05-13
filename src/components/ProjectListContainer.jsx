import projectContext from "../contexts/projectContext"
import { useContext } from "react"
import ProjectCard from "../components/ProjectCard";

export default function ProjectListContainer({type='all'}){

    const {projects} = useContext(projectContext);
    return(
        <div className="h-[calc(100vh-60px)] overflow-x-auto flex flex-col gap-2 pb-5 p-3 flex-wrap">
            {type==='all'?(
                projects.map((project) => {
                    return <div className="w-110 max-h-60">
                        <ProjectCard key={project.id} project={project} />
                    </div>;
                })
            ):(
                projects.filter((project) => 
                    project.category.includes(type))
                .map((project)=>
                    (<div className="w-90">
                        <ProjectCard key={project.id} project={project} />
                    </div>)
                )
            )}
                
        </div>
    )
}