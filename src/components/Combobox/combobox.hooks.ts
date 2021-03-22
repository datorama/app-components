import { useCallback, useState, useRef, useEffect, RefObject } from 'react';
import { findIndex, get, size, noop } from 'lodash/fp';

import {
  SUGGESTION_VALUES,
  Key,
  INPUT_TYPE,
  CLOSE_MENU_DURATION,
} from './combobox.constants';

import { Option } from '../../types/common.types';

import { getNextWordIndex, searchOptions } from './combobox.utils';

type UseComboboxSignature = {
  options: Option[];
  isLoading: boolean;
  onChange: (suggestion: string) => void;
  onSubmit: (option: Option) => void;
  isFilteredExternally?: boolean;
};

type SyncInputStateSignature = {
  value: string;
  event?: InputEvent;
  skipSelectionRange?: boolean;
};

export const useCombobox = ({
  options = [],
  isLoading = false,
  onChange = noop,
  onSubmit = noop,
  isFilteredExternally = false,
}: UseComboboxSignature) => {
  const { isInputOpen, closeInput, toggleInput } = useToggleableInput();
  const { isMenuOpen, openMenu, closeMenu } = useMenu();

  const prevInputOpenState = useRef(isMenuOpen);

  // Used to save only the input made by user, without the suggested part
  const [pureInputValue, setPureInputValue] = useState('');

  useEffect(
    function resetPureInputValueOnInputClose() {
      if (prevInputOpenState.current && !isInputOpen) {
        setPureInputValue('');
        onChange('');
      }
      prevInputOpenState.current = isInputOpen;
    },
    [isInputOpen, onChange, pureInputValue]
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const [filteredOptions, setFilteredOptions] = useState(options);
  const [suggestionIndex, setSuggestionIndex] = useState(
    SUGGESTION_VALUES.EMPTY
  );

  const getFilteredOptions = useFilterOptions({ options });

  // Used when moving between suggestions with up/down arrows -> changing suggestion index & input value,
  // without re-filtering current options
  const syncInputStateBySuggestionIndex = useCallback(
    (suggestionIndex) => {
      const suggestion = get('label', filteredOptions[suggestionIndex]);

      if (!suggestion) return;

      setSuggestionIndex(suggestionIndex);

      inputRef.current!.value = suggestion;

      const isValueSubstringOfSuggestion = suggestion
        .toLowerCase()
        .startsWith(pureInputValue.toLowerCase());

      // Let input value update before selecting text
      setTimeout(() => {
        if (!isValueSubstringOfSuggestion) {
          inputRef.current!.setSelectionRange(0, suggestion.length);
        } else {
          inputRef.current!.setSelectionRange(
            pureInputValue.length,
            suggestion.length
          );
        }
      }, 0);
    },
    [filteredOptions, pureInputValue]
  );

  // Used when auto-completing words using right arrow key
  const syncInputStateByNextSuggestedWord = useCallback(
    (value) => {
      setPureInputValue(value);

      const fullSuggestion = get('label', filteredOptions[suggestionIndex]);

      if (!isFilteredExternally) {
        const updatedFilteredOptions = getFilteredOptions(value);

        setFilteredOptions(updatedFilteredOptions);
      }

      setTimeout(() => {
        inputRef.current!.setSelectionRange(
          value.length + 1,
          fullSuggestion.length
        );
      }, 0);
    },
    [filteredOptions, suggestionIndex, isFilteredExternally, getFilteredOptions]
  );

  // Used on regular user's input
  const syncInputState = useCallback(
    ({ value, event, skipSelectionRange = false }: SyncInputStateSignature) => {
      setPureInputValue(value);
      onChange(value);

      if (isFilteredExternally) return;

      if (!value) {
        setFilteredOptions(options);

        return;
      }

      const isDeleteEvent =
        event && get('inputType', event) === INPUT_TYPE.DELETE;

      const updatedFilteredOptions = getFilteredOptions(value);
      const numOfSuggestions = size(updatedFilteredOptions);

      if (!numOfSuggestions || isDeleteEvent) {
        setFilteredOptions(updatedFilteredOptions);

        return;
      }

      if (numOfSuggestions && !isDeleteEvent) {
        const suggestion = get('label', updatedFilteredOptions[0]);

        onChange(suggestion);

        if (
          suggestion
            .toLowerCase()
            .startsWith(inputRef.current!.value.toLowerCase())
        ) {
          inputRef.current!.value = suggestion;

          if (!skipSelectionRange) {
            inputRef.current!.setSelectionRange(
              value.length,
              suggestion.length
            );
          }
        }
      }

      setFilteredOptions(updatedFilteredOptions);
    },
    [onChange, isFilteredExternally, getFilteredOptions, options]
  );

  // When filtered options are changed, we need to update currently highlighted suggestion index
  useEffect(() => {
    const updatedSuggestionIndex = findIndex(
      (option) => get('label', option) === inputRef.current?.value,
      filteredOptions
    );

    setSuggestionIndex(updatedSuggestionIndex);
  }, [filteredOptions, inputRef, setSuggestionIndex]);

  // When new options are passed to the component via props, we need to filter them by the current search term
  useEffect(
    function filterNextOptions() {
      if (pureInputValue) {
        setFilteredOptions(options);
      }
    },
    [options, pureInputValue]
  );

  const onInput = useCallback(
    ({ target: { value }, nativeEvent }) =>
      syncInputState({ value, event: nativeEvent }),
    [syncInputState]
  );

  const onFocusHandler = useCallback(() => {
    if (!isMenuOpen) openMenu();
  }, [isMenuOpen, openMenu]);

  const onBlurHandler = useCallback(() => {
    if (isMenuOpen) closeMenu();
  }, [closeMenu, isMenuOpen]);

  const onOptionsSelection = useCallback(
    (suggestionIndex) => {
      if (suggestionIndex === SUGGESTION_VALUES.EMPTY) {
        return;
      }

      const suggestionText = get('label', filteredOptions[suggestionIndex]);

      if (!suggestionText) return;

      setPureInputValue(suggestionText);
      inputRef.current!.value = suggestionText;
      onChange(suggestionText);
      closeMenu();

      // Give menu time to close
      setTimeout(() => {
        onSubmit(filteredOptions[suggestionIndex]);
        closeInput();
      }, CLOSE_MENU_DURATION);
    },
    [closeInput, closeMenu, filteredOptions, onChange, onSubmit]
  );

  const onKeyDown = useOnKeyDown({
    suggestionIndex,
    filteredOptions,
    onOptionsSelection,
    pureInputValue,
    inputRef,
    syncInputState,
    syncInputStateByNextSuggestedWord,
    syncInputStateBySuggestionIndex,
    isMenuOpen,
    closeMenu,
    openMenu,
    isLoading,
  });

  return {
    inputRef,
    isInputOpen,
    closeInput,
    toggleInput,
    onInput,
    onKeyDown,
    onFocusHandler,
    onBlurHandler,
    isMenuOpen,
    filteredOptions,
    pureInputValue,
    suggestionIndex,
    onOptionsSelection,
  };
};

export const useMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = useCallback(() => {
    setIsMenuOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return {
    isMenuOpen,
    openMenu,
    closeMenu,
  };
};

export const useFilterOptions = ({ options }: { options: Option[] }) =>
  useCallback((value): Option[] => searchOptions(options, value), [options]);

type UseOnKeyDownSignature = {
  suggestionIndex: number;
  filteredOptions: Option[];
  onOptionsSelection: (suggestionIndex: number) => void;
  pureInputValue: string;
  inputRef: RefObject<HTMLInputElement | undefined>;
  syncInputState: (signature: SyncInputStateSignature) => void;
  syncInputStateByNextSuggestedWord: (value: string) => void;
  syncInputStateBySuggestionIndex: (suggestionIndex: number) => void;
  closeMenu: () => void;
  isMenuOpen: boolean;
  openMenu: () => void;
  isLoading: boolean;
};

export const useOnKeyDown = ({
  suggestionIndex,
  filteredOptions,
  onOptionsSelection,
  pureInputValue,
  inputRef,
  syncInputState,
  syncInputStateByNextSuggestedWord,
  syncInputStateBySuggestionIndex,
  closeMenu,
  isMenuOpen,
  openMenu,
  isLoading,
}: UseOnKeyDownSignature) =>
  useCallback(
    (event) => {
      if (isLoading) return;
      const { key }: { key: Key } = event;

      switch (key) {
        case Key.ESCAPE:
          closeMenu();
          break;

        case Key.TAB:
          // Prevent tab from focusing on other elements
          event.preventDefault();

          if (suggestionIndex !== SUGGESTION_VALUES.EMPTY) {
            const suggestion = get('label', filteredOptions[suggestionIndex]);

            syncInputState({ value: suggestion });
          }

          break;

        case Key.ENTER:
          onOptionsSelection(suggestionIndex);

          break;

        case Key.ARROW_RIGHT:
          if (event.shiftKey || event.ctrlKey || event.altKey) return;

          if (!isMenuOpen) openMenu();

          // Don't proceed if no suggestion
          if (suggestionIndex === SUGGESTION_VALUES.EMPTY) return;

          // Get current suggestion's text
          const suggestedValue = get('label', filteredOptions[suggestionIndex]);

          if (!suggestedValue || pureInputValue === suggestedValue) {
            return;
          }

          const nextWordIndex = getNextWordIndex(
            suggestedValue,
            pureInputValue!
          );

          if (nextWordIndex > -1) {
            // Auto-complete current input to suggested next word
            const nextWordSuggestion = suggestedValue.substring(
              0,
              pureInputValue.length + nextWordIndex
            );

            // At this point, we've got selected text inside input (suggested part)
            // Pressing right arrow would jump to the end of the whole input.
            // We're setting the caret at the suggested part, then RIGHT ARROW event stays there,
            // and then `setSelectionRange` inside `syncInputStateByNextSuggestedWord` selects
            // the suggested part again
            inputRef.current!.setSelectionRange(
              nextWordSuggestion.length,
              nextWordSuggestion.length
            );
            syncInputStateByNextSuggestedWord(nextWordSuggestion);
          } else {
            syncInputState({ value: suggestedValue, skipSelectionRange: true });
          }

          break;

        case Key.ARROW_LEFT:
          // Left arrow cancels text selection, so we're updating the input to current suggestion
          // as if the user selected it
          if (suggestionIndex !== SUGGESTION_VALUES.EMPTY) {
            const suggestion = get('label', filteredOptions[suggestionIndex]);

            syncInputState({ value: suggestion, skipSelectionRange: true });
          }
          break;

        case Key.ARROW_UP:
          if (!isMenuOpen) openMenu();

          let previousSuggestionIndex;

          if (suggestionIndex < 0) {
            previousSuggestionIndex = 0;
          } else if (suggestionIndex - 1 < 0) {
            previousSuggestionIndex = filteredOptions.length - 1;
          } else {
            previousSuggestionIndex = suggestionIndex - 1;
          }

          syncInputStateBySuggestionIndex(previousSuggestionIndex);

          break;

        case Key.ARROW_DOWN:
          if (!isMenuOpen) openMenu();

          let nextSuggestionIndex;

          if (
            suggestionIndex < 0 ||
            suggestionIndex + 1 > filteredOptions.length - 1
          ) {
            nextSuggestionIndex = 0;
          } else {
            nextSuggestionIndex = suggestionIndex + 1;
          }

          syncInputStateBySuggestionIndex(nextSuggestionIndex);

          break;

        default:
      }
    },
    [
      isLoading,
      closeMenu,
      suggestionIndex,
      onOptionsSelection,
      isMenuOpen,
      openMenu,
      filteredOptions,
      pureInputValue,
      syncInputStateBySuggestionIndex,
      syncInputState,
      inputRef,
      syncInputStateByNextSuggestedWord,
    ]
  );

const useToggleableInput = () => {
  const [isInputOpen, setIsInputOpen] = useState(false);

  const closeInput = useCallback(() => setIsInputOpen(false), []);

  const toggleInput = useCallback(
    () => setIsInputOpen((isOpen) => !isOpen),
    []
  );

  return {
    isInputOpen,
    closeInput,
    toggleInput,
  };
};
