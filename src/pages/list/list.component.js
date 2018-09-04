import { Component, Vue } from 'vue-property-decorator'
import template from './list.component.html'

@Component({ template })
export default class ListPageComponent extends Vue {
    list = []

    initialization() {
        console.log('这是个异步路由组件')
        this.list = Object.keys(window)
        return this.list
    }

    mounted() {
        return this.initialization()
    }
}
