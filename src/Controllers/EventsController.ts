import api from '../services/api';

interface Event{
  nomeevento: string;
  local: string;
  diasemana: string;
  horario: string;
}


async function AddEvent(evento:Event){
    const resp = await api.post(`/events`, evento )
    .then( resp =>{
        alert('Evento criado com sucesso')
        return resp.data
    }).catch(err =>{
        alert(err)
        return false
    })
    return resp
}

async function ShowAll(){
    const resp = await api.get(`/events`)
    .then( resp =>{
        console.log(resp.data)
        return resp.data

    }).catch(err =>{
        alert(err)
        return false
    })
    return resp
}

async function ShowById(id:number){
   const resp = await api.post(`/events/${id}`)
    .then( resp =>{
        return resp.data
    }).catch(err =>{
        alert(err)
        return false
    })
    return resp
}

async function Delete(id:string){
    const resp =  await api.delete(`/events/${id}`)
    .then( resp =>{
        alert('Deletado com sucesso')
        return true
    }).catch(err =>{
        alert(err)
        return false
    })
    return resp
}

export {AddEvent, Delete, ShowById, ShowAll}