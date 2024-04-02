import { TextField } from '@vaadin/react-components/TextField.js';
import { EmailField } from '@vaadin/react-components/EmailField.js';
import { DatePicker } from '@vaadin/react-components/DatePicker.js';
import { Button } from '@vaadin/react-components/Button.js';
import { Notification } from '@vaadin/react-components/Notification';
import { useForm } from '@vaadin/hilla-react-form';
import PersonModel from 'Frontend/generated/com/example/application/data/entity/PersonModel';
import { PersonService } from 'Frontend/generated/endpoints';
import { ViewConfig } from '@vaadin/hilla-file-router/types.js';

export const config: ViewConfig = {
  menu: {
    icon: 'la-pen'
  }
}


export default function Form() {

  const { model, field, submit, reset } = useForm(PersonModel, {
    onSubmit: async (person) => {
      const saved = await PersonService.save(person);
      if(saved) {
        Notification.show(`Saved ${saved.firstName} ${saved.lastName} with id ${saved.id}`);
      }
    }
  });

  return (
    <div className="p-m flex flex-col items-start">
      <TextField label='First name' {...field(model.firstName)} />
      <TextField label='Last name' {...field(model.lastName)} />
      <EmailField label='Email' {...field(model.email)} />
      <DatePicker label='Date of birth' {...field(model.dateOfBirth)} />

      <div className="flex gap-m mt-l">
        <Button theme="primary" onClick={submit}>Save</Button>
        <Button onClick={reset}>Reset</Button>
      </div>
    </div>
  );
}