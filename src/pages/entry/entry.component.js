import { Component, Vue } from 'vue-property-decorator'
import io from 'socket.io-client'
import moment from 'moment'
import template from './entry.component.html'
import { SOCKET } from '../../core/core-api'
import './entry.component.scss'
import { getRoutes } from '../routes'


@Component({ template })
export default class EntryPageComponent extends Vue {
    formatDateTime = moment().format('YYYY年MoDo hh:mm:ss')
    socket = null


    get menus() {
        const routes = getRoutes()
            .filter(r => r.path !== '')
        return routes.map((route, index) => ({
            index: `${index}`,
            name: route.path,
            children: route.children
                .filter(c => c.path !== '')
                .map((c, i) => ({
                    index: `${index}-${i}`,
                    path: `${route.path}/${c.path}`,
                    name: c.path
                }))
        }))
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
        return this.registerSocket()
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
