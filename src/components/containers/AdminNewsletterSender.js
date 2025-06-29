// src/components/containers/AdminNewsletterSender.js
import React, { useState } from "react";
import styled from "styled-components";
import Button from "../atoms/Button";
import DoubleBorderFrame from "./DoubleBorderFrame";
import Header from "../atoms/Header";
import { PostRequest } from "../../utils/fetchFunctions";

const AdminNewsletterSender = () => {
  const [newsletter, setNewsletter] = useState({
    subject: "",
    content: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (field, value) => {
    setNewsletter(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSend = async () => {
    if (!newsletter.subject || !newsletter.content) {
      setMessage("Please fill in both subject and content");
      return;
    }

    try {
      setLoading(true);
      const response = await PostRequest("/.netlify/functions/sendNewsletter", newsletter);
      setMessage("Newsletter sent successfully!");
      setNewsletter({ subject: "", content: "" });
    } catch (error) {
      setMessage("Failed to send newsletter. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DoubleBorderFrame width="90%">
      <Container>
        <Header color="var(--cyan)" size="24px">
          📧 Send Newsletter
        </Header>
        
        <InputGroup>
          <Label>Subject Line:</Label>
          <Input
            type="text"
            value={newsletter.subject}
            onChange={(e) => handleInputChange('subject', e.target.value)}
            placeholder="Enter newsletter subject..."
          />
        </InputGroup>

        <InputGroup>
          <Label>Content (HTML supported):</Label>
          <TextArea
            value={newsletter.content}
            onChange={(e) => handleInputChange('content', e.target.value)}
            placeholder="Enter newsletter content..."
            rows={10}
          />
        </InputGroup>

        {message && (
          <Message success={message.includes('success')}>
            {message}
          </Message>
        )}

        <ButtonContainer>
          <Button 
            text={loading ? "Sending..." : "Send Newsletter"}
            handleOnClick={handleSend}
            disabled={loading || !newsletter.subject || !newsletter.content}
          />
        </ButtonContainer>
      </Container>
    </DoubleBorderFrame>
  );
};

const InputGroup = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 15px 0;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  color: var(--cyan);
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid var(--cyan);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border-radius: 5px;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid var(--cyan);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border-radius: 5px;
  resize: vertical;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

export { AdminNewsletterSender };