import React, { useState } from "react";
import { checkForNaughtyWords } from "../../utils/utils";
import Input from "../atoms/Input";
import ModalContainer from "./ModalContainer";

const BioModal = ({ onClose, onSubmit, startingValue }) => {
  const [bio, setBio] = useState(startingValue || "");
  const [error, setError] = useState(null);

  const preSubmit = () => {
    if (checkForNaughtyWords(bio)) return setError("Profanity is not allowed!");
    onSubmit(bio);
    onClose();
  };

  return (
    <ModalContainer onCancel={onClose} onSubmit={preSubmit}>
      <Input
        title="Set Bio"
        value={bio}
        handleOnChange={(name, value) => setBio(value)}
        errorText={error}
      />
    </ModalContainer>
  );
};

export default BioModal;
