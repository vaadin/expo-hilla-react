import './components.css';
import { Button } from '@vaadin/react-components/Button.js';
import { RadioGroup } from '@vaadin/react-components/RadioGroup.js';
import { RadioButton } from '@vaadin/react-components/RadioButton.js';
import { CheckboxGroup } from '@vaadin/react-components/CheckboxGroup.js';
import { Checkbox } from '@vaadin/react-components/Checkbox.js';
import { DateTimePicker } from '@vaadin/react-components/DateTimePicker.js';
import { useEffect, useState } from 'react';
import Person from 'Frontend/generated/com/example/application/data/entity/Person';
import { Grid } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { GridSelectionColumn } from '@vaadin/react-components/GridSelectionColumn';
import { ComboBox } from '@vaadin/react-components/ComboBox';
import { MessageList, MessageListItem } from '@vaadin/react-components/MessageList';
import { MessageInput } from '@vaadin/react-components/MessageInput';
import { TextField } from '@vaadin/react-components/TextField.js';
import { Icon } from '@vaadin/react-components/Icon';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset.js';
import { Upload } from '@vaadin/react-components/Upload';
import { MultiSelectComboBox } from '@vaadin/react-components/MultiSelectComboBox';
import { LoginForm } from '@vaadin/react-components/LoginForm';
import { Tabs } from '@vaadin/react-components/Tabs';
import { Tab } from '@vaadin/react-components/Tab';
import { RichTextEditor } from '@vaadin/react-components/RichTextEditor';
import { Chart } from '@vaadin/react-components/Chart';
import { PersonService } from 'Frontend/generated/endpoints';
import { ViewConfig } from '@vaadin/hilla-file-router/types.js';

export const config: ViewConfig = {
  title: 'Components',
  menu: {
    order: 0,
    icon: 'la-cubes'
  }
};

type PersonWithFullName = Person & {
  name: string
}

type DataPoint = {
  x: number;
  y: number;
}

export default function Index() {
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
    PersonService.findAll().then((people) => setPeople(
      people.map(p => ({ ...p, name: `${p.firstName} ${p.lastName}` }))
    ));
  }, []);

  return (
    <div className='components-view'>

      <div className='component col-span-3 tall'>
        <Chart type='line' title='Developer productivity' additionalOptions={{
          xAxis: {
            type: 'datetime'
          },
          yAxis: {
            title: {
              text: 'kLOC/h'
            }
          },
          plotOptions: {
            line: {
              marker: {
                enabled: false
              }
            }
          },
          series: [
            {
              type: 'line',
              data: developerProductivity,
              name: 'Productivity'
            }
          ]
        }}>
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