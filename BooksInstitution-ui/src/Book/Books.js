import React, {Component} from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import { Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import Info from 'material-ui/svg-icons/action/info';
import Edit from 'material-ui/svg-icons/image/edit';
import Delete from 'material-ui/svg-icons/action/delete';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import swal from 'sweetalert';
import BookInformation from './BookInformation';

const styles = {
    marginLeft: 0,
    marginRight: 10
  
}

    
   class Books extends Component {
       constructor (props){
           super (props);
           this.state={
            fixedHeader: true,
            showRowHover: true,
            showCheckboxes: false,
            selectable: false,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            height: '300px',

            books:[], 
            bookId: '',
            bookName: '',
            author: '', 
            pageNumber: '',
            quantity: '',

            bookInfo:[],

           }
        }

    //get all books//
    componentWillMount(){
    axios.get("http://localhost:8081/api/books")
    .then((response)=>{
        this.setState({books: response.data});
    })
    .catch((error) =>{
        console.log(error);
    });
}

   //get book info
   getInfo=(bookId)=>{
    axios.get("http://localhost:8081/api/singleBook/"+bookId)
    .then((response)=>{
        this.setState({bookInfo: response.data}); 
        this.setState({ showModal: !this.state.showModal });
    })
    .catch((error)=>{
        console.log(error);
    });  
}

//delete book
deleteBook=(bookId, index)=>{
    swal({
        text: "Are you sure you want to delete?",
        icon: "warning",
       buttons: true,
       dangerMode: true
    })
    .then((willDelete)=>{
        if(willDelete){ 
            this.removeFromDatabase(bookId);
            this.removeFromTable(index); 

            swal("Book has been deleted!", {
                icon: "success",
            });
        }
    });
}

removeFromDatabase=(bookId)=>{
    axios.delete("http://localhost:8081/api/deleteBook/"+bookId)
    .then((response)=>{
        console.log(response);
    })
    .catch((error)=>{
        console.log(error);
    }); 
}

removeFromTable=(index)=>{        
    this.setState(state=>({
        books: state.books.filter((singleBook, i)=>i!==index)
    }));
}



closeModal=()=>{
    this.setState({showModal: false})
}


    render(){
       var allBooks = this.state.books.map((singleBook, index) =>(
            <TableRow key={index} >
                <TableRowColumn>{singleBook.bookName} </TableRowColumn>
                <TableRowColumn>{singleBook.author}</TableRowColumn>
                <TableRowColumn>{singleBook.pageNumber}</TableRowColumn>
                <TableRowColumn>{singleBook.quantity}</TableRowColumn>
                <TableRowColumn>
                <IconButton aria-label="Info" 
                onClick={()=>this.getInfo(singleBook.bookId)}>
                    <Info                         
                    color={blue500}
                    hoverColor={greenA200}/>
                </IconButton>
                  
                     <IconButton containerElement=
                        {<Link to={"/singleBook/"+singleBook.bookId} />}
                        linkButton={true}>
                        <Edit
                            color={blue500}
                            hoverColor={greenA200}/>
                     </IconButton>
                     <IconButton aria-label="Delete" 
                    onClick={()=>this.deleteBook(singleBook.bookId, index)}>
                        <Delete                         
                        color={red500}
                        hoverColor={greenA200} />
                    </IconButton>
                 </TableRowColumn>
                
            </TableRow>
   ))

   return (
    <MuiThemeProvider>
    <div>
    <h2>Books</h2>
    <Table
    height={this.state.height}
    style={styles}
    fixedHeader={this.state.fixedHeader}
    selectable={this.state.selectable}
    multiSelectable={this.state.multiSelectable}
    >
        <TableHeader
        displaySelectAll={this.state.showCheckboxes}
        adjustForCheckbox={this.state.showCheckboxes}
         enableSelectAll={this.state.enableSelectAll}>

            <TableRow>
                <TableHeaderColumn>Book Name</TableHeaderColumn>
               <TableHeaderColumn> Author</TableHeaderColumn>
               <TableHeaderColumn>Page Number</TableHeaderColumn>
               <TableHeaderColumn>Qantity</TableHeaderColumn>
               <TableHeaderColumn
               className="icons"
                        style={{
                            whiteSpace: "normal",
                            wordWrap: "break-word"
                        }}
                        tooltip="icons"></TableHeaderColumn>

            </TableRow>
        </TableHeader>
        <TableBody
        displayRowCheckbox={this.state.showCheckboxes}
        deselectOnClickaway={this.state.deselectOnClickaway}
        showRowHover={this.state.showRowHover}>
            {allBooks}>
        </TableBody>
    </Table>
    <BookInformation
                open={this.state.showModal}
                closeAction={this.closeModal}
                bookInfo={this.state.bookInfo}             
                bookId={this.state.bookId}/>
          </div>
          </MuiThemeProvider>
   )
}
       
       
   };
    export default Books; 

        