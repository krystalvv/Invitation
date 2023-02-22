export const Card = ({title, children}) => {
    return (
        <div className="card">
            <div className="card_title">{title}
            </div>
        {children}

        </div>
    )
}

export const CardItem = ({title, renderItem}) => {

    return (
        <div className="card_item">
            <div style={{width:'100px', fontSize:'0.85em', margin: 5}}>{title}</div>
            <div style={{flex:1, display:'flex'}}>
            {renderItem}
            </div>

        </div>
    )
}