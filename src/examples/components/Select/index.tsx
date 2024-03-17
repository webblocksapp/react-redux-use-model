import { useEffect, useRef, useState } from 'react';
import { Virtuoso, VirtuosoProps } from 'react-virtuoso';

export interface SelectProps {
  label?: string;
  options?: Array<{ label?: string; value?: string }>;
  endReached?: VirtuosoProps<any, any>['endReached'];
  onChange?: (value: any) => void;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options = [],
  endReached,
  onChange,
}) => {
  const ref = useRef({ isScrolling: false });
  const [value, setValue] = useState<string>();
  const [show, setShow] = useState(false);

  const getLabel = () => {
    const option = options.find((option) => option.value == value);
    return option?.label || '';
  };

  useEffect(() => {
    value && onChange?.(value);
  }, []);

  return (
    <div>
      {label ? <label>{label}</label> : <></>}
      <input
        onClick={() => setShow((prev) => !prev)}
        readOnly
        value={getLabel()}
      />
      <div style={{ position: 'relative' }}>
        {show && (
          <div
            style={{ position: 'absolute', bottom: 0, left: 0, height: '100%' }}
          >
            <Virtuoso
              style={{ height: '300px', minWidth: '300px' }}
              data={options}
              itemContent={(index, data) => (
                <div
                  style={{ cursor: 'pointer' }}
                  key={index}
                  onClick={() => {
                    setValue(data.value);
                    setShow(false);
                  }}
                >
                  {data.label}
                </div>
              )}
              isScrolling={(flag) => (ref.current.isScrolling = flag)}
              endReached={(...params) => {
                ref.current.isScrolling && endReached?.(...params);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
