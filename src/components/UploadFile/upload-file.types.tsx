export interface UploadFileConfig {
  fileName: null | string;
  savedFileName: null | string;
  onDownloadExample: () => void;
  onBrowse: () => void;
  onSave: () => void;
  onRemove: () => void;
  setIsErrorVisible: (isErrorVisible: boolean) => void;
  isErrorVisible: boolean;
  isDirty: boolean;
  isDropAreaActive: boolean;
  dropAreaRef: (node: HTMLDivElement | null) => void;
  fileType: string;
  isUploadOnly: boolean;
}

export interface ModalConfig {
  labels: {
    title: string;
    subtitle: string;
    example: string;
    errorMessage: string;
    dragAndDrop: string;
    browse: string;
    cancel: string;
    save: string;
    lastUploaded: string;
  };
}

export interface UseUploadFileConfig {
  isOpen: boolean;
  isUploadOnly: boolean;
  onSave: ({ name, data }: { name: string; data: unknown }) => void;
  uploadedFileParser: (fileContent: unknown) => unknown;
  checkIsFileValid: (file: File) => boolean;
  fileType: string;
  savedFile: {
    name: null | string;
    data: null | unknown;
  };
  onDownloadExample: () => void;
}
