import React, { useState } from 'react'
import TextInput from '../components/TextInput';
import styled from 'styled-components';
import ButtonM from "../components/Button";
import Button from '@mui/material/Button';
import UploadIcon from '@mui/icons-material/Upload';
import { Avatar } from '@mui/material';
import { ProfileData } from '../api';
import { ToastContainer, toast } from 'react-toastify';

import { loginSuccess, updateUser } from '../redux/reducers/userSlice';
import { useDispatch } from 'react-redux';

// import Cloud/UploadIcon from '@mui/icons-material/CloudUpload';


const Container = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  @media (max-width: 768px) {
    padding: 20px 12px;
  }
  background: ${({ theme }) => theme.bg};
`;
const Delivery = styled.div`
  font-size: 18px;
  font-weight: 500;
  display: flex;
  width:100%;
  align-items:center;
  gap: 6px;
  flex-direction: column;
`;
const Image = styled.div`
  display:flex;
  align-items:center;
  gap:15px;
`;
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
const Profile = ({ currentUser }) => {
  const [isfile, setFile] = useState()
  const dispatch = useDispatch()
  const [file, setFileUpload] = useState()
  const [img, setImage] = useState("")
  const [disableB, setDisable] = useState(true)
  const [loading, setLoading] = useState(false)
  const [newData, setNewData] = useState([])
  const [name, setName] = useState(currentUser?.name)
  const [email, setEmail] = useState(currentUser?.email)
  // console.log(isfile)
  const handlegetImage = (e) => {
    // console.log(URL.createObjectURL(e.target.files[0]))
    setDisable(false)
    setFileUpload(e.target.files[0])
    setFile(URL.createObjectURL(e.target.files[0]))
    // setFileB(URL.createObjectURL(isfile))
  }
  const handleSave = async () => {
    
    setLoading(true)
    let UploadedImage = currentUser?.img ? currentUser?.img : img
    if (file !== undefined && currentUser?.img !== null) {
      var data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "ixqyrg42");
      data.append("cloud_name", "dhcke4e7l");

      const config = {
        method: "POST",
        body: data,
      };
      const response = await fetch("https://api.cloudinary.com/v1_1/dhcke4e7l/image/upload", config);
      const responseData = await response.json();
      UploadedImage = responseData.url;

      
      console.log(responseData.url)
     
    }
    const token = localStorage.getItem("krist-app-token")
    console.log(UploadedImage, "========")
    await ProfileData(token, { name, email, img:UploadedImage }).then((res) => {
      dispatch(updateUser(res.data))
      // setNewData(res.data)
      console.log(res.data.token)
      setLoading(false)
      toast.success("Saved Successful!");
      // window.location.reload()
    })

  }
  return (
    <Container>
        <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Delivery>
        User Details:
        <div>
          <Image>
            {isfile ? <img src={isfile} className='img' width="80px" height="80px" alt="" /> :
              <Avatar
                src={currentUser?.img}
                sx={{
                  color: "inherit",
                  fontSize: "28px",
                  width: "80px",
                  height: "80px"
                }}
              >
                {currentUser?.name[0]}
              </Avatar>}      <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<UploadIcon />}
              >
              Upload Photo
              <VisuallyHiddenInput type="file"  accept="image/*" onChange={handlegetImage} />
            </Button>
          </Image>
          <TextInput handelChange={(e) =>{ setName(e.target.value); setDisable(false) }} small placeholder="Username" value={name} />
          <div
            style={{
              display: "flex",
              gap: "6px",
            }}
          >
            <TextInput small handelChange={(e) => {setEmail(e.target.value);  setDisable(false)}} placeholder="email" value={email} />

          </div>

        </div>
      </Delivery>
      <ButtonM
        text="Save"
        small
        isLoading={loading}
        isDisabled={disableB}
        onClick={handleSave}
      />
    </Container>
  )
}

export default Profile