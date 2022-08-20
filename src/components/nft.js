import '../styles/App.css';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useEffect, useState } from 'react'
import 'sf-font';
import VAULTABI from '../blockchain/ABIs/VAULTABI.json';
import { NFTCONTRACT, STAKINGCONTRACT, nftpng } from '../blockchain/config';
import Web3 from 'web3';
import ABI from '../blockchain/ABIs/ABI.json';

var account = null;
var vaultcontract = null;
var nftcontract = null;

export default function NFT() {
  const [apicall, getNfts] = useState([])
  const [nftstk, getStk] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')

  useEffect(() => {
    callApi()
  }, [])


  async function callApi() {
    var web3 = new Web3(window.ethereum);
    await window.ethereum.send("eth_requestAccounts");
    var accounts = await web3.eth.getAccounts();
    account = accounts[0];
    // document.getElementById("wallet-address").textContent = account;
    nftcontract = new web3.eth.Contract(ABI, NFTCONTRACT);
    vaultcontract = new web3.eth.Contract(VAULTABI, STAKINGCONTRACT);

    

    const tokensOwned = await nftcontract.methods.walletOfOwner(account).call();
    const nfts = tokensOwned.map((id) => (
      {
        token_id: id,
        ownerOf: account,
      })
    );

    const vaultOwned = await vaultcontract.methods.tokensOfOwner(account).call();
    const nftStaked = vaultOwned.map((id) => (
      {
        token_id: id,
        ownerOf: STAKINGCONTRACT,
      })
    );


    if (tokensOwned.length !== 0) {
      const apicall = await Promise.all(nfts.map(async (i) => {
        let item = {
          tokenId: i.token_id,
          holder: i.ownerOf,
          wallet: account,
        }
        return item
      }))
      const stakednfts = await vaultcontract.methods.tokensOfOwner(account).call()
        .then(id => {
          return id;
        })
      const nftstk = await Promise.all(stakednfts.map(async i => {
        let stkid = {
          tokenId: i,
        }
        return stkid
      }))
      getNfts(apicall)
      getStk(nftstk)
      setLoadingState('loaded')
    } else {
      const apicall = await Promise.all(nftStaked.map(async (i) => {
        let item = {
          tokenId: i.token_id,
          holder: i.ownerOf,
          wallet: account,
        }
        return item
      }))
      const stakednfts = await vaultcontract.methods.tokensOfOwner(account).call()
        .then(id => {
          return id;
        })
      const nftstk = await Promise.all(stakednfts.map(async i => {
        let stkid = {
          tokenId: i,
        }
        return stkid
      }))
      getNfts(apicall)
      getStk(nftstk)
      setLoadingState('loaded')
    }
  }

  if (loadingState === 'loaded' && !apicall.length)
    return (
      <h1 className="text-3xl">You don't have any NFTs</h1>)
  return (
    <div className='nftportal' style={{textAlign: 'left'}}>
      <div className="container col-lg-11 col-md-12 col-sm-12">
        <div className="row items px-3 pt-3">
          <div className="ml-3 mr-3 nftimages">
            {apicall.map((nft, i) => {
              var owner = nft.wallet;
              if (owner.indexOf(nft.holder) !== -1) {
                async function stakeit() {
                  vaultcontract.methods.stake([nft.tokenId]).send({ from: account });
                }
                return (
                  <div className="card nft-card mt-3 mb-3" key={i} >
                    <div className="image-over">
                      <img className="card-img-top" src={nftpng + nft.tokenId + '.png'} alt="" />
                    </div>
                    <div className="card-caption col-12 p-0">
                      <div className="card-body">
                        <h5 className="mb-0">WenLambo Legendary NFT Collection #{nft.tokenId}</h5>
                        <h5 className="mb-0 mt-2">Status<p style={{ color: "#39FF14", fontWeight: "bold", textShadow: "1px 1px 2px #000000" }}>Ready to Stake</p></h5>
                        <div className="card-bottom d-flex justify-content-between">
                          <input key={i} type="hidden" id='stakeid' value={nft.tokenId} />
                          <Button style={{ marginLeft: '2px', backgroundColor: "#ffffff10" }} onClick={stakeit}>Stake it</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
            })}
            {nftstk.map((nft, i) => {
              async function unstakeit() {
                vaultcontract.methods.unstake([nft.tokenId]).send({ from: account });
              }
              return (
                <div>

                  <div className="card stakedcard mt-3 mb-3" key={i} >
                    <div className="image-over">
                    <img style={{position:'absolute',top:'0.05rem',width:'55px'}} src='dogechainlogo.png'></img>
                      <img className="card-img-top" src={nftpng + nft.tokenId + '.png'} alt="" />
                    </div>
                    <div className="card-caption col-12 p-0">
                      <div className="card-body">
                        <h5 className="mb-0">WenLambo Legendary NFT Collection #{nft.tokenId}</h5>
                        <h5 className="mb-0 mt-2">Status<p style={{ color: "#15F4EE", fontWeight: "bold", textShadow: "1px 1px 2px #000000" }}>Currently Staked</p></h5>
                        <div className="card-bottom d-flex justify-content-between">
                          <input key={i} type="hidden" id='stakeid' value={nft.tokenId} />
                          <Button style={{ marginLeft: '2px', backgroundColor: "#ffffff10" }} onClick={unstakeit}>Unstake it</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
