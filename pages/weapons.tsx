import {NextPage} from "next";
import Layout from "../components/layout";
import {Button, Card, Grid, Loading, Table} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import api from "../util/api";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { faPen } from "@fortawesome/free-solid-svg-icons/faPen";
import EditWeaponModal from "../components/modals/editWeaponModal";

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
              <h1 className="text-xl inline-block">
                Våben
              </h1>
              <Button size="sm" className="float-right" onClick={() => editWeaponModal.current.openModal()}>
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
                      <div>
                        <FontAwesomeIcon icon={faPen} className="pr-2" onClick={() => editWeaponModal.current.openModal(weapon)}/>
                        <FontAwesomeIcon icon={faTrash} className="text-red-600" onClick={() => deleteWeapon(weapon.id)}/>
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