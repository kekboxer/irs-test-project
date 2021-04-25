import React from "react";
import { useRoutes } from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import {useAuth} from "./auth.hook";
import {AuthContext} from "./context/AuthContext";

function App() {
    const {isAuthenticated, checkAuthentication} = useAuth();

    const routes = useRoutes(isAuthenticated);

    return (
            <AuthContext.Provider value={{isAuthenticated, checkAuthentication}}>
                <Router>
                    {routes}
                </Router>
            </AuthContext.Provider>
    );
}

export default App;

// import React, { Component } from 'react';
// import { ExtGrid } from "@sencha/ext-react-modern";
// import { ExtColumn } from "@sencha/ext-react-modern";
// const Ext = window['Ext'];
//
// class App extends Component {
//
//   constructor(props) {
//     super(props)
//     let data=[
//       { name: 'Marc', email: 'marc@gmail.com',priceChangePct: .25 },
//       { name: 'Nick', email: 'nick@gmail.com',priceChangePct: .35 },
//       { name: 'Andy', email: 'andy@gmail.com',priceChangePct: .45 }
//     ]
//     this.store = Ext.create('Ext.data.Store', {data: data})
//     //this.store = {xtype: 'store',data: data}
//   }
//
//   componentDidMount = () => {
//     //console.log('componentDidMount')
//     //console.log(this.grid.cmp)
//   }
//
//   extReactDidMount = detail => {
//     //console.log('extReactDidMount')
//     //this.grid.cmp.setStore(this.store);
//   }
//
//   renderSign = (format, value) => (
//     <span style={{ color: value > 0 ? 'green' : value < 0 ? 'red' : ''}}>
//         {Ext.util.Format.number(value, format)}
//     </span>
//   )
//
//   render() {
//     return (
//       <ExtGrid
//         viewport={ true }
//         ref={ grid => this.grid = grid }
//         title="The Grid"
//         store={ this.store }
//         onReady={ this.extReactDidMount }
//       >
//         <ExtColumn text="name" dataIndex="name"/>
//         <ExtColumn text="email" dataIndex="email" width="150"/>
//         <ExtColumn
//           text="% Change"
//           dataIndex="priceChangePct"
//           align="right"
//           renderer={ this.renderSign.bind(this, '0.00') }
//         />
//       </ExtGrid>
//     )
//   }
//
// }
// export default App;
