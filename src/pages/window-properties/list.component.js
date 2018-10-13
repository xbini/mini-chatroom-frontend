import { Component, Vue, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import template from './list.component.html'
import './list.compoent.scss'
import { actionTypes } from '../../core/store/window-properties/actions'
import { mutationTypes } from '../../core/store/window-properties/mutations'

const localModule = namespace('windowProperties')

@Component({ template })
export default class ListPageComponent extends Vue {
    @localModule.State('list') list

    @localModule.Getter('listLength') length

    @localModule.Mutation(mutationTypes.RESTORE_LIST)
    resetList() {
    }

    @localModule.Action(actionTypes.GET_LIST)
    loadList() {
    }

    @Watch('list')
    onListChange(newVal, oldVal) {
        console.log(newVal, oldVal)
    }

    initialization() {
        console.log('这是个异步路由组件')
        return this.loadList()
    }

    mounted() {
        return this.initialization()
    }

    destroyed() {
        this.resetList()
    }
}
