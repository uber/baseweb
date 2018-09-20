/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable react/display-name*/

import * as React from 'react';
// Styled elements
import {StatefulSelect, TYPE} from './index';
import type {LabelT, OptionT} from './types';
import {STATE_CHANGE_TYPE} from './constants';

type ExamplePropsT = {
  multiple?: boolean,
  options?: Array<OptionT>,
  filterable?: boolean,
  getOptionLabel?: LabelT => React$Node,
  getSelectedOptionLabel?: LabelT => React$Node,
};

type ExampleStateT = {
  options: Array<OptionT>,
  selectedOptions?: Array<OptionT>,
};

const generateOptions = text => {
  const options = [];
  const optionsLength = Math.round(Math.random() * 10);
  for (let i = 0; i < optionsLength; i++) {
    const id = '' + Math.round(Math.random() * 10000);
    const label = text + id;
    options.push({id, label});
  }
  return options;
};

const facebookIcon = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAC8ElEQVRYhb2TS08aYRhGPzdd9A+4bFfua4ziBauhGgxRUcBxwCJFjHhlLKK1ar2ARI0ViLFGjcUoIqhIWwsxJsa0SfsD2j/CvtWni6rfFKZMZhSf5KyYk/fABEKuZhqOc+xwLMW6Ysgpw7GUaTjOEf7YoRjHOA9gGjmC3XuCgaUzOALnd8rA0hns3hOYRo7AOA/ADsVoRItzP2V0HWIwcI7e+VN0TCXwYuL4TumYSqB3/hSDgXMYXYdoce6nbgL0XAQ2dxLWySTax45zinUyCZs7CT0XwU2AzhGGzXOC568/3Qs2zwl0jjANaOoPwTx+jLbRj7dCNxBBnS2Iksa3GfCfM48fo6k/RAO0fdswvvpwK9Qd79E9FsXG3ncILf15bd82DWjo2ULrSFw2jf1hrO99Ezx8vXSnoWeLBtTbg2BcR7JxzSeyHgeQ4dTbgzRA07UJw9CRbNbD2b89gAxH07VJA+o6N6BzxmRzcXn5z7Ffvy+w+/kH3rz7+l+nrnODBqhta2h+eSgboU2sfMnqqG1rNKDWugotdyAboYk5tdZVGlBjWUGDY18ShZqFG4TG/7xQs5Dh11hWaICqfRn1A1FJSF26r2pfpgHV5gA0/RFJSF26X20O0ICqNj/qeiOSkLp0v6rNTwMqjUtQ9+xJItvS/5ahxM8Mv9K4RAOU7CJqu8OyEZqYo2QXaUA5s4Bn9l3ZCE3MKWcWaECpYQ6qrpBshCbmlBrmaIBC70V1545shCbmKPReGlDc7MFT245shCbmFDd7aEBRkxsl7JpshCbmFDW5eX9D1gvzTEI2QhNzKlneK1Ays2BG47IRmpijZGZpQEWLG1oudG8BWi6EihbeK6honb1QWfz3FqCy+FHeOntxfT9PafIFywzTUFl80HI7OQvQcjtQWXwoM0xDafIFCSF5hBDygBCSr9DPREv17stS3SRyit59qdDNRAkh+Ve3yUNCSAEh5Mk9U3B1++8vQAh5xONxjuDfyCeEPPgDoeJfSvwdT7oAAAAASUVORK5CYII=`;
const youtubeIcon = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEZElEQVRYhb2UXUhbZxzGX3ppylo9S6L5PJrEr0ST5sukSUwKlXghwWWFMtjF9FYYAy/sVegOtA22MZ3rRdttQlPpREKZtdBtQluEYG0C6ya6YCuhVWiDUpQ28/LZjedLT+zojH94eP/vc97/+/w4Bw4hgir4/ZdW/P7VFb8fFdJqwe+/RKTquc+3+LK3F5tDQ/jn/PmKaHNoCC97e/Hc51sUhec9nviLSATvBwaw3d2N7VOnKqPubrwfGMCLSAR5jyfOASx0dKwV+/tRCgWxFezEnNOBX23WA9Wc04GtYCdKoSCK/f1Y6OhY4wCeuV1Y7zqNd8FOzIeC2MhmcdC1kc1iPhTEu2An1rtO45nbBQ4g53RgM+DHZsBfkXAhBJuTczp4gHmHHW/9Prz1+yQHtVotGIYBADAMA4qiPhqCzZl32HmAjN2GdZ8X6z6v5BDDMNBqtQAAl8uFvr6+jwZgczJ2Gw8wa7Wi6PWg6PVIDhWLRVAUhXQ6DZlMhmKxiHg8DoqiQFEU4vE4AEAmk3Ezwl50107OrNXKAzxst+C1x43XHndZ8mg0CpPJhGg0CgAwmUyIxWKIxWLc25HL5dx5YS8sNudhu4UHmLGYseZ2Yc3tKguQz+dB0zQymQwAgKZp7hnbS3m7i82ZsZh5gAfmFrxyOfDK5SgLAABms3nfvtxzYbE5D8wtPMD91mYUnHYUnPZ9Adxu/hN1dXUhmUwimUwiEAhwzxmGQU9Pj+issNic+63NPMBUcyNW7Das2G37AoRCIa5PpVIIh8MIh8NIpVIAgEgkgnA4jMHBQdFZYbE5U82NPMDdJhOWT1ixfMKKUi63L8T/qVIux+XcbTLxAJONBuRtbcjb2rAcOIlS7uD/hqVcFsuBk1zOZKOBB5gwGrDUbjlUTRgFAOOGeiy0tR6qxg31PMCtBhp/Wlr26Kd6/R5JnZGa/ZBuNdA8wBitwx+tTXskVVJnpGY/pDFaxwPc1GuQazGVFQDkWky4ITjH9gCQqtfihl7DefeMNLe/Z6Ql77yp1/AA17VqPG0ylhUA0brb21pa4t7Q0yYjsskEt88mE5J3XteqeYBrmjrMNTaUFQDRuttb/f47LH75hchLed1Ied2iGaGuaep4gFF1LTKm+rICIFr/iycsqTtH1bU8wIhKiVmDvqwAcOs0rcW4TiXyftap8QutEXmPzp7Bo7NnkP78M8k7R1RKHuBKnQLTtAaPG3SSAsCt0/1f4e/JCZH3148/4PdvvhZ5TxKX8SRxmfOEmqY1uFKn4AGGFfI3t9W1eEhrJAWAWwFge21V5LF71itcHeH2hasje+67ra7FsEL+hgNIKKnRYZUSU1oVZvTqimpKq8KwSomEkhpl848QQqouKKpXLipqMKaSI61R4jdd3YEqrVFiTCXHRUUNLiiqVwghVTvZpIoQYiCEWM7VHLvDUMc3vv20GpUQQx3fOFdz7A4hxLKTWSUCIIS0H5JEAEd2mqOEkE8OSUfZT/AvpLZs7lVi3lIAAAAASUVORK5CYII=`;
const linkedInIcon = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADs0lEQVRYhb3Rf0jTaRwH8Kc/lsWsi2okHR0dHSEIXpHX4ZV5dHRo63ZpLLU6yp2Hkp032PyFeWlTZ46xcnrazpveTlqk02aZbkdpXDWuKRyUDMcYHsIwQUQQQUTe94/bc0/PGF+G7oEXjM/72ed5w5eQ/51cs7PhvNk5nWN2YiOcNzunc83OBhLunDMNvZV3OKAaGMOtUQ8MLybX1a1RD1QDY5B3OHDONPSWeTzr7qA22/QEdSMTKB1+g/y+cVzsca+r/L5xlA6/Qd3IBLJNT5B1d1AbKiBrsU+X2FxQ2MaQe//vDaWwjaHE5oKsxT4dKiBt7sfVvteQ33MxpMaHOKbW4ZhaB6nxIZdH62rfa0ib+xEqkGHoRZ7Vhew/XjLU7VZ4PB54PB6o261cHq08qwsZhl5a4JTuAb7t+ovj9XoZ4e5E65TuAS1wstGKM7895/h8Pka4O9E62WilBdLru5H56win9rEbfr8ffr8ftY/dYe9EK72+mxY4ftOCr9ufxtTxmxZaIPVGJ75q/ZPzaZGGEZyfaLIx89SfzTjRZEOK6jYz/6ysBel6e9jdqTc6aYGj1zvwpdHBCQQCjOC80PKUmet6HLioNWH41Tgz7332Clm1bUjTD3C7j17voAWOVJqQdnuIMzMzwwjOv/t9lJm//GeCuxvkm/oXGZpObveRShMtcKisDV/oBzmzs7OMSFkkFscLbvehsjZaIFndis91jzhzc3OMSJl7cgqyNidkbU64J6eYbMI3xe1OVrfSAknKZqQ02jnz8/OMSNn3luehTNH1LOJ/UxrtSFI20wKJJQYcbujnLCwsMIRmafpHEfPDDf1ILDHQAgeL9UjW2DiLi4sMoZmQ/GCxnhY4UKRDUk0PZ2lpiSE0E5IfKNLRAvsLtEisvs9ZXl5mCM2E5PsLtLTAPkU9Pqm6x1lZWWEIzYTk+xT1tMDeKxp8XNHNWV1dZQjNhOR7r2hogYRLNfio1MJ5/wjNhOQJl2poAcmFanyo6uK8f4RmQnLJhWpaYFdOFRKU5pjalVNFC+yQV2J3oRGSHztiYnehETvklbTAtuyKgCS/CTuLTTEhyW/CtuyKQKiA+Gy5IT6rHNsL7uCDovYNtb3gDuKzyiE+W24Ivr+JECLa8o3Ku1WmhjivDuLLesT/8Mu6El/WQ5xXh60yNbacUXkJIaK1t4mIELKTELJHlHnNFHda+S5O+hM2xGnlO1HmNRMhZM/amyKmACEkIUaYApvWfmwmhMTFyObgJ/gPNjNVp3ziQzoAAAAASUVORK5CYII=`;

