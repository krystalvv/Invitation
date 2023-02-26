import React, { useCallback, useState } from 'react';
import 'moment/locale/ko';
import { Card, CardItem } from '../component/Card';
import Select from '../component/Select';
import { Input, Row } from 'reactstrap';
import { FileUploader } from "react-drag-drop-files";
import InsertImage from '../component/InsertImage';
import { Container as MapDiv, NaverMap, Marker } from 'react-naver-maps';

import images from '../image/naver_map.png'
import DragAndDrop from '../component/DragAndDrop';
import AdditiolnalInput from '../component/AdditionalInput';

const Forms = (props) => {
    // static value
    const colorChip = [
        { name: 'Ink Black', line: '#06080F', text: '#06080F', theme: '#06080F' },
        { name: 'Sour Cream', line: '#F1EFE8', text: '#FFFDF7', theme: '#48433E' },
        { name: 'Misty Rose', line: '#F5E6E3', text: '#F5E6E3', theme: '#C77751' },
        { name: 'Dusty Ash', line: '#9DA69F', text: '#5C6B64', theme: '#545E4C' },
        { name: 'Wenge', line: '#7F7065', text: '#695E4E', theme: '#8A614A' },
        { name: 'Purple Violet', line: '#908394', text: '#41354D', theme: '#65566D' },
        { name: 'Deep Blue', line: '#08113B', text: '#08113B', theme: '#242D56' },
    ]

    const colors = ['Red', 'Green', 'Blue', 'Yellow', 'Black', 'White', 'Orange'];

    const fileTypes = ["JPG", "PNG", "GIF"];

    const order = ['인사말', '캘린더', '식전 영상', '갤러리', '오시는 길', '안내사항', '방명록', '마음 전하실 곳']
    
    // input value - 나중에 적용...
    const [inputs, setInputs] = useState({
        template_type: 0,
        template_line_color: '#000',
        template_text_color: '#000',
        template_theme_color: '#000',
        template_date: '00 | 00',
        template_groom_name: '신랑 이름',
        template_bride_name: '신부 이름',
        template_space: '',
        template_image: '',
        message_title: '초대합니다',
        message_content: '[청첩장 문구]에 내용을 입력해주세요.',
        groom_name: '',
        groom_father: '',
        groom_mather: '',
        groom_relative: '',
        bride_name: '',
        bride_father: '',
        bride_mather: '',
        bride_relative: '',
        calendar_style: 0,
        date: new Date(),
        time: '',
        set_dDay: true,
        gallery_type: true,
        gallery: [],
        address: '',
        detail_address: '',
        assign: '',
        assign_number: '',
        guide: [{ type: '지하철', content: '' }, { type: '버스', content: '' }, { type: '자가용', content: '' }],
        groom_account: [{ nickname: '신랑', name: '', account: '', bank: '' }, { nickname: '아버님', name: '', account: '', bank: '' }, { nickname: '어머님', name: '', account: '', bank: '' }],
        bride_account: [{ nickname: '신랑', name: '', account: '', bank: '' }, { nickname: '아버님', name: '', account: '', bank: '' }, { nickname: '어머님', name: '', account: '', bank: '' }],
        map_type: true
    })

    const { template_style, template_type, template_line_color, template_text_color,
        template_theme_color, template_date, template_groom_name, template_bride_name,
        template_space, template_image, message_title, message_content,
        groom_name, groom_father, groom_mather, groom_relative,
        bride_name, bride_father, bride_mather, bride_relative,
        calendar_style, date, time, set_dDay,
        gallery_type, gallery,
        address, detail_address, assign, assign_number,
        guide, groom_accout, bride_account, map_type
    } = inputs;

    const onChange = e => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });

        // parent
        props.setInputData({
            ...inputs,
            [e.target.name]: e.target.value
        })
    };

    const [direct, setDirect] = useState(0);
    const [mapType, setMapType] = useState(true);

    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    function selectDirect(index) {
        setDirect(index);
    }

    function getAccountInfo(e, index, item) {
        let totalAccount = props.accountNumber;
        let accountInfo;
        if (direct === 0)
            accountInfo = totalAccount.groom;
        else
            accountInfo = totalAccount.bride;

        let currentAccount = accountInfo[index]

        if (item === '호칭') {
            currentAccount.nickname = e.target.value;
        }
        else if (item === '예금주') {
            currentAccount.name = e.target.value;
        }
        else if (item === '은행') {
            currentAccount.bank = e.target.value;
        }
        else if (item === '계좌번호') {
            currentAccount.account = e.target.value;
        }

        accountInfo[index] = currentAccount;
        props.setAccountNumber(totalAccount);
        props.forceUpdate();
    }

    function setMainImage(file) {
        props.setTemplateImage(file);
    }

    const handleChange = (file) => {
        let list = props.gallery;
        list.push(URL.createObjectURL(file));

        props.setGallery(list);

        props.forceUpdate()
    };

    function splite() {
        return (
            <div style={{ height: 1, backgroundColor: '#f5f5f5', marginTop: '1.0em', marginBottom: '1.0em' }} />
        )
    }

    const setColor = (index) => {
        props.setTemplateText(colorChip[index].text)
        props.setTemplateTheme(colorChip[index].theme)
        props.setTemplateLine(colorChip[index].line)
    }

    const changeDate = (e) => {
        let strDate = JSON.stringify(e.target.value).replace('"', '').split('-');
        let date = props.date;
        date.setFullYear(parseInt(strDate[0]));
        date.setMonth(parseInt(strDate[1] - 1));
        date.setDate(parseInt(strDate[2]));

        props.setdate(date)

        props.forceUpdate()
    }

    const changeTime = (e) => {
        let strTime = JSON.stringify(e.target.value).replace('"', '').split(':');

        let formTime;
        if (parseInt(strTime[0]) - 12 > 0)
            formTime = `오후 ${parseInt(strTime[0]) - 12}시 `
        else if (parseInt(strTime[0]) === 0)
            formTime = `오전 12시 `
        else
            formTime = `오전 ${parseInt(strTime[0])}시 `

        formTime += parseInt(strTime[1]) + '분';

        props.setTime(JSON.stringify(formTime).replace('"', '').replace('"', ''))
    }

    const templateItem = (index) => {
        props.setTemplateStyle(index)
    };

    const calendarItem = (index) => {
        props.setCalendarStyle(index)
    };

    const deleteImage = (i) => {
        let list = props.gallery;
        console.log(list)
        list.splice(i, 1);
        console.log(list)
        props.setGallery(list);

        forceUpdate()
    }

    function getImageList() {
        let images = [];
        for (let i = 0; i < props.gallery.length; i++) {
            images.push(<div style={{ width: 100, height: 100, margin: 5, cursor: 'pointer' }} onClick={() => deleteImage(i)}>
                <img alt='list_img' src={props.gallery[i]} style={{ width: "100%", height: "100%", margin: "5px" }}></img>
            </div>);
        }

        return (
            <div style={{ display: 'block' }}>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    {images}
                </div>
            </div>
        )

    }
    
    return (
        <form className="form">

            <Card title={'템플릿'}>
                <CardItem
                    title={'스타일'}
                    renderItem={
                        <Select list={['심플', '직접 디자인하기']} onSelected={templateItem} />
                    }
                />
                {splite()}
                <CardItem
                    hide={props.templateStyle === 1}
                    title={'타입'}
                    renderItem={
                        <div style={{ display: 'flex', flex: 1, overflow: 'auto', whiteSpace: 'nowrap' }}>
                            <div onClick={() => props.setTemplateType(0)} style={{ cursor: 'pointer', display: 'inline-block', width: '30%', padding: 15, border: '1px solid #d9d9d9', borderWidth: props.templateType === 0 ? 1 : 0, backgroundColor: props.templateType === 0 ? '#f5f5f5' : 'white' }}>
                                <img alt="img1" src='https://moinvi.com/img/theme_sample_02.png' style={{ width: '100%', height: 'auto', boxShadow: '0 0 6px 2px #d9d9d9' }}></img>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 30 }}>
                                    <p style={{ fontSize: '0.8em' }}> 타입 A</p>
                                </div>
                            </div>
                            <div onClick={() => props.setTemplateType(1)} style={{ cursor: 'pointer', display: 'inline-block', width: '30%', padding: 15, border: '1px solid #d9d9d9', borderWidth: props.templateType === 1 ? 1 : 0, backgroundColor: props.templateType === 1 ? '#f5f5f5' : 'white' }}>
                                <img alt="img2" src='https://moinvi.com/img/theme_sample_00.png' style={{ width: '100%', height: 'auto', boxShadow: '0 0 6px 2px #d9d9d9' }}></img>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 30 }}>
                                    <p style={{ fontSize: '0.8em' }}> 타입 B</p>
                                </div>
                            </div>
                            <div onClick={() => props.setTemplateType(2)} style={{ cursor: 'pointer', display: 'inline-block', width: "30%", padding: 15, border: '1px solid #d9d9d9', borderWidth: props.templateType === 2 ? 1 : 0, backgroundColor: props.templateType === 2 ? '#f5f5f5' : 'white' }}>
                                <img alt="img3" src='https://moinvi.com/img/theme_sample_01.png' style={{ width: '100%', height: 'auto', boxShadow: '0 0 6px 2px #d9d9d9' }}></img>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 30 }}>
                                    <p style={{ fontSize: '0.8em' }}> 타입 C</p>
                                </div>
                            </div>
                        </div>
                    }
                />
                {props.templateStyle !== 1 && splite()}
                <CardItem
                    title={'색상'}
                    renderItem={
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                            <div style={{ width: '100%', height: '100%' }}>
                                {
                                    colorChip.map((value, index) => (
                                        <div style={{ cursor: 'pointer', display: 'inline-flex', width: 70, height: 70, justifyContent: 'center' }} onClick={() => setColor(index)}>
                                            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                                <div style={{ alignItems: 'center', justifyContent: 'center', width: 42, height: 42, border: '1px solid #d9d9d9', borderRadius: '9999px', marginBottom: 5 }}>
                                                    <div style={{ marginLeft: 3, marginTop: 3, width: 34, height: 34, border: '1px solid #f0f0f0', borderRadius: '9999px', backgroundColor: value.line }}></div>
                                                </div>
                                                <div style={{ fontSize: 11, textAlign: 'center', whiteSpace: 'nowrap', color: '#8c8c8c' }}>{value.name}</div>
                                            </div>


                                        </div>
                                    ))
                                }
                            </div>

                        </div>
                    }
                />
            </Card>
            <Card title={'예식일'}>
                <CardItem
                    title={'날짜'}
                    renderItem={
                        <Input className='input' type='date' onChange={changeDate}></Input>
                    }
                />
                <CardItem
                    title={'시간'}
                    renderItem={
                        <Input className='input' type='time' onChange={changeTime}></Input>
                    }
                />
            </Card>
            <Card title={'첫 화면'}>
                <CardItem
                    title={'날짜'}
                    renderItem={
                        <Input className="input" type='text' placeholder='날짜' onChange={(e) => { props.setTemplateDate(e.target.value) }}></Input>
                    }
                />
                <CardItem
                    title={'이름'}
                    renderItem={
                        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
                            <Input className="input" type='text' placeholder='신랑' onChange={(e) => { props.setTemplateGroom(e.target.value) }}></Input>
                            <Input className="input" type='text' placeholder='신부' onChange={(e) => { props.setTemplateBride(e.target.value) }}></Input>
                        </div>
                    }
                />
                <CardItem
                    title={'장소'}
                    renderItem={
                        <Input className="input" type='text' placeholder='장소' onChange={(e) => { props.setTemplateSpace(e.target.value) }}></Input>
                    }
                />
                {splite()}
                <CardItem
                    title={'사진'}
                    renderItem={
                        <div className='filebox'>
                            <InsertImage setMainImage={setMainImage} />
                        </div>
                    }
                />
            </Card>
            <Card title={'청첩장 문구'}>
                <CardItem
                    title={'제목'}
                    renderItem={
                        <Input className="input" type='text' placeholder='제목' onChange={(e) => { props.setTitle(e.target.value) }}></Input>
                    }
                />
                <CardItem
                    title={'내용'}
                    renderItem={
                        <Input className="textarea" type='textarea' placeholder='내용' onChange={(e) => { props.setContent(e.target.value) }}></Input>
                    }
                />
                {/* <Row style={{ display: 'flex', justifyContent: 'right' }}>
                    <div style={{ fontSize: '0.8em', textDecoration: 'underline' }}>샘플 텍스트 보기</div>
                </Row> */}
            </Card>
            <Card title={'보내는 사람'}>
                <CardItem
                    title={'신랑'}
                    renderItem={
                        <div style={{ flex: 1, display: 'flex' }}>
                            <Input className="input" type='text' placeholder='이름' onChange={(e) => { props.setGroomName(e.target.value) }}></Input>
                            <Input className="input" type='text' placeholder='관계' onChange={(e) => { props.setGroomRelative(e.target.value) }}></Input>
                        </div>

                    }
                />
                <CardItem
                    title={'아버지'}
                    renderItem={
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                            <Input className="input" type='text' placeholder='이름' onChange={(e) => { props.setGroomFather(e.target.value) }} />
                            <Input className="checkbox" type='checkbox' />
                            <div className="label">고인</div>
                        </div>
                    }
                />
                <CardItem
                    title={'어머니'}
                    renderItem={
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                            <Input className="input" type='text' placeholder='이름' onChange={(e) => { props.setGroomMather(e.target.value) }} />
                            <Input className="checkbox" type='checkbox' />
                            <div className="label">고인</div>
                        </div>
                    }
                />
                {splite()}

                <CardItem
                    title={'신부'}
                    renderItem={
                        <div style={{ flex: 1, display: 'flex' }}>
                            <Input className="input" type='text' placeholder='이름' onChange={(e) => { props.setBrideName(e.target.value) }} />
                            <Input className="input" type='text' placeholder='관계' onChange={(e) => { props.setBrideRelative(e.target.value) }} />
                        </div>

                    }
                />
                <CardItem
                    title={'아버지'}
                    renderItem={
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                            <Input className="input" type='text' placeholder='이름' onChange={(e) => { props.setBrideFather(e.target.value) }} />
                            <Input className="checkbox" type='checkbox' />
                            <div className="label">고인</div>
                        </div>
                    }
                />
                <CardItem
                    title={'어머니'}
                    renderItem={
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                            <Input className="input" type='text' placeholder='이름' onChange={(e) => (props.setBrideMather({ name: e.target.value, leaved: props.brideMather.leaved }))} />
                            <Input className="checkbox" type='checkbox' onChange={(e) => (props.setBrideMather({name:props.brideMather.name, leaved:e.checked}))} />
                            <div className="label">고인</div>
                        </div>
                    }
                />
                {splite()}
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: "2em" }}>
                    <div className='label'>※ 아버님, 어머님의 정보는 빈칸으로 두시면 생략이 가능합니다.</div>
                </div>
            </Card>
            <Card title={'캘린더 스타일'}>
                <CardItem
                    title={'스타일'}
                    renderItem={
                        <Select list={['원형', '동그라미', '하트']} onSelected={calendarItem} />
                    }
                />
                {splite()}
                <CardItem
                    title={'디데이'}
                    renderItem={
                        <>
                            <Input className="checkbox" type='checkbox' checked={props.dDay} onChange={(e) => props.setVisibleDday(e.target.checked)} />
                            <div className='label'>※ 캘린더 하단에 D-Day를 표시합니다.</div>
                        </>
                    }
                />
            </Card>
            <Card title={"갤러리"}>
                <CardItem
                    title={'타입'}
                    renderItem={
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                                <Input className="radio" type='radio' checked={props.galleryType === true} onChange={() => props.setGalleryType(true)}></Input>
                                <div style={{ fontSize: '0.9em' }}>스와이프</div>
                            </div>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                                <Input className="radio" type='radio' checked={props.galleryType === false} onChange={() => props.setGalleryType(false)}></Input>
                                <div style={{ fontSize: '0.9em' }} >그리드</div>
                            </div>
                        </div>
                    }
                />
                {splite()}
                <CardItem
                    title={'사진'}
                    renderItem={
                        <div className='filebox'>
                            <div style={{ position: 'absolute', fontSize: '0.8em', whiteSpace: 'pre-wrap', textAlign: 'center' }}><div>{'첨부할 파일을 여기에 끌어서 추가할 수 있습니다\n'}</div><div className='label'>{'(30장까지 추가할 수 있습니다.)'}</div></div>

                            <div style={{ opacity: 0, flex: 1, height: 68 }}>
                                <FileUploader fileTypes={fileTypes} handleChange={handleChange} name="file" />
                            </div>
                        </div>
                    }
                />
                {splite()}
                <CardItem
                    title={''}
                    renderItem={
                        <div className='gallery'>
                            {props.gallery.length === 0 ?
                                <div>등록된 이미지가 없습니다.</div> :
                                <div style={{ display: 'block' }}>
                                    {getImageList()}
                                </div>
                            }
                        </div>

                    } />
                {splite()}
                <CardItem
                    title={''}
                    renderItem={
                        <div className='label'>
                            ※ 사진을 길게 눌러 순서를 변경할 수 있습니다.
                        </div>

                    } />
                {splite()}
                <CardItem
                    title={'확대 방지'}
                    renderItem={
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Input className="checkbox" type='checkbox'></Input>
                            <div className='label'>※ 이미지 확대 및 다운로드를 방지합니다.</div>
                        </div>
                    }
                />

            </Card>
            <Card title={"예식장 정보"}>
            <CardItem
                    title={'타입'}
                    renderItem={
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                                <Input className="radio" type='radio' checked={mapType === true} onChange={() => setMapType(true)}></Input>
                                <div style={{ fontSize: '0.9em' }}>네이버 지도</div>
                            </div>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                                <Input className="radio" type='radio' checked={mapType === false} onChange={() => setMapType(false)}></Input>
                                <div style={{ fontSize: '0.9em' }} >약도</div>
                            </div>
                        </div>
                    }
                />
                { mapType === true &&
                <CardItem
                    title={'지도'}
                    renderItem={
                <div>
                    <img src={images}></img>
                </div>
                    } />
                }
                                { mapType === false &&
                        <CardItem
                        title={'약도'}
                        renderItem={
                            <div className='filebox'>
                                <div style={{ position: 'absolute', fontSize: '0.8em' }}>첨부할 파일을 여기에 끌어서 추가할 수 있습니다</div>
    
                                <div style={{ opacity: 0 }}>
                                    <FileUploader fileTypes={fileTypes} handleChange={handleChange} name="file" />
                                </div>
                            </div>
                        }
                    />}
                {/* <div>
                    <MapDiv
                        style={{
                            height: 400,
                        }}
                    >
                        <NaverMap>
                            <Marker defaultPosition={{ lat: 37.5666103, lng: 126.9783882 }} />
                        </NaverMap>
                    </MapDiv>
                </div> */}
                <CardItem
                    title={'주소'}
                    renderItem={
                        <Input className="input" type='text' placeholder='주소' onChange={(e) => { props.setAddress(e.target.value) }} />

                    } />
                <CardItem
                    title={'상세주소'}
                    renderItem={
                        <Input className="input" type='text' placeholder='상세주소' onChange={(e) => { props.setDetailAddress(e.target.value) }} />

                    } />
                <CardItem
                    title={'연락처'}
                    renderItem={
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                            <Input className="input" type='text' placeholder='담당자' onChange={(e) => { props.setAssign(e.target.value) }} />
                            <Input className="input" type='text' placeholder='연락처' onChange={(e) => { props.setNumber(e.target.value) }} />
                        </div>


                    } />
            </Card>
            <Card title={"길안내"}>
                <CardItem
                    title={'텍스트'}
                    renderItem={
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                                <Input className="radio" type='radio'></Input>
                                <div style={{ fontSize: '0.9em' }}>왼쪽 정렬</div>
                            </div>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                                <Input className="radio" type='radio'></Input>
                                <div style={{ fontSize: '0.9em' }}>중앙 정렬</div>
                            </div>
                        </div>
                    }
                />
                {splite()}
                <CardItem
                    title={'안내 1'}
                    renderItem={
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '200px' }}>
                            <Input style={{ flex: 1 }} className="input" type="text" placeholder='제목' onChange={(e) => { props.setGuide1({ title: e.target.value, content: props.guide1.content }) }}></Input>
                            <Input style={{ flex: 6 }} className="textarea" type="textarea" placeholder='내용' onChange={(e) => { props.setGuide1({ title: props.guide1.title, content: e.target.value }) }}></Input>
                        </div>
                    } />
                {splite()}
                <CardItem
                    title={'안내 2'}
                    renderItem={
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '200px' }}>
                            <Input style={{ flex: 1 }} className="input" type="text" placeholder='제목' onChange={(e) => { props.setGuide2({ title: e.target.value, content: props.guide2.content }) }}></Input>
                            <Input style={{ flex: 6 }} className="textarea" type="textarea" placeholder='내용' onChange={(e) => { props.setGuide2({ title: props.guide2.title, content: e.target.value }) }}></Input>
                        </div>
                    } />
                {splite()}
                <CardItem
                    title={'안내 3'}
                    renderItem={
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '200px' }}>
                            <Input style={{ flex: 1 }} className="input" type="text" placeholder='제목' onChange={(e) => { props.setGuide3({ title: e.target.value, content: props.guide3.content }) }}></Input>
                            <Input style={{ flex: 6 }} className="textarea" type="textarea" placeholder='내용' onChange={(e) => { props.setGuide3({ title: props.guide3.title, content: e.target.value }) }}></Input>
                        </div>
                    } />
                {splite()}
                <CardItem
                    title={''}
                    renderItem={
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: 10 }}>
                            <div className='button'>교통수단 추가하기</div>
                        </div>

                    } />
            </Card>
            <Card title={"계좌정보"}>
                <CardItem
                    title={'버튼 이름'}
                    renderItem={
                        <Select list={['신랑측 계좌번호', '신부측 계좌번호']} onSelected={selectDirect} />
                    }
                />

                <CardItem
                    hide={direct === 1}
                    title={'계좌'}
                    renderItem={
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginBottom: '1.0em' }}>
                            {
                                props.accountNumber.groom.map((value, i) => (
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginBottom: '1.0em' }}>
                                        <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                                            <Input className='input' type="text" placeholder='호칭' onChange={(e) => getAccountInfo(e, i, '호칭')}></Input>
                                        </div>
                                        <div style={{ display: 'flex', flex: 2, flexDirection: 'row' }}>
                                            <Input className='input' type="text" placeholder='예금주' onChange={(e) => getAccountInfo(e, i, '예금주')}></Input>
                                            <Input className='input' type="text" placeholder='은행' onChange={(e) => getAccountInfo(e, i, '은행')}></Input>
                                        </div>
                                        <Input className='input' type="text" placeholder='계좌번호' onChange={(e) => getAccountInfo(e, i, '계좌번호')}></Input>
                                    </div>
                                ))
                            }

