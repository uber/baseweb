# baseui/skeleton

This is a proposal for adding a skeleton component for representing loading states to Base Web. It also offers a neat way of dealing with loading states in tests written with React Testing Library.

## Motivation

Currently Base Web only provides a spinner for loading states. It communicates loading state to the user by replacing parts of the screen with a spinning circle indicator.

A different solution for loading states is provided by skeletons. Instead of replacing the screen content, skeletons imitate the final layout of the page after loading by replacing components with a placeholder that is similar in shape and size.

Examples of this can be found in the wild on Facebook, YouTube, etc.

See also:

* [Ant Design docs: Skeleton component](https://ant.design/components/skeleton/#components-skeleton-demo-active)
* [Medium article: Everything you need to know about skeleton screens](https://uxdesign.cc/what-you-should-know-about-skeleton-screens-a820c45a571a)

## Changes

1. New `Skeleton` component
   * renders a generic placeholder
   * accepts a `className` for styling
   * renders an HTML element with `[data-testid="loader"]`
2. Adjust `Spinner` component
   * renders an HTML element with `[data-testid="loader"]`
3. New Jest matcher `expect(element).toHaveLoaders()`
   * asserts that `element` contains at least one HTML element with `[data-testid="loader"]`
   * can be used to assert the existence/absence of loaders
4. New test helper `waitForLoaders(element)`
   * waits until `element` does not contain any HTML elements with `[data-testid="loader"]`
   * `element` defaults to `document.body`
   * can be used after rendering/actions to wait for loading to be finished

## Examples

### Simple

```jsx
import {useQuery} from '@apollo/react-hooks'
import {Skeleton} from 'baseui/skeleton'
import React from 'react'

const Component = () => {
  const {data, loading} = useQuery(...)

  if (loading) {
    return <Skeleton />
  }
  return ...
}
```

### Custom Styling

```jsx
import {useQuery} from '@apollo/react-hooks'
import {Skeleton} from 'baseui/skeleton'
import React from 'react'
import {useStyletron} from 'styletron-react'

const Component = () => {
  const [css] = useStyletron()

  const {data, loading} = useQuery(...)

  if (loading) {
    return <Skeleton className={css(...)} />
  }
  return ...
}
```

### Testing

```jsx
import {render} from '@testing-library/react'
import {waitForLoaders} from 'baseui/test-utils'
import React from 'react'

import Component from '../component'

it('Component', async () => {
  // render component
  const result = render(<Component />)
  await waitForLoaders(result)

  // actions
  ...

  //assertions
  ...
})
```

## Considerations

Instead of introducing a custom `[data-testid="loader"]` attribute, `[aria-busy]` could be used. For more information read [Accessible Rich Internet Applications (WAI-ARIA) 1.0](https://www.w3.org/TR/wai-aria-1.0/states_and_properties#aria-busy) (W3C Recommendation).
