import React from "react";
import {Button, Input, Modal, Spacer} from "@nextui-org/react";
import api from "../../util/api";

class EditItemModal extends React.Component<{ onClose?: any, children: any, resourceName: string, getFieldData?: any }, { open: boolean, item?: any }> {

  constructor(props: any) {
    super(props);
    this.state = {
      open: false
    }
  }

  public openModal(product?: any) {
    this.setState({
      open: true,
      item: product
    });
  }

  onSubmit(event: any) {
    event.preventDefault();
    const data: any = this.props.getFieldData ? this.props.getFieldData() : {};
    for (let field of event.target) {
      if (field.value) {
        data[field.name] = field.value;
      }
    }
    api().get('/sanctum/csrf-cookie').then(() => {

      if (this.state.item) {
        api().put('/api/' + this.props.resourceName + '/' + this.state.item.id, data, {responseType: "json"}).then(result => {
          this.setState({open: false});
          for (let field of event.target) {
            field.value = '';
          }
        });
      } else {
        api().post('/api/' + this.props.resourceName, data, {responseType: "json"}).then(result => {
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
      <Modal open={this.state.open} onClose={() => {this.props.onClose && this.props.onClose(); this.setState({open: false})}}>
        <form onSubmit={(event) => this.onSubmit(event)}>
          <Modal.Header>
            <h1 className="text-2xl">{this.state.item ? 'Opdater' : 'Opret'}</h1>
          </Modal.Header>
          <Modal.Body>
            {this.props.children}
          </Modal.Body>
          <Modal.Footer>
            <Button auto flat color="error" type="button" onClick={() => this.setState({open: false})}>
              Luk
            </Button>
            <Button auto type="submit">
              {this.state.item ? 'Opdater' : 'Opret'}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    )
  }
}

export default EditItemModal
