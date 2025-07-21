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
import PasswordInput from "../components/atoms/PasswordInput";

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
              <PasswordInput
                  title="Password"
                  name="password"
                  value={password}
                  handleOnChange={this.handleInputChange}
                  errorText={password_error}
                  showStrength={true}
                  userInfo={{
                    username: username,
                    email: email
                  }}
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



// // React
// import { Component } from "react";

// // React Router
// import { withRouter } from "react-router-dom";

// // Redux
// import {
//   registerUser,
//   resendVerificationEmail,
// } from "../redux/actions/userActions";

// // Styled Components
// import styled from "styled-components";

// // Components
// import Loading from "./Loading";
// import Button from "../components/atoms/Button";
// import Input from "../components/atoms/Input";
// import Checkbox from "../components/atoms/Checkbox";

// // Utils
// import { validateThis } from "../utils/validations";

// // Assets
// import bg from "../assets/signup.png";

// class Register extends Component {
//   constructor(props) {
//     super(props);
//     const { verificationEmail } = this.props;
//     this.state = {
//       username: "",
//       email: "",
//       password: "",
//       password2: "",
//       age: "", // ADD THIS
//       isSubscribed: false,
//       preferences: { // ADD THIS
//         newFeatures: true,
//         contentUpdates: true,
//         announcements: true,
//         missionUpdates: true
//       },
//       loading: false,
//       username_error: null,
//       password_error: null,
//       email_error: null,
//       age_error: null, // ADD THIS
//       verificationEmail: verificationEmail || null,
//       resend_error: null,
//     };
//   }

//   handleInputChange = (name, value) => {
//     this.setState({
//       [name]: value,
//       [`${name}_error`]: null,
//     });
//   };

//   // ADD THIS METHOD
//   handlePreferenceChange = (name, value) => {
//     this.setState({
//       preferences: {
//         ...this.state.preferences,
//         [name]: value
//       }
//     });
//   };

//   submit = () => {
//     if (!this.validation()) {
//       return;
//     }

//     this.registerAccount();
//   };

//   validation = () => {
//     const { username, email, password, password2, age } = this.state;

//     if (password !== password2) {
//       this.setState({
//         password_error: "Passwords don't match",
//       });
//       return false;
//     }

//     // ADD AGE VALIDATION
//     let age_error = null;
//     if (age && (isNaN(age) || age < 6 || age > 99)) {
//       age_error = "Please enter a valid age between 6 and 99";
//     }

//     const username_error = validateThis(username, "username");
//     const password_error = validateThis(password, "password");
//     const email_error = validateThis(email, "email");

//     if (username_error || password_error || email_error || age_error) {
//       this.setState({
//         username_error,
//         password_error,
//         email_error,
//         age_error, // ADD THIS
//       });
//       return false;
//     }

//     return true;
//   };

//   registerAccount = async () => {
//     try {
//       const { dispatch } = this.props;
//       const { username, email, password, age, isSubscribed, preferences } = this.state;
//       const body = {
//         username: username.trim(),
//         password: password.trim(),
//         email: email.trim(),
//         age: age ? parseInt(age) : null, // ADD THIS
//         isSubscribed: isSubscribed,
//         preferences: preferences // ADD THIS
//       };
//       console.log("Registration body: ", body);
//       this.setState({ loading: true });
//       const result = await dispatch(registerUser(body));
//       if (result.error) {
//         const field = this.getErrorField(result.error.message);
//         return this.setState({
//           [field]: result.error.message,
//           loading: false,
//         });
//       }

//       this.setState({
//         loading: false,
//         verificationEmail: result.payload?.email,
//       });
//     } catch (error) {
//       console.log("error:", error);
//     }
//   };

//   getErrorField = (error) => {
//     if (error.includes("Username")) return "username_error";
//     return "email_error";
//   };

//   resendVerification = async () => {
//     try {
//       const { dispatch } = this.props;
//       const { email, username } = this.state;
//       const body = {
//         email,
//         username,
//       };

//       this.setState({ loading: true });
//       const result = await dispatch(resendVerificationEmail(body));
//       if (result.error) {
//         throw result.error.message;
//       }
//       alert("Verification email resent successfully");
//       this.setState({ loading: false });
//     } catch (error) {
//       console.log(error);
//       alert(`Verification email error: ${error}`);
//       this.setState({ loading: false, resend_error: error });
//     }
//   };

//   render() {
//     const {
//       username,
//       email,
//       password,
//       password2,
//       age, // ADD THIS
//       isSubscribed,
//       preferences, // ADD THIS
//       loading,
//       username_error,
//       password_error,
//       email_error,
//       age_error, // ADD THIS
//       verificationEmail,
//     } = this.state;

//     return (
//       <>
//         {loading && <Loading />}
//         <MainContainer>
//           {verificationEmail ? (
//             <ResendContainer>
//               <h2>Email Validation Required</h2>
//               <h3>
//                 A verification email was sent to {verificationEmail}. Click the
//                 link included to finish activating your account.
//               </h3>
//               <p>
//                 Didn't receive the email? Check your spam folders or click the
//                 button below.
//               </p>
//               <ButtonContainer>
//                 <Button
//                   text="Resend Email"
//                   handleOnClick={this.resendVerification}
//                 />
//               </ButtonContainer>
//             </ResendContainer>
//           ) : (
//             <InnerContainer>
//               <Input
//                 title="Username"
//                 name="username"
//                 value={username}
//                 handleOnChange={this.handleInputChange}
//                 errorText={username_error}
//               />
//               <Input
//                 title="Email"
//                 name="email"
//                 value={email}
//                 handleOnChange={this.handleInputChange}
//                 errorText={email_error}
//               />
//               <Input
//                 title="Password"
//                 name="password"
//                 type="password"
//                 value={password}
//                 handleOnChange={this.handleInputChange}
//                 errorText={password_error}
//               />
//               <Input
//                 title="Password Repeat"
//                 name="password2"
//                 type="password"
//                 value={password2}
//                 handleOnChange={this.handleInputChange}
//               />

