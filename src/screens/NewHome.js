import React from 'react';
import styled from 'styled-components';
import HeroSection from '../components/newHome/HeroSection';
import AboutSection from '../components/newHome/AboutSection';
import BelaSection from '../components/newHome/BelaSection';
import ActivitiesSection from '../components/newHome/ActivitiesSection';
import BooksSection from '../components/newHome/BooksSection';
import AwardsSection from '../components/newHome/AwardsSection';
import EmailSignupSection from '../components/newHome/EmailSignupSection';
import PartnersMediaSection from '../components/newHome/PartnersMediaSection';
import SafetyPrivacySection from '../components/newHome/SafetyPrivacySection';

const NewHome = () => {
  return (
    <Page>
      <PageContainer>
        <HeroSection />
        <BelaSection />
        <AboutSection />
        <ActivitiesSection />
        <ElegantDivider />
        <BooksSection />
        <ElegantDivider />
        <AwardsSection />
        <ElegantDivider />
        <EmailSignupSection />
        <PartnersMediaSection />
        <SafetyPrivacySection />
        <Footer>
          <hr />
        </Footer>
      </PageContainer>
    </Page>
  );
};

export const ElegantDivider = styled.hr`
  width: 100%;
  border: none;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    rgba(0, 11, 168, 0.4),
    rgba(0, 11, 168, 0.8),
    rgba(0, 11, 168, 0.4),
    transparent
  );
  margin: 80px 0;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 999px;
  box-shadow: 0 0 20px rgba(0, 11, 168, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  // opacity: 0.9;

  @media (max-width: 768px) {
    margin: 60px 0;
  }
`;

const Page = styled.div`
  background: #fff;
  min-height: 100vh;
  width: 100vw;
  z-index: -2;
  
  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 0;
  padding-bottom: 0;
  
  @media (min-width: 768px) {
    width: 90%;
    margin: 0 auto;
  }
  @media (min-width: 1200px) {
    width: 85%;
    margin: 0 auto;
  }
`;

const Footer = styled.div`
  background: black;
  width: 100vw;
  color: white;
  padding: 40px 0px;
  padding-bottom: 120px;
`;

export default NewHome

// import React, { useState } from 'react';
// import styled from 'styled-components';

// const NewHome = () => {
//   const [email, setEmail] = useState("");
//   const [isAdult, setIsAdult] = useState(false);
//   const [contactMe, setContactMe] = useState(false);

//   // Helper for splitting todos
//   const activityTodos = [
//     [
//       { label: "🧭 Find one green thing.", key: "nature-green", answer: false },
//       { label: "What shape is it?", key: "nature-shape", answer: true },
//       { label: "What does it feel like?", key: "nature-feel", answer: true }
//     ],
//     [
//       { label: "👀 Close your eyes for 20 seconds.", key: "sound-close", answer: false },
//       { label: "Name three sounds.", key: "sound-name", answer: true },
//       { label: "Which are wild?", key: "sound-wild", answer: true },
//       { label: "Which are human-made?", key: "sound-human", answer: true }
//     ],
//     [
//       { label: "I drink the sun and never walk. What am I❓", key: "eco-riddle", answer: true }
//     ]
//   ];

//   function ActivityTodoList({ activityIdx }) {
//     const todos = activityTodos[activityIdx];
//     const [states, setStates] = React.useState(
//       todos.map(todo => {
//         try {
//           return JSON.parse(localStorage.getItem(`activity_${activityIdx}_${todo.key}`)) || { checked: false, answer: "" };
//         } catch {
//           return { checked: false, answer: "" };
//         }
//       })
//     );

//     React.useEffect(() => {
//       // Restore from localStorage on mount
//       setStates(
//         todos.map(todo => {
//           try {
//             return JSON.parse(localStorage.getItem(`activity_${activityIdx}_${todo.key}`)) || { checked: false, answer: "" };
//           } catch {
//             return { checked: false, answer: "" };
//           }
//         })
//       );
//       // eslint-disable-next-line
//     }, []);

//     const handleCheck = (idx, checked) => {
//       const newStates = states.map((s, i) => i === idx ? { ...s, checked } : s);
//       setStates(newStates);
//       localStorage.setItem(`activity_${activityIdx}_${todos[idx].key}`, JSON.stringify(newStates[idx]));
//     };
//     const handleAnswer = (idx, answer) => {
//       const newStates = states.map((s, i) => i === idx ? { ...s, answer } : s);
//       setStates(newStates);
//       localStorage.setItem(`activity_${activityIdx}_${todos[idx].key}`, JSON.stringify(newStates[idx]));
//     };

