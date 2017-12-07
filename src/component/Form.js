import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import * as getCategoriesList from "./action";
import './Form.css';

class TaskForm extends Component {
    componentWillMount(){
        this.setState({
            id: 0,
            taskName: '',
            taskText: '',
            important: 'normal',
            dataComplete: moment(),
            dataImportant: '',
            completed: '',
            btnSubmitName: 'Добавить'
        });
    }

    componentWillReceiveProps(newProps){
        this.setState(newProps.editItem);
        this.setState({btnSubmitName: 'Изменить'});
    }

    handleNameChange = (event) => {
        this.setState({taskName: event.target.value});
    };

    handleTextChange = (event) => {
        this.setState({taskText: event.target.value});
    };

    handleImportantChange = (event) => {
        this.setState({important: event.target.value});
    };

    handleDataComplete = (date) => {
        this.setState({dataComplete: moment(date).toString()});
    };

    handleClearForm = () => {
        this.setState({id: 0, taskName:'',taskText:'', important: 'normal', dataComplete: moment(), dataImportant: '', btnSubmitName: "Добавить"});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        let fieldsState = this.state;

        if(this.state.btnSubmitName === 'Добавить')
            this.props.getCategoriesListAction.addTodo(fieldsState);
        else
            this.props.getCategoriesListAction.updateTodo(fieldsState);

        /* затираем локальый стейт */
        this.setState({id: 0, taskName:'',taskText:'', important: 'normal', dataComplete: moment(), dataImportant: '', btnSubmitName: "Добавить"});
    };

    validate(){
        if(this.state.taskName && this.state.taskText){
            return true
        }
    }

    render() {
        return (
            <div className='contain_form'>
                <form onSubmit={this.handleSubmit}>
                    <div className='contain_form_input'>
                        <input
                            type= "text"
                            value={this.state.taskName}
                            onChange={this.handleNameChange}
                            className='task_name'
                            placeholder='Имя задачи'
                        />
                        <textarea
                            value={this.state.taskText}
                            onChange={this.handleTextChange}
                            className='task_text'
                            placeholder='Текст задачи'
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
                                <select value={this.state.important} onChange={this.handleImportantChange} className='task_important'>
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
                            value={this.state.btnSubmitName}
                            disabled={!this.validate()}
                            className='btn_form_add'
                        />
                    </div>
                </form>
            </div>
        );
    }
}

/*фун-я прокид-ет redux-store в компонент ч/з props*/
const mapStateToProps = ({task = {}}) => {
    const { editItem } = task;

    return {
        editItem
    };
};

/*фун-я прокид-ет action в компонент ч/з props*/
/* dispatch - позволяет отправлять 'action' в 'store' */
const mapDispatchToProps = dispatch =>({
    getCategoriesListAction:bindActionCreators(getCategoriesList, dispatch),
});

// определяет какие св-ва из state попадут в TaskForm (в property application)
export default connect(
    mapStateToProps,
    mapDispatchToProps
) (TaskForm);