import { useRouter } from "next/router";
import HeaderBar from "@/components/HeaderBar";
import { useAuth } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";
import 'bulma/css/bulma.min.css';
import Link from 'next/link';
import {
    getTodos, 
    addTodo, 
    deleteTodo, 
    toggleTodoStatus,
    updateTodoContent, 
    getTodo, 
    getDoneTodos, 
    getUndoneTodos,
    updateTodoCategory,
    addCategory
} from "@/modules/db"

export default function SingleTodo({ id }) {
    const { isLoaded, userId, sessionId, getToken } = useAuth()
    const [loading, setLoading] = useState(true)
    const [todo, setTodo] = useState(null)
    const [updatedContent, setUpdatedContent] = useState("")
    const [updatedCategory, setUpdatedCategory] = useState("")


    useEffect(() => {
        async function process() {
            if (userId) {
                const token = await getToken({ template: 'codehooks' })
                setTodo(await getTodo(token, id))
                setLoading(false)
            }
        }
        process()
    }, [isLoaded])

    console.log(todo)


    async function del(todo) {
        const token = await getToken({ template: 'codehooks'})
        try { 
            await deleteTodo(token, todo) 
        } catch(e) { console.log(e) }
    }

    async function toggle(todo) {
        const token = await getToken({template: 'codehooks'})
        try {
            await toggleTodoStatus(token, todo)
        } catch(e) { console.log(e) }
    }

    async function update(todo, newContent) {
        const token = await getToken({template: 'codehooks'})
        try {
            await updateTodoContent(token, todo, newContent)
        } catch(e) { console.log(e) }
    }

    async function uCat(todo, newCategory) {
        const token = await getToken({template: 'codehooks'})
        try {
            await updateTodoCategory(token, todo, newCategory)
            const addedCategory = await addCategory(token, newCategory)
        } catch(e) { console.log(e) }
    }

    if (todo) {
        return (
            <>
                <div className="card is-info">
                    <div className="card-content">
                        <div className="content">
                            <table 
                                className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                                {/* <tr>
                                    <th>ID</th>
                                    <td>{todo._id}</td>
                                </tr> */}
                                <tr>
                                    <th>Content</th>
                                    <td>
                                        <textarea 
                                        className="input is-primary"
                                        onChange={(e) => setUpdatedContent(e.target.value)}>
                                            {todo.content}
                                        </textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Status</th>
                                    <td>{todo.done ? "Done" : "Not Done"}</td>
                                </tr>
                                <tr>
                                    <th>Created on</th>
                                    <td>
                                        {todo.createdOn.split("T")[0] + " at " + todo.createdOn.split("T")[1].split(".")[0]}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Category</th>
                                    <td>
                                        <textarea
                                        className="input is-secondary"
                                        onChange={(e) => setUpdatedCategory(e.target.value)}>
                                            {todo.category}
                                        </textarea>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <footer className="card-footer">
                        <Link
                        className="card-footer-item button is-danger is-light is-small is-responsive" 
                        href="/todos"
                        onClick={() => del(todo)}>
                            Delete Todo Item
                        </Link>
                        <Link
                        href="/todos"
                        className="card-footer-item button is-warning is-light is-small is-responsive"
                        onClick={() => toggle(todo)}>Toggle Todo Status(Mark as Done or Not Done)</Link>
                        <Link
                        href="/todos"
                        className="card-footer-item button is-link is-light is-small is-responsive"
                        onClick={() => update(todo, updatedContent)}>Update Todo Content</Link>
                        <Link
                        href="/todos"
                        className="card-footer-item button is-info is-light is-small is-responsive"
                        onClick={() => uCat(todo, updatedCategory)}>
                            Update Todo Category
                        </Link>
                    </footer>
                </div>
            </>
        )
    } else {
        return <></>
    }
}