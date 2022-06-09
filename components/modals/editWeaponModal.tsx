import React from "react";
import {Button, Input, Modal, Spacer} from "@nextui-org/react";
import api from "../../util/api";

class EditWeaponModal extends React.Component<{ onClose: any }, { open: boolean, weapon?: any }> {

  constructor(props: any) {
    super(props);
    this.state = {
      open: false
    }
  }

  public openModal(weapon?: any) {
    this.setState({
      open: true,
      weapon: weapon
    });
  }

  onSubmit(event: any) {
    event.preventDefault();
    const data: any = {};
    for (let field of event.target) {
      if (field.value) {
        data[field.name] = field.value;
      }
    }
    api().get('/sanctum/csrf-cookie').then(() => {

      if (this.state.weapon) {
        api().put('/api/weapons/' + this.state.weapon.id, data, {responseType: "json"}).then(result => {
          this.setState({open: false});
          for (let field of event.target) {
            field.value = '';
          }
        });
      } else {
        api().post('/api/weapons', data, {responseType: "json"}).then(result => {
          this.setState({open: false});
          for (let field of event.target) {
            field.value = '';
          }
        });
      }
    });
  }

  render() {
    return (
      <Modal open={this.state.open} onClose={() => {this.props.onClose(); this.setState({open: false})}}>
        <form onSubmit={(event) => this.onSubmit(event)}>
          <Modal.Header>
            <h1 className="text-2xl">{this.state.weapon ? 'Opdater våben' : 'Opret våben'}</h1>
          </Modal.Header>
          <Modal.Body>
            <Input
              clearable
              fullWidth
              name="name"
              size="lg"
              initialValue={this.state.weapon?.name}
              required
              label="Navn"/>
            <Input
              clearable
              fullWidth
              initialValue={this.state.weapon?.nfc_id}
              name="nfc_id"
              size="lg"
              label="NFC Id"/>
          </Modal.Body>
          <Modal.Footer>
            <Button auto flat color="error" type="button" onClick={() => this.setState({open: false})}>
              Luk
            </Button>
            <Button auto type="submit">
              {this.state.weapon ? 'Opdater' : 'Opret'}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    )
  }
}

export default EditWeaponModal
