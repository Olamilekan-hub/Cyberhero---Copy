import { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import bg from "../assets/signup.png";
import Button from "../components/atoms/Button";
import Input from "../components/atoms/Input";
import { loginUser } from "../redux/actions/userActions";
import Loading from "./Loading";
import { onLogin } from "../redux/managers/dataManager";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loading: false,
      error: null,
    };
  }

  handleInputChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  submit = () => {
    if (!this.validation()) {
      // console.log("validation error");
      return;
    }

    this.loginAccount();
  };

  validation = () => {
    const { username, password } = this.state;

    if (!username || !password) {
      this.setState({
        error: "Enter username and password",
      });
      return false;
    }

    return true;
  };

  handleLogin = async () => {
    try {
      const { dispatch } = this.props;
      const { username, password } = this.state;
      
      if (!username || !password) {
        return this.setState({
          username_error: !username ? "Username is required" : "",
          password_error: !password ? "Password is required" : "",
        });
      }

      const body = {
        username: username.trim(),
        password: password,
      };

      this.setState({ loading: true, username_error: "", password_error: "" });
      
      const result = await dispatch(loginUser(body));
      
      if (result.error) {
        console.error("Login error:", result.error);
        return this.setState({
          username_error: result.error.message || "Login failed",
          password_error: "",
          loading: false,
        });
      }

      console.log("Login successful:", result.payload);
      
      await dispatch(onLogin());
      
      window.location.href = "/hq"; 
      
    } catch (error) {
      console.error("Login error:", error);
      this.setState({
        username_error: "Login failed. Please try again.",
        loading: false,
      });
    }
  };

  // loginAccount = async () => {
  //   try {
  //     const { dispatch } = this.props;
  //     const { username, password } = this.state;
  //     const body = {
  //       username: username.trim(),
  //       password: password.trim(),
  //     };
  //     this.setState({ loading: true, error: null });
  //     const result = await dispatch(loginUser(body));
  //     // console.log("login result", result);
  //     await this.handleLoginResult(result);
  //   } catch (error) {
  //     console.log(error);
  //     this.setState({ loading: false, error });
  //   }
  // };

  handleLoginResult = (result) => {
    const { history } = this.props;
    switch (true) {
      case !!result.error:
        throw result.error.message;
      case !!result.payload.email:
        return history.push("/register");
      default:
        return;
    }
  };

  render() {
    const { username, password, loading, error } = this.state;
    // console.log(this.state);
    return (
      <>
        {loading && <Loading />}
        <MainContainer>
          <InnerContainer>
            <Input
              title="Username"
              name="username"
              value={username}
              handleOnChange={this.handleInputChange}
            />
            <Input
              title="Password"
              name="password"
              type="password"
              value={password}
              handleOnChange={this.handleInputChange}
              errorText={error}
            />

            <ButtonContainer>
              <Button text="Sign in" handleOnClick={this.submit} />
            </ButtonContainer>
          </InnerContainer>
        </MainContainer>
      </>
    );
  }
}

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - var(--nav-height));
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 600px;
  @media (min-width: 768px) {
    width: 60%;
  }
  @media (min-width: 1024px) {
    width: 40%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

export default withRouter(Login);
