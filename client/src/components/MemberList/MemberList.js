import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import WarnButton from './Section/WarnButton';
import { MEMBER_DELETE_REQUEST, MEMBER_LIST_REQUEST } from '../../redux/types';

const sex = {
    1: '남',
    2: '여',
};

const MemberList = (props) => {
    const dispatch = useDispatch();
    const [currentTutorial, setCurrentTutorial] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState([]);

    ////페이지 번호/////

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(3);
    const { memberlist, totalPages } = useSelector((state) => state.member);
    const pageSizes = [3, 6];

    //현재 상태의 검색창에 입력한 title 값, page, pagesize을 params 객체에 담아준다.
    const getRequestParams = (searchTitle, page, pageSize) => {
        let params = {};

        if (searchTitle) {
            params.title = searchTitle;
        }

        if (page) {
            params.page = page - 1;
        }

        if (pageSize) {
            params.size = pageSize;
        }

        return params;
    };

    //현재 상태 값을 담은 params 객체 데이터를 서버로 보내주어 처리한 데이터를 다시 받아옴
    //받아온 데이터를 현재 상태  state의 리스트 값, 페이지의 conut 값으로 업데이트 해줌
    const retrieveTutorials = () => {
        const params = getRequestParams(searchTitle, page, pageSize);

        dispatch({
            type: MEMBER_LIST_REQUEST,
            payload: { params },
        });
    };

    //retrieveTutorials 변수 선언 아래에 와야함
    useEffect(retrieveTutorials, [page, pageSize]);

    //이벤트 발생하면 받아온 값을 통해 state의 page 값 업데이트
    const handlePageChange = (event, value) => {
        setPage(value);
    };

    //이벤트 발생하여 받아온 값을 보여주는 state의 페이지 갯수를 정해주는 pagesize 값을 업데이트 해주고
    //동시에 페이지 번호를 위한 state의 page 값 초기화 시켜줌.
    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
        setPage(1);
    };

    /////리스트 목록//////

    const onChangeSearchTitle = (e) => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const refreshList = () => {
        retrieveTutorials();
        setCurrentTutorial(null);
        setCurrentIndex(-1);
    };

    const refreshList2 = () => {
        retrieveTutorials();
        setCurrentTutorial();
        setCurrentIndex();
    };

    const setActiveTutorial = (tutorial, index) => {
        setCurrentTutorial(tutorial);
        setCurrentIndex(index);
    };

    const deleteTutorial = () => {
        if (currentTutorial) {
            // Axios.delete(`/api/member/${currentTutorial._id}`)
            dispatch({
                type: MEMBER_DELETE_REQUEST,
                payload: currentTutorial._id,
            });
            refreshList2();
        } else {
            refreshList();
        }
    };

    const AddMember = () => {
        props.history.push('/addmember');
    };

    const renderImage = (images) => {
        if (images === []) {
            return `${process.env.REACT_APP_BASIC_IMAGE_URL}`;
        }
        if (images.length > 0) {
            let image = images[0];
            return `${image}`;
            // http://localhost:5000/
        }
    };

    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="회원 이름을 입력해주세요" value={searchTitle} onChange={onChangeSearchTitle} />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={retrieveTutorials}>
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <h4>MEMBER LIST</h4>

                <ul className="list-group">
                    {memberlist &&
                        memberlist.map((memberlist, index) => (
                            <li className={'list-group-item ' + (index === currentIndex ? 'active' : '')} onClick={() => setActiveTutorial(memberlist, index)} key={index}>
                                <h4>{memberlist.title}</h4>
                                <h8>{memberlist.description}</h8>
                            </li>
                        ))}
                </ul>
                <Button className="m-3 btn btn-sm btn-success" onClick={AddMember}>
                    회원 추가
                </Button>
                <Button className="m-3 btn btn-sm btn-danger" onClick={deleteTutorial}>
                    회원 탈퇴
                </Button>
            </div>
            <div className="col-md-6">
                {currentTutorial ? (
                    <div>
                        <h4>MEMBER DATA</h4>
                        <div>
                            <img style={{ width: '130px' }} alt="member" oneEror="this.style.display='none'" src={renderImage(currentTutorial.images)} />
                        </div>
                        <div>
                            <label>
                                <strong>이름:</strong>
                            </label>{' '}
                            {currentTutorial.title}
                        </div>
                        <div>
                            <label>
                                <strong>카메라 기종:</strong>
                            </label>{' '}
                            {currentTutorial.description}
                        </div>
                        <div>
                            <label>
                                <strong>나이 :</strong>
                            </label>{' '}
                            {currentTutorial.price}
                        </div>
                        <div>
                            <label>
                                <strong>성별 :</strong>
                            </label>{' '}
                            {sex[currentTutorial.continents]}
                        </div>
                        <div style={{ display: 'flex' }}>
                            <Link to={'/edit/' + currentTutorial._id} className="m-3 btn-sm btn-success">
                                EDIT
                            </Link>
                            {/* WarnInfo */}
                            <WarnButton detail={currentTutorial} />
                        </div>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please Click on a List...</p>
                    </div>
                )}
            </div>
            <div className="mt-3">
                <h7 style={{ marginLeft: 250 }}>Page: </h7>
                <select onChange={handlePageSizeChange} value={pageSize}>
                    {pageSizes.map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>

                <Pagination className="my-3" color="primary" count={totalPages} page={page} siblingCount={1} boundaryCount={1} shape="rounded" onChange={handlePageChange} />
            </div>
        </div>
    );
};

export default MemberList;
