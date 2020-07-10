
import * as React from 'react';
import {Skeleton} from "../index.js";


export default function Scenario() {
  return (
    <div>

    <Skeleton
        rows={4}
        overrides={{
          Row: {
            style: {
              borderRadius: '50%',
              width: '100px',
              height:'100px',
            }
          }

        }}
      />
      <Skeleton
        rows={6}
        overrides={{
          Row: {
            style: {
              width: '500px',
              height: '20px',
              marginTop: "5px",
              marginBottom: "5px",
            }
          },
          Root: {
            style: {
              flexDirection: 'column',
            }
          }
        }}
      />
      </div>

  );
}
