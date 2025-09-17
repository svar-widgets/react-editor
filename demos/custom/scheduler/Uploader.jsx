import { useCallback } from 'react';
import { useWritableProp } from '@svar-ui/lib-react';
import { Uploader as WxUploader, UploaderList } from '@svar-ui/react-uploader';
import './Uploader.css';

export default function Uploader(props) {
  const {
    value: valueProp = [],
    uploadURL,
    onchange: onChange,
    ...restProps
  } = props;
  const [value, setValue] = useWritableProp(valueProp);

  const handleChange = useCallback(
    (obj) => {
      const next = [...value, obj];
      setValue(next);
      onChange && onChange({ value: next });
    },
    [value, onChange, setValue],
  );

  return (
    <div className="wx-sOcsnNpL wx-event-calendar-uploader">
      <WxUploader
        data={value}
        onChange={handleChange}
        uploadURL={uploadURL}
        {...restProps}
      />
      <UploaderList data={value} />
    </div>
  );
}
