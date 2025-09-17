import { useCallback } from 'react';
import { Toolbar as WxToolbar } from '@svar-ui/react-toolbar';
import './Toolbar.css';

function Toolbar({
  items,
  values = null,
  top = true,
  onClick,
  onChange: onChangeForm,
}) {
  const onChange = useCallback(
    ({ item, value }) => {
      onChangeForm && onChangeForm({ key: item.key, value });
    },
    [onChangeForm],
  );

  return items.length ? (
    <div
      className={`wx-66OW1j0R wx-editor-toolbar ${top ? 'wx-topbar' : 'wx-bottom'}`}
    >
      <WxToolbar
        items={items}
        values={values}
        onClick={onClick}
        onChange={onChange}
      />
    </div>
  ) : null;
}

export default Toolbar;
