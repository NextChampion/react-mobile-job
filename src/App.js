import React from 'react';
import { connect } from 'react-redux';
import { addGun, removeGun, addGunAsync } from './index.redux';

@connect(
    ({counter}) => ({ count: counter }),
    {
        addGun, 
        removeGun, 
        addGunAsync,
    } 
)
class App extends React.Component {

    // addGun = () => {
    //     const { store, addGun } = this.props;
    //     store.dispatch(addGun())
    // }

    // removeGun = () => {
    //     const { store, removeGun } = this.props;
    //     store.dispatch(removeGun())
    // }

    // addGunAsync = () => {
    //     const { store, addGunAsync } = this.props;
    //     store.dispatch(addGunAsync());
    // }
    render() {
        const { count, addGun, removeGun, addGunAsync } = this.props;
        return (
            <div>
                <h1>现在有武器{count}把</h1>
                <button onClick={addGun}>申请武器</button>
                <button onClick={removeGun}>上交武器</button>
                <button onClick={addGunAsync}>延迟申请武器</button>
            </div>
        )
    }
}

export default App;