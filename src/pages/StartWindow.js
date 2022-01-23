import React from 'react';
import {useDispatch} from "react-redux";
import {updateCharacter} from "../features/character";
import { useNavigate } from 'react-router';
const StartWindow = ({characters}) => {


    const dispatch = useDispatch()
    let navigate = useNavigate();

    function selectCharacter(char) {
        dispatch(updateCharacter(char))
        navigate('/main')
    }

    return (
<div>
    <h1 className="align-c">Select your class</h1>
        <div className="d-flex f-wrap">

            {characters.map((x,index) =>

                <div className="align-c mainCard" onClick={() => selectCharacter(x)} key={index}>
                    <img src={x.image}/>
                    <h1>{x.race}</h1>
                    <p>Damage: {x.damage}</p>
                    <p>Health: {x.health}</p>
                    <p>Energy: {x.energy}</p>
                    <p>Stamina: {x.stamina}</p>
                    <p>Strength: {x.strength}</p>
                    <p>Inventory Slots: {x.inventorySlots}</p>
                    <p>Starting Gold: {x.gold}</p>

                </div>)}
        </div>
</div>
    );
};

export default StartWindow;