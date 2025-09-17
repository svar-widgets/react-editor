import { ModalArea, SideArea } from '@svar-ui/react-core';
import Panel from './Panel.jsx';
import './Layout.css';

export default function Layout(props) {
  const { css, onclick, onClick: onClickProp, placement, ...restProps } = props;
  const onClick = onClickProp ?? onclick;

  function handleClose() {
    onClick && onClick({ item: { id: 'close' } });
  }

  if (placement === 'modal') {
    return (
      <ModalArea>
        <Panel
          css={`wx-panel ${css}`}
          onClick={onClick}
          placement={placement}
          {...restProps}
        />
      </ModalArea>
    );
  } else if (placement === 'sidebar') {
    return (
      <SideArea onCancel={handleClose}>
        <Panel
          css={`wx-panel ${css}`}
          onClick={onClick}
          placement={placement}
          {...restProps}
        />
      </SideArea>
    );
  } else {
    return (
      <Panel
        css={`wx-inline-form ${css}`}
        onClick={onClick}
        placement={placement}
        {...restProps}
      />
    );
  }
}
