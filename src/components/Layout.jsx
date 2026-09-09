import { ModalArea, SideArea } from '@svar-ui/react-core';
import Panel from './Panel.jsx';
import './Layout.css';

export default function Layout(props) {
  const { css, onClick, placement, ...restProps } = props;

  function handleClose() {
    onClick && onClick({ item: { id: 'close' } });
  }

  if (placement === 'modal') {
    return (
      <ModalArea>
        <Panel
          css={`wx-editor wx-panel ${css}`}
          onClick={onClick}
          placement={placement}
          {...restProps}
        />
      </ModalArea>
    );
  } else if (placement === 'fullscreen') {
    return (
      <div className="wx-Ps8Vyc31 wx-editor-fullscreen">
        <Panel
          css={`wx-editor wx-inline-form ${css}`}
          onClick={onClick}
          placement={placement}
          {...restProps}
        />
      </div>
    );
  } else if (placement === 'sidebar') {
    return (
      <SideArea onCancel={handleClose}>
        <Panel
          css={`wx-editor wx-panel ${css}`}
          onClick={onClick}
          placement={placement}
          {...restProps}
        />
      </SideArea>
    );
  } else {
    return (
      <Panel
        css={`wx-editor wx-inline-form ${css}`}
        onClick={onClick}
        placement={placement}
        {...restProps}
      />
    );
  }
}
