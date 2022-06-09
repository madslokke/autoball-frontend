import React from "react";
import Navbar from "./navbar";

class Layout extends React.Component<any, any> {


  render() {
    return (
      <div>
        <Navbar/>
        <div className="ml-[220px] p-3">
          <h1 className="float-right p-1 pr-4 text-2xl font-light">Sprækkebjerg</h1>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Layout;