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
import IconButton from 'material-ui/IconButton';
import Info from 'material-ui/svg-icons/action/info';
import Edit from 'material-ui/svg-icons/image/edit';
import Delete from 'material-ui/svg-icons/action/delete';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import swal from 'sweetalert';
import RecordInformation from './RecordInformation';
import { Link } from 'react-router-dom';


const styles = {
    marginLeft: 0,
    marginRight: 10
  
}

class RecordTable extends Component{

    constructor(props){
        super(props);
        this.state={
            fixedHeader: true,
            showRowHover: true,
            showCheckboxes: false,
            selectable: false,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            height: '300px',
            showModal: false,

            records:[],
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
            isMilkAlergy: '',

            recordInfo:[],
            clientInfo:[],
            dishInfo:[],
            updateInfo:[]
        }
    }

    //get all records
    componentWillMount(){
        axios.get("http://localhost:8081/api/records")
        .then((response) => {       
            this.setState({records: response.data});
        })
        .catch((error) => {
            console.log(error);
        }); 
    }

    //get record info
    getInfo=(recordId)=>{
        axios.get("http://localhost:8081/api/singleRecord/"+recordId)
        .then((response)=>{
            this.setState({recordInfo: response.data});
            axios.get("http://localhost:8081/api/singleRecord/"+recordId+"/"+this.state.recordInfo.dishId)
                .then((response)=>{
                    this.setState({dishInfo: response.data});
                })
                .catch((error)=>{
                    console.log(error);
            });
            axios.get("http://localhost:8081/api/singleRecord/"+recordId+"/"+this.state.recordInfo.dishId+"/"+this.state.recordInfo.clientId)
                .then((response)=>{
                    this.setState({clientInfo: response.data});
                })
                .catch((error)=>{
                    console.log(error);
            });
            this.setState({ showModal: !this.state.showModal });
            console.log("state record info",this.state.recordInfo);
            console.log("state of client ", this.state.records.dishInfo)
        })
        .catch((error)=>{
            console.log(error);
        });  
    }

    //delete record
    deleteRecord=(recordId, index)=>{
        swal({
            text: "Are you sure you want to delete?",
            icon: "warning",
           buttons: true,
           dangerMode: true
        })
        .then((willDelete)=>{
            if(willDelete){ 
                this.removeFromDatabase(recordId);
                this.removeFromTable(index); 

                swal("Record has been deleted!", {
                    icon: "success",
                });
            }
        });
    }

    removeFromDatabase=(recordId)=>{
        axios.delete("http://localhost:8081/api/deleteRecord/"+recordId)
        .then((response)=>{
            console.log(response);
        })
        .catch((error)=>{
            console.log(error);
        }); 
    }
    
    removeFromTable=(index)=>{        
        this.setState(state=>({
            records: state.records.filter((singleRecord, i)=>i!==index)
        }));
    }



    closeModal=()=>{
        this.setState({showModal: false})
    }

    render(){
        var allRecords = this.state.records.map((singleRecord, index) => (
            <TableRow key={index} >
                <TableRowColumn>{singleRecord.date}</TableRowColumn>
                <TableRowColumn>
                    <IconButton aria-label="Info" 
                    onClick={()=>this.getInfo(singleRecord.recordId)}>
                        <Info                         
                        color={blue500}
                        hoverColor={greenA200}/>
                    </IconButton>
                    <IconButton containerElement=
                    {<Link to={"/singleRecord/"+singleRecord.recordId} />}
                                linkButton={true}>
                        <Edit
                        color={blue500}
                        hoverColor={greenA200}/>
                    </IconButton>
                    <IconButton aria-label="Delete" 
                    onClick={()=>this.deleteRecord(singleRecord.recordId, index)}>
                        <Delete                         
                        color={red500}
                        hoverColor={greenA200} />
                    </IconButton>
                </TableRowColumn>
            </TableRow>
        ))    
         
        return(
            <MuiThemeProvider>
            <div>
            <h2>Meniu records</h2>
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
                enableSelectAll={this.state.enableSelectAll}
                >
                <TableRow>
                    <TableHeaderColumn
                        className="recordDate"
                        style={{
                            whiteSpace: "normal",
                            wordWrap: "break-word"
                        }}
                        tooltip="recordName">Record date</TableHeaderColumn>
                   
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
                    {allRecords}
                </TableBody>
            </Table>
            <RecordInformation
                open={this.state.showModal}
                closeAction={this.closeModal}
                recordInfo={this.state.recordInfo} 
                clientInfo={this.state.clientInfo}
                dishInfo={this.state.dishInfo}
                recordId={this.state.recordId}
                clientId={this.state.clientId}
                dishId={this.state.dishId}/>
            </div>
        </MuiThemeProvider>
        );
    }
};
export default RecordTable;
    
