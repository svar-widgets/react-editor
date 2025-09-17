import { useState } from 'react';
import { Locale, Segmented, Button } from '@svar-ui/react-core';
import { Editor } from '../../src/index';

import { de, cn, en } from '@svar-ui/editor-locales';
import { de as deCore, cn as cnCore, en as enCore } from '@svar-ui/core-locales';

import './Locales.css';

const items = [
  {
    comp: 'text',
    key: 'firstName',
    label: 'First name',
    required: true,
  },
  {
    comp: 'text',
    key: 'lastName',
    label: 'Last name',
    required: true,
  },
  { comp: 'checkbox', key: 'admin', label: 'Is Admin' },
  { comp: 'checkbox', key: 'guest', label: 'Is Guest' },
  { comp: 'textarea', key: 'description', label: 'Description' },
];

const values = {
  firstName: 'John',
  lastName: 'Doe',
  admin: false,
  guest: true,
};

const langs = [
  { id: 'en', label: 'EN' },
  { id: 'de', label: 'DE' },
  { id: 'cn', label: 'CN' },
];

function getWords(lang) {
  if (lang === 'en') return { ...enCore, ...en };
  if (lang === 'cn') return { ...cnCore, ...cn };
  if (lang === 'de') return { ...deCore, ...de };
}

export default function Locales() {
  const [lang, setLang] = useState('en');
  const [readonly, setReadonly] = useState();
  const [visible, setVisible] = useState();

  function handleClick() {
    setVisible(false);
  }

  return (
    <>
      <div className="wx-IHfdE6Tv toolbar">
        <Segmented
          options={langs}
          value={lang}
          onChange={({ value }) => setLang(value)}
        />
        <Button
          css="item"
          type="primary"
          text="Open sidebar: Manual save"
          onClick={() => {
            setReadonly(false);
            setVisible(true);
          }}
        />
        <Button
          css="item"
          type="secondary"
          text="Open sidebar: Readonly"
          onClick={() => {
            setReadonly(true);
            setVisible(true);
          }}
        />
      </div>
      <div style={{ margin: 'auto', maxWidth: '700px', marginTop: '40px' }}>
        <Locale key={lang} words={getWords(lang)}>
          <Editor items={items} values={values} topBar={false} />
          {visible ? (
            <Editor
              placement="sidebar"
              readonly={readonly}
              items={items}
              values={values}
              onAction={handleClick}
            />
          ) : null}
        </Locale>
      </div>
    </>
  );
}
