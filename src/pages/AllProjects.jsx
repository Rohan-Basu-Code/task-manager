import ProjectCard from "../components/ProjectCard";
import projectContext from "../contexts/projectContext"
import { useContext } from "react"

export default function AllProjects(){

    const {projects, setprojects} = useContext(projectContext);

    return(
        <main className="h-full w-full flex gap-2 p-3 flex-wrap">
        {projects.map((project) => {
        return <div className="max-w-80 w-72 grow">
            <ProjectCard key={project.id} project={project} />
        </div>;
      })}
        </main>
    )
}