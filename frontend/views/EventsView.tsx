import { Button } from '@hilla/react-components/Button.js';
import { DatePicker } from '@hilla/react-components/DatePicker.js';
import { ComboBox } from '@hilla/react-components/ComboBox';
import { useEffect, useState } from 'react';
import Person from 'Frontend/generated/com/example/application/data/entity/Person';
import { PersonEndpoint } from 'Frontend/generated/endpoints';

export function EventsView() {
  const [people, setPeople] = useState<Person[]>();
  const [buttonText, setButtonText] = useState('');
  const [dateText, setDateText] = useState('');
  const [comboBoxText, setComboBoxText] = useState('');

  useEffect(() => {
    PersonEndpoint.findAll().then(setPeople);
  }, []);

  return (
    <div className='flex flex-col gap-m p-m'>

      <div className='flex gap-s'>
        <Button onClick={e => setButtonText('Clicked!')}>Click me</Button>
        <span>{buttonText}</span>
      </div>

      <div className='flex gap-s items-baseline'>
        <DatePicker
          label='Select date'
          onValueChanged={e => setDateText(e.detail.value)} />
        <span>{dateText}</span>
      </div>

      <div className='flex gap-s items-baseline'>
        <ComboBox
          label='Select person'
          items={people}
          itemLabelPath='firstName'
          itemValuePath='firstName'
          onValueChanged={e => setComboBoxText(e.detail.value)} />
        <span>{comboBoxText}</span>
      </div>
    </div>
  );
}