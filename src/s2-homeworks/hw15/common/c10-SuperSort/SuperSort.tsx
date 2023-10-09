import React from 'react'
import noneI from './down.jpg'
import upI from './up.jpg'
import downI from './sort.jpg'

// добавить в проект иконки и импортировать
const downIcon = downI
const upIcon = upI
const noneIcon = noneI

export type SuperSortPropsType = {
    id?: string
    sort: string
    value: string
    onChange: (newSort: string) => void
}

export const pureChange = (sort: string, down: string, up: string) => {
    if (sort === '') return down
    if (sort === down) return up
    if (sort === up) return '' // исправить
    else return down
    // пишет студент, sort: (click) => down (click) => up (click) => '' (click) => down ...
    // return up // исправить
}

const SuperSort: React.FC<SuperSortPropsType> = (
    {
        sort, value, onChange, id = 'hw15',
    }
) => {
    const up = '0' + value
    const down = '1' + value

    const onChangeCallback = () => {
        onChange(pureChange(sort, down, up))
    }

    const icon = sort === down
        ? downIcon
        : sort === up
            ? upIcon
            : noneIcon

    return (
        <span
            id={id + '-sort-' + value}
            onClick={onChangeCallback}
        >
            сделать иконку
            <img
                id={id + '-icon-' + sort}
                src={icon}
            />


        </span>
    )
}

export default SuperSort
