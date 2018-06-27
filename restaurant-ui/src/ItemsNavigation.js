import { Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import NewItemRegistration from './Items/NewItemRegistration';
import ItemTable from './Items/Items';
import NewOwnerRegistration from './Owners/NewOwnerRegistration';
import NewStorageRegistration from './Storage/NewStorageRegistration';
import UpdateItem from './Items/UpdateItem';
import Books from './Book/Books';
import UpdateBook from './Book/UpdateBook';

class ItemsNavigation extends Component{
    render(){
        return(
            <main>
                <Switch>
                    <Route path="/books" component={Books}/>
                    <Route path="/singleBook/:bookId" component={UpdateBook}/>
                    <Route path="/items" component={ItemTable}/>
                    <Route path="/newItem" component={NewItemRegistration}/>
                    <Route path="/newOwner" component={NewOwnerRegistration}/>
                    <Route path="/newStorage" component={NewStorageRegistration}/>
                    <Route path="/singleItem/:itemId" component={UpdateItem}/>
                </Switch>    
            </main>
        )
    }
}export default ItemsNavigation;