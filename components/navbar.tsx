import React from "react";
import NavItem from "./navItem";
import {logOut} from "../util/auth";


class Navbar extends React.Component<any, any> {

  render() {
    return (
      <div className="fixed h-[100vh] w-[220px] text-white" style={{backgroundColor: '#46662E'}}>
        <h1 className="text-center text-2xl p-5">AUTOBALL</h1>
        <NavItem title="Dashboard" link="/dashboard"/>
        <NavItem title="Hold" link="/teams"/>
        <NavItem title="Våben" link="/weapons"/>
        <NavItem title="Produkter" link="/products"/>
        <NavItem title="Brugere" link="/users"/>
        <NavItem title="Logout" onClick={() => logOut()}/>
      </div>
    );
  }
}

export default Navbar