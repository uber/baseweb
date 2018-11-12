/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable react/display-name*/

import * as React from 'react';
// Styled elements
import {Tag, KIND, StyledRoot} from './index';
import {withStyle} from 'styletron-react';
import type {TagKindT} from './types';
import tests from './examples-list';

const colorIcons = {
  '#05dc12': `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAC8ElEQVRYhb2TS08aYRhGPzdd9A+4bFfua4ziBauhGgxRUcBxwCJFjHhlLKK1ar2ARI0ViLFGjcUoIqhIWwsxJsa0SfsD2j/CvtWni6rfFKZMZhSf5KyYk/fABEKuZhqOc+xwLMW6Ysgpw7GUaTjOEf7YoRjHOA9gGjmC3XuCgaUzOALnd8rA0hns3hOYRo7AOA/ADsVoRItzP2V0HWIwcI7e+VN0TCXwYuL4TumYSqB3/hSDgXMYXYdoce6nbgL0XAQ2dxLWySTax45zinUyCZs7CT0XwU2AzhGGzXOC568/3Qs2zwl0jjANaOoPwTx+jLbRj7dCNxBBnS2Iksa3GfCfM48fo6k/RAO0fdswvvpwK9Qd79E9FsXG3ncILf15bd82DWjo2ULrSFw2jf1hrO99Ezx8vXSnoWeLBtTbg2BcR7JxzSeyHgeQ4dTbgzRA07UJw9CRbNbD2b89gAxH07VJA+o6N6BzxmRzcXn5z7Ffvy+w+/kH3rz7+l+nrnODBqhta2h+eSgboU2sfMnqqG1rNKDWugotdyAboYk5tdZVGlBjWUGDY18ShZqFG4TG/7xQs5Dh11hWaICqfRn1A1FJSF26r2pfpgHV5gA0/RFJSF26X20O0ICqNj/qeiOSkLp0v6rNTwMqjUtQ9+xJItvS/5ahxM8Mv9K4RAOU7CJqu8OyEZqYo2QXaUA5s4Bn9l3ZCE3MKWcWaECpYQ6qrpBshCbmlBrmaIBC70V1545shCbmKPReGlDc7MFT245shCbmFDd7aEBRkxsl7JpshCbmFDW5eX9D1gvzTEI2QhNzKlneK1Ays2BG47IRmpijZGZpQEWLG1oudG8BWi6EihbeK6honb1QWfz3FqCy+FHeOntxfT9PafIFywzTUFl80HI7OQvQcjtQWXwoM0xDafIFCSF5hBDygBCSr9DPREv17stS3SRyit59qdDNRAkh+Ve3yUNCSAEh5Mk9U3B1++8vQAh5xONxjuDfyCeEPPgDoeJfSvwdT7oAAAAASUVORK5CYII=`,
  '#ef0335': `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEZElEQVRYhb2UXUhbZxzGX3ppylo9S6L5PJrEr0ST5sukSUwKlXghwWWFMtjF9FYYAy/sVegOtA22MZ3rRdttQlPpREKZtdBtQluEYG0C6ya6YCuhVWiDUpQ28/LZjedLT+zojH94eP/vc97/+/w4Bw4hgir4/ZdW/P7VFb8fFdJqwe+/RKTquc+3+LK3F5tDQ/jn/PmKaHNoCC97e/Hc51sUhec9nviLSATvBwaw3d2N7VOnKqPubrwfGMCLSAR5jyfOASx0dKwV+/tRCgWxFezEnNOBX23WA9Wc04GtYCdKoSCK/f1Y6OhY4wCeuV1Y7zqNd8FOzIeC2MhmcdC1kc1iPhTEu2An1rtO45nbBQ4g53RgM+DHZsBfkXAhBJuTczp4gHmHHW/9Prz1+yQHtVotGIYBADAMA4qiPhqCzZl32HmAjN2GdZ8X6z6v5BDDMNBqtQAAl8uFvr6+jwZgczJ2Gw8wa7Wi6PWg6PVIDhWLRVAUhXQ6DZlMhmKxiHg8DoqiQFEU4vE4AEAmk3Ezwl50107OrNXKAzxst+C1x43XHndZ8mg0CpPJhGg0CgAwmUyIxWKIxWLc25HL5dx5YS8sNudhu4UHmLGYseZ2Yc3tKguQz+dB0zQymQwAgKZp7hnbS3m7i82ZsZh5gAfmFrxyOfDK5SgLAABms3nfvtxzYbE5D8wtPMD91mYUnHYUnPZ9Adxu/hN1dXUhmUwimUwiEAhwzxmGQU9Pj+issNic+63NPMBUcyNW7Das2G37AoRCIa5PpVIIh8MIh8NIpVIAgEgkgnA4jMHBQdFZYbE5U82NPMDdJhOWT1ixfMKKUi63L8T/qVIux+XcbTLxAJONBuRtbcjb2rAcOIlS7uD/hqVcFsuBk1zOZKOBB5gwGrDUbjlUTRgFAOOGeiy0tR6qxg31PMCtBhp/Wlr26Kd6/R5JnZGa/ZBuNdA8wBitwx+tTXskVVJnpGY/pDFaxwPc1GuQazGVFQDkWky4ITjH9gCQqtfihl7DefeMNLe/Z6Ql77yp1/AA17VqPG0ylhUA0brb21pa4t7Q0yYjsskEt88mE5J3XteqeYBrmjrMNTaUFQDRuttb/f47LH75hchLed1Ied2iGaGuaep4gFF1LTKm+rICIFr/iycsqTtH1bU8wIhKiVmDvqwAcOs0rcW4TiXyftap8QutEXmPzp7Bo7NnkP78M8k7R1RKHuBKnQLTtAaPG3SSAsCt0/1f4e/JCZH3148/4PdvvhZ5TxKX8SRxmfOEmqY1uFKn4AGGFfI3t9W1eEhrJAWAWwFge21V5LF71itcHeH2hasje+67ra7FsEL+hgNIKKnRYZUSU1oVZvTqimpKq8KwSomEkhpl848QQqouKKpXLipqMKaSI61R4jdd3YEqrVFiTCXHRUUNLiiqVwghVTvZpIoQYiCEWM7VHLvDUMc3vv20GpUQQx3fOFdz7A4hxLKTWSUCIIS0H5JEAEd2mqOEkE8OSUfZT/AvpLZs7lVi3lIAAAAASUVORK5CYII=`,
};