//     return (
//       <ul style={{ listStyle: "none", padding: 0, margin: 0, width: "100%" }}>
//         {todos.map((todo, idx) => (
//           <li
//             key={todo.key}
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               alignItems: "left",
//               marginBottom: 16,
//               background: "rgba(255,255,255,0.08)",
//               borderRadius: 10,
//               gap: "10px",
//               boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
//               padding: "12px 18px",
//             }}
//           ><div
//             style={{ display: "flex", alignItems: "center", width: "100%" }}>
//               <input
//                 type="checkbox"
//                 checked={states[idx].checked}
//                 onChange={e => handleCheck(idx, e.target.checked)}
//                 style={{ marginRight: 14, accentColor: '#ffa726', width: 22, height: 22 }}
//               />
//               <span
//                 style={{
//                   flex: 1,
//                   fontSize: "1.08rem",
//                   color: states[idx].checked ? "#aaa" : "#fff",
//                   textDecoration: states[idx].checked ? "line-through" : "none",
//                   fontWeight: 500,
//                   transition: "color 0.2s, text-decoration 0.2s"
//                 }}
//               >
//                 {todo.label}
//               </span></div>
//             {todo.answer && (
//               <input
//                 type="text"
//                 value={states[idx].answer}
//                 onChange={e => handleAnswer(idx, e.target.value)}
//                 placeholder="Your answer"
//                 disabled={states[idx].checked}
//                 style={{
//                   marginLeft: 16,
//                   borderRadius: 8,
//                   border: "1px solid #ffa726",
//                   padding: "7px 14px",
//                   minWidth: 120,
//                   fontSize: "1rem",
//                   background: states[idx].checked ? "#eee" : "rgba(255,255,255,0.15)",
//                   color: states[idx].checked ? "#aaa" : "#fff"
//                 }}
//               />
//             )}
//           </li>
//         ))}
//       </ul>
//     );
//   }

//   return (
//     <Page>
//       <PageContainer>
//         {/* Hero Section */}
//         <HeroSection>
//           <HeroContent>
//             <HeroTagline>Introducing the Future</HeroTagline>
//             <HeroTitle><strong>Mission: G.A.I.A.</strong> Edtech Platform</HeroTitle>
//             <HeroDesc>
//               <strong>Mission: G.A.I.A.</strong> is our larger learning world in development—an innovative, story-driven platform that nurtures foresight and ecoliteracy helping kids (ages 9–12) develop the skills they need for the future. Rooted in the Chronicles of G.A.I.A. narrative, it supports agency and leadership in young people—including those experiencing eco-anxiety—by blending knowledge, empathy, and real-world action.
//             </HeroDesc>
//             <HeroDesc>
//               <strong>B.E.L.A.</strong> is the first taste, the full platform follows as partners come online. Proud partner of UNESCO’s Greening Education Partnership.
//             </HeroDesc>
//             <HeroButton>Get Started</HeroButton>
//           </HeroContent>
//           <HeroImageContainer>
//             <HeroImage src="/Future+Hack_Cover.webp" alt="Mission GAIA Platform" />
//           </HeroImageContainer>
//         </HeroSection>

//         {/* ABOUT */}
//         <About id='about'>
//           <AboutTitle>About <strong>Mission: G.A.I.A.</strong></AboutTitle>
//           <AboutSection>
//             <AboutImageContainer1>
//               <AboutImage src="/Future+Hack_Cover.webp" alt="Mission GAIA Platform" />
//             </AboutImageContainer1>
//             <AboutContent>
//               <AboutDesc>
//                 <strong>Mission: G.A.I.A.</strong> is an innovative edtech platform inspiring and empowering young people to become the eco-leaders of tomorrow. Built on the foundation of the award-winning "Chronicles of G.A.I.A." book series, our platform transforms environmental education into an exciting and rewarding adventure through interest-based learning and gamification. The series follows a team of young heroes and a time-traveling teen with his beloved cat, Pasha, as they tackle missions to prevent future climate catastrophes. Through this engaging narrative, we teach today's youth the resilience skills they need to confront climate change and eco-anxiety while fostering a proactive mindset towards creating a sustainable future.
//               </AboutDesc>
//               <AboutDesc>
//                 As a proud partner of UNESCO's Greening Education Partnership, <strong>Mission: G.A.I.A.</strong> creates a supportive community that nurtures mental well-being, environmental literacy, and the development of compassionate future leaders. Our platform provides a secure environment where children can explore, discover, and expand their understanding of our planet's ecosystems through interactive, project-based learning that resonates with their interests. We are committed to empowering the next generation with the knowledge, empathy, and action-oriented skills necessary to protect our planet and build a sustainable tomorrow.
//               </AboutDesc>
//             </AboutContent>
//             <AboutImageContainer>
//               <AboutImage src="/2Norbu's+Secret_FH.webp" alt="Mission GAIA Platform" />
//             </AboutImageContainer>
//           </AboutSection>
//         </About>

//         {/* B.E.L.A */}
//         <Bela id='bela' className='bg-black'>
//           <BelaSection id='bela'>
//             <HeroContent>
//               <HeroTagline>Meet <strong>B.E.L.A.</strong> from Chronicles of G.A.I.A.</HeroTagline>
//               <BelaTitle>B.E.L.A.</BelaTitle>
//               <HeroDesc>
//                 Meet <strong>B.E.L.A.</strong>—a playful, planet-positive companion from the Chronicles of G.A.I.A. universe. Think mini-missions and activities that help kids notice more, develop agency, and nurture a lifelong habit of caring for the living world.
//               </HeroDesc>
//               <BDesc>
//                 <strong>Coming soon:</strong> the B.E.L.A. app. While we build, we’re sharing kid-safe, no-login experiences here.
//               </BDesc>
//             </HeroContent>
//             <HeroImageContainer>
//               <BelaImage src="/BELA_1.png" alt="Mission GAIA Platform" />
//             </HeroImageContainer>
//           </BelaSection>
//         </Bela>

