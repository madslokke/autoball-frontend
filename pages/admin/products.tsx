import {NextPage} from "next";
import Layout from "../../components/layout";
import {Button, Card, Grid, Input, Loading, Spacer, Table} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import api from "../../util/api";
import {IconButton} from "../../components/iconButton";
import {DeleteIcon} from "../../icons/deleteIcon";
import {EditIcon} from "../../icons/editIcon";
import EditItemModal from "../../components/modals/editItemModal";

const Products: NextPage = () => {

  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState<any>([]);

  const editItemModal: any = React.createRef();

  const getItems = () => {
    api().get('/api/products').then(result => {
      setItems(result.data.data);
    });
  }

  const onClose = () => {
    getItems();
  }

  const openModal = (item?: any) => {
    setEditItem(item);
    editItemModal.current.openModal(item)
  }

  const deleteItem = (id: any) => {
    api().delete('/api/products/' + id, {responseType: "json"}).then(result => {
      getItems();
    });
  }

  useEffect(() => {
    getItems()
  }, []);
  return (
    <Layout>
      <Grid.Container gap={2} justify="center">
        <Grid xs={12}>
          <Card>
            <div>
              <h1 className="text-xl inline-block pt-3 px-3">
                Produkter
              </h1>
              <Button size="sm" color="primary" className="float-right mt-3 mx-3" onClick={() => openModal()}>
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
                <Table.Column>Id</Table.Column>
                <Table.Column>Navn</Table.Column>
                <Table.Column>Kugler</Table.Column>
                <Table.Column>Pris</Table.Column>
                <Table.Column width="100">Actions</Table.Column>
              </Table.Header>
              <Table.Body>
                {items.map((product: any) => (
                  <Table.Row key={product.id}>
                    <Table.Cell>{product.id}</Table.Cell>
                    <Table.Cell>{product.name}</Table.Cell>
                    <Table.Cell>{product.bullets}</Table.Cell>
                    <Table.Cell>{product.price} kr</Table.Cell>
                    <Table.Cell>
                      <div className="flex flex-row">
                        <IconButton onClick={() => openModal(product)}>
                          <EditIcon size={20} fill="#979797"/>
                        </IconButton>
                        <Spacer x={0.3}/>
                        <IconButton onClick={() => deleteItem(product.id)}>
                          <DeleteIcon size={20} fill="#FF0080"/>
                        </IconButton>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            {items.length === 0 && <Loading/>}
          </Card>
        </Grid>
      </Grid.Container>
      <EditItemModal ref={editItemModal} onClose={onClose} resourceName="products">
        {editItem && <p>Kan kun opdater navnet ved allerede eksisterende produkter</p>}
        <Input
          clearable
          fullWidth
          name="name"
          size="lg"
          initialValue={editItem?.name}
          required
          label="Navn"/>
        <Input
          clearable
          fullWidth
          readOnly={editItem}
          initialValue={editItem?.bullets}
          name="bullets"
          size="lg"
          label="Kugler"/>
        <Input
          clearable
          fullWidth
          readOnly={editItem}
          initialValue={editItem?.price}
          name="price"
          size="lg"
          label="Pris"/>
      </EditItemModal>
    </Layout>
  )
}

export default Products;