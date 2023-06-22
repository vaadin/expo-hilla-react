import { useState } from 'react';
import Person from 'Frontend/generated/com/example/application/data/entity/Person';
import { TextField } from '@hilla/react-components/TextField.js';
import { EmailField } from '@hilla/react-components/EmailField.js';
import { DatePicker } from '@hilla/react-components/DatePicker.js';
import { Button } from '@hilla/react-components/Button.js';
import { Notification } from '@hilla/react-components/Notification';

export function FormView() {
  const [person, setPerson] = useState<Person>({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: ''
  });

  function save() {
    Notification.show(`Saved user ${person.firstName} ${person.lastName}`)
  }

  function reset() {
    setPerson({
      firstName: '',
      lastName: '',
      email: '',
      dateOfBirth: ''
    });
  }

  function handleFormChange(e: any) {
    const {name, value} = e.target;
    setPerson({
      ...person,
      [name]: value
    })
  }

  return (
    <div className='flex gap-xl flex-wrap p-m'>
      <div className='flex flex-col items-start'>
        <TextField
          label="First name"
          name="firstName"
          required
          value={person.firstName}
          onChange={handleFormChange}/>
        <TextField
          label="Last name"
          name="lastName"
          required
          value={person.lastName}
          onChange={handleFormChange}/>
        <EmailField
          label="Email"
          name="email"
          required
          value={person.email}
          onChange={handleFormChange}/>
        <DatePicker
          label="Date of birth"
          name="dateOfBirth"
          required
          value={person.dateOfBirth}
          onChange={handleFormChange}/>

        <div className='flex gap-s'>
          <Button theme="primary" onClick={save}>Save</Button>
          <Button onClick={reset}>Cancel</Button>
        </div>
      </div>

      <div className='flex flex-col gap-s'>
        <h2>Form Value</h2>
        <pre>
          {JSON.stringify(person, null, 2)}
        </pre>
      </div>

    </div>
  );
}