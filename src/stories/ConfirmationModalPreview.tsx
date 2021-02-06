import React, { useState, useMemo, useCallback } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { useConfirmationModal } from '../hooks/confirmation-modal.hooks';

import { Modal } from '../components/Modal';
import { Button } from '../components/Button';
import { Checkbox } from '../components/Checkbox';

import { lightTheme } from '../constants/themes.constants';

const InnerComponent = () => {
  const [counter, setCounter] = useState(0);
  const [shouldConfirm, setShouldConfirm] = useState(false);

  const {
    isOpen,
    toggleOpen,
    onResolve,
    asyncConfirmationCheck,
  } = useConfirmationModal(shouldConfirm);

  const buttons = useMemo(
    () => [
      { type: 'Secondary', label: 'Cancel', onClick: () => onResolve(false) },
      { type: 'primary', label: 'Confirm', onClick: () => onResolve(true) },
    ],
    [onResolve]
  );

  const raiseCounter = useCallback(async () => {
    const isConfirmed = await asyncConfirmationCheck();

    if (!isConfirmed) return;

    setCounter((counter) => counter + 1);
  }, [setCounter, asyncConfirmationCheck]);

  return (
    <Container>
      <Modal
        toggleOpen={toggleOpen}
        open={isOpen}
        buttons={buttons}
        title="Confirmation Modal"
      >
        Confirm action
      </Modal>

      <Counter>{counter}</Counter>
      <StyledButton onClick={raiseCounter}>Add</StyledButton>

      <Checkbox
        checked={shouldConfirm}
        label="Should confirm"
        onClick={() => setShouldConfirm((curr) => !curr)}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
`;

const Counter = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.p600};
  padding: 5px 20px;
  border: 1px solid ${({ theme }) => theme.p200};
  border-radius: 8px;
  margin-bottom: 20px;
`;

const StyledButton = styled(Button)`
  margin-bottom: 20px;
`;

export const ConfirmationModal = () => (
  <ThemeProvider theme={lightTheme}>
    <InnerComponent />
  </ThemeProvider>
);
