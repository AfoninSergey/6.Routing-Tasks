export const updateTask = (taskList, currentId, newTitle) =>
	taskList.map((task) =>
		task.id === +currentId ? { ...task, title: newTitle } : task,
	);
