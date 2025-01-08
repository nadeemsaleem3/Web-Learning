import { useTheme } from './ThemeContext';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} style={{
      padding: '10px 20px',
      margin: '10px',
      cursor: 'pointer',
      backgroundColor: theme === 'light' ? '#ddd' : '#333',
      color: theme === 'light' ? '#000' : '#fff',
      border: 'none',
      borderRadius: '5px',
    }}>
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
    </button>
  );
};

export default ThemeSwitcher;