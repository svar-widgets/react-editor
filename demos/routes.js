import BasicInit from './cases/BasicInit.jsx';
import ModalPanel from './cases/ModalPanel.jsx';
import ModalColumns from './cases/ModalColumns.jsx';
import SidebarPanel from './cases/SidebarPanel.jsx';
import Batches from './cases/Batches.jsx';
import SubPanels from './cases/SubPanels.jsx';
import ChangesAuto from './cases/ChangesAuto.jsx';
import ChangesConfirmed from './cases/ChangesConfirmed.jsx';
import CustomButtons from './cases/CustomButtons.jsx';
import ActionMenu from './cases/ActionMenu.jsx';
import ToolbarValues from './cases/ToolbarValues.jsx';
import Tasklist from './cases/Tasklist.jsx';
import Comments from './cases/Comments.jsx';
import Layouts from './cases/Layouts.jsx';
import BackendComplex from './cases/BackendComplex.jsx';
import MultipleCombos from './cases/MultipleCombos.jsx';
import Overflow from './cases/Overflow.jsx';
import SaveValidatedValues from './cases/SaveValidatedValues.jsx';
import Validation from './cases/Validation.jsx';
import RequiredFields from './cases/RequiredFields.jsx';
import Locales from './cases/Locales.jsx';
import Overlay from './cases/Overlay.jsx';
// import Gantt from "./cases/Gantt.jsx";
// import Kanban from "./cases/Kanban.jsx";
// import Scheduler from "./cases/Scheduler.jsx";

export const links = [
  ['/base/:skin', 'Basic Form', BasicInit, 'BasicInit'],
  ['/modal/:skin', 'Modal Editor', ModalPanel, 'ModalPanel'],
  ['/columns/:skin', 'Modal Editor with columns', ModalColumns, 'ModalColumns'],
  ['/sidebar/:skin', 'Sidebar Editor', SidebarPanel, 'SidebarPanel'],
  ['/changes-auto/:skin', 'Changes: auto mode', ChangesAuto, 'ChangesAuto'],
  [
    '/changes-confirmed/:skin',
    'Changes: confirmation',
    ChangesConfirmed,
    'ChangesConfirmed',
  ],
  ['/batches/:skin', 'Batches', Batches, 'Batches'],
  ['/subpanels/:skin', 'Sub panels', SubPanels, 'SubPanels'],
  ['/actions/:skin', 'Action menu', ActionMenu, 'ActionMenu'],
  ['/buttons/:skin', 'Custom buttons', CustomButtons, 'CustomButtons'],
  ['/comments/:skin', 'Comments', Comments, 'Comments'],
  ['/taslkist/:skin', 'Tasklist', Tasklist, 'Tasklist'],
  ['/layouts/:skin', 'Layouts', Layouts, 'Layouts'],
  [
    '/backend-complex/:skin',
    'Separate backends',
    BackendComplex,
    'BackendComplex',
  ],
  ['/combos/:skin', 'Multiple combos', MultipleCombos, 'MultipleCombos'],
  ['/overflow/:skin', 'Overflow', Overflow, 'Overflow'],
  ['/toolbar/:skin', 'Toolbar values', ToolbarValues, 'ToolbarValues'],
  ['/required/:skin', 'Required fields', RequiredFields, 'RequiredFields'],
  ['/validation/:skin', 'Validation', Validation, 'Validation'],
  [
    '/validation-save/:skin',
    'Save validated values',
    SaveValidatedValues,
    'SaveValidatedValues',
  ],
  ['/locales/:skin', 'Locales', Locales, 'Locales'],
  ['/overlay/:skin', 'Overlay', Overlay],
  // ["/gantt/:skin", "Gantt", Gantt, "Gantt"],
  // ["/kanban/:skin", "Kanban", Kanban, "Kanban"],
  // ["/scheduler/:skin", "Scheduler", Scheduler, "Scheduler"],
];
