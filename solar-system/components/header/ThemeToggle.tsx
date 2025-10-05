import { useTheme } from '@/context/themeProvider';
import DarkModeIcon from '@/components/svg/DarkModeIcon';
import LightModeIcon from '@/components/svg/LightModeIcon';

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
        <DarkModeIcon
          className={`absolute top-0 left-0 w-full h-full transition-all duration-300 ${
            darkMode
              ? 'translate-y-full opacity-0'
              : 'translate-y-0 opacity-100'
          }`}
        />
        <LightModeIcon
          className={`absolute top-0 left-0 w-full h-full transition-all duration-300 ${
            darkMode
              ? 'translate-y-0 opacity-100'
              : '-translate-y-full opacity-0'
          }`}
        />
      </div>
    </label>
  );
}
