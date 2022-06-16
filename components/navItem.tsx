import React from "react";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight} from "@fortawesome/free-solid-svg-icons/faAngleRight";

class NavItem extends React.Component<{ title: string, link?: string, onClick?: any}, any> {

  render() {
    return (
      <div className="p-2.5 pl-5 border-t-white border-t-[1px] last:border-b-white last:border-b-[1px]">
        {
          this.props.link ?
            <Link href={this.props.link}>
              <a className="text-xl">
                {this.props.title}
                <FontAwesomeIcon icon={faAngleRight} className="float-right" style={{fontSize: '28px'}}/>
              </a>
            </Link>
            :
            <a className="text-xl" onClick={this.props.onClick}>
              {this.props.title}
              <FontAwesomeIcon icon={faAngleRight} className="float-right" style={{fontSize: '28px'}}/>
            </a>
        }
      </div>
    )
  }
}

export default NavItem