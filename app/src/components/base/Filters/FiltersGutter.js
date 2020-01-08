import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import PlusIcon from '../../icons/Plus.icon';
import InfoIcon from '../../icons/Info.icon';
import { HEIGHTS } from './filter.consts';

const FiltersGutter = ({
  showAddition,
  showWarning,
  numFilters,
  maxFilters,
  onAddFilter,
  warningColor
}) => (
  <AnimatePresence initial={false}>
    <Gutter>
      {showAddition && (
        <motion.div
          key={`show-addition_${numFilters}`}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.3, duration: 0.3, ease: 'easeOut' }
          }}
          exit={{
            opacity: 0
          }}
        >
          <AddConditionWrapper>
            <AddCondition onClick={onAddFilter}>
              <StyledPlusIcon />
              CONDITION
            </AddCondition>
          </AddConditionWrapper>
        </motion.div>
      )}

      {showWarning && (
        <motion.div
          key="show-warning"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.3, duration: 0.3, ease: 'easeOut' }
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0.3, ease: 'easeOut' }
          }}
        >
          <Info warningColor={warningColor}>
            <StyledInfoIcon warningColor={warningColor} />
            {`You can create up to ${maxFilters} filters`}
          </Info>
        </motion.div>
      )}
    </Gutter>
  </AnimatePresence>
);

const AddConditionWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: ${({ theme }) => theme.p700};
  font-weight: bold;
`;

const AddCondition = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    margin-right: 5px;
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: ${({ theme, warningColor }) => warningColor || theme.p400};

  svg {
    margin-right: 5px;
  }
`;

const StyledPlusIcon = styled(PlusIcon)`
  path {
    fill: ${({ theme }) => theme.p600};
  }
  cursor: pointer;
`;

const StyledInfoIcon = styled(InfoIcon)`
  path {
    fill: ${({ theme, warningColor }) => warningColor || theme.p600};
  }
`;

const Gutter = styled.div`
  height: ${HEIGHTS.GUTTER_ROW}px;
`;

export default FiltersGutter;
