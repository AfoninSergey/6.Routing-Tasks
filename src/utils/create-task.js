export const createTask = (taskList, newId, newTitle) => [
	...taskList,
	{ id: newId, title: newTitle },
];
