import { useTheme } from '@/context/themeProvider';

export default function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <label
      htmlFor='darkmode-toggle'
      className={`size-10 relative flex items-center justify-center p-3 rounded-full cursor-pointer ${
        darkMode ? 'bg-[#FFFFFF1A]' : 'bg-[#F7F9FB]'
      }`}
    >
      <input
        type='checkbox'
        id='darkmode-toggle'
        checked={darkMode}
        onChange={toggleTheme}
        className='sr-only'
        aria-label='Toggle theme mode'
      />
      <div className='relative overflow-hidden size-4'>
        <svg
          className={`absolute top-0 left-0 w-full h-full transition-all duration-300 ${
            darkMode
              ? 'translate-y-full opacity-0'
              : 'translate-y-0 opacity-100'
          }`}
        >
          <path
            d='M7.99967 14.6667C4.32301 14.6667 1.33301 11.6767 1.33301 8.00005C1.33301 5.63338 2.60967 3.42338 4.66301 2.23338L5.55967 1.71338L5.40967 2.74005C5.35634 3.09338 5.33301 3.38671 5.33301 3.66671C5.33301 7.16005 8.17301 10 11.6663 10C12.3263 10 12.9797 9.89671 13.613 9.69338L14.5997 9.37338L14.2363 10.3434C13.263 12.93 10.7563 14.6667 7.99967 14.6667ZM4.33301 3.68671C3.07967 4.75338 2.33301 6.33005 2.33301 8.00005C2.33301 11.1234 4.87634 13.6667 7.99967 13.6667C10.003 13.6667 11.8497 12.5867 12.8597 10.9034C12.4663 10.97 12.0663 11 11.6663 11C7.62967 11 4.34301 7.72338 4.33301 3.68671Z'
            fill='#0A0909'
          />
        </svg>
        <svg
          width={16}
          height={16}
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className={`absolute top-0 left-0 w-full h-full transition-all duration-300 ${
            darkMode
              ? 'translate-y-0 opacity-100'
              : '-translate-y-full opacity-0'
          }`}
        >
          <g clipPath='url(#clip0_4430_1409)'>
            <path
              d='M8.50033 0.666666H7.50033V2.66667H8.50033V0.666666Z'
              fill='white'
            />
            <path d='M15.3337 7.5H13.3337V8.5H15.3337V7.5Z' fill='white' />
            <path d='M2.66699 7.5H0.666992V8.5H2.66699V7.5Z' fill='white' />
            <path
              d='M12.8309 2.46171L11.4167 3.87592L12.1238 4.58303L13.538 3.16882L12.8309 2.46171Z'
              fill='white'
            />
            <path
              d='M3.16716 2.45698L2.46005 3.16409L3.87427 4.5783L4.58137 3.8712L3.16716 2.45698Z'
              fill='white'
            />
            <path
              d='M3.87425 11.4217L2.46004 12.8359L3.16715 13.543L4.58136 12.1288L3.87425 11.4217Z'
              fill='white'
            />
            <path
              d='M8.00033 12.3333C5.61033 12.3333 3.66699 10.39 3.66699 8C3.66699 5.61 5.61033 3.66667 8.00033 3.66667C10.3903 3.66667 12.3337 5.61 12.3337 8C12.3337 10.39 10.3903 12.3333 8.00033 12.3333ZM8.00033 4.66667C6.16366 4.66667 4.66699 6.16333 4.66699 8C4.66699 9.83667 6.16366 11.3333 8.00033 11.3333C9.83699 11.3333 11.3337 9.83667 11.3337 8C11.3337 6.16333 9.83699 4.66667 8.00033 4.66667Z'
              fill='white'
            />
            <path
              d='M8.50033 13.3333H7.50033V15.3333H8.50033V13.3333Z'
              fill='white'
            />
            <path
              d='M12.1238 11.417L11.4167 12.1241L12.8309 13.5383L13.538 12.8312L12.1238 11.417Z'
              fill='white'
            />
          </g>
          <defs>
            <clipPath id='clip0_4430_1409'>
              <rect width={16} height={16} fill='white' />
            </clipPath>
          </defs>
        </svg>
      </div>
    </label>
  );
}
