import React, { useState } from 'react';

export const Card = ({title, children}) => {
    const [close, setClose] = useState(false);
    return (
        <div className="card">
            <div className="card_title" style={{flex:1, display:'flex', justifyContent:'space-between'}}>{title}
            <div style={{fontSize:14, cursor:'pointer', color:'#8c8c8c'}} onClick={() => setClose(!close)}>{close ? '열기' : '닫기'}</div>
            </div>
            <div style={{display:close?'none':''}}>
        {children}
        </div>

        </div>
    )
}

export const CardItem = ({title, renderItem, hide}) => {

    return (
        <div className="card_item" style={{display : hide ? 'none' : ''}}>
            <div style={{width:'100px', fontSize:'0.85em', margin: 5}}>{title}</div>
            <div style={{flex:1, display:'flex'}}>
            {renderItem}
            </div>

        </div>
    )
}