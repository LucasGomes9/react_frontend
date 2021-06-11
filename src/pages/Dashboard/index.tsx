import React, {useEffect, useState} from 'react'
import {AddLike, Dislike} from '../../Controllers/LikeController'
import {AddEvent, Delete, ShowById, ShowAll} from '../../Controllers/EventsController'
import './index.css'

interface Event{
  id: string;
  nomeevento: string;
  local: string;
  diasemana: string;
  horario: string;
  like: number;
  dislike: number;
  created_at: Date;
  updated_at: Date;
}


const Dashboard: React.FC = () => {

  const [events, setEvents] = useState<Event[]>([])

  async function getEvents() {
    let resp = await ShowAll()
    setEvents(resp)
    console.log(resp)
  }
  
  useEffect(() => {

    getEvents()

  }, []); 

  async function handleDelete(id:string) {
    let resp = await Delete(id)
    getEvents()
       
  }

  async function handleLike(id:string) {
    let resp = await AddLike(id)
    getEvents()

  }

  async function handleDislike(id:string) {
    let resp = await Dislike(id)
    getEvents()

  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const obj ={
      nomeevento: event.target.nomeevento.value,
      local: event.target.local.value,
      diasemana: event.target.diasemana.value,
      horario: event.target.horario.value,      
    } 

    let resp =  await AddEvent(obj);
    setEvents([...events, resp])
  }


  return (
    <div style={{width:'100%'}}>
      <form onSubmit={handleSubmit} > 
        <input type='text' name='nomeevento' placeholder='Nome do Evento' />
        <input type='text' name='local' placeholder='Local do Evento' />
        <input type='text' name='diasemana' placeholder='Dia da Semana' />
        <input type='text' name="horario" placeholder="Horário" />
        <button type="submit">Salvar</button>
      </form>

        <table >
          
          <tr>
            <th>Nome Evento:</th>
            <th>Local:</th>
            <th>Dia da Semana:</th>
            <th>Horario:</th>
            <th>Like:</th>
            <th>Dislike:</th>
            <th style={{display: 'flex'}}>Ações</th>
          </tr>
          {events.map((data, index) => (
            <>
              <tr key={index}>
                <td>{data.nomeevento}</td>
                <td>{data.local}</td>
                <td>{data.diasemana}</td>
                <td>{data.horario}</td>
                <td>{data.like? data.like : 0}</td>
                <td>{data.dislike? data.dislike : 0}</td>
                <td>
                  <button onClick={() => handleDelete(data.id)}>Deletar</button>
                  <button onClick={() => handleLike(data.id)}>Like</button>
                  <button onClick={() => handleDislike(data.id)}>Dislike</button>
                </td>
              </tr>
            </>
          ))}
        </table>

    </div>


    
  )
}

export default Dashboard



