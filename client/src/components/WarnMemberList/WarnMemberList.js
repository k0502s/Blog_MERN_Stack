import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MEMBER_WARNLIST_REQUEST } from '../../redux/types';
import WarnCardBlock from './Section/WarnCardBlock';
// import { Empty, Result } from 'antd';

const WarnMemberList = (props) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { warnlistDetail } = useSelector((state) => state.auth);

    useEffect(() => {
        let warnLists = []; //여기에 여러 상품 id 값을 받는다.

        //리덕스 User state안에 cart 안에 상품이 들어있는지 확인
        if (user && user.cart)
            if (user.cart.length > 0) {
                user.cart.forEach((item) => {
                    warnLists.push(item.id);
                });
                const body = {
                    warnListsId: warnLists,
                    list: user.cart,
                };

                dispatch({
                    type: MEMBER_WARNLIST_REQUEST,
                    payload: body,
                });

                //    dispatch(getCartItems(warnLists, user.cart))
                //    .then(response => {calculateTotal(response.payload)})
            }
    }, [user]); //useEffect가 처음 실행될때 userData가 없으므로 추가해주었다.


    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h1>WARN MEMBER LIST</h1>

            <div>
                <WarnCardBlock warnlists={warnlistDetail} />
            </div>

            {/* {ShowTotal ?
             <div style={{marginTop: '3rem'}}>
             <h2>Total Amount: ${Total}</h2>
             </div>
             : 
             ShowSuccess ?
             <Result
                status="success"
                title="구매 완료"
            />
             :
             //<ReactFragment><ReactFragment/>를 간단하게 하면 <></> 할 수 있다. 
             //리액트는 JSX를 사용하기에 항상 렌더링부분을 감싸줘야한다
             <>
             <br />
             <Empty description={false} image={Empty.PRESENTED_IMAGE_SIMPLE}/>
             </>
            }
            {ShowTotal &&
            <Paypal 
            total={Total}
            onSuccess={transactionSuccess}
            />
            }
             */}
        </div>
    );
};

export default WarnMemberList;