const tagStyleKinds: Array<TagKindT> = Object.keys(KIND);

export default {
  [tests.ALL_BASIC_COLORS]: () => {
    return (
      <React.Fragment>
        <div style={{width: '200px'}}>
          <Tag
            key="default"
            onActionClick={(e, tag) => {
              if (typeof tag === 'string') {
                // eslint-disable-next-line no-console
                console.log('Tag is clicked:' + tag);
              }
            }}
          >
            Default Color
          </Tag>
          {tagStyleKinds.map(kind => (
            <Tag
              key={kind}
              kind={kind}
              color={kind === 'custom' ? '#748ecc' : undefined}
              onActionClick={(e, tag) => {
                if (typeof tag === 'string') {
                  // eslint-disable-next-line no-console
                  console.log('Tag is clicked:' + tag);
                }
              }}
            >
              kind {kind}
            </Tag>
          ))}
        </div>
      </React.Fragment>
    );
  },
  [tests.WITH_CUSTOM_COLORS]: () => {
    return (
      <React.Fragment>
        <div style={{width: '200px'}}>
          {['#000000', '#00ff35'].map((color: string) => (
            <Tag
              key={color}
              color={color}
              kind="custom"
              onActionClick={(e, tag) => {
                if (typeof tag === 'string') {
                  // eslint-disable-next-line no-console
                  console.log('Tag is clicked:' + tag);
                }
              }}
              overrides={{
                Root: withStyle(StyledRoot, props => ({
                  color: props.$color,
                })),
              }}
            >
              Color {color}
            </Tag>
          ))}
        </div>
      </React.Fragment>
    );
  },
  [tests.WITH_CUSTOM_COMPONENTS]: () => {
    return (
      <React.Fragment>
        <div style={{width: '200px'}}>
          {//$FlowFixMe
          Object.entries(colorIcons).map(([color, icon]: Array<string>) => (
            <Tag
              key={color}
              color={color}
              kind="custom"
              onActionClick={(e, tag) => {
                if (typeof tag === 'string') {
                  // eslint-disable-next-line no-console
                  console.log('Tag is clicked:' + tag);
                }
              }}
              overrides={{
                Root: withStyle(StyledRoot, props => ({
                  color: props.$color,
                  backgroundColor: props.$color + '0f',
                })),
              }}
            >
              Color {color} <img src={icon} />
            </Tag>
          ))}
        </div>
      </React.Fragment>
    );
  },
  [tests.DISABLED]: () => {
    return (
      <React.Fragment>
        <div style={{width: '200px'}}>
          {tagStyleKinds.map(kind => (
            <Tag
              disabled={true}
              key={kind}
              kind={kind}
              onActionClick={(e, tag = '') => {
                if (typeof tag === 'string') {
                  // eslint-disable-next-line no-console
                  console.log('Tag is clicked:' + tag);
                }
              }}
            >
              kind {kind}
            </Tag>
          ))}
        </div>
      </React.Fragment>
    );
  },
};
