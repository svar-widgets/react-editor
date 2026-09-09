/* global tinymce */
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { context } from '@svar-ui/react-core';
import { uid } from '@svar-ui/lib-dom';
import { loadJS } from './loader.js';
import './TinyMCE.css';

export default function TinyMCE(props) {
  const {
    licenseKey = 'gpl',
    value,
    onChange,
    focus = false,
    toolbar = 'undo redo | bold italic',
    skin = '',
  } = props;

  const tempID = useMemo(() => `tinymce-${uid()}`, []);

  const wxSkin = useContext(context.theme);
  // `context.theme` always resolves ("willow" by default), so unlike Svelte we
  // cannot tell "no provider" from an explicit light theme - check the body
  // class as well, which is what a themeless app sets
  const detectSkin = () => {
    if (
      wxSkin === 'willow-dark' ||
      (typeof document !== 'undefined' &&
        document.body.classList.contains('wx-willow-dark-theme'))
    )
      return 'oxide-dark';
    return 'oxide';
  };

  const [editor, setEditor] = useState(null);
  const editorRef = useRef(null);
  const lastValue = useRef('');
  // keep the latest onChange so the long-lived TinyMCE listener never closes
  // over a stale render
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    let disposed = false;
    const resolvedSkin = skin || detectSkin();

    loadJS(
      'https://cdnjs.cloudflare.com/ajax/libs/tinymce/8.5.1/tinymce.min.js',
    ).then(() => {
      if (disposed || editorRef.current) return;

      tinymce.init({
        selector: `#${tempID}`,
        toolbar,
        menubar: false,
        skin: resolvedSkin,
        content_css: resolvedSkin === 'oxide-dark' ? 'dark' : undefined,
        license_key: licenseKey,
        statusbar: false,
        init_instance_callback: (v) => {
          if (disposed) return;
          editorRef.current = v;
          setEditor(v);
          v.on('change', () => {
            onChangeRef.current &&
              onChangeRef.current({ value: v.getContent() });
            lastValue.current = v.getContent();
          });
        },
      });
    });

    return () => {
      disposed = true;
      if (editorRef.current && resolvedSkin === 'oxide-dark') {
        tinymce.DOM.styleSheetLoader.unload(
          `${tinymce.baseURL}/skins/ui/oxide-dark/skin.min.css`,
        );
      }
      // NB: not calling editor.destroy() on purpose - TinyMCE's teardown
      // triggers handlers (e.g. blur) against an already-removed instance
      // and throws. The DOM node is gone with the component, so the JS
      // instance is left to the garbage collector.
      editorRef.current = null;
      setEditor(null);
    };
  }, []);

  useEffect(() => {
    if (editor && value !== lastValue.current) {
      editor.setContent(value);
      editor.undoManager.clear();
      if (focus) editor.focus();
      lastValue.current = value;
    }
  }, [editor, value, focus]);

  return (
    <div className="wx-aady1hHu wx-tinymce">
      <textarea className="wx-aady1hHu" id={tempID}></textarea>
    </div>
  );
}
