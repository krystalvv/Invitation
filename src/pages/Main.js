import React, { useState, useCallback, useEffect } from 'react';
import { format } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { addDays } from 'date-fns';
import 'moment/locale/ko';
import Forms from './Forms';

import {
  AiFillHeart,
} from 'react-icons/ai'
import Slider from 'react-slick';
import { Fade } from 'react-reveal';

const Main = () => {
  const dateArray = ['일', '월', '화', '수', '목', '금', '토']

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const [scrollY, setScrollY] = useState();

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { capture: true }); // 스크롤 이벤트 등록
    return () => {
      window.removeEventListener('scroll', handleScroll); 		// 스크롤 이벤트 제거
    };
  }, [scrollY]);

  function copyLink(value) {

    let t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = value.bank + value.account;
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);

    alert(t.value + ' 클립보드에 복사되었습니다.')

  }

  function handleScroll() {
    const scrollTop = document.getElementById('preview')?.scrollTop;
    setScrollY(scrollTop);		// 스크롤 이벤트가 시작되면 요값이 변경된다
    // console.log(scrollTop);
  }

  //# useState
  const [templateStyle, setTemplateStyle] = useState(0);
  const [templateType, setTemplateType] = useState(0);
  const [templateLineColor, setTemplateLine] = useState('black');
  const [templateTextColor, setTemplateText] = useState('black');
  const [templateThemeColor, setTemplateTheme] = useState('black');

  const [templateDate, setTemplateDate] = useState('00 | 00');
  const [templateGroom, setTemplateGroom] = useState('신랑 이름');
  const [templateBride, setTemplateBride] = useState('신부 이름');
  const [templateSpace, setTemplateSpace] = useState('');
  const [templateImage, setTemplateImage] = useState('');

  const [title, setTitle] = useState('초대합니다');
  const [content, setContent] = useState('[청첩장 문구]에 내용을 입력해 주세요.');

  const [groomName, setGroomName] = useState('');
  const [groomFather, setGroomFather] = useState('');
  const [groomMather, setGroomMather] = useState('');
  const [groomRelative, setGroomRelative] = useState('아들');
  const [brideName, setBrideName] = useState('');
  const [brideFather, setBrideFather] = useState('');
  const [brideMather, setBrideMather] = useState({ name: '', leaved: false });
  const [brideRelative, setBrideRelative] = useState('딸');

  const [calendarStyle, setCalendarStyle] = useState(0);

  const [date, setdate] = useState(new Date());
  const [time, setTime] = useState("");

  const [dDay, setVisibleDday] = useState(true);

  const [gallery, setGallery] = useState([]);

  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [assign, setAssign] = useState('');
  const [number, setNumber] = useState('');

  const [guide1, setGuide1] = useState({ title: '지하철', content: '' });
  const [guide2, setGuide2] = useState({ title: '버스', content: '' });
  const [guide3, setGuide3] = useState({ title: '자가용', content: '' });

  const [accountNumber, setAccountNumber] = useState({
    groom: [{
      nickname: '신랑',
      name: '',
      account: '',
      bank: '',
    },
    {
      nickname: '아버님',
      name: '',
      account: '',
      bank: '',
    },
    {
      nickname: '어머님',
      name: '',
      account: '',
      bank: '',
    },
    ],
    bride: [{
      nickname: '신부',
      name: '',
      account: '',
      bank: '',
    },
    {
      nickname: '아버님',
      name: '',
      account: '',
      bank: '',
    },
    {
      nickname: '어머님',
      name: '',
      account: '',
      bank: '',
    }]
  });

  const [galleryType, setGalleryType] = useState(true);

  const getDDay = () => {
    // D-Day 날짜 지정
    const now = new Date();
    const distance = date.getTime() - now.getTime();
    const day = Math.floor(distance / (1000 * 60 * 60 * 24));
    return day + 1;
  }


  function getImageList() {
    let images = [];
    for (let i = 0; i < gallery.length; i++) {
      images.push(<div style={{ width: 110, height: 110, margin: 5, cursor: 'pointer' }}>
        <img alt='gallery' src={gallery[i]} style={{ width: "100%", height: "100%", margin: "5px" }} />
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


  const RenderCells = ({ currentMonth, onDateClick }) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        days.push(
          <div style={{ display: 'inline-flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }} key={day}>
            {calendarStyle === 2 && formattedDate === date.getDate().toString() && day.getMonth() === date.getMonth() && <AiFillHeart size={40} style={{ position: 'absolute', color: '#8c8c8c' }}><div >{formattedDate}</div></AiFillHeart>}
            <span className="calendar-week_text"
              style={{
                color: calendarStyle !== 1 ? (formattedDate === date.getDate().toString() && day.getMonth() === date.getMonth() ? "white" : "black") : 'black',
                backgroundColor: calendarStyle === 0 ? (formattedDate === date.getDate().toString() && day.getMonth() === date.getMonth() ? "#8c8c8c" : "transparent") : 'transparent',
                border: calendarStyle === 1 ? (formattedDate === date.getDate().toString() && day.getMonth() === date.getMonth() ? "2px solid #8c8c8c" : "") : "",
                borderRadius: '9999px', zIndex: '999'
              }}>
              {formattedDate}
            </span>
          </div>,
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} key={day}>
          {days}
        </div>,
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <main className="main">
      <div className="page">
        <div className="container">
          <div id="preview" className="preview">
            <div style={{ borderWidth: "1px" }}>
              <div className="preview_scroll">


                <div style={{ marginBottom: '4em' }}>
                  <Fade bottom><div style={{ width: '100%', height: 700 }}>
                    <div className="preview_01">
                      <div style={{ width: '100%', height: '100%' }}>
                        {templateStyle === 1 &&

                          <div className="preview_01_image" style={{ backgroundColor: templateImage ? 'white' : '#e5e5e5', minHeight: templateImage ? 0 : 600 }}>
                            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                              {templateImage ? <img alt='preview' style={{ width: "100%" }} src={templateImage}></img> : <div>
                                {'[첫 화면] 에 이미지를 첨부해주세요.'} </div>
                              }
                            </div>
                          </div>
                        }
                        {templateStyle === 0 &&
                          <>
                            {templateType === 0 &&
                              <>
                                {templateStyle === 0 &&
                                  <div className="preview_01_name">
                                    <div style={{ height: '20%' }}></div>
                                    <div style={{ height: '80%' }}>
                                      <div className="preview_01_name_01">
                                        <div className="preview_01_name_01_text" style={{ color: templateThemeColor }}>{templateDate}</div>
                                      </div>
                                      <div className="preview_01_name_02">
                                        <div className="preview_01_name_02_text_01" style={{ color: templateThemeColor }}>{templateGroom}</div>
                                        <div className="preview_01_name_02_text_02" style={{ color: templateThemeColor }}>그리고</div>
                                        <div className="preview_01_name_02_text_03" style={{ color: templateThemeColor }}>{templateBride}</div>
                                      </div>
                                      <div style={{ textAlign: 'center', fontSize: 11, marginTop: -15 }}>
                                        {templateSpace}
                                      </div>
                                    </div>
                                  </div>
                                }

                                <div className="preview_01_image" style={{ backgroundColor: templateImage ? 'white' : '#e5e5e5', minHeight: templateImage ? 0 : 400 }}>
                                  {templateImage ? <img alt='preview' style={{ width: '100%' }} src={templateImage}></img> : <></>}
                                  <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                                    {templateImage ? <div /> : <div>
                                      {'[첫 화면] 에 이미지를 첨부해주세요.'} </div>
                                    }
                                  </div>
                                </div>
                              </>
                            }
                            {templateType === 1 &&
                              <div style={{ height: '100%', justifyContent: 'center', backgroundColor: templateImage ? 'white' : '#e5e5e5', alignItems: 'center', flexDirection: 'column', padding: "3%" }}>
                                {templateImage ? <img alt='preview' style={{ position: 'absolute', width: '94%', border: '2px solid', borderColor: templateLineColor }} src={templateImage}></img> :
                                  <div style={{ position: 'absolute', height: '590px', width: '94%', border: '2px solid', borderColor: templateLineColor }}></div>}
                                <div style={{ position: 'absolute', minHeight: templateImage ? 0 : 570, width: '88%', display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: 10 }}>
                                  <div style={{ display: 'flex', flex: 1, alignItems: 'center', flexDirection: 'column', padding: 10 }}>
                                    <div className="preview_01_name">
                                      <div style={{ height: '20%' }}></div>
                                      <div style={{ height: '80%' }}>
                                        <div className="preview_01_name_01">
                                          <div style={{ color: templateThemeColor, fontSize: 12 }}>{templateDate}</div>
                                        </div>
                                        <div className="preview_01_name_02">
                                          <div className="preview_01_name_02_text_01" style={{ color: templateThemeColor }}>{templateGroom}</div>
                                          <div style={{ color: templateThemeColor, fontSize: 20, width: 100, textAlign: 'center' }}>&</div>
                                          <div className="preview_01_name_02_text_03" style={{ color: templateThemeColor }}>{templateBride}</div>
                                        </div>
                                        <div style={{ textAlign: 'center', fontSize: 11, marginTop: -15 }}>
                                          {templateSpace}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                              </div>
                            }
                            {templateType === 2 &&
                              <>
                                {templateStyle === 0 &&
                                  <div className="preview_01_name">
                                    <div style={{ height: '20%' }}></div>
                                    <div style={{ height: '80%' }}>
                                      <div className="preview_01_name_01">
                                        <div style={{ color: templateThemeColor, fontSize: 12 }}>{templateDate}</div>
                                      </div>
                                      <div className="preview_01_name_02">
                                        <div className="preview_01_name_02_text_01" style={{ color: templateThemeColor }}>{templateGroom}</div>
                                        <div style={{ color: templateThemeColor, fontSize: 20, width: 100, textAlign: 'center' }}>&</div>
                                        <div className="preview_01_name_02_text_03" style={{ color: templateThemeColor }}>{templateBride}</div>
                                      </div>
                                      <div style={{ textAlign: 'center', fontSize: 11, marginTop: -15 }}>
                                        {templateSpace}
                                      </div>
                                    </div>
                                  </div>
                                }
                                <div className="preview_01_image" style={{ flex: 1, display: 'flex', border: '2px solid', borderColor: templateLineColor, margin: 10 }}>
                                  {templateImage && <img alt='preview' style={{ width: '100%' }} src={templateImage}></img>}
                                  <div style={{ width: '100%', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    {templateImage ? <div /> : <div style={{ textAlign: 'center' }}>
                                      {'[첫 화면] 에 이미지를 첨부해주세요.'} </div>
                                    }
                                  </div>
                                </div>
                              </>
                            }
                          </>
                        }
                      </div>

                    </div>
                  </div>
                  </Fade>
                </div>

                <div style={{ height: 400, padding: '4em 2em' }}>
                  {scrollY >= 100 &&
                    <Fade bottom>
                      <div style={{ width: '100%', height: 700 }}>
                        <div className="preview_02_title" style={{ color: templateThemeColor }}>{title}</div>
                        <div style={{ paddingTop: '4em', textAlign: 'center' }}>
                          <p className="preview_02_content">
                            {content}
                          </p>
                        </div>
                        <div className="preview_02_splite"></div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 5 }}>
                            <div style={{ fontWeight: 'bold' }}>{groomFather}•{groomMather}</div><div style={{ fontSize: 13, color: '#8c8c8c' }}>&nbsp;의&nbsp;{groomRelative}</div>&nbsp;<div style={{ fontWeight: 'bold' }}>{groomName}</div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 5 }}>
                            <div style={{ fontWeight: 'bold' }}>{brideFather}•{brideMather.leaved ? '故' + brideMather.name : brideMather.name}</div><div style={{ fontSize: 13, color: '#8c8c8c' }}>&nbsp;의&nbsp;{brideRelative}</div>&nbsp;<div style={{ fontWeight: 'bold' }}> {brideName}</div>
                          </div>
                        </div>
                      </div>
                    </Fade>}
                </div>

                <div style={{ paddingTop: '4em', paddingBottom: '4em' }}>

                  <div style={{ width: '100%', height: 700 }}>
                    {scrollY >= 700 &&

                      <Fade bottom>
                        <div className="preview_03">
                          <div style={{ paddingBottom: '2rem' }}>
                            <div className="preview_03_month" style={{ color: templateThemeColor }} key={date}>{date.getMonth() + 1}월 {date.getDate()}일</div>
                            <div className="preview_03_splite" />
                          </div>
                          <div style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
                            <div className="calendar-week">
                              {dateArray.map((value, index) => (
                                <div className={index === 0 ? "calendar-week_text_sun" : "calendar-week_text"}>{value}</div>
                              ))}
                            </div>
                            <div>
                              <hr className="calendar-week_hairline"></hr>
                            </div>
                            <RenderCells
                              currentMonth={date}
                            />
                            <div>
                              <hr className="calendar-week_hairline"></hr>
                            </div>
                            <div className='calendar-week_time'>
                              <p>{date.getFullYear()}년 {date.getMonth() + 1}월 {date.getDate()}일 {dateArray[date.getDay()]}요일 {time}</p>
                            </div>
                            {dDay &&
                              <div className='preview_03_text_01' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <span>{groomName}</span>
                                <span className='preview_03_text_02'>♥︎</span>
                                <span>{brideName}</span>
                                <span>의 결혼식이</span>
                                <span className='preview_03_text_03'>&nbsp;{getDDay()}일&nbsp;</span>
                                <span>남았습니다.</span>
                              </div>
                            }
                          </div>
                        </div>
                      </Fade>
                    }
                  </div>

                </div>
                <div style={{ width: '100%', height: 700 }}>
                  {scrollY >= 1100 &&
                    <Fade bottom>
                      <div style={{ overflow: 'hidden', paddingTop: '4em', paddingBottom: '4em' }}>
                        <div style={{ paddingBottom: '2rem' }}>
                          <div>
                            <div className='preview_04_title' style={{ color: templateThemeColor }}>갤러리</div>
                            <div className='preview_04_splite'></div>
                          </div>
                        </div>
                        <div>

                        </div>
                        {galleryType === false &&
                          <div className="preview_04_image">
                            <div style={{ display: 'block' }}>
                              {getImageList()}
                            </div>

                          </div>
                        }

                        {galleryType === true &&
                          <Slider>
                            {gallery.map((value, int) => (
                              <img alt='preview' src={value}></img>
                            ))}
                          </Slider>
                        }
                      </div>
                    </Fade>
                  }
                </div>

                <div style={{ width: '100%', height: 700 }}>
                  {scrollY >= 1900 &&

                    <Fade bottom>
                      <div style={{ paddingTop: '4em', paddingBottom: '4em' }}>
                        <div style={{ marginBottom: '4em' }}>
                          <div className='preview_04_title' style={{ color: templateThemeColor }}>오시는 길</div>
                          <div className='preview_04_splite' style={{ marginBottom: 30 }}></div>
                          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ fontSize: '1.5rem' }}>{address}</div>
                            <div>{detailAddress}</div>
                            <div>{number}</div>
                            {false && <div>{assign}</div>}
                          </div>
                        </div>
                        <div className='preview_05_vehicle'>
                          <div>
                            <div className='preview_05_vehicle_text'>
                              <div>{guide1.title}</div>
                              <div style={{ fontSize: 13 }}>{guide1.content}</div>
                            </div>

                            <div className='preview_05_vehicle_padding' />
                          </div>
                          <div>
                            <div className='preview_05_vehicle_text'>
                              <div>{guide2.title}</div>
                              <div style={{ fontSize: 13 }}>{guide2.content}</div>
                            </div>

                            <div className='preview_05_vehicle_padding' />
                          </div>
                          <div>
                            <div className='preview_05_vehicle_text'>
                              <div>{guide3.title}</div>
                              <div style={{ fontSize: 13 }}>{guide3.content}</div>
                            </div>

                            <div className='preview_05_vehicle_padding' />
                          </div>
                        </div>
                      </div>
                    </Fade>
                  }
                </div>

                <div style={{ width: '100%', height: 700 }}>
                  {scrollY >= 2600 &&
                    <Fade bottom>
                      <div style={{ paddingTop: '4em', paddingBottom: '4em' }}>
                        <div>
                          <div className='preview_04_title' style={{ color: templateThemeColor }}>방명록</div>
                          <div className='preview_04_splite'></div>
                        </div>
                        <div className='preview_06_box'>
                          <div className='preview_06_box_message'>
                            <div className='preview_06_box_content'>
                              <p className='preview_06_box_text'>축하 메시지를 남겨주세요!</p>
                            </div>
                          </div>
                          <hr className="calendar-week_hairline"></hr>
                          <div className='preview_06_bottom'>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: 10 }}>
                              <div className='button'>벙명록 남기기</div>
                            </div>

                          </div>
                        </div>
                      </div>
                    </Fade>
                  }
                </div>
                <div style={{ width: '100%', height: 900 }}>
                  {scrollY >= 2900 &&
                    <Fade bottom>
                      <div style={{ paddingTop: '4em', paddingBottom: '4em' }}>
                        <div>
                          <div className='preview_04_title' style={{ color: templateThemeColor }}>마음 전하실 곳</div>
                          <div className='preview_04_splite'></div>
                        </div>

                        <div style={{ marginLeft: '1.5em', marginRight: '1.5em' }}>
                          <div className="preview_07_combo" style={{ marginTop: '2.0em' }}>
                            <div className='preview_07_combo_button'>
                              신랑측 계좌번호
                            </div>
                            <div className="preview_07_combo_box">
                              {accountNumber.groom.map((value, index) => (
                                <div style={{ padding: 20, borderBottom: index !== accountNumber.groom.length - 1 ? '1px solid #d9d9d9' : '' }}>
                                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', cursor: 'pointer' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <div className='preview_07_combo_box_label'>
                                          {value.nickname} &nbsp;
                                        </div>
                                        <div className='preview_07_combo_box_text'>
                                          {value.name}
                                        </div>
                                      </div>
                                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <div className='preview_07_combo_box_text'>
                                          {value.bank} &nbsp;
                                        </div>
                                        <div className='preview_07_combo_box_text'>
                                          {value.account}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="preview_07_combo_box_button">
                                      <div className="preview_07_combo_box_label"
                                        onMouseDown={(e) => { e.preventDefault() }}
                                        onClick={() => copyLink(value)}
                                      >계좌 복사하기</div>
                                    </div>
                                  </div>
                                </div>

                              ))}
                            </div>

                          </div>
                          <div className="preview_07_combo" style={{ marginTop: '1.0em' }}>
                            <div className='preview_07_combo_button'>
                              신부측 계좌번호
                            </div>
                            <div className="preview_07_combo_box">
                              {accountNumber.bride.map((value, index) => (
                                <div style={{ padding: 20, borderBottom: index !== accountNumber.groom.length - 1 ? '1px solid #d9d9d9' : '' }}>
                                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', cursor: 'pointer' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <div className='preview_07_combo_box_label'>
                                          {value.nickname} &nbsp;
                                        </div>
                                        <div className='preview_07_combo_box_text'>
                                          {value.name}
                                        </div>
                                      </div>
                                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <div className='preview_07_combo_box_text'>
                                          {value.bank} &nbsp;
                                        </div>
                                        <div className='preview_07_combo_box_text'>
                                          {value.account}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="preview_07_combo_box_button">
                                      <div className="preview_07_combo_box_label"
                                        onMouseDown={(e) => { e.preventDefault() }}
                                        onClick={() => copyLink(value)}
                                      >계좌 복사하기</div>
                                    </div>
                                  </div>
                                </div>

                              ))}
                            </div>

                          </div>

                          <div className="preview_07_combo" style={{ marginTop: '1.0em' }}>
                            <div style={{ padding: 10 }}>신랑에게 연락하기</div>
                          </div>
                          <div className="preview_07_combo" style={{ marginTop: '1.0em' }}>
                            <div style={{ padding: 10 }}>신부에게 연락하기</div>
                          </div>
                          <div className="preview_07_combo" style={{ marginTop: '1.0em' }}>
                            <div style={{ padding: 10 }}>혼주에게 연락하기</div>
                          </div>
                        </div>
                      </div>
                    </Fade>
                  }
                </div>


              </div>
            </div>

            <div style={{ fontSize: 11, color: '#8c8c8c', display: 'flex', justifyContent: 'center', marginTop: '20px' }}><div>Copyright 2023. All rights reserved.</div></div>

          </div>

          <Forms
            templateType={templateType} setTemplateType={setTemplateType}
            templateTextColor={templateTextColor} setTemplateText={setTemplateText}
            templateLineColor={templateLineColor} setTemplateLine={setTemplateLine}
            templateThemeColor={templateThemeColor} setTemplateTheme={setTemplateTheme}
            templateStyle={templateStyle} setTemplateStyle={setTemplateStyle}

            templateDate={templateDate} setTemplateDate={setTemplateDate}
            templateGroom={templateGroom} setTemplateGroom={setTemplateGroom}
            templateBride={templateBride} setTemplateBride={setTemplateBride}
            templateSpace={templateSpace} setTemplateSpace={setTemplateSpace}
            templateImage={templateImage} setTemplateImage={setTemplateImage}

            groomName={groomName} setGroomName={setGroomName}
            groomFather={groomFather} setGroomFather={setGroomFather}
            groomMather={groomMather} setGroomMather={setGroomMather}
            groomRelative={groomRelative} setGroomRelative={setGroomRelative}
            brideName={brideName} setBrideName={setBrideName}
            brideFather={brideFather} setBrideFather={setBrideFather}
            brideMather={brideMather} setBrideMather={setBrideMather}
            brideRelative={brideRelative} setBrideRelative={setBrideRelative}

            calendarStyle={calendarStyle} setCalendarStyle={setCalendarStyle}

            date={date} setdate={setdate}
            time={time} setTime={setTime}

            title={title} setTitle={setTitle}
            content={content} setContent={setContent}

            dDay={dDay} setVisibleDday={setVisibleDday}

            gallery={gallery} setGallery={setGallery}

            setAddress={setAddress}
            setDetailAddress={setDetailAddress}
            setAssign={setAssign}
            setNumber={setNumber}

            guide1={guide1} setGuide1={setGuide1}
            guide2={guide2} setGuide2={setGuide2}
            guide3={guide3} setGuide3={setGuide3}

            accountNumber={accountNumber} setAccountNumber={(value) => setAccountNumber(value)}

            galleryType={galleryType} setGalleryType={setGalleryType}

            forceUpdate={forceUpdate}

          />

        </div>

      </div>

    </main>
  );
}

export default Main;
