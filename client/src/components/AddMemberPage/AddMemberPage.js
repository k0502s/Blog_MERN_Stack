import React, {useState, useEffect} from 'react'
import { Button, Form, Input} from 'reactstrap';
import FileUpload from '../utils/FileUpload';
import { useDispatch, useSelector } from "react-redux";
import { MEMBER_UPLOADING_REQUEST } from "../../redux/types";





const Continents =[
    {key:1, value: "Arfica"},
    {key:2, value: "Europe"},
    {key:3, value: "Asia"},
    {key:4, value: "North America"},
    {key:5, value: "South America"},
    {key:6, value: "Australia"},
    {key:7, value: "Antarctica"}
]


const AddMemberPage = (props) => {

    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Price, setPrice] = useState("")
    const [Continent, setContinent] = useState(1)
    const [Images, setImages] = useState([])
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);


   

    const titleChangeHandler = (e) => {
        setTitle(e.currentTarget.value)
    }

    const descriptionChangeHandler = (e) => {
        setDescription(e.currentTarget.value)
    }

    const priceChangeHandler = (e) => {
        setPrice(e.currentTarget.value)
    }

    const continentChangeHandler = (e) => {
        setContinent(e.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if(!Title || !Description || !Price || !Continent || !Images){
            return alert("빈 칸에 정보를 입력해야 합니다.")
        }

        //서버에 채운 값들을 request을 보낸다.
        const body = {
            writer: user._id,//로그인된 사람의 ID
            title: Title,
            description: Description,
            price: Price,
            images: Images,
            continents: Continent
        }
        dispatch({
            type: MEMBER_UPLOADING_REQUEST,
            payload: body
        })     
    }




    return (
        <div style={{maxWidth: '700px', margin: '2rem auto'}}>
        <div  style={{textAlign: 'center', marginBottom: '1rem'}}>
            <h2>회원 추가하기</h2>
        </div>
        <Form onSubmit={submitHandler}>
          {/* DropZone   */}
          <FileUpload refreshFunction={updateImages}/>
          <label>이름</label>
          <Input onChange={titleChangeHandler} value={Title}/>
          <br />
          <label>나이</label>
          <Input onChange={descriptionChangeHandler} value={Description}/>
          <br />
          <label>카메라 기종</label>
          <Input onChange={priceChangeHandler} value={Price}/>
          <br />
          <select onChange={continentChangeHandler} value={Continent}>
            {Continents.map(item => (
                <option key={item.key} value={item.key}>{item.value}</option>
            ))}
            </select>
            <Button className="col-md-2 offset-md-10" onClick={submitHandler} >
            확인
            </Button>
        </Form>
    </div>
    )

}

export default AddMemberPage
