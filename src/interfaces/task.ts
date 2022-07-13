export interface reChangeProps {
    type: string,
    value: string
}


export interface ListTotal {
    type: string,
    value: number,
    name?: string,
    total: number
}

export interface RateList {
    key: string,
    value: string | number
}

export interface TaskListProps {
    name: string,
    price: string,
    type: string,
    ratesList: RateList[]
    listkey: number,
    checked: boolean
}
