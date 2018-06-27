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
import ClientInformation from './ClientInformation';

const styles = {
    marginLeft: 0,
    marginRight: 10
  
}

    
   class Clients extends Component {
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

            clients:[], 
            clientId: '',
            firstName: '',
            lastName: '', 
            useAlcohol: '',
            isNutsAlergy: '',
            isMilkAlergy: '',

            clientInfo:[],
           }
        }

    //get all clients//
    componentWillMount(){
    axios.get("http://localhost:8081/api/clients")
    .then((response)=>{
        this.setState({clients: response.data});
    })
    .catch((error) =>{
        console.log(error);
    });
}

   //get client info
   getInfo=(clientId)=>{
    axios.get("http://localhost:8081/api/singleClient/"+clientId)
    .then((response)=>{
        this.setState({clientInfo: response.data}); 
        this.setState({ showModal: !this.state.showModal });
    })
    .catch((error)=>{
        console.log(error);
    });  
}

//delete client
deleteClient=(clientId, index)=>{
    swal({
        text: "Are you sure you want to delete?",
        icon: "warning",
       buttons: true,
       dangerMode: true
    })
    .then((willDelete)=>{
        if(willDelete){ 
            this.removeFromDatabase(clientId);
            this.removeFromTable(index); 

            swal("Client has been deleted!", {
                icon: "success",
            });
        }
    });
}

removeFromDatabase=(clientId)=>{
    axios.delete("http://localhost:8081/api/deleteClient/"+clientId)
    .then((response)=>{
        console.log(response);
    })
    .catch((error)=>{
        console.log(error);
    }); 
}

removeFromTable=(index)=>{        
    this.setState(state=>({
        clients: state.clients.filter((singleClient, i)=>i!==index)
    }));
}



closeModal=()=>{
    this.setState({showModal: false})
}


    render(){
       var allClients = this.state.clients.map((singleClient, index) =>(
            <TableRow key={index} >
                <TableRowColumn>{singleClient.firstName} </TableRowColumn>
                <TableRowColumn>{singleClient.lastName}</TableRowColumn>
                <TableRowColumn>{singleClient.useAlcohol}</TableRowColumn>
                <TableRowColumn>{singleClient.isNutsAlergy}</TableRowColumn>
                <TableRowColumn>{singleClient.isMilkAlergy}</TableRowColumn>
                
                <TableRowColumn>
                <IconButton aria-label="Info" 
                onClick={()=>this.getInfo(singleClient.clientId)}>
                    <Info                         
                    color={blue500}
                    hoverColor={greenA200}/>
                </IconButton>
                  
                     <IconButton containerElement=
                        {<Link to={"/singleClient/"+singleClient.clientId} />}
                        linkButton={true}>
                        <Edit
                            color={blue500}
                            hoverColor={greenA200}/>
                     </IconButton>
                     <IconButton aria-label="Delete" 
                    onClick={()=>this.deleteClient(singleClient.clientId, index)}>
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
    <h2>Clients</h2>
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
                <TableHeaderColumn>Client first Name</TableHeaderColumn>
               <TableHeaderColumn> Client last Name</TableHeaderColumn>
               <TableHeaderColumn>Information about alcohol</TableHeaderColumn>
               <TableHeaderColumn>Is alergy of nuts</TableHeaderColumn>
               <TableHeaderColumn>Is alergy of milk</TableHeaderColumn>
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
            {allClients}>
        </TableBody>
    </Table>
    <ClientInformation
                open={this.state.showModal}
                closeAction={this.closeModal}
                clientInfo={this.state.clientInfo}             
                clientId={this.state.clientId}/>
          </div>
          </MuiThemeProvider>
   )
}
       
       
   };
    export default Clients; 

        