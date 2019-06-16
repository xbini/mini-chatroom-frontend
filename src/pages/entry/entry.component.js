import { Component, Vue } from 'vue-property-decorator'
import io from 'socket.io-client'
import moment from 'moment'
import template from './entry.component.html'
import { SOCKET } from '../../core/core-api'
import './entry.component.scss'


@Component({ template })
export default class EntryPageComponent extends Vue {
    formatDateTime = moment().format('YYYY年MoDo hh:mm:ss')
    socket = null
    menus = [
        {
            index: '/entry/sort',
            name: 'sort',
            path: '/entry/sort',
            icon: 'el-icon-s-opportunity'
        },
        {
            index: '/entry/window-properties',
            name: 'window-properties',
            path: '/entry/window-properties',
            icon: 'el-icon-s-data'
        }
    ]

    get activeMenu() {
        const { path } = this.$route
        return path
    }

    registerSocket() {
        this.socket = io(SOCKET, {
            path: '/socket'
        })
        this.socket.emit('msg', 'i am coming')
        this.socket.on('date-change', (timestamp) => {
            this.formatDateTime = moment(timestamp).format('YYYY年MoDo hh:mm:ss')
        })
    }

    initialization() {
        // return this.registerSocket()
    }

    mounted() {
        return this.initialization()
    }

    destroyed() {
        if (this.socket) {
            this.socket.close()
        }
    }
}
