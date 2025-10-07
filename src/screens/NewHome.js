import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const NewHome = () => {
  const [email, setEmail] = useState("");
  const [isAdult, setIsAdult] = useState(false);
  const [contactMe, setContactMe] = useState(false);

  const activityTodos = [
    [
      { label: "🧭 Find one green thing.", key: "nature-green", answer: false },
      { label: "What shape is it?", key: "nature-shape", answer: true },
      { label: "What does it feel like?", key: "nature-feel", answer: true }
    ],
    [
      { label: "👀 Close your eyes for 20 seconds.", key: "sound-close", answer: false },
      { label: "Name three sounds.", key: "sound-name", answer: true },
      { label: "Which are wild?", key: "sound-wild", answer: true },
      { label: "Which are human-made?", key: "sound-human", answer: true }
    ],
    [
      { label: "I drink the sun and never walk. What am I❓", key: "eco-riddle", answer: true }
    ]
  ];

  function ActivityTodoList({ activityIdx }) {
    const todos = activityTodos[activityIdx];
    const [states, setStates] = React.useState(
      todos.map(() => ({ checked: false, answer: "" }))
    );

    const handleCheck = (idx, checked) => {
      const newStates = states.map((s, i) => i === idx ? { ...s, checked } : s);
      setStates(newStates);
    };
    
    const handleAnswer = (idx, answer) => {
      const newStates = states.map((s, i) => i === idx ? { ...s, answer } : s);
      setStates(newStates);
    };

    return (
      <TodoList>
        {todos.map((todo, idx) => (
          <TodoItem key={todo.key}>
            <TodoHeader>
              <Checkbox
                type="checkbox"
                checked={states[idx].checked}
                onChange={e => handleCheck(idx, e.target.checked)}
              />
              <TodoLabel checked={states[idx].checked}>
                {todo.label}
              </TodoLabel>
            </TodoHeader>
            {todo.answer && (
              <AnswerInput
                type="text"
                value={states[idx].answer}
                onChange={e => handleAnswer(idx, e.target.value)}
                placeholder="Your answer..."
                disabled={states[idx].checked}
                checked={states[idx].checked}
              />
            )}
          </TodoItem>
        ))}
      </TodoList>
    );
  }

  return (
    <Page>
      <PageContainer>
        <HeroSection>
          <HeroContent>
            <Badge>Introducing the Future</Badge>
            <HeroTitle>Mission: <Accent>G.A.I.A.</Accent><br/>Edtech Platform</HeroTitle>
            <HeroDescription>
              <strong>Mission: G.A.I.A.</strong> is an innovative, story-driven platform that nurtures foresight and ecoliteracy, helping kids (ages 9–12) develop the skills they need for the future. Rooted in the Chronicles of G.A.I.A. narrative, it supports agency and leadership in young people by blending knowledge, empathy, and real-world action.
            </HeroDescription>
            <HeroDescription>
              <strong>B.E.L.A.</strong> is the first taste—the full platform follows as partners come online. Proud partner of UNESCO's Greening Education Partnership.
            </HeroDescription>
            <CTAButton>Get Started</CTAButton>
          </HeroContent>
          <HeroImageWrapper>
            <HeroImage src="/Future+Hack_Cover.webp" alt="Mission GAIA Platform" />
          </HeroImageWrapper>
        </HeroSection>

        <AboutSection>
          <SectionBadge>Our Mission</SectionBadge>
          <SectionTitle>About <Accent>Mission: G.A.I.A.</Accent></SectionTitle>
          <AboutGrid>
            <AboutImageBox>
              <AboutImg src="/Future+Hack_Cover.webp" alt="Mission GAIA" />
            </AboutImageBox>
            <AboutText>
              <Paragraph>
                <strong>Mission: G.A.I.A.</strong> is an innovative edtech platform inspiring and empowering young people to become the eco-leaders of tomorrow. Built on the foundation of the award-winning "Chronicles of G.A.I.A." book series, our platform transforms environmental education into an exciting adventure through interest-based learning and gamification.
              </Paragraph>
              <Paragraph>
                As a proud partner of UNESCO's Greening Education Partnership, we create a supportive community that nurtures mental well-being, environmental literacy, and compassionate future leaders. Our platform provides a secure environment where children can explore and expand their understanding of our planet's ecosystems through interactive, project-based learning.
              </Paragraph>
            </AboutText>
            <AboutImageBox>
              <AboutImg src="/2Norbu's+Secret_FH.webp" alt="Norbu's Secret" />
            </AboutImageBox>
          </AboutGrid>
        </AboutSection>

        <BelaSection>
          <BelaContent>
            <SectionBadge light>Meet B.E.L.A.</SectionBadge>
            <BelaTitle>B.E.L.A.</BelaTitle>
            <BelaDescription>
              Meet <strong>B.E.L.A.</strong>—a playful, planet-positive companion from the Chronicles of G.A.I.A. universe. Think mini-missions and activities that help kids notice more, develop agency, and nurture a lifelong habit of caring for the living world.
            </BelaDescription>
            <ComingSoonBox>
              <strong>Coming soon:</strong> the B.E.L.A. app. While we build, we're sharing kid-safe, no-login experiences here.
            </ComingSoonBox>
          </BelaContent>
          <BelaImageWrapper>
            <BelaImg src="/BELA_1.png" alt="B.E.L.A." />
          </BelaImageWrapper>
        </BelaSection>

        <ActivitiesSection>
          <SectionBadge>Try Now</SectionBadge>
          <SectionTitle>Right now: <Accent>B.E.L.A.</Accent> Activities</SectionTitle>
          <Subtitle>Simple, login-free activities that get kids outside and curious about the natural world.</Subtitle>
          <ActivitiesGrid>
            <ActivityCard>
              <ActivityIcon>🔍</ActivityIcon>
              <ActivityTitle>30-Second Nature Scout</ActivityTitle>
              <ActivityTodoList activityIdx={0} />
            </ActivityCard>
            <ActivityCard>
              <ActivityIcon>🔊</ActivityIcon>
              <ActivityTitle>Sound Map</ActivityTitle>
              <ActivityTodoList activityIdx={1} />
            </ActivityCard>
            <ActivityCard>
              <ActivityIcon>💡</ActivityIcon>
              <ActivityTitle>Eco-Riddle</ActivityTitle>
              <ActivityTodoList activityIdx={2} />
            </ActivityCard>
          </ActivitiesGrid>
        </ActivitiesSection>

        <BooksSection>
          <SectionBadge>Chronicles</SectionBadge>
          <SectionTitle>Books From the Chronicles of <Accent>G.A.I.A.</Accent></SectionTitle>
          <Subtitle>Where B.E.L.A. was born. The award-winning middle-grade series that turns eco-anxiety into curiosity, courage, and care.</Subtitle>
          <BooksGrid>
            <BookCard>
              <BookCover src="/Future+Hack_Cover.webp" alt="Future Hack" />
              <BookTitle>Future Hack</BookTitle>
              <BookDescription>A mysterious AI and a team of kids race to protect what matters.</BookDescription>
            </BookCard>
            <BookCard>
              <BookCover src="/2Norbu's+Secret_FH.webp" alt="Norbu's Secret" />
              <BookTitle>Norbu's Secret</BookTitle>
              <BookDescription>A time-bending mission tests friendship, grit, and hope.</BookDescription>
            </BookCard>
          </BooksGrid>
        </BooksSection>

        <AwardsSection>
          <SectionTitle light>Awards & Partners</SectionTitle>
          <PartnersGrid>
            <PartnerCard>
              <PartnerLogo>
                <LogoImg src="/nycbba24_winner+JPG+Seal-1.webp" alt="NYC Big Book Award" />
              </PartnerLogo>
              <PartnerName>NYC Big Book Award — Middle Grade (Future Hack)</PartnerName>
            </PartnerCard>
            <PartnerCard>
              <PartnerLogo>
                <LogoImg src="/images.png" alt="Neighborhood Forest" />
              </PartnerLogo>
              <PartnerName>Neighborhood Forest – Partner</PartnerName>
            </PartnerCard>
            <PartnerCard>
              <PartnerLogo>
                <LogoImg src="/unesco-logo-png_seeklogo-349497.png" alt="UNESCO" />
              </PartnerLogo>
              <PartnerName>UNESCO Greening Education Partnership — Partner</PartnerName>
            </PartnerCard>
          </PartnersGrid>
        </AwardsSection>

        <NewsletterSection>
          <NewsletterCard>
            <NewsletterHeader>Stay in the Loop</NewsletterHeader>
            <NewsletterGrid>
              <NewsletterText>
                <NewsletterTitle>Parents & Educators (18+) only</NewsletterTitle>
                <NewsletterDescription>
                  Get B.E.L.A. launch news and free classroom resources that turn story into simple real-world actions.
                  <br/><br/>
                  • Short updates about B.E.L.A. milestones<br/>
                  • Printable activities & discussion guides<br/>
                  • Opportunities to pilot projects
                </NewsletterDescription>
              </NewsletterText>
              <NewsletterForm>
                <InputGroup>
                  <EmailField
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                  <SubmitBtn type="submit" disabled={!isAdult}>Continue</SubmitBtn>
                </InputGroup>
                <CheckboxGroup>
                  <StyledCheckbox
                    checked={isAdult}
                    onChange={e => setIsAdult(e.target.checked)}
                    required
                  />
                  <CheckboxLabel>I confirm I am 18 or older.</CheckboxLabel>
                </CheckboxGroup>
                <CheckboxGroup>
                  <StyledCheckbox
                    checked={contactMe}
                    onChange={e => setContactMe(e.target.checked)}
                  />
                  <CheckboxLabel>Contact me about partnerships/media.</CheckboxLabel>
                </CheckboxGroup>
              </NewsletterForm>
            </NewsletterGrid>
            <Disclaimer>
              We never collect personal information from children. Unsubscribe anytime.
            </Disclaimer>
          </NewsletterCard>
        </NewsletterSection>

        <PartnersSection>
          <PartnersSectionTitle>Partners & Media</PartnersSectionTitle>
          <PartnersDescription>
            We welcome collaborations with schools, libraries, museums, nonprofits, and forward-thinking brands. If you're exploring nature-based learning, youth wellbeing, environmental storytelling and the intersection of AI—let's talk.
          </PartnersDescription>
          <ContactBtn>Contact the Team</ContactBtn>
        </PartnersSection>

        <SafetySection>
          <SafetyTitle>Safety & Privacy</SafetyTitle>
          <SafetyText>
            We do not collect personal information from children. Updates and communications are for adults (18+) only. We maintain a child-first approach to safety, data minimization, and transparency.
          </SafetyText>
        </SafetySection>

        <Footer>
          <FooterDivider />
        </Footer>
      </PageContainer>
    </Page>
  );
};

