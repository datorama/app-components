import { AllSubstringsIndexStrategy, Search } from 'js-search';

import { Option } from '../../types/common.types';

export const getNextWordIndex = (
  fullSuggestion: string,
  currentValue: string
) => {
  // Remove currently entered text from suggestion, and find next full word from
  // suggestion's text. Example -
  //
  // currentEnteredValue: 'Su'
  // suggestedValue: 'Suggested text'
  // suggestionWithoutCurrentValue: 'ggested text' => we'll autocomplete 'ggested '
  let suggestionWithoutCurrentValue = fullSuggestion.substring(
    currentValue.length
  );

  let wordsSpaceIndex;

  // If suggestions is 'Example text suggestion' and entered value is 'Example', then
  // next 'space' is going to be index 0: [' ', 't', 'e', 'x', 't', ' ', ...]
  // so we need to proceed to next-next space
  if (suggestionWithoutCurrentValue[0] === ' ') {
    suggestionWithoutCurrentValue = suggestionWithoutCurrentValue.substring(1);
    wordsSpaceIndex = suggestionWithoutCurrentValue.indexOf(' ');

    if (wordsSpaceIndex !== -1) wordsSpaceIndex++;
  } else {
    wordsSpaceIndex = suggestionWithoutCurrentValue.indexOf(' ');
  }

  return wordsSpaceIndex;
};

export const searchOptions = (options: Option[], searchTerm: string) => {
  const search = new Search('label');

  search.indexStrategy = new AllSubstringsIndexStrategy();

  search.addIndex('label');
  search.addDocuments(options);

  return search.search(searchTerm) as Option[];
};
