import api from '../services/api';


async function AddLike(id:string){
    await api.post(`/events/like/${id}`)
    .then( resp =>{
        return true
    }).catch(err =>{
        alert(err)
        return false
    })
}

async function Dislike(id:string){
    await api.post(`/events/dislike/${id}`)
    .then( resp =>{
        return true
    }).catch(err =>{
        alert(err)
        return false
    })
}

export {AddLike, Dislike}