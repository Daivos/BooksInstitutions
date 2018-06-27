import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class RecordInformation extends Component{

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    render() {
        if (!this.props.recordInfo){
            return null;
        }

        const actions =
            (<FlatButton
                label="Close"
                primary={true}
                onClick={this.props.closeAction}
            />);

            var oneRecord = (
                <div id="recordInfo">
                    <p> Record date: {this.props.recordInfo.date}</p>
                    <p> Quantity: {this.props.recordInfo.quantity}</p>
                    <p> Client's first name: {this.props.clientInfo.firstName}</p>
                    <p> Client's last name: {this.props.clientInfo.lastName}</p>
                    <p> Client use Alcohol: {this.props.clientInfo.useAlcohol}</p>  
                    <p> Client has Nuts Alergy: {this.props.clientInfo.isNutsAlergy}</p>  
                    <p> Client has Milk Alergy: {this.props.clientInfo.isMilkAlergy}</p>                  
                    <p> Dish  name: {this.props.dishInfo.dishName}</p>
                    <p> Dish  with nuts: {this.props.dishInfo.isNuts}</p>
                    <p> Dish  with milk: {this.props.dishInfo.isMilk}</p>
                </div>
            )
        return (
            <MuiThemeProvider>
                <div>
                    <Dialog
                        title="Record"
                        actions={actions}
                        modal={true}
                        open={this.props.open}
                    >
                        {oneRecord}
                    </Dialog>

                </div>
            </MuiThemeProvider>
        );
    }

}export default RecordInformation;