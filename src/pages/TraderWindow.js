import React from 'react';
import Toolbar from "../components/Toolbar";
import Weapons from "../components/Weapons";
import Potions from "../components/Potions";
import {useState} from "react";
import Inventory from "../components/Inventory";

const TraderWindow = () => {

const [getShop, setShop] = useState(true)

    return (
        <div>
            <Toolbar/>
            <div className="align-c">Trader Window</div>

            <div className="d-flex toolbarTrader">
                <div className="toolbarTrader" onClick={()=>setShop(true)}>Weapons</div>
                <div className="toolbarTrader" onClick={()=>setShop(false)}>Potions</div>
            </div>
<div className="d-flex">
            <div className="w-50">
                {getShop ? <Weapons/> : <Potions/>}
            </div>
            <div className="w-50">
            <Inventory/>
            </div>
</div>
</div>

    );
};

export default TraderWindow;