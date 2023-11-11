import React from 'react';
import { Row,Col } from 'antd';
import './style.scss'
interface Props {
    activeTab : string,
    onClick : (option : string) => void
}
const tabItem = 'tab-item'
const tabActive = 'tab-item active'
function Tabs(props : Props) {
    
    const { activeTab,onClick } = props;
    return (
        <Row className='tab-box'>
            <button className={`tab-item ${activeTab === 'week' ? 'active' : ''}`} onClick={()=>onClick('week')}>週間</button>
            <button className={`tab-item ${activeTab === 'month' ? 'active' : ''}`} onClick={()=>onClick('month')}>月間</button>
            <button className={`tab-item ${activeTab === 'year' ? 'active' : ''}`} onClick={()=>onClick('year')}>年間</button>
        </Row>
    )
}
export default Tabs

