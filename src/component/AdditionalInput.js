import { useState } from "react";
import { Input } from "reactstrap";

const AdditiolnalInput = ({ }) => {
	return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginBottom: '1.0em' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
            <Input className='input' type="text" placeholder='호칭'></Input>
        </div>
        <div style={{ display: 'flex', flex: 2, flexDirection: 'row' }}>
            <Input className='input' type="text" placeholder='예금주'></Input>
            <Input className='input' type="text" placeholder='은행'></Input>
        </div>
        <Input className='input' type="text" placeholder='계좌번호'></Input>
    </div>
	)
}
export default AdditiolnalInput;