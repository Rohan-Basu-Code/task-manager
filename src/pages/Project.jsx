import { useParams, Link } from "react-router-dom";
import { useState, useContext, useEffect, useRef } from "react";
import projectContext from "../contexts/projectContext";
import Emoji from "../components/Emoji";
import ChangeValue from "../components/ChangeValue";
import { FiEdit3 } from "react-icons/fi";

export default function Project() {
  const { projectID } = useParams();
  const { projects, setprojects } = useContext(projectContext);
  const project = projects.find((project) => project.id === projectID);

  const [disableEditDsc, setDisableEditDsc] = useState(true);
  const [disableEditName, setDisableEditName] = useState(true);
  const [description, setDescription] = useState("");
  const [name, setname] = useState("");
  const textareaRef = useRef(null);
  const spanRef = useRef(null);
  const nameInputRef = useRef(null);
  const [inputWidth, setInputWidth] = useState(0);

  useEffect(() => {
    if (project) {
      setDescription(project.description || "");
      setname(project.name || "");
    }
  }, [project]);

  useEffect(() => {
    if (spanRef.current) {
      setInputWidth(spanRef.current.offsetWidth + 20); // add padding
    }
  }, [name]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [description]);

  const ToggleDscEdit = () => {
    if (!disableEditDsc && project) {
      const updatedProjects = projects.map((p) =>
        p.id === projectID ? { ...p, description } : p
      );
      setprojects(updatedProjects);
    }
    const newState = !disableEditDsc;
    setDisableEditDsc(newState);

    if (newState === false) {
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 0);
    }
  };

  const ToggleNameEdit = () => {
    if (!disableEditName && project) {
      const updatedProjects = projects.map((p) =>
        p.id === projectID ? { ...p, name } : p
      );
      setprojects(updatedProjects);
    }
    const newState = !disableEditName;
    setDisableEditName(newState);

    if (newState === false) {
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 0);
    }
  };

  const updatePriorityStatus = (projectId, taskId, type) => {
    setprojects((prevProjects) =>
      ChangeValue(prevProjects, projectId, taskId, type)
    );
  };

  if (!project) {
    return <p className="text-red-500">Project not found.</p>;
  }

  return (
    <main className="pl-3 h-[100vh]">
      <div className="h-[60px] flex gap-2 items-center">
        <h1 className="text-4xl font-semibold capitalize flex gap-2 items-center">
          <Link className="duration-100 hover:underline" to="/projects/all">
            Projects /
          </Link>{" "}
          <Link
            className="duration-100 hover:underline"
            to={`/projects/${project.category[0]}`}
          >
            {project.category[0]} /
          </Link>{" "}
          <div className="relative">
            <input
              ref={nameInputRef}
              className="h-full rounded px-2 font-semibold text-4xl capitalize"
              style={{ width: `${inputWidth}px` }}
              type="text"
              disabled={disableEditName}
              value={name}
              maxLength={16}
              onChange={(e) => setname(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  ToggleNameEdit();
                }
              }}
            />
            <span
              ref={spanRef}
              className="absolute left-0 top-0 invisible whitespace-pre font-semibold text-4xl capitalize px-2"
            >
              {name}
            </span>
          </div>
          {disableEditName && (
            <button
              className="flex gap-1 text-xs rounded border border-gray-300 hover:border-gray-500 translate-y-1 px-1 cursor-pointer"
              onClick={ToggleNameEdit}
            >
              <FiEdit3 className="translate-y-[3px]" />Edit
            </button>
          )}
        </h1>
      </div>

      <div className="mb-4 mt-4">
        <p className="flex gap-2 items-start text-xl font-medium mb-1">
          Description:{" "}
          {disableEditDsc && (
            <button
              className="flex gap-1 text-xs rounded border border-gray-300 hover:border-gray-500 translate-y-1 px-1 cursor-pointer"
              onClick={ToggleDscEdit}
            >
              <FiEdit3 className="translate-y-[3px]" />Edit
            </button>
          )}
        </p>
        <textarea
          ref={textareaRef}
          className={`${
            !disableEditDsc && "border"
          } w-full resize-none rounded p-2`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={disableEditDsc}
        />
        {!disableEditDsc && (
          <button
            className="mt-1 px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
            onClick={ToggleDscEdit}
          >
            Save
          </button>
        )}
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
            className={`rounded-xl flex gap-2 items-center mb-2 ${
              task.status === "done" ? "bg-stone-100" : "bg-stone-200"
            } pl-2`}
          >
            <div
              className={`${
                task.status === "done" && "opacity-40"
              } flex gap-2 items-center`}
            >
              <button
                className="text-xs capitalize border min-w-15 rounded-md"
                onClick={() =>
                  updatePriorityStatus(projectID, task.id, "priority")
                }
                disabled={task.status === "done"}
              >
                {task.priority}
              </button>

              <p className={`${task.status === "done" && "line-through"}`}>
                Due: {formatted}
              </p>
              <p className={`${task.status === "done" && "line-through"}`}>
                {task.title}
              </p>
            </div>
            <button
              className="bg-gray-400 py-1 w-15 rounded-r-md ml-auto"
              onClick={() =>
                updatePriorityStatus(projectID, task.id, "status")
              }
            >
              {task.status === "todo"
                ? "Start"
                : task.status === "in-progress"
                ? "Done"
                : "Reset"}
            </button>
          </div>
        );
      })}
    </main>
  );
}