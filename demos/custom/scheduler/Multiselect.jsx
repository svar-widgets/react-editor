import { MultiCombo } from '@svar-ui/react-core';

export default function Multiselect(props) {
  const { value, options, template, onchange: onChange, ...restProps } = props;

  return (
    <MultiCombo
      value={value}
      options={options}
      onChange={onChange}
      {...restProps}
    >
      {({ option }) => {
        const Component = template;
        return (
          <div>
            <Component option={option} />
          </div>
        );
      }}
    </MultiCombo>
  );
}
