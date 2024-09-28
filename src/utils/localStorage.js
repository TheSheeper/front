const save = (key, item)=>{
    localStorage.setItem(key, JSON.stringify(item))
}

const clear = ()=>{
    localStorage.clear()
}

const getCredentials = ()=>{
    const credentials = JSON.parse(localStorage.getItem('credentials'))
    return credentials
}

export {save, clear, getCredentials}