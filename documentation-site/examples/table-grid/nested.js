// @flow
import React from 'react';
import {format} from 'date-fns';

import {Button} from 'baseui/button';
import {Heading, HeadingLevel} from 'baseui/heading';
import ChevronDown from 'baseui/icon/chevron-down';
import ChevronRight from 'baseui/icon/chevron-right';
import Overflow from 'baseui/icon/overflow';
import {StyledLink} from 'baseui/link';
import {StatefulMenu} from 'baseui/menu';
import {StatefulPopover, PLACEMENT} from 'baseui/popover';
import {withStyle, useStyletron} from 'baseui';
import {
  StyledTable,
  StyledHeadCell,
  StyledBodyCell,
} from 'baseui/table-grid';
import {Tag} from 'baseui/tag';

function buildRow(status) {
  return [
    'Baseui Github CI Job',
    status,
    new Date(2019, 6, 22),
    'feat(side-navigation): improve item rendering performance',
    'https://github.com/uber/baseweb/pull/1449',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    [
      [
        'buildkite/baseui',
        'running',
        new Date(2019, 6, 22),
        'Build #7728 passed (20 minutes, 1 second)',
        'https://buildkite.com/uberopensource/baseui/builds/7728',
      ],
      [
        'buildkite/baseui/docker-package-e2e',
        'running',
        new Date(2019, 6, 22),
        'Passed (6 minutes, 44 seconds)',
        'https://buildkite.com/uberopensource/baseui/builds/7728#54927bc9-88e0-4d0b-80b0-f60b8a2298e4',
      ],
      [
        'buildkite/baseui/docker-package-unit',
        'passed',
        new Date(2019, 6, 22),
        'Passed (7 minutes)',
        'https://buildkite.com/uberopensource/baseui/builds/7728#fea8c317-b65b-4c5f-9fad-b7a329a26237',
      ],
      [
        'buildkite/baseui/documentation-site-link-checker',
        'failed',
        new Date(2019, 6, 22),
        'Passed (1 minute, 33 seconds)',
        'https://buildkite.com/uberopensource/baseui/builds/7728#eaa5998f-69a4-4b94-9a9b-4dd2bbd8c985',
      ],
      [
        'buildkite/baseui/eslint',
        'passed',
        new Date(2019, 6, 22),
        'Passed (1 minute, 34 seconds)',
        'https://buildkite.com/uberopensource/baseui/builds/7728#a658a503-472f-43aa-80b5-708d39951cf7',
      ],
      [
        'buildkite/baseui/flowtype',
        'passed',
        new Date(2019, 6, 22),
        'Passed (1 minute, 33 seconds)',
        'https://buildkite.com/uberopensource/baseui/builds/7728',
      ],
      [
        'buildkite/baseui/jest',
        'running',
        new Date(2019, 6, 22),
        'Passed (1 minute, 33 seconds)',
        'https://buildkite.com/uberopensource/baseui/builds/7728',
      ],
      [
        'buildkite/baseui/pipeline',
        'running',
        new Date(2019, 6, 22),
        'Passed (1 minute, 33 seconds)',
        'https://buildkite.com/uberopensource/baseui/builds/7728',
      ],
    ],
  ];
}

const data = [
  buildRow('running'),
  buildRow('running'),
  buildRow('failed'),
  buildRow('passed'),
  buildRow('passed'),
  buildRow('passed'),
  buildRow('passed'),
  buildRow('failed'),
  buildRow('failed'),
  buildRow('failed'),
  buildRow('passed'),
  buildRow('passed'),
  buildRow('passed'),
  buildRow('passed'),
  buildRow('passed'),
];

function statusToTagKind(status) {
  switch (status) {
    case 'running': {
      return 'primary';
    }
    case 'passed': {
      return 'positive';
    }
    case 'failed': {
      return 'negative';
    }
    default: {
      return 'neutral';
    }
  }
}

