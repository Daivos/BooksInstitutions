import { Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import NewItemRegistration from './Items/NewItemRegistration';
import ItemTable from './Items/Items';
import NewOwnerRegistration from './Owners/NewOwnerRegistration';
import ClientRegistration from './Client/ClientRegistration';
import UpdateItem from './Items/UpdateItem';
import Dishs from './Dish/Dishs';
import UpdateDish from './Dish/UpdateDish';
import Clients from './Client/Clients';
import RecordTable from './Record/Records';
import NewRecordRegistration from './Record/NewRecordRegistration';
import UpdateRecord from './Record/UpdateRecord'

class ItemsNavigation extends Component{
    render(){
        return(
            <main>
                <Switch>
                    <Route path="/clients" component={Clients}/>
                    <Route path="/newClient" component={ClientRegistration}/>
                    <Route path="/dishs" component={Dishs}/>                   
                    <Route path="/singleDish/:dishId" component={UpdateDish}/>
                    <Route path="/records" component={RecordTable}/>
                    <Route path="/newRecord" component={NewRecordRegistration}/>
                    <Route path="/singleRecord/:recordId" component={UpdateRecord}/>

                    <Route path="/items" component={ItemTable}/>
                    <Route path="/newItem" component={NewItemRegistration}/>
                    <Route path="/newOwner" component={NewOwnerRegistration}/>
                    <Route path="/singleItem/:itemId" component={UpdateItem}/>
                </Switch>    
            </main>
        )
    }
}export default ItemsNavigation;