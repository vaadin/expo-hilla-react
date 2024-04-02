import { useEffect, useState } from 'react';
import { MessageList } from '@vaadin/react-components/MessageList';
import { MessageInput } from '@vaadin/react-components/MessageInput';
import { ChatService } from 'Frontend/generated/endpoints';
import Message from 'Frontend/generated/com/example/application/service/ChatService/Message';

export function ChatView() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    ChatService.joinChat().onNext((message) => {
      setMessages((prevState) => [...prevState, message]);
    });
  }, []);

  function send(text: string) {
    ChatService.sendMessage("Human", text);
  }

  return (
    <div className="flex flex-col p-m box-border h-full">
      <MessageList className="flex-grow" items={messages} />
      <MessageInput onSubmit={(e) => send(e.detail.value)} />
    </div>
  );
}