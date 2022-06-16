import React from "react";
import {Input, Spacer} from "@nextui-org/react";
import EditItemModal from "./editItemModal";
import DropdownPlayingFields from "../dropdownPlayingFields";

class CreateTeamModal extends React.Component<{ createTeamModal: any, onClose: any }, { selectedPlayingField: any }> {
  render() {
    return (
      <EditItemModal
        ref={this.props.createTeamModal}
        onClose={this.props.onClose}
        resourceName="teams"
        getFieldData={() => (
          {'playing_field_id': this.state.selectedPlayingField.currentKey}
        )}>
        <Input
          clearable
          fullWidth
          name="name"
          size="lg"
          required
          label="Hold Navn"/>
        <Input
          clearable
          fullWidth
          name="email"
          type="email"
          size="lg"
          label="Email"/>
        <Input
          required
          clearable
          fullWidth
          name="start_date"
          type="datetime-local"
          size="lg"
          label="Start Tid"/>
        <Input
          clearable
          fullWidth
          name="instructor"
          size="lg"
          label="Instruktør Navn"/>
        <DropdownPlayingFields
          selected={this.state?.selectedPlayingField}
          onSelcted={(value: any) => this.setState({selectedPlayingField: value})}/>
      </EditItemModal>
    )
  }
}

export default CreateTeamModal;