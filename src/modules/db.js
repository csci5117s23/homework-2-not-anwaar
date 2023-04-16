const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL

export async function getTodos(authToken) {
    const result = await fetch(backend_base+"/todo", {
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    let todos = await result.json()
    todos = todos.sort((a, b) => 
        a.createdOn < b.createdOn ? 1 : (a.createdOn > b.createdOn ? -1 : 0))
    return todos
}

export async function addTodo(authToken, content, category="") {
    const result = await fetch(backend_base+"/todo", {
        "method": "POST",
        'headers': 
        {'Authorization': 'Bearer ' + authToken,
         'Content-Type': 'application/json'
        },
        "body": JSON.stringify({content: content, done: false, category: category, createdOn: new Date()})
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

export async function getDoneTodosByCategory(authToken, category) {
    const result = await fetch(backend_base+"/todo", {
        'method': 'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    if (result.ok) {
        const items = await result.json()
        console.log(items)
        let done_items = items.filter((item) => item.done && item.category == category)
        done_items = done_items.sort((a, b) => 
            a.createdOn < b.createdOn ? 1 : (a.createdOn > b.createdOn ? -1 : 0)
        )
        return done_items
    }
    return null
}

export async function getUndoneTodosByCategory(authToken, category) {
    const result = await fetch(backend_base+"/todo", {
        'method': 'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    if (result.ok) {
        const items = await result.json()
        console.log(items)
        let undone_items = items.filter((item) => !item.done && item.category == category)
        undone_items = undone_items.sort((a, b) => 
            a.createdOn < b.createdOn ? 1 : (a.createdOn > b.createdOn ? -1 : 0)
        )
        console.log(undone_items)
        return undone_items
    }
    return null
}

export async function getCategories(authToken) {
    const result = await fetch(backend_base+"/categories", {
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    let categories = await result.json()
    return categories
}

export async function getCategoryNames(authToken) {
    const result = await fetch(backend_base+"/categories", {
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    let categories = await result.json()
    let categoryNames = categories.map((category) => category.name)
    categoryNames = [...new Set(categoryNames)]
    return categoryNames
}

export async function addCategory(authToken, category) {
    const result = await fetch(backend_base+"/categories", {
        "method": "POST",
        'headers': 
        {'Authorization': 'Bearer ' + authToken,
         'Content-Type': 'application/json'
        },
        "body": JSON.stringify({name: category})
    })
    const ret = await result.json()
    console.log(ret)
    return ret
}

export async function deleteCategory(authToken, category) {
    const result = await fetch(backend_base+"/categories/"+category._id,{
        'method':'DELETE',
        'headers': {'Authorization': 'Bearer ' + authToken},
    })
    return await result.json();
}

export async function updateTodoCategory(authToken, todo, newCategory) {
    todo.category = newCategory
    const result = await fetch(backend_base+"/todo/"+todo._id, {
        'method': 'PUT',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify(todo)
    })
    return await result.json()
}
