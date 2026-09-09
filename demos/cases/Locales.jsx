import { useEffect, useMemo, useState } from 'react';
import { Locale, Segmented } from '@svar-ui/react-core';
import { Editor } from '../../src';

import { de, cn, en } from '@svar-ui/editor-locales';
import {
  de as deCore,
  cn as cnCore,
  en as enCore,
  es as esCore,
  fr as frCore,
  it as itCore,
  ja as jaCore,
  pt as ptCore,
  ru as ruCore,
} from '@svar-ui/core-locales';

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

const vcb = {
  en: {},
  de: {
    'Is Admin': 'Ist Admin',
    'Is Guest': 'Ist Gast',
    'First name': 'Vorname',
    'Last name': 'Nachname',
    Description: 'Beschreibung',
  },
  cn: {
    'Is Admin': '是管理员',
    'Is Guest': '是访客',
    'First name': '名字',
    'Last name': '姓氏',
    Description: '描述',
  },
  es: {
    'Is Admin': 'Es administrador',
    'Is Guest': 'Es invitado',
    'First name': 'Nombre',
    'Last name': 'Apellido',
    Description: 'Descripción',
  },
  fr: {
    'Is Admin': 'Est administrateur',
    'Is Guest': 'Est invité',
    'First name': 'Prénom',
    'Last name': 'Nom',
    Description: 'Description',
  },
  it: {
    'Is Admin': 'È amministratore',
    'Is Guest': 'È ospite',
    'First name': 'Nome',
    'Last name': 'Cognome',
    Description: 'Descrizione',
  },
  jp: {
    'Is Admin': '管理者です',
    'Is Guest': 'ゲストです',
    'First name': '名',
    'Last name': '姓',
    Description: '説明',
  },
  pt: {
    'Is Admin': 'É administrador',
    'Is Guest': 'É convidado',
    'First name': 'Nome',
    'Last name': 'Sobrenome',
    Description: 'Descrição',
  },
  ru: {
    'Is Admin': 'Администратор',
    'Is Guest': 'Гость',
    'First name': 'Имя',
    'Last name': 'Фамилия',
    Description: 'Описание',
  },
};

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
  { id: 'es', label: 'ES' },
  { id: 'fr', label: 'FR' },
  { id: 'it', label: 'IT' },
  { id: 'jp', label: 'JP' },
  { id: 'pt', label: 'PT' },
  { id: 'ru', label: 'RU' },
];

// @svar/editor-locales currently ships en/cn/de only; the other languages get
// core terms translated and fall back to English for the editor's own strings
function getWords(lang) {
  if (lang === 'en') return { ...enCore, ...en };
  if (lang === 'cn') return { ...cnCore, ...cn };
  if (lang === 'de') return { ...deCore, ...de };
  if (lang === 'es') return { ...esCore };
  if (lang === 'fr') return { ...frCore };
  if (lang === 'it') return { ...itCore };
  if (lang === 'jp') return { ...jaCore };
  if (lang === 'pt') return { ...ptCore };
  if (lang === 'ru') return { ...ruCore };
}

export default function Locales() {
  const [lang, setLang] = useState('de');

  const translated = useMemo(
    () =>
      items.map((item) => ({
        ...item,
        label: vcb[lang][item.label] || item.label,
      })),
    [lang],
  );

  // clear the first field so the localized validation message shows up
  useEffect(() => {
    const timer = setTimeout(() => {
      const input = document.querySelector('.wx-editor .wx-text input');
      if (!input) return;

      // bypass React's value tracker, otherwise the synthetic input
      // event is swallowed as a no-op change
      const setter = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        'value',
      ).set;
      setter.call(input, '');
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }, 500);
    return () => clearTimeout(timer);
  }, [lang]);

  return (
    <>
      <div className="wx-IHfdE6Tv toolbar">
        <Segmented
          options={langs}
          value={lang}
          onChange={({ value }) => setLang(value)}
        />
      </div>
      <div style={{ margin: 'auto', maxWidth: '700px', marginTop: '40px' }}>
        <Locale key={lang} words={getWords(lang)}>
          <Editor
            values={values}
            autoSave={true}
            placement="sidebar"
            items={translated}
          />
        </Locale>
      </div>
    </>
  );
}