export default NewHome;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Page = styled.div`
  background: linear-gradient(180deg, #0a0e27 0%, #1a1f3a 50%, #0a0e27 100%);
  color: #fff;
  min-height: 100vh;
  width: 100%;
`;

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  
  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const HeroSection = styled.section`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 80px;
  align-items: center;
  min-height: 90vh;
  padding: 120px 0 80px;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 48px;
    padding: 80px 0 60px;
    min-height: auto;
  }
`;

const HeroContent = styled.div`
  animation: ${fadeInUp} 0.8s ease-out;
`;

const Badge = styled.span`
  display: inline-block;
  padding: 8px 20px;
  background: rgba(255, 140, 50, 0.1);
  border: 1px solid rgba(255, 140, 50, 0.3);
  border-radius: 50px;
  color: #ff8c32;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 6px 16px;
  }
`;

const SectionBadge = styled(Badge)`
  background: ${props => props.light ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 140, 50, 0.1)'};
  border-color: ${props => props.light ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 140, 50, 0.3)'};
  color: ${props => props.light ? '#fff' : '#ff8c32'};
  margin-bottom: 16px;
`;

const HeroTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin: 0 0 32px;
  letter-spacing: -1px;
  
  @media (max-width: 1200px) {
    font-size: 3.5rem;
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 24px;
  }
