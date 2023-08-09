import React from 'react';
import image from './404NotFound.png'

const NotFound = () => {
  return (
    <div>
      <img src={image} style={{width: '100%', height: '80%'}}></img>
    </div>
  );
};

export default NotFound;