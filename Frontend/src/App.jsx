import Navbar from "./components/Navbar"
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import saveButton from './assets/saveButtonWhite.json'
import Website from "./components/Website";
import Username from "./components/Username";
import Password from "./components/Password"
import Actions from "./components/Actions";
import { ToastContainer, toast, Bounce } from 'react-toastify';


function App() {


  const copied = () => {
    toast.success('Copied To Clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    })
  }


  const deleted = () => {
    toast.success('Deleted Successfully!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }

  async function fetchData() {
    const fData = await fetch("http://localhost:3000/getusers")
    const jsonData = await fData.json();
    setuserData(jsonData)
  }
  useEffect(() => {
    fetchData()
  }, [])




  const [isEntered, setIsEntered] = useState(null);
  const [userData, setuserData] = useState([])
  const [isEditingId, setIsEditingId] = useState(null)
  const [formData, setFormData] = useState(
    {
      userWebsite: "",
      username: "",
      userPassword: ""
    }
  )


  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  async function handleEdit(id) {
    console.log("Edit Button Was clicked with Id: ", id)
    const editElement = userData.find(item => item._id === id);
    console.log(editElement)
    setIsEditingId(id);
    setFormData({
      userWebsite: editElement.website,
      username: editElement.username,
      userPassword: editElement.password
    })
  }


  async function handleSave() {

    console.log("Button was clicked!")

    const newData = {
      website: formData.userWebsite,
      username: formData.username,
      password: formData.userPassword,
      ...(isEditingId && { _id: isEditingId })
    }

    setFormData({
      userWebsite: "",
      username: "",
      userPassword: ""
    })

    await addToMongoDb(newData)
    fetchData();

  }


  async function addToMongoDb(newData) {
    if (!isEditingId) {
      const res = await fetch("http://localhost:3000/savedata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      })
      const data = await res.json();
    }

    else {
      const res = await fetch("http://localhost:3000/editdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      })
      const data = await res.json();
      setIsEditingId(null)
    }
  }

  async function handleDelete(id) {
    const res = await fetch(`http://localhost:3000/deletedata/${id}`, {
      method: "DELETE",
    })
    const data = await res.json();
    fetchData()
    deleted()
  }

  async function handleCopy(text) {
    const res = await navigator.clipboard.writeText(text);
    copied();
    console.log("copied to clipboard: ", res)
  }


  return (
    <>
      <div className="overflow-x-hidden w-full min-h-screen flex flex-col bg-[#080808]">
        <Navbar />
        <div className="main-content-wrapper w-full h-full flex flex-1 pt-7 flex-col ">

          <div className="mainbox flex justify-center items-center w-full">
            <div className="width-wrapper flex flex-col items-center gap-4 w-[75%] ">

              {/* LOGO SECTION */}
              <div className="logo-section flex flex-col justify-center items-center py-6">
                <div className="logo-box flex font-bold italic">
                  <span className="text-white text-6xl tracking-tighter">
                    &lt;Good
                  </span>
                  <span className="text-[#4eff4e] text-6xl tracking-tighter drop-shadow-[0_0_15px_rgba(78,255,78,0.3)]">
                    Pass/&gt;
                  </span>
                </div>
                <div className="text text-gray-400 mt-2 text-lg font-light tracking-wide">
                  Your own <span className="text-white">Secure</span> Password Manager
                </div>
              </div>


              <div className="input-section flex flex-col w-full gap-3">
                <div className="website-url w-full h-10 flex justify-center items-center ">
                  <input
                    name="userWebsite"
                    value={formData.userWebsite}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter website URL"
                    className="w-full bg-[#1fff1f0a] border border-[#4eff4e30] text-white rounded-2xl pl-3 flex justify-center items-center h-10 outline-none focus:border-[#4eff4e] transition-colors"
                  />
                </div>

                <div className="username-password w-full flex justify-center items-center">
                  <div className="username-password-wrapper grid grid-cols-4 w-full gap-4">
                    <div className="username-div col-span-3 ">
                      <input
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="bg-[#1fff1f0a] border border-[#4eff4e30] text-white pl-3 flex justify-center items-center rounded-2xl w-full h-10 outline-none focus:border-[#4eff4e] transition-colors"
                        type="text"
                        placeholder="Enter Username"
                      />
                    </div>
                    <div className="password-div col-span-1 ">
                      <input
                        name="userPassword"
                        value={formData.userPassword}
                        onChange={handleChange}
                        className="bg-[#1fff1f0a] border border-[#4eff4e30] text-white pl-3 flex justify-center items-center rounded-2xl w-full h-10 outline-none focus:border-[#4eff4e] transition-colors"
                        type="password"
                        placeholder="Enter Password"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div onClick={handleSave} className="save-button relative w-36 flex justify-center items-center px-4 py-2 rounded-full gap-2 cursor-pointer overflow-hidden transition-all duration-300"
                style={{
                  background: isEntered == "save"
                    ? "linear-gradient(135deg, #1fff1f28 0%, #4eff4e18 100%)"
                    : "linear-gradient(135deg, #1fff1f10 0%, #4eff4e08 100%)",
                  border: "1px solid",
                  borderColor: isEntered == "save" ? "#4eff4e" : "#4eff4e70",
                  boxShadow: isEntered == "save"
                    ? "0 0-16px #4eff4e40, inset 0 0 12px #1fff1f15"
                    : "0 0 6px #4eff4e20, inset 0 0 6px #1fff1f08",
                }}
                onMouseEnter={() => setIsEntered("save")}
                onMouseLeave={() => setIsEntered(null)}
              >
                <div

                  className="absolute top-0 left-1/2 -translate-x-1/2 h-px rounded-full transition-all duration-300"
                  style={{
                    width: isEntered == "save" ? "80%" : "40%",
                    background: "linear-gradient(90deg, transparent, #4eff4e, transparent)",
                  }}
                />
                <Lottie
                  style={{ width: 28 }}
                  animationData={saveButton}
                  loop={isEntered == "save"}
                  autoplay={isEntered == "save"}
                />
                <span
                  className="text-base font-medium tracking-wide transition-all duration-300"
                  style={{
                    color: isEntered ? "#4eff4e" : "#ffffffcc",
                    textShadow: isEntered ? "0 0 8px #4eff4e80" : "none",
                  }}
                >
                  Save
                </span>
              </div>

              <div className="show-info-container w-full mt-10">
                <div className="your-passwords mb-4">
                  <h1 className="text-2xl text-white font-bold border-l-4 border-[#4eff4e] pl-3">Your Passwords</h1>
                </div>

                {/* TABLE CONTAINER FIX */}
                <div className="show-info-section flex flex-col border border-[#4eff4e30]  rounded-xl overflow-hidden bg-[#111111] mb-10">

                  {/* Headers Row */}
                  <div className="headers pr-2 grid grid-cols-6 bg-[#1fff1f15] border-b border-[#4eff4e30]">
                    <div className="col-span-3 py-2 flex justify-center items-center text-[#4eff4e] uppercase text-xs tracking-widest font-bold">
                      Site
                    </div>
                    <div className="col-span-1 py-2 flex justify-center items-center text-[#4eff4e] uppercase text-xs tracking-widest font-bold border-l border-[#4eff4e20]">
                      Username
                    </div>
                    <div className="col-span-1 py-2 flex justify-center items-center text-[#4eff4e] uppercase text-xs tracking-widest font-bold border-l border-[#4eff4e20]">
                      Password
                    </div>
                    <div className="col-span-1 py-2 flex justify-center items-center text-[#4eff4e] uppercase text-xs tracking-widest font-bold border-l border-[#4eff4e20]">
                      Actions
                    </div>
                  </div>

                  {/* Data Rows Area */}

                  <div className="headers-desc grid grid-cols-6 max-h-60 scroll-bar-container ">


                    {/* Site Column */}
                    <div className="website-desc col-span-3">


                      {userData.map(item => (
                        item._id !== isEditingId && <Website handleCopy={handleCopy} key={item._id} website={item.website} />
                      ))}


                    </div>

                    {/* Username Column */}
                    <div className="username-desc col-span-1 border-l border-[#4eff4e10]">

                      {userData.map(item => (
                        item._id !== isEditingId && <Username handleCopy={handleCopy} key={item._id} username={item.username} />
                      ))}
                    </div>


                    <div className="password-desc col-span-1 border-l border-[#4eff4e10]">

                      {userData.map(item => (
                        item._id !== isEditingId && <Password handleCopy={handleCopy} key={item._id} password={item.password} />
                      ))}

                    </div>

                    <div className="action-desc col-span-1 border-l border-[#4eff4e10] ">



                      {userData.map(item => (
                        item._id !== isEditingId && <Actions handleEdit={handleEdit} handleDelete={handleDelete} key={item._id} id={item._id} />
                      ))}


                    </div>



                  </div>

                </div>

              </div>


            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce} />
    </>
  )
}

export default App