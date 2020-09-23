// @flow

import * as React from 'react';

import {useStyletron} from 'baseui';
import Check from 'baseui/icon/check';
import Delete from 'baseui/icon/delete';
import DeleteAlt from 'baseui/icon/delete-alt';
import {SnackbarElement} from 'baseui/snackbar';

// See examples above for how to enqueue these snackbars at the top of page
export default function ActionButtonUsage() {
  const [css] = useStyletron();
  return (
    <div>
      <div className={css({paddingBottom: '24px'})}>
        <SnackbarElement
          progress
          message="Downloading your file"
          actionMessage="Cancel"
          actionOnClick={() => {
            // handle cancel
          }}
          focus={false}
        />
      </div>

      <div className={css({paddingBottom: '24px'})}>
        <SnackbarElement
          startEnhancer={({size}) => <Delete size={size} />}
          message="The address was removed from your saved places"
          actionMessage="Undo"
          actionOnClick={() => {
            // handle undo
          }}
          focus={false}
        />
      </div>

      <div className={css({paddingBottom: '24px'})}>
        <SnackbarElement
          startEnhancer={({size}) => <Check size={size} />}
          message="The address was added to your saved places"
          actionMessage="See list"
          actionOnClick={() => {
            // handle see list
          }}
          focus={false}
        />
      </div>

      <div className={css({paddingBottom: '24px'})}>
        <SnackbarElement
          startEnhancer={({size}) => <DeleteAlt size={size} />}
          message="Your address wasn't added"
          actionMessage="Try again"
          actionOnClick={() => {
            // handle try again
          }}
          focus={false}
        />
      </div>
    </div>
  );
}
