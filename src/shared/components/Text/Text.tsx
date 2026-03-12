import * as React from 'react';
import cx from 'classnames';
import styles from './Text.module.scss';

export type TextProps = {
  className?: string;
  'data-testid'?: string;
  view?: 'title' | 'button' | 'p-32' | 'p-24' | 'p-20' | 'p-20-mono' | 'p-18' | 'p-16' | 'p-14';
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  weight?: 'normal' | 'medium' | 'bold';
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'accent' | 'red';
  maxLines?: number;
};

const Text: React.FC<TextProps> = ({
  tag = 'p',
  className,
  'data-testid': testId,
  view = 'p-14',
  weight = 'normal',
  children,
  color = 'primary',
  maxLines,
}) => {
  const Tag = tag as keyof React.JSX.IntrinsicElements;

  const rootClassName = cx(
    styles.text,
    styles[`view-${view}`],
    styles[`weight-${weight}`],
    view !== 'button' && styles[`color-${color}`],
    maxLines && maxLines > 0 && styles.clamp,
    maxLines && maxLines > 0 && maxLines <= 10 && styles[`clamp-${maxLines}`],
    className
  );

  return (
    <Tag className={rootClassName} data-testid={testId}>
      {children}
    </Tag>
  );
};

export default Text;
