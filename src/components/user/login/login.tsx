import React, { ChangeEvent, useCallback, useContext, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import styles from "components/user/login/login.module.scss";
import { ChatContext } from "components/chat-context-provider";
import { useHistory } from "react-router-dom";

const Login = (): React.ReactElement => {
  const { login } = useContext(ChatContext);
  const [nickname, setNickname] = useState("");
  const { push } = useHistory();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await login(nickname);
    push("/");
    return false;
  };

  const handleChangeNickname = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
      setNickname(value),
    []
  );

  return (
    <div className={styles.container}>
      <Form onSubmit={handleSubmit}>
        <Modal.Dialog centered>
          <Modal.Header>
            <Modal.Title>Login to chat</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group>
              <Form.Label>Nickname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter nickname"
                required
                value={nickname}
                onChange={handleChangeNickname}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Form>
    </div>
  );
};

export default Login;