`;

const Accent = styled.span`
  background: linear-gradient(135deg, #4a7cff 0%, #ff8c32 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeroDescription = styled.p`
  font-size: 1.125rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 24px;
  font-weight: 400;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.7;
  }
`;

const CTAButton = styled.button`
  background: linear-gradient(135deg, #ff8c32 0%, #ff6b1a 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 18px 48px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 24px rgba(255, 140, 50, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(255, 140, 50, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    padding: 16px 40px;
    font-size: 1rem;
  }
`;

const HeroImageWrapper = styled.div`
  position: relative;
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;
`;

const HeroImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 24px;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
  }
`;

const AboutSection = styled.section`
  padding: 120px 0;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 80px 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 48px;
  color: ${props => props.light ? '#fff' : '#fff'};
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 32px;
  }
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr 0.8fr;
  gap: 48px;
  align-items: center;
  margin-top: 64px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 32px;
    
    > :first-child {
      display: none;
    }
  }
`;

const AboutImageBox = styled.div`
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: -16px;
    background: linear-gradient(135deg, rgba(74, 124, 255, 0.1), rgba(255, 140, 50, 0.1));
    border-radius: 32px;
    z-index: -1;
  }
`;

const AboutImg = styled.img`
  width: 100%;
  border-radius: 24px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.3);
`;

