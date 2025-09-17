import { useState } from 'react';
import { Editor, registerEditorItem } from '../../src';
import { RadioButtonGroup } from '@svar-ui/react-core';

import DateTimePicker from '../custom/scheduler/DateTimePicker.jsx';
import Combo from '../custom/scheduler/Combo.jsx';
import Multiselect from '../custom/scheduler/Multiselect.jsx';
import MultiselectOption from '../custom/scheduler/templates/MultiselectOption.jsx';
import ComboOption from '../custom/scheduler/templates/ComboOption.jsx';
import ColorPickerSchema from '../custom/scheduler/ColorPickerSchema.jsx';
import Uploader from '../custom/scheduler/Uploader.jsx';

import './Scheduler.css';

registerEditorItem('date-time-picker', DateTimePicker);
registerEditorItem('sheduler-multiselect', Multiselect);
registerEditorItem('sheduler-combo', Combo);
registerEditorItem('radio-group', RadioButtonGroup);
registerEditorItem('color-schema', ColorPickerSchema);
registerEditorItem('files', Uploader);

const listItems = [
  {
    key: 'text',
    comp: 'text',
    label: 'Event name',
    config: {
      placeholder: 'New Event',
    },
  },
  {
    comp: 'date-time-picker',
    key: 'start_date',
    label: 'Start date',
    time: true,
    config: {
      buttons: false,
    },
  },
  {
    comp: 'date-time-picker',
    key: 'end_date',
    label: 'End date',
    time: true,
    config: {
      buttons: false,
    },
  },
  {
    comp: 'sheduler-combo',
    key: 'type',
    label: 'Type',
    options: [
      {
        color: { background: '#3AA3E3', border: '#098CDC' },
        id: 'work',
        active: true,
        label: 'Work',
      },
      {
        color: { background: '#9585EF', border: '#7A67EB' },
        id: 'meeting',
        active: true,
        label: 'Meeting',
      },
      {
        color: { background: '#BD69BC', border: '#AD44AB' },
        id: 'rest',
        active: true,
        label: 'Rest',
      },
      {
        color: { background: '#84BF70', border: '#61A649' },
        id: 'movie',
        active: true,
        label: 'Movie',
      },
    ],
    template: ComboOption,
  },
  {
    comp: 'textarea',
    key: 'details',
    label: 'Description',
    config: {
      placeholder: 'Add description',
    },
  },
  {
    comp: 'sheduler-multiselect',
    key: 'arr',
    label: 'Multiselect',
    options: [
      {
        label: 'AC/DC',
        id: 'a',
        img: 'https://i1.sndcdn.com/avatars-hyJEwQzyBwczTEfs-UmFlag-t500x500.jpg',
      },
      {
        label: 'Metallica',
        id: 'm',
        img: 'https://headbangkok.com/wp-content/uploads/2021/05/metallica.jpg',
      },
      {
        label: 'Scorpions',
        id: 's',
        img: 'https://i.ytimg.com/vi/syNDdIfKbkw/maxresdefault.jpg',
      },
      {
        label: 'Muse',
        id: 'mu',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbtGXvZF-oc3YFOgP9FJXg8eTV8TEzbKKwOw&usqp=CAU',
      },
    ],
    template: MultiselectOption,
  },
  {
    comp: 'radio-group',
    key: 'radio',
    label: 'Radio Group',
    options: [
      {
        value: 's',
        label: 'Scorpions',
      },
      {
        value: 'm',
        label: 'Muse',
      },
    ],
  },
  {
    comp: 'color-schema',
    key: 'color',
    label: 'Color',
    colors: [
      { background: '#5890DC', border: '#2D74D3' },
      { background: '#84BF70', border: '#61A649' },
      { background: '#BD69BC', border: '#AD44AB' },
      { background: '#FF8750', border: '#BD4E1B' },
      { background: '#7366CC', border: '#4536AD' },
      { background: '#454555', border: '#363645' },
      { background: '#3AA3E3', border: '#098CDC' },
      { background: '#009492', border: '#157B7A' },
      { background: '#CB61C8', border: '#9E3C9C' },
      { background: '#DC9F54', border: '#B87728' },
      { background: '#3537A6', border: '#282A8A' },
      { background: '#006ECC', border: '#045AA3' },
      { background: '#009C5A', border: '#04864F' },
      { background: '#E94C93', border: '#AC3C6E' },
      { background: '#E67400', border: '#B65F06' },
      { background: '#3E3A98', border: '#36337E' },
      { background: '#0054B4', border: '#014593' },
      { background: '#005A3A', border: '#054830' },
      { background: '#E54D54', border: '#BA282E' },
      { background: '#9585EF', border: '#7A67EB' },
      { background: '#3D446F', border: '#2A2F50' },
    ],
  },
  {
    key: 'files',
    comp: 'files',
    label: 'Attachments',
    config: {
      multiple: true,
    },
    uploadURL: '/uploads',
  },
];

export default function Scheduler() {
  const [events, setEvents] = useState([
    {
      id: '2',
      type: 'work',
      start_date: new Date('2022-05-24T00:00:00'),
      end_date: new Date('2022-06-08T00:00:00'),
      text: 'Color from data',
      color: { background: '#DC9F54', border: '#B87728' },
      details: 'This color is set from data',
      allDay: false,
      arr: '',
      files: [],
    },
    {
      id: '221',
      type: 'work',
      start_date: new Date('2022-06-07T00:00:00'),
      end_date: new Date('2022-06-13T00:00:00'),
      text: 'French Open',
      details: 'Philippe-Chatrier Court\n Paris, FRA',
      allDay: false,
      arr: '',
      files: [],
    },
    {
      id: '3',
      type: 'work',
      start_date: new Date('2022-06-10T00:00:00'),
      end_date: new Date('2022-06-14T00:00:00'),
      text: 'Aegon Championship',
      details: 'The Queens Club\n London, ENG',
      allDay: false,
      arr: '',
      files: [],
    },
  ]);

  const [activeEvent, setActiveEvent] = useState(null);

  function handleClick({ item, values }) {
    const actionId = item.id;
    const id = values.id;
    if (actionId === 'delete') {
      setEvents((prev) => prev.filter((t) => t.id !== id));
    }
    setActiveEvent(null);
  }

  function selectActive(data) {
    setActiveEvent(data);
  }

  const refresh = ({ values }) => {
    setEvents((prev) => {
      const next = [...prev];
      const ind = next.findIndex((d) => d.id === values.id);
      if (ind !== -1) {
        next[ind] = values;
      }
      return next;
    });
  };

  return (
    <>
      <h4 style={{ marginLeft: '20px' }}>Imitation of scheduler events</h4>

      <div className="wx-Rr6ObcED events">
        {events.map((data) => (
          <div
            key={data.id}
            className={
              'wx-Rr6ObcED item' +
              (activeEvent?.id === data.id ? ' active' : '')
            }
            onClick={() => selectActive(data)}
          >
            <div className="wx-Rr6ObcED content">{data.text}</div>
          </div>
        ))}
      </div>

      {activeEvent ? (
        <Editor
          topBar={{
            items: [
              {
                comp: 'icon',
                icon: 'wxi-close',
                id: 'close',
              },
              { comp: 'spacer' },
              {
                comp: 'button',
                type: 'danger',
                text: 'Delete',
                id: 'delete',
              },
              {
                type: 'primary',
                comp: 'button',
                text: 'Save',
                id: 'save',
              },
            ],
          }}
          placement="sidebar"
          autoSave={true}
          items={listItems}
          values={activeEvent}
          onAction={handleClick}
          onSave={refresh}
        />
      ) : null}
    </>
  );
}
