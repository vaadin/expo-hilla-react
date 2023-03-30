import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import Person from 'Frontend/generated/com/example/application/data/entity/Person.js';
import { CrudEndpoint } from 'Frontend/generated/endpoints.js';
import { useEffect, useState } from 'react';

export function CrudView() {
  const [selected, setSelected] = useState<Person>();
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    CrudEndpoint.findAll().then((people) => setPeople(people));
  }, []);

  async function save() {}

  function cancel() {}

  function activeChanged(person: Person) {}

  return (
    <div className="h-full p-m box-border">
      <Grid items={people} className="h-full">
        <GridColumn path="firstName" />
        <GridColumn path="lastName" />
        <GridColumn path="email" autoWidth />
        <GridColumn path="firstName" />
        <GridColumn path="dateOfBirth" />
        <GridColumn path="country" />
      </Grid>
    </div>
  );
}
