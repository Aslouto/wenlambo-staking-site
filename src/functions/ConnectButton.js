import React, { useState } from 'react';
import ABI from "../blockchain/ABIs/ABI.json";
import { LPCONTRACT, NFTCONTRACT, STAKINGCONTRACT } from "../blockchain/config.js";
import Web3 from "web3";
import VAULTABI from "../blockchain/ABIs/VAULTABI.json";
import { MASTERCHEFCONTRACT } from '../blockchain/config.js';
import FARMABI from '../blockchain/ABIs/FARMABI.json';
import LPABI from '../blockchain/ABIs/LPABI.json';

export var account = null;
export var contract = null;
export var vaultcontract = null;
export var farmcontract = null;
export var lpcontract = null;
export var rewardPairContract = null;
export var web3 = null;

export default function ConnectButton(props) {

    return (
        <div className="px-5" style={{ margin: "auto" }}>
            <input
              id="connectbtn"
              type="button"
              className="connectbutton"
              onClick={props.connectwallet}
              style={{ fontFamily: "SF Pro Display" }}
              value='Connect your Wallet'
            />
        </div>
    )
}

export async function verify() {
  var getstakednfts = await vaultcontract.methods
    .tokensOfOwner(account)
    .call();
  if (getstakednfts.length <= 15) {
    document.getElementById("yournfts").textContent = getstakednfts;
  } else {
    const getbalance = Number(
      await vaultcontract.methods.balanceOf(account).call()
    );
    document.getElementById("yournfts").textContent = getbalance;
  }
  var getbalance = Number(
    await vaultcontract.methods.balanceOf(account).call()
  );
  document.getElementById("stakedbalance").textContent = getbalance;
}

export async function enable() {
  contract.methods
    .setApprovalForAll(STAKINGCONTRACT, true)
    .send({ from: account });
}

export async function rewardinfo() {
  var rawnfts = await vaultcontract.methods.tokensOfOwner(account).call();
  const arraynft = Array.from(rawnfts.map(Number));
  const tokenid = arraynft.filter(Number);
  var rwdArray = [];
  tokenid.forEach(async (id) => {
    var rawearn = await vaultcontract.methods
      .earningInfo(account, [id])
      .call();
    var array = Array.from(rawearn.map(Number));
    array.forEach(async (item) => {
      var earned = String(item).split(",")[0];
      var earnedrwd = Web3.utils.fromWei(earned);
      var rewardx = Number(earnedrwd).toFixed(6);
      var numrwd = Number(rewardx);
      rwdArray.push(numrwd);
    });
  });
  function delay() {
    return new Promise((resolve) => setTimeout(resolve, 300));
  }
  async function delayedLog(item) {
    await delay();
    var sum = item.reduce((a, b) => a + b, 0);
    var formatsum = Number(sum).toFixed(6);
    document.getElementById("earned").textContent = formatsum;
  }
  async function processArray(rwdArray) {
    for (const item of rwdArray) {
      await delayedLog(item);
    }
  }
  return processArray([rwdArray]);
}

export async function StakeConnectWallet() {
  const chainId = 10001;

  if (window.ethereum.networkVersion !== chainId) {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: web3.utils.toHex(chainId) }],
      });
    } catch (err) {
      // This error code indicates that the chain has not been added to MetaMask
      if (err.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainName: "Smart Bitcoin Cash",
              chainId: web3.utils.toHex(chainId),
              nativeCurrency: {
                name: "BCH",
                decimals: 18,
                symbol: "BCH",
              },
              rpcUrls: ["https://smartbch.fountainhead.cash/mainnet"],
            },
          ],
        });
      }
    }
  }

  if (window.ethereum) {
    var web3 = new Web3(window.ethereum);
    await window.ethereum.send("eth_requestAccounts");
    var accounts = await web3.eth.getAccounts();
    account = accounts[0];
    let accountText = `${accounts[0].slice(0, 4)}***${accounts[0].slice(
      38,
      42
    )}`;
    document.getElementById("connectbtn").value = accountText ;
    contract = new web3.eth.Contract(ABI, NFTCONTRACT);
    vaultcontract = new web3.eth.Contract(VAULTABI, STAKINGCONTRACT);
    farmcontract = new web3.eth.Contract(FARMABI, MASTERCHEFCONTRACT);
    lpcontract = new web3.eth.Contract(LPABI, LPCONTRACT)
  
  if (window.location.pathname !== '/farm') {
    var getstakednfts = await vaultcontract.methods
      .tokensOfOwner(account)
      .call();
    if (getstakednfts.length <= 15) {
      const getbalance = Number(
        await vaultcontract.methods.balanceOf(account).call()
      );
      document.getElementById("yournfts").textContent = getstakednfts;
      document.getElementById("stakedbalance").textContent = getbalance;
    } else {
      const getbalance = Number(
        await vaultcontract.methods.balanceOf(account).call()
      );
      document.getElementById("yournfts").textContent = getbalance;
      document.getElementById("stakedbalance").textContent = getbalance;
    }
    rewardinfo()
  }} else {
    alert("Please install metamask");
  }
}