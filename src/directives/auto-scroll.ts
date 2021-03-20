import { DirectiveBinding } from "@vue/runtime-core"

const exec = {
    bottom: (el: HTMLElement) => {
        const y = el.scrollHeight
        el.scrollTo(0, y)
    },
    top: (el: HTMLElement) => {
        // const y = el.scrollHeight
        // el.scrollTo(0, y)
    }
}
export const AutoScroll = {
    name: 'auto-scroll',
    directive: {
        updated(el: HTMLElement, binding: DirectiveBinding<string>) {
            (exec as any)[binding.value](el)
        }
    }
}
