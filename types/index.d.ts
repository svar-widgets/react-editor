import type { ReactNode, FC } from 'react';
import type { IToolbarItem } from '@svar-ui/react-toolbar';

export declare const Editor: FC<{
  values?: Record<string, any>;
  items?: {
    comp?: string | FC<any>;
    key?: string;
    /** multi-field item: the comp receives/emits a composite object keyed by
     * these field names, while changes report the real field keys */
    keys?: (string | number)[];
    /** render the item without a Field wrapper, filling the whole form */
    fill?: boolean;
    label?: string;
    labelTemplate?: (value: any) => string;
    column?: 'right' | 'left';
    batch?: string | number;
    hidden?: boolean;
    section?: string;
    sectionMode?: 'accordion' | 'exclusive';
    activeSection?: boolean;
    options?: {
      id?: string | number;
      label?: string;
      [key: string]: any;
    }[];
    required?: boolean;
    validation?: (value: any) => boolean;
    validationMessage?: string;
    config?: {
      [key: string]: any;
    };
    [key: string]: any;
  }[];
  css?: string;
  activeBatch?: string | number;
  topBar?: boolean | { items: IToolbarItem[] };
  bottomBar?: boolean | { items: IToolbarItem[] };
  autoSave?: boolean;
  layout?: 'default' | 'columns';
  placement?: 'inline' | 'sidebar' | 'modal' | 'fullscreen';
  readonly?: boolean;
  focus?: boolean;
  onChange?: (ev: {
    key: string;
    value: any;
    update: Record<string, any>;
    input?: boolean;
  }) => void;
  onSave?: (ev: {
    changes: Record<string, any>;
    values: Record<string, any>;
  }) => void;
  onAction?: (ev: {
    item: IToolbarItem;
    values: Record<string, any>;
    changes: Record<string, any>;
  }) => void;
  onValidation?: (ev: {
    errors: {
      [key: string]: {
        errorType: 'validation' | 'required';
      };
    };
    values: Record<string, any>;
  }) => void;
  children?: ReactNode;
}>;

export declare function registerEditorItem(
  type: string,
  handler: FC<any>,
  config?: { readonly?: boolean } | null,
): void;

export interface IUploadedFile {
  id: string | number;
  name: string;
  url?: string;
  size?: number;
  /** "client" while uploading, "error" on failure; absent once stored */
  status?: 'client' | 'server' | 'error';
  /** raw File, present only on in-flight upload objects */
  file?: File;
  [key: string]: any;
}

export declare const Attachments: FC<{
  value?: IUploadedFile[] | string | number;
  /** resolves the display list when value is a master record id */
  ondata?: (
    value: IUploadedFile[] | string | number,
  ) => Promise<IUploadedFile[]> | IUploadedFile[];
  uploadURL?: string | ((file: IUploadedFile) => Promise<Record<string, any>>);
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  onChange?: (ev: {
    value: IUploadedFile[];
    action: 'add' | 'delete';
    file: IUploadedFile;
    originalValue?: IUploadedFile[] | string | number;
  }) => void;
  onAction?: (ev: {
    action: 'add-file' | 'delete-file';
    file: IUploadedFile;
    value: IUploadedFile[];
  }) => void;
}>;

export declare const CodeMirror: FC<{
  value: string;
  onChange?: (ev: { value: string }) => void;
  focus?: boolean;
  theme?: string;
  language?: string;
  readonly?: boolean;
}>;

export declare const TinyMCE: FC<{
  value: string;
  onChange?: (ev: { value: string }) => void;
  licenseKey?: string;
  toolbar?: string;
  focus?: boolean;
  skin?: string;
}>;

export declare const Willow: FC<{
  fonts?: boolean;
  children?: ReactNode;
}>;

export declare const WillowDark: FC<{
  fonts?: boolean;
  children?: ReactNode;
}>;

export declare const Material: FC<{
  fonts?: boolean;
  children?: ReactNode;
}>;
