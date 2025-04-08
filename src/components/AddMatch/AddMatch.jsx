import React ,{ useState ,useEffect } from 'react'
import axios from 'axios'
import Joi from 'joi'

export default function AddMatch() {
    useEffect(()=>{
        getCategs()
        getTeams()
      },[])
      const [categories,setCategs]=useState([])
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
    const [newData, setNewData] = useState({
        firstTeam: '',
        secondTeam: '',
        stadium: '',
        date: '',
        categ: '',
        urls: [], 
      });
      const [newDesc, setNewDesc] = useState('');
const [newUrl, setNewUrl] = useState('');

      const [errorList, setErrorList] = useState([]);
      const [isLoading, setIsLoading] = useState(false);
    
      // Function to handle form submission
      async function sendDataToApi(dataToSend) {
        try {
          const response = await axios.post(
            'https://zad.onrender.com/match/add-new-match',
            dataToSend,
            {
              headers: {
                Authorization: `basic ${localStorage.getItem('adminToken')}`,
              },
            }
          );
          console.log(response);
          setIsLoading(false);
          window.alert('added successfully');
        } catch (error) {
          console.log(error);
          setIsLoading(false);
          alert(error.response.data.message || 'error occured');
        }
      }
    
      // Function to handle form validation
      function validateForm() {
        let schema = Joi.object({
          firstTeam: Joi.string().required(),
          secondTeam: Joi.string().required(),
          stadium: Joi.string().required(),
          date: Joi.date().required(),
          categ: Joi.string().required(),
          urls: Joi.array().items(
            Joi.object({
              url: Joi.string().uri().required(),
              desc: Joi.string().required()
            })
          ).required(),
        });
    
        return schema.validate(newData, { abortEarly: false });
      }
    
      function submitForm(e) {
        e.preventDefault();
      
        // Build the final urls array manually before validation
        const finalUrls = [...newData.urls];
      
        // Add current inputs if they are not empty
        if (newDesc && newUrl) {
          finalUrls.push({ desc: newDesc, url: newUrl });
        }
      
        // Build the full data object to validate and send
        const finalData = {
          ...newData,
          urls: finalUrls
        };
      
        // Validate
        const validation = validateForm(finalData);
        console.log(validation);
        if (validation.error) {
          setIsLoading(false);
          setErrorList(validation.error.details);
        } else {
          setIsLoading(true);
          sendDataToApi(finalData);
        }
      }
      
    
      function addUrls() {
        if (newDesc && newUrl) {
          setNewData((prevData) => ({
            ...prevData,
            urls: [...prevData.urls, { desc: newDesc, url: newUrl }],
          }));
          setNewDesc('');
          setNewUrl('');
        } else {
          alert('Please enter both description and url');
        }
      }
      
    
      // Handle change in general form inputs
      function getNewData(e) {
        const updatedData = { ...newData };
        updatedData[e.target.name] = e.target.value;
        setNewData(updatedData);
        console.log(updatedData);
      }
    
  return (
    <>
 <div className='p-4 admin' id='content'>

<div className="d-flex justify-content-center py-3">
  <div className="my-form">
    <div className="p-3">
      <h5 className="text-center mb-3">Add Match   </h5>
      <form onSubmit={submitForm} action="">
              <label htmlFor="">firstTeam :</label>
              <select name='firstTeam' className="form-control my-2" onChange={getNewData}>
        <option value="0">---</option>
            {teams&&teams.map((item,index)=>{
              return(<>
                    <option key={index} value={item._id}>{item.name}</option>

              </>
              )
            })}
          </select>
          <label htmlFor="">secondTeam :</label>
              <select name='secondTeam' className="form-control my-2" onChange={getNewData}>
        <option value="0">---</option>
            {teams&&teams.map((item,index)=>{
              return(<>
                    <option key={index} value={item._id}>{item.name}</option>

              </>
              )
            })}
          </select>
          <label htmlFor="">category :</label>
              <select name='categ' className="form-control my-2" onChange={getNewData}>
        <option value="0">---</option>
            {categories&&categories.map((item,index)=>{
              return(<>
                    <option key={index} value={item._id}>{item.name}</option>

              </>
              )
            })}
          </select>
              
                   <label htmlFor="">stadium :</label>
              <input
                onChange={getNewData}
                type="text"
                className="my-input my-2 form-control"
                name="stadium"
                value={newData.stadium}
              />
              <label htmlFor="">date :</label>
              <input
                onChange={getNewData}
                type="datetime-local"
                className="my-input my-2 form-control"
                name="date"
                value={newData.date}
              />

              {/* urls Input Fields */}
              <label htmlFor="">urls:</label>
<div className="row g-2 align-items-center">
  <div className="col-md-5">
    <input
      type="text"
      className="form-control"
      placeholder="Description"
      value={newDesc}
      onChange={(e) => setNewDesc(e.target.value)}
    />
  </div>
  <div className="col-md-5">
    <input
      type="text"
      className="form-control"
      placeholder="URL"
      value={newUrl}
      onChange={(e) => setNewUrl(e.target.value)}
    />
  </div>
  <div className="col-md-2">
    <button type="button" className="btn btn-secondary fw-bold" onClick={addUrls}>
      +
    </button>
  </div>
</div>


              {/* Display the added  links */}
              <div className="mt-2">
  {newData.urls.map((item, index) => (
    <div key={index}>
      <strong>{item.desc}:</strong> <a href={item.url} target="_blank" rel="noopener noreferrer">{item.url}</a>
    </div>
  ))}
</div>


              <div className="text-center">
                <button className="btn btn-green mt-3">
                  {isLoading ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : (
                    'add'
                  )}
                </button>
              </div>
            </form>
    </div>
  </div>
</div>


</div>

</>
  )
}
