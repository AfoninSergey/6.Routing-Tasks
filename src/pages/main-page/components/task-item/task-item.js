import { Link } from 'react-router-dom';
import styles from './task-item.module.css';

export const TaskItem = ({ id, title }) => (
	<li className={styles.taskItem}>
		<Link to={`/task/${id}`} title="Развернуть задачу">{title}</Link>
	</li>
);