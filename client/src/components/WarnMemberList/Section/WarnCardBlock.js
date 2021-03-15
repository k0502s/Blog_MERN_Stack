import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MEMBER_REMOVEWARNMEMBER_REQUEST } from '../../../redux/types';
import './WarnCardBlock.scss';

const sex = {
    1: '남',
    2: '여',
};

const WarnCardBlock = (props) => {
    const dispatch = useDispatch();
    const [ShowEmpty, setShowEmpty] = useState("");
    const { warnlistDetail } = useSelector((state) => state.auth);

    //이미지를 한개만 가져오기 위함이다.
    const renderCartImage = (images) => {
        if (images.length > 0) {
            let image = images[0];
            return `${image}`;
        }
    };

    useEffect(() => {
        if (warnlistDetail.length <= 0 || undefined) {
            setShowEmpty(false);
        } else {
            setShowEmpty(true);
        }
    }, [warnlistDetail]);

    let removeFromlist = (id) => {
        const body = {
            token: localStorage.getItem('token'),
            id: id,
        };

        dispatch({
            type: MEMBER_REMOVEWARNMEMBER_REQUEST,
            payload: body,
        });
       
    };

    const renderItems = () =>
        props.warnlists &&
        props.warnlists.map((warnlist, index) => (
            <tr key={index}>
                <td>
                    <img style={{ width: '70px' }} alt="product" src={renderCartImage(warnlist.images)} />
                </td>
                <td>{warnlist.title}</td>
                <td>{sex[warnlist.continents]}</td>
                <td>{warnlist.quantity}</td>
                <td>{warnlist.price}</td>
                <td>
                    <button onClick={() => removeFromlist(warnlist._id)}>Remove</button>
                </td>
            </tr>
        ));

    return (
        <div>
            <br />
            {ShowEmpty ? (
                <table>
                    <thead>
                        <tr>
                            <th>프로필</th>
                            <th>이름</th>
                            <th>성별</th>
                            <th>경고 횟수</th>
                            <th>나이</th>
                            <th>삭제</th>
                        </tr>
                    </thead>

                    <tbody>{renderItems()}</tbody>
                </table>
            ) : (
                <div>데이터가 없습니다.</div>
            )}
            {/* <Empty description={false} image={Empty.PRESENTED_IMAGE_SIMPLE}/> */}
        </div>
    );
};

export default WarnCardBlock;
