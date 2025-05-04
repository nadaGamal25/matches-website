import React ,{ useState ,useEffect } from 'react'
import axios from 'axios'
import {Modal ,Button} from 'react-bootstrap';

export default function Matches() {
    useEffect(()=>{
        getData()
        getTeams()
        getCategs()
      },[])
      const [categs,setCategs]=useState([])
      async function getCategs() {
        try {
          const response = await axios.get('https://zad.onrender.com/match/get-all-categ',{
            headers: {
                Authorization: `basic ${localStorage.getItem('adminToken')}`,
        }
    });
          console.log(response)
          setCategs(response.data.data) 
          
        } catch (error) {
          console.error(error);
        }
      }
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

      //edit data 
  const [isModalOpenData, setIsModalOpenData] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const [eData, seteData] = useState(null);
    const handleEditClickData = (data) => {
    seteData(data);
    setEditedData({
      id:data?._id || '',
      firstTeam: data?.firstTeam?._id || '',
      secondTeam: data?.secondTeam?._id || '',
      stadiumName: data?.stadium?.name || '',
      date: data?.date || '',
      desc: data?.desc || '',
      categ: data?.categ?._id || '',
      image: data?.stadium?.img || [],
      urls: data?.urls || [],
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

  const handleUrlChange = (index, field, value) => {
    setEditedData((prev) => {
      const updatedUrls = [...prev.urls];
      updatedUrls[index] = { ...updatedUrls[index], [field]: value };
      return { ...prev, urls: updatedUrls };
    });
  };
  
  const handleAddUrl = () => {
    setEditedData((prev) => ({
      ...prev,
      urls: [...prev.urls, { desc: '', url: '' }],
    }));
  };
  
  const handleRemoveUrl = (index) => {
    setEditedData((prev) => {
      const updatedUrls = [...prev.urls];
      updatedUrls.splice(index, 1);
      return { ...prev, urls: updatedUrls };
    });
  };
  
 
  const handleEditSubmitData = async (event) => {
    console.log("Edited Data to Submit:", editedData);
  
    event.preventDefault();
    const formData = new FormData();
    // formData.append('firstTeam', editedData.firstTeam);
    // formData.append('secondTeam', editedData.secondTeam);
    // formData.append('stadiumName', editedData.stadiumName);
    // formData.append('date', editedData.date);
    // formData.append('categ', editedData.categ);
    Object.entries(editedData).forEach(([key, value]) => {
      if (
        value !== '' && 
        value !== null && 
        key !== 'urls' && 
        key !== 'image'
      ) {
        formData.append(key, value);
      }
    });
    // formData.append('urls', editedData.urls);
    formData.append('urls', JSON.stringify(editedData.urls));

    formData.append('id', eData._id);
    
    if (Array.isArray(editedData.image)) {
      // If image is an array, loop through and append files to formData
      editedData.image.forEach((file) => formData.append('image', file));
  } else if (editedData.image) {
      // If image is a single file, append it directly
      formData.append('image', editedData.image);
  }
  
    try {
      console.log("Submitting edit match data:", formData);

      const response = await axios.post(`https://zad.onrender.com/match/edit-match`, formData,
        {
            headers: {
                Authorization: `basic ${localStorage.getItem('adminToken')}`,
        }
        }
      );
      alert("updated successfully");
      console.log(response)
      closeModalData();
      getData();
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
    }
  };                 
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
<td><button className="btn btn-secondary" onClick={() => handleEditClickData(item)}>Update</button></td>
           
    <td></td>
          

           
    <td>

    <button
       className="btn btn-danger"
       onClick={() => {
         if (window.confirm("Are you sure you will delete it ?")) {
           axios
             .get(`https://zad.onrender.com/match/delete-match/${item._id}`, 
              {
               headers: {
                Authorization: `basic ${localStorage.getItem('adminToken')}`,
               },
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
     {isModalOpenData && (
            <Modal show={isModalOpenData} onHide={closeModalData}>
              <Modal.Header>
                <Modal.Title>update match</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={handleEditSubmitData}>
                  <div className="row">
                    <div className="col-md-6 pb-1">
                      <label htmlFor="firstTeam">first team :</label>
                      <select
                    className="form-control my-2"
                    name="firstTeam"
                    value={editedData.firstTeam}
                    onChange={handleInputChangeData}
                    
                  >
                    <option value="">team</option>
                    {teams &&
                      teams.map((item, index) => (
                        <option key={index} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                      
                    </div>
                    <div className="col-md-6 pb-1">
                      <label htmlFor="secondTeam">second team :</label>
                      <select
                    className="form-control my-2"
                    name="secondTeam"
                    value={editedData.secondTeam}
                    onChange={handleInputChangeData}
                    
                  >
                    <option value="">team</option>
                    {teams &&
                      teams.map((item, index) => (
                        <option key={index} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                    </div>
                    <div className="col-md-6 pb-1">
                      <label htmlFor="stadiumName">stadium name :</label>
                      <input
                        onChange={handleInputChangeData}
                        value={editedData.stadiumName}
                        type="text"
                        className="my-input my-2 form-control"
                        name="stadiumName"
                      />
                    </div>
                    <div className="col-md-6 pb-1">
                      <label htmlFor="date">date :</label>
                      <input
                        onChange={handleInputChangeData}
                        value={editedData.date}
                        type="datetime-local"
                        className="my-input my-2 form-control"
                        name="date"
                      />
                    </div>
                    <div className="col-md-6 pb-1">
                      <label htmlFor="categ">category :</label>
                      <select
                    className="form-control my-2"
                    name="categ"
                    value={editedData.categ}
                    onChange={handleInputChangeData}
                    
                  >
                    <option value="">category</option>
                    {categs &&
                      categs.map((item, index) => (
                        <option key={index} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
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
                    <div className="col-md-12 pb-1">
                      <label htmlFor="date">description :</label>
                      <input
                        onChange={handleInputChangeData}
                        value={editedData.desc}
                        type="text"
                        className="my-input my-2 form-control"
                        name="desc"
                      />
                    </div>
                    {/* <div className="col-md-6 pb-1">
                      <label htmlFor="date">urls :</label>
                      <input
                        onChange={handleInputChangeData}
                        value={editedData.urls}
                        type="text"
                        className="my-input my-2 form-control"
                        name="urls"
                      />
                    </div> */}
                    <div className="col-12 pb-1">
  <label>URLs:</label>
  {editedData.urls && editedData.urls.length > 0 ? (
    editedData.urls.map((item, index) => (
      <div key={index} className="border rounded p-2 mb-2">
        <div className="row">
          <div className="col-md-5">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Description"
              value={item.desc}
              onChange={(e) => handleUrlChange(index, 'desc', e.target.value)}
            />
          </div>
          <div className="col-md-5">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="URL"
              value={item.url}
              onChange={(e) => handleUrlChange(index, 'url', e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <button
              type="button"
              className="btn btn-danger w-100"
              onClick={() => handleRemoveUrl(index)}
            >
              x
            </button>
          </div>
        </div>
      </div>
    ))
  ) : (
    <p className="text-muted">No URLs added yet.</p>
  )}
  <button
    type="button"
    className="btn btn-secondary mt-2"
    onClick={handleAddUrl}
  >
   add url
  </button>
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
