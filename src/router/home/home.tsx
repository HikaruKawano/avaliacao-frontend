import React, { useEffect, useState } from 'react'
import { Cookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';
import RegisterSpirit from '../../components/registerSpirit/RegisterSpirit';

interface Spirit {
  id: string;
  brand: string;
  type: string;
}

interface SpiritData {
  id: string;
  notation: number;
  userid: string;
  Spiritid: string;
  spirit: Spirit;
}

export default function Home() {



  const cookies = new Cookies();

  const data = cookies.get('spirit.token')
  const [dadosSpirits, setDadosSpirits] = useState([])
  const navigate = useNavigate()

  if (data) {

    useEffect(() => {
      fetch(`http://localhost:3000/notation/${data.user.id}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${data.access_token}`
        },


      })
        .then(response => response.json())
        .then(dataB => {
          if (dataB.error) {
            alert("Error Password or Username");
          } else {
            setDadosSpirits(dataB)
          }
        });

    }, [])
  } else {
    navigate('login')
  }



  return (
    <div className='h-screen p-4 bg-slate-800'>
      <h2 className='text-center text-gray-300 mb-4'>Bebidas</h2>

      <RegisterSpirit></RegisterSpirit>

      {dadosSpirits.length > 0 ? (
        <div className='flex flex-wrap justify-center'>
          {dadosSpirits.map((item: SpiritData, index) => (
            <div key={index} className="card m-2 text-justify bg-gray-500 min-w-1/2 p-3 rounded-xl ">

              <div className="brand  text-gray-300">
                <h2 className=''>Marca: <span className=''>{item.spirit.brand}</span></h2>
              </div>
              <div className="type text-gray-300">
                <p>Tipo: <span className=''>{item.spirit.type}</span></p>
              </div>
              <div className="note text-gray-300">
                <p>Nota: <span className=''>{item.notation}</span></p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Carregando dados...</p>
      )}
    </div>

  )
}
