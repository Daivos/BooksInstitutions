import React, { Component } from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import swal from 'sweetalert';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class UpdateBook extends Component{
    constructor (props){
        super(props);
        this.state ={
            bookName: '',
            author: '', 
            pageNumber: '',
            quantity: ''
        };
    }   
    
    componentWillMount(){
        this.getUpdateInfo();
    }
//get single book info
    getUpdateInfo=()=>{
    let updateBookId = this.props.match.params.bookId
        axios.get("http://localhost:8081/api/singleBook/"+updateBookId)
        .then((response)=>{
            this.setState({bookName: response.data.bookName});
            this.setState({author: response.data.author});
            this.setState({pageNumber: response.data.pageNumber});
            this.setState({quantity: response.data.quantity});
        })
        .catch((error) =>{
            console.log(error);
        });
    }

//update book info
    update =(event)=>{
        let bookToUpdateId =this.props.match.params.bookId
        let information = {
          bookName: this.state.bookName,
          author: this.state.author,
          pageNumber: this.state.pageNumber,
          quantity: this.state.quantity
        }

        swal({
            text: "Are you sure you want to update?",
            icon: "warning",
            buttons: true,
            dangerMode: true  
        })
        .then((willUpdate)=>{
            if(willUpdate){ 
                axios.put('http://localhost:8081/api/singleBook/updateBook/'+bookToUpdateId, information)
                    .then((response)=>{
                        swal("Item has been updated!", {
                            icon: "success",
                            button: "OK",
                        });
                        this.props.historybook.push('/books');
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
                    <h2>Edit book</h2>
                    <TextField
                        className="bookName"
                        floatingLabelText="Book's name"
                        floatingLabelFixed={true}
                        value={this.state.bookName}
                        onChange={(event, newValue) => this.setState({ bookName: newValue })}/>
                    <br />
                    <TextField
                        className="author"
                        floatingLabelText="Author"
                        floatingLabelFixed={true}
                        value={this.state.author}
                        onChange={(event, newValue) => this.setState({ author: newValue })}/>
                    <br />
                    <TextField
                        className="pageNumber"
                        floatingLabelText="Page Number"
                        floatingLabelFixed={true}
                        value={this.state.pageNumber}
                        onChange={(event, newValue) => this.setState({ pageNumber: newValue })}/>
                    <br />
                    <TextField
                        className="quantity"
                        floatingLabelText="Quantity"
                        floatingLabelFixed={true}
                        value={this.state.quantity}
                        onChange={(event, newValue) => this.setState({ quantity: newValue })}/>
                    <br />
                    
                    <RaisedButton 
                        label="Submit" 
                        primary={true}  
                        onClick={(event)=>this.update(event)} />
                </div>
            </MuiThemeProvider>
        );
    } 


} export default UpdateBook;
