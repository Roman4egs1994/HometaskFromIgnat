import React, {useState} from 'react'
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
import {restoreState} from '../hw06/localStorage/localStorage'
import s from './Clock.module.css'

function Clock() {
    const [timerId, setTimerId] = useState<number | undefined>(undefined)
    // for autotests // не менять // можно подсунуть в локалСторэдж нужную дату, чтоб увидеть как она отображается
    const [date, setDate] = useState<Date>(new Date(restoreState('hw9-date', Date.now())))
    const [show, setShow] = useState<boolean>(false)

    const start = () => {
        // пишут студенты // запустить часы (должно отображаться реальное время, а не +1)
        // сохранить ид таймера (https://learn.javascript.ru/settimeout-setinterval#setinterval)


        const timerId = window.setInterval(()=> {
            setDate(new Date())
        },1000)
        setTimerId(timerId)

    }

    const stop = () => {
        if(timerId){
            window.clearInterval(timerId)
            setTimerId(undefined)
        }
        // пишут студенты // поставить часы на паузу, обнулить ид таймера (timerId <- undefined)
    }

    const onMouseEnter = () => { // пишут студенты // показать дату если наведена мышка
        setShow(true)
    }
    const onMouseLeave = () => { // пишут студенты // спрятать дату если мышка не наведена
        setShow(false)
    }


    //настройка часов, минут, секунд
    const formatTime = new Intl.DateTimeFormat("en-US",{
        hour: "numeric",
        hour12: false,
        minute: "numeric",
        second: "numeric"
    })

    // toLocaleTimeString()
    const stringTime = formatTime.format(date) || <br/> // часы24:минуты:секунды (01:02:03)/(23:02:03)/(24:00:00)/(00:00:01) // пишут студенты


    //Настройка дня, месяца, года (скрытое)
    // const formatDate = new Intl.DateTimeFormat("en-US",{
    //     day: "2-digit",
    //     month: 'numeric',
    //     year: "numeric"
    // })

    // date.toLocaleDateString()
    const stringDate = date.toLocaleDateString() || <br/> // день.месяц.год (01.02.2022) // пишут студенты, варианты 01.02.0123/01.02.-123/01.02.12345 не рассматриваем

    // const stringTime = 'date->time' || <br/> // часы24:минуты:секунды (01:02:03)/(23:02:03)/(24:00:00)/(00:00:01) // пишут студенты
    // const stringDate = 'date->date' || <br/> // день.месяц.год (01.02.2022) // пишут студенты, варианты 01.02.0123/01.02.-123/01.02


    // день недели на английском, месяц на английском (https://learn.javascript.ru/intl#intl-datetimeformat)
    // const stringDay = 'date->day' || <br/> // пишут студенты


    //НАСТРОЙКА ДНЯ
    const formatDay = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
    })
    const stringDay = formatDay.format(date) || <br/> // пишут студенты


    //Настройка месяца (скрыто)
    const formatMonth = new  Intl.DateTimeFormat("en-US", {
        month: "long"
    })
    const stringMonth = formatMonth.format(date) || <br/> // пишут студенты

    return (
        <div className={s.clock}>
            <div
                id={'hw9-watch'}
                className={s.watch}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                {/*ДЕНЬ*/}
                <span id={'hw9-day'}>{stringDay}</span>,{' '}
                {/*ВРЕМЯ*/}
                <span id={'hw9-time'}>
                    <strong>{stringTime}</strong>
                </span>
            </div>

            <div id={'hw9-more'}>
                <div className={s.more}>
                    {show ? (
                        <>
                            <span id={'hw9-date'}>{stringDate}</span>,{' '}
                            <span id={'hw9-month'}>{stringMonth}</span>
                        </>
                    ) : (
                        <>
                            <br/>
                        </>
                    )}
                </div>
            </div>

            <div className={s.buttonsContainer}>
                <SuperButton
                    id={'hw9-button-start'}
                    disabled={!!timerId} // пишут студенты // задизэйблить если таймер запущен
                    onClick={start}
                >
                    start
                </SuperButton>
                <SuperButton
                    id={'hw9-button-stop'}
                    disabled={!timerId} // пишут студенты // задизэйблить если таймер не запущен
                    onClick={stop}
                >
                    stop
                </SuperButton>
            </div>
        </div>
    )
}

export default Clock