function Tasks(props) {
  const [css] = useStyletron();
  return (
    <div
      className={css({
        gridColumn: 'span 5',
        padding: '32px 24px',
      })}
    >
      <StyledTable $gridTemplateColumns="max-content auto auto auto">
        <StyledHeadCell $sticky={false}>Task</StyledHeadCell>
        <StyledHeadCell $sticky={false}>Status</StyledHeadCell>
        <StyledHeadCell $sticky={false}>Last Run</StyledHeadCell>
        <StyledHeadCell $sticky={false}>Details</StyledHeadCell>
        {props.tasks.map((task, index) => {
          return (
            <React.Fragment>
              <StyledBodyCell>{task[0]}</StyledBodyCell>
              <StyledBodyCell>
                <Tag
                  closeable={false}
                  variant="outlined"
                  kind={statusToTagKind(task[1])}
                >
                  {task[1]}
                </Tag>
              </StyledBodyCell>
              <StyledBodyCell>
                {format(task[2], 'yyyy-MM-dd h:mm a')}
              </StyledBodyCell>
              <StyledBodyCell>
                <StyledLink href={task[4]}>{task[3]}</StyledLink>
              </StyledBodyCell>
            </React.Fragment>
          );
        })}
      </StyledTable>
    </div>
  );
}

const CenteredBodyCell = withStyle(StyledBodyCell, {
  display: 'flex',
  alignItems: 'center',
});

function Row({striped, row}) {
  const [css] = useStyletron();
  const [expanded, setExpanded] = React.useState(false);
  return (
    <React.Fragment>
      <CenteredBodyCell $striped={striped}>
        <Button
          size="compact"
          kind="minimal"
          onClick={() => setExpanded(!expanded)}
          shape="square"
        >
          {expanded ? (
            <ChevronDown size={18} />
          ) : (
            <ChevronRight size={18} />
          )}
        </Button>
        {row[0]}
      </CenteredBodyCell>
      <CenteredBodyCell $striped={striped}>
        <Tag
          closeable={false}
          variant="outlined"
          kind={statusToTagKind(row[1])}
        >
          {row[1]}
        </Tag>
      </CenteredBodyCell>
      <CenteredBodyCell $striped={striped}>
        <StyledLink href={row[4]}>{row[3]}</StyledLink>
      </CenteredBodyCell>
      <CenteredBodyCell $striped={striped}>
        {format(row[2], 'yyyy-MM-dd h:mm a')}
      </CenteredBodyCell>
      <CenteredBodyCell $striped={striped}>
        <div
          className={css({
            textOverflow: 'ellipsis',
            maxWidth: '200px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          })}
        >
          {row[5]}
        </div>
        <StatefulPopover
          placement={PLACEMENT.bottomLeft}
          content={({close}) => (
            <StatefulMenu
              items={[
                {label: 'Item One'},
                {label: 'Item Two'},
                {label: 'Item Three'},
                {label: 'Item Four'},
              ]}
              onItemSelect={() => close()}
              overrides={{
                List: {style: {height: '144px', width: '138px'}},
              }}
            />
          )}
        >
          <Button shape="square" kind="minimal" size="compact">
            <Overflow size={18} />
          </Button>
        </StatefulPopover>
      </CenteredBodyCell>
      {expanded && <Tasks tasks={row[6]} />}
    </React.Fragment>
  );
}

export default function() {
  const [css] = useStyletron();
  return (
    <div className={css({height: '600px'})}>
      <StyledTable $gridTemplateColumns="max-content min-content minmax(300px, max-content) max-content auto">
        <StyledHeadCell>Job Name</StyledHeadCell>
        <StyledHeadCell>Status</StyledHeadCell>
        <StyledHeadCell>Pull Request</StyledHeadCell>
        <StyledHeadCell>Last Run</StyledHeadCell>
        <StyledHeadCell>Details</StyledHeadCell>

        {data.map((row, index) => {
          const striped = index % 2 === 0;
          return <Row key={index} row={row} striped={striped} />;
        })}
      </StyledTable>
    </div>
  );
}
