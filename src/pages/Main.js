import React, { useState } from 'react';
import { format } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { addDays, parse } from 'date-fns';
import 'moment/locale/ko';
import Forms from './Forms';

import {
  AiFillHeart,
} from 'react-icons/ai'
import Slider from 'react-slick';

const Main = () => {
  const dateArray = ['일', '월', '화', '수', '목', '금', '토']

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
  const [brideMather, setBrideMather] = useState('');
  const [brideRelative, setBriderRelative] = useState('딸');

  const [calendarStyle, setCalendarStyle] = useState(0);

  const [date, setdate] = useState(new Date())
  const [time, setTime] = useState("")

  const [dDay, setVisibleDday] = useState(true)

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

  const timeFormat = (time) => {
    if (time - 12 > 0)
      return `오후 ${time - 12}`
    else if (time === 0)
      return `오전 12`
    else
      return `오전 ${time}`
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
          <div className="preview">
            <div style={{ borderWidth: "1px" }}>
              <div className="preview_scroll">
                <div style={{ marginBottom: '4em' }}>
                  <div className="preview_01">
                    <div style={{ width: '100%', height: '100%' }}>
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

                          <div className="preview_01_image">
                            <div style={{ height: '100%' }}>
                              {templateImage ? <img style={{ width: "100%" }} src={templateImage}></img> : <div>
                                {'[첫 화면] 에 이미지를 첨부해주세요.'} </div>
                              }
                            </div>
                          </div>
                        </>
                      }
                      {templateType === 1 &&
                        <div style={{ height: '100%', padding: '5%', backgroundColor: '#e5e5e5' }}>
                          <div style={{ position: 'absolute', width: '90%', height: '95%', border: '2px solid', borderColor: templateLineColor }}>
                            <div style={{ position: 'absolute', width: '98%', height: '99%', marginLeft: 2, marginTop: 2, border: '1px solid', borderColor: templateLineColor }}>
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
                              <div className="preview_01_image">
                                {'[첫 화면] 에 이미지를 첨부해주세요.'}
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
                          <div className="preview_01_image" style={{ border: '2px solid', borderColor: templateLineColor, margin: 10 }}>
                            <div style={{ border: '1px solid', padding: 2, width: '97%', height: '98%', borderColor: templateLineColor }}>
                              <div style={{ flex: 1, alignItems: 'center', justifyContent: 'center', display: 'flex', height: '100%' }}>
                                {'[첫 화면] 에 이미지를 첨부해주세요.'}
                              </div>
                            </div>
                          </div>
                        </>
                      }
                    </div>

                  </div>
                </div>

                <div style={{ padding: '4em 2em' }}>
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
                      <div style={{ fontWeight: 'bold' }}>{brideFather}•{brideMather}</div><div style={{ fontSize: 13, color: '#8c8c8c' }}>&nbsp;의&nbsp;{brideRelative}</div>&nbsp;<div style={{ fontWeight: 'bold' }}> {brideName}</div>
                    </div>
                  </div>
                </div>

                <div style={{ paddingTop: '4em', paddingBottom: '4em' }}>
                  <div className="preview_03">
                    <div style={{ paddingBottom: '2rem' }}>
                      <div className="preview_03_month" style={{ color: templateThemeColor }}>{date.getMonth() + 1}월 {date.getDate()}일</div>
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
                          <span>OOO</span>
                          <span className='preview_03_text_02'>♥︎</span>
                          <span>OOO</span>
                          <span>의 결혼식이</span>
                          <span className='preview_03_text_03'>&nbsp;0일&nbsp;</span>
                          <span>남았습니다.</span>
                        </div>
                      }
                    </div>
                  </div>
                </div>

                <div style={{ overflow: 'hidden', paddingTop: '4em', paddingBottom: '4em' }}>
                  <div style={{ paddingBottom: '2rem' }}>
                    <div>
                      <div className='preview_04_title' style={{ color: templateThemeColor }}>갤러리</div>
                      <div className='preview_04_splite'></div>
                    </div>
                  </div>
                  <div>

                  </div>
                  <div className="preview_04_image">
                    {'[갤러리] 에 이미지를 첨부해주세요.'}
                  </div>

                  {gallery.length > 0 &&
                    <Slider>
                      <div>{gallery.length}</div>
                    </Slider>
                  }
                </div>

                <div style={{ paddingTop: '4em', paddingBottom: '4em' }}>
                  <div style={{ marginBottom: '4em' }}>
                    <div className='preview_04_title' style={{ color: templateThemeColor }}>오시는 길</div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                      <div style={{ fontSize: '1.5rem' }}>{address}</div>
                      <div>{detailAddress}</div>
                      <div>{number}</div>
                    </div>
                    <div className='preview_04_splite'></div>
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
                                <div className="preview_07_combo_box_label">계좌 복사하기</div>
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
                                <div className="preview_07_combo_box_label">계좌 복사하기</div>
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
            brideRelative={brideRelative} setBriderRelative={setBriderRelative}

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

          />

        </div>

      </div>

    </main>
  );
}

export default Main;
