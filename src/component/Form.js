import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import * as getCategoriesList from "./action";
import './Form.css';

const INIT_STATE = {id: 0, taskName:'',taskText:'', important: 'normal', dataComplete: moment(), dataImportant: '', statusItem: 'add'};

class TaskForm extends Component {
    componentWillMount(){
        this.setState(INIT_STATE);
    }

    componentWillReceiveProps(newProps){
        this.setState({...newProps.editItem, statusItem: (newProps.editItem ? 'edit': 'add')});
    }

    handleDataChange = (event) => {
        const data = {};
        data[event.target.name] =  event.target.value;
        this.setState(data);
    };

    handleDataComplete = (date) => {
        this.setState({dataComplete: moment(date).toString()});
    };

    handleClearForm = () => {
        this.setState(INIT_STATE);
        this.props.getCategoriesListAction.clearTodo();
    };

    handleSubmit = (event) => {
        event.preventDefault();
        let fieldsState = this.state;

        if(event.target.id === 'add') {
            this.props.getCategoriesListAction.addTodo(fieldsState);
        }else{
            console.log('click edit');
            this.props.getCategoriesListAction.updateTodo(fieldsState);
        }

        this.handleClearForm();
    };

    validate(){
        if(this.state.taskName && this.state.taskText){
            return true
        }
    }

    render() {
        return (
            <div className='contain_form'>
                <form onSubmit={this.handleSubmit} id={this.state.statusItem}>
                    <div className='contain_form_input'>
                        <input
                            type= "text"
                            value={this.state.taskName}
                            onChange={this.handleDataChange}
                            className='task_name'
                            name = 'taskName'
                            placeholder='Имя задачи'
                        />
                        <textarea
                            value={this.state.taskText}
                            onChange={this.handleDataChange}
                            className='task_text'
                            placeholder='Текст задачи'
                            name = 'taskText'
                        />
                        <div className='task_group_case'>
                            <div className='task_group_date'>
                                <p>Срок выполнения</p>
                                <DatePicker
                                    className='task_dataComplete'
                                    selected = {moment(new Date(this.state.dataComplete))}
                                    onChange={this.handleDataComplete}

                                    shouldCloseOnSelect={true} //срывать при выборе даты
                                    showTimeSelect

                                    locale="en-gb"
                                    dateFormat="DD.MM.YYYY HH:mm"
                                    placeholderText='выбор даты'
                                />
                            </div>
                            <label>
                                Важность
                                <select value={this.state.important} onChange={this.handleDataChange} name='important' className='task_important'>
                                    <option value="normal">ОБЫЧНАЯ</option>
                                    <option value="important">ВАЖНАЯ</option>
                                    <option value="veryImportant">ОЧЕНЬ ВАЖНАЯ</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    <div className='btn_form'>
                        <input
                            type="button"
                            onClick={this.handleClearForm}
                            value='Отмена'
                            disabled={!this.validate()}
                            className='btn_form_cancel'
                        />
                        <input
                            type="submit"
                            value={this.state.statusItem === 'add' ? 'Добавить': 'Изменить'}
                            disabled={!this.validate()}
                            className='btn_form_add'
                        />
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = ({task = {}}) => {
    const { editItem } = task;

    return {
        editItem
    };
};

const mapDispatchToProps = dispatch =>({
    getCategoriesListAction:bindActionCreators(getCategoriesList, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (TaskForm);