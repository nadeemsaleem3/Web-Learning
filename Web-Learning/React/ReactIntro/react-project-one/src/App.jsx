import './App.css';
import Counter from './components/Counter';
import InputHandler from './components/InputHandler';
import User from './components/User';
import Logout from './components/Logout';
import Login from './components/Login';
import Greeting from './components/Greeting';
import { useState } from 'react';
import RandomNumberGenerator from './components/RandomNumberGenerator';
import MockApiComponent from './components/MockApiComponent';
import TodoApp from './components/TodoApp';
import TabSwitcher from './components/TabSwitcher';
import Stopwatch from './components/Stopwatch';
import FruitList from './components/FruitList';
import TextVisibility from './components/TextVisibility';
import FormExample from './components/FormExample';
import MouseTracker from './components/MouseTracker';
import ShoppingCart from './components/ShoppingCart';
import ItemList from './components/ItemList';
import NumberList from './components/NumberList';
import MultiStepForm from './components/MultiStepForm/MultiStepForm';
import TimeoutResetComponent from './components/TimeoutResetComponent';
import CustomHook from './components/CustomHook';
import FormWithUseReducer from './components/FormWithUseReducer';
import FocusInput from './components/FocusInput';
import ThemeSwitcher from './components/ThemeSwitcher';
import { useTheme } from './components/ThemeContext.jsx'
import UseMemoExample from './components/UseMemoExample.jsx';
import LifecycleDemo from './components/LifecycleDemo.jsx';
import UseCallbackExample from './components/UseCallbackExample.jsx';

function App() {
  // Use state with React Hooks
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { theme } = useTheme();

  // Handlers for login and logout
  function handleLoginClick() {
    setIsLoggedIn(true);
  }

  function handleLogoutClick() {
    setIsLoggedIn(false);
  }

  return (
    <div className={`app ${theme === 'dark' ? 'dark' : 'light'}`}>
      <Greeting isLoggedIn={isLoggedIn} />
      <ThemeSwitcher />

      {isLoggedIn ? (
        <div>
          <Logout onClick={handleLogoutClick} />
          <h1>Assalam O Alaikom, Duniya Walo</h1>
          <User name="Nadeem Saleem" />
          <Counter />
          <InputHandler />
          <FruitList />
          <TextVisibility />
          <RandomNumberGenerator />
          <MockApiComponent />
          <TodoApp />
          <TabSwitcher />
          <Stopwatch />
          <FormExample />
          <MouseTracker />
          <ShoppingCart />
          <ItemList />
          <NumberList />
          <MultiStepForm />
          <TimeoutResetComponent timeout={3000} initialValue="Initial State" />
          <CustomHook />
          <FormWithUseReducer />
          <FocusInput />
          <UseMemoExample />
          <LifecycleDemo />
          <UseCallbackExample />
        </div>
      ) : (
        <div>
          <Login onClick={handleLoginClick} />
        </div>
      )}
    </div>
  );
}

export default App;
