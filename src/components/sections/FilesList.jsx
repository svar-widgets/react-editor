import { useContext, useMemo, useRef, useState } from 'react';
import { Button, context } from '@svar-ui/react-core';
import { uid } from '@svar-ui/lib-dom';
import { useWritableProp } from '@svar-ui/lib-react';
import './FilesList.css';

export default function FilesList(props) {
  const {
    data = [],
    readonly = false,
    uploadURL = '',
    accept = '',
    multiple = true,
    disabled = false,
    onChange,
    onAction,
  } = props;

  const i18n = useContext(context.i18n);
  const _ = useMemo(() => i18n.getGroup('editor'), [i18n]);

  const input = useRef(null);
  // stored files; reassigned locally on add/delete, refreshed when the prop changes
  const [rawData, setRawData] = useWritableProp(data ?? []);
  // in-flight and failed uploads; local-only, never part of the editor value
  const [uploads, setUploads] = useState([]);
  const list = useMemo(() => [...rawData, ...uploads], [rawData, uploads]);

  function selectFiles(ev) {
    const files = Array.from(ev.target.files ?? []);
    files.forEach(addFile);
    if (input.current) input.current.value = '';
  }

  function addFile(file) {
    const obj = {
      id: uid(),
      name: file.name,
      size: file.size,
      status: 'client',
      file,
    };
    setUploads((prev) => (multiple ? [...prev, obj] : [obj]));
    upload(obj);
  }

  function defaultUploader(obj) {
    const body = new FormData();
    body.append('upload', obj.file);
    return fetch(uploadURL, { method: 'POST', body }).then((res) => res.json());
  }

  async function upload(obj) {
    try {
      const res =
        typeof uploadURL === 'function'
          ? await uploadURL(obj)
          : await defaultUploader(obj);
      if (!res || res.status === 'error') fail(obj.id);
      else commit(obj, res);
    } catch {
      fail(obj.id);
    }
  }

  function fail(id) {
    setUploads((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: 'error' } : u)),
    );
  }

  function commit(obj, res) {
    // stored object holds metadata only; server response (with permanent id) wins
    const stored = { ...obj, ...res };
    delete stored.file;
    delete stored.status;

    setUploads((prev) => prev.filter((u) => u.id !== obj.id));
    const value = multiple ? [...rawData, stored] : [stored];
    setRawData(value);
    onChange && onChange({ value, action: 'add', file: stored });
    onAction && onAction({ action: 'add-file', file: stored, value });
  }

  function remove(item) {
    if (uploads.some((u) => u.id === item.id)) {
      // pending or failed upload - never entered the value, no events
      setUploads((prev) => prev.filter((u) => u.id !== item.id));
      return;
    }
    const value = rawData.filter((f) => f.id !== item.id);
    setRawData(value);
    onChange && onChange({ value, action: 'delete', file: item });
    onAction && onAction({ action: 'delete-file', file: item, value });
  }

  return (
    <div className="wx-aaeLPti4 wx-files">
      {list.length ? (
        <ul className="wx-aaeLPti4 wx-list">
          {list.map((f) => (
            <li
              key={f.id}
              className={
                'wx-aaeLPti4 wx-file' +
                (f.status === 'client' ? ' wx-uploading' : '') +
                (f.status === 'error' ? ' wx-failed' : '')
              }
            >
              <i className="wx-aaeLPti4 wxi-file wx-file-icon"></i>
              {f.url ? (
                <a
                  className="wx-aaeLPti4 wx-name"
                  href={f.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {f.name}
                </a>
              ) : (
                <span className="wx-aaeLPti4 wx-name">{f.name}</span>
              )}
              {f.status === 'client' ? (
                <span className="wx-aaeLPti4 wx-status">
                  {_('Uploading...')}
                </span>
              ) : f.status === 'error' ? (
                <span className="wx-aaeLPti4 wx-status wx-error">
                  {_('Upload failed')}
                </span>
              ) : null}
              {!readonly ? (
                <button
                  type="button"
                  className="wx-aaeLPti4 wx-remove"
                  title={_('Delete file')}
                  onClick={() => remove(f)}
                >
                  <i className="wx-aaeLPti4 wxi-delete-outline"></i>
                </button>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
      {!readonly ? (
        <>
          <input
            type="file"
            className="wx-aaeLPti4 wx-input"
            ref={input}
            onChange={selectFiles}
            accept={accept}
            multiple={multiple}
            disabled={disabled}
          />
          <Button
            icon="wxi-plus"
            disabled={disabled}
            onClick={() => input.current && input.current.click()}
          >
            {_('Add file')}
          </Button>
        </>
      ) : null}
    </div>
  );
}