const AboutText = styled.div`
  text-align: left;
`;

const Paragraph = styled.p`
  font-size: 1.125rem;
  line-height: 1.9;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.7;
  }
`;

const BelaSection = styled.section`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 80px;
  align-items: center;
  padding: 120px 0;
  background: linear-gradient(135deg, rgba(74, 124, 255, 0.05) 0%, rgba(255, 140, 50, 0.05) 100%);
  border-radius: 32px;
  margin: 0 -24px;
  padding-left: 80px;
  padding-right: 80px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 48px;
    padding: 80px 40px;
    margin: 0;
  }
  
  @media (max-width: 768px) {
    padding: 60px 24px;
  }
`;

const BelaContent = styled.div``;

const BelaTitle = styled.h2`
  font-size: 5rem;
  font-weight: 900;
  margin: 0 0 32px;
  background: linear-gradient(135deg, #4a7cff 0%, #ff8c32 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const BelaDescription = styled.p`
  font-size: 1.25rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const ComingSoonBox = styled.div`
  background: rgba(255, 140, 50, 0.1);
  border: 2px solid rgba(255, 140, 50, 0.3);
  border-radius: 16px;
  padding: 24px 32px;
  font-size: 1.125rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 32px;
  
  @media (max-width: 768px) {
    padding: 20px 24px;
    font-size: 1rem;
  }
`;

const BelaImageWrapper = styled.div``;

const BelaImg = styled.img`
  width: 100%;
  height: auto;
  border-radius: 24px;
  filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3));
`;

const ActivitiesSection = styled.section`
  padding: 120px 0;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 80px 0;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 64px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 48px;
  }
`;

const ActivitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const ActivityCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 40px 28px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 140, 50, 0.3);
    transform: translateY(-4px);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
  }
`;

const ActivityIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #4a7cff 0%, #ff8c32 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  margin: 0 auto 24px;
  box-shadow: 0 8px 24px rgba(255, 140, 50, 0.3);
`;

const ActivityTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 24px;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const TodoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
`;

const TodoItem = styled.li`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  transition: background 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;

const TodoHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 20px;
  height: 20px;
  accent-color: #ff8c32;
  cursor: pointer;
`;

const TodoLabel = styled.span`
  flex: 1;
  font-size: 1rem;
  color: ${props => props.checked ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.9)'};
  text-decoration: ${props => props.checked ? 'line-through' : 'none'};
  transition: all 0.2s ease;
`;

const AnswerInput = styled.input`
  width: 100%;
  margin-top: 12px;
  padding: 10px 14px;
  background: ${props => props.checked ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.08)'};
  border: 1px solid ${props => props.checked ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 140, 50, 0.3)'};
  border-radius: 8px;
  color: ${props => props.checked ? 'rgba(255, 255, 255, 0.4)' : '#fff'};
  font-size: 0.95rem;
  outline: none;
  transition: all 0.2s ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
  
  &:focus {
    border-color: #ff8c32;
    background: rgba(255, 255, 255, 0.1);
  }
  
  &:disabled {
    cursor: not-allowed;
  }
`;

const BooksSection = styled.section`
  padding: 120px 0;
  text-align: center;
  background: rgba(0, 0, 0, 0.2);
  margin: 0 -24px;
  padding-left: 24px;
  padding-right: 24px;
  border-radius: 32px;
  
  @media (max-width: 768px) {
    padding: 80px 16px;
    margin: 0;
  }
`;

const BooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 48px;
  max-width: 1000px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const BookCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 40px 32px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(74, 124, 255, 0.3);
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(74, 124, 255, 0.2);
  }
`;

