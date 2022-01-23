import React from 'react';
import Toolbar from "../components/Toolbar";

import Inventory from "../components/Inventory";
import CharacterInfo from "../components/CharacterInfo";
const MainWindow = () => {



    return (
        <div>
           <Toolbar/>
            <div className="d-flex sp-ar">
                <CharacterInfo/>
                <Inventory/>
            </div>

        </div>
    );
};

export default MainWindow;