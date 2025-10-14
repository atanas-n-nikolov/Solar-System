import { useTheme } from '@/context/themeProvider';
import DarkModeIcon from '@/components/svg/DarkModeIcon';
import LightModeIcon from '@/components/svg/LightModeIcon';
import { useAuth } from '@/context/authProvider';
import { UpdateTheme } from '@/lib/auth';

export default function ThemeToggle() {
  const { theme, setTheme, darkMode } = useTheme();
  const { user } = useAuth();

  const handleToggle = async () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);

    if (user) {
      try {
        await UpdateTheme(user.id, newTheme);
      } catch (err) {
        console.error(err);
      }
    }
  };

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
        onChange={handleToggle}
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
