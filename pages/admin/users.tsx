import {NextPage} from "next";
import Layout from "../../components/layout";
import {Button, Card, Dropdown, Grid, Input, Loading, Spacer, Table} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import api from "../../util/api";
import {IconButton} from "../../components/iconButton";
import {DeleteIcon} from "../../icons/deleteIcon";
import {EditIcon} from "../../icons/editIcon";
import EditItemModal from "../../components/modals/editItemModal";

const Users: NextPage = () => {

  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState<any>([]);

  const [roles, setRoles] = useState<any>([]);
  const [selectedRole, setSelectedRole] = useState('');

  const editItemModal: any = React.createRef();

  const getItems = () => {
    api().get('/api/users').then(result => {
      setItems(result.data);
    });
  }

  const onClose = () => {
    getItems();
  }

  const onSave = (event: any, data: any) => {
    data.role_id = (selectedRole as any).currentKey;
    return api().post('/api/invite', data, {responseType: "json"}).then(result => {
      for (let field of event.target) {
        field.value = '';
      }
    });
  }

  const openModal = (item?: any) => {
    setEditItem(item);
    editItemModal.current.openModal(item)
  }

  const deleteItem = (id: any) => {
    api().delete('/api/users/' + id, {responseType: "json"}).then(result => {
      getItems();
    });
  }

  const getRole = (selectedRole: any) => {
    return (roles.find((data: any) => {
      return data.id === +selectedRole.currentKey;
    }) as any)?.name;
  }

  const getRoles = () => {
    api().get('/api/roles').then(result => {
      setRoles(result.data);
    });
  }

  useEffect(() => {
    getItems();
    getRoles();
  }, []);
  return (
    <Layout>
      <Grid.Container gap={2} justify="center">
        <Grid xs={12}>
          <Card>
            <div>
              <h1 className="text-xl inline-block pt-3 px-3">
                Brugere
              </h1>
              <Button size="sm" className="float-right mt-3 mx-3" onClick={() => openModal()}>
                <span className="font-bold">Inviter bruger</span>
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
                <Table.Column>Email</Table.Column>
                <Table.Column>Rolle</Table.Column>
                <Table.Column width="100">Actions</Table.Column>
              </Table.Header>
              <Table.Body>
                {items?.map((weapon: any) => (
                  <Table.Row key={weapon.id}>
                    <Table.Cell>{weapon.id}</Table.Cell>
                    <Table.Cell>{weapon.name}</Table.Cell>
                    <Table.Cell>{weapon.email}</Table.Cell>
                    <Table.Cell>{weapon.role.name}</Table.Cell>
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
      <EditItemModal ref={editItemModal} onClose={onClose} resourceName="users" onSave={(event, data) => onSave(event, data)}>
        <Input
          clearable
          fullWidth
          name="email"
          size="lg"
          type="email"
          initialValue={editItem?.email}
          readOnly={editItem?.id}
          required
          label="Email"/>
        <Dropdown>
          <Dropdown.Button flat>
            {selectedRole ? getRole(selectedRole) : 'Vælg rolle'}
          </Dropdown.Button>
          <Dropdown.Menu
            items={roles}
            selectionMode="single"
            selectedKeys={selectedRole}
            onSelectionChange={(value: any) => setSelectedRole(value)}
          >
            {(item: any) => (
              <Dropdown.Item
                key={item.id}
              >
                {item.name}
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </EditItemModal>
    </Layout>
  )
}

export default Users;