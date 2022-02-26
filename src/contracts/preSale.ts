import Caver, { AbiItem, Contract } from 'caver-js';

import GatherSYL_ABI from './GatherSYL.json';
import KIP17_ABI from './KIP17.json';

interface KlaytnWindow extends Window {
  klaytn: any;
  caver?: Caver;
}

const unknownWindow = window as unknown;
export const klaytnWindow = unknownWindow as KlaytnWindow;

export async function getWhiteList(contractAddress: string, userAddress: string) {
  const preSaleContract = getGetherSYLContract(contractAddress) as Contract;

  return await preSaleContract.methods.whitelists(userAddress).call();
}

export async function getBalanceOf(tokenAddress: string, contractAddress: string) {
  const caver = getCaver() as Caver;
  const kip7Instance = new caver.klay.KIP7(tokenAddress);
  const balance = await kip7Instance?.balanceOf(contractAddress);

  return balance.div(1e18).toNumber();
}

export async function executeDistribute(contractAddress: string, tokenContractAddress: string, userAddress: string) {
  try {
    const getherSYLContract = getGetherSYLContract(contractAddress) as Contract;
    const caver = getCaver() as Caver;

    await getherSYLContract.methods
      .distributionToken(tokenContractAddress)
      .send({ gas: 2100000, from: userAddress })
      .once('transactionHash', (transactionHash: unknown) => {
        console.log('txHash', transactionHash);
      })
      .once('receipt', (receipt: unknown) => {
        console.log('receipt', receipt);
        alert('분배 완료!');
      })
      .once('error', (error: unknown) => {
        console.log('error', error);
      });
  } catch (error) {
    console.log('error :', error);
    return alert('트렌젝션이 거부되었습니다.');
  }
}

export async function executeAddNftAllowed(contractAddress: string, nftContractAddress: string, userAddress: string) {
  try {
    const getherSYLContract = getGetherSYLContract(contractAddress) as Contract;
    const caver = getCaver() as Caver;

    await getherSYLContract.methods
      .addNftAllowed(nftContractAddress)
      .send({ gas: 2100000, from: userAddress })
      .once('transactionHash', (transactionHash: unknown) => {
        console.log('txHash', transactionHash);
      })
      .once('receipt', (receipt: unknown) => {
        console.log('receipt', receipt);
        alert('분배 완료!');
      })
      .once('error', (error: unknown) => {
        console.log('error', error);
      });
  } catch (error) {
    console.log('error :', error);
    return alert('트렌젝션이 거부되었습니다.');
  }
}
export async function executeAddStakeAllowed(
  contractAddress: string,
  tokenContractAddress: string,
  userAddress: string
) {
  try {
    const getherSYLContract = getGetherSYLContract(contractAddress) as Contract;
    const caver = getCaver() as Caver;

    await getherSYLContract.methods
      .addStakeAllowed(tokenContractAddress)
      .send({ gas: 2100000, from: userAddress })
      .once('transactionHash', (transactionHash: unknown) => {
        console.log('txHash', transactionHash);
      })
      .once('receipt', (receipt: unknown) => {
        console.log('receipt', receipt);
        alert('분배 완료!');
      })
      .once('error', (error: unknown) => {
        console.log('error', error);
      });
  } catch (error) {
    console.log('error :', error);
    return alert('트렌젝션이 거부되었습니다.');
  }
}
export async function executeAddDistributeNum(
  contractAddress: string,
  tokenContractAddress: string,
  userAddress: string
) {
  try {
    const getherSYLContract = getGetherSYLContract(contractAddress) as Contract;
    const caver = getCaver() as Caver;

    await getherSYLContract.methods
      .addDistributeNum(tokenContractAddress)
      .send({ gas: 2100000, from: userAddress })
      .once('transactionHash', (transactionHash: unknown) => {
        console.log('txHash', transactionHash);
      })
      .once('receipt', (receipt: unknown) => {
        console.log('receipt', receipt);
        alert('분배 완료!');
      })
      .once('error', (error: unknown) => {
        console.log('error', error);
      });
  } catch (error) {
    console.log('error :', error);
    return alert('트렌젝션이 거부되었습니다.');
  }
}

