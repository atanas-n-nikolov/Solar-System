type ListProps = {
  bgFill?: string;
} & React.SVGProps<SVGSVGElement>;

export default function List({ bgFill, ...props }: ListProps) {
  return (
    <svg
      width={32}
      height={32}
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M18.0802 2.66666H5.3335V29.3333H26.6668V11.2533L18.0802 2.66666ZM18.6668 6.07999L23.2535 10.6667H18.6668V6.07999ZM7.3335 27.3333V4.66666H16.6668V11C16.6668 11.92 17.4135 12.6667 18.3335 12.6667H24.6668V27.3333H7.3335ZM17.3335 21.3333H10.0002V23.3333H17.3335V21.3333ZM10.0002 16.6667H22.0002V18.6667H10.0002V16.6667Z'
        fill={bgFill}
      />
    </svg>
  );
}
