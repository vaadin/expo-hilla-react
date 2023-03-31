import { Button } from '@hilla/react-components/Button.js';
import {
  DatePicker,
  DatePickerChangeEvent,
} from '@hilla/react-components/DatePicker.js';
import {
  EmailField,
  EmailFieldChangeEvent,
} from '@hilla/react-components/EmailField.js';
import {
  Grid,
  GridActiveItemChangedEvent,
} from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import {
  TextField,
  TextFieldChangeEvent,
} from '@hilla/react-components/TextField.js';
import Person from 'Frontend/generated/com/example/application/data/entity/Person.js';
import { CrudEndpoint } from 'Frontend/generated/endpoints.js';
import { useContext, useEffect, useState } from 'react';
import { TitleContext } from './MainLayout.js';

export function CrudView() {
  const [selected, setSelected] = useState<Person | null>(null);
  const [people, setPeople] = useState<Person[]>([]);
  const setTitle = useContext(TitleContext);

  useEffect(() => {
    CrudEndpoint.findAll().then((people) => setPeople(people));
  }, []);

  useEffect(() => {
    setTitle('CRUD');
    return () => setTitle('');
  }, []);

  async function save() {
    const saved = await CrudEndpoint.save(selected!);
    setPeople((people) => people.map((p) => (p.id === saved.id ? saved : p)));
    setSelected(null);
  }

  function cancel() {
    setSelected(null);
  }

  function activeChanged(e: GridActiveItemChangedEvent<Person>) {
    setSelected(e.detail.value ?? null);
  }

  function handleFormChange(
    e: TextFieldChangeEvent | EmailFieldChangeEvent | DatePickerChangeEvent
  ) {
    if (selected) {
      const target = e.target;
      const name = target.name;
      const value = target.value;
      setSelected({ ...selected, [name]: value });
    }
  }

  return (
    <div className="h-full p-m box-border flex gap-s">
      <Grid
        items={people}
        className="h-full"
        onActiveItemChanged={activeChanged}
        selectedItems={selected ? [selected] : undefined}>
        <GridColumn path="firstName" />
        <GridColumn path="lastName" />
        <GridColumn path="email" autoWidth />
        <GridColumn path="firstName" />
        <GridColumn path="dateOfBirth" />
        <GridColumn path="country" />
      </Grid>

      <div className="flex flex-col gap-s p-m" hidden={!selected}>
        <TextField
          label="First name"
          name="firstName"
          value={selected?.firstName}
          onChange={handleFormChange}
        />
        <TextField
          label="Last name"
          name="lastName"
          value={selected?.lastName}
          onChange={handleFormChange}
        />
        <EmailField label="Email" name="email" value={selected?.email} />
        <DatePicker
          label="Date of birth"
          name="dateOfBirth"
          value={selected?.dateOfBirth}
          onChange={handleFormChange}
        />
        <TextField
          label="Country"
          name="country"
          value={selected?.country}
          onChange={handleFormChange}
        />

        <div className="flex gap-m">
          <Button theme="primary" onClick={save}>
            Save
          </Button>
          <Button theme="tertiary" onClick={cancel}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
