import React, {useContext} from 'react';
import context from "../context/context";
import {useNavigate} from "react-router";
import {useState} from "react";
import {useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";
import {updateInventory} from "../features/inventory";
import {updateWeapon} from "../features/weapon";

import Inventory from "./Inventory";
const EnemyArena = () => {
    let navigate = useNavigate();
    const {monsters} = useContext(context)
const [getMonster, setMonster] = useState({})
const [getEnemyButton, setEnemyButton] = useState(true)
const [getKilled, setKilled] = useState(false)
    const [getMonsterHp, setMonsterHp] = useState(0)
const [getPlayerHp, setPlayerHp] = useState(0)
    const character = useSelector((state)=> state.character.value)
    const weapon = useSelector((state)=> state.weapon.value)
    let inventory = useSelector((state)=> state.inventory.value)


    const dispatch = useDispatch()


    let monsterDamage = getMonster.maxDamage
    let playerDamage = character.damage



    function selectMonster(){
        let randomNum = Math.floor(Math.random() * 39);
        setMonster(monsters[randomNum])

        setEnemyButton(false)
        setKilled(false)
setPlayerHp(character.health)
setItems([])
        setPlayerHpPercent(100)


    }
    function selectAnotherMonster(){
        let randomNum = Math.floor(Math.random() * 39);
        setMonster(monsters[randomNum])

        setEnemyButton(false)
        setKilled(false)

        setItems([])
        setPlayerHpPercent(100)


    }

    useEffect(()=>{
        setMonsterHp(getMonster.health)
    },[getMonster])


const [getPlayerHpPercent, setPlayerHpPercent] = useState(100)
    const [getMonsterHpPercent, setMonsterHpPercent] = useState(100)
const [getPlayerEnergy, setPlayerEnergy] = useState(character.energy)


    function attackMonster(){

        if(Object.keys(weapon).length === 0){

            let critChance = character.strength

            if (Math.round(Math.random()*100) <= critChance){
                setMonsterHp(getMonsterHp - (playerDamage*3))
                console.log("CRIT")
            } else {
                setMonsterHp(getMonsterHp - playerDamage)
            }


            setPlayerHp(getPlayerHp - monsterDamage)


            let playerPercentDamage = playerDamage /  getMonster.health * 100
            setPlayerHpPercent( getPlayerHpPercent - playerPercentDamage)

            let monsterPercentDamage = monsterDamage / character.health * 100
            setMonsterHpPercent(getMonsterHpPercent - monsterPercentDamage)


        }
        if(Object.keys(weapon).length > 0){
            let weaponDmg =  playerDamage + Math.round(Math.random()*weapon.maxDamage)
            if( getPlayerEnergy >= weapon.energyPerHit ){

                let critChance = character.strength

                if (Math.round(Math.random()*100) <= critChance){
                    console.log("CRIT")
                    setMonsterHp(getMonsterHp - (weaponDmg*3))
                    console.log(getMonsterHp)
                } else {
                    setMonsterHp(getMonsterHp - playerDamage)
                }

            // setMonsterHp(getMonsterHp - weaponDmg)
            setPlayerHp(getPlayerHp - monsterDamage)

            setPlayerEnergy(getPlayerEnergy - weapon.energyPerHit + character.stamina)
            console.log(weaponDmg)
            let playerPercentDamage = weaponDmg /  getMonster.health * 100
            setPlayerHpPercent( getPlayerHpPercent - playerPercentDamage)

            let monsterPercentDamage = monsterDamage / character.health * 100
            setMonsterHpPercent(getMonsterHpPercent - monsterPercentDamage)
            } else {
                console.log("not enough energy")
            }
        }





        if (getMonsterHp <= 0){
            setKilled(true)
            setEnemyButton(false)
            playerWin()
        }
        if (getPlayerHp <= 0 ) {
            console.log("player died")
            navigate("/")
            setItems([])
            dispatch(updateInventory([]))
            dispatch(updateWeapon([]))
        }
    }

    const [getItems,setItems] = useState([])

    const {dropItems} = useContext(context)

function putDropToInventory(x){
    if (inventory.length < character.inventorySlots){
        dispatch(updateInventory([...inventory,x]))
        setItems(getItems.filter(y => y !== x))
    }
}

function playerWin() {
    let drops = [];
    for (let i = 0; i < getMonster.maxItemsDrop; i++) {
        let randomDropNum = Math.round(Math.random()*10)
        let selectRandomDrop = Math.round(Math.random()*79)

        if (randomDropNum > 5) {
            console.log(randomDropNum)
            drops.push(dropItems[selectRandomDrop]);
            console.log("items dropped")

        }
    }
setItems(drops)

}


    const containerStyles = {
        height: 20,
        width: '100%',
        backgroundColor: "#e0e0de",
        borderRadius: 50,

    }

    const fillerStylesPlayer = {
        height: '100%',
        width: `${Math.round(getPlayerHpPercent)}%`,
        backgroundColor: "red",
        borderRadius: 'inherit',
        textAlign: 'right'
    }
    const fillerStylesMonster = {
        height: '100%',
        width: `${Math.round(getMonsterHpPercent)}%`,
        backgroundColor: "red",
        borderRadius: 'inherit',
        textAlign: 'right'
    }

    const labelStyles = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold'
    }

function yourHp(myWeapon){

        if(myWeapon.title.includes("Health")){

    let totalHp = getPlayerHp
    totalHp += myWeapon.effect.health

    setPlayerHp(totalHp)

    let monsterPercentDamage = myWeapon.effect.health / character.health * 100
    setMonsterHpPercent(getMonsterHpPercent + monsterPercentDamage)
        } else {
            setPlayerEnergy(getPlayerEnergy + myWeapon.effect.energy)
        }
}


    return (
        <div>
        <div className="d-flex  sp-ar">
            <div className="column3 align-c">
                <div>Your Hp</div>
                {getPlayerHp}
                <div style={containerStyles}>
                    <div style={fillerStylesMonster}>
                        <span style={labelStyles}>{`${Math.round(getMonsterHpPercent)}%`}</span>
                    </div>
                </div>
<div className="align-l">

            <div>Your Energy</div>
    {getPlayerEnergy}
</div>
                <div>Enemy Hp</div>
                {getMonsterHp}
                <div style={containerStyles}>
                    <div style={fillerStylesPlayer}>
                        <span style={labelStyles}>{`${Math.round(getPlayerHpPercent)}%`}</span>
                    </div>
                </div>
                <div className="arenaButtons">
                    {getEnemyButton ? <button onClick={selectMonster}>Find Enemy</button> : ""}
                    {!getKilled  && !getEnemyButton?  <button onClick={attackMonster}>Attack Monster</button> : ""}
                    {getKilled ? <div><button onClick={() => {navigate("/shop")}}>Back to shop</button><button onClick={selectAnotherMonster}>New Monster</button></div> : ""}
                </div>
            </div>


            {getEnemyButton ? "" : <div className="align-c">
<h1>Monster</h1>
                <img src={getMonster.image}/>

                <h1>{getMonster.name}</h1>
                <p>Health: {getMonster.health}</p>
                <p>Max Damage:{getMonster.maxDamage}</p>
                <p>Max Items:{getMonster.maxItemsDrop}</p>
            </div>}



        </div>
            <h1>Monster Drops:</h1>
            <div className="d-flex">
            {getItems.map((x,index)=><div className="monsterDropsCard" onClick={() => putDropToInventory(x)} key={index}>
                <img src={x.image}/>
                <p>{x.price}</p>
            </div>)}
            </div>
            <Inventory yourHp={yourHp}/>
        </div>
    );
};

export default EnemyArena;