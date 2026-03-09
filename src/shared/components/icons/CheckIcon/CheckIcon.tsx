import * as React from 'react'
import type { IconProps } from '../Icon';
import Icon from '../Icon';

const CheckIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path
        d="M4 11.6129L9.87755 18L20 7"
        stroke="currentColor"
        fill='none'
        strokeWidth={2}
      />
    </Icon>
  )
}


export default CheckIcon;
