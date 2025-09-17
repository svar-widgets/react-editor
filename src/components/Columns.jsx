import { useMemo } from 'react';
import Editor from './FormEditor.jsx';
import './Columns.css';

function Columns(props) {
  const { editors, data, layout, errors, focus } = props;
  const onClick = props.onClick ?? props.onclick;
  const onChange = props.onChange ?? props.onchange;

  const columns = useMemo(() => {
    let cols = [];
    if (layout === 'columns') {
      cols = [
        { ...editors, config: [] },
        { ...editors, config: [] },
      ];
      editors.config.forEach((field) => {
        const index = field.column === 'left' ? 0 : 1;
        cols[index].config.push(field);
      });

      if (cols[0].config.length) {
        const obj = cols[0].config[0];
        if (obj.comp === 'text') {
          cols[0][0] = {
            ...obj,
            css: 'title',
            label: '',
          };
        }
      }
    }
    return cols;
  }, [layout, editors]);

  if (layout === 'columns') {
    return (
      <div className="wx-bNrSbszs wx-cols">
        <div className="wx-bNrSbszs wx-left">
          <Editor
            editors={columns[0]}
            data={data}
            errors={errors}
            onClick={onClick}
            onChange={onChange}
            onclick={onClick}
            onchange={onChange}
          />
        </div>
        <div className="wx-bNrSbszs wx-right">
          <Editor
            editors={columns[1]}
            data={data}
            focus={focus}
            errors={errors}
            onClick={onClick}
            onChange={onChange}
            onclick={onClick}
            onchange={onChange}
          />
        </div>
      </div>
    );
  }

  return (
    <Editor
      editors={editors}
      data={data}
      focus={focus}
      errors={errors}
      onClick={onClick}
      onChange={onChange}
      onclick={onClick}
      onchange={onChange}
    />
  );
}

export default Columns;
