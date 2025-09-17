import { useMemo } from 'react';
import { getData, sectionItems, onlySectionItems } from '../data';
import { Editor, registerEditorItem } from '../../src';

import { Comments } from '@svar-ui/react-comments';
import { Tasklist } from '@svar-ui/react-tasklist';

import './SubPanels.css';

registerEditorItem('comments', Comments);
registerEditorItem('tasks', Tasklist);

export default function SubPanels() {
  const values = useMemo(() => {
    const { values } = getData();
    return values;
  }, []);

  const items1 = useMemo(() => sectionItems(), []);
  const items2 = useMemo(() => sectionItems({ sectionMode: 'exclusive' }), []);
  const items3 = useMemo(() => onlySectionItems(), []);
  const items4 = useMemo(
    () => onlySectionItems({ sectionMode: 'accordion' }),
    [],
  );

  return (
    <div className="wx-GNsBw05P variations">
      <div className="wx-GNsBw05P bg-top">
        <h3>Normal sections</h3>
        <Editor items={items1} values={values} topBar={false} />
      </div>
      <div className="wx-GNsBw05P bg-top">
        <h3>Exclusive mode</h3>
        <Editor items={items2} values={values} topBar={false} />
      </div>
      <div className="wx-GNsBw05P bg">
        <h3>Normal sections</h3>
        <Editor items={items3} values={values} topBar={false} />
      </div>
      <div className="wx-GNsBw05P bg">
        <h3>Accordion mode</h3>
        <Editor items={items4} values={values} topBar={false} />
      </div>
    </div>
  );
}
