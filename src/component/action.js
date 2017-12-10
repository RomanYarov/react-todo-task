export const Events = {
    ADD_TASK: 'ADD_TASK',
    EDIT_TASK: 'EDIT_TASK',
    DELETE_TASK: 'DELETE_TASK',
    CLEAR_EDIT: 'CLEAR_EDIT',
    UPDATE_TASK: 'UPDATE_TASK',
    TOGGLE_ITEM: 'TOGGLE_ITEM',
    FILTER_ITEMS: 'FILTER_ITEMS'
};

export function addTodo(fieldsState){
    return (dispatch) =>{
        return dispatch({
            type: Events.ADD_TASK,
            payload: {
                id: (fieldsState.id === 0 ? Date.now().toString(): fieldsState.id),
                taskName: fieldsState.taskName,
                taskText: fieldsState.taskText,
                important: fieldsState.important,
                dataComplete: fieldsState.dataComplete,
                dataImportant: fieldsState.dataImportant,
                completed: false
            }
        });
    };
}

export function delTodo(id){
    return (dispatch) =>{
        return dispatch({
            type: Events.DELETE_TASK,
            payload: { id }
        });
    };
}

export function editTodo(id){
    return (dispatch) =>{
        return dispatch({
            type: Events.EDIT_TASK,
            payload: { id }
        });
    };
}

export function updateTodo(fieldsState){
    return (dispatch) =>{
        return dispatch({
            type: Events.UPDATE_TASK,
            payload: {
                id: fieldsState.id,
                taskName: fieldsState.taskName,
                taskText: fieldsState.taskText,
                important: fieldsState.important,
                dataComplete: fieldsState.dataComplete,
                dataImportant: fieldsState.dataImportant,
                completed: fieldsState.completed
            }
        });
    };
}

export function clearTodo(){
    return (dispatch) =>{
        return dispatch({
            type: Events.CLEAR_EDIT
        });
    };
}

export function toggleTodo(dataItem) {
    return (dispatch) =>{
        return dispatch({
            type: Events.TOGGLE_ITEM,
            payload: {
                id: dataItem.id,
                completed: dataItem.completed,
                nowData: Date.now()
            }


        })
    }
}

export function filterItems(typeFilter) {
    return (dispatch) =>{
        return dispatch({
            type: Events.FILTER_ITEMS,
            filter: typeFilter
        })
    }
}