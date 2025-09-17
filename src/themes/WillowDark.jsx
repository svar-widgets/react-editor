import { WillowDark as WillowDarkInner } from '@svar-ui/react-core';
import './WillowDark.css';

function WillowDark(props) {
  const { fonts = true, children } = props;

  if (children) {
    return <WillowDarkInner fonts={fonts}>{children}</WillowDarkInner>;
  }

  return <WillowDarkInner fonts={fonts} />;
}

export default WillowDark;
