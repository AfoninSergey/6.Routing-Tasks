import { useState } from 'react';
import {
	Loader,
	FetchError,
	TaskListEmpty,
	TaskItem,
	Controlpanel,
} from './components';
import styles from './main-page.module.css';

export const MainPage = ({
	isloading,
	isError,
	taskList,
	setIsError,
	setTaskList,
	isButtonDisabled,
	setIsButtonDisabled
}) => {
	const [sortedAndFilteredTasklist, setSortedAndFilteredTasklist] = useState([]);

	const [isFilteringEnabled, setIsFilteringEnabled] = useState(false);

	const renderContent = () => {
		if (isloading) return <Loader className="mainPage"/>;
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
