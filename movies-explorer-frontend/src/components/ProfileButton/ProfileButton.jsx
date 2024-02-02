import React from 'react';
import { Link } from 'react-router-dom';

function ProfileButton() {
  
  return (
    <Link to="/profile" className="profile-button">Аккаунт
      <div className="profile-button__icon"></div>
    </Link>
  );
}

export default ProfileButton;