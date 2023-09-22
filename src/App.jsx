import './App.css';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import Blog from './components/Blog';
import { useSelector } from 'react-redux';
import { selectSignedIn } from './slice/UserSlice';

function App() {
    const isSelectIn = useSelector(selectSignedIn);
  return (
    <>
     {isSelectIn && <NavBar />}
     <HomePage />
     {isSelectIn && <Blog />}
    </>
  )
}

export default App
