import React, { Dispatch, SetStateAction, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Button } from '../components/Button';
import { Toggle } from '../components/Toggle';
import { noop } from 'lodash/fp';

import {
  UploadFileProvider,
  useUploadFile,
} from '../components/UploadFile/UploadFileProvider';
import { UploadFileConfig } from '../components/UploadFile/upload-file.types';
import { parseCsvFileContent } from '../components/UploadFile/upload-file.utils';

import { lightTheme } from '../constants/themes.constants';

const InnerComponent = ({
  savedFile,
  isUploadOnly,
  setIsUploadOnly,
}: {
  savedFile: { name: null | string };
  isUploadOnly: boolean;
  setIsUploadOnly: Dispatch<SetStateAction<boolean>>;
}) => {
  const { onToggle } = useUploadFile();

  return (
    <Container>
      <Button onClick={onToggle}>Upload file</Button>

      <div style={{ margin: '20px 0' }}>
        <Toggle
          label="isUploadOnly"
          checked={isUploadOnly}
          onClick={() => setIsUploadOnly((curr) => !curr)}
        />
      </div>

      {savedFile?.name ? (
        <SavedFile>
          <span>Saved file: </span> <span>{savedFile?.name}</span>
        </SavedFile>
      ) : null}
    </Container>
  );
};

const WrappedInnerComponent = () => {
  const [savedFile, setSavedFile] = useState({ name: null, data: null });
  const [isUploadOnly, setIsUploadOnly] = useState(true);

  return (
    <UploadFileProvider
      modalConfig={{
        labels: {
          title: 'Upload a classification file',
          subtitle:
            'Download the CSV file template to fill the classification rules for your campaigns into strategies. Upload the file and see how the rules affect your data.',
          cancel: 'Cancel',
          save: 'Save',
          example: 'Download CSV template file',
          errorMessage:
            'There was a problem uploading the file, please make sure you selected a CSV file and try again.',
          dragAndDrop: 'DRAG & DROP',
          lastUploaded: 'Last uploaded file',
          browse: 'Browse',
        },
      }}
      onSave={setSavedFile}
      isUploadOnly={isUploadOnly}
      savedFile={savedFile}
      onDownloadExample={noop}
      uploadedFileParser={parseCsvFileContent}
      checkIsFileValid={(file: File) => !!file && /^.+\.(csv)$/.test(file.name)}
      fileType="csv,text/csv"
    >
      <InnerComponent
        savedFile={savedFile}
        isUploadOnly={isUploadOnly}
        setIsUploadOnly={setIsUploadOnly}
      />
    </UploadFileProvider>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
`;

const SavedFile = styled.div`
  margin-top: 20px;
  font-size: 15px;
  color: ${({ theme }) => theme.p500};
  display: flex;
  align-items: center;

  span {
    &:first-of-type {
      font-weight: bold;
      margin-right: 10px;
    }
  }
`;

export const UploadFilePreview = () => (
  <ThemeProvider theme={lightTheme}>
    <WrappedInnerComponent />
  </ThemeProvider>
);

export const UploadFileConfigPreview = (props: UploadFileConfig) => <div />;