//               {/* ADD AGE FIELD */}
//               <Input
//                 title="Age (helps us send age-appropriate content)"
//                 name="age"
//                 type="number"
//                 value={age}
//                 handleOnChange={this.handleInputChange}
//                 errorText={age_error}
//                 placeholder="Enter your age (optional)"
//               />

//               {/* UPDATED EMAIL PREFERENCES SECTION */}
//               <EmailPreferencesSection>
//                 <SectionTitle>📧 Email Preferences</SectionTitle>
//                 <SectionDescription>
//                   Stay updated with Mission: G.A.I.A.! Choose what updates you'd like to receive.
//                 </SectionDescription>
                
//                 <Checkbox
//                   title="📬 Receive email updates about Mission: G.A.I.A."
//                   name="isSubscribed"
//                   value={isSubscribed}
//                   handleOnChange={this.handleInputChange}
//                 />

//                 {isSubscribed && (
//                   <SubPreferences>
//                     <SubTitle>What would you like to hear about?</SubTitle>
                    
//                     <Checkbox
//                       title="🚀 New features & game updates"
//                       name="newFeatures"
//                       value={preferences.newFeatures}
//                       handleOnChange={this.handlePreferenceChange}
//                     />
                    
//                     <Checkbox
//                       title="📚 New missions & content releases"
//                       name="contentUpdates"
//                       value={preferences.contentUpdates}
//                       handleOnChange={this.handlePreferenceChange}
//                     />
                    
//                     <Checkbox
//                       title="📢 Important announcements"
//                       name="announcements"
//                       value={preferences.announcements}
//                       handleOnChange={this.handlePreferenceChange}
//                     />
                    
//                     <Checkbox
//                       title="🌍 Environmental mission updates"
//                       name="missionUpdates"
//                       value={preferences.missionUpdates}
//                       handleOnChange={this.handlePreferenceChange}
//                     />
//                   </SubPreferences>
//                 )}
//               </EmailPreferencesSection>

//               <ButtonContainer>
//                 <Button text="Sign up" handleOnClick={this.submit} />
//               </ButtonContainer>
//             </InnerContainer>
//           )}
//         </MainContainer>
//       </>
//     );
//   }
// }

// // // ADD THESE STYLED COMPONENTS
// // const MainContainer = styled.div`
// //   display: flex;
// //   justify-content: center;
// //   align-items: center;
// //   min-height: 100vh;
// //   background-image: url(${bg});
// //   background-size: cover;
// //   background-position: center;
// // `;

// // const InnerContainer = styled.div`
// //   background: rgba(0, 0, 0, 0.8);
// //   padding: 40px;
// //   border-radius: 15px;
// //   max-width: 500px;
// //   width: 90%;
// //   backdrop-filter: blur(10px);
// //   border: 1px solid rgba(22, 202, 202, 0.3);
// // `;

// // const ResendContainer = styled.div`
// //   background: rgba(0, 0, 0, 0.9);
// //   padding: 40px;
// //   border-radius: 15px;
// //   max-width: 600px;
// //   width: 90%;
// //   text-align: center;
// //   color: white;
// //   backdrop-filter: blur(10px);
// //   border: 1px solid rgba(22, 202, 202, 0.3);
// // `;

// const ButtonContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-top: 30px;
// `;

// const MainContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   min-height: calc(100vh - var(--nav-height));
//   background-image: url(${bg});
//   background-size: cover;
//   background-position: center;
//   background-repeat: no-repeat;
// `;

// const InnerContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   text-align: center;
//   width: 80%;
//   max-width: 600px;
//   @media (min-width: 768px) {
//     width: 60%;
//   }
//   @media (min-width: 1024px) {
//     width: 40%;
//   }
// `;

// const ResendContainer = styled(InnerContainer)`
//   h2,
//   h3,
//   p {
//     margin: 10px 0;
//   }
// `;

// // const ButtonContainer = styled.div`
// //   display: flex;
// //   justify-content: center;
// //   margin-top: 50px;
// // `;

// const EmailPreferencesSection = styled.div`
//   margin: 25px 0;
//   padding: 20px;
//   border: 1px solid var(--cyan);
//   border-radius: 10px;
//   background: rgba(22, 202, 202, 0.1);
// `;

// const SectionTitle = styled.h3`
//   color: var(--cyan);
//   margin-bottom: 10px;
//   font-size: 18px;
// `;

// const SectionDescription = styled.p`
//   color: rgba(255, 255, 255, 0.8);
//   margin-bottom: 20px;
//   font-size: 14px;
//   line-height: 1.4;
// `;

// const SubPreferences = styled.div`
//   margin-left: 20px;
//   margin-top: 20px;
//   padding-left: 20px;
//   border-left: 3px solid var(--cyan);
// `;

// const SubTitle = styled.h4`
//   color: var(--cyan);
//   margin-bottom: 15px;
//   font-size: 16px;
// `;

// export default withRouter(Register);