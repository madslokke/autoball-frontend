import React from "react";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight} from "@fortawesome/free-solid-svg-icons/faAngleRight";

class NavItem extends React.Component<{ title: string, link?: string, onClick?: any }, any> {

  render() {
    return (
      <Link href={this.props.link ?? ''} onClick={this.props.onClick}>
        <div className="p-2.5 pl-5 border-t-white border-t-[1px] last:border-b-white last:border-b-[1px] cursor-pointer">
          <span className="text-xl">{this.props.title}</span>
          <FontAwesomeIcon icon={faAngleRight} className="float-right" style={{fontSize: '28px'}}/>
        </div>
      </Link>
    )
  }
}

export default NavItem