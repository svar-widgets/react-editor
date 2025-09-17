import { registerEditorItem } from './helpers';
import Form from './components/Form.jsx';
import Editor from './components/Editor.jsx';

import Material from './themes/Material.jsx';
import Willow from './themes/Willow.jsx';
import WillowDark from './themes/WillowDark.jsx';

import ReadOnly from './components/sections/ReadOnly.jsx';
import Section from './components/sections/Section.jsx';
import { Text } from '@svar-ui/react-core';
import { TextArea } from '@svar-ui/react-core';
import { Checkbox } from '@svar-ui/react-core';

registerEditorItem('text', Text);
registerEditorItem('textarea', TextArea);
registerEditorItem('checkbox', Checkbox);

registerEditorItem('readonly', ReadOnly);
registerEditorItem('section', Section);

import { env, setEnv } from '@svar-ui/lib-dom';
setEnv(env);

export { registerEditorItem, Form, Editor, Material, Willow, WillowDark };
