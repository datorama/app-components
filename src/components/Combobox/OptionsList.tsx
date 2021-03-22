import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled, { css } from 'styled-components';
import { get, isEmpty, max } from 'lodash/fp';
import { AutoSizer, List } from 'react-virtualized';
import { AnimatePresence, motion } from 'framer-motion';

import { hexToRgba, Spinner } from '../..';

import { ReactComponent as NoResultsAsset } from '../../assets/no-results.svg';

import { MENU_HEIGHT, OPTION_HEIGHT } from './combobox.constants';
import { Tooltip } from '../Tooltip';

import { useTheme } from '../../hooks/theme.hooks';

import { Option as OptionType } from '../../types/common.types';

interface Props {
  isMenuOpen: boolean;
  filteredOptions: OptionType[];
  onOptionsSelection: (suggestionIndex: number) => void;
  suggestionIndex: number;
  isLoading: boolean;
  pureInputValue: string;
  inputWidth?: number;
}

const OptionsList = ({
  isMenuOpen,
  filteredOptions,
  onOptionsSelection,
  suggestionIndex,
  isLoading,
  pureInputValue,
  inputWidth,
}: Props) => {
  const theme = useTheme();

  const adjustedMenuHeight = useMemo(() => {
    if (!filteredOptions.length || isLoading) return MENU_HEIGHT;
    const listHeight = OPTION_HEIGHT * filteredOptions.length;

    return max([
      listHeight > MENU_HEIGHT ? MENU_HEIGHT : listHeight,
      OPTION_HEIGHT,
    ]);
  }, [filteredOptions.length, isLoading]);

  const rowRenderer = useCallback(
    ({ index, style }) => {
      const label = get('label', filteredOptions[index]);
      const isSuggested = index === suggestionIndex;

      return (
        <Option
          data-cy="combobox-option"
          className="combobox-option"
          key={label}
          style={style}
          onClick={() => onOptionsSelection(index)}
          whileHover={{
            backgroundColor: theme.a100,
          }}
          animate={{
            backgroundColor: isSuggested ? hexToRgba(theme.a100, 70) : theme.p0,
          }}
        >
          <OptionLabel label={label} inputWidth={inputWidth!} />
        </Option>
      );
    },
    [
      filteredOptions,
      inputWidth,
      onOptionsSelection,
      suggestionIndex,
      theme.a100,
      theme.p0,
    ]
  );

  return (
    <AnimatePresence>
      {isMenuOpen && pureInputValue && (
        <Container
          className="combobox-menu-container"
          data-cy="combobox-menu"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            height: adjustedMenuHeight,
            transition: {
              duration: 0.25,
            },
          }}
          exit={{ opacity: 0 }}
          isLoading={isLoading}
        >
          {isLoading && (
            <LoadingOverlay data-cy="combobox-loading-overlay">
              <Spinner />
            </LoadingOverlay>
          )}
          {!isLoading && isEmpty(filteredOptions) ? (
            <EmptyState data-cy="combobox-empty-state" isLoading={isLoading}>
              <NoResultsAsset />
            </EmptyState>
          ) : (
            <AutoSizer disableHeight>
              {({ width }) => (
                <List
                  className="combobox-menu-list"
                  width={width}
                  height={adjustedMenuHeight!}
                  rowCount={filteredOptions.length}
                  rowRenderer={rowRenderer}
                  rowHeight={OPTION_HEIGHT}
                  scrollToIndex={suggestionIndex}
                />
              )}
            </AutoSizer>
          )}
        </Container>
      )}
    </AnimatePresence>
  );
};

interface OptionLabelProps {
  label: string;
  inputWidth: number;
}

export const OptionLabel = ({ label, inputWidth }: OptionLabelProps) => {
  const theme = useTheme();
  const optionLabelTexRef = useRef<HTMLSpanElement>(null);
  const [tooltipLabel, setTooltipLabel] = useState(label);

  const {
    width: labelTextWidth,
  } = optionLabelTexRef.current?.getBoundingClientRect() || { width: 0 };

  useEffect(
    function showTooltipBasedOnLabelWidth() {
      if (labelTextWidth > inputWidth! - 20) {
        setTooltipLabel(label);
      } else {
        setTooltipLabel('');
      }
    },
    [inputWidth, label, labelTextWidth]
  );

  return (
    <Tooltip title={tooltipLabel}>
      <StyledOptionLabel width={inputWidth}>
        <span style={{ color: theme.p700 }} ref={optionLabelTexRef}>
          {label}
        </span>
      </StyledOptionLabel>
    </Tooltip>
  );
};

const Container = styled(motion.div)<{ isLoading: boolean }>`
  width: 100%;
  overflow: hidden;
  border-radius: 0 0 5px 5px;
  background-color: ${({ theme }) => theme.p0};
  border-top: ${({ theme }) => `1px solid ${theme.p50}`};
  position: relative;

  ${({ isLoading }) =>
    isLoading &&
    css`
      .combobox-option {
        opacity: 0;
      }
    `}
`;

const EmptyState = styled.div<{ isLoading: boolean }>`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ isLoading }) => isLoading && `opacity: 0.2`}
`;

const Option = styled(motion.div)`
  height: 32px;
  width: 60px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: ${({ theme }) => theme.p0};
`;

const LoadingOverlay = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 1;
  cursor: initial;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledOptionLabel = styled.div<{ width: number | undefined }>`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${({ width }) => width && `width: ${width - 20}px;`}
`;

export default OptionsList;