<AdditiolnalInput/>
                        </div>
                    }
                />
                <CardItem
                    hide={direct === 0}
                    title={'계좌'}
                    renderItem={
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginBottom: '1.0em' }}>
                            {
                                props.accountNumber.bride.map((value, i) => (
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginBottom: '1.0em' }}>
                                        <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                                            <Input className='input' type="text" placeholder='호칭' onChange={(e) => getAccountInfo(e, i, '호칭')}></Input>
                                        </div>
                                        <div style={{ display: 'flex', flex: 2, flexDirection: 'row' }}>
                                            <Input className='input' type="text" placeholder='예금주' onChange={(e) => getAccountInfo(e, i, '예금주')}></Input>
                                            <Input className='input' type="text" placeholder='은행' onChange={(e) => getAccountInfo(e, i, '은행')}></Input>
                                        </div>
                                        <Input className='input' type="text" placeholder='계좌번호' onChange={(e) => getAccountInfo(e, i, '계좌번호')}></Input>
                                    </div>
                                ))
                            }
                        </div>
                    }
                />

                {splite()}
                <CardItem
                    title={''}
                    renderItem={
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: 10 }}>
                            <div className='button'>계좌번호 추가하기</div>
                        </div>

                    } />

            </Card>
            <Card title={"연락처정보"}>
                <CardItem
                    title={'버튼 이름'}
                    renderItem={
                        <Select list={['신랑에게 연락하기', '신부에게 연락하기', '혼주에게 연락하기']} />
                    }
                />
                <CardItem
                    title={'연락처'}
                    renderItem={
                        <Input className='input' type='text' placeholder='연락처' />
                    }
                />
                {splite()}
                <CardItem
                    title={''}
                    renderItem={
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: 10 }}>
                            <div className='button'>연락처 추가하기</div>
                        </div>

                    } />
                {splite()}
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: "2em" }}>
                    <div>
                        <div className='label'>※ 버튼에 소속 된&nbsp;<span style={{ color: 'black' }}>연락처가 2개 이상&nbsp;</span>일 경우 버튼이&nbsp;<span style={{ color: 'black' }}>팝업</span>으로 대체됩니다.</div>
                        <div className='label'>※ 팝업에서 <span style={{ color: 'black' }}>그룹 명이 같은 경우&nbsp;</span>묶여서 표시됩니다.</div>
                    </div>
                </div>
            </Card>
            <Card title={"식전 영상"}>
                <CardItem
                    title={'링크'}
                    renderItem={
                        <Input className="input" type='text' placeholder='http://youtube/[id]' />
                    }
                />
            </Card>
            <Card title={"안내사항"}>
                <CardItem
                    title={'제목'}
                    renderItem={
                        <Input className="input" type='text' placeholder='제목' />
                    }
                />
                <CardItem
                    title={'내용'}
                    renderItem={
                        <Input className="textarea" type='textarea' placeholder='내용' />
                    }
                />

                {splite()}

                <CardItem
                    title={'참석여부'}
                    renderItem={
                        <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }} >
                            <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
                                <Input className="input" type='text' placeholder='버튼 이름' />
                                <Input className="input" type='text' placeholder='구글 폼 URL' />
                            </div>
                            <Row style={{ display: 'flex', justifyContent: 'right' }}>
                                <div style={{ fontSize: '0.8em', textDecoration: 'underline' }}>참석 여부 등록하는 방법</div>
                            </Row>
                        </div>
                    }
                />

            </Card>
            <Card title={"썸네일"}>
                <CardItem
                    title={'카카오톡'}
                    renderItem={
                        <div className='filebox'>
                            <div style={{ position: 'absolute', fontSize: '0.8em' }}>첨부할 파일을 여기에 끌어서 추가할 수 있습니다</div>

                            <div style={{ opacity: 0 }}>
                                <FileUploader fileTypes={fileTypes} handleChange={handleChange} name="file" />
                            </div>
                        </div>
                    }
                />
                {splite()}
                <CardItem
                    title={'URL'}
                    renderItem={
                        <div className='filebox'>
                            <div style={{ position: 'absolute', fontSize: '0.8em' }}>첨부할 파일을 여기에 끌어서 추가할 수 있습니다</div>

                            <div style={{ opacity: 0 }}>
                                <FileUploader fileTypes={fileTypes} handleChange={handleChange} name="file" />
                            </div>
                        </div>
                    }
                />
                {splite()}
                <CardItem
                    title={'제목'}
                    renderItem={
                        <Input className="input" type='text' placeholder='초대합니다' />
                    }
                />
                <CardItem
                    title={'내용'}
                    renderItem={
                        <Input className="textarea" type='textarea' placeholder='한줄에 20자 이내 권장' />
                    }

                />
                {splite()}
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: "1em" }}>
                    <div className='label'>※ 실제 반영까지 약간의 시간이 소요될 수 있습니다. (카카오톡의 경우 1시간)</div>
                </div>
            </Card>
            <Card title={"애니메이션 효과"}>
                <CardItem
                    title={'베경효과'}
                    renderItem={
                        <Select list={['없음', '눈송이', '하트', '콘페티']}></Select>
                    }
                />
                {splite()}
                <CardItem title={'페이드인'} renderItem={
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                <Input className="checkbox" type='checkbox' />
                            <div className="label">※ 스크롤에 따라 부드럽게 등장하는 효과</div>
                            </div>}>
                </CardItem>
            </Card>
            <Card title={"배경음약"}>
                <CardItem
                    title={'배경음악'}
                    renderItem={
                        <Select list={['없음', 'Taizo Audio - In Their Stride.mp3', 'Haim Mazar - Fidder on My Roof.mp3', '파일 첨부하기']}></Select>
                    }
                />
                {splite()}
                <CardItem title={'자동재생'} renderItem={
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                <Input className="checkbox" type='checkbox' />
                            <div className="label">※ 카카오톡에서 열람 시 배경음악을 자동으로 재생합니다.</div>
                            </div>}>
                </CardItem>
                {splite()}
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: "1em" }}>
                    <div className='label'>※ 제공되는 음원은 Premiumbeat의 라이선스에 따라 사용되었습니다.</div>
                </div>
            </Card>

            <Card title={"방명록"}>
                <CardItem
                    title={'비밀번호'}
                    renderItem={
                        <Input className='input' type='password' placeholder='삭제 비밀번호' />
                    }
                />
                {splite()}
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: "1em" }}>
                    <div className='label'>※ 방명록을 삭제할 때 필요한 비밀번호입니다.</div>
                </div>
            </Card>

            <Card title={"추가옵션"}>
            <CardItem
                    title={'배경지'}
                    renderItem={
                        <Select list={['없음', '배경지 A', '배경지 B']}></Select>
                    }
                />
                {splite()}
                <CardItem
                    title={'글꼴'}
                    renderItem={
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', }}>
                        <Select list={['나눔명조', '나눔스퀘어', '마루부리', '디자인하우스']}></Select>
                        <Select list={['작게', '보통', '크게', '더크게']}></Select>
                        </div>
                    }
                />
                {splite()}
                                <CardItem
                    title={'순서변경'}
                    renderItem={
                        <div style={{display:'flex', flex:1, flexDirection:'column'}}>
                <DragAndDrop colors={order}></DragAndDrop>

                            
                        </div>
                    }
                />
                {splite()}

            </Card>

        </form>
    )
}
export default Forms;
