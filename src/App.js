import React, { createContext, useState } from 'react'
import Header from './Components/Header/Header'
import Shop from './Components/Shop/Shop'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Manage from './Components/Inventory/Manage';
import Review from './Components/Review/Review';
import ProductDetail from './Components/ProductDetail/ProductDetail';
import NotFound from './Components/NotFound/NotFound';
import Shipment from './Components/Shipment/Shipment';
import LogIn from './Components/LogIn/LogIn';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();


export default function App() {

  const [loggedInUser, setLoggedInUser] = useState({})

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
      <Header></Header>
        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>

          <Route path="/review">
            <Review></Review>
          </Route>

          <PrivateRoute path="/manage">
            <Manage></Manage>
          </PrivateRoute>

          <Route path="/login">
            <LogIn />
          </Route>

          <PrivateRoute path="/shipment">
            <Shipment />
          </PrivateRoute>

          <Route exact path="/">
            <Shop></Shop>
          </Route>

          <Route path="/product/:productkey">
            <ProductDetail></ProductDetail>
          </Route>

          <Route path="*">
            <NotFound></NotFound>
          </Route>

        </Switch>
      </Router>

    </UserContext.Provider>
  )
}
