export default function Checkmark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={17}
      height={16}
      viewBox='0 0 17 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M6.333 12.193a.83.83 0 0 1-.59-.243l-3.097-3.1.707-.707 2.98 2.98 7.313-7.313.707.707-7.43 7.43a.83.83 0 0 1-.59.243z'
        fill='url(#a)'
      />
      <defs>
        <linearGradient
          id='a'
          x1={2.646}
          y1={8.002}
          x2={14.353}
          y2={8.002}
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#FF5F68' />
          <stop offset={1} stopColor='#AE4BCE' />
        </linearGradient>
      </defs>
    </svg>
  );
}
