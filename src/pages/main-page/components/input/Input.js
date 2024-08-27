import styles from './input.module.css';

export const Input = ({
	type = 'text',
	readOnly,
	className,
	warn,
	...attributes
}) => {
	return (
		<input
			type={type}
			readOnly={readOnly}
			className={`${styles.input} ${styles[className]} ${warn ? styles.warning : ''}`}
			{...attributes}
		/>
	);
};
