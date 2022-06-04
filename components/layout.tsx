import React from "react";
import Navbar from "./navbar";

class Layout extends React.Component<any, any> {


  render() {
    return (
      <div>
        <Navbar/>
        <div className="ml-[220px] p-3">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Layout;