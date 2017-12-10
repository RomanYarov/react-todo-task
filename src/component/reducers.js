import { Events } from './action'

const initialState = {
    visibilityFilter: 'all',
    allItem:[],
    listItem:[]
};

export default function taskReducer(state = Object.assign({}, initialState), action) {
    let newItems = [];
    switch (action.type){
        case Events.ADD_TASK:
            newItems = [...state.allItem, action.payload];
            return {
                ...state,
                allItem: newItems,
                listItem: filterFn(newItems)
            };

        case Events.DELETE_TASK:
            newItems = state.allItem.filter(item => item.id !== action.payload.id);
            return {
                ...state,
                allItem: newItems,
                listItem: filterFn(newItems)
            };

        case Events.EDIT_TASK:
            return {
                ...state,
                editItem: state.allItem.filter(item => item.id === action.payload.id)[0]
            };

        case Events.CLEAR_EDIT:
            delete state.editItem;
            return {
                ...state
            };

        case Events.UPDATE_TASK:
            if(state.editItem) {
                delete state.editItem;
            }
            newItems = [...state.allItem.filter(item => item.id !== action.payload.id), action.payload];

            return {
                ...state,
                allItem: newItems,
                listItem: filterFn(newItems)
            };

        case Events.TOGGLE_ITEM:
            return {...state,
                allItem: state.allItem.map(item => {
                    if (item.id === action.payload.id) {
                        item.completed = !item.completed;
                        if(item.completed)
                            item.dataImportant = action.payload.nowData;
                        else
                            item.dataImportant = '';
                    }
                    return item;
                }),
                listItem: filterFn(state.allItem)
            };

        case Events.FILTER_ITEMS:
            return {
                ...state,
                visibilityFilter: action.filter,
                listItem: filterFn(state.allItem, action.filter)
            };

        default:
            return state;
    }

    function filterFn(list, typeFilter = state.visibilityFilter){
        let newList = [];
        if(typeFilter !== "all"){

             newList = list.filter(item => item.important === typeFilter);

            return newList;
        }
        else
            return list;
    }
}