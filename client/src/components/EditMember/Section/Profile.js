import React, { useState } from 'react';
import FileUpload from '../../utils/FileUpload';
import { Button, Form, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { MEMBER_SINGLELIST_REQUEST, MEMBER_UPDATELIST_REQUEST } from '../../../redux/types';

const Profile = (props) => {
    const [Images, setImages] = useState([]);
    const dispatch = useDispatch();
    const { singlememberlist } = useSelector((state) => state.member);

    const updateImages = (newImages) => {
        setImages(newImages);
    };

    const cancelHandler = (e) => {
        e.preventDefault();
        props.history.push('/edit/' + singlememberlist._id);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if (!Images) {
            return alert('프로필 사진을 입력해야 합니다.');
        }

        //서버에 채운 값들을 request을 보낸다.
        const body = {
            id: singlememberlist._id,
            images: Images,
        };

        dispatch({
            type: MEMBER_UPDATELIST_REQUEST,
            payload: body,
        });
    };

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div>
                {/* DropZone   */}
                <FileUpload refreshFunction={updateImages} />
            </div>
            <div className="col-md-10" style={{ marginLeft: '500px', marginTop: '50px' }}>
                <Button className="m-3" onClick={submitHandler}>
                    변경하기
                </Button>
                <Button className="m-3" onClick={cancelHandler}>
                    취소
                </Button>
            </div>
        </div>
    );
};

export default Profile;
