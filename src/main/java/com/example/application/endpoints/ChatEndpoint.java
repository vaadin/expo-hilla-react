package com.example.application.endpoints;

import com.example.application.service.openai.ChatGPTService;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

import java.time.Instant;

@Endpoint
@AnonymousAllowed
public class ChatEndpoint {

    public ChatEndpoint(ChatGPTService chatGPTService) {
        this.chatGPTService = chatGPTService;
    }

    public record Message(
            String userName,
            String text,
            Instant time
    ) {
    }

    Sinks.Many<Message> messageSink = Sinks.many().multicast().directBestEffort();
    Flux<Message> chat = messageSink.asFlux();

    private final ChatGPTService chatGPTService;

    public Flux<Message> joinChat() {
        return chat;
    }

    public void sendMessage(String userName, String text) {
        messageSink.tryEmitNext(
                new Message(userName, text, Instant.now())
        );

        chatGPTService.getAnswer(text).subscribe(answer -> {
            messageSink.tryEmitNext(new Message("Chatbot", answer, Instant.now()));
        });
    }

}
