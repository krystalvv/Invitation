import React, { useState } from 'react';

import {
  Row,
  Input,
} from 'reactstrap';

import {
  MdEdit,
  MdDelete
} from 'react-icons/md';

const InsertImage = ({ name, setMainImage, ...restProps }) => {

  const [mainImg, setMainImg] = useState(""); // 파일 base64
  
  const handleChangeFile = (event) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      // 2. 읽기가 완료되면 아래코드가 실행됩니다.
      const base64 = reader.result;
      if (base64) {
        setMainImg(base64.toString()); // 파일 base64 상태 업데이트
        setMainImage(base64.toString());
      }
    }
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
    } 


  }

  const handleDeleteFile = () => {
    setMainImg("");
    setMainImage("");
  }

  return ( 
    <div style={{ width:"100%",  padding: "10px" }}>
                    
    <Row style={{ width:"100%", margin: "0px", backgroundColor:'#f5f5f5' }}>
      {mainImg ? 
      <img style={{width:"100%"}}src={mainImg}></img>: 
      <label for={name}>
        <div style={{width:"100%", height:"67px", alignItems:'center', justifyContent:'center', flex:1, display:'flex', fontSize:13, color:'#8c8c8c'}}>
          {'이미지를 추가해주세요'}
        </div>
        <Input type="file" accept='image/jpg,impge/png,image/jpeg,image/gif'  name={name} id={name} onChange={handleChangeFile} style={{ display: "none" }} />
      </label>
      }
    </Row>
    { mainImg && 
    <div style={{ margin: "0px" }}>
    <label for={name}>
        <MdEdit className="can-click" size={20} style={{ margin: "5px" }} />
        <MdDelete className="can-click" size={20} style={{ margin: "5px" }} onClick={handleDeleteFile} />
      </label>
      <Input type="file" accept='image/jpg,impge/png,image/jpeg,image/gif'  name={name} id={name} onChange={handleChangeFile} style={{ display: "none" }} />
    </div>
    }
  </div>
  );
};


export default InsertImage;
