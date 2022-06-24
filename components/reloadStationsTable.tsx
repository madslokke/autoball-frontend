import React, {useEffect} from "react";
import {Card, Spacer, Table, useAsyncList} from "@nextui-org/react";
import api from "../util/api";
import {useCollator} from "@react-aria/i18n";
import {IconButton} from "./iconButton";
import {EditIcon} from "../icons/editIcon";
import {DeleteIcon} from "../icons/deleteIcon";

const ReloadStationsTable = ({teamId}: any) => {


  const collator = useCollator({numeric: true});
  const list = useAsyncList({load: load, sort: sort});

  async function load() {
    const res = await api().get('/api/teams/' + teamId + '/reloadStations');
    return {
      items: res.data,
    };
  }

  async function sort({items, sortDescriptor}: any) {
    return {
      items: items.sort((a: any, b: any) => {
        let first = a[sortDescriptor.column];
        let second = b[sortDescriptor.column];
        let cmp = collator.compare(first, second);
        if (sortDescriptor.direction === "descending") {
          cmp *= -1;
        }
        return cmp;
      }),
    };
  }

  useEffect(() => {
    list.reload();
  }, [teamId])

  return (
    <Card>
      <div>
        <h1 className="text-xl inline-block pt-3 px-3">
          Reload stationer
        </h1>
      </div>
      <Table
        lined
        headerLined
        shadow={false}
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
        aria-label="Reload stations"
        css={{
          height: "auto",
          minWidth: "100%",
          paddingTop: 0
        }}
      >
        <Table.Header>
          <Table.Column key="id" allowsSorting>Id</Table.Column>
          <Table.Column key="name" allowsSorting>Navn</Table.Column>
          <Table.Column key="team_code">Kugler</Table.Column>
          <Table.Column key="actions" width="100">Actions</Table.Column>
        </Table.Header>
        <Table.Body items={list.items} loadingState={list.loadingState}>
          {(item: any) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.id}</Table.Cell>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.bullets}</Table.Cell>
              <Table.Cell>
                <div className="flex flex-row">
                  <IconButton>
                    <EditIcon size={20} fill="#979797"/>
                  </IconButton>
                  <Spacer x={0.3}/>
                  <IconButton>
                    <DeleteIcon size={20} fill="#FF0080"/>
                  </IconButton>
                </div>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </Card>
  )
}

export default ReloadStationsTable;