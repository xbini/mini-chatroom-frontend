import { Component, Vue } from 'vue-property-decorator'
import template from './sort.component.html'

@Component({ template })
export default class SortComponent extends Vue {
    list = []
    countDownInfo = []

    resolve(id) {
        const obj = this.countDownInfo.find(i => i.orderId === id)
        return obj
    }

    xixi(item) {
        window.callme(item.id)
    }

    hehe(item) {
        const obj = this.resolve(item.id)
        // console.log(obj)
        return (obj && obj.buttonText) || '重新退款'
    }

    haha(item) {
        const { id } = item
        const { length } = this.list
        switch (id) {
            case 1:
                console.log(`---------${item.value} | ${Math.random()}`)
                break
            case length:
                console.log(`---------${item.value}`)
                break
            default:
                console.log(item.value)
                break
        }
        const obj = this.resolve(item.id)
        return obj && obj.disabled
    }

    mounted() {
        const interval = (timer, counter) => {
            const content = `(${counter.seconds}s)后可重新退款`
            counter.seconds -= 1
            if (counter.seconds < 0) {
                counter.disabled = false
                counter.buttonText = '重新退款'
                clearInterval(timer)
            } else {
                counter.buttonText = content
                counter.disabled = true
            }
        }
        window.callme = (id) => {
            const index = this.countDownInfo.findIndex(i => i.orderId === id)
            if (index >= 0) {
                this.countDownInfo.splice(index, 1)
            }
            let counter = {
                orderId: id,
                disabled: true,
                seconds: 3,
                buttonText: ''
            }
            this.countDownInfo.push(counter)
            interval(-1, counter)
            const timer = setInterval(() => interval(timer, counter), 1000)
        }
        const list = []
        for (let i = 1; i < 6; i += 1) {
            list.push({
                value: i,
                id: i
            })
        }
        this.list = list
    }
}
