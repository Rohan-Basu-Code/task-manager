import { Route, Routes } from "react-router-dom"
import AllProjects from "./pages/AllProjects"
import ProjectCategory from "./pages/ProjectCategory"
import Project from "./pages/Project"


export default function AllRoutes(){
    return(
        <Routes>
            <Route path="/projects" element={<AllProjects/>}/>
            <Route path="/category/:categoryName" element={<ProjectCategory/>}/>
            <Route path="/project/:projectID" element={<Project/>}/>
            <Route path="*" element={<AllProjects />} />
        </Routes>
    )
}