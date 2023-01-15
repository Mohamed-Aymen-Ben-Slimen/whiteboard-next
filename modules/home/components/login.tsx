import { setUserLocalStorage } from '@/common/lib/localStorage';
import axios from 'axios';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Login: NextPage = () => {

    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    
    const login = () => {
      setError('');

      if (email.length === 0 || password.length === 0) {
        setError('Please fill up your email and password');
        return;
      }
      
      axios.post('/users', {email, password})
        .then( response => {
          setUserLocalStorage(response.data);
          router.push(`/`);
        } )
        .catch( err => {
          setError(err.response.data.error);
        } )
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
					<h1 className="text-2xl font-semibold">Login to your account</h1>
          <p>You don't have an account? <a href='/register' className='text-blue-500'>Create a new account</a></p>
				</div>
				<div className="divide-y divide-gray-200">
					<div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
						<div className="relative">
							<input 
              id="email"
              name="email"
              type="text" 
              className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-gray-300" 
              placeholder="Email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
							<label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm pointer-events-none">Email Address</label>
						</div>
						<div className="relative">
							<input id="password"
               name="password"
                type="password"
                 className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" 
                 placeholder="Password" 
                 value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
							<label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm pointer-events-none">Password</label>
						</div>

            <p className='text-red-500'>{error}</p>

						<div className="relative">
							<button 
              className="bg-blue-500 text-white rounded-md px-2 py-1"
              onClick={login}
              >Login</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
  );
};

export default Login;
