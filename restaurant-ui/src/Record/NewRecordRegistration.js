import React, {Component} from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import swal from 'sweetalert';


class NewRecordRegistration extends Component{
    constructor(props){
        super(props);
        this.state={

            clients:[],
            dishes:[],
            clientValue:'',
            disheValue:'',

            recordId:'',
            date:'',
            
            dish: '',
            dishId:'',
            dishName:'',         
            isNuts: '', 
            isMilk: '',

            client: '',
            clientId: '',
            firstName: '',
            lastName: '', 
            useAlcohol: '',
            isNutsAlergy: '',
            isMilkAlergy: '' 

        };

    }

    submit = (event)=> {
        let information = {
            recordDate: this.state.recordDate,
            dishId: this.state.dishId,
            clientId: this.state.clientId
        }
        axios.post('http://localhost:8081/api/newRecord/'+this.state.dishId+'/'+this.state.clientId, information)
        .then((response)=>{
            swal({
                text: "Record registered",
                icon: "success",
                button: "OK",
            });
            this.refs.form.reset();
        })
        .catch ((error)=>{
            console.log(error);
            swal({
                text: "Record registration failed!",
                icon: "error",
               button: "OK",
            });
        })
        console.log(this.state);
        event.preventDefault();
    }

    componentWillMount=()=>{
        axios.get('http://localhost:8081/api/dishess')
        .then((response)=>{
            this.setState({dishes: response.data});
        })
        .catch((error)=>{
            console.log(error);
        });

        axios.get('http://localhost:8081/api/clients')
        .then((response)=>{
            this.setState({clients: response.data});
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    chooseDish=(event, dishId, value)=>{
         this.setState({dishId: value, dishValue: value}); 
    }

    chooseClient=(event, clientId, value)=>{
        this.setState({clientId: value, clientValue: value});
    }

    render(){
        return(
            <MuiThemeProvider>
                <div >
                <form className="registerRecord"
                ref="form"
                open={this.props.open}> 
                    <h2> Register new order </h2>
                    <TextField
                        className="date"
                        floatingLabelText="Record's date"
                        floatingLabelFixed={true}
                        onChange={(event, newValue) => this.setState({ date: newValue })}/>
                    <br />
                   
                    <DropDownMenu value={this.state.dishValue} onChange={this.chooseDish}>
                        <MenuItem  value={""} primaryText="Dish's name"/>
                        {this.state.dishs.map((singleDish, dishId) =><MenuItem  value={singleDish.dishId} primaryText={singleDish.dishName}/>)}
                    </DropDownMenu>
                    <br />
                    <DropDownMenu value={this.state.clientValue} onChange={this.chooseClient}>
                        <MenuItem  value={""} primaryText="Client last name"/>
                        {this.state.storages.map((singleClient, clientId) =><MenuItem  value={singleClient.clientId} primaryText={singleClient.lastName}/>)}
                    </DropDownMenu>
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
        
}

export default NewRecordRegistration;