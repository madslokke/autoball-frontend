import {Card, Grid, Loading, Spacer, Table} from "@nextui-org/react"
import {useEffect, useState } from "react";
import { DeleteIcon } from "../icons/deleteIcon"
import api from "../util/api";
import { IconButton } from "./iconButton"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpRightFromSquare} from "@fortawesome/free-solid-svg-icons/faArrowUpRightFromSquare";

const UserInvitesTable = () => {

  const [items, setItems] = useState([]);

  const getItems = () => {
    api().get('/api/invites').then(result => {
      setItems(result.data);
    });
  }

  const deleteItem = (id: any) => {
    api().delete('/api/invites/' + id, {responseType: "json"}).then(result => {
      getItems();
    });
  }

  useEffect(() => {
    getItems();
  }, []);

  return (
    <Grid xs={12}>
      <Card>
        <div>
          <h1 className="text-xl inline-block pt-3 px-3">
            Invitationer
          </h1>
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
            <Table.Column>Email</Table.Column>
            <Table.Column>Rolle</Table.Column>
            <Table.Column width="100">Actions</Table.Column>
          </Table.Header>
          <Table.Body>
            {items?.map((invite: any) => (
              <Table.Row key={invite.id}>
                <Table.Cell>{invite.id}</Table.Cell>
                <Table.Cell>{invite.email}</Table.Cell>
                <Table.Cell>{invite.role.name}</Table.Cell>
                <Table.Cell>
                  <div className="flex flex-row">
                    <a href={"https://app.autoball.dk/admin/register?token=" + invite.token} target="_blank" rel="noreferrer">
                      <IconButton>
                        <FontAwesomeIcon style={{color: "#979797", fontSize: 20}} icon={faArrowUpRightFromSquare}/>
                      </IconButton>
                    </a>
                    <Spacer x={0.3}/>
                    <IconButton onClick={() => deleteItem(invite.id)}>
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
  )
}

export default UserInvitesTable;