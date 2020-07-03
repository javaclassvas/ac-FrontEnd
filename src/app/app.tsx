import React from "react";
import { Switch, BrowserRouter } from "react-router-dom";
import "app/app.module.scss";
import { ChatContextProvider } from "components/chat-context-provider";
import ChatRouter from "app/chat-router";

const App = (): React.ReactElement => {
  return (
    <BrowserRouter>
      <ChatContextProvider>
        <Switch>
          <ChatRouter />
        </Switch>
      </ChatContextProvider>
    </BrowserRouter>
  );
};

export default App;
