import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {filterValuesType} from "../../App";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    changeFilter: (value: filterValuesType) => void
    addTasks: (title: string) => void
}

export function TodoList(props: PropsType) { // props ={ title = What to learn, tasks:[] }return
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        // e.currentTarget.value элемент с которым произошло событие
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addTasks(newTaskTitle);
            setNewTaskTitle("");
        }
    }
    const addTask = () => {
        props.addTasks(newTaskTitle);
        setNewTaskTitle("");// отчишаем строку
    }
    const onAllClickHandler = () => {
        props.changeFilter("all")
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active")
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed")
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>+
                </button>
            </div>
            <ul>
                {
                    props.tasks.map((t) => { //метод массива map пробегает по массиву tasks  и отрисовывает его
                        const onRemoveHandler = () => {
                            props.removeTask(t.id)
                        }
                        return <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    })
                }

            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}

// export default TodoList;