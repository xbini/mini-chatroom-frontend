import { Component, Vue } from 'vue-property-decorator'
import template from './sort.component.html'

@Component({ template })
export default class SortComponent extends Vue {
    initialization() {
    }

    mounted() {
        return this.initialization()
    }
}
