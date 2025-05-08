import { NavLink } from 'react-router-dom';

const linkClass = ({ isActive }) =>
  `px-3 py-2 transition-all  
   ${isActive ? 'translate-x-1 border-l-5 border-stone-500 bg-stone-200 font-semibold' : 'border-l-4 border-transparent'}`;

export default function SideBar() {
  return (
    <aside className='min-w-50 flex flex-col py-1 mr-4 border-stone-400 max-h-[100vh] overflow-y-auto overflow-x-hidden '>
      <NavLink className={linkClass} to="/projects">📝 All Projects</NavLink>
      <NavLink className={linkClass} to="/category/personal">🐼 Personal</NavLink>
      <NavLink className={linkClass} to="/category/work">💼 Work</NavLink>
      <NavLink className={linkClass} to="/category/hobby">☘️ Hobby</NavLink>
      <NavLink className={linkClass} to="/category/urgent">🚨 Urgent</NavLink>
    </aside>
  );
}
