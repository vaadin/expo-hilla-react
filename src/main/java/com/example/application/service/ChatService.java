package com.example.application.service;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import org.springframework.ai.chat.StreamingChatClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

import java.time.Instant;

@BrowserCallable
@AnonymousAllowed
public class ChatService {

    private final StreamingChatClient chatClient;

    public ChatService(StreamingChatClient chatClient) {
        this.chatClient = chatClient;
    }

    public Flux<String> askQuestion(String question) {
        return chatClient.stream(question);
    }

}
