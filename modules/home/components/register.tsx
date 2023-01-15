import { setUserLocalStorage } from '@/common/lib/localStorage';
import axios from 'axios';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

 const Register: NextPage = () => {

    const router = useRouter();

    const [error, setError] = useState('');

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        verifyPassword: '',
        birthDate: '',
    });
    
    const register = () => {
        setError('');
    
        if (
            user.firstName === ''
            || user.lastName === ''
            || user.email === ''
            || user.password === ''
            || user.verifyPassword === ''
        ) {
            setError('Please fill all fields');
            return;
        }

        if (
            user.password !== user.verifyPassword
        ) {
            setError('Password is not verified');
            return;
        }

       axios.post('/register', {user})
       .then( response => {
         setUserLocalStorage(response.data);
         router.push(`/`);
       } )
       .catch( err => {
        console.error(err);
        setError(err.response.data.error);
       } );
    }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
	<div className="relative py-3 sm:max-w-xl sm:mx-auto">
		<div
			className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
		</div>
		<div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
			<div className="max-w-md mx-auto">
				<div>
					<h1 className="text-2xl font-semibold">Create a new account</h1>
                    <p>Do you have an account? <a href='/login' className='text-blue-500'>Login to your account</a></p>
				</div>
				<div className="divide-y divide-gray-200">
					<div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                        <div className="relative">
							<input 
                            id="firstName"
                            name="firstName"
                            type="text" 
                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" 
                            placeholder="First Name" 
                            value={user.firstName}
                            onChange={(e) => setUser({...user, firstName: e.target.value})}
                            />
							<label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 pointer-events-none peer-focus:text-gray-600 peer-focus:text-sm">First Name</label>
						</div>
                        <div className="relative">
							<input 
                            id="lastName"
                            name="lastName"
                            type="text" 
                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" 
                            placeholder="Last Name" 
                            value={user.lastName}
                            onChange={(e) => setUser({...user, lastName: e.target.value})}
                            />
							<label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 pointer-events-none peer-focus:text-gray-600 peer-focus:text-sm">Last Name</label>
						</div>
                        <div className="relative">
							<input 
                            id="email"
                            name="email"
                            type="text" 
                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" 
                            placeholder="Email address" 
                            value={user.email}
                            onChange={(e) => setUser({...user, email: e.target.value})}
                            />
							<label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 pointer-events-none peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
						</div>
						<div className="relative">
							<input id="password"
                            name="password"
                            type="password"
                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" 
                            placeholder="Password" 
                            value={user.password}
                            onChange={(e) => setUser({...user, password: e.target.value})}
                            />
							<label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 pointer-events-none peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
						</div>
                        <div className="relative">
							<input id="vpassword"
                            name="vpassword"
                            type="password"
                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" 
                            placeholder="Verify Password" 
                            value={user.verifyPassword}
                            onChange={(e) => setUser({...user, verifyPassword: e.target.value})}
                            />
							<label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 pointer-events-none peer-focus:text-gray-600 peer-focus:text-sm">Verify Password</label>
						</div>

                        <p className='text-red-500'>{error}</p>

						<div className="relative">
							<button 
              className="bg-blue-500 text-white rounded-md px-2 py-1"
              onClick={register}
              >Register</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
  );
};


export default Register;