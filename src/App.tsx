import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, redirect } from 'react-router-dom';
import { io } from "socket.io-client";

import Home from './pages/home';
import Chat from './pages/chat';
import Login from './pages/login/login';

console.log('======>', localStorage.getItem('authToken'));
const socket = io('http://localhost:4000', {
  transportOptions: {
      polling: {
          extraHeaders: {
              Authorization: 'Basic ' + localStorage.getItem('authToken')
          }
      }
  }
});

function App() {
  const [username, setUsername] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  // const [msocket, setSocket] = useState(socket)
  

  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route
            path='/'
            element={
              <Home
                username={username}
                room={room}
                setRoom={setRoom}
                socket={socket}
              />
            }
          />
          <Route
            path='/login'
            element={<Login setUsername={setUsername} />}
          />
          <Route
            path='/chat'
            element={<Chat socket={socket} username={username} room={room} />}
          />
        </Routes>
      </div>
    </Router>
  );
}
export default App;