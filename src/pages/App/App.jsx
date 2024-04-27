import { Routes, Route } from 'react-router-dom';
import AuthPage from '../AuthPage/AuthPage';
import NotesPage from '../NotesPage/NotesPage';
import { getUser, logOut } from '../../utilities/users-service';
import { useState } from 'react';

export default function App() {
  const [user, setUser] = useState(getUser());

  const handleLogout = () => {
    logOut();
    setUser(null);
  };

  return (
    <main className="App">
      {user ? (
        <>
          <button onClick={handleLogout}>Log Out</button>
          <Routes>
            <Route path="/" element={<NotesPage />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}
