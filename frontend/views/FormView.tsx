import { TextField } from '@hilla/react-components/TextField.js';
import { EmailField } from '@hilla/react-components/EmailField.js';
import { DatePicker } from '@hilla/react-components/DatePicker.js';
import { Button } from '@hilla/react-components/Button.js';
import { Notification } from '@hilla/react-components/Notification';
import { useForm } from '@hilla/react-form';
import PersonModel from 'Frontend/generated/com/example/application/data/entity/PersonModel';
import { PersonService } from 'Frontend/generated/endpoints';

export function FormView() {

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