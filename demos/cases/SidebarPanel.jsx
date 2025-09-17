import { useState, useMemo } from 'react';
import { getData } from '../data';
import { Editor } from '/src/';
import { Button } from '@svar-ui/react-core';
import './SidebarPanel.css';

function SidebarPanel() {
  const { items, values } = useMemo(() => getData(), []);

  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(true);

  function handleClick({ item }) {
    setMessage('click: ' + item.id);
    setVisible(false);
  }

  const [placement, setPlacement] = useState('sidebar');
  const [autoSave, setAutoSave] = useState(false);
  const [readonly, setReadonly] = useState(false);

  return (
    <>
      <div className="wx-bFrHPSUe message">{message}</div>

      <div className="wx-bFrHPSUe toolbar">
        <div className="wx-bFrHPSUe item">
          <Button
            type="primary"
            text="Open editor: Manual save"
            onClick={() => {
              setPlacement('sidebar');
              setAutoSave(false);
              setReadonly(false);

              setVisible(true);
            }}
          />
        </div>
        <div className="wx-bFrHPSUe item">
          <Button
            type=""
            text="Open editor: Auto-save"
            onClick={() => {
              setPlacement('sidebar');
              setAutoSave(true);
              setReadonly(false);

              setVisible(true);
            }}
          />
        </div>
        <div className="wx-bFrHPSUe item">
          <Button
            type=""
            text="Open editor: Readonly"
            onClick={() => {
              setPlacement('sidebar');
              setReadonly(true);

              setVisible(true);
            }}
          />
        </div>
      </div>

      {visible ? (
        <Editor
          placement={placement}
          autoSave={autoSave}
          readonly={readonly}
          items={items}
          values={values}
          onAction={handleClick}
        />
      ) : null}
    </>
  );
}

export default SidebarPanel;
