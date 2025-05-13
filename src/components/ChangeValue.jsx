export default function changeTaskValue(projects, projectId, taskId, type) {
    return projects.map((oproject) =>
        oproject.id === projectId
            ? {
                  ...oproject,
                  tasks: oproject.tasks.map((otask) =>
                      otask.id === taskId
                          ? {
                                ...otask,
                                ...(type === 'priority'
                                    ? {
                                        priority:
                                        otask.priority === 'high'
                                        ? 'low'
                                        : otask.priority === 'low'
                                        ? 'medium'
                                        : 'high',
                                      }
                                    : {
                                        status:
                                        otask.status === 'todo'
                                        ? 'in-progress'
                                        : otask.status === 'in-progress'
                                        ? 'done'
                                        : 'todo',
                                      }
                                    ),
                            }
                          : otask
                  ),
              }
            : oproject
    );
}
