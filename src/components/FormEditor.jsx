import { useEffect, useMemo, useRef, useContext } from 'react';
import { Field } from '@svar-ui/react-core';
import { context } from '@svar-ui/react-core';
import { getItemHandler } from '../helpers';
import './FormEditor.css';

export default function FormEditor(props) {
  const {
    editors,
    data,
    css = '',
    errors,
    focus = false,
    readonly = false,
    onClick,
    children,
    onChange,
  } = props;

  const root = useRef(null);

  useEffect(() => {
    if (focus) {
      const focused = document.activeElement;
      if (focused && root.current && root.current.contains(focused)) return;

      const input = root.current
        ? root.current.querySelector(
            'input:not([disabled]), textarea:not([disabled]), select:not([disabled])',
          )
        : null;

      if (input) {
        setTimeout(() => {
          if (typeof input.select === 'function') {
            input.select();
          }
          if (typeof input.focus === 'function') {
            input.focus();
          }
        }, 300);
      }
    }
  }, []);

  const i18n = useContext(context.i18n);
  const _ = useMemo(() => i18n.getGroup('editor'), [i18n]);

  const overlay = useMemo(
    () =>
      readonly &&
      editors.config.every(
        (editor) =>
          !(editor.keys || [editor.key]).some((k) => data && k in data),
      ),
    [editors, data, readonly],
  );

  const isSingle = useMemo(
    () => editors.config.length === 1 && editors.config[0].fill,
    [editors],
  );

  const makeChangeHandler = (key) => (ev) => {
    onChange &&
      onChange({
        value: ev.value,
        key,
        input: ev.input,
      });
  };

  const rootClass =
    'wx-s2aE1xdZ wx-sections ' + css + (isSingle ? ' wx-sections-single' : '');

  return (
    <div className={rootClass} ref={root}>
      {children}
      {overlay ? (
        <div className="wx-s2aE1xdZ wx-overlay">{_('No data')}</div>
      ) : null}
      {editors.config.map((editor) => {
        if (!editor.hidden) {
          const { key, onChange: onChangeEditor, ...otherProps } = editor;
          if (
            editor.comp === 'readonly' ||
            editor.comp === 'section' ||
            isSingle
          ) {
            const Component = getItemHandler(editor.comp, { readonly });
            return (
              <Component
                key={key}
                fieldKey={key}
                onChange={onChangeEditor || makeChangeHandler(key)}
                label={editor.label}
                value={data[key]}
                readonly={readonly}
                error={errors && errors[key]}
                {...otherProps}
                onClick={onClick}
              />
            );
          } else {
            const Component2 = getItemHandler(editor.comp, { readonly });
            return (
              <div key={key}>
                <Field
                  label={
                    editor.labelTemplate
                      ? editor.labelTemplate(data[key])
                      : (editor.label ?? '')
                  }
                  required={editor.required}
                >
                  <Component2
                    key={key}
                    fieldKey={key}
                    {...otherProps}
                    onChange={onChangeEditor || makeChangeHandler(key)}
                    readonly={readonly}
                    label={undefined}
                    error={errors && errors[key]}
                    value={data[key]}
                  />
                </Field>
                {errors && errors[key] && editor.validationMessage ? (
                  <div className="wx-s2aE1xdZ wx-message">
                    {editor.validationMessage}
                  </div>
                ) : null}
              </div>
            );
          }
        }
        return null;
      })}
    </div>
  );
}
