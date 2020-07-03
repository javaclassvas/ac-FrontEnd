import {TMessage} from "types/chat";
import React from "react";
import classNames from "classnames";
import styles from "components/chat/chat-message/chat-message.module.scss";
import UserAvatar from "components/user/user-name/user-avatar";
import moment from "moment";

type TUserMessageProps = {
  message: TMessage;
};

type TMessageProps = {
  message: TMessage;
  isUser?: boolean;
};

const Message = ({ message, isUser }: TMessageProps): React.ReactElement => {
  return (
    <div className={classNames(styles.message, { [styles.isUser]: isUser })}>
      <UserAvatar name={message.user ? message.user.nickname : ""} />
      <div className={styles.messageInner}>
        <div className={styles.text}>{message.content}</div>
        <span className={styles.date}>
          {moment(message.createdAt).format("DD.MM.YYYY HH:mm:ss")}
        </span>
      </div>
    </div>
  );
};

const UserMessage = (props: TUserMessageProps): React.ReactElement => (
  <Message {...props} isUser />
);

export {Message, UserMessage}
