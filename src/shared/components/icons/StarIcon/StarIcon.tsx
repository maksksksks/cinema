import * as React from 'react'
import type { IconProps } from '../Icon';
import Icon from '../Icon';

const StarIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path 
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
        fill="#F5C518" 
        stroke="#F5C518" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </Icon>
  )
}


export default StarIcon;
