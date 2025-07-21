import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { onStart } from "./redux/managers/authManager";

import Nav from "./components/sections/Nav";
import logo from "./assets/logo.png";
// Screens //
import Home from "./screens/Home";
import About from "./screens/About";
import TermsOfUsage from "./screens/TermsOfUsage";
import Register from "./screens/Register";
import Login from "./screens/Login";
import HQ from "./screens/HQ";
import EmailVerify from "./screens/EmailVerify";
import Mission from "./screens/Mission";
import ScrollToTop from "./screens/ScrollToTop";
import Profile from "./screens/Profile";
import CartModal from "./components/containers/CartModal";
import { SEO } from "./components/atoms/SEO";

function App(props) {
  const [cartOpen, setCartOpen] = useState(false);
  let history = useHistory();
  const { dispatch, cart, currentBG } = props;
  // console.log("redux props", props);
  const { email, token } = props.user;
  const [bgMode, setBgMode] = useState(1);
  const url = window.location.pathname;
  useEffect(() => {
    const { dispatch } = props;
    dispatch(onStart());
    if (url === "/") setBgMode(1);
    else setBgMode(2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location]);

  const PrivateRoute = ({ children, ...rest }) => {
    // console.log({ ...rest });
    return (
      <Route
        {...rest}
        render={({ location }) =>
          token ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  };

  const PublicOnlyRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          token ? (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location },
              }}
            />
          ) : (
            children
          )
        }
      />
    );
  };

  // console.log("app-wide rerender");
  return (
    <Router>
      <Route exact path="/">
        <SEO 
          title="Mission G.A.I.A. - Environmental Education Gaming Platform"
          description="Transform learning with gamified environmental education. Interactive missions, hero training, and real-world challenges for kids aged 9-12."
          url="/"
          type="website"
        />
      </Route>

      <Route path="/about">
        <SEO 
          title="About Mission G.A.I.A. - Environmental Education Platform"
          description="Learn about our mission to foster ecoliteracy and social-emotional growth through interactive gaming and real-world environmental challenges."
          url="/about"
        />
      </Route>

      <Route path="/mission">
        <SEO 
          title="Environmental Missions - Interactive Learning | Mission G.A.I.A."
          description="Embark on environmental missions that teach climate science, sustainability, and conservation through gamified learning experiences."
          url="/mission"
        />
      </Route>
      <ScrollToTop />
      <MainContainer bg={currentBG}>
        <Nav
          history={history}
          signedIn={!!token}
          dispatch={dispatch}
          cartTotal={cart.length}
          toggleCart={() => setCartOpen(!cartOpen)}
        />
        {cartOpen && (
          <CartModal cart={cart} onCancel={() => setCartOpen(false)} />
        )}
        <Switch>
          <PrivateRoute path="/mission/:missionID/:taskName">
            <Mission />
          </PrivateRoute>
          <PrivateRoute path="/mission/:missionID">
            <Mission />
          </PrivateRoute>
          <PrivateRoute path="/mission">
            <Mission />
          </PrivateRoute>
          <PrivateRoute path="/profile">
            <Profile />
          </PrivateRoute>
          <PublicOnlyRoute path="/login">
            <Login dispatch={dispatch} />
          </PublicOnlyRoute>
          <PublicOnlyRoute path="/register">
            <Register dispatch={dispatch} verificationEmail={email} />
          </PublicOnlyRoute>
          <PublicOnlyRoute path="/confirm">
            <EmailVerify dispatch={dispatch} history={history} />
          </PublicOnlyRoute>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/terms">
            <TermsOfUsage />
          </Route>{" "}
          <Route path="/">{token ? <HQ history={history} /> : <Home />}</Route>
          <Route>{token ? <HQ history={history} /> : <Home />}</Route>
        </Switch>
      </MainContainer>
    </Router>
  );
}

export default connect((state) => {
  return {
    user: state.user.data,
    cart: state.cart.cart,
    currentBG: state.currentBG.currentBG,
  };
})(App);

const MainContainer = styled.div`
  ${({ bg }) =>
    `background: url(${bg}); 
      background-size: 100% 100%;
      background-repeat: no-repeat;
      `}
`;
