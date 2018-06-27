import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class DishInformation extends Component{

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    render() {
        if (!this.props.dishInfo){
            return null;
        }

        const actions =
            (<FlatButton
                label="Close"
                primary={true}
                onClick={this.props.closeAction}
            />);

            var oneDish = (
                <div id="dishInfo">
                    <p> Dish's name: {this.props.dishInfo.dishName}</p>
                    <p> Dish contains nuts: {this.props.dishInfo.isNuts}</p>
                    <p> Dish contains milk: {this.props.dishInfo.isMilk}</p>                              
                </div>
            )

        return (
            <MuiThemeProvider>
                <div>
                    <Dialog
                        title="Dish:"
                        actions={actions}
                        modal={true}
                        open={this.props.open}
                    >
                        {oneDish}
                    </Dialog>

                </div>
            </MuiThemeProvider>
        );
    }

}export default DishInformation;