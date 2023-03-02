/**
 * @type {import('typedoc').TypeDocOptions}
 */
module.exports = {
    tsconfig: './tsconfig.json',
    name: 'ho0ks',
    includeVersion: true,
    gitRemote: 'origin',
    basePath: './',
    entryPoints: './src/',
    entryPointStrategy: 'expand',
    json: './docs/out/reflection.json',
    readme: './README.md',
    out: './docs/out/',
    // media: './media/',
    theme: 'default',
    customCss: './src/styles/typedoc.css',
    logLevel: 'Verbose',
    // inWork: use All to find and convert missing JSDoc comments
    // commentStyle: 'All',
    sort: [
        'source-order'
    ],
    visibilityFilters: {
        protected: true,
        private: true,
        inherited: true,
        external: true
    },
    navigationLinks: {
        'GitHub': 'https://github.com/theZ3r0CooL/ho0ks'
    },
    externalSymbolLinkMappings: {
        /** used by {@example class Foo extends Component {}} */
        '@types/react': {
            'Component': 'https://reactjs.org/docs/react-component.html'
        },
        /** used by {@link react!Component} */
        'react': {
            'Component': 'https://reactjs.org/docs/react-component.html'
        },
        /** used by {@link !Promise} */
        'global': {
            'Promise': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise',
            'Response': 'https://developer.mozilla.org/en-US/docs/Web/API/Response'
        },
        /** used by {@example type Foo = Promise<string>} */
        'typescript': {
            'Promise': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise',
            'Response': 'https://developer.mozilla.org/en-US/docs/Web/API/Response'
        }
    },
    plugin: [
        'typedoc-plugin-extras',
        'typedoc-plugin-mdn-links',
        'typedoc-plugin-missing-exports',
        'typedoc-umlclass'
    ],
    externalPattern: [
        './node_modules/**/*'
    ],
    exclude: [
        './src/index.*',
        './src/react-app-env.d.ts'
    ],
    excludeExternals: true,
    // typedoc-plugin-extras options
    customTitle: 'ho0ks Docs',
    customDescription: 'Documentation of the ho0ks Library.',
    favicon: './example/public/icons/favicon.ico',
    footerLastModified: true,
    footerTypedocVersion: true,
    emit: 'both',
    // typedoc-umlclass options
    // inWork: change to brand colors
    umlClassDiagram: {
        type: 'detailed',
        location: 'local',
        format: 'svg',
        classFontStyle: 'bold',
        classFontSize: 16,
        classFontColor: '#535353',
        attributeFontName: 'Menlo',
        attributeFontSize: 14,
        attributeFontColor: '#292929',
        arrowColor: '#BB2AA3',
        boxBorderRadius: 24,
        boxBorderColor: '#24384a',
        boxBackgroundColor: '#6FBFEF',
        backgroundColor: '#a0a0a0',
        verboseOutput: true
    },
}
