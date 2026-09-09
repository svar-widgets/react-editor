import { DatePicker, TimePicker, Switch } from '@svar-ui/react-core';
import './EventDates.css';

export default function EventDates({ value = {}, error, onChange }) {
  const update = (part) => onChange({ value: { ...value, ...part } });

  const midnight = (d) => {
    if (!d) return d;
    const out = new Date(d);
    out.setHours(0, 0, 0, 0);
    return out;
  };

  // calendar returns the picked day at midnight; keep the current time part
  function pickDate(key, day) {
    const current = value[key];
    let next = day;
    if (day && current && !value.isFullDay) {
      next = new Date(day);
      next.setHours(current.getHours(), current.getMinutes(), 0, 0);
    }
    update({ [key]: next });
  }

  // time picker returns hours/minutes only; keep the current date part
  function pickTime(key, time) {
    const current = value[key];
    if (!current) return;
    const next = new Date(current);
    next.setHours(time.getHours(), time.getMinutes(), 0, 0);
    update({ [key]: next });
  }

  function toggleFullDay({ value: isFullDay }) {
    // switching to all-day snaps both dates to midnight
    update(
      isFullDay
        ? {
            isFullDay,
            start: midnight(value.start),
            end: midnight(value.end),
          }
        : { isFullDay },
    );
  }

  return (
    <div className={'wx-aaej5EPx wx-event-dates' + (error ? ' wx-error' : '')}>
      <div className="wx-aaej5EPx wx-date">
        <DatePicker
          value={value.start}
          onChange={(ev) => pickDate('start', ev.value)}
        />
      </div>
      {!value.isFullDay ? (
        <div className="wx-aaej5EPx wx-time">
          <TimePicker
            value={value.start}
            onChange={(ev) => pickTime('start', ev.value)}
          />
        </div>
      ) : null}
      <span className="wx-aaej5EPx">&mdash;</span>
      <div className="wx-aaej5EPx wx-date">
        <DatePicker
          value={value.end}
          onChange={(ev) => pickDate('end', ev.value)}
        />
      </div>
      {!value.isFullDay ? (
        <div className="wx-aaej5EPx wx-time">
          <TimePicker
            value={value.end}
            onChange={(ev) => pickTime('end', ev.value)}
          />
        </div>
      ) : null}
      <label className="wx-aaej5EPx wx-full-day">
        <Switch value={value.isFullDay} onChange={toggleFullDay} />
        All day
      </label>
    </div>
  );
}
