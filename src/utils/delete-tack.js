export const deleteTask = (taskList, currentId) =>
	taskList.filter(({ id }) => id !== +currentId);
