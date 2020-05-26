import React from "react";
import "../../main.css"
import "../../input.css"
import {IProps, IState} from  "./ISign_InForm"
import Field from "../../Molecules/Field/Field";
import {post} from "../../Router";
import * as ROUTES from "../../../config/routes"
import {Redirect} from "react-router-dom"
import Form from "../Form/Form";
import {Validators} from "../IValidators";
import {IIState} from "../IAuth";
import {pushToA} from "../Form/FormHelper"
import FieldError from "../../Atoms/FieldError/FieldError";


export default class Sign_InForm extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            email: {value: '', valid: false}, password: {value: '', valid: false},
            referrer: <></>,
            serverError: '',
            validators: {email: {error_str: '', regexp: '', EventError: ['']}, password: {error_str: '', regexp: '', EventError: ['']}}}
    }

    onValidatorChange = (validators: Validators) => {
        this.setState({validators: validators})
    }

    handleUserInput = (event: any) => {
        this.setState({serverError: ''})
        const valid = this.validateField(event.target.name, event.target.value)
        this.setState({[event.target.name]: {value: event.target.value, valid: valid}})
    }

    validateField = (fieldName: string, fieldValue: string) => {
        const fieldValid = fieldValue.match(this.state.validators![fieldName].regexp)
        return !!fieldValid;
    }

    submitBtnHandler = async (event: any) => {
        const error = await pushToA(event, ROUTES.SIGN_IN, {email: this.state.email.value, password: this.state.password.value});
        if (error) {
            this.setState({serverError: error})
        }
        else {
            this.setState({referrer: <Redirect to={ROUTES.LANDING} />})
            //да, я знаю что такое document.refferer, но в данном случае он не подходит, т.к. перерендер формы он считает за переход на другую страницу
        }
    }

    render() {
        const fd = this.state
        const v = this.state.validators

        return (
            <div className="inputForm">
                {this.state.referrer}
                <Form onValidatorChange={this.onValidatorChange} onSubmit={this.submitBtnHandler}>
                    <Field fieldName="email" regexp={v!.email.regexp} valid={fd.email.valid}
                           validateFunc={this.handleUserInput} value={fd.email.value} text={v!.email.error_str}/>
                    <Field fieldName="password" regexp={v!.password.regexp} valid={fd.password.valid}
                           validateFunc={this.handleUserInput} value={fd.password.value} text={v!.password.error_str}/>
                   <FieldError valid={!this.state.serverError}  text={this.state.serverError}/>
                </Form>

            </div>

        )
    }
}

