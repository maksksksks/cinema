import React from 'react';
import styles from './Input.module.scss';

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    value, 
    onChange, 
    afterSlot, 
    className = '', 
    disabled, ...rest }, 
    ref
  ) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    };

    return (
      <div
        className={`
          ${styles.inputContainer}
          ${disabled ? styles.disabled : ''}
          ${className}
        `}
      >
        <input
          {...rest}
          ref={ref}
          type="text"
          value={value}
          disabled={disabled}
          onChange={handleChange}
          className={styles.inputField}
        />
        {afterSlot && (
          <div className={styles.inputAfterSlot}>
            {afterSlot}
          </div>
        )}
      </div>
    );
  }
);

export default Input;