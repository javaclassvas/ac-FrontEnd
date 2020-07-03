import React, { useCallback, useContext, useEffect, useState } from "react";
import { withAsync } from "components/async/with-async";
import * as chatApi from "api/chat";
import {
  ChatContext,
  NEW_MESSAGE_EVENT
} from "components/chat-context-provider";
import MessageInput from "components/chat/chat-message-input/chat-message-input";
import { TAsyncResult } from "types/async";
import { TUser } from "types/user";
import { TMessage } from "types/chat";
import { sortBy } from "lodash-es";
import PubSub from "pubsub-js";
import {
  Message,
  UserMessage
} from "components/chat/chat-message/chat-message";

type TMessagesWindowProps = TAsyncResult<TMessage[]>;

type TMessagesListProps = {
  messages: TMessage[];
};

const MessagesList = ({ messages }: TMessagesListProps): React.ReactElement => {
  const { user: { id: userId } = {} as TUser } = useContext(ChatContext);
  return (
    <div className="overflow-auto h-100">
      {sortBy(messages, ({ createdAt }) => createdAt).map(message =>
        message.userId === userId ? (
          <UserMessage key={message.id} message={message} />
        ) : (
          <Message key={message.id} message={message} />
        )
      )}
    </div>
  );
};

const ChatMessages = ({ data }: TMessagesWindowProps): React.ReactElement => {
  const { user: { id: userId } = {} as TUser } = useContext(ChatContext);

  const [messages, setMessages] = useState<TMessage[]>(data);

  const handleNewMessage = useCallback(
    (msg: string, data: TMessage) => setMessages(messages.concat([data])),
    [messages, setMessages]
  );

  useEffect(() => {
    const token = PubSub.subscribe(NEW_MESSAGE_EVENT, handleNewMessage);
    return () => PubSub.unsubscribe(token);
  }, [handleNewMessage]);

  const sendMessage = useCallback(
    async (text: string): Promise<TMessage> =>
      chatApi.sendMessage(userId, text),
    [userId]
  );

  return (
    <div className="w-100 h-100 d-flex flex-column">
      <MessagesList messages={messages} />
      <MessageInput onAddMessage={sendMessage} />
    </div>
  );
};

export default withAsync(ChatMessages, () => chatApi.getLastMessages());