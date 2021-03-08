import React from 'react'
import { Row, Col } from 'reactstrap'

const Header = () => {
    return (
        <div id="page-header" className="mb-3">
            <Row>
                <Col md="6" sm="auto" className="text-center m-auto">
                    <h1>Read Our Blog</h1>
                    <p>사진 동호회 사이트입니다</p>
                </Col>
            </Row>
            
        </div>
    )
}

export default Header
