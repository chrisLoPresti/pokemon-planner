import React from 'react';
import LoadingImage from '../../assets/images/misc/loadingPage.gif';
import Img from 'react-image';
import './LoadingSite.css';

const LoadingSite = () => {
  return (
    <div className="loading-container">
      <Img className="image" src={LoadingImage} alt="loading content" />
      <p className="loading-message">Loading ...</p>
    </div>
  );
};

export default LoadingSite;
