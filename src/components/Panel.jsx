import { useContext, useEffect, useMemo, useRef } from 'react';
import { context } from '@svar-ui/react-core';
import { hotkeys } from '../hotkeys';

import Columns from './Columns.jsx';
import Toolbar from './buttons/Toolbar.jsx';

import {
  SaveButton,
  CancelButton,
  CloseIcon,
  Spacer,
} from './buttons/buttons.js';

import './Panel.css';

export default function Panel(props) {
  const {
    data,
    editors,
    focus,
    css,
    topBar,
    bottomBar,
    layout,
    placement,
    errors,
    readonly,
    autoSave,
    children,
    onClick,
    onKeyDown,
    onChange,
  } = props;

  const i18n = useContext(context.i18n);
  const _ = useMemo(() => i18n.getGroup('editor'), [i18n]);

  const autoBars = useMemo(
    () => topBar === true && bottomBar === true,
    [topBar, bottomBar],
  );

  const tbar = useMemo(() => {
    let bar = topBar && topBar.items ? topBar.items.map((b) => ({ ...b })) : [];

    if (autoBars) {
      if (!readonly) {
        if (autoSave) bar = [Spacer(), CloseIcon()];
        else if (placement !== 'modal')
          bar = [Spacer(), CancelButton(_), SaveButton(_)];

        if (layout === 'columns' && !bar.length)
          bar = [Spacer(), SaveButton(_), CancelButton(_)];
      } else {
        bar = [Spacer(), CloseIcon()];
      }
    }

    return bar;
  }, [topBar, autoBars, readonly, autoSave, placement, layout, _]);

  const bbar = useMemo(() => {
    let bar =
      bottomBar && bottomBar.items
        ? bottomBar.items.map((b) => ({ ...b }))
        : [];

    if (autoBars) {
      if (!readonly) {
        if (placement === 'modal' && !autoSave)
          bar = [Spacer(), SaveButton(_), CancelButton(_)];
        if (layout === 'columns' && tbar.length) bar = [];
      }
    }

    return bar;
  }, [bottomBar, autoBars, readonly, placement, autoSave, layout, tbar, _]);

  const buttons = useMemo(() => [...tbar, ...bbar], [tbar, bbar]);

  const rootRef = useRef(null);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const cleanup = hotkeys(node, {
      keys: {
        'ctrl+s': buttons.find((t) => t.id === 'save'),
        escape: buttons.find((t) => t.id === 'cancel' || t.id === 'close'),
        'ctrl+d': buttons.find((t) => t.id === 'delete'),
      },
      action: (item) => {
        onKeyDown && onKeyDown({ item });
      },
    });

    return () => {
      if (typeof cleanup === 'function') cleanup();
    };
  }, [buttons, onKeyDown]);

  return (
    <div className={css ? 'wx-85HDaNoA ' + css : 'wx-85HDaNoA'} ref={rootRef}>
      <Toolbar
        {...(topBar && typeof topBar === 'object' ? topBar : {})}
        items={tbar}
        values={data}
        onClick={onClick}
        onChange={onChange}
      />
      <div
        className={`wx-85HDaNoA wx-content${layout === 'columns' ? ' wx-layout-columns' : ''}`}
      >
        {children}
        <Columns
          editors={editors}
          layout={layout}
          data={data}
          focus={focus}
          errors={errors}
          onClick={onClick}
          onChange={onChange}
        />
        <Toolbar
          {...(bottomBar && typeof bottomBar === 'object' ? bottomBar : {})}
          items={bbar}
          values={data}
          top={false}
          onClick={onClick}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
