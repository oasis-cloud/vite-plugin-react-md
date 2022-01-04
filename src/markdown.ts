import MarkdownIt from 'markdown-it'
import type { ResolvedOptions } from './types'

function createReactMarkdown(options: ResolvedOptions) {
  const markdown = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    ...options.markdownItOptions,
  })
  markdown.linkify.set({ fuzzyLink: false })

  options.markdownItSetup(markdown)

  return markdown
}

export default createReactMarkdown
