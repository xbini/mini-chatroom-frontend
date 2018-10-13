import { Component, Vue } from 'vue-property-decorator'
import template from './sort.component.html'

@Component({ template })
export default class SortComponent extends Vue {
    output = ''

    initialization() {
        const regex = /(^\d)|(^-)*(\.\d)?$/g
        const value = '-0.11'
        this.output = `value:${value},regex:${regex} -- ${regex.test(value)}`
    }

    mounted() {
        return this.initialization()
    }
}
