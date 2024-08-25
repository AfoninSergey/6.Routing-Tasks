export const filterTasks = (taskList, searchValue) =>
	taskList.filter((task) =>
		task.title.toLowerCase().includes(searchValue.toLowerCase()),
	);