//         {/* Right now: B.E.L.A. Activities */}
//         <BelasSection>
//           <BelasTitle>Right now: B.E.L.A. </BelasTitle>
//           <BelasSubtitle>Try these simple, login free activities that get kids outside and curious about the natural world.</BelasSubtitle>
//           <ActivitiesGrid>
//             <ActivityCard>
//               {/* <BelaImg src="/premium_photo-1725408037993-f891474828c9.jpeg" alt="grass" /> */}
//               <ActivityIconPlaceholder>🔍</ActivityIconPlaceholder>
//               <ActivityTitle>30-Second Nature Scout</ActivityTitle>
//               <ActivityTodoList activityIdx={0} />
//             </ActivityCard>
//             <ActivityCard>
//               <ActivityIconPlaceholder>🔊</ActivityIconPlaceholder>
//               <ActivityTitle>Sound Map</ActivityTitle>
//               <ActivityTodoList activityIdx={1} />
//             </ActivityCard>
//             <ActivityCard>
//               <ActivityIconPlaceholder>💡</ActivityIconPlaceholder>
//               <ActivityTitle>Eco-Riddle</ActivityTitle>
//               <ActivityTodoList activityIdx={2} />
//             </ActivityCard>
//           </ActivitiesGrid>
//         </BelasSection>

//         {/* Books Section */}
//         <Book>
//           <BookSection>
//             <BooksTitle>Books From the Chronicles of G.A.I.A.</BooksTitle>
//             <Subtitle>Where B.E.L.A. was born. The award-winning middle-grade series that turns eco-anxiety into curiosity, courage, and care.</Subtitle>
//             <BooksGrid>
//               <BookCard>
//                 <BookImageContainer>
//                   <BookImage src="/Future+Hack_Cover.webp" alt="Mission GAIA Platform" />
//                 </BookImageContainer>
//                 <BookTitle>Future Hack</BookTitle>
//                 <BookDesc>A mysterious AI and a team of kids race to protect what matters.</BookDesc>
//               </BookCard>
//               <BookCard>
//                 <BookImageContainer>
//                   <BookImage src="/2Norbu's+Secret_FH.webp" alt="Mission GAIA Platform" />
//                 </BookImageContainer>
//                 <BookTitle>Norbu’s Secret</BookTitle>
//                 <BookDesc>A time-bending mission tests friendship, grit, and hope.</BookDesc>
//               </BookCard>
//             </BooksGrid>
//           </BookSection>
//         </Book>

//         {/* Awards & Partners Section */}
//         <Awards>
//           <AwardsSection>
//             <AwardsTitle>Awards & Partners</AwardsTitle>
//             <PartnersRow>
//               <PartnerItem>
//                 <LogoIconPlaceholder>
//                   <Img src="/nycbba24_winner+JPG+Seal-1.webp" alt="" />
//                 </LogoIconPlaceholder>
//                 <PartnerCaption>NYC Big Book Award — Middle Grade (Future Hack)</PartnerCaption>
//               </PartnerItem>
//               <PartnerItem>
//                 <LogoIconPlaceholder>
//                   <Img src="/images.png" alt="" />
//                 </LogoIconPlaceholder>
//                 <PartnerCaption>Neighborhood Forest – Partner</PartnerCaption>
//               </PartnerItem>
//               <PartnerItem>
//                 <LogoIconPlaceholder>
//                   <Img src="/unesco-logo-png_seeklogo-349497.png" alt="" />
//                 </LogoIconPlaceholder>
//                 <PartnerCaption>UNESCO Greening Education Partnership — Partner</PartnerCaption>
//               </PartnerItem>
//             </PartnersRow>
//           </AwardsSection>
//         </Awards>

//         {/* Parents & Educators Email Form */}
//         <MailSection>
//           <MailTitle1>Stay in the loop</MailTitle1>
//           <MailCover>
//             <MailText>
//               <MailTitle>Parents & Educators (18+) only.</MailTitle>
//               <Description>
//                 Get B.E.L.A. launch news and free classroom resources that turn story into simple real-world actions.<br />
//                 • Short updates about B.E.L.A. milestones <br /> • Printable activities & discussion guides <br /> • Opportunities to pilot projects
//               </Description>
//             </MailText>
//             <MailBox>
//               <EmailForm>
//                 <EmailInputRow>
//                   <EmailInput
//                     type="email"
//                     placeholder="Enter email address"
//                     value={email}
//                     onChange={e => setEmail(e.target.value)}
//                     required
//                   />
//                   <SubmitButton type="submit" disabled={!isAdult}>Continue</SubmitButton>
//                 </EmailInputRow>
//                 <CheckboxLabel>
//                   <ModernCheckbox
//                     checked={isAdult}
//                     onChange={e => setIsAdult(e.target.checked)}
//                     required
//                   />
//                   I confirm I am 18 or older.
//                 </CheckboxLabel>
//                 <CheckboxLabel>
//                   <ModernCheckbox
//                     checked={contactMe}
//                     onChange={e => setContactMe(e.target.checked)}
//                   />
//                   Contact me about partnerships/media.
//                 </CheckboxLabel>
//               </EmailForm>
//             </MailBox>
//           </MailCover>
//           <Microcopy>
//             <i>We never collect personal information from children. Unsubscribe anytime.</i>
//           </Microcopy>
//         </MailSection>

