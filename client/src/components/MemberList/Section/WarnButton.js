import React from 'react';
import { Button } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { MEMBER_WARN_REQUEST } from '../../../redux/types';

const WarnButton = (props) => {
    const dispatch = useDispatch();

    const clickHandler = () => {
        const body = {
            token: localStorage.getItem('token'),
            warndata: props.detail._id,
        };
        //필요한 정보를 Cart 필드에 넣어준다.
        // dispatch(addToCart(props.detail._id))
        dispatch({
            type: MEMBER_WARN_REQUEST,
            payload: body,
        });
    };

    return (
        <div>
            <div>
                <Button className="m-3 btn-sm btn-danger" onClick={clickHandler}>
                    WARN
                </Button>
            </div>
        </div>
    );
};

export default WarnButton;
