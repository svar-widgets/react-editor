import './MultiselectOption.css';

export default function MultiselectOption({ option = {} }) {
  return (
    <div className="wx-Ayc10uMm wx-multiselect-wraper">
      <img
        src={option.img}
        alt=""
        className="wx-Ayc10uMm wx-multieselectOption-img"
      />
      {option.label}
    </div>
  );
}