class ParentSearch extends React.Component<ExamplePropsT, ExampleStateT> {
  static defaultProps: {} = {};
  constructor(props: ExamplePropsT) {
    super(props);
    this.state = {
      options: props.filterable ? generateOptions('text to search') : [],
      selectedOptions: [
        {
          id: '123',
          label: 'label for 123',
        },
      ],
    };
  }
  render() {
    return (
      <React.Fragment>
        <StatefulSelect
          rows={8}
          options={this.state.options}
          multiple={true}
          filterable={this.props.filterable}
          type={TYPE.search}
          initialState={{
            selectedOptions: this.state.selectedOptions,
          }}
          label="Search for tags"
          placeholder="Start searching"
          onChange={(e, {type, id = '', label, selectedOptions}) => {
            switch (type) {
              case STATE_CHANGE_TYPE.select:
                // eslint-disable-next-line no-console
                console.log('Selected id:' + id);
                break;
              case STATE_CHANGE_TYPE.unselect:
                // eslint-disable-next-line no-console
                console.log('Unselected id:' + id);
                break;
              case STATE_CHANGE_TYPE.clearAll:
                // eslint-disable-next-line no-console
                console.log('Cleared all tags');
                break;
              case STATE_CHANGE_TYPE.keyDown: {
                // $FlowFixMe
                let text = e.target.value;
                let options = [];
                if (!this.props.filterable && text.length > 5) {
                  options = generateOptions(text);
                  this.setState({options: options});
                }
                break;
              }
            }
          }}
        />
      </React.Fragment>
    );
  }
}

