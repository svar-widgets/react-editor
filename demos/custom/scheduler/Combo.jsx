import { Combo as CoreCombo } from '@svar-ui/react-core';

export default function Combo(props) {
  const { template, value, onchange: onChange, options, ...restProps } = props;

  return (
    <CoreCombo
      value={value}
      onChange={onChange}
      options={options}
      {...restProps}
    >
      {({ option }) => {
        const Component = template;
        return <Component option={option} />;
      }}
    </CoreCombo>
  );
}
