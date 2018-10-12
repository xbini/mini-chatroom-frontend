import { Component, Vue } from 'vue-property-decorator'
import io from 'socket.io-client'
import template from './entry.component.html'
import { SOCKET } from '../../core/core-api'
import './entry.component.scss'
import { getRoutes } from '../routes'


@Component({ template })
export default class EntryPageComponent extends Vue {
    date = new Date().toString()
    socket = null


    get menus() {
        const routes = getRoutes()
            .filter(r => r.path !== '')
        return routes.map((route, index) => ({
            index: `${index}`,
            name: route.path,
            children: route.children.map((c, i) => ({
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
            this.date = new Date(timestamp)
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
