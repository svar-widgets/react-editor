import { useMemo, useState } from 'react';
import { getData } from '../data';
import { Editor } from '../../src';
import { Segmented, Tabs as TabsControl } from '@svar-ui/react-core';
import { registerToolbarItem, Toolbar } from '@svar-ui/react-toolbar';
import './Tabs.css';

registerToolbarItem('segmented', Segmented);

export default function Tabs() {
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

  return (
    <div className="wx-aadyvhcG variations">
      <div className="wx-aadyvhcG bg-top">
        <h3 className="wx-aadyvhcG">Segmented</h3>
        <Editor
          topBar={false}
          items={batchItems}
          values={values}
          activeBatch={activeBatch}
        >
          <div className="wx-aadyvhcG top" style={{ marginLeft: 20 }}>
            <Segmented
              options={options}
              value={activeBatch}
              onChange={({ value }) => setActiveBatch(value)}
            />
          </div>
        </Editor>
      </div>
      <div className="wx-aadyvhcG bg-top">
        <h3 className="wx-aadyvhcG">Tabbar</h3>
        <div className="wx-aadyvhcG bg" style={{ height: 400 }}>
          <Editor
            topBar={false}
            items={batchItems}
            values={values}
            activeBatch={activeBatch}
          >
            <div className="wx-aadyvhcG top">
              <TabsControl
                options={options}
                value={activeBatch}
                onChange={({ value }) => setActiveBatch(value)}
              />
            </div>
          </Editor>
        </div>
      </div>
      <div className="wx-aadyvhcG bg-top">
        <h3 className="wx-aadyvhcG">Toolbar</h3>
        <Editor
          items={batchItems}
          values={values}
          activeBatch={activeBatch}
          topBar={false}
        >
          <Toolbar
            values={toolbarValues}
            items={[
              { comp: 'icon', icon: 'wxi-refresh' },
              { comp: 'spacer' },
              { key: 'batch', comp: 'segmented', options },
            ]}
            onChange={({ value, item }) => {
              if (item.key === 'batch') setActiveBatch(value);
            }}
          />
        </Editor>
      </div>
    </div>
  );
}
