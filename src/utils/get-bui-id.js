/*
MIT License

Copyright (c) 2018 Uber Technologies, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
// @flow

/**
 * For aria and other attributes like htmlFor, we often need
 * to attach identifiers to elements. Making `id` a required
 * prop in our components shifts this burden to our customers
 * but it's nice to try to automatically provide these unique
 * ids when possible.
 *
 * Generating unique IDs that match across server/client renders
 * is a hard probablem that doesn't have any perfect solutions
 * currently [1] [2]. UUIDs/Math.random will never match, whereas
 * auto-incrementing IDs may work if server and client render
 * exactly the same DOM, so that's what we'll use here. If this
 * is insufficient for users they can apply ids manually.
 *
 * One other technique that we can use internally is to do a
 * setState in componentDidMount or something similar, so that
 * these ids are only used client-side, but this could of course
 * have perf implications.
 *
 * [1] https://github.com/facebook/react/issues/5867
 * [2] https://github.com/reactjs/rfcs/pull/32/files
 */
let id = 0;

export default function getBuiId() {
  return `bui-${++id}`;
}
