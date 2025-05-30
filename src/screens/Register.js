// React
import { Component } from "react";

// React Router
import { withRouter } from "react-router-dom";

// Redux
import {
  registerUser,
  resendVerificationEmail,
} from "../redux/actions/userActions";

// Styled Components
import styled from "styled-components";

// Components
import Loading from "./Loading";
import Button from "../components/atoms/Button";
import Input from "../components/atoms/Input";
import Checkbox from "../components/atoms/Checkbox";

// Utils
import { validateThis } from "../utils/validations";

// Assets
import bg from "../assets/signup.png";

class Register extends Component {
  constructor(props) {
    super(props);
    const { verificationEmail } = this.props;
    this.state = {
      username: "",
      email: "",
      password: "",
      password2: "",
      isSubscribed: false,
      loading: false,
      username_error: null,
      password_error: null,
      email_error: null,
      verificationEmail: verificationEmail || null,
      resend_error: null,
    };
  }

  handleInputChange = (name, value) => {
    this.setState({
      [name]: value,
      [`${name}_error`]: null,
    });
  };

  submit = () => {
    if (!this.validation()) {
      // console.log("validation error");
      return;
    }

    this.registerAccount();
  };

  validation = () => {
    const { username, email, password, password2 } = this.state;

    if (password !== password2) {
      this.setState({
        password_error: "Passwords don't match",
      });
      return false;
    }

    const username_error = validateThis(username, "username");
    const password_error = validateThis(password, "password");
    const email_error = validateThis(email, "email");

    if (username_error || password_error || email_error) {
      this.setState({
        username_error,
        password_error,
        email_error,
      });
      return false;
    }

    return true;
  };

  registerAccount = async () => {
    try {
      const { dispatch } = this.props;
      const { username, email, password, isSubscribed } = this.state;
      const body = {
        username: username.trim(),
        password: password.trim(),
        email: email.trim(),
        isSubscribed: isSubscribed,
      };
      console.log("body: ", body);
      this.setState({ loading: true });
      const result = await dispatch(registerUser(body));
      if (result.error) {
        const field = this.getErrorField(result.error.message);
        return this.setState({
          [field]: result.error.message,
          loading: false,
        });
      }

      this.setState({
        loading: false,
        verificationEmail: result.payload?.email,
      });
    } catch (error) {
      console.log("error:", error);
      // this.setState({ loading: false, username_error: error });
    }
  };

  getErrorField = (error) => {
    if (error.includes("Username")) return "username_error";

    return "email_error";
  };

  resendVerification = async () => {
    try {
      const { dispatch } = this.props;
      const { email, username } = this.state;
      const body = {
        email,
        username,
      };

      this.setState({ loading: true });
      const result = await dispatch(resendVerificationEmail(body));
      // console.log(result);
      if (result.error) {
        throw result.error.message;
      }
      alert("Verification email resent successfully");
      this.setState({ loading: false });
    } catch (error) {
      console.log(error);
      alert(`Verification email error: ${error}`);
      this.setState({ loading: false, resend_error: error });
    }
  };

  render() {
    const {
      username,
      email,
      password,
      password2,
      isSubscribed,
      loading,
      username_error,
      password_error,
      email_error,
      verificationEmail,
    } = this.state;
    // console.log(this.state);
    return (
      <>
        {loading && <Loading />}
        <MainContainer>
          {verificationEmail ? (
            <ResendContainer>
              <h2>Email Validation Required</h2>
              <h3>
                A verification email was sent to {verificationEmail}. Click the
                link included to finish activating your account.
              </h3>
              <p>
                Didn't receive the email? Check your spam folders or click the
                button below.
              </p>
              <ButtonContainer>
                <Button
                  text="Resend Email"
                  handleOnClick={this.resendVerification}
                />
              </ButtonContainer>
            </ResendContainer>
          ) : (
            <InnerContainer>
              <Input
                title="Username"
                name="username"
                value={username}
                handleOnChange={this.handleInputChange}
                errorText={username_error}
              />
              <Input
                title="Email"
                name="email"
                value={email}
                handleOnChange={this.handleInputChange}
                errorText={email_error}
              />
              <Input
                title="Password"
                name="password"
                type="password"
                value={password}
                handleOnChange={this.handleInputChange}
                errorText={password_error}
              />
              <Input
                title="Password Repeat"
                name="password2"
                type="password"
                value={password2}
                handleOnChange={this.handleInputChange}
              />

              <Checkbox
                title="I want to receive news and updates"
                name="isSubscribed"
                value={isSubscribed}
                handleOnChange={this.handleInputChange}
              />

              <ButtonContainer>
                <Button text="Sign up" handleOnClick={this.submit} />
              </ButtonContainer>
            </InnerContainer>
          )}
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
  text-align: center;
  width: 80%;
  max-width: 600px;
  @media (min-width: 768px) {
    width: 60%;
  }
  @media (min-width: 1024px) {
    width: 40%;
  }
`;

const ResendContainer = styled(InnerContainer)`
  h2,
  h3,
  p {
    margin: 10px 0;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

export default withRouter(Register);
