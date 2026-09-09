import Inline from './cases/Inline.jsx';
import BasicInit from './cases/BasicInit.jsx';
import Modal from './cases/Modal.jsx';
import Sidebar from './cases/Sidebar.jsx';
import Tabs from './cases/Tabs.jsx';
import Sections from './cases/Sections.jsx';
import Buttons from './cases/Buttons.jsx';
import Tasklist from './cases/Tasklist.jsx';
import Comments from './cases/Comments.jsx';
import MultipleCombos from './cases/MultipleCombos.jsx';
import Fullscreen from './cases/Fullscreen.jsx';
import Validation from './cases/Validation.jsx';
import Locales from './cases/Locales.jsx';
import MultiField from './cases/MultiField.jsx';
import Uploads from './cases/Uploads.jsx';
import CodeMirror from './cases/CodeMirror.jsx';
import TinyMCE from './cases/TinyMCE.jsx';

export const links = [
  {
    group: '',
    items: [['/base/:skin', 'Basic Editor', BasicInit, { file: 'BasicInit' }]],
  },
  {
    group: 'Layout',
    items: [
      ['/modal/:skin', 'As Modal', Modal, { file: 'Modal' }],
      ['/sidebar/:skin', 'As Sidebar', Sidebar, { file: 'Sidebar' }],
      ['/inline/:skin', 'Inline', Inline, { file: 'Inline' }],
      ['/fullscreen/:skin', 'Fullscreen', Fullscreen, { file: 'Fullscreen' }],
      ['/tabs/:skin', 'With Tabs', Tabs, { file: 'Tabs' }],
      ['/sections/:skin', 'With Sections', Sections, { file: 'Sections' }],
    ],
  },
  {
    group: 'Items',
    items: [
      ['/comments/:skin', 'Comments', Comments, { file: 'Comments' }],
      ['/files/:skin', 'Attachments', Uploads, { file: 'Uploads' }],
      ['/taslkist/:skin', 'Tasklist', Tasklist, { file: 'Tasklist' }],
      [
        '/combos/:skin',
        'Linked lists',
        MultipleCombos,
        { file: 'MultipleCombos' },
      ],
      ['/buttons/:skin', 'Buttons', Buttons, { file: 'Buttons' }],
      [
        '/multifield/:skin',
        'Custom controls',
        MultiField,
        { file: 'MultiField' },
      ],
      ['/tinymce/:skin', 'Rich Text', TinyMCE, { file: 'TinyMCE' }],
      ['/code-mirror/:skin', 'Code Mirror', CodeMirror, { file: 'CodeMirror' }],
    ],
  },
  {
    group: 'Features',
    items: [
      ['/validation/:skin', 'Validation', Validation, { file: 'Validation' }],
      ['/locales/:skin', 'Locales', Locales, { file: 'Locales' }],
    ],
  },
];

export const flatLinks = links.flatMap((g) => g.items);
