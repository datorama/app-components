import React, { useCallback } from 'react';
import styled from 'styled-components';

import { useTheme } from '../../hooks/theme.hooks';

import { Modal } from '../Modal';
import { Button } from '../Button';
import { Ellipsis } from '../Ellipsis';
import { ReactComponent as Export } from './assets/export.svg';
import { ReactComponent as ExcelFileIcon } from './assets/excel-file.svg';
import { ReactComponent as ActiveExcelFileIcon } from './assets/excel-file-active.svg';
import { ReactComponent as RemoveFile } from './assets/remove-file.svg';
import { ReactComponent as TrashIcon } from './assets/trash.svg';

import warningIcon from './assets/warning.svg';

import { UploadFileConfig, ModalConfig } from './upload-file.types';

interface UploadFileModalProps {
  isOpen: boolean;
  toggleOpen: () => void;
  uploadFileConfig: UploadFileConfig;
  modalConfig: ModalConfig;
}

const UploadFileModal = ({
  isOpen,
  toggleOpen,
  uploadFileConfig,
  modalConfig,
}: UploadFileModalProps) => {
  const { labels } = modalConfig;

  const theme = useTheme();

  const handleRemoveErrorBanner = useCallback(
    () => uploadFileConfig.setIsErrorVisible(false),
    [uploadFileConfig]
  );

  return (
    <StyledModal
      open={isOpen}
      toggleOpen={toggleOpen}
      size="large"
      title={labels.title}
      buttons={[
        {
          label: labels.cancel,
          onClick: null,
          type: 'secondary',
        },
        {
          label: labels.save,
          onClick: uploadFileConfig.onSave,
          disabled: !uploadFileConfig.isDirty,
        },
      ]}
    >
      <ModalContent>
        <SubTitle>{labels.subtitle}</SubTitle>
        <DownloadLink onClick={uploadFileConfig.onDownloadExample}>
          <Export
            style={{ marginRight: 10, stroke: theme.a300, overflow: 'visible' }}
          />{' '}
          {labels.example}
        </DownloadLink>

        <UploadArea
          ref={uploadFileConfig.dropAreaRef}
          isActive={uploadFileConfig.isDropAreaActive}
        >
          {uploadFileConfig.isErrorVisible && (
            <ErrorBanner>
              <WarningIcon src={warningIcon} />
              <ErrorMessage>{labels.errorMessage}</ErrorMessage>

              <RemoveFile onClick={handleRemoveErrorBanner} />
            </ErrorBanner>
          )}

          {uploadFileConfig?.fileName ? (
            <UploadedFileDetails>
              <ActiveExcelFileIcon width={100} height={150} />
              <FileNameWrapper>
                {
                  // @ts-ignore
                  <StyledEllipsis>{uploadFileConfig.fileName}</StyledEllipsis>
                }
                <TrashIcon
                  onClick={uploadFileConfig.onRemove}
                  style={{ cursor: 'pointer' }}
                />
              </FileNameWrapper>
            </UploadedFileDetails>
          ) : (
            <React.Fragment>
              <ExcelFileIcon />
              <DragDropText>{labels.dragAndDrop}</DragDropText>
              <Or>- or -</Or>
              <input
                type="file"
                accept={`.${uploadFileConfig.fileType}`}
                id="browse-files-input"
                style={{ display: 'none' }}
              />
              <StyledButton onClick={uploadFileConfig.onBrowse}>
                {labels.browse}
              </StyledButton>
            </React.Fragment>
          )}
        </UploadArea>

        <CurrentFileWrapper>
          {uploadFileConfig.isUploadOnly ? (
            <CurrentFile title={uploadFileConfig.savedFileName || ''}>
              {uploadFileConfig.savedFileName ? (
                <span>
                  <span style={{ fontWeight: 'bold' }}>
                    {labels.lastUploaded}:
                  </span>{' '}
                  {uploadFileConfig.savedFileName}
                </span>
              ) : (
                ''
              )}
            </CurrentFile>
          ) : null}
        </CurrentFileWrapper>
      </ModalContent>
    </StyledModal>
  );
};

const ErrorBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  z-index: 1;
  height: 45px;
  position: absolute;
  background-color: ${({ theme }) => theme.r400};
  border-radius: 2px;
  box-shadow: 0 2px 14px 0 rgba(0, 0, 0, 0.2);
  padding: 0 10px;
  width: 270px;

  svg {
    cursor: pointer;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
  }
`;

const ErrorMessage = styled.span`
  font-size: 10px;
  color: ${({ theme }) => theme.p0};
`;

const WarningIcon = styled.img`
  height: 18px;
  width: 18px;
  margin-right: 8px;
`;

const StyledEllipsis = styled(Ellipsis)`
  ${({ theme }) => theme.text.sm};
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledButton = styled(Button)`
  font-size: 12px;
  height: 24px;
`;

const SubTitle = styled.span`
  ${({ theme }) => theme.text.p};
  align-self: flex-start;
  margin-bottom: 40px;
`;

const FileNameWrapper = styled.div`
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    min-width: 0;
  }
`;

const DownloadLink = styled.div`
  ${({ theme }) => theme.text.pBold};
  color: ${({ theme }) => theme.a400};
  cursor: pointer;
  margin-bottom: 20px;

  #export-arrow {
    transition: transform 0.2s ease-in-out;
  }

  &:hover {
    > svg {
      #export-arrow {
        transform: translate(0px, -5px);
      }
    }
  }
`;

const UploadArea = styled.div<{ isActive?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border: ${({ theme, isActive }) =>
    `2px dashed ${isActive ? theme.s400 : theme.p200}`};
  height: 240px;
  width: 300px;

  ${({ isActive }) =>
    isActive &&
    `
    * {
      pointer-events: none;
    }
  `}
`;

const UploadedFileDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DragDropText = styled.span`
  font-size: 24px;
  font-weight: 800;
  color: ${({ theme }) => theme.p300};
`;

const Or = styled.span`
  ${({ theme }) => theme.text.pNote};
`;

const StyledModal = styled(Modal)<{ open: boolean }>`
  z-index: 5;

  .content {
    padding-bottom: 5px;
  }
`;

const CurrentFileWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.p400};
`;

const CurrentFile = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 500px;
`;

export default UploadFileModal;
