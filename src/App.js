import React from "react";
import "./App.css";
import Header from "./component/Header/Header";
import SimpleBottomNavigation from "./component/MainNav";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container } from "@material-ui/core";
import Trending from "./Page/Trending/Trending";
import Search from "./Page/Search/Search";
import Series from "./Page/Series/Series";
import Movies from "./Page/Movies/Movies";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <Container>
          <Switch>
            <Route path="/" component={Trending} exact />
            <Route path="/movies" component={Movies} />
            <Route path="/series" component={Series} />
            <Route path="/search" component={Search} />
          </Switch>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </BrowserRouter>
  );
}
export default App;
