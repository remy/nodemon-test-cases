import url from 'url'
import path from 'path'
import process from 'process'
import Module from 'module'

const builtIns = Module['builtinModules']
const jsExtensions = ['.js', '.mjs']

export const resolve = (specifier, parentModuleUrl, defaultResolver) => {
    if (builtIns.includes(specifier)) {
        return { url: specifier, format: 'builtin' }
    }
    if (/^\.{0,2}[/]/.test(specifier) !== true && !specifier.startsWith('file:')) {
        return defaultResolver(specifier, parentModuleUrl)
    }
    const resolvedUrl = new url.URL(specifier, parentModuleUrl)
    const ext = path.extname(resolvedUrl.pathname)
    if (!jsExtensions.includes(ext)) {
        throw new Error(`could not load file with non-js file extension ${ext}`)
    }
    return { url: resolvedUrl.href, format: 'esm' }
}