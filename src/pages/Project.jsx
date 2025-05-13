import { useParams, Link } from "react-router-dom";
import { useState, useContext, useEffect, useRef } from "react";
import projectContext from "../contexts/projectContext";
import Emoji from "../components/Emoji";
import ChangeValue from "../components/ChangeValue";
import { FiEdit3 } from "react-icons/fi";

export default function Project() {
  const { projectID } = useParams();
  const { projects, setprojects } = useContext(projectContext);
  const project = projects.find(project => project.id === projectID);

  const [disableEditDsc, setDisableEditDsc] = useState(true);
  const [description, setDescription] = useState("");
  const textareaRef = useRef(null);

  // Initialize description when project is available
  useEffect(() => {
    if (project) {
      setDescription(project.description || "");
    }
  }, [project]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [description]);

  const ToggleDscEdit = () => {
    if (!disableEditDsc && project) {
      // Save updated description to context
      const updatedProjects = projects.map(p =>
        p.id === projectID ? { ...p, description } : p
      );
      setprojects(updatedProjects);
    }
    setDisableEditDsc(!disableEditDsc);
  };

  const updatePriorityStatus = (projectId, taskId, type) => {
    setprojects(prevProjects =>
      ChangeValue(prevProjects, projectId, taskId, type)
    );
  };

  if (!project) {
    return <p className="text-red-500">Project not found.</p>;
  }

  return (
    <main className="pl-3 h-[100vh]">
      <div className="h-[60px] flex gap-2 items-center">
        <h1 className="text-4xl font-semibold capitalize">
          <Link className="duration-100 hover:underline" to="/projects/all">
            Projects
          </Link>{" "}
          /{" "}
          <Link className="duration-100 hover:underline" to={`/projects/${project.category[0]}`}>
            {project.category[0]}
          </Link>{" "}
          / {project.name}
        </h1>
      </div>

      <div className="mb-4 mt-4">
        <p className="text-xl font-medium mb-1">Description: {disableEditDsc&&
            <button
            className="animate-pulse text-2xl translate-y-1 cursor-pointer" 
            onClick={()=>ToggleDscEdit()}

            >
                <FiEdit3 />
            </button>}
        </p>
        <textarea
          ref={textareaRef}
          className={`${!disableEditDsc && 'border'} w-full resize-none rounded p-2`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={disableEditDsc}
        />
        {!disableEditDsc&&<button onClick={()=>ToggleDscEdit()}>Save</button>}
      </div>

      <p className="mb-2">
        Project type: {project.category[0]} <Emoji type={project.category[0]} />
      </p>

      <p className="text-2xl font-semibold mt-4 mb-2">Tasks:</p>
      {project.tasks.map((task) => {
        const date = new Date(task.dueDate);
        const formatted = date.toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          hour12: true,
        });

        return (
          <div
            key={task.id}
            className="flex gap-2 items-center py-2 mb-1 bg-stone-200 px-2"
          >
            <button
              className="capitalize border w-20"
              onClick={() => updatePriorityStatus(projectID, task.id, "priority")}
            >
              {task.priority}
            </button>

            <p>Due: {formatted}</p>
            <p>{task.title}</p>

            {task.status !== "done" && (
              <button
                className="border w-15"
                onClick={() => updatePriorityStatus(projectID, task.id, "status")}
              >
                {task.status === "todo"
                  ? "Start"
                  : task.status === "in-progress" && "Done"}
              </button>
            )}

            {task.status === "done" && <button>Reset task</button>}
          </div>
        );
      })}
    </main>
  );
}
