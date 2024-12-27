import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCredentialResponse,
    });
    window.google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      { theme: 'outline', size: 'large' }
    );
  }, []);

  const handleCredentialResponse = (response) => {
    const userObject = jwtDecode(response.credential);
    setUser(userObject);
  };

  const handleSignout = () => {
    setUser(null);
  };

  return (
    <div className="App">
      <h1>Google OAuth Login</h1>
      {user ? (
        <div>
          <p>こんにちは、{user.name}さん</p>
          <button onClick={handleSignout}>ログアウト</button>
        </div>
      ) : (
        <div id="signInDiv"></div>
      )}
    </div>
  );
}

export default App;