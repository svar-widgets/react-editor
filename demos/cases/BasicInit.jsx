import { useMemo } from 'react';
import { getData } from '../data';
import { Editor } from '../../src';
import './BasicInit.css';

function BasicInit() {
  const { items, values } = useMemo(() => getData(), []);

  return (
    <div className="wx-rHquWPuW variations">
      <div>
        <h3>Normal</h3>
        <div className="wx-rHquWPuW bg">
          <Editor items={items} values={values} topBar={false} />
        </div>
      </div>
      <div>
        <h3>Readonly</h3>
        <div className="wx-rHquWPuW bg">
          <Editor
            items={items}
            values={values}
            readonly={true}
            topBar={false}
          />
        </div>
      </div>
    </div>
  );
}

export default BasicInit;
