import moment from 'moment'

export function dateTimeFormatFilter(timestamp, format = 'YYYY-MM-DD hh:mm:ss') {
    return moment(timestamp).format(format)
}

export const commonFilters = [
    {
        name: 'dateTimeFormat',
        Filter: dateTimeFormatFilter
    }
]
