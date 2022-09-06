import {NextPage} from "next";
import {Button, Card, Input, Spacer} from "@nextui-org/react";
import {useEffect, useState} from "react";
import api from "../../util/api";
import {useRouter} from "next/router";

const Register: NextPage = () => {

  const router = useRouter();

  const [invite, setInvite] = useState<any>();

  const onSubmit = (event: any) => {
    event.preventDefault();
    const name = event.target?.name.value;
    const password = event.target?.password.value;

    const token = router.asPath.split('token=')[1];
    api().post('/api/invites/' + token, {name, password}).then(response => {
      console.log(response);
      router.push('/login');
    })
  }

  useEffect(() => {
    const token = router.asPath.split('token=')[1];
    api().get('/api/invites/' + token).then(response => {
      setInvite(response.data);
    });
  }, []);

  return (
    <div>
      <h1 className="text-center mt-10 mb-6">
        {invite?.company.name}
      </h1>
      <Card className="max-w-md !m-auto">
        <form onSubmit={(event) => onSubmit(event)}>
          <div className="flex flex-col p-10">
            <Input label="Navn" id="name" name="name"/>
            <Spacer y={1.5}/>
            <Input label="Password" id="password" name="password" type="password"/>
            <Spacer y={1.5}/>
            <Input label="Email" readOnly value={invite?.email}/>
            <Spacer y={1.5}/>
            <Input label="Role" readOnly value={invite?.role.name}/>
            <Spacer y={1.5}/>
            <Button type="submit">Opret</Button>
          </div>
        </form>
      </Card>
      <a href="https://autoball.dk">
        <h5 className="text-gray-400 text-center font-medium mt-2">
          AutoBall.dk
        </h5>
      </a>
    </div>
  )
}

export default Register;