import { Route, Routes } from "react-router-dom"
import Projects from "./pages/Projects"
import Project from "./pages/Project"


export default function AllRoutes(){
    return(
        <Routes>
            <Route path="/projects/:categoryName" element={<Projects/>}/>
            <Route path="/project/:projectID" element={<Project/>}/>
            <Route path="*" element={<Projects />} />
        </Routes>
    )
}