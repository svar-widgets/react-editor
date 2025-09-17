import { useEffect, useMemo, useState } from 'react';
import { getData } from '../data';
import { Editor } from '../../src';
import { Segmented, Tabs } from '@svar-ui/react-core';
import { registerToolbarItem, Toolbar } from '@svar-ui/react-toolbar';
import './Batches.css';

export default function Batches() {
  const { batchItems, values } = useMemo(() => getData(), []);

  const options = useMemo(
    () => [
      {
        id: 'main',
        label: 'Personal',
      },
      {
        id: 'cfg',
        label: 'Settings',
      },
    ],
    [],
  );

  const [activeBatch, setActiveBatch] = useState('main');
  const toolbarValues = useMemo(() => ({ batch: activeBatch }), [activeBatch]);

  useEffect(() => {
    registerToolbarItem('segmented', Segmented);
  }, []);

  return (
    <div className="wx-qgutpcQy variations">
      <div>
        <h3>Segmented</h3>
        <div className="wx-qgutpcQy bg">
          <Editor
            topBar={[]}
            items={batchItems}
            values={values}
            activeBatch={activeBatch}
          >
            <div className="wx-qgutpcQy top" style={{ marginLeft: 20 }}>
              <Segmented
                options={options}
                value={activeBatch}
                onChange={({ value }) => setActiveBatch(value)}
              />
            </div>
          </Editor>
        </div>
      </div>
      <div>
        <h3>Tabbar</h3>
        <div className="wx-qgutpcQy bg">
          <Editor
            topBar={[]}
            items={batchItems}
            values={values}
            activeBatch={activeBatch}
          >
            <div className="wx-qgutpcQy top">
              <Tabs
                options={options}
                value={activeBatch}
                onChange={({ value }) => setActiveBatch(value)}
              />
            </div>
          </Editor>
        </div>
      </div>
      <div>
        <h3>Toolbar</h3>
        <div className="wx-qgutpcQy bg">
          <Editor
            items={batchItems}
            values={values}
            activeBatch={activeBatch}
            topBar={[]}
          >
            <Toolbar
              values={toolbarValues}
              items={[
                { comp: 'icon', icon: 'wxi-refresh' },
                { comp: 'spacer' },
                { key: 'batch', comp: Segmented, options },
              ]}
              onChange={({ value, item }) => {
                if (item.key === 'batch') setActiveBatch(value);
              }}
            />
          </Editor>
        </div>
      </div>
    </div>
  );
}
