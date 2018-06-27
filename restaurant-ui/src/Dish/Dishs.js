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
import DishInformation from './DishInformation';

const styles = {
    marginLeft: 0,
    marginRight: 10
  
}

    
   class Dishs extends Component {
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

            dishs:[], 
            dishId: '',
            dishName: '',
            isNuts: '', 
            isMilk: '',

            dishInfo:[],            
           }
        }

    //get all dishs//
    componentWillMount(){
    axios.get("http://localhost:8081/api/dishs")
    .then((response)=>{
        this.setState({dishs: response.data});
    })
    .catch((error) =>{
        console.log(error);
    });
}

   //get dish info
   getInfo=(dishId)=>{
    axios.get("http://localhost:8081/api/singleDish/"+dishId)
    .then((response)=>{
        this.setState({dishInfo: response.data}); 
        this.setState({ showModal: !this.state.showModal });
    })
    .catch((error)=>{
        console.log(error);
    });  
}

//delete dish
deleteDish=(dishId, index)=>{
    swal({
        text: "Are you sure you want to delete?",
        icon: "warning",
       buttons: true,
       dangerMode: true
    })
    .then((willDelete)=>{
        if(willDelete){ 
            this.removeFromDatabase(dishId);
            this.removeFromTable(index); 

            swal("Dish has been deleted!", {
                icon: "success",
            });
        }
    });
}

removeFromDatabase=(dishId)=>{
    axios.delete("http://localhost:8081/api/deleteDish/"+dishId)
    .then((response)=>{
        console.log(response);
    })
    .catch((error)=>{
        console.log(error);
    }); 
}

removeFromTable=(index)=>{        
    this.setState(state=>({
        dishs: state.dishs.filter((singleDish, i)=>i!==index)
    }));
}



closeModal=()=>{
    this.setState({showModal: false})
}
    render(){
       var allDishs = this.state.dishs.map((singleDish, index) =>(
            <TableRow key={index} >
                <TableRowColumn>{singleDish.dishName} </TableRowColumn>
                <TableRowColumn>{singleDish.isNuts}</TableRowColumn>
                <TableRowColumn>{singleDish.isMilk}</TableRowColumn>
                <TableRowColumn>
                <IconButton aria-label="Info" 
                onClick={()=>this.getInfo(singleDish.dishId)}>
                    <Info                         
                    color={blue500}
                    hoverColor={greenA200}/>
                </IconButton>
                  
                     <IconButton containerElement=
                        {<Link to={"/singleDish/"+singleDish.dishId} />}
                        linkButton={true}>
                        <Edit
                            color={blue500}
                            hoverColor={greenA200}/>
                     </IconButton>
                     <IconButton aria-label="Delete" 
                    onClick={()=>this.deleteDish(singleDish.dishId, index)}>
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
    <h2>Dishs</h2>
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
                <TableHeaderColumn>Dish's name:</TableHeaderColumn>
               <TableHeaderColumn> Dish contains nuts:</TableHeaderColumn>
               <TableHeaderColumn>Dish contains milk:</TableHeaderColumn>             
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
            {allDishs}>
        </TableBody>
    </Table>
    <DishInformation
                open={this.state.showModal}
                closeAction={this.closeModal}
                dishInfo={this.state.dishInfo}             
                dishId={this.state.dishId}/>
          </div>
          </MuiThemeProvider>
   )
}
       
       
   };
    export default Dishs; 

        