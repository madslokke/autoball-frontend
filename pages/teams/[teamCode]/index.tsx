import {NextPage} from "next";
import {useRouter} from "next/router";
import Link from "next/link";
import {Button, Card, Input, Spacer, Table} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons/faRotateRight";
import api from "../../../util/api";
import {faPen} from "@fortawesome/free-solid-svg-icons/faPen";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";

const TeamPage: NextPage = () => {

  const router = useRouter();
  const { teamCode } = router.query;

  const [team, setTeam] = useState<any>();

  const registerPlayer = () => {
    router.push('/teams/' + teamCode + '/players/0');
  };

  const getTeam = () => {
    if (!teamCode) {
      return;
    }
    api().get('/api/teams/' + teamCode + '/info').then(({data}) => {
      if (data.id) {
        setTeam(data);
      } else {
        router.push('/');
      }
    });
  }

  useEffect(() => {
    getTeam();
  }, [teamCode])

  return (
    <div>
      <div className="text-center py-6 md:py-20">
        <h1 className="text-5xl md:text-7xl">AUTOBALL</h1>
      </div>

      <div className="text-center">
        <h3>Hold navn: {team?.name}</h3>
      </div>

      <div className="flex flex-col items-center pb-10">
        <Button size="xl" onClick={registerPlayer}>
          <span className="font-bold">Registere spiller</span>
        </Button>
      </div>
      <Card className="flex flex-col items-stretch items-center max-w-[500px] !m-auto">
        <h1 className="text-xl px-4 pt-2">
          Spillere
          <FontAwesomeIcon color="#979797" icon={faRotateRight} className="float-right" onClick={getTeam}/>
        </h1>

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
            <Table.Column>Navn</Table.Column>
            <Table.Column>Våben</Table.Column>
            <Table.Column>Kugler brugt</Table.Column>
            <Table.Column>Pakke</Table.Column>
          </Table.Header>
          <Table.Body>
            {team?.players?.map((player: any) => (
              <Table.Row key={player.id}>
                <Table.Cell>{player.name}</Table.Cell>
                <Table.Cell>{player.weapon.name}</Table.Cell>
                <Table.Cell>{player.bullets}</Table.Cell>
                <Table.Cell>{player.product.name}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
    </div>
  )
}

export default TeamPage;