import { Link } from 'react-router-dom';
import styles from './not-found-page-error.module.css';

export const NotFoundPageError = () => {
	return (
		<>
			<img
				className={styles.notFoundError}
				src="./404Page.png"
				alt="Страница не найдена! Проверьте адрес..."
			/>
			<Link
				to="/"
				title="Назад"
				className={styles.backButton}
			>
				Назад
			</Link>
		</>
	);
};
