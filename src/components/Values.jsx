import { useState, useEffect, useMemo, useRef, useContext } from 'react';
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
  hotkeys,
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
        diff: () => [],
      };
    }
    return editorsObj;
  }, [items, activatedSection, activeBatch, readonly]);

  // multi-field items keep a composite object under the item key,
  // which does not exist in the raw values shape
  const buildData = (raw, config) => {
    const next = deepCopy(raw);
    if (next) {
      config.forEach((ed) => {
        if (ed.keys?.length) next[ed.key] = ed.getter(next);
      });
    }
    return next;
  };

  // Svelte fills these in `$effect.pre`, which runs before children render.
  // React effects run after paint, so seed the state during the first render
  // instead - otherwise items read an empty `data` on mount.
  const [actualValues, setActualValues] = useState(
    () => deepCopy(valuesProp) ?? {},
  );
  const [data, setData] = useState(
    () => buildData(valuesProp, editors.config) ?? {},
  );

  const d = values;

  const firstRun = useRef(true);
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (values !== undefined) {
      const nextActual = deepCopy(values);
      setActualValues(nextActual);
      setData(buildData(values, editors.config));
      if (d.errors) {
        d.errors = runValidation(undefined, nextActual);
      }
    }
  }, [values]);

  const [notSaved, setNotSaved] = useState([]);
  useEffect(() => {
    if (values) setNotSaved([]);
  }, [values]);

  function getUniqueFields(arr) {
    return [...new Set(arr)];
  }

  // `source` defaults to state, but callers that have just computed fresh
  // values must pass them in: Svelte reads the updated `$state` synchronously,
  // while a React setter leaves the render closure holding the old object.
  function runValidation(changes, source = actualValues) {
    const check = editors.validateValues(source, changes, _);

    if (!isSame(check, d.errors)) {
      onValidation && onValidation({ errors: check, values: source });
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
    let newData = { ...(data || {}), [key]: value };
    const event = {
      key,
      value,
      update: newData,
    };
    if (input) event.input = input;
    onChange && onChange(event);

    if (!values) return;

    newData = event.update;
    setData(newData);

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
      d.errors = runValidation(fieldsToValidate, newActualValues);
      handleUpdate(changes, newData);
    } else {
      const errorsFields = Object.keys(d.errors ?? {});
      if (errorsFields.length)
        d.errors = runValidation(errorsFields, newActualValues);
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
      hotkeys={hotkeys}
      errors={d.errors}
      onClick={handleAction}
      onKeyDown={handleAction}
      onChange={handleChanges}
    >
      {children}
    </View>
  );
}
