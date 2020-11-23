import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../../utils/UserContext';
import { Button, Modal} from 'semantic-ui-react'
import API from '../../utils/API';
import {Form, Input} from 'reactstrap'

const Edit  = () => {
    const [Open, setOpen] = useState(false)
    const {user, setUser} =useContext(UserContext)
    const [imageSelected, setImageSelected] = useState({})
    const [loading, setLoading] = useState(false)


    const uploadImage = async (e) => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', imageSelected)
        data.append('upload_preset', 'janishto')
        setLoading(true)
        console.log(data)
        const res = await fetch(
          'https://api.cloudinary.com/v1_1/sportstalk/image/upload',
          {
            method: 'POST',
            body: data
          }
        )
        const file = await res.json()
          console.log(file.secure_url)

        const newUserData = await API.getUpdateProfilePic({
          userId: user._id,
          profilePic: file.secure_url
        })
        console.log(newUserData.data)
        // setUser(newUserData.data)
        }

    ;
    return(
        <>
        <Modal
        open={Open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        trigger={<Button>Edit Profile Pic</Button>}
        >
        <Modal.Header>Select Profile Pic</Modal.Header>
        <Modal.Content image>
            <Modal.Description>
            <Form>
                <Input
                    type="file"
                    name="file"
                    placeholder="profile image"
                    onChange={(event) => {
                    setImageSelected(event.target.files[0]);
                    }}
                />
            </Form>
            </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button positive onClick={uploadImage}>
            Submit
          </Button>
        </Modal.Actions>
        
      </Modal>
    </>
    )
};

export default Edit