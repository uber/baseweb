import * as React from 'react';
import {Popover, PLACEMENT} from 'baseui/popover';
import {useStyletron} from 'baseui';

const PopupError: React.FC<{error: string | null}> = ({error}) => {
  const [css, theme] = useStyletron();
  const errorCx = css({
    backgroundColor: theme.colors.negative600,
    whiteSpace: 'pre',
    fontSize: '11px',
    fontFamily: `Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace`,
    color: theme.colors.mono100,
    paddingLeft: theme.sizing.scale400,
    paddingRight: theme.sizing.scale400,
    paddingTop: theme.sizing.scale400,
    paddingBottom: theme.sizing.scale400,
    overflowX: 'scroll',
  });
  if (error === null) {
    return null;
  }
  const formatError = error
    .replace('1 | /* @babel/template */;', '')
    .replace(/(\d+ \|)/g, num => `${parseInt(num, 10) - 1} |`);
  return (
    <Popover
      isOpen
      accessibilityType="tooltip"
      placement={PLACEMENT.bottom}
      content={<div className={errorCx}>{formatError}</div>}
    >
      <div />
    </Popover>
  );
};

export default PopupError;
