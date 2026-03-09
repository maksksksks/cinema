import React, { useState, useRef, useEffect, useMemo } from 'react';
import Input from '../Input/Input';
import styles from './MultiDropdown.module.scss';
import ArrowDownIcon from '@/shared/components/icons/ArrowDownIcon';

export type Option = {
    /** Ключ варианта, используется для отправки на бек/использования в коде */
    key: string;
    /** Значение варианта, отображается пользователю */
    value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
    className?: string;
    /** Массив возможных вариантов для выбора */
    options: Option[];
    /** Текущие выбранные значения поля, может быть пустым */
    value: Option[];
    /** Callback, вызываемый при выборе варианта */
    onChange: (value: Option[]) => void;
    /** Заблокирован ли дропдаун */
    disabled?: boolean;
    /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
    getTitle: (value: Option[]) => string;
};


const MultiDropdown: React.FC<MultiDropdownProps> = ({
    className,
    options,
    value,
    onChange,
    disabled = false,
    getTitle,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const rootRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const onDocClick = (e: MouseEvent) => {
            if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
                setIsOpen(false);
                setSearch('');
            }
        };
        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
    }, []);

    const filteredOptions = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return options;
        return options.filter(o => o.value.toLowerCase().includes(q));
    }, [options, search]);

    const toggleOption = (opt: Option) => {
        const exists = value.some(v => v.key === opt.key);
        if (exists) {
            onChange(value.filter(v => v.key !== opt.key));
        } else {
            onChange([...value, opt]);
        }
    };

    const handleInputChange = (val: string) => {
        setSearch(val);
        if (!isOpen) setIsOpen(true);
    };

    const displayValue = isOpen
        ? search
        : value.length > 0
            ? getTitle(value)
            : '';

    const placeholder =
        value.length === 0 ? getTitle(value) : undefined;

    return (
        <div
            ref={rootRef}
            className={`${styles.multiDropdown} ${className ?? ''}`}
        >
            <Input
                value={displayValue}
                onChange={handleInputChange}
                placeholder={placeholder}
                disabled={disabled}
                onFocus={() => { if (!disabled) setIsOpen(true); }}
                readOnly={!isOpen}
                afterSlot={<ArrowDownIcon width={30} height={30} />}
            />

            {isOpen && !disabled && (
                <ul className={styles.options} role="listbox">
                    {filteredOptions.length === 0 ? (
                        <li className={styles.noResults}>
                            Нет вариантов
                        </li>
                    ) : (
                        filteredOptions.map(opt => {
                            const selected = value.some(v => v.key === opt.key);

                            return (
                                <li
                                    key={opt.key}
                                    role="option"
                                    aria-selected={selected}
                                    className={`${styles.option} ${selected ? styles.selected : ''
                                        }`}
                                    onClick={() => toggleOption(opt)}
                                >
                                    {opt.value}
                                </li>
                            );
                        })
                    )}
                </ul>
            )}
        </div>
    );
};

export default MultiDropdown;