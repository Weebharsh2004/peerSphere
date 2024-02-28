import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Auth/Register';
import Home from './components/Home';
import Login from './components/Auth/Login';
import UserProfile from './components/Auth/UserProfile';
import { useState } from 'react';
import CreatePost from './components/Posts/CreatePost';
import CommentCard from './components/Comments/AddComment';

function App() {

  const [darkTheme, setDarkTheme] = useState(true);

  const toggleTheme =()=>{
    setDarkTheme((prev)=> !prev);
  };

  return (
    <BrowserRouter>
    <div  className={`app ${darkTheme ? 'dark-theme' : 'light-theme'}`}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/create-post' element={<CreatePost/>}/>
        <Route path="/comments/:postId" element={<CommentCard />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
