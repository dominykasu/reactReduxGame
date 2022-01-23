import React from 'react';
import {useContext} from "react";
import context from "../context/context";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {updateInventory} from "../features/inventory";
import {updateCharacterGold} from "../features/character";

const Potions = () => {
    const {trader} = useContext(context)
    console.log(trader)
    let inventory = useSelector((state)=> state.inventory.value)
    const inventorySlots = useSelector((state)=> state.character.value.inventorySlots)
    const gold = useSelector((state)=> state.character.value.gold)
    const dispatch = useDispatch()

    function buyPotion(x){
        let totalGold = gold
        console.log(x, gold)
        console.log(inventory.length, inventorySlots)
        if (inventory.length < inventorySlots && gold > x.price){
            console.log(gold, x.price)
            dispatch(updateInventory([...inventory,x]))
            totalGold -= x.price
            dispatch(updateCharacterGold(totalGold))

        }
        console.log(inventory)
    }

    return (
        <div className="d-flex f-wrap" >
            {trader.potions.map((x,index)=><div  className="potions" onClick={() => buyPotion(x,index)} key={index}>
                <img src={x.image}/>
                <p>Price: {x.price}</p>
                {/*{x.hasOwnProperty("maxDamage") ? <p>Damage: {x.maxDamage}</p> : ""}*/}
                <p>  {x.title}</p>
            </div>)}
        </div>
    );
};

export default Potions;