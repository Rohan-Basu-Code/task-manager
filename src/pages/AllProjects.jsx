import ProjectCard from "../components/ProjectCard";
import projectContext from "../contexts/projectContext"
import { useContext } from "react"

export default function AllProjects(){

    const {projects, setprojects} = useContext(projectContext);

    return(
        <main className="h-[100vh] w-full flex gap-2 pb-5 p-3 flex-wrap overflow-y-auto">
        {projects.map((project) => {
        return <div className="max-w-80 w-72 grow">
            <ProjectCard key={project.id} project={project} />
        </div>;
      })}
        </main>
    )
}