import * as React from 'react';
import {LightTheme as LT, DarkTheme as DT} from './baseui/themes';

const LightTheme: any = LT;
const DarkTheme: any = DT;

const SIZING = [
  'scale0',
  'scale100',
  'scale200',
  'scale300',
  'scale400',
  'scale500',
  'scale550',
  'scale600',
  'scale650',
  'scale700',
  'scale750',
  'scale800',
  'scale900',
  'scale1000',
  'scale1200',
  'scale1400',
  'scale1600',
  'scale2400',
  'scale3200',
  'scale4800',
];

const COLORS = [
  'primaryA',
  'primaryB',
  'accent',
  'negative',
  'warning',
  'positive',
  'backgroundPrimary',
  'backgroundSecondary',
  'backgroundTertiary',
  'backgroundInversePrimary',
  'backgroundInverseSecondary',
  'contentPrimary',
  'contentSecondary',
  'contentTertiary',
  'contentInversePrimary',
  'contentInverseSecondary',
  'contentInverseTertiary',
  'borderOpaque',
  'borderTransparent',
  'borderSelected',
  'borderInverseOpaque',
  'borderInverseTransparent',
  'borderInverseSelected',
  'backgroundStateDisabled',
  'backgroundOverlayDark',
  'backgroundOverlayLight',
  'backgroundAccent',
  'backgroundNegative',
  'backgroundWarning',
  'backgroundPositive',
  'backgroundLightAccent',
  'backgroundLightNegative',
  'backgroundLightWarning',
  'backgroundLightPositive',
  'backgroundAlwaysDark',
  'backgroundAlwaysLight',
  'contentStateDisabled',
  'contentAccent',
  'contentNegative',
  'contentWarning',
  'contentPositive',
  'contentOnColor',
  'borderStateDisabled',
  'borderAccent',
  'borderAccentLight',
  'borderNegative',
  'borderWarning',
  'borderPositive',
];

const TYPO = [
  'ParagraphXSmall',
  'ParagraphSmall',
  'ParagraphMedium',
  'ParagraphLarge',
  'LabelXSmall',
  'LabelSmall',
  'LabelMedium',
  'LabelLarge',
  'HeadingXSmall',
  'HeadingSmall',
  'HeadingMedium',
  'HeadingLarge',
  'HeadingXLarge',
  'HeadingXXLarge',
  'DisplayXSmall',
  'DisplaySmall',
  'DisplayMedium',
  'DisplayLarge',
];

const BORDERS = [
  'border100',
  'border200',
  'border300',
  'border400',
  'border500',
  'border600',
];

const RADII = ['radius100', 'radius200', 'radius300', 'radius400'];

const MEDIA = ['small', 'medium', 'large'];

const ANIMATION = [
  'timing100',
  'timing400',
  'timing700',
  'timing1000',
  'easeOutCurve',
  'easeInCurve',
  'easeInOutCurve',
];

const LIGHTING = ['shadow400', 'shadow500', 'shadow600', 'shadow700'];

const ColorCell: React.FC<{color: string}> = ({color}) => (
  <td>
    <div style={{display: 'flex', alignItems: 'center'}}>
      <div
        style={{
          backgroundColor: color,
          width: '30px',
          height: '18px',
          marginRight: '10px',
          border: '1px solid black',
        }}
      />
      {color.replace(/ /g, '')}
    </div>
  </td>
);

