import PerfectScrollbar from 'perfect-scrollbar'

let instance = null
export const scrollbarDirective = {
    unbind() {
        instance.destroy()
        instance = null
    },
    inserted(el) {
        instance = new PerfectScrollbar(el)
    }
}

export const commonDirectives = [
    {
        name: 'scrollbar',
        Directive: scrollbarDirective
    }
]
