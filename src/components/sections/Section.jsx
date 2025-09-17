import './Section.css';

function Section({ fieldKey, label, active, onClick }) {
  return (
    <div
      className={`wx-OmgQq65I wx-section${active ? ' wx-section-active' : ''}`}
      onClick={() =>
        onClick &&
        onClick({
          item: { id: 'toggle-section', key: active ? null : fieldKey },
        })
      }
    >
      <h3>{label}</h3>
      <i
        className={`wx-OmgQq65I wxi-angle-${active ? 'down' : 'right'} wx-icon`}
      ></i>
    </div>
  );
}

export default Section;
