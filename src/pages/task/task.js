import { useEffect, useState } from 'react';
import { useStore } from '../../hooks/useStore';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TextArea } from './components';
import { Button, FetchError, Loader } from '../../components';

import { updateFetchTask, deleteFetchTask } from '../../api';
import { deleteTask, updateTask } from '../../utils';

import styles from './task.module.css';

export const Task = () => {
	const [isEditing, setIsEditing] = useState(false);
	const [isTextAreaEmpty, setIsTextAreaEmpty] = useState(false);
	const [newTitle, setNewTitle] = useState('');
	const [title, setTitle] = useState('');

	const { getState, updateState } = useStore();
	const { taskList, isloading, isError, isButtonDisabled } = getState();


	const setIsError = (value) => {
		updateState('isError', value);
	};
	const setTaskList = (newValue) => {
		updateState('taskList', newValue);
	};
	const setIsButtonDisabled = (value) => {
		updateState('isButtonDisabled', value);
	};
	const setIsLoading = (newValue) => {
		updateState('isloading', newValue);
	};


	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const currentTitle = taskList?.find((task) => task.id === +id)?.title;
		setTitle(currentTitle);
		setIsLoading(false)

		if (
			!isloading &&
			!taskList.some((task) => task.id === +id) &&
			newTitle !==
				'Задача успешно удалена! Нажмите на стрелку назад в левом верхнем углу!'
		) {
			navigate('/404');
		}
	}, [id, taskList, navigate, isloading, newTitle]);

	const onTitleChange = ({ target: { value } }) => {
		setNewTitle(value);

		if (value.length === 0) {
			setIsTextAreaEmpty(true);
		} else if (value.length === 1) {
			setIsTextAreaEmpty(false);
		}
	};

	const onTaskEdit = () => {
		setIsEditing(!isEditing);
		if (!isEditing) {
			setNewTitle(title);
		}

		if (isEditing) {
			if (newTitle.trim().length === 0) {
				setTaskList(taskList);
				setIsTextAreaEmpty(false);
				setNewTitle(title);
				setTimeout(() => {
					setNewTitle('');
				}, 350);
				return;
			}

			setIsButtonDisabled(true);
			updateFetchTask(id, newTitle)
				.then(() => {
					const ubdatedTaskList = updateTask(taskList, id, newTitle);
					setTaskList(ubdatedTaskList);
					setNewTitle('');
				})
				.catch(() => setIsError(true))
				.finally(() => setIsButtonDisabled(false));
		}
	};

	const onTaskDelete = () => {
		setIsButtonDisabled(true);
		deleteFetchTask(id)
			.then(() => {
				const ubdatedTaskList = deleteTask(taskList, id);
				setTaskList(ubdatedTaskList);
				setNewTitle(
					'Задача успешно удалена! Нажмите на стрелку назад в левом верхнем углу!',
				);
			})
			.catch(() => setIsError(true));
	};

	if (isloading) return <Loader />;
	if (isError) return <FetchError />;
	return (
		<div className={styles.task}>
			<Link
				to="/"
				title="Назад"
				className={styles.backButton}
				onClick={() => setIsButtonDisabled(false)}
			>
				▼
			</Link>
			<TextArea
				className="taskText"
				isEditing={isEditing}
				readOnly={!isEditing}
				value={newTitle}
				placeholder={!isTextAreaEmpty ? title : ''}
				onChange={onTitleChange}
			/>
			<div className={styles.task_actions}>
				<Button
					className="editButton"
					type="button"
					disabled={isButtonDisabled}
					onClick={onTaskEdit}
				>
					{!isEditing ? 'Изменить' : 'Сохранить'}
				</Button>
				<Button
					className="deleteButton"
					type="button"
					disabled={isButtonDisabled}
					onClick={onTaskDelete}
				>
					Удалить
				</Button>
			</div>
		</div>
	);
};
