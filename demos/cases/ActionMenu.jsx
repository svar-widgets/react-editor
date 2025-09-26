import { useMemo, useState } from 'react';
import { getData } from '../data';
import { Editor } from '../../src';
import './ActionMenu.css';

export default function ActionMenu() {
  const { items, values } = useMemo(() => getData(), []);
  const [message, setMessage] = useState('');

  function buttonClick(e) {
    setMessage('button: ' + e.id);
  }

  return (
    <>
      <div className="wx-rFV3gN4Y message">{message}</div>
      <div className="wx-rFV3gN4Y variations">
        <div>
          <h3>Top Bar, Right</h3>
          <div className="wx-rFV3gN4Y bg">
            <Editor
              topBar={{
                items: [
                  {
                    comp: 'label',
                    spacer: true,
                    text: 'Item X12-A',
                  },
                  { comp: 'separator' },
                  {
                    icon: 'wxi-dots-v',
                    collapsed: true,
                    layout: 'column',
                    items: [
                      {
                        id: 'done',
                        comp: 'item',
                        text: 'Mark as done',
                        handler: buttonClick,
                      },
                      {
                        id: 'delete',
                        comp: 'button',
                        type: 'danger',
                        text: 'Delete the item',
                        handler: buttonClick,
                      },
                    ],
                  },
                ],
              }}
              items={items}
              values={values}
            />
          </div>
        </div>
      </div>
    </>
  );
}
