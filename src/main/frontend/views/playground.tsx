import { Button } from '@vaadin/react-components/Button.js';
import { TextField } from '@vaadin/react-components/TextField.js';
import { HelloWorldService } from 'Frontend/generated/endpoints.js';
import { useState } from 'react';
import { ViewConfig } from '@vaadin/hilla-file-router/types.js';

export const config: ViewConfig = {
  menu: {
    icon: 'la-code'
  }
}


export default function Playground() {
  const [name, setName] = useState('');
  const [greetings, setGreetings] = useState<string[]>([]);

  async function sayHello() {
    const greeting = await HelloWorldService.sayHello(name);
    setGreetings((greetings) => [...greetings, greeting]);
    setName('');
  }

  return (
    <div className='h-full p-m'>
      <div className='flex gap-m items-baseline'>
        <TextField
          label='Your name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button theme='primary' onClick={sayHello}>
          Say hello
        </Button>
      </div>

      {greetings.map((greeting) => (
        <p key={greeting}>{greeting}</p>
      ))}
    </div>
  );
}
