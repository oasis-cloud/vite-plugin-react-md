import MarkdownIt from 'markdown-it'

export interface Options {
  wrapperClasses?: string | string[]
  wrapperComponent?: string
  wrapperComponentPath?: string
  markdownItUses?: (
    | MarkdownIt.PluginSimple
    | [MarkdownIt.PluginSimple | MarkdownIt.PluginWithOptions<any>, any]
    | any
  )[]
  markdownItOptions?: MarkdownIt.Options
  markdownItSetup?: (md: MarkdownIt) => void
  beforeTransformReactCode?: () => string
  afterTransformReactCode?: (reactCode: string) => any
}

export interface ResolvedOptions extends Required<Options> {
  wrapperClasses: string
}
