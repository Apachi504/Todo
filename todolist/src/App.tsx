import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {TasksType, TodoList} from './components/TodoList/TodoList'
import {v1} from "uuid";

// export function Counter() {
//     let arr = useState(5);
//     let data = arr[0];
//     let setData = arr[1];
//
//     return <div onClick={() => {
//         setData(data + 1)
//     }}>{data}</div>
// }
export type filterValuesType = "all" | "completed" | "active";

function App() { // App не принимает не каких данных  и его отрисовка зависит только от которые меняются в 41 строке

    // useState преднозначен для перерисовки страницы
    // let arr = useState(initTasks); //используем hook useState
    // let tasks = arr[0];// присваиваем начальное значение массива где arr[0] = {id: 1, title: "CSS&HTML", isDone: true},
    // let setTasks = arr[1]; // устанавливаем значение setTask = arr[1]
// тоже самое что и
    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: "CSS&HTML", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Redax", isDone: false}
    ]);

    let [filter, setFilter] = useState<filterValuesType>("all");


    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id) // используем метод массива filter для поиска по id
        setTasks(filteredTasks); // присваиваем к SetTask

        // tasks = tasks.filter((t) => {
        //     if (t.id !== id) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // })
    }

    function changeFilter(value: filterValuesType) {
        setFilter(value);
    }

    function addTasks(title: string) { // Добавление новой таски
        let newTask = {id: v1(), title: title, isDone: false};//Создаем новый обект таски
        let newTasks = [newTask, ...tasks];// Добавляем новую таску в массив тасок
        setTasks(newTasks);
    }

    let taskForTodoList = tasks;
    if (filter === "completed") {
        taskForTodoList = tasks.filter(t => t.isDone === true);
    }
    if (filter === "active") {
        taskForTodoList = tasks.filter(t => t.isDone === false);

    }
    return (
        <div className="App">
            <TodoList title={"What to learn"} tasks={taskForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTasks={addTasks}
            />
        </div>
    );
}


export default App;
