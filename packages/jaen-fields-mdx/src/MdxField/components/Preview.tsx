import {BaseEditorProps, MdastRoot} from './types.js'
// @ts-nocheck
import React, {useMemo} from 'react'
import {Statistics, statistics} from 'vfile-statistics'

import {useMdx} from '../use-mdx.js'
import {PreviewComponent} from './PreviewComponent'

export interface BuildEditorProps {
  components: BaseEditorProps['components']

  mdast?: MdastRoot
}

export const Preview = React.memo<BuildEditorProps>(({components, mdast}) => {
  const defaults = useMemo(
    () => ({
      gfm: true,
      frontmatter: true,
      math: true,
      directive: true,
      mdast
    }),
    [mdast]
  )

  const [state, _] = useMdx(defaults, true, components) as any

  const stats = state.file ? statistics(state.file) : ({} as Statistics)

  // useEffect(() => {
  //   console.log('useEffect', defaultValue)
  //   setConfig({value: defaultValue})
  // }, [defaultValue, setConfig])

  return (
    <PreviewComponent state={state} stats={stats} components={components} />
  )
})
