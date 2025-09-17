import { useMemo, useState, useCallback } from 'react';
import { getData } from '../data';
import { Editor } from '../../src';
import './CustomButtons.css';

export default function CustomButtons() {
  const { items, values } = useMemo(() => getData(), []);
  const [message, setMessage] = useState('');

  const handleClick = useCallback(({ item }) => {
    setMessage('click: ' + item.id);
  }, []);

  return (
    <>
      <div className="wx-7Ed2jd0w message">{message}</div>
      <div className="wx-7Ed2jd0w variations">
        <div>
          <h3>None</h3>
          <div className="wx-7Ed2jd0w bg">
            <Editor topBar={false} items={items} values={values} />
          </div>
        </div>
        <div>
          <h3>Top Bar</h3>
          <div className="wx-7Ed2jd0w bg">
            <Editor items={items} values={values} onAction={handleClick} />
          </div>
        </div>
        <div>
          <h3>Top Bar, Right</h3>
          <div className="wx-7Ed2jd0w bg">
            <Editor
              topBar={{
                items: [
                  { comp: 'spacer' },
                  { comp: 'button', text: 'Save', id: 'save' },
                ],
              }}
              items={items}
              values={values}
              onAction={handleClick}
            />
          </div>
        </div>
        <div>
          <h3>Top Bar, Left</h3>
          <div className="wx-7Ed2jd0w bg">
            <Editor
              topBar={{
                items: [
                  {
                    comp: 'button',
                    type: 'primary',
                    text: 'Save',
                    id: 'save',
                  },
                ],
              }}
              items={items}
              values={values}
              onAction={handleClick}
            />
          </div>
        </div>
        <div>
          <h3>Top Bar, Mixed</h3>
          <div className="wx-7Ed2jd0w bg">
            <Editor
              topBar={{
                items: [
                  {
                    comp: 'button',
                    type: 'primary',
                    text: 'Save',
                    id: 'save',
                  },
                  { comp: 'spacer' },
                  { comp: 'icon', icon: 'wxi-refresh', id: 'refresh' },
                  { comp: 'icon', icon: 'wxi-delete', id: 'delete' },
                ],
              }}
              items={items}
              values={values}
              onAction={handleClick}
            />
          </div>
        </div>
        <div>
          <h3>Bottom Bar</h3>
          <div className="wx-7Ed2jd0w bg">
            <Editor
              bottomBar={{
                items: [
                  {
                    comp: 'button',
                    type: 'primary',
                    text: 'Save',
                    id: 'save',
                  },
                  { comp: 'button', text: 'Cancel', id: 'cancel' },
                ],
              }}
              items={items}
              values={values}
              onAction={handleClick}
            />
          </div>
        </div>
      </div>
    </>
  );
}
