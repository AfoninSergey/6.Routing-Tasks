// npm run server
// npm start
import { useState, useEffect } from 'react';
import { readFetchTasks } from './api';
import { MainPage, Task } from './components';
import styles from './App.module.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { NotFoundPageError } from './components/not-found-page-error/not-found-page-error';

export const App = () => {
	const [taskList, setTaskList] = useState([]);
	const [isloading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);

	useEffect(() => {
		readFetchTasks()
			.then((loadedTodos) => setTaskList(loadedTodos))
			.catch(() => setIsError(true))
			.finally(() => setIsLoading(false));
	}, []);
	return (
		<div className={styles.app}>
			<Routes>
				<Route
					path="/"
					element={
						<MainPage
							taskList={taskList}
							setTaskList={setTaskList}
							isloading={isloading}
							isError={isError}
							setIsError={setIsError}
							isButtonDisabled={isButtonDisabled}
							setIsButtonDisabled={setIsButtonDisabled}
						/>
					}
				/>
				<Route
					path="/task/:id"
					element={
						<Task
							taskList={taskList}
							isError={isError}
							setIsError={setIsError}
							setTaskList={setTaskList}
							isloading={isloading}
							isButtonDisabled={isButtonDisabled}
							setIsButtonDisabled={setIsButtonDisabled}
						/>
					}
				/>

				<Route path="/404" element={<NotFoundPageError />} />
				<Route path="*" element={<Navigate to="/404" />} />
				<Route path="/task/*" element={<Navigate to="/404" />} />
			</Routes>
		</div>
	);
};
