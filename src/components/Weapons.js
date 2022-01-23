import React from 'react';
import {useContext} from "react";
import context from "../context/context";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {updateInventory} from "../features/inventory";
import {updateCharacterGold} from "../features/character";

const Weapons = () => {
    const {trader} = useContext(context)

    const dispatch = useDispatch()

    const inventorySlots = useSelector((state)=> state.character.value.inventorySlots)
    const gold = useSelector((state)=> state.character.value.gold)

    let inventory = useSelector((state)=> state.inventory.value)

    function buyWeapon(x){
        let totalGold = gold
        if (inventory.length < inventorySlots && gold > x.price){
            totalGold -= x.price
            dispatch(updateCharacterGold(totalGold))
                dispatch(updateInventory([...inventory,x]))
    }

}


    return (

        <div className="d-flex f-wrap" >

            {trader.weapons.map((x,index)=><div className="weapons" key={index} onClick={() => buyWeapon(x,index)}>
                <img src={x.image}/>
                <p>Price: {x.price}</p>
                <p>Max Damage: {x.maxDamage}</p>
                <p>Energy Per hit: {x.energyPerHit}</p>
                <div className="d-flex">


                    {Object.keys(x.effects).length > 0 ? <div>Effects:</div> : ""}
                     {x.effects.map((x,index)=><div>
                {Object.keys(x).length > 0 ? <div key={index}>  &nbsp;{x} </div> : ""}
                    </div>
                )}</div>


            </div>)}
        </div>
    );
};

export default Weapons;

