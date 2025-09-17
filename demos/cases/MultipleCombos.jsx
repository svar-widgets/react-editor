import { useState } from 'react';
import { Editor, registerEditorItem } from '../../src';
import { Combo } from '@svar-ui/react-core';
import './MultipleCombos.css';

registerEditorItem('combo', Combo);

export default function MultipleCombos() {
  const [items, setItems] = useState([
    {
      comp: 'combo',
      label: 'Country',
      key: 'country',
      options: [
        { id: 'france', label: 'France' },
        { id: 'germany', label: 'Germany' },
        { id: 'poland', label: 'Poland' },
        { id: 'spain', label: 'Spain' },
      ],
    },
    {
      comp: 'combo',
      label: 'City',
      key: 'city',
      disabled: true,
    },
  ]);

  const cities = {
    france: [
      { id: 'lyon', label: 'Lyon' },
      { id: 'marseille', label: 'Marseille' },
      { id: 'paris', label: 'Paris' },
      { id: 'strasbourg', label: 'Strasbourg' },
    ],
    germany: [
      { id: 'berlin', label: 'Berlin' },
      { id: 'dresden', label: 'Dresden' },
      { id: 'hamburg', label: 'Hamburg' },
      { id: 'munich', label: 'Munich' },
    ],
    poland: [
      { id: 'gdansk', label: 'Gdansk' },
      { id: 'krakow', label: 'Krakow' },
      { id: 'lublin', label: 'Lublin' },
      { id: 'warsaw', label: 'Warsaw' },
    ],
    spain: [
      { id: 'barcelona', label: 'Barcelona' },
      { id: 'madrid', label: 'Madrid' },
      { id: 'seville', label: 'Seville' },
      { id: 'valencia', label: 'Valencia' },
    ],
  };

  const [values] = useState({
    country: '',
    city: '',
  });

  function handleChange(ev) {
    const { key, value: v } = ev;

    if (key === 'country') {
      setItems((prev) => {
        const next = [...prev];
        next[1] = {
          ...prev[1],
          disabled: false,
          options: cities[v],
        };
        return next;
      });

      ev.update = {
        country: v,
        city: '',
      };
    }
  }

  return (
    <div style={{ padding: '10px' }}>
      <h3>Changing the country updates list of options in the cities combo</h3>
      <div className="wx-ctYNV4D3 editor">
        <Editor
          items={items}
          values={values}
          onChange={handleChange}
          topBar={false}
        />
      </div>
    </div>
  );
}
