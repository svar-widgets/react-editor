import { useState, useMemo, useCallback } from 'react';
import { getData } from '../data';
import { Editor } from '/src';
import { Button } from '@svar-ui/react-core';
import './ModalPanel.css';

export default function ModalPanel() {
  const { items, values } = useMemo(() => getData(), []);

  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(true);

  const handleClick = useCallback(({ item }) => {
    setMessage('click: ' + item.id);
    setVisible(false);
  }, []);

  const [placement, setPlacement] = useState('modal');
  const [autoSave, setAutoSave] = useState(false);
  const [readonly, setReadonly] = useState(false);

  return (
    <>
      <div className="wx-Bg6J67fv message">{message}</div>

      <div className="wx-Bg6J67fv toolbar">
        <div className="wx-Bg6J67fv item">
          <Button
            type="primary"
            text="Open editor: Manual save"
            onClick={() => {
              setPlacement('modal');
              setAutoSave(false);
              setReadonly(false);
              setVisible(true);
            }}
          />
        </div>
        <div className="wx-Bg6J67fv item">
          <Button
            type=""
            text="Open editor: Auto-save"
            onClick={() => {
              setPlacement('modal');
              setAutoSave(true);
              setReadonly(false);
              setVisible(true);
            }}
          />
        </div>
        <div className="wx-Bg6J67fv item">
          <Button
            type=""
            text="Open editor: Readonly"
            onClick={() => {
              setPlacement('modal');
              setReadonly(true);
              setVisible(true);
            }}
          />
        </div>
      </div>

      {visible ? (
        <Editor
          placement={placement}
          readonly={readonly}
          autoSave={autoSave}
          items={items}
          values={values}
          onAction={handleClick}
        />
      ) : null}
    </>
  );
}
