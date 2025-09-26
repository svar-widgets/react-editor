import './Section.css';

function Section({ fieldKey, label, activeSection, onClick }) {
  return (
    <div
      className={`wx-OmgQq65I wx-section${activeSection ? ' wx-section-active' : ''}`}
      onClick={() =>
        onClick &&
        onClick({
          item: { id: 'toggle-section', key: activeSection ? null : fieldKey },
        })
      }
    >
      <h3>{label}</h3>
      <i
        className={`wx-OmgQq65I wxi-angle-${activeSection ? 'down' : 'right'} wx-icon`}
      ></i>
    </div>
  );
}

export default Section;
