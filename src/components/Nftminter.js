import React from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { verify, enable, rewardinfo } from '../functions/ConnectButton';

export default function Nftminter(props) {


  return (
    <div className="container container-style">
      <div className="col">
        <form className="nftminter">
          <div className="row pt-3">
            <div>
              <h1 className="pt-2" style={{ fontWeight: "30" }}>
                Stake and Unstake
              </h1>
            </div>
          </div>
          <h6 style={{ fontWeight: "300" }}>First time staking?</h6>
          <Button
            className="btn authorize"
            onClick={enable}
            style={{
              backgroundColor: "#ffffff10",
              boxShadow: "1px 1px 5px #000000",
              marginBottom: "20px",
            }}
          >
            Authorize Your Wallet
          </Button>
          <div>
            <label style={{ fontWeight: "300", fontSize: "18px" }}>
              Vault Options
            </label>
          </div>
          <p>Input your NFTs #ID sepparated by a comma (Like this 12,13,14).</p>
          <p>If you don't own the NFT, the transaction will fail.</p>
          <div className="stkunstk-btn-input">
            <Button
              onClick={props.stakeInput}
              style={{
                margin: "10px 5px",
                width: "25%",
                backgroundColor: "#ffffff10",
                boxShadow: "1px 1px 5px #000000",
              }}
              value="stake"
            >
              Stake
            </Button>
            <input
              id="stake-input"
              placeholder="Input your NFTs #ID"
              style={{
                borderColor: "black",
                color: "white",
                width: "70%",
                backgroundColor: "#ffffff10",
                boxShadow: "1px 1px 5px #00000",
                padding: "3px",
              }}
            />
            <Button
              onClick={props.unstakeInput}
              style={{
                margin: "10px 5px",
                width: "25%",
                backgroundColor: "#ffffff10",
                boxShadow: "1px 1px 5px #000000",
              }}
              value="unstake"
            >
              Unstake
            </Button>
            <input
              id="unstake-input"
              placeholder="Input your NFTs #ID"
              style={{
                borderColor: "black",
                color: "white",
                width: "70%",
                backgroundColor: "#ffffff10",
                padding: "3px",
              }}
            />
          </div>
          <br />
          <Button
            onClick={props.stakeAll}
            style={{
              margin: "20px 10px",
              backgroundColor: "#ffffff10",
              boxShadow: "1px 1px 5px #000000",
            }}
            value="stake-all"
          >
            Stake ALL
          </Button>
          <p>
            This will stake all your NFTs (Max. 25 per transaction, the same
            applies to unstake), the gas fee could be higher depending on how
            many you have.
          </p>{" "}
          <br />
        </form>
      </div>
      <div className="col vault">
        <form
          className="nftstaker border-0 col-sm-12"
          style={{ fontFamily: "SF Pro Display" }}
        >
          <h2
            style={{
              borderRadius: "14px",
              fontWeight: "300",
              fontSize: "25px",
            }}
          >
            WenLambo NFT Staking Vault{" "}
          </h2>
          <h2
            style={{
              borderRadius: "14px",
              fontWeight: "300",
              fontSize: "15px",
            }}
          >
            (DogeChain)
          </h2>
          <div style={{ width: "60%", margin: "auto" }}>
            <h6 style={{ fontWeight: "300", padding: "20px 0px" }}>
              If you don't authorize your wallet, transaction will fail and gas
              fee will be +1 WDOGE
            </h6>
          </div>
          <div className="row px-3">
            <div className="col">
              <form
                className="stakingrewards"
                style={{
                  borderRadius: "25px",
                  boxShadow: "1px 1px 15px #ffffff",
                }}
              >
                <h5 style={{ color: "#FFFFFF", fontWeight: "300" }}>
                  Your Vault Activity
                </h5>
                <h6 style={{ color: "#FFFFFF" }}>Verify Staked Amount</h6>
                <Button
                  onClick={verify}
                  style={{
                    backgroundColor: "#ffffff10",
                    boxShadow: "1px 1px 5px #000000",
                  }}
                >
                  Verify
                </Button>
                <table className="table mt-3 mb-5 px-3 table-dark">
                  <tr>
                    <td style={{ fontSize: "19px" }}>
                      Your Staked NFTs:
                      <span
                        style={{
                          backgroundColor: "#ffffff00",
                          fontSize: "21px",
                          color: "#7366fa",
                          fontWeight: "500",
                          textShadow: "1px 1px 2px #000000",
                        }}
                        id="yournfts"
                      ></span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontSize: "19px" }}>
                      Total Staked NFTs:
                      <span
                        style={{
                          backgroundColor: "#ffffff00",
                          fontSize: "21px",
                          color: "#7366fa",
                          fontWeight: "500",
                          textShadow: "1px 1px 2px #000000",
                        }}
                        id="stakedbalance"
                      ></span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontSize: "19px" }}>
                      Unstake All Staked NFTs
                      <Button
                        onClick={props.unstakeall}
                        className="mb-3"
                        style={{
                          backgroundColor: "#ffffff10",
                          boxShadow: "1px 1px 5px #000000",
                          display: "block",
                          margin: "auto",
                        }}
                      >
                        Unstake All
                      </Button>
                    </td>
                  </tr>
                </table>
              </form>
            </div>
            <img
              alt="lambo img"
              style={{ margin: "auto" }}
              className="col-lg-4 blue-lambo"
              src="wenlambo-image.png"
            />
            <div className="col">
              <form
                className="stakingrewards"
                style={{
                  borderRadius: "25px",
                  boxShadow: "1px 1px 15px #ffffff",
                  fontFamily: "SF Pro Display",
                }}
              >
                <h5 style={{ color: "#FFFFFF", fontWeight: "300" }}>
                  {" "}
                  Staking Rewards
                </h5>
                <Button
                  onClick={rewardinfo}
                  style={{
                    backgroundColor: "#ffffff10",
                    boxShadow: "1px 1px 5px #000000",
                  }}
                >
                  Earned RLAM Rewards
                </Button>
                <div
                  id="earned"
                  style={{
                    color: "#7366fa",
                    marginTop: "5px",
                    fontSize: "25px",
                    fontWeight: "500",
                    textShadow: "1px 1px 2px #000000",
                  }}
                >
                  <p style={{ fontSize: "20px" }}>Earned Tokens</p>
                </div>
                <div className="col-12 mt-2">
                  <div style={{ color: "white" }}>Claim Rewards</div>
                  <Button
                    onClick={props.claimit}
                    style={{
                      backgroundColor: "#ffffff10",
                      boxShadow: "1px 1px 5px #000000",
                    }}
                    className="mb-2"
                  >
                    Claim
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <div className="row px-4 pt-2">
            <div className="header">
              <div
                style={{
                  fontSize: "25px",
                  borderRadius: "14px",
                  color: "#ffffff",
                  fontWeight: "300",
                }}
              >
                WENLAMBO NFT Staking Pool Active Rewards
              </div>
              <table className="table px-3 table-bordered table-dark">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Collection</th>
                    <th scope="col">Rewards Per Day</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="stakegoldeffect">
                    <td>WenLambo Legendary NFT Collection</td>
                    <td
                      className="amount"
                      data-test-id="rewards-summary-one-time"
                    >
                      <span className="amount">1.5</span>&nbsp;
                      <span className="currency">LAMBO/NFT</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
