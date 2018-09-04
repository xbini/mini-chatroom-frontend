import { Component, Vue } from 'vue-property-decorator'
import template from './entry.component.html'

@Component({ template })
export default class EntryPageComponent extends Vue {
    title = '你真是太可爱了！😊'
}
