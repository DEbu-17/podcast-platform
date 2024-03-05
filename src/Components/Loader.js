import React from 'react'
import "../Css files/loader.css"
function Loader() {
  return (
    <div className="wrapper">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loader;