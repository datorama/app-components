import React, { useCallback, useState } from 'react';
import { throttle } from 'lodash/fp';
import styled from 'styled-components';

import { ReactComponent as RemoveIcon } from '../../assets/remove.svg';

import Combobox from '../Combobox/Combobox';

import { Option } from '../../types/common.types';

export interface SearchProps {
  selectedOption: any;
  isPending?: boolean;
  fetchFilteredOptions: ({ searchTerm }: { searchTerm?: string }) => void;
  filteredOptions: Array<Option>;
  selectOption;
  placeholder: string;
  withOptionSelection?: boolean;
}

export const Search = ({
  selectedOption,
  isPending,
  fetchFilteredOptions,
  filteredOptions,
  selectOption,
  placeholder,
  withOptionSelection = false,
}: SearchProps) => {
  const [isNewRequestQueued, setIsNewRequestQueued] = useState(false);

  const onChangeThrottle = useCallback(
    throttle(1500, (searchTerm: string) => {
      setIsNewRequestQueued(false);
      if (searchTerm) {
        fetchFilteredOptions({ searchTerm });
      }
    }),
    []
  );

  const onChange = (searchTerm: string) => {
    setIsNewRequestQueued(true);
    onChangeThrottle(searchTerm);
  };

  const resetCampaign = useCallback(() => selectOption(null), [selectOption]);

  const onSubmit = useCallback(
    ({ label }) => {
      selectOption(label);
    },
    [selectOption]
  );

  if (withOptionSelection && selectedOption) {
    return (
      <SelectedOption>
        <OptionName>{selectedOption}</OptionName>
        <StyledRemoveIcon
          className="remove-campaign-icon"
          onClick={resetCampaign}
        />
      </SelectedOption>
    );
  }

  return (
    <Combobox
      callToAction={placeholder}
      options={filteredOptions!}
      onChange={onChange}
      onSubmit={onSubmit}
      isLoading={isNewRequestQueued || isPending}
      isFilteredExternally
      withOptionSelection={withOptionSelection}
    />
  );
};

const SelectedOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 80px;
  height: 28px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.a400};
  padding: 0 8px;

  .remove-campaign-icon {
    * path {
      stroke: ${({ theme }) => theme.p0};
      fill: ${({ theme }) => theme.p0};
    }
  }
`;

const OptionName = styled.div`
  ${({ theme }) => theme.text.smLink};
  color: ${({ theme }) => theme.p0};
`;

const StyledRemoveIcon = styled(RemoveIcon)`
  margin-left: 8px;
  cursor: pointer;
`;
