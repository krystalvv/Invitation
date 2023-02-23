import { useState } from "react";

const Select = ({ list, onSelected }) => {
	const [open, setOpen] = useState(false);
	const [selIndex, setIndex] = useState(0);

	function selectIndex (index) {
		setOpen(false);
		setIndex(index);
		onSelected(index);
	}

	return (
		<div className='select'>
			<div className='select_control' onClick={() => setOpen(true)}>{list[selIndex]}
			</div>
			<div className='select_option' style={{marginTop:'40px', display:open?'':'none'}}>
				{list.map((value, index) => (
					<>
					<div className='select_option_item' style={{backgroundColor: index === selIndex ? "#f5f5f5" : "white"}} onClick={() => selectIndex(index)}>{value}</div>
					{index < list.length - 1 && 
						<div style={{marginBottom: '0.5em'}}/>
					}
					</>
				))}
			</div>
		</div>
	)
}
export default Select;