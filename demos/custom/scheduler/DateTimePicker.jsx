import { DatePicker, TimePicker } from '@svar-ui/react-core';
import './DateTimePicker.css';

function DateTimePicker(props) {
  const { value, id, time, onChange, ...restProps } = props;

  return (
    <div className="wx-srfKtiUH wx-event-calendar-date_field">
      <div className="wx-srfKtiUH wx-event-calendar-input_wrapper">
        <DatePicker
          id={id}
          value={value}
          onChange={onChange}
          {...restProps}
          buttons={false}
        />
      </div>
      {time ? <TimePicker id={id} value={value} onChange={onChange} /> : null}
    </div>
  );
}

export default DateTimePicker;
