/* global codemirror */
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { context } from '@svar-ui/react-core';
import { uid } from '@svar-ui/lib-dom';
import { loadJS } from './loader.js';
import './CodeMirror.css';

export default function CodeMirror(props) {
  const {
    language = 'javascript',
    value,
    onChange,
    theme = '',
    focus = false,
    readonly = false,
  } = props;

  const tempID = useMemo(() => `cm-${uid()}`, []);

  const wxSkin = useContext(context.theme);
  // `context.theme` always resolves ("willow" by default), so unlike Svelte we
  // cannot tell "no provider" from an explicit light theme - check the body
  // class as well, which is what a themeless app sets
  const detectTheme = () => {
    if (
      wxSkin === 'willow-dark' ||
      (typeof document !== 'undefined' &&
        document.body.classList.contains('wx-willow-dark-theme'))
    )
      return 'dark';
    return 'light';
  };

  const [editor, setEditor] = useState(null);
  const editorRef = useRef(null);
  const lastValue = useRef('');
  // keep the latest onChange so the long-lived CodeMirror callback never
  // closes over a stale render
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    let disposed = false;
    loadJS('https://cdn.svar.dev/libs/custom/codemirror6/cm.js?v=4').then(
      () => {
        if (disposed || editorRef.current) return;

        const instance = codemirror.create(`#${tempID}`, {
          value: '',
          theme: theme || detectTheme(),
          language,
          lineNumbers: false,
          readOnly: readonly,
          onChange: (v) => {
            lastValue.current = v;
            onChangeRef.current &&
              onChangeRef.current({ value: instance.getValue() });
          },
        });
        editorRef.current = instance;
        setEditor(instance);
      },
    );

    return () => {
      disposed = true;
    };
  }, []);

  useEffect(() => {
    if (editor) {
      editor.setLanguage(language);
    }
  }, [editor, language]);

  useEffect(() => {
    if (editor && value !== lastValue.current) {
      editor.setValue(value, { resetHistory: true });
      if (focus) editor.focus();
      lastValue.current = value;
    }
  }, [editor, value, focus]);

  return <div className="wx-aaamfxKx wx-codemirror" id={tempID}></div>;
}
