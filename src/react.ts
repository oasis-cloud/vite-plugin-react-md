import path from 'path'
import MarkdownIt from 'markdown-it'
import { ResolvedOptions } from './types'

interface ReactTemplateOptions
  extends Partial<
    Pick<
      ResolvedOptions,
      | 'wrapperClasses'
      | 'wrapperComponentPath'
      | 'wrapperComponent'
      | 'beforeTransformReactCode'
      | 'afterTransformReactCode'
    >
  > {
  markdownCode: string
}

const reactTemplate = (
  {
    markdownCode,
    wrapperClasses,
    wrapperComponentPath,
    wrapperComponent,
    beforeTransformReactCode,
    afterTransformReactCode,
  }: ReactTemplateOptions = {
    markdownCode: '',
    wrapperClasses: 'markdown-body',
    wrapperComponentPath: '',
    wrapperComponent: '',
    beforeTransformReactCode: () => '',
    afterTransformReactCode: () => {},
  }
) => {
  let imported = ''
  if (wrapperComponentPath && typeof wrapperComponentPath === 'string') {
    imported = `import ReactCom from '${path.join(
      process.cwd(),
      wrapperComponentPath
    )}';\n`
  }
  let wrapperComponentString = `${markdownCode}`

  if (wrapperComponentPath && wrapperComponent) {
    wrapperComponentString = `
        <${wrapperComponent}>
            ${markdownCode}
        </${wrapperComponent}>
        `
  }

  let rcode = `
    import React from 'react';
    ${imported}
    ${beforeTransformReactCode && beforeTransformReactCode()}
    
    const MarkdownRC = () => {
        return <>
            <div className='${wrapperClasses}'>
                ${wrapperComponentString}
            </div>  
        </>
    }
    export default MarkdownRC;
    `
  return afterTransformReactCode ? afterTransformReactCode(rcode) : rcode
}

function reactRender({
  md,
  code,
  options,
}: {
  md: MarkdownIt
  code: string
  options: ResolvedOptions
}) {
  return `${
    require('@babel/core').transformSync(
      reactTemplate({
        markdownCode: md.render(code),
        wrapperComponentPath: options.wrapperComponentPath,
        wrapperComponent: options.wrapperComponent,
        wrapperClasses: options.wrapperClasses,
        beforeTransformReactCode: options.beforeTransformReactCode,
        afterTransformReactCode: options.afterTransformReactCode,
      }),
      {
        ast: false,
        presets: ['@babel/preset-react'],
      }
    ).code
  }`
}

export default reactRender
