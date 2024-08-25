import styles from './loader.module.css';

export const Loader = ({className}) => <div className={`${styles.loader} ${styles[className]}`}></div>;
