import { useEffect, useState } from 'react';
import Person from 'Frontend/generated/com/example/application/data/entity/Person';
import { PersonService } from 'Frontend/generated/endpoints';
import { Grid } from '@hilla/react-components/Grid';
import { GridSortColumn } from '@hilla/react-components/GridSortColumn';

export function ReactiveView() {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    const sub = PersonService.getPersonStream().onNext(person => {
      setPeople(prevState => [...prevState, person])
    })

    return sub.cancel;
  }, []);


  return (
    <Grid items={people} className="m-m h-full">
      <GridSortColumn path="firstName"/>
      <GridSortColumn path="lastName"/>
      <GridSortColumn path="email" autoWidth/>
      <GridSortColumn path="dateOfBirth"/>
    </Grid>
  );
}