//         {/* Partners & Media Section */}
//         <Section>
//           <SectionTitle>Partners & Media</SectionTitle>
//           <Description>
//             We welcome collaborations with schools, libraries, museums, nonprofits, and forward-thinking brands. If you're exploring nature-based learning, youth wellbeing, environmental storytelling and the intersection of AI—and want to help bring <strong>Mission: G.A.I.A.</strong> to life—let's talk.
//           </Description>
//           <ContactButton>Contact the team</ContactButton>
//         </Section>

//         {/* Safety & Privacy Section */}
//         <SafetySection>
//           <SafetyTitle>Safety & Privacy</SafetyTitle>
//           <Description>
//             <i>We do not collect personal information from children. Updates and communications are for adults (18+) only. We maintain a child-first approach to safety, data minimization, and transparency.</i>
//           </Description>
//         </SafetySection>
//         <Div>
//           <hr />
//         </Div>
//       </PageContainer>
//     </Page>
//   );
// };

// export default NewHome;

// // Styled Components
// const Page = styled.div`
//   background:rgba(0, 0, 0, 0.1);
//   color: #fff;
//   min-height: 100vh;
//   width: 100vw;
//   @media (max-width: 768px) {
//   padding: 0 10px;
//   }
// `;

// const PageContainer = styled.div`
//   min-height: 100vh;
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 40px 0;
//   padding-bottom: 0;
//   // margin-bottom: 40px;
  
//   @media (min-width: 768px) {
//     width: 90%;
//     margin: 0 auto;
//   }
  
//   @media (min-width: 1200px) {
//     width: 85%;
//     margin: 0 auto;
//   }
// `;

// const HeroSection = styled.section`
//   width: 90%;
//   min-height: 80vh;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   gap: 30px;
//   padding: 40px 0;
//   margin-bottom: 60px;
  
//   @media (max-width: 1200px) {
//     width: 98%;
//     gap: 20px;
//     padding: 30px 0;
//     min-height: 60vh;
//   }
//   @media (max-width: 968px) {
//     flex-direction: column;
//     gap: 40px;
//     padding: 40px 10px;
//     min-height: 40vh;
//     margin-bottom: 40px;
//   }
//   @media (max-width: 600px) {
//     width: 100%;
//     padding: 10px 8px;
//     gap: 16px;
//     min-height: 20vh;
//     margin-bottom: 14px;
//   }
// `;

// const About = styled.section`
// padding: 80px 0;
// background: rgba(0, 0, 0, 0.012);
// width: 100vw;
// `

// const AboutSection = styled.section`
//   width: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   gap: 15px;
//   padding: 40px 0px;
  
//   @media (max-width: 768px) {
//     flex-direction: column;
//     gap: 30px;
//     padding: 60px 20px;
//   }
  
//   @media (max-width: 486px) {
//     gap: 15px;
//     padding: 20px 10px;
//   }
// `;

// const Bela = styled.section`
//   width: 100vw;
//   background: rgba(0, 0, 0, 0.35);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
//   margin: auto 0;
// `;
// const BelaSection = styled.section`
//   width: 80%;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   gap: 30px;
//   padding: 70px 0;
//   margin-top: 60px;
//   margin: auto 0;
  
//   @media (max-width: 1200px) {
//     width: 98%;
//     gap: 20px;
//     padding: 40px 25px;
//     margin-top: 40px;
//   }
//   @media (max-width: 968px) {
//     flex-direction: column;
//     gap: 40px;
//     padding: 30px 10px;
//     margin-top: 20px;
//   }
//   @media (max-width: 768px) {
//     width: 100%;
//     padding: 16px 16px;
//     gap: 16px;
//     margin-top: 8px;
//   }
//   @media (max-width: 486px) {
//     width: 100%;
//     padding: 16px 16px;
//     gap: 10px;
//     margin-top: 4px;
//   }
// `;

// const Book = styled.section`
//   width: 100vw;
//   background: rgba(0, 0, 0, 0.35);
//   display: flex;
//   align-items: center;
//   flex-direction: column;
// `;
// const BookSection = styled.section`
//   width: 80%;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   flex-direction: column;
//   text-center !important;
//   gap: 15px;
//   padding: 70px 0;
//   margin-top: 60px;
//   margin 0 auto;
  
//   @media (max-width: 1200px) {
//     width: 98%;
//     gap: 10px;
//     padding: 40px 25px;
//     margin-top: 30px;
//   }
//   @media (max-width: 968px) {
//     flex-direction: column;
//     gap: 24px;
//     margin-top: 15px;
//   }
//   @media (max-width: 768px) {
//     width: 100%;
//     padding: 25px 20px ;
//     gap: 10px;
//     margin 0 auto;
//     margin-top: 6px;
//   }
// `;

// const Awards = styled.section`
//   width: 100vw;
//   background: black;
//   display: flex;
//   align-items: center;
//   flex-direction: column;
// `;
// const AwardsSection = styled.section`
//   width: 80%;
//   display: flex;
//   justify-content: space-between;
//   flex-direction: column;
//   gap: 32px;
//   padding: 50px 0;
  
