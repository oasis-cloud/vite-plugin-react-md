import { Options, ResolvedOptions } from './types'

export function resolveOptions(userOptions: Options): ResolvedOptions {
  const options = Object.assign(
    {
      markdownItOptions: {},
      markdownItUses: [],
      markdownItSetup: () => {},
      wrapperClasses: 'markdown-body',
      wrapperComponent: null,
    },
    userOptions
  ) as ResolvedOptions

  options.wrapperClasses = (
    typeof options.wrapperClasses === 'string'
      ? [options.wrapperClasses]
      : options.wrapperClasses
  )
    .filter((i) => i)
    .join(' ')

  return options
}
