import { useState } from 'react';
import { createFetchTask } from '../../../../api';

import { createTask, sortTasks, filterTasks, debounce } from '../../../../utils';
import { Input } from '../input/Input';
import { Button } from '../../../../components';

import styles from './control-panel.module.css';

export const Controlpanel = ({
	taskList,
	setIsError,
	setTaskList,
	isButtonDisabled,
	isFilteringEnabled,
	setIsButtonDisabled,
	setIsFilteringEnabled,
	setSortedAndFilteredTasklist,
}) => {
	const [newTaskValue, setNewtaskValue] = useState('');
	const [isInputEmptyCheck, setIsInputEmptyCheck] = useState(false);
	const [filterPhrase, setFilterPhrase] = useState('');
	const [isSortingEnabled, setIsSortingEnabled] = useState(false);
	const [filteredTaskList, setFilteredTaskList] = useState([]);
	const [sortedTaskList, setSortedTaskList] = useState([]);

	const onTaskAdd = (event) => {
		event.preventDefault();

		if (newTaskValue.trim().length === 0) {
			setIsInputEmptyCheck(true);
			setNewtaskValue('')
			setTimeout(() => {
				setIsInputEmptyCheck(false);
			}, 300);
			return;
		}

		setIsButtonDisabled(true);
		createFetchTask(newTaskValue)
			.then(({ id }) => {
				const ubdatedTaskList = createTask(taskList, id, newTaskValue);
				setTaskList(ubdatedTaskList);
			})
			.catch(() => setIsError(true))
			.finally(() => {
				setIsButtonDisabled(false);
				setNewtaskValue('');
			});
	};

	const onFilterTaskList = (value) => {
		if (value.trim().length > 0) {
			setIsFilteringEnabled(true);

			const currentList =
				sortedTaskList.length !== 0 ? sortedTaskList : taskList;
			const filteredList = filterTasks(currentList, value);
			setFilteredTaskList(filteredList);
			setSortedAndFilteredTasklist(filteredList);
		} else {
			setFilteredTaskList([]);
			setSortedAndFilteredTasklist(sortedTaskList || []);
			setIsFilteringEnabled(false);
		}
	};
	const debouncedOnFilter = debounce(onFilterTaskList, 150);

	const onSorting = () => {
		setIsSortingEnabled(!isSortingEnabled);
		if (!isSortingEnabled) {
			const currentList =
				filteredTaskList.length !== 0 || isFilteringEnabled
					? filteredTaskList
					: taskList;
			const sortedList = sortTasks(currentList);
			setSortedTaskList(sortedList);
			setSortedAndFilteredTasklist(sortedList);
		} else {
			setSortedTaskList([]);
			setSortedAndFilteredTasklist(filteredTaskList || []);
		}
	};

	const onFilterPhraseChange = ({ target: { value } }) => {
		setFilterPhrase(value);
		debouncedOnFilter(value);
	};

	const onNewTaskValueChange = ({ target: { value } }) => {
		setNewtaskValue(value);
	};

	return (
		<>
			<form className={styles.newTaskForm} onSubmit={onTaskAdd}>
				<Input
					className="newTaskInput"
					warn={isInputEmptyCheck}
					placeholder="✎ Ввести новую задачу . . ."
					value={newTaskValue}
					onChange={onNewTaskValueChange}
				/>
				<Button
					className="taskAddButton"
					type="submit"
					disabled={isButtonDisabled}
				>
					Добавить
				</Button>
			</form>


			<div className={styles.sortAndSearchBlock}>
				<Button
					className="sortButton"
					type="button"
					disabled={isButtonDisabled}
					onClick={onSorting}
				>
					{!isSortingEnabled
						? 'Сортировать по алфавиту'
						: 'Отменить сортировку'}
				</Button>

				<Input
					className="searchTaskInput"
					placeholder="🔎 Поиск задач"
					value={filterPhrase}
					onChange={onFilterPhraseChange}
				/>
			</div>
		</>
	);
};
