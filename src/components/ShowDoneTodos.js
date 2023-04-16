import {
    getTodos, 
    addTodo, 
    deleteTodo, 
    toggleTodoStatus,
    updateTodoContent, 
    getTodo, 
    getDoneTodos, 
    getUndoneTodos,
    getCategories
} from "@/modules/db"
import { useAuth } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";
import 'bulma/css/bulma.min.css';
import Link from 'next/link';


export default function ShowDoneTodos() {
    const [loading, setLoading]= useState(true)
    const [todos, setTodos] = useState([])
    const { isLoaded, userId, sessionId, getToken } = useAuth()
    const [categories, setCategories] = useState([])


    useEffect(() => {
        async function process() {
            if (userId) {
                const token = await getToken({ template: 'codehooks' })
                setTodos(await getDoneTodos(token))
                setCategories(await getCategories(token))
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
        setTodos(await getDoneTodos(token))
    }

    async function toggle(todo) {
        const token = await getToken({template: 'codehooks'})
        try {
            await toggleTodoStatus(token, todo)
        } catch(e) { console.log(e) }
        setTodos(await getDoneTodos(token))
    }

    async function delCat(category) {
        const token = await getToken({ template: 'codehooks'})
        try {
            await deleteCategory(token, category)
        } catch(e) { console.log(e) }
        setCategories(await getCategories(token))
    }

    if (loading) { return <span>Loading Todos...</span> }
    else {
        const todoListItems = todos.map((todo) => (
            <div className="card is-info todo-item done-todo-item">
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
                     className="card-footer-item button is-warning is-light is-small is-responsive"
                     onClick={() => toggle(todo)}> Mark as not done</button>
                    <Link /** fake button, for the aesthetic */
                     className="card-footer-item button is-info is-light is-small is-responsive" 
                     href={"/todo/"+todo._id}>More Info</Link>
                </footer>
            </div>
        ))
        const uniqueCategories = [...new Map(categories.map((category) => [category.name, category])).values()] //remove duplicate items from categories array
        let categoryItems = uniqueCategories.map((category) => (
            <div className="notification is-small is-success is-light">
                <button className="delete is-small" onClick={() => delCat(category)}></button>
                <Link href={"/done/"+category.name}>{category.name}</Link>
            </div>
        ))
        return (
            <div className="todo-items-container">
                {categoryItems}
                {todoListItems}
            </div>
        )
    }
}