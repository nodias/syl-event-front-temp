import React, { ChangeEvent, useEffect, useState } from 'react';

import './PreSale.css';
import {
  executeAddDistributeNum,
  executeAddNftAllowed,
  executeAddStakeAllowed,
  executeStakeContract,
  executeDistribute,
  getBalanceOf,
  getWhiteList,
  klaytnWindow, executeWithdrawContract
} from 'contracts/preSale';

export const PreSale = () => {
  const CYPRESS_SYLTOKEN = process.env.REACT_APP_CYPRESS_SYLTOKEN_ADDRESS as string;
  const CYPRESS_GATHERSYL = process.env.REACT_APP_CYPRESS_GATHERSYL_ADDRESS as string;
  const CYPRESS_SYLTARE = process.env.REACT_APP_CYPRESS_SYLTARE_ADDRESS as string;
  const PUBLISH_BRAG_AMOUNT = 50000;

  const [kaikasAddress, setKaikasAddress] = useState('');
  const [bragValue, setBragValue] = useState<string>();
  const [remainBragValue, setRemainBragValue] = useState<number>(PUBLISH_BRAG_AMOUNT);

  useEffect(() => {
    void onLogin();

    setInterval(async () => {
      try {
        const remainBalance = await getBalanceOf(CYPRESS_SYLTOKEN, CYPRESS_GATHERSYL);

        setRemainBragValue(remainBalance);
        console.log('remainBalance : ', remainBalance);
      } catch (error) {
        console.log(error);
      }
    }, 1500);
  }, []);

  const onLogin = async () => {
    console.log('onLogin');
    try {
      if (!klaytnWindow.klaytn) {
        return alert('카이카스가 필요합니다. 카이카스를 설치해주시기 바랍니다.');
      }
      if (klaytnWindow.klaytn.networkVersion === 1001) {
        return alert('메인넷으로 접속해주세요.');
      }

      const enableAddress = await klaytnWindow.klaytn.enable();
      const address = enableAddress[0];

      if (!address) {
        console.log('kaikas address is not set.');
        return window.location.reload();
      }

      setKaikasAddress(address);
    } catch (err) {
      return alert('지갑 미연결 시 이용할 수 없습니다.');
    }
  };

  const onChangeBragValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    return setBragValue(value);
  };

  const distribute = async () => {
    try {
      if (klaytnWindow.klaytn?.selectedAddress !== kaikasAddress) {
        alert('지갑 미연결 시 이용할 수 없습니다.');
        return window.location.reload();
      }
      await executeDistribute(CYPRESS_GATHERSYL, CYPRESS_SYLTOKEN, kaikasAddress);
    } catch (error) {
      console.log('error : ', error);
    }
  };

  const registerNFTClick = async () => {
    try {
      if (klaytnWindow.klaytn?.selectedAddress !== kaikasAddress) {
        alert('지갑 미연결 시 이용할 수 없습니다.');
        return window.location.reload();
      }
      await executeAddNftAllowed(CYPRESS_GATHERSYL, String(bragValue), kaikasAddress);
    } catch (error) {
      console.log('error : ', error);
    }
  };
  const registerStakingAddressClick = async () => {
    try {
      if (klaytnWindow.klaytn?.selectedAddress !== kaikasAddress) {
        alert('지갑 미연결 시 이용할 수 없습니다.');
        return window.location.reload();
      }
      await executeAddStakeAllowed(CYPRESS_GATHERSYL, String(bragValue), kaikasAddress);
    } catch (error) {
      console.log('error : ', error);
    }
  };
  const registerDistributeMemberClick = async () => {
    try {
      if (klaytnWindow.klaytn?.selectedAddress !== kaikasAddress) {
        alert('지갑 미연결 시 이용할 수 없습니다.');
        return window.location.reload();
      }
      await executeAddDistributeNum(CYPRESS_GATHERSYL, String(bragValue), kaikasAddress);
    } catch (error) {
      console.log('error : ', error);
    }
  };
  const stakeClick = async () => {
    try {
      if (klaytnWindow.klaytn?.selectedAddress !== kaikasAddress) {
        alert('지갑 미연결 시 이용할 수 없습니다.');
        return window.location.reload();
      }
      await executeStakeContract(CYPRESS_GATHERSYL, CYPRESS_SYLTARE, String(bragValue), kaikasAddress);
    } catch (error) {
      console.log('error : ', error);
    }
  };

  const withdrawClick = async () => {
    try {
      if (klaytnWindow.klaytn?.selectedAddress !== kaikasAddress) {
        alert('지갑 미연결 시 이용할 수 없습니다.');
        return window.location.reload();
      }
      await executeWithdrawContract(CYPRESS_GATHERSYL, CYPRESS_SYLTARE, String(bragValue), kaikasAddress);
    } catch (error) {
      console.log('error : ', error);
    }
  };

  const bragToKlay = (bragValue: number) => {
    return Math.round(bragValue * 0.007 * 1000) / 1000;
  };

  const remainProgressBarWidth = (remainBragValue: number) => {
    return Math.round((remainBragValue / PUBLISH_BRAG_AMOUNT) * 100 * 10) / 10;
  };

  return (
    <>
      <div style={{ height: '6vh', backgroundColor: 'black', display: 'flex', alignItems: 'center' }}>
        <span style={{ flex: '1 0 0%', color: 'white', marginLeft: '16px', fontSize: '2.5vh' }}>Brag-Pre-Sale</span>
        <span style={{ flex: '0 1 0%', color: 'white', marginRight: '16px', fontSize: '1.7vh' }}>
          {kaikasAddress ? (
            `${kaikasAddress.substring(0, 5)}...${kaikasAddress.substring(
              kaikasAddress.length - 5,
              kaikasAddress.length
            )}`
          ) : (
            <p onClick={onLogin} style={{ cursor: 'pointer' }}>
              Login
            </p>
          )}
        </span>
      </div>
      <div id="app" data-v-app="">
        <section>
          <div className="box">
            <div className="title" style={{ fontWeight: 700, color: 'white', fontSize: '100px' }}>
              <span style={{ marginTop: '24px' }}>
                <span style={{ verticalAlign: 'middle' }}>
                  <img src="whiteLogo.png" style={{ width: '100px', height: '100px', marginRight: '12px' }} />
                </span>
                <span>BRAG</span>
              </span>
            </div>
            <h2>SYL 토큰 남은 수량</h2>
            <div className="mint-percent klay">
              <div className="bar">
                <div
                  style={{
                    height: '100%',
                    width: `${remainProgressBarWidth(remainBragValue)}%`,
                    backgroundColor: '#56e3c7',
                    transition: 'width 1s ease-in-out'
                  }}
                ></div>
              </div>
              <span>
                {remainBragValue.toLocaleString()} / {PUBLISH_BRAG_AMOUNT.toLocaleString()}
              </span>
            </div>
            <h2></h2>
            <div style={{ display: 'flex' }}>
              <div className="btn klay" onClick={distribute}>
                Distribute
              </div>
            </div>
            <h2></h2>
            <input
              className="mint-percent klay"
              style={{ textAlign: 'center', width: '80%', borderRadius: '0px' }}
              value={bragValue || ''}
              onChange={onChangeBragValue}
              placeholder="Staking할 SYL token ID"
            />

            <div style={{ display: 'flex' }}>
              <div className="btn klay" onClick={stakeClick}>
                Stake
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <div className="btn klay" onClick={withdrawClick}>
                Withdraw
              </div>
            </div>
            <h2></h2>
            <div style={{ display: 'flex' }}>
              <div className="btn klay" onClick={registerNFTClick}>
                register nft
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <div className="btn klay" onClick={registerStakingAddressClick}>
                register staking address
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <div className="btn klay" onClick={registerDistributeMemberClick}>
                register distribute member 6
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
