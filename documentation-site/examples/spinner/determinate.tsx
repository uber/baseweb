import * as React from 'react';
import {Button} from 'baseui/button';
import {SpinnerDeterminate} from 'baseui/spinner';
import {useStyletron} from 'baseui';

export default () => {
  const [css] = useStyletron();
  // Mimic some loading
  const [progress, setProgress] = React.useState(0);
  const foo = React.useRef(0);
  React.useEffect(() => {
    foo.current = progress;
  }, [progress]);
  return (
    <div className={css({display: 'flex'})}>
      <Button
        kind="secondary"
        size="compact"
        shape="pill"
        onClick={() => {
          if (foo.current >= 1) {
            setProgress(0);
            return;
          }
          function tick() {
            setProgress(p => p + Math.random() * 0.33);
            if (foo.current < 1) {
              setTimeout(tick, Math.random() * 1000);
            }
          }
          tick();
        }}
      >
        {progress >= 1 ? 'Reset' : 'Load'}
      </Button>
      <div className={css({width: '10px'})} />
      <SpinnerDeterminate progress={x} />
    </div>
  );
};
