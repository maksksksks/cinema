import * as React from 'react'

export type IconProps = React.SVGAttributes<SVGElement> & {
    className?: string;
    color?: 'primary' | 'secondary' | 'accent';
};

const colorMap: Record<NonNullable<IconProps['color']>, string> = {
  primary: 'var(--color-primary-text)',
  secondary: 'var($color-secondary-text)',
  accent: 'var(--button-primary-bg)',
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  children,
  className,
  color,
  width = 24,
  height = 24,
  viewBox="0 0 24 24",
  style,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={viewBox}
      className={className}
      style={{
        color: color ? colorMap[color] : undefined,
        ...style,
      }}
      {...props}
    >
      {children}
    </svg>
  )
}

export default Icon;
