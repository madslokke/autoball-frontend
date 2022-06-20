import React from "react";
import Navbar from "./navbar";
import api from "../util/api";

class Layout extends React.Component<any, {me: any}> {

  componentDidMount() {
    api().get('/api/me').then(data => {
      this.setState({me: data.data});
    })
  }

  render() {
    return (
      <div>
        <Navbar/>
        <div className="ml-[220px] p-3">
          <h1 className="float-right p-1 pr-4 text-2xl font-light">{this.state?.me.company.name}</h1>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Layout;