import {NextPage} from "next";
import Layout from "../components/layout";
import {Button, Card, Grid, Loading, Spacer, Table} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import api from "../util/api";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import {faPen} from "@fortawesome/free-solid-svg-icons/faPen";
import EditWeaponModal from "../components/modals/editWeaponModal";
import {IconButton} from "../components/iconButton";
import {DeleteIcon} from "../icons/deleteIcon";
import {EditIcon} from "../icons/editIcon";

const Weapons: NextPage = () => {

  const [weapons, setWeapons] = useState([]);

  const editWeaponModal: any = React.createRef();

  const getWeapons = () => {
    api().get('/api/weapons').then(result => {
      setWeapons(result.data.data);
    });
  }

  const onClose = () => {
    getWeapons();
  }

  const deleteWeapon = (id: any) => {
    api().delete('/api/weapons/' + id, {responseType: "json"}).then(result => {
      getWeapons();
    });
  }

  useEffect(() => {
    getWeapons()
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
              <Button size="sm" className="float-right mt-3 mx-3" onClick={() => editWeaponModal.current.openModal()}>
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
                {weapons.map((weapon: any) => (
                  <Table.Row key={weapon.id}>
                    <Table.Cell>{weapon.id}</Table.Cell>
                    <Table.Cell>{weapon.name}</Table.Cell>
                    <Table.Cell>{weapon.nfc_id}</Table.Cell>
                    <Table.Cell>
                      <div className="flex flex-row">
                        <IconButton onClick={() => editWeaponModal.current.openModal(weapon)}>
                          <EditIcon size={20} fill="#979797"/>
                        </IconButton>
                        <Spacer x={0.3}/>
                        <IconButton onClick={() => deleteWeapon(weapon.id)}>
                          <DeleteIcon size={20} fill="#FF0080"/>
                        </IconButton>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            {weapons.length === 0 && <Loading/>}
          </Card>
        </Grid>
      </Grid.Container>
      <EditWeaponModal ref={editWeaponModal} onClose={onClose}/>
    </Layout>
  )
}

export default Weapons;