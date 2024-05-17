import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// I chose this library for making HTTP requests because I'm familiar with it
import axios from 'axios';
import { setCount } from './features/counterSlice'; // Importing action creator from counterSlice.js

const App = () => {
    //  Extracting the count state from the Redux store
    const count = useSelector((state) => state.counter.count);
    // Useing a hook to get the Redux dispatch function, which is used to dispatch actions
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Fetching the initial count");
        fetchInitialCount();
    }, []);

    // Fetching the initial count from the server
    // Sending HTTP POST request to the server to fetch the initial count using JSON-RPC
    // Documentation: https://axios-http.com/docs/post_example, https://www.jsonrpc.org/specification 
    const fetchInitialCount = async () => {
        try {
            const response = await axios.post('http://localhost:3001/rpc', {
                jsonrpc: '2.0',
                method: 'get_count',
                id: 1,
            });
            // Dispatching the 'setCount' action creator with the received count value as the payload
            // For updating the Redux store state
            dispatch(setCount(response.data.result));
        } catch (error) {
            console.error('Error fetching count:', error);
        }
    };

    // Creating functions that handle the increment and decrement actions triggered by user clicks
    // Making asynchronous requests to the server to perform the corresponding actions
    // After receiving the response from the server, the count value is updated in the Redux store
    const handleIncrement = async () => {
        try {
            const response = await axios.post('http://localhost:3001/rpc', {
                jsonrpc: '2.0',
                method: 'increment',
                id: 1,
            });
            dispatch(setCount(response.data.result));
        } catch (error) {
            console.error('Error incrementing counter:', error);
        }
    };

    const handleDecrement = async () => {
        try {
            const response = await axios.post('http://localhost:3001/rpc', {
                jsonrpc: '2.0',
                method: 'decrement',
                id: 1,
            });
            dispatch(setCount(response.data.result));
        } catch (error) {
            console.error('Error decrementing counter:', error);
        }
    };

    return (
        <div>
            <h1>Counter</h1>
            <p>Count: {count}</p>
            <button onClick={handleIncrement}>Increment</button>
            <button onClick={handleDecrement}>Decrement</button>
        </div>
    );
};

export default App;
