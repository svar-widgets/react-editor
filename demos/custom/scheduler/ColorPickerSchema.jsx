import { useMemo, useState, useEffect, useCallback } from 'react';
import { ColorSelect } from '@svar-ui/react-core';

export default function ColorPickerSchema(props) {
  const {
    colors,
    clear = false,
    placeholder = null,
    onchange,
    onChange: onChangeProp,
    value,
  } = props;

  const onChange = onChangeProp || onchange;

  const colorpicker = useMemo(() => value?.colorpicker || 'border', [value]);

  const [values, setValues] = useState(() => ({
    color: value?.[colorpicker] || '',
  }));

  useEffect(() => {
    setValues({ color: value?.[colorpicker] || '' });
  }, [value, colorpicker]);

  const mapedColors = useMemo(
    () => colors.map((c) => c[c.colorpicker || 'border']),
    [colors],
  );

  useEffect(() => {
    const val = values;
    const upd = {
      ...colors.find((c) => c[c.colorpicker || 'border'] === val.color),
    };
    if (onChange) onChange({ value: upd });
  }, [values, colors, onChange]);

  const handleChange = useCallback(({ value }) => {
    setValues((prev) => ({ ...prev, color: value }));
  }, []);

  return (
    <ColorSelect
      value={values.color}
      colors={mapedColors}
      placeholder={placeholder}
      clear={clear || false}
      onChange={handleChange}
    />
  );
}
