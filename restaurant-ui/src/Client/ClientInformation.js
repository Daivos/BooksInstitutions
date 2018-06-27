import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class ClientInformation extends Component{

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    render() {
        if (!this.props.clientInfo){
            return null;
        }

        const actions =
            (<FlatButton
                label="Close"
                primary={true}
                onClick={this.props.closeAction}
            />);

            var oneClient = (
                <div id="clientInfo">
                private String firstName;
                    <p> Client's first name: {this.props.clientInfo.firstName}</p>
                    <p> Client's last name: {this.props.clientInfo.lastName}</p>
                    <p> Is client use alcohol: {this.props.clientInfo.useAlcohol}</p>
                    <p> Is client have alergy for Nuts: {this.props.clientInfo.isNutsAlergy}</p>      
                    <p> Is client have alergy for Milk: {this.props.clientInfo.isMilkAlergy}</p>             
                </div>
            )
        
        return (
            <MuiThemeProvider>
                <div>
                    <Dialog
                        title="Client:"
                        actions={actions}
                        modal={true}
                        open={this.props.open}
                    >
                        {oneClient}
                    </Dialog>

                </div>
            </MuiThemeProvider>
        );
    }

}export default ClientInformation;