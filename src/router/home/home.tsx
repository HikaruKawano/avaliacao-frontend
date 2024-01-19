/* eslint-disable react-hooks/rules-of-hooks */
import React, { ButtonHTMLAttributes, useEffect, useState } from 'react'
import { Cookies } from 'react-cookie'
import { Navigate, useNavigate } from 'react-router-dom';
import ModalSpirit from '../../components/modalSpirit/ModalSpirit';

export interface Spirit {
  id: string;
  brand: string;
  type: string;
}

export interface SpiritData {
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
  const [DataC, setDataC] = useState<SpiritData[] | never[]>([])
  const [reloadData, setReloadData] = useState(false);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate()
  const [PositionNotationEdit, setPositionNotationEdit] = useState<string | number | readonly string[] | undefined>('');
  const [idNotation, setIdNotation] = useState<string | number | readonly string[] | undefined>('')
  const [dataEdit, setDataEdit] = useState<SpiritData>();

  const onDataC = (dataC: SpiritData[]) => {
    setDataC(dataC);
    setReloadData(true);
  };

  const isCloseEdit = (isCloseEdit: boolean) => {
    setEdit(isCloseEdit)
  }

  const handleButtonClick = (event: React.ChangeEvent<ButtonHTMLAttributes<any>>) => {
    setIdNotation(event.target.value)
  }

  const handleButtonEdit = (event: React.ChangeEvent<ButtonHTMLAttributes<any>>) => {
    setEdit(true);
    setPositionNotationEdit(event.target.value)
    GetNotation();
  }

  function GetNotation() {
    dadosSpirits.map((item: SpiritData, index) => {
      if (index == PositionNotationEdit) {
        setDataEdit(item)


      }
    })
  }


  if (data) {

    useEffect(() => {
      fetch(`http://localhost:3000/notation/${data.user.userId}`, {
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
            setReloadData(false);
          }
        });

    }, [data, reloadData])

    useEffect(() => {
      fetch(`http://localhost:3000/notation/${idNotation}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${data.access_token}`
        },
      }).then(response => response.json())


    }, [idNotation])

  } else {
    navigate('/login')
  }




  return (
    <>
      {data ? (
        <div className='h-full p-4 '>
          <h2 className='text-center text-gray-300 mb-4'>Bebidas</h2>

          <ModalSpirit isCloseEdit={isCloseEdit} onDataC={onDataC} isOpenEdit={edit} dataNotation={dataEdit}></ModalSpirit>

          {dadosSpirits.length > 0 ? (

            <div className='flex flex-wrap justify-center'>
              {dadosSpirits.map((item: SpiritData, index) => (
                <div key={index} className="card m-2  bg-gray-500 w-1/2 p-3 rounded-xl ">

                  <div className="brand  text-gray-300">
                    <h2 className=''>Marca: <span className=''>{item.spirit.brand}</span></h2>
                  </div>
                  <div className="type text-gray-300">
                    <p>Tipo: <span className=''>{item.spirit.type}</span></p>
                  </div>
                  <div className="note text-gray-300">
                    <p>Nota: <span className=''>{item.notation}</span></p>
                  </div>
                  <div className='mt-2 justify-between flex'>
                    <button value={item.id} onClick={handleButtonClick} className='bg-red-700 p-1 text-sm rounded-md text-gray-300'>Excluir</button>
                    <button value={index} onClick={handleButtonEdit} className='bg-yellow-600 p-1 text-sm rounded-md text-gray-300'>Editar</button>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className='flex items-center justify-center h-screen'>
              <p className='text-gray-300 text-center '>Nenhuma bebida registrada</p>
            </div >

          )
          }
        </div >
      ) : <Navigate to={'/login'} />}
    </>
  )
}
