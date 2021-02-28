import React, { createContext, ReactNode, useContext, useState } from 'react';
import { noop } from 'lodash/fp';

import { useUploadFileConfig } from './upload-file.hooks';

import UploadFileModal from './UploadFileModal';

import {
  UploadFileConfig,
  UseUploadFileConfig,
  ModalConfig,
} from './upload-file.types';

const UploadFileContext = createContext<{
  onToggle: () => void;
  uploadFileConfig: UploadFileConfig | null;
}>({
  onToggle: noop,
  uploadFileConfig: null,
});

type UploadFileProviderProps = Omit<UseUploadFileConfig, 'isOpen'> & {
  children: ReactNode;
  modalConfig: ModalConfig;
};

export const UploadFileProvider = ({
  children,
  savedFile,
  onSave,
  isUploadOnly,
  modalConfig,
  onDownloadExample,
  uploadedFileParser,
  checkIsFileValid,
  fileType,
}: UploadFileProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = () => setIsOpen((curr) => !curr);

  const uploadFileConfig = useUploadFileConfig({
    isOpen,
    isUploadOnly,
    onSave,
    uploadedFileParser,
    checkIsFileValid,
    savedFile,
    onDownloadExample,
    fileType,
  });

  return (
    <UploadFileContext.Provider
      value={{
        onToggle,
        uploadFileConfig,
      }}
    >
      {children}

      <UploadFileModal
        uploadFileConfig={uploadFileConfig}
        modalConfig={modalConfig}
        isOpen={isOpen}
        toggleOpen={onToggle}
      />
    </UploadFileContext.Provider>
  );
};

export const useUploadFile = () => useContext(UploadFileContext);
