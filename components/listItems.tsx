import Layout from "../components/layout";
import {Button, Card, Grid, Input, Loading, Spacer, Table} from "@nextui-org/react";
import React from "react";
import api from "../util/api";
import {IconButton} from "./iconButton";
import {DeleteIcon} from "../icons/deleteIcon";
import {EditIcon} from "../icons/editIcon";
import EditItemModal from "../components/modals/editItemModal";

class ListItems extends React.Component<{children: any, resourceName: string, tableFields: any[], editFields: any[]}, {items: any, editItem: any}> {

  editProductModal: any = React.createRef();

  getProducts() {
    api().get('/api/' + this.props.resourceName).then(result => {
      this.setState({items: result.data.data});
    });
  }

  onClose() {
    this.getProducts();
  }

  deleteProduct(id: any) {
    api().delete('/api/' + this.props.resourceName + '/' + id, {responseType: "json"}).then(result => {
      this.getProducts();
    });
  }

  openModal(item?: any) {
    this.setState({editItem: item});
    this.editProductModal.current.openModal(item)
  }

  componentDidMount() {
    this.getProducts()
  }

  render() {
    return (
      <Layout>
        <Grid.Container gap={2} justify="center">
          <Grid xs={12}>
            <Card>
              <div>
                <h1 className="text-xl inline-block pt-3 px-3">
                  Produkter
                </h1>
                <Button size="sm" color="primary" className="float-right mt-3 mx-3" onClick={() => this.openModal()}>
                  <span className="font-bold">Opret produkt</span>
                </Button>
              </div>
              <Table
                lined
                headerLined
                shadow={false}
                css={{
                  height: "auto",
                  minWidth: "100%",
                  paddingTop: 0
                }}
              >
                <Table.Header>
                  <Table.Column width="100">Actions</Table.Column>
                </Table.Header>
                <Table.Body>
                  {this.state.items.map((item: any) => (
                    <Table.Row key={item.id}>
                      <Table.Cell>
                        <div className="flex flex-row">
                          <IconButton onClick={() => this.openModal(item)}>
                            <EditIcon size={20} fill="#979797"/>
                          </IconButton>
                          <Spacer x={0.3}/>
                          <IconButton onClick={() => this.deleteProduct(item.id)}>
                            <DeleteIcon size={20} fill="#FF0080"/>
                          </IconButton>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
              {this.state.items.length === 0 && <Loading/>}
            </Card>
          </Grid>
        </Grid.Container>
        <EditItemModal ref={this.editProductModal} onClose={this.onClose} resourceName="products">
          {this.state.editItem && <p>Kan kun opdater navnet ved allerede eksisterende produkter</p>}
          <Input
            clearable
            fullWidth
            name="name"
            size="lg"
            initialValue={this.state.editItem?.name}
            required
            label="Navn"/>
          <Input
            clearable
            fullWidth
            readOnly={this.state.editItem}
            initialValue={this.state.editItem?.bullets}
            name="bullets"
            size="lg"
            label="Kugler"/>
          <Input
            clearable
            fullWidth
            readOnly={this.state.editItem}
            initialValue={this.state.editItem?.price}
            name="price"
            size="lg"
            label="Pris"/>
        </EditItemModal>
      </Layout>
    )
  }
}

export default ListItems;