//   @media (max-width: 1200px) {
//     width: 98%;
//     gap: 20px;
//     padding: 30px 0;
//   }
//   @media (max-width: 968px) {
//     flex-direction: column;
//     gap: 24px;
//     padding: 20px 20px;
//   }
//   @media (max-width: 786px) {
//     width: 100%;
//     padding: 10px 18px;
//     gap: 10px;
//   }
//   @media (max-width: 486px) {
//     width: 100%;
//     padding: 10px 16px;
//     gap: 10px;
//   }
// `;

// const HeroContent = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   gap: 14px;
//   max-width: 700px;

//   @media (max-width: 768px) {
//   gap: 10px;
//   }
//     @media (max-width: 486px) {
//   gap: 6px;
// }
// `;

// const AboutContent = styled.div`
//   flex: 2;
//   display: flex;
//   flex-direction: column;
//   gap: 24px;
//   width: 100%;
//   padding: 0 30px;

//   @media (max-width: 768px) {
//   gap: 10px;
//   padding: 0 20px;
//   }
//     @media (max-width: 486px) {
//   gap: 6px;
//   padding: 0 14px;
// }
// `;

// const HeroTagline = styled.p`
//   font-size: 1rem;
//   color: #ffa726;
//   font-weight: 500;
//   letter-spacing: 1px;
//   text-transform: uppercase;

//   @media (max-width: 768px) {
//   font-size: 0.75rem;
//   }
//     @media (max-width: 486px) {
//     font-size: .65rem;
// }
// `;

// const HeroTitle = styled.h1`
//   font-size: 3.8rem;
//   font-weight: 700;
//   line-height: 1.2;
//   margin: 0;

//   @media(max-width: 1024px) {
//   font-size: 2.7rem;
//   }
  
//   @media (max-width: 768px) {
//     font-size: 2.2rem;
//   }
// `;

// const BelaTitle = styled.h1`
//   font-size: 4.2rem;
//   font-weight: 700;
//   line-height: 1.2;
//   margin: 0;
  
//   @media (max-width: 768px) {
//     font-size: 2rem;
//     line-height: 1.1;
//     margin: 0;
//   }
// `;

// const BooksTitle = styled.h2`
//   font-size: 2rem;
//   font-weight: 700;
//   margin: 0;
  
//   @media (max-width: 768px) {
//     font-size: 1.7rem;
//   }
// `;

// const AwardsTitle = styled.h2`
//   font-size: 2rem;
//   font-weight: 700;
//   margin: 0;
//   text-align: center;
  
//   @media (max-width: 768px) {
//     font-size: 1.5rem;
//   }
// `;

// const AboutTitle = styled.h1`
//   font-size: 3.5rem;
//   text-align: center;
//   font-weight: 700;
//   line-height: 1.2;
//   margin: 0;
//   background: rgba(0, 0, 0, 0.4);
//   padding: 20px;
  
//   @media (max-width: 1024px) {
//     font-size: 2.5rem;
//   }
  
//   @media (max-width: 768px) {
//     font-size: 2rem;
//   line-height: 1.1;
//   padding: 15px;
//   }
  
//   @media (max-width: 486px) {
//     font-size: 1.5rem;
//   padding: 10px;
//   line-height: 1.1;
//   }
// `;

// const Subtitle = styled.h3`
//   font-size: 1.2rem;
//   font-weight: 400;
//   margin-bottom: 12px;
//   font-family: 'Trebuchet MS', 'Segoe UI', Arial, sans-serif;
//   @media (max-width: 1024px) {
//     font-size: 1.1rem;
//   }
//   @media (max-width: 768px) {
//     font-size: 0.85rem;
//   }
// `;

// const HeroDesc = styled.p`
//   font-size: 1.15rem;
//   color: #eaeaea;
//   line-height: 1.6;
//   font-weight: 400;
//   font-family: 'Trebuchet MS', 'Segoe UI', Arial, sans-serif;
//   text-align: justify;
//   @media (max-width: 1024px) {
//     font-size: 1rem;
//   }
//   @media (max-width: 768px) {
//     font-size: 0.7rem;
//   }
// `;

// const AboutDesc = styled.p`
//   font-size: 1.1rem;
//   color: #eaeaea;
//   line-height: 2;
//   font-weight: 400;
//   font-family: 'Trebuchet MS', 'Segoe UI', Arial, sans-serif;
//   text-align: justify;
  
//   @media (max-width: 1024px) {
//     font-size: 0.85rem;
//   }
//   @media (max-width: 768px) {
//     font-size: 0.7rem;
//   }
// `;

// const BDesc = styled.p`
//   font-size: 1.4rem;
//   color: #eaeaea;
//   line-height: 1.8;
//   font-weight: 600;
//   font-family: 'Trebuchet MS', 'Segoe UI', Arial, sans-serif;
//   text-align: center;
//   padding: 20px;
//   border-radius: 12px;
//   background: rgba(255, 255, 255, 0.5);
//   margin-top: 30px;
  
//   @media (max-width: 1024px) {
//     font-size: .95rem;
//   }
//   @media (max-width: 768px) {
//     font-size: 0.8rem;
//   }
//   @media (max-width: 486px) {
//   padding: 10px;
//   border-radius: 10px;
//   margin-top: 15px;
//   }
// `;

