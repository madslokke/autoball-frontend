import React from "react";
import {Dropdown} from "@nextui-org/react";
import api from "../util/api";

class DropdownPlayingFields extends React.Component<{ selected: any, onSelcted: any }, {playingFields: any}> {

  state = {
    playingFields: []
  };

  componentDidMount() {
    this.getPlayingFields();
  }

  getPlayingFields = () => {
    api().get('/api/playingFields').then(result => {
      this.setState({playingFields: result.data.data});
    });
  }

  getSelectedPlayingField = () => {
    return (this.state.playingFields.find((playingField: any) => playingField.id === this.props.selected.currentKey) as any)?.name;
  }

  render() {
    return (
      <Dropdown>
        <Dropdown.Button flat>
          {this.props.selected ? this.getSelectedPlayingField() : 'Vælg bane'}
        </Dropdown.Button>
        <Dropdown.Menu
          items={this.state.playingFields}
          selectionMode="single"
          selectedKeys={this.props.selected}
          onSelectionChange={(value) => this.props.onSelcted(value)}
        >
          {(item: any) => (
            <Dropdown.Item
              key={item.key}
            >
              {item.name}
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

export default DropdownPlayingFields;