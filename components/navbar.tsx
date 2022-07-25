import React from "react";
import NavItem from "./navItem";
import {logOut} from "../util/auth";


class Navbar extends React.Component<any, any> {

  render() {
    return (
      <div className="fixed h-[100vh] w-[220px] text-white" style={{backgroundColor: '#46662E'}}>
        <h1 className="text-center text-2xl p-5">AUTOBALL</h1>
        <NavItem title="Dashboard" link="/admin/dashboard"/>
        <NavItem title="Hold" link="/admin/teams"/>
        <NavItem title="Våben" link="/admin/weapons"/>
        <NavItem title="Produkter" link="/admin/products"/>
        <NavItem title="Reload stationer" link="/admin/reloadStations"/>
        <NavItem title="Baner" link="/admin/playingFields"/>
        <NavItem title="Brugere" link="/admin/users"/>
        {/*<NavItem title="Statistik" link="/admin/statistics"/>*/}
        <NavItem title="Logout" onClick={() => logOut()}/>
      </div>
    );
  }
}

export default Navbar