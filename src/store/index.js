import { createStore } from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const modulesFiles = require.context('./modules', false, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
}, {})

export default createStore(
    {
        strict: true,
        state, // 数据状态
        getters, // 类似vue中的computed
        mutations,	// 保存数据同步方法
        actions, // 保存数据异步方法
        modules
    }
)

