import { useMemo } from 'react';
import './UserIcon.css';

function UserIcon({
  data = {},
  noTransform = false,
  size = 'normal',
  border = true,
}) {
  const firstLetters = useMemo(() => {
    return data.label
      .split(' ')
      .map((label) => label[0])
      .join('');
  }, [data?.label]);

  const style = useMemo(() => {
    if (data.avatarColor) {
      return {
        background: data.avatarColor,
        color: 'var(--wx-color-primary-font)',
      };
    }
    return undefined;
  }, [data?.avatarColor]);

  return (
    <div
      className={`wx-eM9Jr6oC wx-user ${size}${border ? ' border' : ''}`}
      style={style}
    >
      {data.avatar ? (
        <img src={data.avatar} alt={data.label} />
      ) : noTransform ? (
        data.label
      ) : (
        firstLetters
      )}
    </div>
  );
}

export default UserIcon;
