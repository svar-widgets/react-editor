import { MultiCombo } from '@svar-ui/react-core';
import UserIcon from './UserIcon.jsx';
import './UserMultiselect.css';

function UserMultiselect(props) {
  const { value, onChange, options, ...restProps } = props;

  return (
    <MultiCombo
      value={value}
      checkboxes
      options={options}
      onChange={onChange}
      {...restProps}
    >
      {({ option }) => (
        <div className="wx-wQDeBkWw wx-multiselect-option">
          <UserIcon data={option} />
          <span className="wx-wQDeBkWw wx-multiselect-label">
            {option.label}
          </span>
        </div>
      )}
    </MultiCombo>
  );
}

export default UserMultiselect;
