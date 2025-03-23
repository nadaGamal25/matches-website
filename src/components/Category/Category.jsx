import React ,{ useState ,useEffect } from 'react'
import {Modal ,Button} from 'react-bootstrap';
import axios from 'axios'
import Joi from 'joi';

export default function Category() {
    useEffect(()=>{
        getData()
      },[])
      const [data,setData]=useState([])
      async function getData() {
        try {
          const response = await axios.get('https://zad.onrender.com/match/get-all-categ',{
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
    
    
    
    
      const [error , setError]= useState('')
      const [isLoading, setisLoading] =useState(false)
    const [errorList, seterrorList]= useState([]); 
    
     const [myData,setMyData]=useState({
        name: '',
     })
      async function sendDataToApi() {
        try {
          const response = await axios.post(
            `https://zad.onrender.com/match/add-categ`,
            myData,
            {
                headers: {
                    Authorization: `basic ${localStorage.getItem('adminToken')}`,
            }
        }
          );
    
          alert("added successfully")
          console.log(response);
          getData();
          setisLoading(false)
        } catch (error) {
          console.error(error);
          setisLoading(true)
          alert(error.response.data.message);
        }
      }
   
     function submitForm(e){
          e.preventDefault();
          setisLoading(true)
          let validation = validateRegisterForm();
          seterrorList([]); 
          console.log(validation);
          if(validation.error){
            setisLoading(false)
            seterrorList(validation.error.details)
          }else{
            sendDataToApi();
          }
          
        }
        
          function getMyData(e){
            if (e && e.target) {
            let data={...myData};
            data[e.target.name]= e.target.value;
            setMyData(data);
            console.log(data);
            }
          }
        
          function validateRegisterForm(){
            let scheme= Joi.object({
              name:Joi.string().min(1).required(),
          
            });
            return scheme.validate(myData, {abortEarly:false});
          }
    

    //edit data 
  const [isModalOpenData, setIsModalOpenData] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const [eData, seteData] = useState(null);
    const handleEditClickData = (data) => {
    seteData(data);
    setEditedData({
      name: data?.name || '',
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
  
  const handleEditSubmitData = async (event) => {
    console.log("Edited Data to Submit:", editedData);

    event.preventDefault();

    const updatedData = {
        name: editedData.name,
        id: eData._id
    };

    try {
        const response = await axios.post(
            "https://zad.onrender.com/match/edit-categ",
            updatedData, // Send JSON object directly
            {
                headers: {
                    Authorization: `basic ${localStorage.getItem('adminToken')}`,
                    "Content-Type": "application/json", // Ensure JSON content type
                }
            }
        );
        alert("Updated successfully");
        console.log(response);
        closeModalData();
        getData();
    } catch (error) {
        console.error(error);
        alert(error.response?.data?.message || "An error occurred");
    }
};
 
      return (
        <>
        <div className='p-4 admin' id='content'>
       
       <div className="d-flex justify-content-center py-3">
         <div className="my-form">
           <div className=" p-3">
             <h5 className="text-center mb-3">Add new category   </h5>
             <form onSubmit={submitForm} className='my-3' action="">
     <label htmlFor="name">Name  :</label>
     <input onChange={getMyData} type="text" className='my-input my-2 form-control' name='name' id='name' />
     {errorList.map((err,index)=>{
     if(err.context.label ==='name'){
       return <div key={index} className="text-danger my-2">this input is required</div>
     }
     
   })}
   <div className="text-center">
   <button type='submit' className='btn btn-green mt-3'>
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
       <th></th>           
       <th></th>           
       
     </tr>
    </thead>
    <tbody>
     {data && data.map((item,index) =>(
       item !== null ? (
         <tr key={index}>
           <td>{index+1}</td>
           {item.name?<td>{item.name}</td>:<td>_</td>}
          

    <td><button className="btn btn-secondary" onClick={() => handleEditClickData(item)}>Update</button></td>
           
    <td>

    <button
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
            <Modal.Title>update category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleEditSubmitData}>
              <div className="row">
                <div className="col-md-12 pb-1">
                  <label htmlFor="name">name :</label>
                  <input
                    onChange={handleInputChangeData}
                    value={editedData.name}
                    type="text"
                    className="my-input my-2 form-control"
                    name="name"
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
    