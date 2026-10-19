import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle({ isDarkMode, onToggle }) {
  const label = isDarkMode ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <button
      className="adminThemeToggle"
      type="button"
      onClick={onToggle}
      aria-label={label}
      title={label}
    >
      {isDarkMode
        ? <Sun size={18} aria-hidden="true" />
        : <Moon size={18} aria-hidden="true" />}
    </button>
  );
}
