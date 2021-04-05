import React, { useState, ChangeEvent } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { MarkAccuracy } from 'mark.js';

import { useTextHighlight } from '../hooks/text-highlight.hooks';

import { TextInput } from '../components/TextInput';
import { Checkbox } from '../components/Checkbox';
import { SegmentedButton } from '../components/SegmentedButton/SegmentedButton';

import { lightTheme } from '../constants/themes.constants';

const InnerComponent = () => {
  const [text, setText] = useState('');
  const [isHightlightEnabled, setIsHightlightEnabled] = useState(true);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [accuracy, setAccuracy] = useState<MarkAccuracy>('partially');
  const [separateWordSearch, setSeparateWordSearch] = useState(true);

  const ref = useTextHighlight(
    text,
    { caseSensitive, separateWordSearch, accuracy },
    isHightlightEnabled
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <Container>
      <TextInput
        placeholder="Search text..."
        value={text}
        onChange={handleChange}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          margin: '30px 0',
          height: '200px',
        }}
      >
        <Text ref={ref}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <Options>
          <Checkbox
            checked={caseSensitive}
            label="Case Sensitive"
            onClick={() => setCaseSensitive((curr) => !curr)}
          />
          <Checkbox
            checked={separateWordSearch}
            label="Separate Word Search"
            onClick={() => setSeparateWordSearch((curr) => !curr)}
          />

          <div>
            <p style={{ fontSize: 12, marginBottom: '6px' }}>Accuracy:</p>
            <SegmentedButton
              selected={accuracy}
              onClick={(id) => setAccuracy(id as MarkAccuracy)}
              sections={[
                { id: 'partially', label: 'partially' },
                { id: 'complementary', label: 'complementary' },
                { id: 'exactly', label: 'exactly' },
              ]}
            />
          </div>
        </Options>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  flex-direction: column;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  margin-left: 20px;
  height: 100%;
`;

const Text = styled.div`
  border-radius: 2px;
  box-shadow: 0 4px 23px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  padding: 10px 20px;
  width: 60%;
  height: 100%;
`;

export const TextHighlight = () => (
  <ThemeProvider theme={lightTheme}>
    <InnerComponent />
  </ThemeProvider>
);
