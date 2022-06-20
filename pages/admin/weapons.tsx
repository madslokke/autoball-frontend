import {NextPage} from "next";
import Layout from "../../components/layout";
import {Button, Card, Grid, Input, Loading, Spacer, Table} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import api from "../../util/api";
import {IconButton} from "../../components/iconButton";
import {DeleteIcon} from "../../icons/deleteIcon";
import {EditIcon} from "../../icons/editIcon";
import EditItemModal from "../../components/modals/editItemModal";

const Weapons: NextPage = () => {

  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState<any>([]);

  const editItemModal: any = React.createRef();

  const getItems = () => {
    api().get('/api/weapons').then(result => {
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
    api().delete('/api/weapons/' + id, {responseType: "json"}).then(result => {
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
                Våben
              </h1>
              <Button size="sm" className="float-right mt-3 mx-3" onClick={() => openModal()}>
                <span className="font-bold">Opret våben</span>
              </Button>
            </div>
            <Table
              lined
              headerLined
              shadow={false}
              aria-label="Example static collection table"
              css={{
                height: "auto",
                minWidth: "100%",
                paddingTop: 0
              }}
            >
              <Table.Header>
                <Table.Column>Id</Table.Column>
                <Table.Column>Navn</Table.Column>
                <Table.Column>NFC Id</Table.Column>
                <Table.Column width="100">Actions</Table.Column>
              </Table.Header>
              <Table.Body>
                {items.map((weapon: any) => (
                  <Table.Row key={weapon.id}>
                    <Table.Cell>{weapon.id}</Table.Cell>
                    <Table.Cell>{weapon.name}</Table.Cell>
                    <Table.Cell>{weapon.nfc_id}</Table.Cell>
                    <Table.Cell>
                      <div className="flex flex-row">
                        <IconButton onClick={() => openModal(weapon)}>
                          <EditIcon size={20} fill="#979797"/>
                        </IconButton>
                        <Spacer x={0.3}/>
                        <IconButton onClick={() => deleteItem(weapon.id)}>
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
      <EditItemModal ref={editItemModal} onClose={onClose} resourceName="weapons">
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
          initialValue={editItem?.nfc_id}
          name="nfc_id"
          size="lg"
          label="NFC Id"/>
      </EditItemModal>
    </Layout>
  )
}

export default Weapons;