// const HeroButton = styled.button`
//   background: #ffa726;
//   color: #fff;
//   border: none;
//   border-radius: 8px;
//   padding: 16px 40px;
//   font-size: 1.1rem;
//   font-weight: 600;
//   cursor: pointer;
//   align-self: flex-start;
//   transition: all 0.3s ease;
//   box-shadow: 0 4px 16px rgba(255, 167, 38, 0.3);
  
//   &:hover {
//     background: #ff9800;
//     transform: translateY(-2px);
//     box-shadow: 0 6px 20px rgba(255, 167, 38, 0.4);
//   }
// `;

// const HeroImageContainer = styled.div`
//   flex: 1;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   max-width: 900px;
  
//   @media (max-width: 968px) {
//     max-width: 100%;
//   }
// `;

// const AboutImageContainer1 = styled.div`
//   flex: 1;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   max-width: 600px;
//   @media(max-width: 1024px) {
//   display: none;
//   }
// `;

// const AboutImageContainer = styled.div`
//   flex: 1;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   max-width: 600px;
// `;

// const BookImageContainer = styled.div`
//   // flex: 1;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   // max-width: 600px;
// `;

// const HeroImage = styled.img`
//   width: 60%;
//   height: auto;
//   border-radius: 24px;
//   box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
//   object-fit: cover;
//   max-height: 750px;
// `;

// const BookImage = styled.img`
//   height: auto;
//   border-radius: 24px;
//   object-fit: cover;
//   max-height: 400px;

//   @media (max-width: 768px) {
//   width: 60%;
//   // max-height: 600px;
//   // border-radius: 10px;
//   }

//   @media (max-width: 486px) {
//   width: 100%;
//   max-height: 600px;
//   border-radius: 10px;
//   }
// `;

// const BelaImage = styled.img`
//   width: 65%;
//   height: auto;
//   border-radius: 24px;
//   box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18);
//   object-fit: fit;
//   max-height: 850px;
// `;

// const AboutImage = styled.img`
//   width: 60%;
//   height: auto;
//   border-radius: 24px;
//   box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
//   object-fit: cover;
//   max-height: 900px;
// `;

// const HeroImagePlaceholder = styled.div`
//   width: 100%;
//   height: 180px;
//   background: #fff;
//   color: #3926a3;
//   border-radius: 16px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 1rem;
//   font-weight: 500;
//   margin: 24px 0 0 0;
// `;

// const Logo = styled.div`
//   font-size: 2.5rem;
//   font-weight: 600;
//   letter-spacing: 2px;
//   margin-bottom: 12px;
// `;

// const Section = styled.section`
//   width: 100%;
//   max-width: 900px;
//   background: rgba(255, 255, 255, 0.07);
//   border-radius: 18px;
//   margin: 32px auto;
//   padding: 32px 24px;
//   box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
// `;

// const SectionTitle = styled.h3`
//   font-size: 1.3rem;
//   font-weight: 500;
//   margin-bottom: 20px;
//   color: #fff;
// `;

// const ActivitiesGrid = styled.div`
//   display: flex;
//   justify-items: center;
//   gap: 42px;
//   margin-top: 16px;
//   flex-wrap: wrap;
  
//   @media (max-width: 768px) {
//   flex-direction: column
//   }
// `;

// const ActivityCard = styled.div`
//   background: rgba(255, 255, 255, 0.12);
//   flex: 1;
//   border-radius: 14px;
//   padding: 24px 16px;
//   text-align: center;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   text-align: left;
  
//   @media (max-width: 768px) {
//   }
// `;

// const ActivityIconPlaceholder = styled.div`
//   width: 100px;
//   height: 100px;
//   background: #fff;
//   color: #3926a3;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 2.4rem;
//   font-weight: 500;
//   margin-bottom: 10px;
  
//   @media (max-width: 768px) {
//   width: 72px;
//   height: 72px;
//   font-size: 2rem;
//   margin-bottom: 6px;
//   }
  
//   @media (max-width: 486px) {
//   width: 60px;
//   height: 60px;
//   font-size: 1.35rem;
//   margin-bottom: 3px;
//   }
// `;

// const ActivityTitle = styled.h4`
//   font-size: 1.5rem;
//   font-weight: 600;
//   margin-bottom: 18px;
//   text-align: center;
  
//   @media (max-width: 768px) {
//   font-size: 1.2rem;
//   margin-bottom: 12px;
//   }
  
//   @media (max-width: 486px) {
//   font-size: 1rem;
//   margin-bottom: 8px;
//   }
// `;

// const ActivityDesc = styled.p`
//   font-size: 0.95rem;
//   color: #eaeaea;
// `;

// const BooksGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   justify-items: center;
//   align-items: center;

//   width: 100%;
//   gap: 5rem;
  
//   @media (max-width: 768px) {
// //     display: grid;
// //     grid-template-columns: 1fr;
// // }
// //   @media (max-width: 486px) {
//     display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   gap: 2rem
//   }
// `;

// const BookCard = styled.div`
//   background: rgba(255, 255, 255, 0.12);
//   border-radius: 25px;
//   max-width: 450px;
//   padding: 18px 16px;
//   text-align: center;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
  
