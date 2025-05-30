import { useState } from "react";
import styled from "styled-components";
import Button from "../atoms/Button";
import ChallengeQuestion from "../atoms/ChallengeQuestion";
import SingleBorderFrame from "./SingleBorderFrame";
import successSound from "../../assets/sound/challenge-success-video-game-6346.mp3";
import failSound from "../../assets/sound/wrong-answer-129254.mp3";
const ChallengeContainer = ({
  unlocked,
  tried,
  completed,
  quiz,
  finishTask,
  missionType,
}) => {
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);

  const [successAudio, setSuccessAudio] = useState(new Audio(successSound));
  const [failAudio, setFailAudio] = useState(new Audio(failSound));

  const playSuccessSound = () => {
    successAudio.pause();
    failAudio.pause();
    const newAudio = new Audio(successSound);
    newAudio.play();
    setSuccessAudio(newAudio);
  };
  const playFailSound = () => {
    successAudio.pause();
    failAudio.pause();
    const newAudio = new Audio(failSound);
    newAudio.play();
    setFailAudio(newAudio);
  };

  const nextQuestion = () => {
    if (currentQuestion === quiz.length - 1) {
      return finishTask("quiz", missionType, answers);
    }
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer(null);
    setCorrectAnswer(null);
  };

  const submitAnswer = () => {
    if (selectedAnswer === null) return;
    const correctIndex = quiz[currentQuestion].correctIndex;
    const correct = correctIndex === selectedAnswer ? true : false;
    const newAnswers = { ...answers, [currentQuestion]: correct };
    if (selectedAnswer === correctIndex) {
      console.log("correct");
      playSuccessSound();
    } else playFailSound();
    setAnswers(newAnswers);
    setCorrectAnswer(correctIndex);
  };

  const selectAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const getButtonText = () => {
    switch (true) {
      case correctAnswer !== null && currentQuestion === quiz.length - 1:
        return "Finish Quiz";
      case correctAnswer !== null:
        return "Next Question";
      default:
        return "Submit";
    }
  };

  // console.log("answers", answers);
  if (completed) {
    return (
      <MainContainer>
        <SingleBorderFrame>
          <h3>Congratulation! You've passed all challenges.</h3>
        </SingleBorderFrame>
      </MainContainer>
    );
  } else if (tried && !completed) {
    return (
      <MainContainer>
        <SingleBorderFrame>
          <h3>
            Some answers were wrong. Please read the article or watch the video
            once more to try the challenge again.
          </h3>
        </SingleBorderFrame>
      </MainContainer>
    );
  }
  if (!unlocked) {
    return (
      <MainContainer>
        <SingleBorderFrame mobileSize={"100%"}>
          <h3>Challenge Locked</h3>
          <DescriptionText>
            Complete the other tasks to finish your training, then you can take
            the challenge.
          </DescriptionText>
        </SingleBorderFrame>
      </MainContainer>
    );
  }
  if (unlocked && !quizStarted) {
    return (
      <MainContainer>
        <SingleBorderFrame>
          <Title>Ready for the challenges?</Title>
          <DescriptionText>
            After you finish all the tasks, answer the questions and earn the
            badge.
          </DescriptionText>
          <ButtonContainer>
            <Button
              text="I Am Ready"
              handleOnClick={() => setQuizStarted(true)}
              width={250}
              height={55}
              textSize={25}
            />
          </ButtonContainer>
        </SingleBorderFrame>
      </MainContainer>
    );
  }
  return (
    <MainContainer>
      <SingleBorderFrame>
        <Progress>
          {currentQuestion + 1}/{quiz.length}
        </Progress>
        <QuestionText>{quiz[currentQuestion].question}</QuestionText>
        <AnswersContainer>
          {quiz[currentQuestion].options.map((option, index) => (
            <Spacing key={index}>
              <ChallengeQuestion
                index={index}
                text={option}
                handleOnClick={selectAnswer}
                disabled={correctAnswer !== null}
                selected={selectedAnswer === index}
                wrong={
                  correctAnswer !== null &&
                  selectedAnswer === index &&
                  selectedAnswer !== correctAnswer
                }
                correct={correctAnswer !== null && correctAnswer === index}
              />
            </Spacing>
          ))}
        </AnswersContainer>
        <ButtonContainer>
          <Button
            text={getButtonText()}
            handleOnClick={correctAnswer !== null ? nextQuestion : submitAnswer}
            width={250}
            height={55}
            textSize={20}
          />
        </ButtonContainer>
      </SingleBorderFrame>
    </MainContainer>
  );
};

export default ChallengeContainer;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
`;

const Progress = styled.p`
  position: absolute;
  top: 35px;
  right: 10px;
  display: flex;
  justify-content: flex-end;
  margin: 0;
`;

const QuestionText = styled.p`
  font-size: 20px;
`;

const AnswersContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  @media (min-width: 500px) {
    flex-direction: row;
  }
`;

const Spacing = styled.div`
  margin: 0 10px;
  @media (min-width: 600px) {
    margin: 0 50px;
  }
  @media (min-width: 800px) {
    margin: 0 10px;
  }
`;

const ButtonContainer = styled.div`
  margin: 15px 0;
`;

const Title = styled.div`
  font-size: 25pt;
`;

const DescriptionText = styled.p`
  max-width: 700px;
  color: var(--cyan);
  font-size: 16pt;
  font-weight: bold;
  text-align: center;
`;
