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
import NewHome from "./screens/NewHome";
import About from "./screens/About";
import TermsOfUsage from "./screens/TermsOfUsage";
import Register from "./screens/Register";
import Login from "./screens/Login";
import HQ from "./screens/HQ";
import EmailVerify from "./screens/EmailVerify";
import Mission from "./screens/Mission";
import ScrollToTop from "./screens/ScrollToTop";
import Profile from "./screens/Profile";
import NotAvailable from "./screens/NotAvailable";
import CartModal from "./components/containers/CartModal";
import { SEO } from "./components/atoms/SEO";

// Footer component
function FooterComponent() {
  return (
    <Footer>
      <FooterRow>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <FooterLogo src={logo} alt="Mission GAIA Logo" />
          {/* <span><strong>Mission: G.A.I.A.</strong></span> */}
        </div>
        <FooterLinks>
          <a href="/about">About</a>
          <a href="/terms">Terms</a>
          <a href="mailto:hello@missiongaia.org">Contact</a>
        </FooterLinks>
      </FooterRow>
      <FooterCopyright>
        &copy; {new Date().getFullYear()} Mission: G.A.I.A. &mdash; All rights reserved.
      </FooterCopyright>
    </Footer>
  );
}

const Footer = styled.footer`
  width: 100vw;
  background: #000;
  color: #eaeaea;
  padding: 36px 0 24px 0;
  display: flex;
  gap: 12px;
  flex-direction: column;
  align-items: center;
  font-size: 1rem;
  font-family: 'Manrope', 'Trebuchet MS', 'Segoe UI', Arial, sans-serif;
  box-shadow: 0 -2px 16px rgba(0,0,0,0.12);

  @media (max-width: 600px) {
    font-size: 0.95rem;
    padding: 24px 0 16px 0;
  }
`;
const FooterRow = styled.div`
  width: 90%;
  max-width: 1700px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  margin-bottom: 12px;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;
    width: 98%;
  }
`;
const FooterLogo = styled.img`
  height: 40px;
  margin-right: 12px;
  
  @media (max-width: 768px) {
  height: 35px;
  }
  
  @media (max-width: 468px) {
  height: 28px;
  }
`;
const FooterLinks = styled.div`
  display: flex;
  gap: 18px;
  flex-wrap: wrap;

  a {
    color: #ffa726;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
    &:hover {
      color: #fff;
      text-decoration: underline;
    }
  }
`;
const FooterCopyright = styled.div`
  width: 90%;
  max-width: 1200px;
  text-align: center;
  font-size: 0.95rem;
  color: #aaa;
  margin-top: 8px;
`;

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
          description="Mission: G.A.I.A. is a dynamic edtech platform blending gamified learning with real-world environmental challenges. Interactive hero training and global missions for 9-12 year-olds, fostering ecoliteracy and social-emotional growth."
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
          <Route path="/login">
            <NotAvailable />
          </Route>
          <Route path="/register">
            <NotAvailable />
          </Route>
          <PublicOnlyRoute path="/confirm">
            <EmailVerify dispatch={dispatch} history={history} />
          </PublicOnlyRoute>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/terms">
            <TermsOfUsage />
          </Route>{" "}
          <Route path="/">{token ? <HQ history={history} /> : <NewHome />}</Route>
          {/* <Route path="/">{token ? <HQ history={history} /> : <Home />}</Route> */}
          <Route>{token ? <HQ history={history} /> : <NewHome />}</Route>
          {/* <Route>{token ? <HQ history={history} /> : <Home />}</Route> */}
        </Switch>
        <FooterComponent />
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
