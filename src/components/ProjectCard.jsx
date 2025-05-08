export default function ProjectCard({project}){
    return(
        <div className="w-full border shadow px-4 py-1 border-stone-400 relative">
        project card {project.name}
        <p>{project.id}</p>
        <div className="absolute bottom-3 right-3 flex">
            {project.category.map((tag)=>{
                return <p>{tag==='work'?'💼':(tag==='personal'?'🐼':(tag==='hobby'?'☘️':'🚨'))}</p>
            })}
        </div>
        </div>
    )
}