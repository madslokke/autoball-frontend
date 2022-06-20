import {NextPage} from "next";
import Layout from "../../../components/layout";
import React from "react";
import api from "../../../util/api";
import {Button, Card, Grid, Table, useAsyncList} from "@nextui-org/react";
import CreateTeamModal from "../../../components/modals/createTeamModal";
import {useCollator} from '@react-aria/i18n'
import {useRouter} from "next/router";


const Index: NextPage = () => {

  const collator = useCollator({ numeric: true });

  const router = useRouter();
  const createTeamModal: any = React.createRef();

  const onClose = () => {
    list.reload();
  }

  const getStatus = (status: number) => {
    if (status === 1) {
      return 'Planlagt';
    }
    if (status === 2) {
      return 'I gang';
    }
    if (status === 3) {
      return 'Mangler betaling';
    }
    if (status === 4) {
      return 'Afsluttet';
    }
    if (status === 5) {
      return 'Aflyst';
    }
    return 'Ukendt status';
  }

  const openModal = (item?: any) => {
    createTeamModal.current.openModal(item)
  }

  const openTeam = (team: any) => {
    router.push('/admin/teams/' + team.currentKey)
  }

  async function load() {
    const res = await api().get('/api/teams');
    return {
      items: res.data,
    };
  }
  const list = useAsyncList({ load, sort });
  async function sort({ items, sortDescriptor }: any) {
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
  return (
    <Layout>
      <Grid.Container gap={2} justify="center">
        <Grid xs={12}>
          <Card>
            <div>
              <h1 className="text-xl inline-block pt-3 px-3">
                Hold
              </h1>
              <Button size="sm" className="float-right mt-3 mx-3" onClick={() => openModal()}>
                <span className="font-bold">Opret hold</span>
              </Button>
            </div>
            <Table
              lined
              headerLined
              shadow={false}
              sortDescriptor={list.sortDescriptor}
              onSortChange={list.sort}
              onSelectionChange={openTeam}
              selectionMode="single"
              aria-label="Teams"
              css={{
                height: "auto",
                minWidth: "100%",
                paddingTop: 0
              }}
            >
              <Table.Header>
                <Table.Column key="id" allowsSorting>Id</Table.Column>
                <Table.Column key="name" allowsSorting>Navn</Table.Column>
                <Table.Column key="team_code">Hold nummer</Table.Column>
                <Table.Column key="playing_field">Bane</Table.Column>
                <Table.Column key="start_date" allowsSorting>Start tidspunkt</Table.Column>
                <Table.Column key="status" allowsSorting>Status</Table.Column>
              </Table.Header>
              <Table.Body items={list.items} loadingState={list.loadingState}>
                {(item: any) => (
                  <Table.Row key={item.id}>
                    <Table.Cell>{item.id}</Table.Cell>
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>{item.team_code}</Table.Cell>
                    <Table.Cell>{item.playing_field?.name}</Table.Cell>
                    <Table.Cell>{item.start_date}</Table.Cell>
                    <Table.Cell>{getStatus(item.status)}</Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </Card>
        </Grid>
      </Grid.Container>
      <CreateTeamModal createTeamModal={createTeamModal} onClose={onClose}/>
    </Layout>
  )
}

export default Index;
