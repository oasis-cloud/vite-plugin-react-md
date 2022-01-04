import type { Plugin, TransformResult } from 'vite'
import type { Options } from './types'
import { resolveOptions } from './options'
import { createFilter } from '@rollup/pluginutils'
import createReactMarkdown from './markdown'
import reactRender from './react'

function VitePluginReactMarkdown(
  userOptions: Options = {
    markdownItOptions: {},
    markdownItSetup: (md) => {},
  }
): Plugin {
  const filter = createFilter(/\.md$/)
  const options = resolveOptions(userOptions)
  const md = createReactMarkdown(options)

  return {
    name: 'vite-plugin-react-markdown',
    enforce: 'pre',
    transform(
      code: string,
      id: string
    ): Promise<TransformResult> | TransformResult {
      if (!filter(id))
        return {
          code,
          map: null,
        }
      try {
        return {
          code: reactRender({ md, code, options }),
          map: null,
        }
      } catch (e: any) {
        this.error(e)
      }
    },
    async handleHotUpdate(ctx) {
      if (!filter(ctx.file)) return

      const defaultRead = ctx.read
      ctx.read = async function () {
        return reactRender({ md, code: await defaultRead(), options })
      }
    },
  }
}

export default VitePluginReactMarkdown
