import { Component, Vue } from 'vue-property-decorator'
import io from 'socket.io-client'
import template from './entry.component.html'

@Component({ template })
export default class EntryPageComponent extends Vue {
    title = '你真是太可爱了！😊'
    date = new Date().toLocaleString()

    registerSocket() {
        const socket = io('ws://localhost:3000')
        socket.emit('msg', 'i am coming')
        socket.on('date-change', (timestamp) => {
            this.date = new Date(timestamp)
            console.info(timestamp)
        })
    }

    mounted() {
        return this.registerSocket()
    }
}