const BookCover = styled.img`
  width: 60%;
  height: auto;
  border-radius: 16px;
  margin-bottom: 24px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
  
  ${BookCard}:hover & {
    transform: scale(1.05);
  }
`;

const BookTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 16px;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const BookDescription = styled.p`
  font-size: 1.125rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const AwardsSection = styled.section`
  padding: 120px 0;
  background: #000;
  margin: 0 -24px;
  padding-left: 24px;
  padding-right: 24px;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 80px 16px;
    margin: 0;
  }
`;

const PartnersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 48px;
  margin-top: 64px;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const PartnerCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 32px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 140, 50, 0.3);
    transform: translateY(-4px);
  }
`;

const PartnerLogo = styled.div`
  width: 100px;
  height: 100px;
  background: #fff;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
`;

const LogoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const PartnerName = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  margin: 0;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const NewsletterSection = styled.section`
  padding: 80px 0;
  
  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

const NewsletterCard = styled.div`
  background: linear-gradient(135deg, rgba(74, 124, 255, 0.08) 0%, rgba(255, 140, 50, 0.08) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 32px;
  padding: 64px 48px;
  
  @media (max-width: 768px) {
    padding: 40px 24px;
  }
`;

const NewsletterHeader = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin: 0 0 48px;
  text-transform: uppercase;
  letter-spacing: 2px;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 32px;
  }
`;

const NewsletterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: start;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const NewsletterText = styled.div``;

const NewsletterTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 20px;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const NewsletterDescription = styled.p`
  font-size: 1.125rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 0;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const EmailField = styled.input`
  flex: 1;
  padding: 18px 24px;
  border: none;
  font-size: 1rem;
  outline: none;
  color: #1a1f3a;
  background: transparent;
  
  &::placeholder {
    color: rgba(26, 31, 58, 0.5);
  }
  
  @media (max-width: 768px) {
    padding: 16px 20px;
  }
`;

const SubmitBtn = styled.button`
  background: linear-gradient(135deg, #ff8c32 0%, #ff6b1a 100%);
  color: #fff;
  border: none;
  padding: 18px 40px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: ${props => props.disabled ? 0.5 : 1};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
  
  &:hover {
    background: linear-gradient(135deg, #ff9b50 0%, #ff7b2e 100%);
  }
  
  @media (max-width: 768px) {
    padding: 16px 32px;
  }
`;

const CheckboxGroup = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`;

const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 140, 50, 0.5);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
  
  &:checked {
    background: #ff8c32;
    border-color: #ff8c32;
  }
  
  &:checked::after {
    content: '';
    position: absolute;
    left: 6px;
    top: 2px;
    width: 5px;
    height: 10px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
  
  &:focus {
    box-shadow: 0 0 0 3px rgba(255, 140, 50, 0.2);
  }
`;

const CheckboxLabel = styled.span`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.85);
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const Disclaimer = styled.p`
  text-align: center;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.6);
  font-style: italic;
  margin: 32px 0 0;
  
  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const PartnersSection = styled.section`
  max-width: 900px;
  margin: 80px auto;
  padding: 48px 40px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 40px 24px;
    margin: 60px auto;
  }
`;

const PartnersSectionTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0 0 24px;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const PartnersDescription = styled.p`
  font-size: 1.125rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 32px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ContactBtn = styled.button`
  background: linear-gradient(135deg, #4a7cff 0%, #3461d9 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 16px 40px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(74, 124, 255, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(74, 124, 255, 0.4);
  }
`;

const SafetySection = styled.section`
  padding: 80px 0;
  text-align: center;
  background: #000;
  margin: 80px -24px 0;
  padding-left: 24px;
  padding-right: 24px;
  
  @media (max-width: 768px) {
    padding: 60px 16px;
    margin-top: 60px;
    margin-left: 0;
    margin-right: 0;
  }
`;

const SafetyTitle = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  margin: 0 0 24px;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SafetyText = styled.p`
  font-size: 1.125rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.7);
  font-style: italic;
  max-width: 900px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Footer = styled.footer`
  background: #000;
  padding: 60px 0 100px;
  margin: 0 -24px;
  
  @media (max-width: 768px) {
    padding: 40px 0 80px;
    margin: 0;
  }
`;

const FooterDivider = styled.hr`
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin: 0;
`;