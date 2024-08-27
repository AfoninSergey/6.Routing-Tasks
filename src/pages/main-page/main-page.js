import { useState, useEffect } from 'react';
import { useStore } from '../../hooks/useStore';
import { Loader, FetchError } from '../../components';
import { Controlpanel, TaskListEmpty, TaskItem } from './components';
import { readFetchTasks } from '../../api';

import styles from './main-page.module.css';

export const MainPage = () => {
	const [sortedAndFilteredTasklist, setSortedAndFilteredTasklist] = useState([]);
	const [isFilteringEnabled, setIsFilteringEnabled] = useState(false);

	const { getState, updateState } = useStore();
	const { taskList, isloading, isError, isButtonDisabled } = getState();

	const setTaskList = (newValue) => {
		updateState('taskList', newValue);
	};
	const setIsLoading = (newValue) => {
		updateState('isloading', newValue);
	};
	const setIsError = (newValue) => {
		updateState('setIsError', newValue);
	};
	const setIsButtonDisabled = (newValue) => {
		updateState('isButtonDisabled', newValue);
	};

	useEffect(() => {
		readFetchTasks()
			.then((loadedTasks) => setTaskList(loadedTasks))
			.catch(() => setIsError(true))
			.finally(() => setIsLoading(false));
	}, []);

	const renderContent = () => {
		if (isloading) return <Loader className="mainPage" />;
		if (isError) return <FetchError />;
		if (
			taskList.length === 0 ||
			(sortedAndFilteredTasklist.length === 0 && isFilteringEnabled)
		)
			return <TaskListEmpty />;

		return (
			<ul className={styles.tasksList}>
				{(sortedAndFilteredTasklist.length !== 0 || isFilteringEnabled
					? sortedAndFilteredTasklist
					: taskList
				).map(({ id, title }) => (
					<TaskItem key={id} id={id} title={title} />
				))}
			</ul>
		);
	};

	return (
		<>
			<header>
				<h1>Список задач</h1>
				<Controlpanel
					taskList={taskList}
					setIsError={setIsError}
					setTaskList={setTaskList}
					isButtonDisabled={isButtonDisabled}
					isFilteringEnabled={isFilteringEnabled}
					setIsButtonDisabled={setIsButtonDisabled}
					setIsFilteringEnabled={setIsFilteringEnabled}
					setSortedAndFilteredTasklist={setSortedAndFilteredTasklist}
				/>
			</header>

			<main>
				<h2>Задачи:</h2>
				{renderContent()}
			</main>
		</>
	);
};
