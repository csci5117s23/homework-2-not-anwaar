import {
    getTodos, 
    addTodo, 
    deleteTodo, 
    toggleTodoStatus,
    updateTodoContent, 
    getTodo, 
    getDoneTodos, 
    getUndoneTodos,
    getDoneTodosByCategory,
    getUndoneTodosByCategory,
    getCategories
} from "@/modules/db"
import { useAuth } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";
import 'bulma/css/bulma.min.css';
import Link from 'next/link';

export default function FilterUndoneByCategory({ category }) {
    const [loading, setLoading]= useState(true)
    const [todos, setTodos] = useState([])
    const { isLoaded, userId, sessionId, getToken } = useAuth()

    useEffect(() => {
        async function process() {
            if (userId) {
                const token = await getToken({ template: 'codehooks' })
                setTodos(await getUndoneTodosByCategory(token, category))
                setLoading(false)
            }
        }
        process()
    }, [isLoaded])

    async function del(todo) {
        const token = await getToken({ template: 'codehooks'})
        try { 
            await deleteTodo(token, todo) 
        } catch(e) { console.log(e) }
        setTodos(await getUndoneTodosByCategory(token, category))
    }

    async function toggle(todo) {
        const token = await getToken({template: 'codehooks'})
        try {
            await toggleTodoStatus(token, todo)
        } catch(e) { console.log(e) }
        setTodos(await getUndoneTodosByCategory(token, category))
    }

    if (loading) { return <span>Loading Todos...</span> }
    else {
        const todoListItems = todos.map((todo) => (
            <div className="card is-info todo-item">
                <div className="card-content">
                    <div className="content todo-main-content">
                        {todo.content}
                    </div>
                </div>
                <footer className="card-footer">
                    <button 
                     className="card-footer-item button is-danger is-light is-small is-responsive" 
                     onClick={() => del(todo)}>
                        Delete Todo Item
                    </button>
                    <button
                     className="card-footer-item button is-success is-light is-small is-responsive"
                     onClick={() => toggle(todo)}>Mark as Done</button>
                    <Link /** fake button, for the aesthetic */
                     className="card-footer-item button is-info is-light is-small is-responsive" 
                     href={"/todo/"+todo._id}>More Info</Link>
                </footer>
            </div>
        ))
        return (
            <div className="todo-items-container">
                {todoListItems}
            </div>
        )
    }
}