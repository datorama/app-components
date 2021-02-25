import { useCallback, useEffect, useRef, useState } from 'react';

import { UseUploadFileConfig, UploadFileConfig } from './upload-file.types';

export const useUploadFileConfig = ({
  isOpen,
  isUploadOnly,
  savedFile,
  onSave,
  uploadedFileParser,
  checkIsFileValid,
  onDownloadExample,
  fileType,
}: UseUploadFileConfig): UploadFileConfig => {
  const { data: savedFileData, name: savedFileName } = savedFile;

  const [isDirty, setIsDirty] = useState(false);
  const [data, setData] = useState<unknown | null>(
    isUploadOnly ? null : savedFileData
  );
  const [fileName, setFileName] = useState<string | null>(
    isUploadOnly ? null : savedFileName
  );
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  const readFile = useCallback(
    (file: File) => {
      const reader = new FileReader();

      reader.readAsText(file, 'UTF-8');

      reader.onload = (readerEvent) => {
        if (readerEvent.target) {
          const content = readerEvent.target.result as string;

          if (content) {
            try {
              const parsedFile = uploadedFileParser(content);

              if (parsedFile) {
                setFileName(file.name);
                setData(parsedFile);
                setIsErrorVisible(false);
                setIsDirty(true);
              }
            } catch (err) {
              setIsErrorVisible(true);
            }
          }
        }
      };
    },
    [uploadedFileParser]
  );

  const onFileDrop = useCallback(
    (event: DragEvent) => {
      const file: File = (event?.dataTransfer?.files as FileList)[0];

      if (!checkIsFileValid(file)) {
        setIsErrorVisible(true);

        return;
      }

      readFile(file);
    },
    [readFile]
  );

  const onBrowse = useCallback(() => {
    const input = document.getElementById('browse-files-input');

    if (input) {
      input.onchange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];

        if (!checkIsFileValid(file)) {
          setIsErrorVisible(true);

          return;
        }

        readFile(file);
      };

      input.click();
    }
  }, [readFile]);

  const onRemove = useCallback(() => {
    setFileName(null);
    setData([]);
    setIsErrorVisible(false);
    setIsDirty(true);
  }, []);

  useEffect(
    function resetDirtyOnToggle() {
      if (isDirty && !isOpen) setIsDirty(false);
    },
    [isDirty, isOpen]
  );

  useEffect(
    function resetFileOnToggle() {
      if (!isUploadOnly) return;

      if (!isOpen) {
        setTimeout(() => {
          onRemove();
        }, 500);
      }
    },
    [isUploadOnly, isOpen]
  );

  const { isDropAreaActive, dropAreaRef } = useDropFileHooks({
    onFileDrop,
  });

  return {
    onDownloadExample,
    onBrowse,
    onSave: () => onSave({ name: fileName as string, data }),
    onRemove,
    setIsErrorVisible,
    isErrorVisible,
    fileName,
    isDirty,
    isDropAreaActive,
    dropAreaRef,
    savedFileName,
    fileType,
    isUploadOnly,
  };
};

export const useDropFileHooks = ({
  onFileDrop,
}: {
  onFileDrop: (event: DragEvent) => void;
}) => {
  const [isDropAreaActive, setIsDropAreaActive] = useState(false);

  const dropAreaRef = useRef<HTMLDivElement | null>(null);

  const handleDragLeave = useCallback((event) => {
    event.stopPropagation();
    event.preventDefault();

    setIsDropAreaActive(false);
  }, []);

  const handleDragOver = useCallback((event) => {
    event.stopPropagation();
    event.preventDefault();

    setIsDropAreaActive(true);
  }, []);

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();

      setIsDropAreaActive(false);
      onFileDrop(event);
    },
    [onFileDrop]
  );

  const onRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;

      dropAreaRef.current = node;

      dropAreaRef.current.addEventListener('dragleave', handleDragLeave);
      dropAreaRef.current.addEventListener('dragover', handleDragOver);
      dropAreaRef.current.addEventListener('drop', handleDrop);
    },
    [handleDragLeave, handleDragOver, handleDrop]
  );

  useEffect(() => {
    return () => {
      if (dropAreaRef.current) {
        dropAreaRef.current.removeEventListener('dragleave', handleDragLeave);
        dropAreaRef.current.removeEventListener('dragover', handleDragOver);
        dropAreaRef.current.removeEventListener('drop', handleDrop);
      }
    };
  }, [handleDragLeave, handleDragOver, handleDrop]);

  return {
    dropAreaRef: onRef,
    isDropAreaActive,
  };
};