//   @media (max-width: 768px) {
//     border-radius: 15px;
//     max-width: 300px;
//   padding: 12px 8px;
// }
//   @media (max-width: 486px) {
//     max-width: 200px;
//     padding: 10px 6px;
//     border-radius: 10px;
//   }
// `;

// const BookCoverPlaceholder = styled.div`
//   width: 120px;
//   height: 180px;
//   background: #fff;
//   color: #3926a3;
//   border-radius: 8px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 1rem;
//   font-weight: 500;
//   margin-bottom: 10px;
// `;

// const BookTitle = styled.h4`
//   font-size: 2.3rem;
//   font-weight: 700;
//   margin-bottom: 3px;
//   padding: 10px;
//   margin: 0;
  
//   @media (max-width: 1024px) {
//     font-size: 2.1rem;
//   }
//   @media (max-width: 768px) {
//     font-size: 1.6rem;
//   }
//   @media (max-width: 486px) {
//     font-size: .9rem;
//   }
// `;

// const BookDesc = styled.p`
//   font-size: 1.1rem;
//   padding: 0 25px;
//   color: #eaeaea;
//   font-weight: 500;
//   font-family: 'Trebuchet MS', 'Segoe UI', Arial, sans-serif;
//   margin: 0;
  
//   @media (max-width: 1024px) {
//   }
//   @media (max-width: 768px) {
//     font-size: 0.8rem;
//   }
//   @media (max-width: 768px) {
//     font-size: 0.5rem;
//   }
// `;

// const PartnersRow = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 38px;
//   justify-content: center;
//   align-items: center;
//   @media (max-width: 786px) {
//   gap: 28px;
//     display: flex;
//     flex-direction: column;
//   }
//   @media (max-width: 486px) {
//     gap: 20px;
//     display: flex;
//     align-items: left  !important;
//   flex-direction: column !important;
//   }
// `;

// const PartnerItem = styled.div`
//   display: flex;
//   gap: 20px;
//   justify-content: center;
//   align-items: center;
//   min-width: 120px;
//   @media (max-width: 786px) {
//   gap: 18px;
//   }
//   @media (max-width: 486px) {
//   gap: 14px;
//     display: flex;
//     align-items: left;
//     flex-direction: cloumns;
//   }
// `;


// const Img = styled.img`
//   width: 80px !important;
//   height: auto;
//   @media (max-width: 786px) {
//   width: 64px !important;
//   }
//   @media (max-width: 486px) {
//   width: 40px !important;
//   }
//   `;

// const LogoIconPlaceholder = styled.div`
//   width: 80px;
//   background: white;
//   color: #3926a3;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 1rem;
//   font-weight: 500;
//   margin-bottom: 8px;
//   @media (max-width: 786px) {
//   width: 64px !important;
//   }
//   @media (max-width: 486px) {
//   width: 40px !important;
//   }
// `;

// const PartnerCaption = styled.span`
//   font-size: 0.95rem;
//   color: #eaeaea;
//   text-align: center;
//   @media (max-width: 786px) {
//   font-size: 0.95rem;
//   }
//   @media (max-width: 486px) {
//   font-size: 0.75rem;
//   }
// `;

// const Description = styled.p`
//   font-size: 1rem;
//   color: white;
//   font-weight: 300;
//   margin-bottom: 10px;
//   line-height: 1.7;
//   margin: 0;  
  
//   @media (max-width: 1024px) {
//     font-size: .85em;
//   }
  
//   @media (max-width: 768px) {
//     font-size: .75rem;
//   }
// `;

// const EmailForm = styled.form`
//   display: flex;
//   flex-direction: column;
//   gap: 13px;
//   align-self: flex-end;
//   justify-content: flex-end;
//   width: 100%;
// `;

// const EmailInputRow = styled.div`
//   display: flex;
//   align-items: center;
//   background: #fff;
//   border-radius: 8px;
//   overflow: hidden;
//   box-shadow: 0 2px 8px rgba(0,0,0,0.08);
//   width: 100%;
//   margin-bottom: 8px;

//   @media (max-width: 600px) {
//     max-width: 100%;
//   }
// `;

// const EmailInput = styled.input`
//   flex: 1;
//   padding: 14px 16px;
//   border: none;
//   font-size: 1rem;
//   outline: none;
//   background: transparent;
//   color: #222;

//   &::placeholder {
//     color: #888;
//     font-weight: 400;
//   }
  
//   @media (max-width: 1024px) {
//     font-size: 0.75rem;
//     padding: 10px 12px;
//   }
  
//   @media (max-width: 768px) {
//   }
// `;

// const SubmitButton = styled.button`
//   background: #d46a00;
//   color: #fff;
//   border: none;
//   border-radius: 0 8px 8px 0;
//   padding: 14px 32px;
//   font-size: 1rem;
//   font-weight: 500;
//   height: auto;
//   cursor: pointer;
//   transition: background 0.2s, opacity 0.2s;
//   box-shadow: none;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   opacity: ${props => props.disabled ? 0.5 : 1};
//   pointer-events: ${props => props.disabled ? 'none' : 'auto'};

//   &:hover {
//     background: #ffa726;
//   }
  
//   @media (max-width: 1024px) {
//     font-size: 0.75rem;
//   padding: 10px 26px;
//   }
  
//   @media (max-width: 768px) {
//   }
// `;

