import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Label, Input, FormGroup } from 'reactstrap';
import {Link} from 'react-router-dom'

function LoginPage(props) {
    const [Username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const Navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Send a POST request to the login API
        fetch('http://localhost:3004/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Username: Username,
                password: password
            }),
        })
        .then(response => {
            if (response.ok) {
                // Login successful, set props.Login to true
                // props.setLogin(true);
                // Redirect to the home page or any other desired route
                alert("login successful")
                Navigate("/dashboard");
            } else {
                // Login failed, handle error
                alert("Invalid username or password");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("An error occurred. Please try again.");
        });
    }

    const handleRegister = () =>{
        Navigate("/register")
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw',color:'white' ,backgroundColor:'#0C2D48'}}>
            <div style={{ border: '1px solid white', height: '450px', width: '450px', borderRadius: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ height: '60%', width: '100%', margin: '1rem', padding: '1rem', textAlign: 'center' }}>
                    <h1>Login Page</h1>
                    <Form onSubmit={(e) => { handleSubmit(e) }}>
                        <FormGroup>
                            <Label for="Username" hidden>Username</Label>
                            <Input
                                id="Username"
                                name="Username"
                                placeholder="User Name"
                                type="text"
                                value={Username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword" hidden>Password</Label>
                            <Input
                                id="examplePassword"
                                name="password"
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormGroup>
                        <Button type='submit' className='mb-4'>Submit</Button>
                       
                    </Form>
                    <Link to="/register" style={{textDecoration:'none',color:'white',cursor:'pointer'}}>click to Register here</Link>

                </div>
             
            </div>

        </div>
    )
}

export default LoginPage;