export const Events = {
    ADD_TASK: 'ADD_TASK',
    EDIT_TASK: 'EDIT_TASK',
    DELETE_TASK: 'DELETE_TASK',
    TOGGLE_ITEM: 'TOGGLE_ITEM',
    UPDATE_TASK: 'UPDATE_TASK',
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

export function toggleTodo(dataItem) {
    return (dispatch) =>{
        return dispatch({
            type: Events.TOGGLE_ITEM,
            payload: {
                id: dataItem.id,
                completed: dataItem.completed,
                dataImportant: dataItem.dataImportant
            }


        })
    }
}

export function filterItems(typeFilter) {
    return (dispatch) =>{
        return dispatch({
            type: Events.FILTER_ITEMS,
            payload: { typeFilter }
        })
    }
}