import { useMemo, useState, useEffect, useCallback } from 'react';
import { ColorSelect } from '@svar-ui/react-core';

export default function ColorPickerSchema(props) {
  const {
    colors,
    clear = false,
    placeholder = null,
    onChange,
    value,
    mode = 'border',
  } = props;
  
  const mapedColors = useMemo(
    () => colors.map((c) => c[mode]),
    [colors, mode],
  );

  const handleChange = useCallback(({ value }) => {
    onChange && onChange({ value });
  }, []);

  return (
    <ColorSelect
      value={value}
      colors={mapedColors}
      placeholder={placeholder}
      clear={clear || false}
      onChange={handleChange}
    />
  );
}
