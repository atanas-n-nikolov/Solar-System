export default function Calendar(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M18.25 3H17.5V2H16V3H8V2H6.5V3H5.75C4.235 3 3 4.235 3 5.75V18.25C3 19.765 4.235 21 5.75 21H18.25C19.765 21 21 19.765 21 18.25V5.75C21 4.235 19.765 3 18.25 3ZM5.75 4.5H6.5V6H8V4.5H16V6H17.5V4.5H18.25C18.94 4.5 19.5 5.06 19.5 5.75V7.5H4.5V5.75C4.5 5.06 5.06 4.5 5.75 4.5ZM18.25 19.5H5.75C5.06 19.5 4.5 18.94 4.5 18.25V9H19.5V18.25C19.5 18.94 18.94 19.5 18.25 19.5ZM7 10.995V12.995H9V10.995H7ZM11 10.995H13V12.995H11V10.995ZM15 10.995V12.995H17V10.995H15ZM7 16.995V14.995H9V16.995H7ZM13 14.995H11V16.995H13V14.995ZM15 16.995V14.995H17V16.995H15Z'
        fill='url(#paint0_linear_4375_2921)'
      />
      <defs>
        <linearGradient
          id='paint0_linear_4375_2921'
          x1={3}
          y1={11.5}
          x2={21}
          y2={11.5}
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#FF5F68' />
          <stop offset={1} stopColor='#AE4BCE' />
        </linearGradient>
      </defs>
    </svg>
  );
}
