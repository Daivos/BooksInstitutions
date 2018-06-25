import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class BookInformation extends Component{

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    render() {
        if (!this.props.bookInfo){
            return null;
        }

        const actions =
            (<FlatButton
                label="Close"
                primary={true}
                onClick={this.props.closeAction}
            />);

            var oneBook = (
                <div id="bookInfo">
                    <p> Book's name: {this.props.bookInfo.bookName}</p>
                    <p> Author: {this.props.bookInfo.author}</p>
                    <p> Page number: {this.props.bookInfo.pageNumber}</p>
                    <p> Quantity: {this.props.bookInfo.quantity}</p>                   
                </div>
            )
        
        return (
            <MuiThemeProvider>
                <div>
                    <Dialog
                        title="Book:"
                        actions={actions}
                        modal={true}
                        open={this.props.open}
                    >
                        {oneBook}
                    </Dialog>

                </div>
            </MuiThemeProvider>
        );
    }

}export default BookInformation;