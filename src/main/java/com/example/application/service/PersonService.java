package com.example.application.service;

import java.time.Duration;
import java.util.List;
import java.util.UUID;

import com.example.application.data.entity.Person;
import com.example.application.data.repository.PersonRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.Endpoint;
import com.vaadin.hilla.crud.CrudRepositoryService;
import reactor.core.publisher.Flux;

@BrowserCallable
@AnonymousAllowed
class PersonService extends CrudRepositoryService<Person, UUID, PersonRepository> {


  public List<Person> findAll() {
    return getRepository().findAll();
  }

  public Flux<Person> getPersonStream() {
    return Flux.fromIterable(getRepository().findAll())
            .delayElements(Duration.ofSeconds(1));
  }
}
