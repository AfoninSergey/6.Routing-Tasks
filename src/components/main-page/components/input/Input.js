// import { useRef } from 'react';
import styles from './input.module.css';

export const Input = ({
	type = 'text',
	readOnly,
	// isEditing,
	className,
	warn,
	...attributes
}) => {
	// const inputFef = useRef(null);

	// if (!readOnly && inputFef.current && isEditing) inputFef.current.focus();

	return (
		<input
			// ref={inputFef}
			type={type}
			readOnly={readOnly}
			className={`${styles.input} ${styles[className]} ${warn ? styles.warning : ''}`}
			{...attributes}
		/>
	);
};
