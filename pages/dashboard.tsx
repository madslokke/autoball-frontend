import {NextPage} from "next";
import Layout from "../components/layout";
import {Card, Grid, Spacer, Table} from "@nextui-org/react";
import Link from "next/link";
import CreateTeamModal from "../components/modals/createTeamModal";

const Dashboard: NextPage = () => {
  return (
    <Layout>
      <h1 className="float-right p-1 pr-4 text-2xl font-light">Sprækkebjerg</h1>
      <Grid.Container gap={2} justify="center">
        <Grid sm={7} xs={12}>
          <div className="flex flex-col flex-auto">
            <Card>
              <h1 className="text-xl ">Aktive og kommende hold</h1>
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
                  <Table.Column>Hold navn</Table.Column>
                  <Table.Column>Start tid</Table.Column>
                  <Table.Column>Bane</Table.Column>
                </Table.Header>
                <Table.Body>
                  <Table.Row key="1">
                    <Table.Cell>Tony Reichert</Table.Cell>
                    <Table.Cell>12:30</Table.Cell>
                    <Table.Cell>Bane 1</Table.Cell>
                  </Table.Row>
                  <Table.Row key="2">
                    <Table.Cell>Zoey Lang</Table.Cell>
                    <Table.Cell>13:00</Table.Cell>
                    <Table.Cell>Bane 2</Table.Cell>
                  </Table.Row>
                  <Table.Row key="3">
                    <Table.Cell>Jane Fisher</Table.Cell>
                    <Table.Cell>13:30</Table.Cell>
                    <Table.Cell>Bane 1</Table.Cell>
                  </Table.Row>
                  <Table.Row key="4">
                    <Table.Cell>William Howard</Table.Cell>
                    <Table.Cell>14:00</Table.Cell>
                    <Table.Cell>Bane 2</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Card>
            <Spacer/>
            <Card className="flex-grow">
              <h1 className="text-xl">Betaling mangler</h1>
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
                  <Table.Column>Hold navn</Table.Column>
                  <Table.Column>Start tid</Table.Column>
                  <Table.Column>Bane</Table.Column>
                </Table.Header>
                <Table.Body>
                  <Table.Row key="1">
                    <Table.Cell>Tony Reichert</Table.Cell>
                    <Table.Cell>12:30</Table.Cell>
                    <Table.Cell>Bane 1</Table.Cell>
                  </Table.Row>
                  <Table.Row key="2">
                    <Table.Cell>Zoey Lang</Table.Cell>
                    <Table.Cell>13:00</Table.Cell>
                    <Table.Cell>Bane 2</Table.Cell>
                  </Table.Row>
                  <Table.Row key="3">
                    <Table.Cell>Jane Fisher</Table.Cell>
                    <Table.Cell>13:30</Table.Cell>
                    <Table.Cell>Bane 1</Table.Cell>
                  </Table.Row>
                  <Table.Row key="4">
                    <Table.Cell>William Howard</Table.Cell>
                    <Table.Cell>14:00</Table.Cell>
                    <Table.Cell>Bane 2</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Card>
          </div>
        </Grid>
        <Grid sm={5} xs={12}>
          <div className="flex flex-col flex-auto">
            <Link href='/create/team'>
              <Card clickable className="!p-2" style={{backgroundColor: "#87FF73"}}>
                <h1 className="text-3xl text-center">Opstart Nyt Hold</h1>
              </Card>
            </Link>
            <Spacer/>
            <Card className="flex-grow">
              <h1 className="text-xl">Reload stationer</h1>
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
                  <Table.Column>Hold navn</Table.Column>
                  <Table.Column>Start tid</Table.Column>
                  <Table.Column>Bane</Table.Column>
                </Table.Header>
                <Table.Body>
                  <Table.Row key="1">
                    <Table.Cell>Tony Reichert</Table.Cell>
                    <Table.Cell>12:30</Table.Cell>
                    <Table.Cell>Bane 1</Table.Cell>
                  </Table.Row>
                  <Table.Row key="2">
                    <Table.Cell>Zoey Lang</Table.Cell>
                    <Table.Cell>13:00</Table.Cell>
                    <Table.Cell>Bane 2</Table.Cell>
                  </Table.Row>
                  <Table.Row key="3">
                    <Table.Cell>Jane Fisher</Table.Cell>
                    <Table.Cell>13:30</Table.Cell>
                    <Table.Cell>Bane 1</Table.Cell>
                  </Table.Row>
                  <Table.Row key="4">
                    <Table.Cell>William Howard</Table.Cell>
                    <Table.Cell>14:00</Table.Cell>
                    <Table.Cell>Bane 2</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Card>
          </div>
        </Grid>
      </Grid.Container>
      <CreateTeamModal open={true}/>
    </Layout>
  )
}

export default Dashboard;