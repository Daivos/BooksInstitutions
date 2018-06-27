import React, {Component} from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import swal from 'sweetalert';

class NewClientRegistration extends Component{
    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            lastName: '', 
            useAlcohol: '',
            isNutsAlergy: '',
            isMilkAlergy: '',
        };
    }

    submit = (event)=> {
        let clientRegistrationInfo = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            useAlcohol: this.state.useAlcohol,
            isNutsAlergy: this.state.isNutsAlergy,
            isMilkAlergy: this.state.isMilkAlergy,
        }
        axios.post('http://localhost:8081/api/newClient', clientRegistrationInfo)
        .then((response)=>{
            swal({
                text: "Client registered",
                icon: "success",
               button: "OK",
            });
            this.refs.form.reset();
        })
        .catch ((error)=>{
            console.log(error);
            swal({
                text: "Client registration failed!",
                icon: "error",
               button: "OK",
            });
        })
        console.log(this.state);
        event.preventDefault();
    }

    render(){
        return(
            <MuiThemeProvider>
                <div >
                <form className="registerClient"
                ref="form"
                open={this.props.open}> 
                    <h2> Register new client </h2>

                    <TextField
                        className="firstName"
                        floatingLabelText="First name"
                        floatingLabelFixed={true}
                        onChange={(event, newValue) => this.setState({ firstName: newValue })}/>
                    <br />
                    <TextField
                        className="lastName"
                        floatingLabelText="Last name"
                        floatingLabelFixed={true}
                        onChange={(event, newValue) => this.setState({ lastName: newValue })}/>
                    <br />
                    <TextField
                        className="use Alcohol?"
                        floatingLabelText="Use Alcohol"
                        floatingLabelFixed={true}
                        onChange={(event, newValue) => this.setState({ useAlcohol: newValue })}/>
                    <br />
                    <TextField
                        className="isNutsAlergy"
                        floatingLabelText="Is Nuts Alergy?"
                        floatingLabelFixed={true}
                        onChange={(event, newValue) => this.setState({ isNutsAlergy: newValue })}/>
                    <br />
                    <TextField
                        className="isMilkAlergy"
                        floatingLabelText="Is Milk Alergy?"
                        floatingLabelFixed={true}
                        onChange={(event, newValue) => this.setState({ isMilkAlergy: newValue })}/>
                    <br />
                    <RaisedButton 
                        label="Submit" 
                        primary={true}  
                        onClick={(event)=>this.submit(event)} 
                    />
                </form>
                </div>
            </MuiThemeProvider>
        )
    }

}export default NewClientRegistration;