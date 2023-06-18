import { Grid } from '@hilla/react-components/Grid.js';
import { useEffect, useState } from 'react';
import Person from 'Frontend/generated/com/example/application/data/entity/Person';
import { PersonEndpoint } from 'Frontend/generated/endpoints';
import { GridSortColumn } from '@hilla/react-components/GridSortColumn';

export function GridView() {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    PersonEndpoint.findAll().then(setPeople);
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