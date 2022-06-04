import React from "react";
import {Button, Input, Modal, Spacer} from "@nextui-org/react";
import api from "../../util/api";

class CreateTeamModal extends React.Component<{ open: boolean }, any> {

  onSubmit(event: any) {
    event.preventDefault();
    const data: any = {};
    for (let field of event.target) {
      if (field.value) {
        data[field.name] = field.value;
      }
    }


    api().get('/sanctum/csrf-cookie').then(() => {
      api().post('/api/teams', data, {responseType: "json"}).then(result => {
      });
    });
  }

  render() {
    return (
      <Modal open={this.props.open}>
        <form onSubmit={this.onSubmit}>
          <Modal.Header>
            <h1 className="text-2xl">Nyt Hold</h1>
          </Modal.Header>
          <Modal.Body>
            <Input
              clearable
              fullWidth
              name="name"
              size="lg"
              label="Hold Navn"/>
            <Input
              clearable
              fullWidth
              name="email"
              type="email"
              size="lg"
              label="Email"/>
            <div className="flex">
              <Input
                clearable
                fullWidth
                name="playing_field"
                size="lg"
                label="Bane"/>
              <Spacer x={1}></Spacer>
              <Input
                clearable
                fullWidth
                name="start_date"
                type="datetime-local"
                size="lg"
                label="Start Tid"/>
            </div>
            <Input
              clearable
              fullWidth
              name="instructor"
              size="lg"
              label="Instruktør Navn"/>
          </Modal.Body>
          <Modal.Footer>
            <Button auto flat color="error" type="button">
              Luk
            </Button>
            <Button auto type="submit">
              Opret
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    )
  }
}

export default CreateTeamModal
