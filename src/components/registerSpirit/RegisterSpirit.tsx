import React, { useState } from 'react';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export default function RegisterSpirit() {
  const [modal, setModal] = useState(false);
  const [brand, setBrand] = useState('');
  const [type, setType] = useState('');
  const [notation, setNote] = useState('');

  const cookies = new Cookies();
  const data = cookies.get('spirit.token');
  const navigate = useNavigate();

  const modalClass = modal ? 'init' : 'hidden';
  const modalClassCutton = modal ? 'hidden' : 'init';

  const userId = data?.user?.id;

  const handleButtonClickOpen = () => {
    setModal(true);
  };

  const handleButtonClickClose = () => {
    setModal(false);
  };

  const handleInputBrand = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBrand(event.target.value);
  };

  const handleInputType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
  };

  const handleInputNote = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value);
  };

  const handleRegisterSpirit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (data) {
      try {
        const responseSpirit = await fetch('http://localhost:3000/spirit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.access_token}`
          },
          body: JSON.stringify({
            brand,
            type
          })
        });

        const dataB = await responseSpirit.json();

        if (responseSpirit.ok) {
          const spiritId = dataB.id;

          await fetch('http://localhost:3000/notation/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${data.access_token}`
            },
            body: JSON.stringify({
              userId,
              spiritId,
              notation: parseInt(notation),
            })
          });

          // Realize alguma ação após o cadastro bem-sucedido, se necessário
        } else {
          alert("Error Password or Username");
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    } else {
      navigate('login');
    }
  };

  return (

    <>
      <div className={`absolute top-12 right-12 left-12 bottom-12 rounded-xl p-7 bg-gray-300 ${modalClass} `}>
        <button className='text-xs bg-red-800 p-2 rounded-md text-gray-300 mb-6' onClick={handleButtonClickClose}>Fechar</button>

        <form className='flex z-10 w-full h-full flex-col ' onSubmit={handleRegisterSpirit}>
          <div className="relative h-11 w-full min-w-[200px] mb-3">
            <input className='peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-700 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100' placeholder='Marca' type="text" value={brand} onChange={handleInputBrand} />
            <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-700 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500" htmlFor="brand">Marca</label>
          </div>
          <div className="relative h-11 w-full min-w-[200px] mb-3">
            <input placeholder='Tipo' className='peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-700 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100' type="text" value={type} onChange={handleInputType} />
            <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-700 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500" htmlFor="type">Tipo</label>
          </div>
          <div className="relative h-11 w-full min-w-[200px] mb-3">

            <input placeholder='Nota' className='peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-700 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100' type='number' onChange={handleInputNote} />
            <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-700 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500" htmlFor="note">Nota</label>
          </div>
          <button className='bg-green-500 p-2 w-2/3 mx-auto mt-3 rounded-lg text-gray-700' type="submit">Cadastrar</button>
        </form>
      </div>

      <button className={`bg-green-700 p-2 ${modalClassCutton} text-sm font-semibold rounded-xl text-gray-300 mb-3 mt-6 mx-4`} onClick={handleButtonClickOpen}>Registrar Bebida</button>

    </>

  );
}
