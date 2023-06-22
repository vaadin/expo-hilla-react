import './ComponentsView.css';
import { Button } from '@hilla/react-components/Button.js';
import { RadioGroup } from '@hilla/react-components/RadioGroup.js';
import { RadioButton } from '@hilla/react-components/RadioButton.js';
import { CheckboxGroup } from '@hilla/react-components/CheckboxGroup.js';
import { Checkbox } from '@hilla/react-components/Checkbox.js';
import { DateTimePicker } from '@hilla/react-components/DateTimePicker.js';
import { useEffect, useState } from 'react';
import Person from 'Frontend/generated/com/example/application/data/entity/Person';
import { PersonEndpoint } from 'Frontend/generated/endpoints';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { GridSelectionColumn } from '@hilla/react-components/GridSelectionColumn';
import { ComboBox } from '@hilla/react-components/ComboBox';
import { MessageList, MessageListItem } from '@hilla/react-components/MessageList';
import { MessageInput } from '@hilla/react-components/MessageInput';
import { TextField } from '@hilla/react-components/TextField.js';
import { Icon } from '@hilla/react-components/Icon';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset.js';
import { Upload } from '@hilla/react-components/Upload';
import { MultiSelectComboBox } from '@hilla/react-components/MultiSelectComboBox';
import { LoginForm } from '@hilla/react-components/LoginForm';
import { Tabs } from '@hilla/react-components/Tabs';
import { Tab } from '@hilla/react-components/Tab';
import { RichTextEditor } from '@hilla/react-components/RichTextEditor';
import { Chart } from '@hilla/react-components/Chart';
import { ChartSeries } from '@hilla/react-components/ChartSeries';

type PersonWithFullName = Person & {
  name: string
}

type DataPoint = {
  x: number;
  y: number;
}

export function ComponentsView() {
  const [people, setPeople] = useState<PersonWithFullName[]>([]);
  const [developerProductivity, setDeveloperProductivity] = useState<DataPoint[]>([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const startDate = new Date(2023, 0, 1); // JavaScript month index starts from 0
    const timerId = setInterval(() => {
      setCounter((prevCounter) => {
        const newCounter = prevCounter + 1;
        const newValue = Math.pow(newCounter, 1.02) + (10 * Math.sin(newCounter / 50.0)) + (Math.random() * 5);
        startDate.setDate(startDate.getDate() + 1);
        const newPoint: DataPoint = { x: startDate.getTime(), y: newValue };

        setDeveloperProductivity((prevProductivity) => {
          if (prevProductivity.length >= 50) {
            return [...prevProductivity.slice(1), newPoint];
          } else {
            return [...prevProductivity, newPoint];
          }
        });

        return newCounter;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const messages: MessageListItem[] = [
    {
      userName: 'Matt Mambo',
      text: 'Nature does not hurry, yet everything gets accomplished.',
      time: '2 minutes ago',
      userColorIndex: 1
    },
    {
      userName: 'Lindsey Listy',
      text: 'Using your talent, hobby or profession in a way that makes you contribute with something good to this world is truly the way to go.',
      time: 'just now',
      userColorIndex: 2
    }

  ];

  useEffect(() => {
    PersonEndpoint.findAll().then((people) => setPeople(
      people.map(p => ({ ...p, name: `${p.firstName} ${p.lastName}` }))
    ));
  }, []);

  return (
    <div className='components-view'>

      <div className='component col-span-3 tall'>
        <Chart type="line" title="Developer productivity" additionalOptions={{
          xAxis: {
            type: 'datetime',
          },
          plotOptions: {
            line: {
              marker: {
                enabled: false
              }
            }
          }
        }}>
          <ChartSeries type="line" values={developerProductivity} title="Productivity" unit="kLOC/h" />
        </Chart>
      </div>


      <div className='component'>
        <div className='flex gap-s'>
          <Button theme='primary'>Save</Button>
          <Button>Cancel</Button>
        </div>
      </div>

      <div className='component'>
        <RadioGroup theme='vertical' value='1'>
          <RadioButton label='Option 1' value='1' />
          <RadioButton label='Option 2' value='2' />
          <RadioButton label='Option 3' value='3' />
        </RadioGroup>
      </div>

      <div className='component tall col-span-2'>
        <LoginForm />
      </div>

      <div className='component col-span-2'>
        <DateTimePicker value={new Date().toISOString().slice(0, 16)}></DateTimePicker>
      </div>

      <div className='component'>
        <CheckboxGroup theme='vertical' value={['1', '3']}>
          <Checkbox label='Option 1' value='1' />
          <Checkbox label='Option 2' value='2' />
          <Checkbox label='Option 3' value='3' />
        </CheckboxGroup>
      </div>

      <div className='component col-span-3 tall'>
        <Grid items={people} selectedItems={people.slice(3, 6)} className='h-full'>
          <GridSelectionColumn />
          <GridColumn path='firstName' />
          <GridColumn path='lastName' />
          <GridColumn path='email' autoWidth />
          <GridColumn path='dateOfBirth' />
        </Grid>
      </div>

      <div className='component'>
        <ComboBox
          items={people}
          itemLabelPath='name'
          itemValuePath='id'
          label='People' value={people[1]?.id}
        />
      </div>



      <div className='component tall col-span-2 flex-col'>
        <MessageList className='flex-grow' items={messages} />
        <MessageInput className='w-full' />
      </div>

      <div className='component'>
        <TextField
          clearButtonVisible
          value='John Doe'>
          <Icon icon='lumo:search' slot='prefix' />
        </TextField>
      </div>

      <div className='component'>
        <Upload />
      </div>

      <div className='component col-span-2'>
        <MultiSelectComboBox
          className='w-full'
          items={people}
          itemLabelPath='name'
          itemValuePath='id'
          selectedItems={people.slice(3, 5)}
        />
      </div>

      <div className='component col-span-2'>
        <Tabs>
          <Tab>Details</Tab>
          <Tab>Payment</Tab>
          <Tab>Shipping</Tab>
        </Tabs>
      </div>

      <div className='component col-span-2 tall'>
        <RichTextEditor
          htmlValue={`
            <h1>Rich Text Editor</h1>
            <p>This is a rich text editor</p>
          `}
        />
      </div>


    </div>
  );
}