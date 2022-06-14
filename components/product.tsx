import React from "react";
import {Card} from "@nextui-org/react";

class Product extends React.Component<{ product: any, selected: boolean, onClick: any }, any> {

  render() {
    return (
      <Card
        variant="flat"
        isPressable
        isHoverable
        onClick={this.props.onClick}
        className={this.props.selected ? '!bg-green-500' : ''}
      >
        <div className={"py-2 px-4 flex items-center" + (this.props.selected ? ' text-white' : '')}>
          <div className="flex-grow">
            <p className="text-2xl">{this.props.product.name}</p>
            <p>{this.props.product.bullets} Kugler</p>
          </div>
          <div>
            <p className="text-xl">{this.props.product.price} Kr</p>
          </div>
        </div>
      </Card>
    )
  }
}

export default Product