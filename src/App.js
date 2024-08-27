// npm run server
// npm start
import { Navigate, Route, Routes } from 'react-router-dom';
import { MainPage, Task, NotFoundPageError } from './pages';
import styles from './App.module.css';

export const App = () => {
	return (
		<div className={styles.app}>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/task/:id" element={<Task />} />
				<Route path="/404" element={<NotFoundPageError />} />
				<Route path="*" element={<Navigate to="/404" />} />
				<Route path="/task/*" element={<Navigate to="/404" />} />
			</Routes>
		</div>
	);
};
