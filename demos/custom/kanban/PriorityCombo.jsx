import { Combo } from '@svar-ui/react-core';
import UserIcon from './UserIcon.jsx';
import './PriorityCombo.css';

export default function PriorityCombo({
  value,
  options,
  onChange,
  ...restProps
}) {
  return (
    <Combo value={value} options={options} onChange={onChange} {...restProps}>
      {({ option }) => (
        <div className="wx-R2RD5gCZ wx-combo-option">
          {option.color ? (
            <div
              className="wx-R2RD5gCZ wx-color"
              style={{ background: option.color }}
            ></div>
          ) : option.avatar || option.avatarColor ? (
            <UserIcon data={option} />
          ) : null}
          {option.label}
        </div>
      )}
    </Combo>
  );
}
