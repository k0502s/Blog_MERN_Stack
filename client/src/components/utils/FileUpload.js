import React, {useState} from 'react'
import Dropzone from 'react-dropzone'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBriefcase,
    faPaperPlane,
    faQuestion,
    faImage,
  } from "@fortawesome/free-solid-svg-icons";
import Axios from 'axios';


const FileUpload = (props) => {

    const [Images, setImages] = useState([])

    const dropHandler = (files) => {

        let formData = new FormData();

        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append("file", files[0])

        Axios.post('/api/member/image', formData, config)
        .then(response => {
            if(response.data.success){
                console.log(response.data)
                setImages([...Images, response.data.filePath])
                props.refreshFunction([...Images, response.data.filePath])
            }else{
                alert('이미지 저장 실패.')
            }
        })
    }

    const deleteHandler = (image) => {
        const currentIndex = Images.indexOf(image)
        console.log('currentIndex', currentIndex)

        let newImages = [...Images]
        //splice 메소드의 첫번째 인자는 클릭 이벤트로 선택된 이미지이고
        //두번째 인자는 선택된 이미지를 중심으로 몇개를 지울지 선택하는 것이다.
        newImages.splice(currentIndex, 1)

        setImages(newImages) //삭제 후 새롭게 state 값을 만들어준다.

        props.refreshFunction(newImages)
    }

    return (
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Dropzone onDrop={dropHandler}>
             {({getRootProps, getInputProps}) => (
        <section>
             <div style={{
                 width: 250, height: 240, border: '1px solid lightgray', borderRadius: '120px',
                 display: 'flex', alignItems: 'center', justifyContent: 'center' 
                }}
                {...getRootProps()}>
                 <input {...getInputProps()} />
                 <FontAwesomeIcon icon={faImage} style={{fontSize:'4rem'}} />
             </div>
        </section>
  )}
        </Dropzone>

        <div style={{display: 'flex', width: '350px', height: '250px', overflow: 'scroll'}}>
            {Images.map((image, index) => (
                <div onClick={()=> deleteHandler(image)} key={index}>
                    <img style={{minWidth: '150px', width:'150px', height: '150px'}}
                          src={`${image}`} 
                        //   http://localhost:5000/
                    />
                </div>
            ))}
            
            
        </div>        


    </div>
    )
}

export default FileUpload