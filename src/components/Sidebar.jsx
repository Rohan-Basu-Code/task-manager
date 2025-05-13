import { NavLink } from 'react-router-dom';
import projectContext from "../contexts/projectContext"
import { useContext } from "react"
import Emoji from './Emoji';

const linkClass = ({ isActive }) =>
  `px-3 py-2 transition-all  
   ${isActive ? 'translate-x-1 border-l-5 border-stone-500 bg-stone-200 font-semibold' : 'border-l-4 border-transparent'}`;

export default function SideBar() {
  const types = ['personal', 'work', 'hobby', 'urgent'];
  const {projects} = useContext(projectContext);
  return (
    <aside className='min-w-50 flex flex-col py-1 mr-4 border-stone-400 max-h-[100vh] overflow-y-auto overflow-x-hidden '>
      <NavLink className={linkClass} to="/projects/all">📝 All Projects</NavLink>
      {types
        .filter(type => projects.some(project => project.category.includes(type)))
        .map(type => (
          <NavLink key={type} className={linkClass} to={`/projects/${type}`}>
            <Emoji type={type} /> {type.charAt(0).toUpperCase() + type.slice(1)}
          </NavLink>
        ))}
        Projects:
         {
          projects.map(project=>(
            <NavLink  className={linkClass} to={`/project/${project.id}`}>{project.name.slice(0,12)}</NavLink>
          ))
         }
    </aside>
  );
}
