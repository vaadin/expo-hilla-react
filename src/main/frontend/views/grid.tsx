import { Grid } from '@vaadin/react-components/Grid.js';
import { useEffect, useState } from 'react';
import Person from 'Frontend/generated/com/example/application/data/entity/Person';
import { GridSortColumn } from '@vaadin/react-components/GridSortColumn';
import { PersonService } from 'Frontend/generated/endpoints';
import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { AutoCrud, AutoGrid } from '@vaadin/hilla-react-crud';
import PersonModel from 'Frontend/generated/com/example/application/data/entity/PersonModel';

export const config: ViewConfig = {
  menu: {
    order: 100,
    icon: 'la-th'
  }
};

export default function GridView() {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    PersonService.findAll().then(setPeople);
  }, []);


  return (
    <AutoCrud
      service={PersonService}
      model={PersonModel}
      className="h-full"
    />
  );
}