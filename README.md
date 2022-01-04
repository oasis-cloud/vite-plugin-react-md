# vite-plugin-react-md

Markdown for Vite

- Use Markdown as React components
- Use React components in Markdown

## Install

Install

```bash
npm i vite-plugin-react-md -D # yarn add vite-plugin-react-md -D
```

Add it to `vite.config.js`

```ts
// vite.config.js
import reactRefresh from '@vitejs/plugin-react-refresh'
import Markdown from 'vite-plugin-md'

export default {
    plugins: [
        reactRefresh(),
        Markdown()
    ],
}
```
And import it as a normal React component

## Import Markdown as React components

```tsx
import HelloWorld from './README.md'

const App = () => <HelloWorld/>

export default App
```

## Use React Components inside Markdown

```html
<Counter init='5'/>
```

```ts
// vite.config.js
import reactRefresh from '@vitejs/plugin-react-refresh'
import Markdown from 'vite-plugin-md'

export default {
    plugins: [
        reactRefresh(),
        Markdown({
            beforeTransformReactCode: () => `import Counter from '/components/counter';`,
        })
    ],
}
```
