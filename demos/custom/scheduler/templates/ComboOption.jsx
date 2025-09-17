import './ComboOption.css';

export default function ComboOption({ option = {} }) {
  return (
    <div className="wx-HFb1cehm wx-event-calendar-combo-option">
      <span>{option.label}</span>
      {option.color ? (
        <div
          className="wx-HFb1cehm wx-event-calendar-color"
          style={{ background: option.color.border }}
        ></div>
      ) : null}
    </div>
  );
}
