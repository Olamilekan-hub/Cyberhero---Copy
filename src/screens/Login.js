import { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import bg from "../assets/signup.png";
import Button from "../components/atoms/Button";
import Input from "../components/atoms/Input";
import { loginUser } from "../redux/actions/userActions";
import { onLogin } from "../redux/managers/dataManager";
import Loading from "./Loading";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loading: false,
      username_error: "",
      password_error: "",
    };
  }

  handleInputChange = (name, value) => {
    this.setState({
      [name]: value,
      [`${name}_error`]: "", 
    });
  };

  submit = () => {
    if (!this.validation()) {
      return;
    }
    this.loginAccount();
  };

  validation = () => {
    const { username, password } = this.state;
    let hasError = false;

    if (!username.trim()) {
      this.setState({ username_error: "Username is required" });
      hasError = true;
    }

    if (!password.trim()) {
      this.setState({ password_error: "Password is required" });
      hasError = true;
    }

    return !hasError;
  };

  loginAccount = async () => {
    try {
      const { dispatch } = this.props;
      const { username, password } = this.state;
      
      const body = {
        username: username.trim(),
        password: password.trim(),
      };

      this.setState({ loading: true, username_error: "", password_error: "" });
      
      const result = await dispatch(loginUser(body));
      console.log("Login result:", result);
      
      if (result.error) {
        // Handle login errors
        console.error("Login failed:", result.error);
        this.setState({
          username_error: result.error.message || "Login failed",
          loading: false,
        });
        return;
      }

      // Login successful - result.payload contains { user, tokens, message }
      if (result.payload && result.payload.tokens) {
        console.log("Login successful, loading user data...");
        
        // Trigger data loading
        await dispatch(onLogin());
        
        // Redirect to dashboard
        this.props.history.push("/hq");
        
      } else {
        // Handle unexpected response structure
        console.error("Unexpected login response:", result.payload);
        this.setState({
          username_error: "Login response error. Please try again.",
          loading: false,
        });
      }

    } catch (error) {
      console.error("Login error:", error);
      this.setState({
        username_error: "Login failed. Please try again.",
        loading: false,
      });
    }
  };

  render() {
    const { username, password, loading, username_error, password_error } = this.state;
    
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
              errorText={username_error}
            />
            <Input
              title="Password"
              name="password"
              type="password"
              value={password}
              handleOnChange={this.handleInputChange}
              errorText={password_error}
            />

            <ButtonContainer>
              <Button 
                text="Sign in" 
                handleOnClick={this.submit}
                disabled={loading}
              />
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

// Connect to Redux
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withRouter(Login));