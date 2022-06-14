import {NextPage} from "next";
import {Button, Card, Input, Spacer} from "@nextui-org/react";
import Link from "next/link";
import {useState} from "react";
import api from "../util/api";
import {useRouter} from "next/router";

const Index: NextPage = () => {

  const [teamCode, setTeamCode] = useState();
  const [error, setError] = useState('');
  const router = useRouter();

  const onChange = (e: any) => {
    e.persist();

    setTeamCode(e.target.value);
  }

  const onSubmit = (e: any) => {
    e.preventDefault();

    api().get('/api/teams/' + teamCode + '/info').then(({data}) => {
      if (data.id) {
        router.push('/teams/' + data.team_code);
      } else {
        setError('Kunne ikke finde dit hold');
      }
    }).catch(({errors}) => {
      alert(errors[0]);
    })
  }

  return (
    <div>
      <div className="float-right">
        <Link href="/login">
          <Button size="xs">Login</Button>
        </Link>
      </div>
      <div className="text-center py-6 md:py-20">
        <h1 className="text-5xl md:text-7xl">AUTOBALL</h1>
      </div>

      <Card className="flex flex-col items-center !w-[320px] !p-8 !m-auto">
        <div>
          <form onSubmit={onSubmit}>
            {
              error &&
              (
                <p className="text-red-600 font-bold px-1">{ error }</p>
              )
            }
            <Input size="lg" label="Hold nummer" onChange={onChange}/>
            <Spacer/>
            <Button type="submit">
              <span className="text-lg">Find hold</span>
            </Button>
          </form>
        </div>
      </Card>
    </div>


  )
}

export default Index;