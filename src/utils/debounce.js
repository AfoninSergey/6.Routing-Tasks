export const debounce = (fn, deley) => {
	let timerId;
	return (...args) => {
		clearTimeout(timerId);
		timerId = setTimeout(fn, deley, ...args);
	};
};