class ParentSelect extends React.Component<ExamplePropsT, ExampleStateT> {
  static defaultProps: {} = {};
  constructor(props: ExamplePropsT) {
    super(props);
    const {options = []} = props;
    this.state = {
      options: options.length
        ? options
        : [
            {
              id: '1',
              label: 'label for 1',
            },
            {
              id: '2',
              label: 'label for 2',
            },
            {
              id: '3',
              label: 'label for 3',
            },
            {
              id: '4',
              label: 'label for 4',
            },
          ],
      selectedOptions: options.length
        ? [options[0]]
        : [
            {
              id: '123',
              label: 'preselected label for 123',
            },
          ],
    };
  }
  render() {
    return (
      <React.Fragment>
        <StatefulSelect
          options={this.state.options}
          getSelectedOptionLabel={this.props.getSelectedOptionLabel}
          getOptionLabel={this.props.getOptionLabel}
          multiple={this.props.multiple}
          type={TYPE.select}
          initialState={{
            selectedOptions: this.state.selectedOptions,
          }}
          label="Select"
          placeholder={this.props.multiple ? null : 'Choose one'}
          onChange={(e, {type, id = '', label}) => {
            if (type === STATE_CHANGE_TYPE.select) {
              // eslint-disable-next-line no-console
              console.log('Selected id:' + id);
            }
          }}
        />
      </React.Fragment>
    );
  }
}

