import React, { useState } from 'react';
import 'moment/locale/ko';
import { Card, CardItem } from '../component/Card';
import Select from '../component/Select';
import { Input, Row } from 'reactstrap';
import { FileUploader } from "react-drag-drop-files";


const Forms = () => {
    const [type, setType] = useState(0)
    const fileTypes = ["JPG", "PNG", "GIF"];
    const [file, setFile] = useState(null);
    const handleChange = (file) => {
        setFile(file);
    };

    function splite() {
        return (
            <div style={{ height: 1, backgroundColor: '#f5f5f5', marginTop: '1.0em', marginBottom: '1.0em' }} />
        )
    }

    return (
        <form className="form">
            <Card title={'템플릿'}>
                <CardItem
                    title={'스타일'}
                    renderItem={
                        <Select list={['심플', '직접 디자인하기']} />
                    }
                />
                {splite()}
                <CardItem
                    title={'타입'}
                    renderItem={
                        <div style={{ display: 'flex', flex: 1, overflow: 'auto', whiteSpace: 'nowrap' }}>
                            <div onClick={() => setType(0)} style={{ display: 'inline-block', width: '30%', padding: 15, border: '1px solid #d9d9d9', borderWidth: type === 0 ? 1 : 0, backgroundColor: type === 0 ? '#f5f5f5' : 'white' }}>
                                <img alt="img1" src='https://moinvi.com/img/theme_sample_02.png' style={{ width: '100%', height: 'auto', boxShadow: '0 0 6px 2px #d9d9d9' }}></img>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 30 }}>
                                    <p style={{ fontSize: '0.8em' }}> 타입 A</p>
                                </div>
                            </div>
                            <div onClick={() => setType(1)} style={{ display: 'inline-block', width: '30%', padding: 15, border: '1px solid #d9d9d9', borderWidth: type === 1 ? 1 : 0, backgroundColor: type === 1 ? '#f5f5f5' : 'white' }}>
                                <img alt="img2" src='https://moinvi.com/img/theme_sample_00.png' style={{ width: '100%', height: 'auto', boxShadow: '0 0 6px 2px #d9d9d9' }}></img>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 30 }}>
                                    <p style={{ fontSize: '0.8em' }}> 타입 B</p>
                                </div>
                            </div>
                            <div onClick={() => setType(2)} style={{ display: 'inline-block', width: "30%", padding: 15, border: '1px solid #d9d9d9', borderWidth: type === 2 ? 1 : 0, backgroundColor: type === 2 ? '#f5f5f5' : 'white' }}>
                                <img alt="img3" src='https://moinvi.com/img/theme_sample_01.png' style={{ width: '100%', height: 'auto', boxShadow: '0 0 6px 2px #d9d9d9' }}></img>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 30 }}>
                                    <p style={{ fontSize: '0.8em' }}> 타입 C</p>
                                </div>
                            </div>
                        </div>
                    }
                />
                {splite()}
                <CardItem
                    title={'색상'}
                />
            </Card>
            <Card title={'예식일'}>
                <CardItem
                    title={'날짜'}
                    renderItem={
                        <Input className='input' type='date'></Input>
                    }
                />
                <CardItem
                    title={'시간'}
                    renderItem={
                        <Input className='input' type='time'></Input>
                    }
                />
            </Card>
            <Card title={'첫 화면'}>
                <CardItem
                    title={'날짜'}
                    renderItem={
                        <Input className="input" type='text' placeholder='날짜'></Input>
                    }
                />
                <CardItem
                    title={'이름'}
                    renderItem={
                        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
                            <Input className="input" type='text' placeholder='신랑'></Input>
                            <Input className="input" type='text' placeholder='신부'></Input>
                        </div>
                    }
                />
                <CardItem
                    title={'장소'}
                    renderItem={
                        <Input className="input" type='text' placeholder='장소'></Input>
                    }
                />
                {splite()}
                <CardItem
                    title={'사진'}
                    renderItem={
                        <div className='filebox'>
                            <div style={{ position: 'absolute', fontSize: '0.8em' }}>첨부할 파일을 여기에 끌어서 추가할 수 있습니다</div>

                            <div style={{ opacity: 0 }}>
                                <FileUploader handleChange={handleChange} name="file" />
                            </div>
                        </div>
                    }
                />
            </Card>
            <Card title={'청첩장 문구'}>
                <CardItem
                    title={'제목'}
                    renderItem={
                        <Input className="input" type='text' placeholder='제목'></Input>
                    }
                />
                <CardItem
                    title={'내용'}
                    renderItem={
                        <Input className="textarea" type='textarea' placeholder='내용'></Input>
                    }
                />
                <Row style={{ display: 'flex', justifyContent: 'right' }}>
                    <div style={{ fontSize: '0.8em', textDecoration: 'underline' }}>샘플 텍스트 보기</div>
                </Row>
            </Card>
            <Card title={'보내는 사람'}>
                <CardItem
                    title={'신랑'}
                    renderItem={
                        <div style={{ flex: 1, display: 'flex' }}>
                            <Input className="input" type='text' placeholder='이름' />
                            <Input className="input" type='text' placeholder='관계' />
                        </div>

                    }
                />
                <CardItem
                    title={'아버지'}
                    renderItem={
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                            <Input className="input" type='text' placeholder='이름' />
                            <Input className="checkbox" type='checkbox' />
                            <div className="label">고인</div>
                        </div>
                    }
                />
                <CardItem
                    title={'어머니'}
                    renderItem={
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                            <Input className="input" type='text' placeholder='이름' />
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
                            <Input className="input" type='text' placeholder='이름' />
                            <Input className="input" type='text' placeholder='관계' />
                        </div>

                    }
                />
                <CardItem
                    title={'아버지'}
                    renderItem={
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                            <Input className="input" type='text' placeholder='이름' />
                            <Input className="checkbox" type='checkbox' />
                            <div className="label">고인</div>
                        </div>
                    }
                />
                <CardItem
                    title={'어머니'}
                    renderItem={
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                            <Input className="input" type='text' placeholder='이름' />
                            <Input className="checkbox" type='checkbox' />
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
                        <Select list={['원형', '동그라미', '하트']} />
                    }
                />
                {splite()}
                <CardItem
                    title={'디데이'}
                    renderItem={
                        <>
                            <Input className="checkbox" type='checkbox' />
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
                                <Input className="radio" type='radio'></Input>
                                <div style={{ fontSize: '0.9em' }}>스와이프</div>
                            </div>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                                <Input className="radio" type='radio'></Input>
                                <div style={{ fontSize: '0.9em' }}>그리드</div>
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

                            <div style={{ opacity: 0, flex: 1, height: 68, backgroundColor: 'red' }}>
                                <FileUploader handleChange={handleChange} name="file" />
                            </div>
                        </div>
                    }
                />
                {splite()}
                <CardItem
                    title={''}
                    renderItem={
                        <div className='gallery'>
                            <div>등록된 이미지가 없습니다.</div>
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
                    title={'주소'}
                    renderItem={
                        <Input className="input" type='text' placeholder='주소'></Input>

                    } />
                <CardItem
                    title={'상세주소'}
                    renderItem={
                        <Input className="input" type='text' placeholder='상세주소'></Input>

                    } />
                <CardItem
                    title={'연락처'}
                    renderItem={
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                            <Input className="input" type='text' placeholder='담당자'></Input>
                            <Input className="input" type='text' placeholder='연락처'></Input>
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
                            <Input style={{ flex: 1 }} className="input" type="text" placeholder='제목' value={'지하철'}></Input>
                            <Input style={{ flex: 6 }} className="textarea" type="textarea" placeholder='내용'></Input>
                        </div>
                    } />
                {splite()}
                <CardItem
                    title={'안내 2'}
                    renderItem={
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '200px' }}>
                            <Input style={{ flex: 1 }} className="input" type="text" placeholder='제목' value={'버스'}></Input>
                            <Input style={{ flex: 6 }} className="textarea" type="textarea" placeholder='내용'></Input>
                        </div>
                    } />
                {splite()}
                <CardItem
                    title={'안내 3'}
                    renderItem={
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '200px' }}>
                            <Input style={{ flex: 1 }} className="input" type="text" placeholder='제목' value={'자가용'}></Input>
                            <Input style={{ flex: 6 }} className="textarea" type="textarea" placeholder='내용'></Input>
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
                        <Select list={['신랑측 계좌번호', '신부측 계좌번호']} />
                    }
                />
                <CardItem
                    title={'계좌'}
                    renderItem={
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginBottom: '1.0em' }}>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginBottom: '1.0em' }}>
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                                    <Input className='input' type="text" placeholder='호칭' value={'신랑'}></Input>
                                </div>
                                <div style={{ display: 'flex', flex: 2, flexDirection: 'row' }}>
                                    <Input className='input' type="text" placeholder='예금주'></Input>
                                    <Input className='input' type="text" placeholder='은행'></Input>
                                </div>
                                <Input className='input' type="text" placeholder='계좌번호'></Input>
                            </div>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginBottom: '1.0em' }}>
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                                    <Input className='input' type="text" placeholder='호칭' value={'아버님'}></Input>
                                </div>
                                <div style={{ display: 'flex', flex: 2, flexDirection: 'row' }}>
                                    <Input className='input' type="text" placeholder='예금주'></Input>
                                    <Input className='input' type="text" placeholder='은행'></Input>
                                </div>
                                <Input className='input' type="text" placeholder='계좌번호'></Input>
                            </div>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                                    <Input className='input' type="text" placeholder='호칭' value={'어머님'}></Input>
                                </div>
                                <div style={{ display: 'flex', flex: 2, flexDirection: 'row' }}>
                                    <Input className='input' type="text" placeholder='예금주'></Input>
                                    <Input className='input' type="text" placeholder='은행'></Input>
                                </div>
                                <Input className='input' type="text" placeholder='계좌번호'></Input>
                            </div>
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
                                <FileUploader handleChange={handleChange} name="file" />
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
                                <FileUploader handleChange={handleChange} name="file" />
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
                        <Input className="textarea"  type='textarea'  placeholder='한줄에 20자 이내 권장' />
                    }

                />
                {splite()}
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: "1em" }}>
                    <div className='label'>※ 실제 반영까지 약간의 시간이 소요될 수 있습니다. (카카오톡의 경우 1시간)</div>
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

        </form>
    )
}
export default Forms;