const Themeval: React.FC<{}> = () => {
  return (
    <div
      style={{
        fontSize: '12px',
        marginTop: '16px',
        fontFamily:
          'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;',
      }}
    >
      <a
        style={{marginLeft: '26px'}}
        href="https://baseweb.design/guides/theming/"
        target="_blank"
      >
        Base Theming Docs
      </a>
      <table style={{borderSpacing: '10px 0px', margin: '16px'}}>
        <thead style={{textAlign: 'left', fontSize: '14px'}}>
          <th style={{paddingBottom: '10px'}}>theme.sizing</th>
          <th style={{paddingBottom: '10px'}}> </th>
          <th style={{paddingBottom: '10px'}}> </th>
        </thead>
        <tbody>
          {SIZING.map(scale => (
            <tr>
              <td>{scale}</td>
              <td>{LightTheme.sizing[scale]}</td>
              <td>
                <div
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid black',
                    height: '10px',
                    width: LightTheme.sizing[scale],
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <table style={{borderSpacing: '10px 0px', margin: '16px'}}>
        <thead style={{textAlign: 'left', fontSize: '14px'}}>
          <th style={{paddingBottom: '10px'}}>theme.colors</th>
          <th style={{paddingBottom: '10px'}}>LightTheme</th>
          <th style={{paddingBottom: '10x'}}>DarkTheme</th>
        </thead>
        <tbody>
          {COLORS.map(color => (
            <tr>
              <td>{color}</td>
              <ColorCell color={LightTheme.colors[color]} />
              <ColorCell color={DarkTheme.colors[color]} />
            </tr>
          ))}
        </tbody>
      </table>
      <table style={{borderSpacing: '10px 0px', margin: '16px 16px 8px 16px'}}>
        <thead style={{textAlign: 'left', fontSize: '14px'}}>
          <th style={{paddingBottom: '10px'}}>theme.typography</th>
        </thead>
        <tbody>
          {TYPO.map(typo => (
            <tr>
              <td style={{...LightTheme.typography[typo]}}>{typo}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        style={{
          margin: '0px 26px 16px 26px',
          ...LightTheme.typography.ParagraphXSmall,
        }}
      >
        Usage: <code>{'<div css={{ ...theme.typography.LabelXSmall}} />'}</code>
      </div>
      <table style={{borderSpacing: '10px 0px', margin: '16px'}}>
        <thead style={{textAlign: 'left', fontSize: '14px'}}>
          <th style={{paddingBottom: '10px'}}>theme.breakpoints</th>
          <th style={{paddingBottom: '10px'}}></th>
        </thead>
        <tbody>
          {MEDIA.map(media => (
            <tr>
              <td>{media}</td>
              <td>{LightTheme.breakpoints[media]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table style={{borderSpacing: '10px 0px', margin: '16px'}}>
        <thead style={{textAlign: 'left', fontSize: '14px'}}>
          <th style={{paddingBottom: '10px'}}>theme.mediaQuery</th>
          <th style={{paddingBottom: '10px'}}></th>
        </thead>
        <tbody>
          {MEDIA.map(media => (
            <tr>
              <td>{media}</td>
              <td>{LightTheme.mediaQuery[media]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table style={{borderSpacing: '10px 0px', margin: '16px 16px 8px 16px'}}>
        <thead style={{textAlign: 'left', fontSize: '14px'}}>
          <th style={{paddingBottom: '10px'}}>theme.borders</th>
          <th style={{paddingBottom: '10px'}}>LightTheme</th>
          <th style={{paddingBottom: '10px'}}>DarkTheme</th>
        </thead>
        <tbody>
          {BORDERS.map(border => (
            <tr>
              <td>{border}</td>
              <td style={{backgroundColor: 'white'}}>
                <div
                  style={{
                    ...LightTheme.borders[border],
                    margin: '10px',
                    height: '12px',
                    width: '50px',
                  }}
                />
              </td>
              <td style={{backgroundColor: 'black'}}>
                <div
                  style={{
                    ...DarkTheme.borders[border],
                    margin: '10px',
                    height: '12px',
                    width: '50px',
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        style={{
          margin: '0px 26px 16px 26px',
          ...LightTheme.typography.ParagraphXSmall,
        }}
      >
        Usage: <code>{'<div css={{ ...theme.borders.border400}} />'}</code>
      </div>
      <table style={{borderSpacing: '10px 0px', margin: '16px 16px 8px 16px'}}>
        <thead style={{textAlign: 'left', fontSize: '14px'}}>
          <th style={{paddingBottom: '10px'}}>theme.borders</th>
          <th style={{paddingBottom: '10px'}}></th>
          <th style={{paddingBottom: '10px'}}></th>
        </thead>
        <tbody>
          {RADII.map(radius => (
            <tr>
              <td>{radius}</td>
              <td>
                <div
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid black',
                    borderRadius: LightTheme.borders[radius],
                    height: '14px',
                    width: '20px',
                  }}
                />
              </td>
              <td>{LightTheme.borders[radius]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table style={{borderSpacing: '10px 0px', margin: '16px'}}>
        <thead style={{textAlign: 'left', fontSize: '14px'}}>
          <th style={{paddingBottom: '10px'}}>theme.animation</th>
          <th style={{paddingBottom: '10px'}}></th>
        </thead>
        <tbody>
          {ANIMATION.map(ani => (
            <tr>
              <td>{ani}</td>
              <td>{LightTheme.animation[ani]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table style={{borderSpacing: '10px 0px', margin: '16px'}}>
        <thead style={{textAlign: 'left', fontSize: '14px'}}>
          <th style={{paddingBottom: '10px'}}>theme.lighting</th>
          <th style={{paddingBottom: '10px'}}></th>
          <th style={{paddingBottom: '10px'}}></th>
        </thead>
        <tbody>
          {LIGHTING.map(light => (
            <tr>
              <td>{light}</td>
              <td>{LightTheme.lighting[light]}</td>
              <td style={{backgroundColor: 'white'}}>
                <div
                  style={{
                    margin: '10px',
                    height: '12px',
                    width: '20px',
                    boxShadow: LightTheme.lighting[light],
                  }}
                />
              </td>
              <td>LightTheme</td>
            </tr>
          ))}
          {LIGHTING.map(light => (
            <tr>
              <td>{light}</td>
              <td>{DarkTheme.lighting[light]}</td>
              <td style={{backgroundColor: 'black'}}>
                <div
                  style={{
                    margin: '10px',
                    height: '12px',
                    width: '20px',
                    boxShadow: DarkTheme.lighting[light],
                  }}
                />
              </td>
              <td>DarkTheme</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 style={{marginLeft: '26px'}}>theme.dir - auto, rtl, ltr</h3>
    </div>
  );
};

export default Themeval;
