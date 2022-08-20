import Web3 from 'web3';
import { account } from '../functions/ConnectButton';
import PAIRABI from '../blockchain/ABIs/PAIRABI.json';
import FARMABI from '../blockchain/ABIs/FARMABI.json';
import { Token } from '@mistswapdex/sdk';
import { MASTERCHEFCONTRACT, LAMBOADDRESS } from '../blockchain/config';
import axios from 'axios'

export var apr;
export var tvl; 

export default async function getRLamboPrice() {

  var web3 = new Web3(window.ethereum);
  const MasterchefContract = new web3.eth.Contract(FARMABI, MASTERCHEFCONTRACT)

  const LAMBO = new Token(2000, LAMBOADDRESS, 18, 'LAMBO', 'Lambo Token');
  const WDOGE = new Token(2000, '0xb7ddc6414bf4f5515b52d8bdd69973ae205ff101', 18, 'WDOGE', 'WRAPPED DOGE')

  const hardcodedPairs = {
    "0x176A829f43A91e18A506eD9085112e4fD5980d4F": {
      farmId: 0,
      allocPoint: 10000,
      token0: WDOGE,
      token1: LAMBO,
    },
    "0x8DCeBE9f071562D52b5ABB17235f3bCA768C1e44": {
      farmId: 888,
      allocPoint: 0,
      token0: WDOGE,
      token1: new Token(2000, '0x765277eebeca2e31912c9946eae1021199b39c61', 18, 'USC', 'USD COIN'),
    },
    // "0xE1B5bC09427710BC4d886eC49654944110B58134": {
    //   farmId: 48,
    //   allocPoint: 0,
    //   token0: WBCH[ChainId.SMARTBCH],
    //   token1: new Token(ChainId.SMARTBCH, '0x0E36C351ff40183435C9Bd1D17bfb1F3548f1963', 18, 'LAMBO', 'wenlambo'),
    // },
  }
  var farms = []

  for (const [pairAddress, pair] of Object.entries(hardcodedPairs)) {
    const V2PairContract = new web3.eth.Contract(PAIRABI, pairAddress);

    const f = {
      pair: pairAddress,
      symbol: `${hardcodedPairs[pairAddress].token0.symbol}-${hardcodedPairs[pairAddress].token1.symbol}`,
      pool: {
        reserves: 0,
        totalSupply: 0,
        token0: undefined,
        token1: undefined,
      },
      allocPoint: pair.allocPoint,
      balance: "1000000000000000000",
      chef: 0,
      id: pair.farmId,
      pendingSushi: undefined,
      pending: 0,
      owner: {
        id: MASTERCHEFCONTRACT,
        sushiPerBlock: "10000000000000000000",
        totalAllocPoint: "10000"
      },
      userCount: 1,
    }

    f.pool.totalSupply = await V2PairContract.methods.totalSupply().call();
    f.pool.reserves = await V2PairContract.methods.getReserves().call();
    f.pendingSushi = await MasterchefContract.methods.pendingSushi(pair.farmId, account);
    f.pool.token0 = await V2PairContract.methods.token0().call();
    f.pool.token1 = await V2PairContract.methods.token1().call();
    f.pending = Number.parseFloat(f.pendingSushi).toFixed();

    farms.push(f);
  }

  let wdogePriceUSD = 0.085;
  let lamboPriceUSD = 0.0063;
  let lamboPriceDoge = 0.085;

  const lambowdogePool = farms.find((v) => v.pair === '0x176A829f43A91e18A506eD9085112e4fD5980d4F').pool;
  const wdogeusdcPool = farms.find((v) => v.pair === '0x8DCeBE9f071562D52b5ABB17235f3bCA768C1e44').pool;
  if (wdogeusdcPool.reserves) {
    wdogePriceUSD = Number.parseFloat(Number(wdogeusdcPool.reserves[0]).toFixed()) / Number.parseFloat(Number(wdogeusdcPool.reserves[1]).toFixed());
  }
  if (lambowdogePool.reserves) {
    lamboPriceDoge = Number.parseFloat(Number(lambowdogePool.reserves[1]).toFixed()) / Number.parseFloat(Number(lambowdogePool.reserves[0]).toFixed());
    lamboPriceUSD = lamboPriceDoge * wdogePriceUSD
  }
  // if (lambowdogePool.reserves && wdogeusdcPool.reserves) {
  //   rLamPriceLambo = 1. / ( Number.parseFloat(Number(lambowdogePool.reserves[1]).toFixed()) / Number.parseFloat(Number(lambowdogePool.reserves[0]).toFixed()))
  //   rLamPriceLambo = rLamPriceLambo * lamboPriceDoge; //precio en bch
  //   console.log(lamboPriceUSD);
  // } 
  console.log(wdogePriceUSD);

  const v2PairsBalances = await Promise.all(farms.map(async (farm) => {
    const lpToken = new Token(2000, farm.pair, 18, 'LP', 'LP Token');
    const apicall = await axios.get(`https://explorer.dogechain.dog/api?module=account&action=tokenbalance&contractaddress=${lpToken.address}&address=${MASTERCHEFCONTRACT}`)
    .then(output => {
      const { result } = output.data;
      const address  = lpToken.address;
      return [Web3.utils.fromWei(result, 'ether'), address]
    })
    return apicall;
  }))

  for (let i=0; i<farms.length; ++i) {
    if (v2PairsBalances[i][1] && farms[i].pool.totalSupply) {
      const totalSupply = farms[i].pool.totalSupply;
      const chefBalance = v2PairsBalances[i][0];

      if (farms[i].pool.token1 === LAMBO.address) {
        const reserve = Number.parseFloat(farms[i].pool.reserves[1]).toFixed();
        tvl = reserve / totalSupply * chefBalance * lamboPriceUSD * 2;
      } 
      else if (farms[i].pool.token1 === LAMBO.address) {
        const reserve = Number.parseFloat(farms[i].pool.reserves[1]).toFixed();
        tvl = reserve / totalSupply * chefBalance * lamboPriceUSD * 2;
      }
      else if (farms[i].pool.token0 === WDOGE.address) {
        const reserve = Number.parseFloat(farms[i].pool.reserves[0]).toFixed();
        tvl = reserve / totalSupply * chefBalance * wdogePriceUSD * 2;
      }
      else if (farms[i].pool.token1 === WDOGE.address) {
        const reserve = Number.parseFloat(farms[i].pool.reserves[1]).toFixed();
        tvl = reserve / totalSupply * chefBalance * wdogePriceUSD * 2;
      }
      farms[i].tvl = tvl;
      farms[i].totalSupply = totalSupply;
      farms[i].chefBalance = chefBalance;
    } else {
      farms[i].tvl = "0";
      farms[i].totalSupply = 0;
      farms[i].chefBalance = 0;
    }
  }
  tvl = Number(farms[0].tvl).toFixed(2);

  const totalAllocPoint = await MasterchefContract.methods.totalAllocPoint().call();
  const sushiPerBlock = await MasterchefContract.methods.sushiPerBlock().call();

  for(let i = 0; i < farms.length; i++) {
    const poolAllocPoint = farms[i].allocPoint
    const blocksPerDay = 15684; // calculated empirically

    const rewardPerBlock = (poolAllocPoint / totalAllocPoint) * Web3.utils.fromWei(sushiPerBlock) * 20;

    const defaultReward = {
      rewardPerBlock,
      rewardPerDay: rewardPerBlock * blocksPerDay,
      rewardPrice: +lamboPriceUSD,
    }

    const defaultRewards = [defaultReward]

    const roiPerBlock = defaultRewards.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.rewardPerBlock * currentValue.rewardPrice
    }, 0) / farms[i].tvl;

    const roiPerDay = roiPerBlock * blocksPerDay;

    const roiPerYear = roiPerDay * 365;

    farms[i].apr = roiPerYear;
  }
  apr = farms[0].apr;
}
