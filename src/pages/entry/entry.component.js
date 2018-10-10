import { Component, Vue } from 'vue-property-decorator'
import io from 'socket.io-client'
import template from './entry.component.html'
import { SOCKET } from '../../core/core-api'

@Component({ template })
export default class EntryPageComponent extends Vue {
    collapsed = false
    date = new Date().toString()
    socket = null

    toggleCollapsed() {
        this.collapsed = !this.collapsed
    }

    registerSocket() {
        this.socket = io(SOCKET, {
            path: '/socket'
        })
        this.socket.emit('msg', 'i am coming')
        this.socket.on('date-change', (timestamp) => {
            this.date = new Date(timestamp)
        })
    }

    mounted() {
        return this.registerSocket()
    }

    destroyed() {
        if (this.socket) {
            this.socket.close()
        }
    }
}
