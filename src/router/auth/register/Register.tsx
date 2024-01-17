import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Evita o envio padrão do formulário

        fetch('http://localhost:3000/user', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert("Error Password or Username or email");
                } else {
                    navigate('/login');
                }
            });
    }

    return (
        <div className="flex items-center justify-center h-screen bg-slate-800 flex-col">

            <h1 className="text-gray-300 text-4xl mb-16 font-semibold">Register</h1>

            <form onSubmit={handleLogin} className="flex justify-center flex-col" >
                <label htmlFor="name" className="mb-2 text-xl text-gray-300">Name</label>
                <input id="name" type="text" value={name} onChange={handleChangeName} className="rounded-md p-2 bg-gray-400 mb-4 outline-none" />

                <label htmlFor="email" className="mb-2 text-xl text-gray-300">Email</label>
                <input id="email" type="email" value={email} onChange={handleChangeEmail} className="rounded-md p-2 bg-gray-400 mb-4 outline-none" />

                <label htmlFor="password" className="mb-2  text-xl text-gray-300">Password</label>
                <input id="password" type="password" value={password} onChange={handleChangePassword} className="rounded-md p-2 bg-gray-400 mb-4 outline-none" />

                <Link to="/login" className="text-center mb-2 text-gray-400 hover:text-gray-200">Login</Link>

                <button type="submit" className="bg-green-500 mt-2 p-2 rounded-md w-1/2 m-auto font-semibold">Register</button>
            </form>
        </div>
    )
}

