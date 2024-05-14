import { useState } from 'react';
import { MessageInput } from '@vaadin/react-components/MessageInput';
import { ChatService } from 'Frontend/generated/endpoints';
import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import Message, { MessageItem } from 'Frontend/components/Message';
import { useSignal } from '@preact/signals-react';

export const config: ViewConfig = {
  menu: {
    order: 400,
    icon: 'la-comments'
  }
};

export default function Chat() {
  const [messages, setMessages] = useState<MessageItem[]>([{
    role: 'assistant',
    content: 'Hello! How can I help you today?'
  }]);


  function send(text: string) {

    setMessages(prev => [...prev, {
      role: 'user',
      content: text
    }]);

    let first = true;
    ChatService.askQuestion(text).onNext(chunk => {

      // on the first chunk, append a new message with role 'assistant' and the first chunk of the response
      if (first) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: chunk
        }]);
        first = false;
      } else {

        // on subsequent chunks, update the last message with the new chunk
        setMessages(prev => prev.map((message, index) => {
          if (index === prev.length - 1) {
            return {
              ...message,
              content: message.content + chunk
            };
          }
          return message;
        }));
      }
    });
  }

  return (
    <div className='flex flex-col p-m box-border h-full'>
      <div className='flex-grow overflow-scroll'>
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>
      <MessageInput onSubmit={(e) => send(e.detail.value)} />
    </div>
  );
}