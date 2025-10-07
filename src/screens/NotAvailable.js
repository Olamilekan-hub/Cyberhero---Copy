import React from 'react';
import styled from 'styled-components';

const NotAvailable = () => {
  return (
    <Container>
      <Content>
        <Title>Feature Not Available</Title>
        <Message>
          This feature is temporarily unavailable. Please check back later.
        </Message>
        <BackButton onClick={() => window.history.back()}>
          Go Back
        </BackButton>
      </Content>
    </Container>
  );
};

export default NotAvailable;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 20px;
`;

const Content = styled.div`
  text-align: center;
  background: rgba(255, 255, 255, 0.9);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 500px;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 2.5rem;
`;

const Message = styled.p`
  color: #7f8c8d;
  font-size: 1.2rem;
  margin-bottom: 30px;
  line-height: 1.6;
`;

const BackButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;