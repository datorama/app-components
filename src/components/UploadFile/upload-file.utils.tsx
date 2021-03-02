import { toPairs, trim } from 'lodash/fp';

export const parseCsvFileContent = (content: string) => {
  const checkIsRowValid = (values: Array<string>) => {
    //Sometimes when encoding rows to file, it can add a new line at the end of the file
    const isEndOfFile = values.length === 1 && trim(values[0]) === '';
    const isRowFilledCorrectly =
      values.length === 2 && trim(values[0]) !== '' && trim(values[1]) !== '';

    return isEndOfFile || isRowFilledCorrectly;
  };

  const cleanCsvValue = (value: string) => {
    // remove whitespaces and apostrophes coming with downloaded files from platform
    return value && value.trim().replace(/(^")|("$)/g, '');
  };

  const lines = content.split(/\r\n|\n/);
  const mappedContent: Map<string, string> = new Map();

  for (let i = 1; i < lines.length; i++) {
    let values = lines[i].split(',');

    //  Addressing Preview csv where there are 3 columns
    if (values.length > 2) {
      values = values.slice(1);
    }

    if (checkIsRowValid(values)) {
      mappedContent.set(cleanCsvValue(values[0]), cleanCsvValue(values[1]));
    }
  }

  if (mappedContent.size === 0) {
    throw Error('File is empty');
  }

  return toPairs(mappedContent);
};
