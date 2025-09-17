import { useMemo } from 'react';
import { getData } from '../data';
import { Form, Editor } from '../../src';
import './Overlay.css';

const Overlay = () => {
  const { items } = useMemo(() => getData(), []);

  return (
    <div className="wx-JK8ehX8O variations">
      <div>
        <h3>Overlay</h3>
        <div className="wx-JK8ehX8O bg">
          <Form items={items} readonly={true} />
        </div>
      </div>
      <div>
        <h3>Overlay for columns layout</h3>
        <div className="wx-JK8ehX8O bg">
          <Editor
            items={items}
            values={{ name: 'Alex' }}
            layout="columns"
            readonly={true}
            css="overlay-editor"
          />
        </div>
      </div>
    </div>
  );
};

export default Overlay;
