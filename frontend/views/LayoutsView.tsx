import { Button } from '@hilla/react-components/Button.js';
import { TextField } from '@hilla/react-components/TextField.js';
import { EmailField } from '@hilla/react-components/EmailField.js';
import { DatePicker } from '@hilla/react-components/DatePicker.js';

export function LayoutsView() {
  return (
    <div className="p-m flex flex-col gap-l">
      <h2>Vertical Layout</h2>
      <div className='flex flex-col gap-s items-start'>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 2</Button>
      </div>

      <h2>Horizontal Layout</h2>
      <div className='flex gap-s'>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 2</Button>
      </div>

      <h2>Combining Layouts</h2>
      <div className='flex flex-col gap-s items-start'>
        <TextField label='Name'/>
        <EmailField label="Email"/>
        <DatePicker label="Date of birth"/>

        <div className='flex gap-s'>
          <Button theme="primary">Save</Button>
          <Button>Cancel</Button>
        </div>
      </div>
    </div>
  );
}