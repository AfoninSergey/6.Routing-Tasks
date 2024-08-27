import { useEffect, useState } from 'react';
const initialState = {
	taskList: [],
	isloading: true,
	isError: false,
	isButtonDisabled: false,
};

export const useStore = () => {
	const [state, setState] = useState(initialState);
	if (state.taskList.length !== 0) {
		localStorage.setItem('TaskList', JSON.stringify(state.taskList));
	}
	if (localStorage.getItem('TaskList') !== null && state.taskList.length === 0) {
		const currenTaskList = JSON.parse(localStorage.getItem('TaskList'));
		setState({ ...state, taskList: currenTaskList });
	}
	console.log(state.taskList);
	return {
		getState: () => state,
		updateState: (fieldName, newValue) => {
			setState((state) => ({ ...state, [fieldName]: newValue }));
		},
	};
};
