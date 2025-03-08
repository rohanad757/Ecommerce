import React, { useContext , useEffect } from 'react';
import '../style/Profile.css';
import AppContext from '../../Context/AppContext.jsx';

const Profile = () => {
  const { isAuthenticated , profile } = useContext(AppContext);

  useEffect(() => {
    console.log('Profile: ', profile);
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1>Profile</h1>
        {isAuthenticated ? (
          <div>
            <h2>{profile?.name}</h2>
            <h3>{profile?.email}</h3>
          </div>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </div>
  );
};

export default Profile;