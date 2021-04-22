
import React, { useState } from "react";
import Axios from "axios";

function App() {
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [data, setData] = useState(null);
    const register = () => {
        Axios({
            method: "POST",
            data: {
                email: registerUsername,
                password: registerPassword,
            },
            withCredentials: true,
            url: "http://localhost:5000/api/auth/register",
        }).then((res) => console.log(res));
    };
    const login = () => {
        Axios({
            method: "POST",
            data: {
                email: loginUsername,
                password: loginPassword,
            },
            withCredentials: true,
            url: "http://localhost:5000/api/auth/login",
        }).then((res) => console.log(res));
    };
    const getUser = () => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:5000/api/auth/user",
        }).then((res) => {
            setData(res.data);
            console.log(res.data);
        });
    };
    return (
        <div className="App">
            <div>
                <h1>Register</h1>
                <input
                    placeholder="username"
                    onChange={(e) => setRegisterUsername(e.target.value)}
                />
                <input
                    placeholder="password"
                    onChange={(e) => setRegisterPassword(e.target.value)}
                />
                <button onClick={register}>Submit</button>
            </div>

            <div>
                <h1>Login</h1>
                <input
                    placeholder="username"
                    onChange={(e) => setLoginUsername(e.target.value)}
                />
                <input
                    placeholder="password"
                    onChange={(e) => setLoginPassword(e.target.value)}
                />
                <button onClick={login}>Submit</button>
            </div>

            <div>
                <h1>Get User</h1>
                <button onClick={getUser}>Submit</button>
                {data ? <h1>Welcome Back {data.email}</h1> : null}
            </div>
        </div>
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
