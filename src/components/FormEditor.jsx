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
      editors.config[0].comp === 'readonly' &&
      editors.config.every((editor) => !Object.keys(data).includes(editor.key)),
    [editors, data],
  );

  return (
    <div className={'wx-s2aE1xdZ wx-sections ' + css} ref={root}>
      {children}
      {overlay ? (
        <div className="wx-s2aE1xdZ wx-overlay">{_('No data')}</div>
      ) : null}
      {editors.config.map((editor) => {
        if (!editor.hidden) {
          const { key, onChange: onChangeEditor, ...otherProps } = editor;
          if (editor.comp === 'readonly' || editor.comp === 'section') {
            const Component = getItemHandler(editor.comp);
            return (
              <Component
                key={key}
                fieldKey={key}
                label={editor.label}
                value={data[key]}
                {...otherProps}
                onClick={onClick}
              />
            );
          } else {
            const Component2 = getItemHandler(editor.comp);
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
                  {({ id }) => (
                    <Component2
                      key={key}
                      fieldKey={key}
                      {...otherProps}
                      onChange={
                        onChangeEditor ||
                        ((ev) => {
                          onChange &&
                            onChange({
                              value: ev.value,
                              key,
                              input: ev.input,
                            });
                        })
                      }
                      id={id}
                      label={undefined}
                      error={errors && errors[key]}
                      value={data[key]}
                    />
                  )}
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
