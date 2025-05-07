import React ,{ useState ,useEffect } from 'react'
import axios from 'axios'
import {Modal ,Button} from 'react-bootstrap';

export default function Users() {
    useEffect(()=>{
        getData()
      },[])
      const [data,setData]=useState([])
      async function getData() {
        try {
          const response = await axios.get('https://zad.onrender.com/user/get-all',
            {
                headers: {
                    Authorization: `basic ${localStorage.getItem('adminToken')}`,
            }
        }
          );
          console.log(response)
          setData(response.data.data)
          
        } catch (error) {
          console.error(error);
        }
      }

const [showModalSub, setShowModalSub] = useState(false);
const [selectedId, setSelectedId] = useState(null);

const openModalSub = (id) => {
  setShowModalSub(true);
  setSelectedId(id)
};

const closeModalSub = () => {
  setShowModalSub(false);
  setDuration('')
  setSelectedId(null)

};
const [theDuration, setDuration] = useState('');
async function updateSub(id) {
  const durationAsNumber = Number(theDuration); // convert here
  try {
    const response = await axios.post(
      `https://zad.onrender.com/user/update-subscription`,
      {
        userId:id,
        durationInDays: durationAsNumber,
      },
      {
        headers: {
            Authorization: `basic ${localStorage.getItem('adminToken')}`,
        },
      }

    );
    console.log(response);
    alert("updated successfully ")
    getData()
      closeModalSub();
      
  } catch (error) {
    console.error(error);
    alert(error.response.data.message)
  }
}
  return (
    <>
    <div className='p-4 admin' id='content'>
    <div className="my-table p-4 my-4">
    <table className="table">
    <thead className=''>
     <tr>
       <th scope="col">#</th>
       <th scope="col"> name </th>
       <th scope="col">email </th>
       <th scope="col">username </th>
       <th scope="col">subscription ExpiresAt </th>
       <th></th>           
       
     </tr>
    </thead>
    <tbody>
     {data && data.map((item,index) =>(
       item !== null ? (
         <tr key={index}>
           <td>{index+1}</td>
           {item.name?<td>{item.name}</td>:<td>_</td>}
           {item.email?<td>{item.email}</td>:<td>_</td>}
           {item.username?<td>{item.username}</td>:<td>_</td>}
           {item.subscriptionExpiresAt?<td>{item.subscriptionExpiresAt}</td>:<td>_</td>}
           <td>
           <button className="btn btn-primary" onClick={()=>{openModalSub(item._id)}}>update subscription</button>
            </td>           
   
         </tr>
       ): null
     )
     
     
     )}
    </tbody>
    </table>
    </div>
    </div>
    <Modal show={showModalSub} onHide={closeModalSub}>
  <Modal.Header>
    <Modal.Title>Update subscription</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        updateSub(selectedId);
      }}
    >
      <div className='form-group'>
        <label htmlFor=''>duration in days :</label>
        <input
          type='number'
          className='form-control'
          id=''
          value={theDuration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
        
      </div>
      <div className='text-center'>
        <button type='submit' className='btn btn-success m-2'>
          update
        </button>
      </div>
    </form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant='secondary' onClick={closeModalSub}>
      close
    </Button>
  </Modal.Footer>
</Modal>
    </>
  )
}
