import { useRef } from 'react';
import styles from './text-area.module.css';

export const TextArea = ({ className, isEditing, readOnly, ...attributes }) => {
	const textAreaRef = useRef(null);
	if (!readOnly && textAreaRef.current && isEditing) textAreaRef.current.focus();

	return (
		<textarea ref={textAreaRef} className={styles[className]} {...attributes} />
	);
};
