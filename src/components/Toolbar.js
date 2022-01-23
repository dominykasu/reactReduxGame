import React from 'react';
import {Link, useLocation} from "react-router-dom";
const Toolbar = () => {
    let location = useLocation()
    // console.log(location.pathname)

    return (
        <div className="toolbar">
            { location.pathname === "/main" && <Link to="/shop">Shop</Link> }
            { location.pathname === "/shop" &&  <Link to="/main">Main</Link> }
            <Link to="/arena">Arena</Link>
        </div>
    );
};

export default Toolbar;