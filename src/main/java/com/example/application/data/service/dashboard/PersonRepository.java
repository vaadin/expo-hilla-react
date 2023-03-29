package com.example.application.data.service.dashboard;

import com.example.application.data.entity.Person;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, UUID> {

}