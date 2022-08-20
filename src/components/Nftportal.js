import React from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Nftportal(props) {
  return (
    <div className="row nftportal mt-3" style={{ marginRight: "0px" }}>
      <div className="col mt-4 ml-3">
        <img class='chain_logo' src="dogechain.png" width={"60%"} alt='smartbch'></img>
      </div>
      <div className="col">
        <h1 className="n2dtitlestyle mt-3">Your NFT Portal</h1>
        <Button
          onClick={props.refreshPage}
          style={{
            backgroundColor: "#000000",
            boxShadow: "1px 1px 5px #000000",
          }}
        >
          Refresh NFT Portal
        </Button>
      </div>
      <div className="col mt-3 mr-5">
        <img class='chain_logo' src="dogechain.png" width={"60%"} alt='smartbch'></img>
      </div>
    </div>
  );
}
