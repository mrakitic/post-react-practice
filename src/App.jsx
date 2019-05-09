import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {  PostDetails, Posts } from "./views";
import { AppLayout } from "./components";

export const App = () => {
  
    return (
      <BrowserRouter>
        <AppLayout>
          <Switch>            
            <Route exact path="/post" component={Posts} />
            <Route path="/post/:id" component={PostDetails} />
          </Switch>
        </AppLayout>
      </BrowserRouter>
    );
  }

