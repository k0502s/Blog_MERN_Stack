import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { MEMBER_SINGLELIST_REQUEST, MEMBER_UPDATELIST_REQUEST } from '../../redux/types';
import { Link } from 'react-router-dom';

const Continents = [
    { key: 1, value: '남' },
    { key: 2, value: '여' },
];

const EditMember = (props) => {
    const [form, setValues] = useState({
        title: '',
        description: '',
        price: '',
        images: [],
    });
    const [Continent, setContinent] = useState(0);
    const [Images, setImages] = useState([]);
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { singlememberlist } = useSelector((state) => state.member);

    const getMemberList = (id) => {
        dispatch({
            type: MEMBER_SINGLELIST_REQUEST,
            payload: id,
        });
    };

    useEffect(() => {
        getMemberList(props.match.params.id);
    }, [props.match.params.id]);

    useEffect(() => {
        setValues({
            title: singlememberlist.title,
            description: singlememberlist.description,
            price: singlememberlist.price,
        });
    }, [singlememberlist.title, singlememberlist.description, singlememberlist.price, singlememberlist.continent]);

    useEffect(() => {
        setImages([singlememberlist.images]);
    }, [singlememberlist.images]);

    const onChange = (e) => {
        setValues({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    const continentChangeHandler = (e) => {
        setContinent(e.currentTarget.value);
    };

    const updateImages = (newImages) => {
        setImages(newImages);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        const name = document.myform.title.value;
        const camera = document.myform.description.value;
        const age = document.myform.price.value;
        const sex = document.myform.sex.value;
        if (name === '') {
            return alert('이름 정보를 입력해야 합니다.');
        }
        if (camera === '') {
            return alert('카메라 기종 정보를 입력해야 합니다.');
        }
        if (age === '') {
            return alert('나이 정보를 입력해야 합니다.');
        }
        if (sex === '') {
            return alert('성별 정보를 입력해야 합니다.');
        }
        if (!Images) {
            return alert('프로필 사진을 입력해야 합니다.');
        }

        const { title, description, price } = form;
        //서버에 채운 값들을 request을 보낸다.
        const body = {
            id: singlememberlist._id,
            writer: user._id, //로그인된 사람의 ID
            title: title,
            description: description,
            price: price,
            continents: Continent,
        };

        dispatch({
            type: MEMBER_UPDATELIST_REQUEST,
            payload: body,
        });
    };

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <h2>회원 정보 수정</h2>
            </div>
            <Form onSubmit={submitHandler} name="myform">
                <div>
                    <img
                        style={{ minWidth: '250px', width: '250px', height: '240px', border: '1px solid lightgray', borderRadius: '200px' }}
                        src={`${Images}`}
                        //   http://localhost:5000/
                    />
                    <Link to={'/editprofile/' + singlememberlist._id} className="m-3 btn-sm btn-danger">
                        Profile Edit
                    </Link>
                </div>
                <label>이름</label>
                <Input onChange={onChange} placeholder={'빈 칸에 정보를 입력해주세요.'} name="title" defaultValue={singlememberlist.title} />
                <br />
                <label>카메라 기종</label>
                <Input onChange={onChange} placeholder={'빈 칸에 정보를 입력해주세요.'} name="description" defaultValue={singlememberlist.description} />
                <br />
                <label>나이</label>
                <Input type="number" name="price" onChange={onChange} placeholder={'빈 칸에 정보를 입력해주세요.'} defaultValue={singlememberlist.price} />
                <br />
                <select onChange={continentChangeHandler} value={Continent} name="sex">
                    <option value="">성별을 선택해주세요</option>
                    {Continents.map((item) => (
                        <option key={item.key} value={item.key}>
                            {item.value}
                        </option>
                    ))}
                </select>
                <Button className="col-md-2 offset-md-10" onClick={submitHandler}>
                    확인
                </Button>
            </Form>
        </div>
    );
};

export default EditMember;
