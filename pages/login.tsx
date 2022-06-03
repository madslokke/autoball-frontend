import {NextPage} from "next";
import {Button, Card, Container, Input, Spacer} from "@nextui-org/react";
import axios from "axios";
import api from "../util/api";
import {useState} from "react";
import {logIn} from "../util/auth";


const Login: NextPage = () => {

  const [formInput, setFormInput] = useState({email: '', password: ''})

  const updateFormInput = (e: any) => {
    e.persist()

    setFormInput(prevState => ({...prevState, [e.target.name]: e.target.value}))
  }

  const onLogin = (e: any) => {
    e.preventDefault();

    api().get('/sanctum/csrf-cookie').then(() => {
      api().post('/login', formInput).then(({data}) => {
        logIn();
      }).catch(({errors}) => {
        alert(errors[0]);
      })
    })
  }

  return (
    <Container>
      <div className="flex content-center flex-wrap flex-col">
        <h1 className="text-7xl text-center my-24">AUTOBALL</h1>
        <div className="w-[450px] justify-center">
          <form onSubmit={onLogin}>
            <Card className="!p-10">
              <Input placeholder="Brugernavn" name="email" type="email" required onChange={updateFormInput}/>
              <Spacer></Spacer>
              <Input placeholder="Password" name="password" type="password" required onChange={updateFormInput}/>
              <Spacer></Spacer>
              <Button type="submit">Login</Button>
            </Card>
          </form>
        </div>
      </div>
    </Container>
  )
}

export default Login;