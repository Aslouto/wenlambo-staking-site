import React from "react";
import { useNavigate } from "react-router-dom";
import ConnectButton from "../functions/ConnectButton";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js";

export default function Navbar(props) {
  const navigate = useNavigate();

  const navigateToFarm = () => {
    navigate("/farm");
  };

  const navigateHome = () => {
    navigate("/");
  };

  return (
    <div>
        <nav className="navbar navbarfont navbarglow navbar-expand-md navbar-dark bg-dark mb-4">
          <div className="container-fluid nav-container" style={{ fontFamily: "SF Pro Display" }}>
            <img alt='logo' className="nav-logo" style={{ width: "100px" }} src="lambo-logo.png" />
            <button className="navbar-toggler" 
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse" 
            aria-controls="navbarCollapse" 
            aria-expanded="false" 
            aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button> 
            
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav" style={{ fontSize: "25px" }}> 
              <li className="nav-item">
                  <a className="nav-link active" href="https://wenlambo.cash">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="https://mint.wenlambo.cash">
                    Mint
                  </a>
                </li>
                {/* <li className="nav-item">
                  <a className="nav-link active px-4" href="#" onClick={navigateToFarm}>
                    Farming
                  </a>
                </li> */}
              </ul>
            </div>
          </div>
          <ConnectButton 
          connectwallet={props.connectwallet}
          value={props.value}
          />
        </nav>
    </div>
  );
}
