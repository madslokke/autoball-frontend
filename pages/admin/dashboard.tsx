import {NextPage} from "next";
import Layout from "../../components/layout";
import {Card, Grid, Input, Spacer, Table, useAsyncList} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import {isLoggedIn, logOut} from "../../util/auth";
import CreateTeamModal from "../../components/modals/createTeamModal";
import ReloadStationsTable from "../../components/reloadStationsTable";
import api from "../../util/api";
import {useCollator} from "@react-aria/i18n";
import {useRouter} from "next/router";
import Moment from "react-moment";

const TeamsList = ({title, teams}: any) => {
  const collator = useCollator({numeric: true});
  const list = useAsyncList({load: load, sort: sort});
  const router = useRouter();

  useEffect(() => list.reload(), [teams]);

  async function load() {

    return {
      items: teams ?? [],
    };
  }

  const openTeam = (team: any) => {
    router.push('/admin/teams/' + team.currentKey)
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

  return (
    <>
      <h1 className="text-xl pt-3 px-3">{title}</h1>
      <Table
        lined
        headerLined
        shadow={false}
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
        onSelectionChange={openTeam}
        selectionMode="single"
        aria-label="Example static collection table"
        css={{
          height: "auto",
          minWidth: "100%",
          paddingTop: 0
        }}
      >
        <Table.Header>
          <Table.Column allowsSorting key="name">Hold navn</Table.Column>
          <Table.Column allowsSorting key="start_date">Start tid</Table.Column>
          <Table.Column allowsSorting key="playing_field">Bane</Table.Column>
        </Table.Header>
        <Table.Body items={list.items} loadingState={list.loadingState}>
          {(item: any) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell><Moment format="DD/MM/YYYY HH:mm">{item.start_date}</Moment></Table.Cell>
              <Table.Cell>{item.playing_field.name}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </>
  )
}

const Dashboard: NextPage = () => {

  const [teams, setTeams] = useState<any>();

  useEffect(() => {
    api().get('/api/teams').then(data => {
      setTeams(data.data);
    })
  }, [])

  if (!isLoggedIn()) {
    logOut();
  }

  const createTeamModal: any = React.createRef();

  return (
    <Layout>
      <Grid.Container gap={2} justify="center">
        <Grid sm={7} xs={12}>
          <div className="flex flex-col flex-auto">
            <Card>
              <TeamsList title="Aktive og kommende hold" teams={teams?.filter((team: any) => (team.status === 1 || team.status === 2))}/>
            </Card>
            <Spacer/>
            <Card className="flex-grow">
              <TeamsList title="Betaling mangler" teams={teams?.filter((team: any) => (team.status === 3))}/>
            </Card>
          </div>
        </Grid>
        <Grid sm={5} xs={12}>
          <div className="flex flex-col flex-auto">
            <Card isPressable isHoverable onClick={() => createTeamModal.current.openModal()} className="!p-6 !bg-green-500">
              <h1 className="text-3xl text-center text-white">Opstart Nyt Hold</h1>
            </Card>
            <Spacer/>
            <ReloadStationsTable/>
          </div>
        </Grid>
      </Grid.Container>
      <CreateTeamModal createTeamModal={createTeamModal}/>
    </Layout>
  )
}

export default Dashboard;