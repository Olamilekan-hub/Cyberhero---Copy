// src/components/containers/EmailPreferences.js
import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Button from "../atoms/Button";
import Checkbox from "../atoms/Checkbox";
import DoubleBorderFrame from "./DoubleBorderFrame";
import Header from "../atoms/Header";
import { PostRequest } from "../../utils/fetchFunctions";

const EmailPreferences = ({ user, onClose }) => {
  const [preferences, setPreferences] = useState({
    isSubscribed: true,
    newFeatures: true,
    contentReleases: true,
    announcements: true,
    missionUpdates: true
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePreferenceChange = (name, value) => {
    setPreferences(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await PostRequest("/.netlify/functions/updateEmailPreferences", {
        userID: user.userID,
        email: user.email,
        isSubscribed: preferences.isSubscribed,
        preferences
      });
      
      setMessage("Email preferences updated successfully!");
      setTimeout(() => {
        setMessage("");
        onClose?.();
      }, 2000);
    } catch (error) {
      setMessage("Failed to update preferences. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DoubleBorderFrame width="90%">
      <Container>
        <Header color="var(--cyan)" size="24px">
          📧 Email Preferences
        </Header>
        
        <Description>
          Stay updated with Mission: G.A.I.A.! Choose what updates you'd like to receive.
        </Description>

        <PreferencesContainer>
          <Checkbox
            title="📬 Receive email updates"
            name="isSubscribed"
            value={preferences.isSubscribed}
            handleOnChange={handlePreferenceChange}
          />
          
          {preferences.isSubscribed && (
            <SubPreferences>
              <Checkbox
                title="🚀 New Features & Updates"
                name="newFeatures"
                value={preferences.newFeatures}
                handleOnChange={handlePreferenceChange}
              />
              
              <Checkbox
                title="📚 New Content & Missions"
                name="contentReleases"
                value={preferences.contentReleases}
                handleOnChange={handlePreferenceChange}
              />
              
              <Checkbox
                title="📢 Important Announcements"
                name="announcements"
                value={preferences.announcements}
                handleOnChange={handlePreferenceChange}
              />
              
              <Checkbox
                title="🌍 Mission Progress Updates"
                name="missionUpdates"
                value={preferences.missionUpdates}
                handleOnChange={handlePreferenceChange}
              />
            </SubPreferences>
          )}
        </PreferencesContainer>

        {message && (
          <Message success={message.includes('success')}>
            {message}
          </Message>
        )}

        <ButtonContainer>
          <Button 
            text={loading ? "Saving..." : "Save Preferences"}
            handleOnClick={handleSave}
            disabled={loading}
          />
          {onClose && (
            <Button 
              text="Cancel"
              handleOnClick={onClose}
            />
          )}
        </ButtonContainer>
      </Container>
    </DoubleBorderFrame>
  );
};

export default connect((state) => ({
  user: state.user.data
}))(EmailPreferences);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  text-align: center;
`;

const Description = styled.p`
  color: var(--cyan);
  margin: 20px 0;
  max-width: 500px;
  line-height: 1.6;
`;

const PreferencesContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 20px 0;
  text-align: left;
`;

const SubPreferences = styled.div`
  margin-left: 30px;
  margin-top: 15px;
  padding-left: 20px;
  border-left: 2px solid var(--cyan);
`;

const Message = styled.div`
  padding: 10px 20px;
  border-radius: 5px;
  margin: 10px 0;
  color: ${props => props.success ? '#2eff58' : '#ff6b6b'};
  background: ${props => props.success ? 'rgba(46, 255, 88, 0.1)' : 'rgba(255, 107, 107, 0.1)'};
  border: 1px solid ${props => props.success ? '#2eff58' : '#ff6b6b'};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;