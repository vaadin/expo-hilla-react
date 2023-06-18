import { useEffect, useState } from 'react';
import { ChatEndpoint } from 'Frontend/generated/endpoints';
import  Message  from 'Frontend/generated/com/example/application/endpoints/ChatEndpoint/Message';
import { MessageList } from '@hilla/react-components/MessageList';
import { MessageInput } from '@hilla/react-components/MessageInput';

export function ChatView() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    ChatEndpoint.joinChat().onNext((message) => {
      setMessages((prevState) => [...prevState, message]);
    });
  }, []);

  function send(text: string) {
    ChatEndpoint.sendMessage("Human", text);
  }

  return (
    <div className="flex flex-col p-m box-border h-full">
      <MessageList className="flex-grow" items={messages} />
      <MessageInput onSubmit={(e) => send(e.detail.value)} />
    </div>
  );
}