import React, { useRef, useState } from "react";
import styles from "components/chat/chat-message-input/chat-message-input.module.scss";
import { Button, Form } from "react-bootstrap";
import { Send } from "react-feather";
import classNames from "classnames";
import { TMessage } from "types/chat";

type TMessageInputProps = {
  onAddMessage?: (text: string) => Promise<TMessage>;
};

type TMessageInputState = {
  messageValue: string;
  executing: boolean;
};

const MessageInput = ({
  onAddMessage
}: TMessageInputProps): React.ReactElement => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [{ messageValue, executing }, setMessageInputState] = useState<
    TMessageInputState
  >({
    messageValue: "",
    executing: false
  });

  const handleMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    if (textareaRef.current) {
      const element = textareaRef.current;
      element.style.height = "";
      element.style.height = `${element.scrollHeight + 2}px`;
    }
    setMessageInputState({
      messageValue: event.target.value as string,
      executing
    });
  };

  const sendMessage = async (): Promise<void> => {
    setMessageInputState({ messageValue, executing: true });
    if (onAddMessage) {
      await onAddMessage(messageValue);
    }
    setMessageInputState({ messageValue: "", executing: false });
    if (textareaRef.current) {
      const element = textareaRef.current;
      element.style.height = "";
      element.focus();
    }
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ): boolean => {
    if (event.key === "Enter" && !event.ctrlKey && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
      return false;
    }
    return true;
  };
  return (
    <div className={styles.cont}>
      <Button
        className={classNames(styles.sendButton, "p-1")}
        variant="outline-primary"
        onClick={sendMessage}
      >
        <Send />
      </Button>
      <Form.Control
        as="textarea"
        ref={textareaRef}
        className={styles.input}
        disabled={executing}
        placeholder="Your message text"
        rows={1}
        value={messageValue}
        onChange={handleMessageChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default MessageInput;
