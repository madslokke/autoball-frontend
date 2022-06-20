import {NextPage} from "next";
import Layout from "../../../components/layout";
import {useRouter} from "next/router";
import {Button, Card, Grid, Loading, Spacer, Table, Tooltip, useAsyncList} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import {useCollator} from "@react-aria/i18n";
import api from "../../../util/api";
import ReloadStationsTable from "../../../components/reloadStationsTable";
import {IconButton} from "../../../components/iconButton";
import {EditIcon} from "../../../icons/editIcon";
import {DeleteIcon} from "../../../icons/deleteIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";

const Team: NextPage = () => {

  const router = useRouter();
  const {teamId} = router.query;

  const [team, setTeam] = useState<any>();

  const collator = useCollator({numeric: true});

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

  const addBullets = (nfcId: any) => {
    api().post('/api/players/weapons/' + nfcId + '/refill').then(data => {
      list.reload();
    })
  }

  async function load() {
    const res = await api().get('/api/teams/' + teamId + '/players');
    return {
      items: res.data,
    };
  }

  const list = useAsyncList({load, sort});

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
    if (teamId) {
      api().get('/api/teams/' + teamId).then(data => {
        setTeam(data.data);
      });
      list.reload();
    }
  }, [teamId])

  const TeamCard = () => {
    return (
      <div className="relative">
        <h3>
          Hold: {team.name}
          <span className="float-right font-thin">{getStatus(team.status)}</span>
        </h3>
        <p>Hold nummer: {team.team_code}</p>
        <p>Start: {team.start_date}</p>
        <p>Bane: {team.playing_field?.name}</p>
        <div className="!absolute right-0 bottom-0 flex">
          <Button size="sm" color="warning" bordered>
            <span className="font-bold">Annuller</span>
          </Button>
          {
            team.status === 1 && (
              <Button size="sm" className="ml-2">
                <span className="font-bold">Sæt igang</span>
              </Button>
            )
          }
        </div>
      </div>
    )
  }

  return <Layout>
    <Grid.Container gap={2} justify="center">
      <Grid xs={12}>
        <Card>
          <div className="p-3">
            {team ? <TeamCard/>
              : <div className="text-center"><Loading/></div>}
          </div>
        </Card>
      </Grid>
      <Grid xs={12} md={8}>
        <Card>
          <div>
            <h1 className="text-xl inline-block pt-3 px-3">
              Spiller
            </h1>
            <Button size="sm" className="float-right mt-3 mx-3" onClick={() => openModal()}>
              <span className="font-bold">Opret spiller</span>
            </Button>
          </div>
          <Table
            lined
            headerLined
            shadow={false}
            sortDescriptor={list.sortDescriptor}
            onSortChange={list.sort}
            aria-label="Players"
            css={{
              height: "auto",
              minWidth: "100%",
              paddingTop: 0
            }}
          >
            <Table.Header>
              <Table.Column key="id" allowsSorting>Id</Table.Column>
              <Table.Column key="name" allowsSorting>Navn</Table.Column>
              <Table.Column key="bullets">Brugte kugler</Table.Column>
              <Table.Column key="weapons">Våben</Table.Column>
              <Table.Column key="product">Produkt</Table.Column>
              <Table.Column key="paid" allowsSorting>Betalt</Table.Column>
              <Table.Column key="actions" width="100">Actions</Table.Column>
            </Table.Header>
            <Table.Body items={list.items} loadingState={list.loadingState}>
              {(item: any) => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.id}</Table.Cell>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.bullets}</Table.Cell>
                  <Table.Cell>{item.weapon.name}</Table.Cell>
                  <Table.Cell>{item.product.name} ({item.product.bullets})</Table.Cell>
                  <Table.Cell>{item.is_paid ? 'Ja' : 'Nej'}</Table.Cell>
                  <Table.Cell>
                    <div className="flex flex-row">
                      <Tooltip content="Tilføj 100 kugler">
                        <FontAwesomeIcon icon={faPlus} color="#979797" style={{fontSize: '20px'}} onClick={() => {
                          addBullets(item.weapon.nfc_id)
                        }}/>
                      </Tooltip>
                      <Spacer x={0.3}/>
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
      </Grid>
      <Grid xs={12} md={4}>
        <ReloadStationsTable teamId={teamId}/>
      </Grid>
    </Grid.Container>
  </Layout>
}

export default Team;