import { useState, useEffect, useMemo, useContext } from 'react';
import { itemsToEditors } from '../editor';
import { deepCopy, isSame } from '@svar-ui/lib-state';
import { useWritableProp } from '@svar-ui/lib-react';
import { context } from '@svar-ui/react-core';

export default function Values({
  values: valuesProp,
  items,
  css,
  activeBatch,
  autoSave,
  focus,
  readonly,
  topBar = true,
  bottomBar = true,
  layout = 'default',
  placement = 'inline',
  view: View,
  children,
  onChange,
  onSave,
  onAction,
  onValidation,
}) {
  const i18n = useContext(context.i18n);
  const _ = i18n.getGroup('editor');

  const [values, setValues] = useWritableProp(valuesProp);

  const [activatedSection, setActivatedSection] = useState(null);

  const editors = useMemo(() => {
    const editorsObj = itemsToEditors(items);

    if (activatedSection) {
      editorsObj.config.forEach((x) => {
        if (x.comp === 'section') {
          if (x.key === activatedSection) {
            if (x.sectionMode === 'accordion') {
              if (!x.activeSection) {
                editorsObj.config.forEach((y) => {
                  if (y.comp === 'section' && y.key !== x.key) {
                    y.activeSection = false;
                  }
                });
                x.activeSection = true;
              }
            } else {
              x.activeSection = !x.activeSection;
            }
          }
        }
      });
    }

    let sections = new Set();
    let exclusive = null;

    editorsObj.config.forEach((x) => {
      if (x.sectionMode === 'exclusive' && x.activeSection) exclusive = x.key;
      if (x.activeSection) sections.add(x.key);
    });

    editorsObj.config.forEach((x) => {
      x.hidden =
        x.hidden ||
        (activeBatch && activeBatch !== x.batch) ||
        (exclusive && x.key != exclusive && x.section !== exclusive) ||
        (x.section && !sections.has(x.section));
    });

    if (readonly) {
      return {
        ...editorsObj,
        config: editorsObj.config.map((s) => ({ ...s, comp: 'readonly' })),
        diff: () => [],
      };
    }
    return editorsObj;
  }, [items, activatedSection, activeBatch, readonly]);

  const [actualValues, setActualValues] = useState({});
  const [data, setData] = useState({});

  useEffect(() => {
    if (values !== undefined) {
      setActualValues(deepCopy(values));
      setData(deepCopy(values));
    }
  }, [values]);

  const d = values;

  const [notSaved, setNotSaved] = useState([]);
  useEffect(() => {
    if (values) setNotSaved([]);
  }, [values]);

  function getUniqueFields(arr) {
    return [...new Set(arr)];
  }

  function runValidation(changes) {
    const check = editors.validateValues(actualValues, changes, _);

    if (!isSame(check, d.errors)) {
      onValidation && onValidation({ errors: check, values: actualValues });
    }

    return check;
  }

  function handleUpdate(changes, updateData) {
    if (autoSave && !d.errors) {
      const updated = editors.setValues(values, updateData ?? data, changes);
      // Ensure the writable prop reflects the updated values
      setValues(updated);
      onSave && onSave({ changes, values: updated });
    } else {
      setNotSaved(changes);
    }
  }

  function handleChanges({ value, key, input }) {
    const newData = { ...(data || {}), [key]: value };
    const event = {
      key,
      value,
      update: newData,
    };
    if (input) event.input = input;
    onChange && onChange(event);

    if (!values) return;

    setData(event.update);

    const changes = editors.diff(values, newData);

    const newActualValues = editors.setValues(
      { ...(actualValues || {}) },
      newData,
      getUniqueFields([...changes, key]),
    );
    setActualValues(newActualValues);

    if (changes.length) {
      const fieldsToValidate = autoSave
        ? []
        : getUniqueFields([...changes, ...Object.keys(d.errors ?? {}), key]);
      d.errors = runValidation(fieldsToValidate);
      handleUpdate(changes, newData);
    } else {
      const errorsFields = Object.keys(d.errors ?? {});
      if (errorsFields.length) d.errors = runValidation(errorsFields);
      setNotSaved([]);
    }
  }

  function saveAction() {
    if (!notSaved.length) return;
    if (!autoSave) d.errors = runValidation();
    if (!d.errors) {
      onSave &&
        onSave({
          changes: notSaved,
          values: actualValues,
        });
      const updated = editors.setValues(values, data, notSaved);
      setValues(updated);
      setNotSaved([]);

      setValues({ ...actualValues });
    }
  }

  function handleAction({ item }) {
    if (item.id === 'save') {
      saveAction();
    } else if (item.id === 'toggle-section') {
      setActivatedSection(item.key);
    }
    onAction && onAction({ item, values: actualValues, changes: notSaved });
  }

  return (
    <View
      topBar={topBar}
      bottomBar={bottomBar}
      placement={placement}
      layout={layout}
      readonly={readonly}
      autoSave={autoSave}
      css={css}
      data={data}
      editors={editors}
      focus={focus}
      errors={d.errors}
      onClick={handleAction}
      onKeyDown={handleAction}
      onChange={handleChanges}
    >
      {children}
    </View>
  );
}
