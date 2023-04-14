const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL

export async function getTodos(authToken) {
    const result = await fetch(backend_base+"/todo", {
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    let todos = await result.json()
    todos = todos.sort((a, b) => 
        a.createdOn < b.createdOn ? 1 : (a.createdOn > b.createdOn ? -1 : 0))
    return await result.json()
}

export async function addTodo(authToken, content) {
    const result = await fetch(backend_base+"/todo", {
        "method": "POST",
        'headers': 
        {'Authorization': 'Bearer ' + authToken,
         'Content-Type': 'application/json'
        },
        "body": JSON.stringify({content: content, done: false, createdOn: new Date()})
    })
    const ret = await result.json()
    console.log(ret)
    return ret
}

export async function deleteTodo(authToken, todo) {
    const result = await fetch(backend_base+"/todo/"+todo._id,{
        'method':'DELETE',
        'headers': {'Authorization': 'Bearer ' + authToken},
    })
    return await result.json();
}

export async function toggleTodoStatus(authToken, todo) {
    todo.done = !todo.done
    const result = await fetch(backend_base+"/todo/"+todo._id, {
        'method': 'PUT',
        'headers': {'Authorization': 'Bearer ' + authToken,
                    'Content-Type': 'application/json'},
        'body': JSON.stringify(todo)
    })
    return await result.json()
}

export async function updateTodoContent(authToken, todo, newContent) {
    todo.content = newContent
    const result = await fetch(backend_base+"/todo/"+todo._id, {
        'method': 'PUT',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify(todo)
    })
    return await result.json()
}
export async function getTodo(authToken, id) {
    const result = await fetch(backend_base+"/todo/"+id, {
        'method': 'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    if (result.ok) {
        const item = await result.json()
        // console.log(item)
        return item
    }
    return null
}

export async function getDoneTodos(authToken) {
    const result = await fetch(backend_base+"/todo", {
        'method': 'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    if (result.ok) {
        const items = await result.json()
        let done_items = items.filter((item) => item.done)
        done_items = done_items.sort((a, b) => 
            a.createdOn < b.createdOn ? 1 : (a.createdOn > b.createdOn ? -1 : 0)
        )
        return done_items
    }
    return null
}

export async function getUndoneTodos(authToken) {
    const result = await fetch(backend_base+"/todo", {
        'method': 'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    if (result.ok) {
        const items = await result.json()
        let undone_items = items.filter((item) => !item.done)
        undone_items = undone_items.sort((a, b) => 
            a.createdOn < b.createdOn ? 1 : (a.createdOn > b.createdOn ? -1 : 0)
        )
        console.log(undone_items)
        return undone_items
    }
    return null
}

