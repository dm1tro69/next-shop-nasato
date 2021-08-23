import React, {useState} from 'react';
import Page from "../components/Page";
import Input from "../components/input";
import Field from "../components/Field";
import Button from "../components/Button";
import {fetchJson} from "../lib/api";

const SinInPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState({loading: false, error: false})


    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({loading: true, error: false})
      try {
          const res = await fetchJson('/api/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'

              },
              body: JSON.stringify({
                  email,
                  password
              })
          })
          setStatus({loading: false, error: false})
          console.log('sin-in', res)
      }catch (e) {
          setStatus({loading: false, error: true})
      }
    }

    return (
        <Page title={'Sing In'}>
            <form onSubmit={handleSubmit}>
                <Field label={'Email'}>
                   <Input type={'email'} value={email} required={true} onChange={(e) => setEmail(e.target.value)}/>
                </Field>
                <Field label={'Password'}>
                    <Input type={'password'} value={password} required={true} onChange={(e) => setPassword(e.target.value)}/>
                </Field>
                {status.error && <p className={'text-red-700'}>Invalid credentials</p>}
                {status.loading ? (
                    <p>Loading...</p>
                ) : <Button type='submit'>Sign In</Button>}

            </form>
        </Page>
    );
};

export default SinInPage;
