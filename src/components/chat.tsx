import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import UsersList from "components/user/users-list/users-list";
import MessagesWindow from "components/chat/chat-messages/chat-messages";
import ChatHeader from "components/chat/chat-header/chat-header";
import ChatInfo from "components/chat/chat-info/chat-info";

const Chat = (): React.ReactElement => (
  <Container fluid className="h-100 d-flex flex-column">
    <Row className="no-gutters">
      <Col lg={3} className="d-none d-lg-block">
        <ChatHeader />
      </Col>
      <Col>
        <ChatInfo />
      </Col>
    </Row>
    <Row className="overflow-hidden flex-grow-1 flex-shrink-1">
      <Col
        lg={3}
        className="d-none d-lg-block flex-grow-1 flex-shrink-1 overflow-hidden h-100"
      >
        <UsersList />
      </Col>
      <Col className="flex-grow-1 flex-shrink-1 overflow-hidden h-100">
        <MessagesWindow />
      </Col>
    </Row>
  </Container>
);

export default Chat;
