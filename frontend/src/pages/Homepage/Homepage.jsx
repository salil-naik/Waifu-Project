import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../utli/UserContext";

import getWeb3 from  "./../../web3";
import CreateWaifu from "./../../abi/CreateWaifu.json";

import style from "./homepage.module.scss";
import waifuImage from "../../images/waifu.png";

// components
import { Category } from "../../components/Category/index";
import { Modal } from "../../components/Modal/index";

export function Homepage() {
  const [modalDisplay, setModalDisplay] = useState("none");

  useEffect(()=>{
    async function showData() {
      const address = '0x7Fc753337F15F47cf7BCE74545c2753E3dA12bda'
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
      const instance = new web3.eth.Contract(CreateWaifu.abi, address);
      const numOfWaifus = await instance.methods.getWaifusCount(accounts[0]).call();
      console.log('number', numOfWaifus);
     

      for (let i = numOfWaifus - 1; i >= 0; i--) {
        console.log('loop')
        //Get id
        const ids = await instance.methods
          .senderToTokenId(accounts[0], i)
          .call();

        console.log(ids);
        //Get option
        // const option = await this.state.putContract.methods.idToOption(id).call();
      }
      // const data = await instance.methods.getWaifuStats();
      // console.log(data); 
    }
    
    showData();
  }, [])

  let showModal = () => {
    setModalDisplay("block");
  };

  let hideModal = () => {
    setModalDisplay("none");
  };

  const {user} = useContext(UserContext);

  let categoryOneData = {
    name: "Popular Waifus",
    feed: [
      { name: "Name one", id: 839383, expiry: 12, origin: "india", age: 25, height: '5.3 ft', weight: '30 kgs', bust: '45', waiste: '76', hip: '64', desc: 'desc'},
      { name: "Name two", id: 145367, expiry: 870 },
      { name: "Name three", id: 938708, expiry: 1678 },
      { name: "Name four", id: 839378, expiry: 12 },
      { name: "Name one", id: 909899, expiry: 12 },
      { name: "Name two", id: 112345, expiry: 870 },
      { name: "Name three", id: 111111, expiry: 1678 },
      { name: "Name four", id: 376777, expiry: 12 },
    ],
  };
  let categoryTwoData = {
    name: "My Waifus",
    feed: [
      { name: "Name one", id: 111123, expiry: 12 },
      { name: "Name two", id: 241314, expiry: 870 },
      { name: "Name three", id: 198098, expiry: 1678 },
      { name: "Name four", id: 181111, expiry: 12 },
    ],
  };
  return (
    <>
      <div
        className={style["modal-container"]}
        style={{ display: modalDisplay }}
      >
        <Modal />
        <div className={style["close-modal"]} onClick={hideModal}>&times;</div>
      </div>
      <div className={style.container}>
        <div className="container">
          <div className="row">
            <div className="col-8">
              <div className={style["content-section"]}>
                <h1 className={style.title}>Title of the Webpage</h1>
                <p className={style.desc}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Optio, voluptatibus maiores? Ratione commodi magni facilis,
                  temporibus ex esse laborum error! Lorem, ipsum dolor sit amet
                  consectetur adipisicing elit. Temporibus, nihil.
                </p>
                <div className={style["btn-container"]}>
                  {user ? (
                    <div
                      className={`${style.btn} ${style["btn__outlined"]}`}
                      onClick={showModal}
                    >
                      Mint
                    </div>
                  ) : (
                    <></>
                  )}

                  <a
                    href="test"
                    className={`${style.btn} ${style["btn__outlined"]}`}
                  >
                    Explore
                  </a>
                </div>
              </div>
            </div>
            <div className="col-4">
              <img src={waifuImage} alt="waifu image" className={style.img} />
            </div>
          </div>
        </div>
      </div>
      <div className={style["category-section"]}>
        <Category data={categoryOneData} />
        <Category data={categoryTwoData} />
      </div>
    </>
  );
}
