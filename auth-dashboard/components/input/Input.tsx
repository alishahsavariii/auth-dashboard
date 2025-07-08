import React from 'react';
import styles from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={props.id} className={styles.label}>
        {label}
      </label>
      <input className={`${styles.input} ${error ? styles.inputError : ''}`} {...props} />
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default Input;