import styles from './button.module.css';

export const Button = ({ className, children, ...attributes }) => (
	<button className={`${styles.button} ${styles[className]}`} {...attributes}>
		{children}
	</button>
);
