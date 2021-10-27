const defaultState = {
    inputValue: '',
}

export default (state = defaultState,action) => {

    console.log(state,action)

    //reducers里只能接受state，不能改变state
    
    if(action.type === 'SEARCH'){
        let newState = JSON.parse(JSON.stringify(state))
        newState.inputValue = action.value
        return newState
    }

    return state
}