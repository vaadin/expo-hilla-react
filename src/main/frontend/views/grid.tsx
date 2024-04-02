import { Grid } from '@vaadin/react-components/Grid.js';
import { useEffect, useState } from 'react';
import Person from 'Frontend/generated/com/example/application/data/entity/Person';
import { GridSortColumn } from '@vaadin/react-components/GridSortColumn';
import { PersonService } from 'Frontend/generated/endpoints';
import { ViewConfig } from '@vaadin/hilla-file-router/types.js';

export const config: ViewConfig = {
  menu: {
    icon: 'la-th'
  }
}

export default function GridView() {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    PersonService.findAll().then(setPeople);
  }, []);


  return (
    <Grid items={people} className='m-m h-full'>
      <GridSortColumn path='firstName' />
      <GridSortColumn path='lastName' />
      <GridSortColumn path='email' autoWidth />
      <GridSortColumn path='dateOfBirth' />
    </Grid>
  );
}