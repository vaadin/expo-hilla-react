import { Button } from '@hilla/react-components/Button.js';
import { TextField } from '@hilla/react-components/TextField.js';
import { HelloWorldEndpoint } from 'Frontend/generated/endpoints.js';
import { useState } from 'react';

export function SandboxView() {
  const [name, setName] = useState('');
  const [greetings, setGreetings] = useState<string[]>([]);

  async function sayHello() {
    const greeting = await HelloWorldEndpoint.sayHello(name);
    setGreetings((greetings) => [...greetings, greeting]);
    setName('');
  }

  return (
    <div className="h-full p-m">
      <div className="flex gap-m items-baseline">
        <TextField
          label="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button theme="primary" onClick={sayHello}>
          Say hello
        </Button>
      </div>

      {greetings.map((greeting) => (
        <p key={greeting}>{greeting}</p>
      ))}
    </div>
  );
}
