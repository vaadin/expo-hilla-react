package com.example.application.service;

import java.time.Duration;
import java.util.List;
import com.example.application.data.entity.Person;
import com.example.application.data.repository.PersonRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import reactor.core.publisher.Flux;

@Endpoint
@AnonymousAllowed
class PersonService {
  private PersonRepository repo;

  PersonService(PersonRepository repo) {
    this.repo = repo;
  }

  public List<Person> findAll() {
    return repo.findAll();
  }

  public Person save(Person person) {
    return repo.save(person);
  }

  public Flux<Person> getPersonStream() {
    return Flux.fromIterable(repo.findAll())
            .delayElements(Duration.ofSeconds(1));
  }
}
