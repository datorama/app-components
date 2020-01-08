import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import { HEIGHTS } from './filter.consts';

const FiltersDivider = ({ showDivider, dividerColor, andColor }) => (
  <AnimatePresence initial={false}>
    {showDivider && (
      <motion.div
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
        <DividerRow>
          <DividerWrapper>
            <Divider dividerColor={dividerColor} />
            <And andColor={andColor}>AND</And>
            <Divider />
          </DividerWrapper>
        </DividerRow>
      </motion.div>
    )}
  </AnimatePresence>
);

const DividerWrapper = styled.div`
  height: 17px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
`;

const Divider = styled.div`
  flex: 1;
  height: 1px;
  opacity: 0.34;
  background-color: ${({ theme, dividerColor }) => dividerColor || theme.p200};
`;

const And = styled.div`
  height: 100%;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme, andColor }) => andColor || theme.p600};
`;

const DividerRow = styled.div`
  height: ${HEIGHTS.DIVIDER_ROW}px;
`;

export default FiltersDivider;
