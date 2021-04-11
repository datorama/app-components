import React, {
  useState,
  useCallback,
  useRef,
  ChangeEvent,
  useEffect,
} from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { noop } from 'lodash/fp';

import { ReactComponent as SearchIcon } from '../../assets/search.svg';
import Close from '../../assets/Close.icon';

import { useTheme } from '../../hooks/theme.hooks';
import { useOnClickOutside } from '../../hooks/utils.hooks';

import { hexToRgba } from '../../utils/theme.utils';

export const CLOSE_MENU_DURATION = 500;
export const INPUT_ANIMATION_FRACTION_DURATION = 0.3;

export interface SearchInputProps {
  placeholder?: string;
  onChange: (value: string) => void;
  onClose?: () => void;
  onOpen?: () => void;
  value: string;
  className?: string;
}

const SearchInput = ({
  placeholder,
  onChange,
  value,
  onClose = noop,
  onOpen = noop,
  className = 'search-input',
}: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [
    isContainerOpenAnimationComplete,
    setIsContainerOpenAnimationComplete,
  ] = useState(false);

  const focusInput = useCallback(() => inputRef.current?.focus(), [inputRef]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = value;
    }
  }, [inputRef.current]);

  const containerRef = useRef<HTMLDivElement>(null);

  const onClickOutside = useCallback(() => {
    if (isInputOpen) {
      setIsInputOpen(false);
      onClose();
    }
  }, [setIsInputOpen, isInputOpen, onClose]);

  useOnClickOutside(containerRef, onClickOutside, !value);

  const theme = useTheme();

  const handleClick = useCallback(
    () =>
      setIsInputOpen((curr) => {
        if (!curr) {
          onOpen();
        } else {
          onClose();
        }
        return !curr;
      }),
    [onOpen, onClose, setIsInputOpen]
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleRemoveInput = () => {
    onChange('');
  };

  return (
    <Container ref={containerRef} className={className}>
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
                ref={inputRef}
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
                className={`${className} input`}
              />
              {value && (
                <StyledRemoveIcon
                  className={`${className} remove-icon`}
                  onClick={handleRemoveInput}
                />
              )}
            </InputContainer>
          )}
        </AnimatePresence>
        <ActionsContainer onClick={handleClick} isInputOpen={isInputOpen}>
          {!isInputOpen && (
            <div style={{ width: 14, height: 14 }}>
              <StyledSearchIcon />
            </div>
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
            {placeholder}
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

const InputContainer = styled(motion.div)`
  flex: 1;
  height: 100%;
  padding: 0 10px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const Input = styled.input`
  flex: 0.7;
  border: none;
  border-radius: 5px;
  background: ${({ theme }) => theme.p0};
  color: ${({ theme }) => theme.p700};
  box-sizing: border-box;
`;

const ActionsContainer = styled(motion.div)<{ isInputOpen: boolean }>`
  position: absolute;
  cursor: pointer;
  right: 0;
  padding: ${({ isInputOpen }) => (!isInputOpen ? `0 15px 0 10px` : '0')};
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

const StyledRemoveIcon = styled(Close)`
  width: 16px;
  height: 16px;
  cursor: pointer;
  path {
    stroke: ${({ theme }) => theme.p400};
    fill: ${({ theme }) => theme.p400};
  }
`;
export default SearchInput;
