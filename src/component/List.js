import React, { Component } from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as getCategoriesList from './action';
import './List.css'

class TaskList extends Component {
    handleDelTask (id) {
        console.log('ups click DELETE?!');
        this.props.getCategoriesListAction.delTodo(id);
    }

    handleOnToggle(dataItem) {
        this.props.getCategoriesListAction.toggleTodo(dataItem);
    }

    handleEditTask(id) {
        this.props.getCategoriesListAction.editTodo(id);
    };

    handleFilterItems = (event) =>{
        event.preventDefault();

        this.props.getCategoriesListAction.filterItems(event.target.name);
    };

    handleDataFormat = (data)=>{
        if(data){
            let _data = new Date(data);
            let dd = _data.getDate();
            let mm = modData(_data.getMonth()+1);
            let yyyy = modData(_data.getFullYear());
            let hh = modData(_data.getHours());
            let m = modData(_data.getMinutes());

            function modData (val) {
                return (val < 10 ? '0' + val: val);
            }

            return(`${hh}:${m} | ${dd}.${mm}.${yyyy}`);
        }else
            return '';
    };

    completeClass = (completed, dataCompleted) => {
        let str = 'list_group';
        if(completed){
            str+=' list_complete';
        }
        if((new Date(dataCompleted).getTime() < new Date().getTime()) && !completed){
            str+=' list_delayComplete';
        }
        return str;
    };

    render() {
        const { listItem = [], editItem = {} } = this.props.task;
        console.log('new sate',listItem);
        return (
            <div>
                <div className='list_filter'>
                    <button onClick = {this.handleFilterItems} name = 'all'>Все</button>
                    <button onClick = {this.handleFilterItems} name = 'normal'>Обычные</button>
                    <button onClick = {this.handleFilterItems} name = 'important'>Важные</button>
                    <button onClick = {this.handleFilterItems} name = 'veryImportant'>Очень важные</button>
                </div>
                <ul>
                    {listItem.map((task, index) =>
                        <li key = {index} className = { this.completeClass(task.completed, task.dataComplete) }>
                            <div className='list_title'>
                                <h3>{task.taskName}</h3>
                            </div>
                            <div className='list_content'>
                                <p>{task.taskText}</p>
                                <p className='list_content_complete'>Сроки выполнения {this.handleDataFormat(task.dataComplete)}</p>
                                <p className='list_content_important'>Значимость: {task.important === 'normal' ? 'обычная': task.important === 'important' ? 'важная': 'очень важная'} <br /></p>
                            </div>
                            <div className='list_content_bottom'>
                                <button onClick={this.handleEditTask.bind(this, task.id, editItem)} className='list_btnEdit'>Изменить</button>
                                <button onClick={this.handleDelTask.bind(this, task.id)} className='list_btnDel'>Удалить</button>
                                <label className='list_btnComplete'>
                                    <time className='list_dataImportant'>{this.handleDataFormat(task.dataImportant)}</time>
                                    <span>&#10004;</span>
                                    <input
                                        className='list_toggle'
                                        type='checkbox'
                                        checked={task.completed}
                                        onChange={this.handleOnToggle.bind(this, task)}
                                    />
                                </label>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = ({task = {}}) => {
    return {task};
};

const mapDispatchToProps = dispatch =>({
    getCategoriesListAction:bindActionCreators(getCategoriesList, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (TaskList);