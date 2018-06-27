import React, { Component } from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import swal from 'sweetalert';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class UpdateDish extends Component{
    constructor (props){
        super(props);
        this.state ={
            dishName: '',
            isNuts: '',
            isMilk: ''
        };
    }   
    
    componentWillMount(){
        this.getUpdateInfo();
    }
//get single dish info
    getUpdateInfo=()=>{
    let updateDishId = this.props.match.params.dishId
        axios.get("http://localhost:8081/api/singleDish/"+updateDishId)
        .then((response)=>{
            this.setState({dishName: response.data.dishName});
            this.setState({isNuts: response.data.isNuts});
            this.setState({isMilk: response.data.isMilk});
        })
        .catch((error) =>{
            console.log(error);
        });
    }

//update dish info
    update =(event)=>{
        let dishToUpdateId =this.props.match.params.dishId
        let information = {
          dishName: this.state.dishName,
          isNuts: this.state.isNuts,
          isMilk: this.state.isMilk,
        }

        swal({
            text: "Are you sure you want to update?",
            icon: "warning",
            buttons: true,
            dangerMode: true  
        })
        .then((willUpdate)=>{
            if(willUpdate){ 
                axios.put('http://localhost:8081/api/singleDish/updateDish/'+dishToUpdateId, information)
                    .then((response)=>{
                        swal("Item has been updated!", {
                            icon: "success",
                            button: "OK",
                        });
                        this.props.historydish.push('/dishs');
                    }).catch ((error)=>{
                        console.log(error);
                    })
                    console.log(this.state);
                    event.preventDefault();
                }
        })   
    }   
    
    render() {       
        return (
            <MuiThemeProvider>
                <div>
                    <h2>Edit dish</h2>
                    <TextField
                        className="dishName"
                        floatingLabelText="Dish's name"
                        floatingLabelFixed={true}
                        value={this.state.dishName}
                        onChange={(event, newValue) => this.setState({ dishName: newValue })}/>
                    <br />
                    <TextField
                        className="isNuts"
                        floatingLabelText="Is Nuts"
                        floatingLabelFixed={true}
                        value={this.state.isNuts}
                        onChange={(event, newValue) => this.setState({ isNuts: newValue })}/>
                    <br />
                    <TextField
                        className="isMilk"
                        floatingLabelText="Is Milk"
                        floatingLabelFixed={true}
                        value={this.state.isMilk}
                        onChange={(event, newValue) => this.setState({ isMilk: newValue })}/>
                    <br />
                   
                    <RaisedButton 
                        label="Submit" 
                        primary={true}  
                        onClick={(event)=>this.update(event)} />
                </div>
            </MuiThemeProvider>
        );
    } 


} export default UpdateDish;
