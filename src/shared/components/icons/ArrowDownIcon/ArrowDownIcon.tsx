import * as React from 'react'
import type { IconProps } from '../Icon';
import Icon from '../Icon';

const ArrowDownIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M2.33569 8.74741L3.66442 7.25259L12.0001 14.662L20.3357 7.25259L21.6644 8.74741L12.0001 17.338L2.33569 8.74741Z" 
        fill="#B3B3B3"
      />
    </Icon>
  )
}


export default ArrowDownIcon;
