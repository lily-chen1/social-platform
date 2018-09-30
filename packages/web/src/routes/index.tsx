import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthRoute } from "@abb/controller";

import { RegisterConnector } from "../modules/register/RegisterConnector";
import { LoginConnector } from "../modules/login/LoginConnector";
import { ForgotPasswordConnector } from "../modules/forgotPassword/ForgotPasswordConnector";
import { ChangePasswordConnector } from "../modules/changePassword/ChangePasswordConnector";
import { TextPage } from "../modules/TextPage";
import { DemoDelete } from "../modules/listing/delete/DemoDelete";
import { CreateListingConnector } from "../modules/listing/create/CreateListingConnector";
import { FindListingsConnector } from "../modules/listing/find/FindListingsConnector";
import { Logout } from "../modules/logout";
import { ViewListingConnector } from "../modules/listing/view/ViewListingConnector";
import { MessageConnector } from "../modules/listing/messages/MessageConnector";
import { EditListingConnector } from "../modules/listing/edit/EditListingConnector";
import { Homepage } from "../modules/homepage/homepage";
import { CommentConnector } from "../modules/listing/comments/CommentConnector";
import { ModalContainer, ModalRoute } from "react-router-modal";
import { ListingModalConnector } from "../modules/listing/find/ListingModalConnector";

export const Routes = () => (
  <BrowserRouter>
    <React.Fragment>
      <Switch>
        <Route exact={true} path="/" component={Homepage} />
        <Route exact={true} path="/register" component={RegisterConnector} />
        <Route exact={true} path="/login" component={LoginConnector} />
        <Route
          exact={true}
          path="/forgot-password"
          component={ForgotPasswordConnector}
        />
        <Route
          exact={true}
          path="/change-password/:key"
          component={ChangePasswordConnector}
        />
        <Route path="/m" component={TextPage} />
        <Route path="/listings" component={FindListingsConnector} />
        <Route path="/logout" component={Logout} />
        <Route
          exact={true}
          path="/listing/:listingId"
          component={ViewListingConnector}
        />
        <Route path="/listings/:listingId/chat" component={MessageConnector} />
        <Route
          path="/listing/:listingId/edit"
          component={EditListingConnector}
        />
        <AuthRoute path="/create-listing" component={CreateListingConnector} />
        <AuthRoute path="/delete-demo" component={DemoDelete} />
      </Switch>
      <ModalRoute
        component={ListingModalConnector}
        path="/listings/:listingId/modal"
      />
      <ModalRoute
        component={CommentConnector}
        path="/listings/:listingId/modal"
      />
      <ModalContainer />
    </React.Fragment>
  </BrowserRouter>
);
