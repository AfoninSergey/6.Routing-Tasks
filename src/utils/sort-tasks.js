export const sortTasks = (taskList) =>
	[...taskList].sort((a, b) =>
		a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
	);