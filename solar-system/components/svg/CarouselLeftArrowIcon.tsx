import React from 'react';

interface CarouselArrowIconProps extends React.SVGProps<SVGSVGElement> {
  pathFill?: string;
}

export default function CarouselLeftArrowIcon({
  pathFill,
  ...props
}: CarouselArrowIconProps) {
  return (
    <svg
      width={16}
      height={16}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M9.48012 12.52L5.55012 8.59001C5.22678 8.26668 5.22678 7.73668 5.55012 7.41001L9.48012 3.48001L10.1868 4.18668L6.37345 8.00001L10.1868 11.8133L9.48012 12.52Z'
        fill={pathFill || 'currentColor'}
      />
    </svg>
  );
}
