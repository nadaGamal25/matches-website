import React ,{ useState ,useEffect } from 'react'
import axios from 'axios'
import {Modal ,Button} from 'react-bootstrap';

export default function Matches() {
    useEffect(()=>{
        getData()
      },[])
      const [data,setData]=useState([])
      async function getData() {
        try {
          const response = await axios.get('https://zad.onrender.com/match/get-all-matchs',{
            headers: {
                Authorization: `basic ${localStorage.getItem('adminToken')}`,
        }
    });
          console.log(response)
          setData(response.data.data)
          
        } catch (error) {
          console.error(error);
        }
      }
    
      const [selectedImages, setSelectedImages] = useState([]);
                const [showModal, setShowModal] = useState(false);
                function openCarousel(images) {
                  setSelectedImages(images);
                  setShowModal(true);
                }
  return (
    <>
    <div className='px-2 admin' id='content'>
    <div className="my-table p-4 my-4">
    <table className="table">
    <thead className=''>
     <tr>
       <th scope="col">#</th>
       <th scope="col"> category </th>
       <th scope="col"> firstTeam </th>
       <th scope="col"> secondTeam </th>
       <th scope="col"> staduim </th>
       <th scope="col"> image </th>
       <th scope="col"> date </th>
       <th scope="col"> urls </th>
       <th></th>           
           
       
     </tr>
    </thead>
    <tbody>
     {data && data.map((item,index) =>(
       item !== null ? (
         <tr key={index}>
           <td>{index+1}</td>
           {item.categ?<td>{item.categ.name}</td>:<td>_</td>}
           {item.firstTeam?<td>{item.firstTeam.name}</td>:<td>_</td>}
           {item.secondTeam?<td>{item.secondTeam.name}</td>:<td>_</td>}
           {item.stadium?.name?<td>{item.stadium.name}</td>:<td>_</td>}
           {item.stadium?.img?<td>
            <a className="text-primary" onClick={() => openCarousel(item.stadium.img.replace('public', 'https://zad.onrender.com'))}>image</a>
           </td>:<td>_</td>}
           {item.date?<td>{item.date}</td>:<td>_</td>}
           <td>
  {item.urls && item.urls.length > 0 ? (
    item.urls.map((url, index) => (
      <div key={index}>
        <a className='text-primary' target='_blank' href={url.url}>{url.url}</a><br />
        <span>{url.desc}</span>
        {index !== item.urls.length - 1 && <hr />} 
      </div>
    ))
  ) : (
    <span>_</span>
  )}
</td>

          

           
    <td>

    {/* <button
       className="btn btn-danger"
       onClick={() => {
         if (window.confirm("Are you sure you will delete it ?")) {
           axios
             .get(`https://zad.onrender.com/match/remove-categ/${item._id}`, 
              {
                headers: {
                    Authorization: `basic ${localStorage.getItem('adminToken')}`,
            }
             }
           )
             .then((response) => {
               if (response.status === 200) {
                 console.log(response)
                 getData();
                         window.alert('deleted successfully')
    
               }
             })
             .catch((error) => {
               console.error(error);
                   // window.alert(error.response.data.data.error)
             });
         }
       }}
     >
        Delete 
     </button> */}
    </td>
    
         </tr>
       ): null
     )
     
     
     )}
    </tbody>
    </table>
    </div>
    </div>
    <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
                <Modal.Header closeButton >
                  <Modal.Title> </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
        
                        <div className='text-center'>
                        <img src={selectedImages} class="d-block w-50" alt="..."/>
                      </div>
                   
           
            
          </div>
          
        </div>
                  
                </Modal.Body>
              </Modal>
    </>
  )
}