export async function executeStakeContract(
  gatherSYL_Address: string,
  sylNFT_Address: string,
  value: number | string,
  userAddress: string
) {
  try {
    const getherSYLContract = getGetherSYLContract(gatherSYL_Address) as Contract;
    const syltareContract = getSYLTAREContract(sylNFT_Address) as Contract;

    const tokenId = await syltareContract.methods.tokenByIndex(value).call();
    console.log(tokenId);

    await syltareContract.methods
      .approve(gatherSYL_Address, tokenId)
      .send({ gas: 2100000, from: userAddress })
      .once('transactionHash', (transactionHash: unknown) => {
        console.log('txHash', transactionHash);
      })
      .once('receipt', async (receipt: unknown) => {
        console.log('receipt', receipt);
        alert('구매 완료!');
        await getherSYLContract.methods
          .staking(sylNFT_Address, tokenId)
          .send({ gas: 2100000, from: userAddress })
          .once('transactionHash', (transactionHash: unknown) => {
            console.log('txHash', transactionHash);
          })
          .once('receipt', (receipt: unknown) => {
            console.log('receipt', receipt);
            alert('구매 완료!');
          })
          .once('error', (error: unknown) => {
            console.log('error', error);
          });
      })
      .once('error', (error: unknown) => {
        console.log('error', error);
      });
  } catch (error) {
    console.log('error :', error);
    return alert('트렌젝션이 거부되었습니다.');
  }
}

export async function executeWithdrawContract(
  gatherSYL_Address: string,
  sylNFT_Address: string,
  value: number | string,
  userAddress: string
) {
  try {
    const getherSYLContract = getGetherSYLContract(gatherSYL_Address) as Contract;
    const syltareContract = getSYLTAREContract(sylNFT_Address) as Contract;

    const tokenId = await syltareContract.methods.tokenByIndex(value).call();

    await getherSYLContract.methods
      .withdraw(sylNFT_Address, tokenId)
      .send({ gas: 2100000, from: userAddress })
      .once('transactionHash', (transactionHash: unknown) => {
        console.log('txHash', transactionHash);
      })
      .once('receipt', (receipt: unknown) => {
        console.log('receipt', receipt);
        alert('구매 완료!');
      })
      .once('error', (error: unknown) => {
        console.log('error', error);
      });
  } catch (error) {
    console.log('error :', error);
    return alert('트렌젝션이 거부되었습니다.');
  }
}

function getCaver() {
  const unknownWindow = window as unknown;
  const klaytnWindow = unknownWindow as KlaytnWindow;
  const caver = klaytnWindow.caver;
  if (!caver) {
    return alert('카이카스가 필요합니다. 카이카스를 설치해주시기 바랍니다.');
  }

  return caver;
}

function getGetherSYLContract(contractAddress: string, isKaikasAlert = true) {
  const PRE_SALE_ABI = GatherSYL_ABI as AbiItem[];
  const unknownWindow = window as unknown;
  const klaytnWindow = unknownWindow as KlaytnWindow;
  const caver = klaytnWindow.caver;
  if (!caver) {
    return isKaikasAlert && alert('카이카스가 필요합니다. 카이카스를 설치해주시기 바랍니다.');
  }
  return new caver.klay.Contract(PRE_SALE_ABI, contractAddress);
}

function getSYLTAREContract(contractAddress: string, isKaikasAlert = true) {
  const unknownWindow = window as unknown;
  const klaytnWindow = unknownWindow as KlaytnWindow;
  const caver = klaytnWindow.caver;
  if (!caver) {
    return isKaikasAlert && alert('카이카스가 필요합니다. 카이카스를 설치해주시기 바랍니다.');
  }
  return new caver.klay.Contract(KIP17_ABI as AbiItem[], contractAddress);
}
