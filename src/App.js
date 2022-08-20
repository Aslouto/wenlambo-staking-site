import "./styles/App.css";
import React, { Component } from "react";
import "sf-font";
import Navbar from "./components/Navbar";
import Nftminter from "./components/Nftminter";
import Nftportal from "./components/Nftportal";
import Nft from "./components/nft.js";
import { account, vaultcontract, contract, StakeConnectWallet } from './functions/ConnectButton';
import { refreshData } from "./farm/Farm";

class App extends Component {
  constructor() {
    super();
    this.state = {
      balance: [],
      rawearn: [],
    };
  }

  render() {

    if(window.location.pathname !== '/farm') {
      window.clearInterval(refreshData);
    }

    async function claimit() {
      var rawnfts = await vaultcontract.methods.tokensOfOwner(account).call();
      await vaultcontract.methods.claim(rawnfts).send({ from: account });
    }

    async function unstakeall() {
      var rawNfts = await vaultcontract.methods.tokensOfOwner(account).call();
      const first25 = rawNfts.slice(0, 25);
      await vaultcontract.methods.unstake(first25).send({ from: account });
    }

    async function stakeAll() {
      var rawNfts = await contract.methods.walletOfOwner(account).call();
      const first25 = rawNfts.slice(0, 25);
      await vaultcontract.methods.stake(first25).send({
        from: account,
      });
    }

    async function stakeInput() {
      const tokenIds = document.querySelector("#stake-input").value;
      const nftsIds = JSON.parse("[" + tokenIds + "]");
      await vaultcontract.methods.stake(nftsIds).send({
        from: account,
      });
    }

    async function unstakeInput() {
      const tokenIds = document.querySelector("#unstake-input").value;
      const nftsIds = JSON.parse("[" + tokenIds + "]");
      await vaultcontract.methods.unstake(nftsIds).send({
        from: account,
      });
    }

    const refreshPage = () => {
      window.location.reload();
    };

    return (
      <div className="App nftapp">
          <Navbar
          connectwallet={StakeConnectWallet}
          />
          <Nftminter
            stakeInput={stakeInput}
            unstakeInput={unstakeInput}
            stakeAll={stakeAll}
            unstakeall={unstakeall}
            claimit={claimit}
          />
          <Nftportal refreshPage={refreshPage} />
          <Nft />
      </div>
    );
  }
}
export default App;
