import React from "react";
import LoadingImage from "../../assets/images/misc/loadingPage.gif";
import "./LoadingSite.css";

const LoadingSite = () => {
  return (
    <div className="loading-container">
      <img className="image" src={LoadingImage} alt="loading content" />
      <p className="loading-message">Loading ...</p>
    </div>
  );
};

export default LoadingSite;