export const suite = 'Select Test Suite';
export const tests = {
  AS_SEARCH_WITH_TAGS_ADDED: 'In search\\autocomplete mode with tags added',
  AS_SEARCH_WITH_SIMPLE_SEARCH:
    'In search\\autocomplete mode with simple search filter of options',
  AS_SELECT_WITH_MULTIPLE_CHOICE: 'In Select multiple mode',
  AS_SELECT_WITH_SINGLE_CHOICE: 'In Select single mode',
  AS_SELECT_WITH_CUSTOM_LABELS: 'In Select multiple mode with Custom Labels',
  AS_SELECT_WITH_CUSTOM_SELECTED_LABELS:
    'In Select multiple mode with Custom Labels and Custom Selected labels',
  AS_SELECT_WITH_DISABLED_CHOICES: 'In Select single mode with some disabled',
};

export default {
  [tests.AS_SEARCH_WITH_TAGS_ADDED]: () => {
    return <ParentSearch />;
  },
  [tests.AS_SEARCH_WITH_SIMPLE_SEARCH]: () => {
    return <ParentSearch filterable />;
  },
  [tests.AS_SELECT_WITH_MULTIPLE_CHOICE]: () => {
    return <ParentSelect multiple={true} />;
  },
  [tests.AS_SELECT_WITH_SINGLE_CHOICE]: () => {
    return <ParentSelect />;
  },
  [tests.AS_SELECT_WITH_CUSTOM_LABELS]: () => {
    return (
      <ParentSelect
        multiple={true}
        getOptionLabel={option => (
          <span>
            <img
              style={{
                borderRadius: '50%',
                height: 'auto',
              }}
              src={option.label.imgSrc}
            />
            {option.label.text}
          </span>
        )}
        options={[
          {
            id: '1',
            label: {
              imgSrc: facebookIcon,
              text: 'Facebook',
            },
          },
          {
            id: '2',
            label: {
              imgSrc: youtubeIcon,
              text: 'YouTube',
            },
          },
          {
            id: '3',
            label: {
              imgSrc: linkedInIcon,
              text: 'LinkedIn',
            },
          },
        ]}
      />
    );
  },
  [tests.AS_SELECT_WITH_CUSTOM_SELECTED_LABELS]: () => {
    return (
      <ParentSelect
        multiple={true}
        getOptionLabel={option => (
          <span>
            <img
              style={{
                borderRadius: '50%',
                height: '75px',
              }}
              src={option.label.imgSrc}
            />
            {option.label.text}
          </span>
        )}
        options={[
          {
            id: '1',
            label: {
              imgSrc: facebookIcon,
              text: 'Facebook',
            },
          },
          {
            id: '2',
            label: {
              imgSrc: youtubeIcon,
              text: 'YouTube',
            },
          },
          {
            id: '3',
            label: {
              imgSrc: linkedInIcon,
              text: 'LinkedIn',
            },
          },
        ]}
        getSelectedOptionLabel={option => (
          <span>
            <img
              style={{
                borderRadius: '50%',
                height: 'auto',
              }}
              src={option.label.imgSrc}
            />
            {option.label.text + ' SELECTED'}
          </span>
        )}
      />
    );
  },
  [tests.AS_SELECT_WITH_DISABLED_CHOICES]: () => {
    return (
      <ParentSelect
        multiple={true}
        options={[
          {
            id: '1',
            label: 'label for 1',
          },
          {
            id: '2',
            label: 'label for 2',
            disabled: true,
          },
          {
            id: '3',
            label: 'label for 3',
          },
          {
            id: '4',
            label: 'label for 4',
            disabled: true,
          },
        ]}
      />
    );
  },
};
