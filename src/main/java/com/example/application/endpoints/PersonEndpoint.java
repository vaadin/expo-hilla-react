package com.example.application.endpoints;

import java.util.List;
import com.example.application.data.entity.Person;
import com.example.application.data.repository.PersonRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;

@Endpoint
@AnonymousAllowed
class PersonEndpoint {
  private PersonRepository repo;

  PersonEndpoint(PersonRepository repo) {
    this.repo = repo;
  }

  public List<Person> findAll() {
    return repo.findAll();
  }

  public Person save(Person person) {
    return repo.save(person);
  }
}