// const ModernCheckbox = styled.input.attrs({ type: 'checkbox' })`
//   appearance: none;
//   width: 18px;
//   height: 18px;
//   border: 2px solid #ffa726;
//   border-radius: 6px;
//   background: #fff;
//   margin-right: 8px;
//   transition: border 0.2s, box-shadow 0.2s;
//   position: relative;
//   cursor: pointer;
//   outline: none;

//   &:checked {
//     background: #ffa726;
//     border-color: #d46a00;
//   }
//   &:checked:after {
//     content: '';
//     position: absolute;
//     left: 6px;
//     top: 2px;
//     width: 6px;
//     height: 12px;
//     border: solid #fff;
//     border-width: 0 3px 3px 0;
//     transform: rotate(45deg);
//     display: block;
//   }
//   &:focus {
//     box-shadow: 0 0 0 2px #ffa72644;
//   }
  
//   @media (max-width: 1024px) {
//     width: 14px;
//     height: 14px;
//     border: 1px solid #ffa726;
//   }
  
//   @media (max-width: 768px) {
//     width: 12px;
//     height: 12px;
//   }
// `;

// const CheckboxLabel = styled.label`
//   font-size: 1rem;
//   color: #eaeaea;
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   cursor: pointer;
  
//   @media (max-width: 1024px) {
//     font-size: 0.9rem;
//     gap: 6px;
//   }
  
//   @media (max-width: 768px) {
//   }
// `;

// const Microcopy = styled.p`
//   font-size: 0.95rem;
//   color: #eaeaea;
//   margin-top: 8px;
//   text-align: center;
  
//   @media (max-width: 1024px) {
//     font-size: 0.85rem;
//   }
  
//   @media (max-width: 768px) {
//   }
// `;

// const ContactButton = styled.button`
//   background: #ffa726;
//   color: #fff;
//   border: none;
//   border-radius: 8px;
//   padding: 12px 32px;
//   font-size: 1rem;
//   font-weight: 500;
//   cursor: pointer;
//   margin-top: 12px;
//   transition: background 0.2s;
  
//   &:hover {
//     background: #ff9800;
//   }
// `;

// const BelasSection = styled.section`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   padding: 6rem 0;
  
//   @media (max-width: 1024px) {
//   }
  
//   @media (max-width: 768px) {
//   padding: 2.5rem 10px;
//   };
//   `;

// const BelasTitle = styled.h2`
//   font-size: 2.5rem;
//   font-weight: 700;
//   text-align: center;
//   margin: 0px;
  
//   @media (max-width: 768px) {
//   font-size: 2rem;
//   };
  
//   @media (max-width: 486px) {
//   font-size: 1.7rem;
//   };
//   `;

// const BelaImg = styled.img`
//   border-radius: 50%;
//   width: 100px;
//   height: 100px;
//   object-fit: cover;
//   margin-bottom: 12px;
//   `;

// const BelasSubtitle = styled.p`
//   font-size: 1.2rem;
//   text-align: center;
//   margin-top: 6px;
//   margin-bottom: 24px;
  
//   @media (max-width: 768px) {
//   font-size: 1rem;
//   };
  
//   @media (max-width: 486px) {
//   font-size: .87rem;
//   };
//   `;

// const MailSection = styled.section`
//   width: 80%;
//   padding: 30px 30px;
//   margin: 100px 0;
//   background: black;
//   border-radius: 30px;
//   @media(max-width: 1440px) {
//     width: 90%
//   }    
  
//   @media (max-width: 1024px) {
//     width: 98%
//   }
  
//   @media (max-width: 768px) {
//     width: 98%;
//   }
//   `;

// const MailCover = styled.div`
//   width: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   gap: 50px;
//   flex-wrap: wrap;
//   padding: 50px 0;
// `;

// const MailText = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   gap: 16px;
//   `;

// const MailBox = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   gap: 16px;
//   width: 100%;
//   justify-content: flex-end
  
//   @media (max-width: 1024px) {
//     gap: 12px;
//   }
  
//   @media (max-width: 768px) {
//   };
// `;

// const MailTitle = styled.h3`
//   font-size: 1.8rem;
//   font-weight: 600;
//   margin: 0;
  
//   @media (max-width: 1024px) {
//     font-size: 1.3rem;
//   }
  
//   @media (max-width: 768px) {
//     font-size: .95rem;
//   }
//   `;

// const MailTitle1 = styled.h3`
//   font-size: 2rem;
//   font-weight: 600;
//   margin: 0;
//   text-align: center;
//   text-transform: uppercase;
  
//   @media (max-width: 1024px) {
//     font-size: 1.7rem;
//   }
  
//   @media (max-width: 768px) {
//     font-size: 1rem;
//   }
//   `;

// const SafetySection = styled.section`
//   width: 100vw;
//   background: black;
//   display: flex;
//   align-items: center;
//   flex-direction: column;
//   padding: 15px 100px;
//   padding-bottom: 10px;
  
//   @media (max-width: 486px) {
//   padding: 15px 10px;
//   }
// `;

// const SafetyTitle = styled.h2`
//   font-size: 2rem;
// `;

// const Div = styled.div`
//   background: black;
//   width: 100vw;
//   color: white;
//   padding: 40px 0px;
//   padding-bottom: 120px;
// `;