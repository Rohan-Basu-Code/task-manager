import ProjectListContainer from "../components/ProjectListContainer";
import ProjectListHead from "../components/ProjectListHead";
import projectContext from "../contexts/projectContext"
import { useContext } from "react"
import { useParams } from "react-router-dom";

export default function Projects(){

    const { categoryName  } = useParams();
    const {projects} = useContext(projectContext);

    return(
        <main>
            <ProjectListHead category={categoryName}/>
            <ProjectListContainer type={categoryName}/>
        </main>
    )
}