import { Badge, Button, Card, TextInput, Title } from '@tremor/react'
import { useUserActions } from '../hooks/useUserActions.ts'
import React, {useState} from "react";

export function CreateNewUser () {
  const { addUser } = useUserActions();
  const [result, setResult] = useState<'ok' | 'ko' | null>(null);
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setResult(null);

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const github = formData.get('github') as string;

    if (!name || !email || !github) {
      return setResult('ko');
    }

    addUser({name, email, github});
    setResult('ok');
    form.reset();
    setTimeout(() => {setResult(null)}, 400);
  }

  return (
    <Card style={{ marginTop: '16px' }}>
      <Title>Create new user</Title>

      <form className='' onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column',gap: '8px'}}>
        <TextInput name='name' placeholder='Enter your name' />
        <TextInput name='email' placeholder='Enter your email' />
        <TextInput name='github' placeholder='Enter your github username' />
        <div>
          <Button type='submit' style={{ marginTop: '16px' }}>Create user</Button>
          <span>
            {result === 'ok' && <Badge color={'green'}>Saved correctly</Badge>}
            {result === 'ko' && <Badge color={'red'}>Check your fields</Badge>}
          </span>
        </div>
      </form>
    </Card>
  )
}
