import React, { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { noop } from 'lodash/fp';

import { ReactComponent as SearchIcon } from '../../assets/search.svg';

import { useTheme } from '../../hooks/theme.hooks';
import { useOnClickOutside } from '../../hooks/utils.hooks';
import { useCombobox } from './combobox.hooks';

import OptionsList from './OptionsList';

import {
  CLOSE_MENU_DURATION,
  INPUT_ANIMATION_FRACTION_DURATION,
} from './combobox.constants';
import { hexToRgba } from '../..';
import { Option } from '../../types/common.types';
import { LoadingDots } from '../LoadingDots/LoadingDots';

export interface ComboboxProps {
  options: Array<Option>;
  callToAction: string;
  isLoading?: boolean;
  isFilteredExternally?: boolean;
  onChange?: (suggestion: string) => void;
  onSubmit?: (option: Option) => void;
  withOptionSelection?: boolean;
}

const Combobox = ({
  options,
  callToAction,
  isLoading = false,
  onChange = noop,
  onSubmit = noop,
  isFilteredExternally = false,
  withOptionSelection = false,
}: ComboboxProps) => {
  const {
    inputRef,
    isInputOpen,
    toggleInput,
    closeInput,
    onInput,
    onKeyDown,
    onFocusHandler,
    onBlurHandler,
    isMenuOpen,
    filteredOptions,
    pureInputValue,
    onOptionsSelection,
    suggestionIndex,
  } = useCombobox({
    options,
    onChange,
    onSubmit,
    isLoading,
    isFilteredExternally,
  });

  const [
    isContainerOpenAnimationComplete,
    setIsContainerOpenAnimationComplete,
  ] = useState(false);

  const focusInput = useCallback(() => inputRef.current?.focus(), [inputRef]);

  const containerRef = useRef<HTMLDivElement>(null);

  const onClickOutside = useCallback(() => {
    if (isMenuOpen) {
      return setTimeout(() => {
        closeInput();
      }, CLOSE_MENU_DURATION);
    }
    closeInput();
  }, [closeInput, isMenuOpen]);

  useOnClickOutside(containerRef, onClickOutside, true);

  const theme = useTheme();

  return (
    <Container ref={containerRef}>
      <InputLayout
        initial={false}
        animate={{
          boxShadow: `0px 2px 10px 0px ${hexToRgba(
            theme.p700,
            isInputOpen ? 10 : 0
          )}`,
          width: isInputOpen ? '100%' : 'auto',
          transition: {
            duration: INPUT_ANIMATION_FRACTION_DURATION,
            opacity: {
              delay: isInputOpen ? 0 : INPUT_ANIMATION_FRACTION_DURATION,
            },
            width: {
              delay: isInputOpen ? INPUT_ANIMATION_FRACTION_DURATION * 2 : 0,
            },
          },
        }}
        onAnimationComplete={() =>
          setIsContainerOpenAnimationComplete(isInputOpen)
        }
      >
        <AnimatePresence>
          {isInputOpen && isContainerOpenAnimationComplete && (
            <InputContainer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onAnimationComplete={focusInput}
            >
              <Input
                data-cy="combobox-input"
                ref={inputRef}
                onBlur={onBlurHandler}
                onFocus={onFocusHandler}
                placeholder={`${callToAction}...`}
                onInput={onInput}
                onKeyDown={onKeyDown}
              />
              {withOptionSelection && (
                <OptionsList
                  isMenuOpen={isMenuOpen}
                  filteredOptions={filteredOptions}
                  onOptionsSelection={onOptionsSelection}
                  suggestionIndex={suggestionIndex}
                  isLoading={isLoading}
                  pureInputValue={pureInputValue}
                  inputWidth={inputRef.current?.getBoundingClientRect()?.width}
                />
              )}
            </InputContainer>
          )}
        </AnimatePresence>

        <ActionsContainer data-cy="combobox-actions" onClick={toggleInput}>
          {(!isInputOpen || !(isLoading && pureInputValue)) && (
            <div style={{ width: 14, height: 14 }}>
              <StyledSearchIcon />
            </div>
          )}
          {pureInputValue && isLoading && isMenuOpen && (
            <StyledLoadingDots />
            // <StyledThreeDotLoader />
          )}
          <CallToAction
            initial={false}
            animate={{
              opacity: isInputOpen ? 0 : 1,
              width: isInputOpen ? 0 : 'auto',
              transition: {
                duration: INPUT_ANIMATION_FRACTION_DURATION,
                opacity: {
                  delay: isInputOpen
                    ? 0
                    : INPUT_ANIMATION_FRACTION_DURATION * 2,
                },
                width: {
                  delay: INPUT_ANIMATION_FRACTION_DURATION,
                },
              },
            }}
          >
            {callToAction}
          </CallToAction>
        </ActionsContainer>
      </InputLayout>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
`;

const InputLayout = styled(motion.div)`
  right: 0;
  position: absolute;
  min-height: 40px;
  font-size: 12px;
  display: flex;
  width: 100%;
  max-width: 460px;
  justify-content: flex-end;
  align-items: center;
  border-radius: 5px;
  box-shadow: ${({ theme }) => `0px 2px 10px 0px ${hexToRgba(theme.p700, 10)}`};
  background-color: ${({ theme }) => theme.p0};
`;

const ActionsContainer = styled(motion.div)`
  position: absolute;
  cursor: pointer;
  right: 0;
  padding: 0 15px 0 10px;
  top: 0;
  display: inline-flex;
  align-items: center;
  height: 40px;
  font-weight: 600;
  justify-content: flex-end;
  color: ${({ theme }) => theme.p400};
  background: ${({ theme }) => theme.p0};

  path {
    fill: ${({ theme }) => theme.p400};
  }

  &:hover {
    color: ${({ theme }) => theme.a400};

    path {
      fill: ${({ theme }) => theme.a400};
    }
  }
`;

const CallToAction = styled(motion.div)`
  margin-left: 5px;
  white-space: nowrap;
`;

const StyledSearchIcon = styled(SearchIcon)`
  height: 14px;
  width: 14px;
`;

const InputContainer = styled(motion.div)`
  flex: 1;
  height: 100%;
`;

const Input = styled.input`
  height: 40px;
  width: 100%;
  padding-left: 10px;
  border: none;
  border-radius: 5px;
  background: ${({ theme }) => theme.p0};
  color: ${({ theme }) => theme.p700};
`;

const StyledLoadingDots = styled(LoadingDots)`
  margin-right: 2px;
`;

export default Combobox;
