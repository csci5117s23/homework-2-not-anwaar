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
    getCategories,
    addCategory,
    deleteCategory
} from "@/modules/db"
import { useAuth } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";
import 'bulma/css/bulma.min.css';
import Link from 'next/link';

export default function TodoEditor() {
    const [loading, setLoading]= useState(true)
    const [todos, setTodos] = useState([])
    const { isLoaded, userId, sessionId, getToken } = useAuth()
    const [newContent, setNewContent] = useState("")

    const [categories, setCategories] = useState([])
    const [newCategoryName, setNewCategoryName] = useState("")

    useEffect(() => {
        async function process() {
            if (userId) {
                const token = await getToken({ template: 'codehooks' })
                setTodos(await getUndoneTodos(token))
                setCategories(await getCategories(token))
                setLoading(false)
            }
        }
        process()
    }, [isLoaded])

    async function add() {
        const token = await getToken({ template: 'codehooks' })
        const newTodo = await addTodo(token, newContent)
        setTodos(await getUndoneTodos(token))
    }

    async function del(todo) {
        const token = await getToken({ template: 'codehooks'})
        try { 
            await deleteTodo(token, todo) 
        } catch(e) { console.log(e) }
        setTodos(await getUndoneTodos(token))
    }

    async function toggle(todo) {
        const token = await getToken({template: 'codehooks'})
        try {
            await toggleTodoStatus(token, todo)
        } catch(e) { console.log(e) }
        setTodos(await getUndoneTodos(token))
    }

    async function addCat() {
        const token = await getToken({ template: 'codehooks' })
        const newCategory = await addCategory(token, newCategoryName)
        setCategories(await getCategories(token))
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
        // console.log(todos)
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
                     onClick={() => toggle(todo)}> Mark as done</button>
                    <Link /** fake button, for the aesthetic */
                     className="card-footer-item button is-info is-light is-small is-responsive" 
                     href={"/todo/"+todo._id}>More Info</Link>
                </footer>
            </div>
        ))
        // console.log(todoListItems)
        let categoryItems = categories.map((category) => (
            <div className="notification is-small is-success is-light">
                <button className="delete is-small" onClick={() => delCat(category)}></button>
                <Link href={"/todos/"+category.name}>{category.name}</Link>
            </div>
        ))
        return (
            <>
                <div className="todo-items-container">
                    <div className="user-input">
                        <input
                        placeholder="Add a New Todo Item"
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        onKeyDown={(e) => {if (e.key == 'Enter') add()}}
                        className="input is-primary"
                        ></input>
                        <input
                        placeholder="Add a new category"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        className="input is-secondary"></input>
                        <button 
                        onClick={function() {
                            add()
                            addCat()
                        }} 
                        className="button is-primary">
                            Add to the List
                        </button>
                    </div>
                    {categoryItems}
                    {todoListItems}
                </div>
            </>
        )
    }
}