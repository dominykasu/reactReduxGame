import React, {useEffect} from 'react';
import {useSelector} from "react-redux";

import {useDispatch} from "react-redux";

import {updateWeapon} from "../features/weapon";
import {removeInventory} from "../features/inventory";

import {useLocation} from "react-router-dom";
import {updateCharacterGold} from "../features/character";
import context from "../context/context";
import {useContext} from "react";
import {updateCharacter} from "../features/character";

const Inventory = ({yourHp}) => {

    let weapon = useSelector((state)=> state.weapon.value)
    let inventory = useSelector((state)=> state.inventory.value)
    const character = useSelector((state)=> state.character.value)
    const gold = useSelector((state)=> state.character.value.gold)
    const {effects} = useContext(context)

    const dispatch = useDispatch()
    let location = useLocation()





    function equipWeapon(myWeapon, index) {

        if (location.pathname === "/main" && myWeapon.hasOwnProperty("maxDamage") && Object.keys(weapon).length === 0) {


            dispatch(updateWeapon(myWeapon))
            dispatch(removeInventory(index))

            function getEffect(whatEffect) {
                const statName = Object.keys(effects[whatEffect].effect)[0]

                const statValue = effects[whatEffect].effect[statName]






                dispatch(updateCharacter({...character, [statName] : statValue + character[statName]}))

            }

            if (myWeapon.effects.length > 0) {
                myWeapon.effects.map(x => getEffect(x))

            }






        }


        if (location.pathname === "/arena" && myWeapon.hasOwnProperty("effect")) {

            dispatch(removeInventory(index))
            yourHp(myWeapon)
        }
        if (location.pathname === "/arena" && !myWeapon.hasOwnProperty("maxDamage") && !myWeapon.hasOwnProperty("effect")) {

            dispatch(removeInventory(index))
        }
        if (location.pathname === "/arena" && myWeapon.hasOwnProperty("maxDamage") && Object.keys(weapon).length === 0) {
            dispatch(updateWeapon(myWeapon))

            dispatch(removeInventory(index))
        }
        if (location.pathname === "/shop" ){
            if (myWeapon.hasOwnProperty("maxDamage") || myWeapon.hasOwnProperty("effect")){
                let totalGold = myWeapon.price / 2 + gold
                dispatch(updateCharacterGold(totalGold))
                dispatch(removeInventory(index))
            } else {
                let totalGold = myWeapon.price + gold
                dispatch(updateCharacterGold(totalGold))
                dispatch(removeInventory(index))
            }


        }
    }


    return (
        <div>
<h1>Inventory:</h1>
            Your Gold: {character.gold}      Max Slots: {character.inventorySlots}
            <div className="d-flex inventory">
            {inventory.map((x,index) => <div className="inventorySlot" onClick={() => equipWeapon(x, index)} key={index}>

                <img src={x.image}/>

                <h5>Price: {x.price}</h5>
                {x.hasOwnProperty("maxDamage") ? <p>Damage: {x.maxDamage}</p> : ""}
                <p>  {x.title}</p>

            </div>)}

            </div></div>
    );
};

export default Inventory;