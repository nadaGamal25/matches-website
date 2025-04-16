import React ,{ useState ,useEffect } from 'react'
import axios from 'axios'
import {Modal ,Button} from 'react-bootstrap';

export default function Teams() {
    useEffect(()=>{
        getTeams()
      },[])
      const [teams,setTeams]=useState([])
      async function getTeams() {
        try {
          const response = await axios.get('https://zad.onrender.com/team/get-all');
          console.log(response)
          setTeams(response.data.data)
          
        } catch (error) {
          console.error(error);
        }
      }
    
    
    
    
      const [error , setError]= useState('')
      const [isLoading, setisLoading] =useState(false)
      const [selectedFiles, setselectedFiles] = useState([]);
      const [nameTeam, setNameTeam] = useState('');
    
    
      async function sendDataToApi() {
        console.log(localStorage.getItem('adminToken'))
        console.log(selectedFiles)
        const formData = new FormData();
        formData.append('name', nameTeam);
        
        
        selectedFiles.forEach((file) => {
          formData.append('image', file);
        });
      
        try {
          const response = await axios.post(
            `https://zad.onrender.com/team/add-new`,
            formData,
            {
                headers: {
                    Authorization: `basic ${localStorage.getItem('adminToken')}`,
            }
        }
          );
    
          alert("team has added successfully")
          console.log(response);
          setselectedFiles([]);
          getTeams();
        } catch (error) {
          console.error(error);
          alert(error.response.data.message);
        }
      }
      
      function handleFileChange(event) {
        const files = Array.from(event.target.files);
        setselectedFiles((prevFiles) => [...prevFiles, ...files]);
      }
      
    
    
    
    const [selectedImages, setSelectedImages] = useState([]);
          const [showModal, setShowModal] = useState(false);
          function openCarousel(images) {
            setSelectedImages(images);
            setShowModal(true);
          }

    //edit data 
  const [isModalOpenData, setIsModalOpenData] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const [eData, seteData] = useState(null);
    const handleEditClickData = (data) => {
    seteData(data);
    setEditedData({
      name: data?.name || '',
      image: data?.image || [],
    });
    setIsModalOpenData(true);
  };
  
  const closeModalData = () => {
    setIsModalOpenData(false);
    setEditedData(null);
  };
  
  const handleInputChangeData = (event) => {
    const { name, value } = event.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleFileChangeEdit = (event) => {
    const files = Array.from(event.target.files);
    setEditedData((prev) => ({
      ...prev,
      image: [...prev.image, ...files],
    }));
  };
  const handleFileVehiclesEdit = (event) => {
    const files = Array.from(event.target.files);
    setEditedData((prev) => ({
      ...prev,
      vehiclesImgs: [...prev.vehiclesImgs, ...files],
    }));
  };
  
  const handleEditSubmitData = async (event) => {
    console.log("Edited Data to Submit:", editedData);
  
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', editedData.name);
    formData.append('id', eData._id);
    
    if (Array.isArray(editedData.image)) {
      // If image is an array, loop through and append files to formData
      editedData.image.forEach((file) => formData.append('image', file));
  } else if (editedData.image) {
      // If image is a single file, append it directly
      formData.append('image', editedData.image);
  }
  
    try {
      const response = await axios.post(`https://zad.onrender.com/team/edit-team`, formData,
        {
            headers: {
                Authorization: `basic ${localStorage.getItem('adminToken')}`,
        }
        }
      );
      alert("updated successfully");
      console.log(response)
      closeModalData();
      getTeams();
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
    }
  };      
      return (
        <>
        <div className='p-4 admin' id='content'>
       
       <div className="d-flex justify-content-center py-3">
         <div className="my-form">
           <div className=" p-3">
             <h5 className="text-center mb-3">Add new team   </h5>
             <form onSubmit={(e) => { e.preventDefault(); sendDataToApi(); }} action="">
               <label htmlFor="name">Name :</label>
               <input onChange={(e) => { setNameTeam(e.target.value); }} required type='string' className='my-input my-2 form-control' name='name' />
               
               <label htmlFor="">Image : </label>
            <input
              type="file"
              className="my-2 my-input form-control"
              name="image"
              multiple
              onChange={handleFileChange} required
            />
               
    
    
              <div className="text-center">
               <button className='btn btn-green mt-3'>
               {isLoading == true?<i class="fa-solid fa-spinner fa-spin"></i>:'Add '}
              </button>
              </div>
             </form>
           </div>
         </div>
       </div>
    
    
       <div className="my-table p-4 my-4">
    <table className="table">
    <thead className=''>
     <tr>
       <th scope="col">#</th>
       <th scope="col"> name </th>
       <th scope="col">image </th>
       <th></th>           
       <th></th>           
       
     </tr>
    </thead>
    <tbody>
     {teams && teams.map((item,index) =>(
       item !== null ? (
         <tr key={index}>
           <td>{index+1}</td>
           {item.name?<td>{item.name}</td>:<td>_</td>}
           
           {item.image && item.image?.length !== 0 ?<td>
            <a className="text-primary" onClick={() => openCarousel(item.image.replace('public', 'https://zad.onrender.com'))}>image</a>
           </td>:<td>_</td>}

    <td><button className="btn btn-secondary" onClick={() => handleEditClickData(item)}>Update</button></td>
           
    <td>

    <button
       className="btn btn-danger"
       onClick={() => {
         if (window.confirm("Are you sure you will delete it ?")) {
           axios
             .get(`https://zad.onrender.com/team/delete-team/${item._id}`, 
              {
               headers: {
                Authorization: `basic ${localStorage.getItem('adminToken')}`,
               },
             }
           )
             .then((response) => {
               if (response.status === 200) {
                 console.log(response)
                 getTeams();
                         window.alert('deleted successfully')
    
               }
             })
             .catch((error) => {
               console.error(error);
                   window.alert(error.response.message)
             });
         }
       }}
     >
        Delete 
     </button>
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
      {/* {selectedImages.map((img, index)=>{
                return( */}
                    <div className='text-center'>
                    <img src={selectedImages} class="d-block w-50" alt="..."/>
                  </div>
                {/* )
            })} */}
       
        
      </div>
      {/* <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span class="carousel-control-prev-icon bg-dark" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span class="carousel-control-next-icon bg-dark" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button> */}
    </div>
              
            </Modal.Body>
          </Modal>

          {isModalOpenData && (
        <Modal show={isModalOpenData} onHide={closeModalData}>
          <Modal.Header>
            <Modal.Title>update team</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleEditSubmitData}>
              <div className="row">
                <div className="col-md-6 pb-1">
                  <label htmlFor="name">name :</label>
                  <input
                    onChange={handleInputChangeData}
                    value={editedData.name}
                    type="text"
                    className="my-input my-2 form-control"
                    name="name"
                  />
                </div>
                
                <div className="col-md-6 pb-1">
                  <label htmlFor="">image :</label>
                  <input
                    type="file"
                    className="form-control my-2"
                    multiple
                    onChange={handleFileChangeEdit}
                  />
                </div>
                <div className="text-center pt-1">
                  <button className="btn btn-primary">update</button>
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModalData}>
              close
            </Button>
          </Modal.Footer>
        </Modal>
   )}   
       </>
         )
    }
    