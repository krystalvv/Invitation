import React, { useCallback, useState } from 'react';
import { moment } from 'moment';
import { format } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { addDays, parse } from 'date-fns';
import 'moment/locale/ko';
import { MdEdit } from 'react-icons/md'
import { Card, CardItem } from '../component/Card';
import Select from '../component/Select';
import { Col, Input, Row, Button } from 'reactstrap';
import Forms from './Forms';

const Main = () => {
  const dateArray = ['일', '월', '화', '수', '목', '금', '토']
  const [date, setdate] = useState(new Date())

  const handleMouseOver = useCallback((e) => {
    if (e.currentTarget = e.target) {
      e.target.classList.add("preview_06_bottom_button_hover")
    }
    else {
      e.target.classList.remove("preview_06_bottom_button_hover")
    }
  }, [])

  const handleMouseLeave = useCallback((e) => {
    e.target.classList.remove("preview_06_bottom_button_hover")
  }, [])

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
        const cloneDay = day;
        days.push(
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }} key={day} onClick={() => onDateClick(parse(cloneDay))}>
            <span className="calendar-week_text" style={{ color: "#8c8c8c" }}>
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
                      <div className="preview_01_name">
                        <div style={{ height: '20%' }}></div>
                        <div style={{ height: '80%' }}>
                          <div className="preview_01_name_01">
                            <div className="preview_01_name_01_text">-- | -- </div>
                          </div>
                          <div className="preview_01_name_02">
                            <div className="preview_01_name_02_text_01">신랑 이름</div>
                            <div className="preview_01_name_02_text_02">그리고</div>
                            <div className="preview_01_name_02_text_03">신부 이름</div>
                          </div>
                        </div>
                      </div>
                      <div className="preview_01_image">
                        {'[첫 화면] 에 이미지를 첨부해주세요.'}

                      </div>
                    </div>

                  </div>
                </div>

                <div style={{ padding: '4em 2em' }}>
                  <div className="preview_02_title">초대합니다</div>
                  <div style={{ paddingTop: '4em', textAlign: 'center' }}>
                    <p className="preview_02_content">
                      {'[청첩장 문구]에 내용을 입력해주세요'}
                    </p>
                  </div>
                  <div className="preview_02_splite"></div>
                </div>

                <div style={{ paddingTop: '4em', paddingBottom: '4em' }}>
                  <div className="preview_03">
                    <div style={{ paddingBottom: '2rem' }}>
                      <div className="preview_03_month">{date.getMonth() + 1}월 {date.getDate()}일</div>
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
                        <p>{date.getFullYear()}년 {date.getMonth() + 1}월 {date.getDate()}일 {dateArray[date.getDay()]}요일 {timeFormat(date.getHours())}시 {date.getMinutes()}분</p>
                      </div>
                      <div className='preview_03_text_01' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <span>OOO</span>
                        <span className='preview_03_text_02'>♥︎</span>
                        <span>OOO</span>
                        <span>의 결혼식이</span>
                        <span className='preview_03_text_03'>&nbsp;0일&nbsp;</span>
                        <span>남았습니다.</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ overflow: 'hidden', paddingTop: '4em', paddingBottom: '4em' }}>
                  <div style={{ paddingBottom: '2rem' }}>
                    <div>
                      <div className='preview_04_title'>갤러리</div>
                      <div className='preview_04_splite'></div>
                    </div>
                  </div>
                  <div className="preview_04_image">
                    {'[갤러리] 에 이미지를 첨부해주세요.'}
                  </div>
                </div>

                <div style={{ paddingTop: '4em', paddingBottom: '4em' }}>
                  <div style={{ marginBottom: '4em' }}>
                    <div className='preview_04_title'>오시는 길</div>
                    <div className='preview_04_splite'></div>
                  </div>
                  <div className='preview_05_vehicle'>
                    <div>
                      <div className='preview_05_vehicle_text'>지하철</div>
                      <div className='preview_05_vehicle_padding' />
                    </div>
                    <div style={{ marginTop: '2.25em' }}>
                      <div className='preview_05_vehicle_text'>버스</div>
                      <div className='preview_05_vehicle_padding' />
                    </div>
                    <div style={{ marginTop: '2.25em' }}>
                      <div className='preview_05_vehicle_text'>자가용</div>
                      <div className='preview_05_vehicle_padding' />
                    </div>
                  </div>
                </div>

                <div style={{ paddingTop: '4em', paddingBottom: '4em' }}>
                  <div>
                    <div className='preview_04_title'>방명록</div>
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
                      <div className='preview_06_bottom_button' style={{ paddingTop: '5px', alignItems: 'center', justifyContent: 'center' }} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
                        방명록 남기기
                      </div>

                    </div>
                  </div>
                </div>

                <div style={{ paddingTop: '4em', paddingBottom: '4em' }}>
                  <div>
                    <div className='preview_04_title'>마음 전하실 곳</div>
                    <div className='preview_04_splite'></div>
                  </div>

                  <div style={{ marginLeft: '1.5em', marginRight: '1.5em' }}>
                    <div className="preview_07_combo" style={{ marginTop: '2.0em' }}>
                      <div className='preview_07_combo_button'>
                        신랑측 계좌번호
                      </div>
                      <div className="preview_07_combo_box">
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingBottom: '10px', cursor: 'pointer' }}>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                              <div className='preview_07_combo_box_label'>
                                신랑 &nbsp;
                              </div>
                              <div className='preview_07_combo_box_text'>
                                OOO
                              </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                              <div className='preview_07_combo_box_text'>
                                OO &nbsp;
                              </div>
                              <div className='preview_07_combo_box_text'>
                                1002-010-010101
                              </div>
                            </div>
                          </div>
                          <div className="preview_07_combo_box_button">
                            <div className="preview_07_combo_box_label">계좌 복사하기</div>
                          </div>
                        </div>
                        <hr className="calendar-week_hairline"></hr>

                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: '10px', paddingBottom: '10px', cursor: 'pointer' }}>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                              <div className='preview_07_combo_box_label'>
                                아버님 &nbsp;
                              </div>
                              <div className='preview_07_combo_box_text'>
                                OOO
                              </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                              <div className='preview_07_combo_box_text'>
                                OO &nbsp;
                              </div>
                              <div className='preview_07_combo_box_text'>
                                1002-010-010101
                              </div>
                            </div>
                          </div>
                          <div className="preview_07_combo_box_button">
                            <div className="preview_07_combo_box_label">계좌 복사하기</div>
                          </div>
                        </div>
                        <hr className="calendar-week_hairline"></hr>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: '10px', cursor: 'pointer' }}>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                              <div className='preview_07_combo_box_label'>
                                어머님 &nbsp;
                              </div>
                              <div className='preview_07_combo_box_text'>
                                OOO
                              </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                              <div className='preview_07_combo_box_text'>
                                OO &nbsp;
                              </div>
                              <div className='preview_07_combo_box_text'>
                                1002-010-010101
                              </div>
                            </div>
                          </div>
                          <div className="preview_07_combo_box_button">
                            <div className="preview_07_combo_box_label">계좌 복사하기</div>
                          </div>
                        </div>
                      </div>

                    </div>
                    <div className="preview_07_combo" style={{ marginTop: '1.0em' }}>
                      <div className='preview_07_combo_button'>
                        신부측 계좌번호
                      </div>
                      <div className="preview_07_combo_box">
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingBottom: '10px', cursor: 'pointer' }}>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                              <div className='preview_07_combo_box_label'>
                                신부 &nbsp;
                              </div>
                              <div className='preview_07_combo_box_text'>
                                OOO
                              </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                              <div className='preview_07_combo_box_text'>
                                OO &nbsp;
                              </div>
                              <div className='preview_07_combo_box_text'>
                                1002-010-010101
                              </div>
                            </div>
                          </div>
                          <div className="preview_07_combo_box_button">
                            <div className="preview_07_combo_box_label">계좌 복사하기</div>
                          </div>
                        </div>
                        <hr className="calendar-week_hairline"></hr>

                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: '10px', paddingBottom: '10px', cursor: 'pointer' }}>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                              <div className='preview_07_combo_box_label'>
                                아버님 &nbsp;
                              </div>
                              <div className='preview_07_combo_box_text'>
                                OOO
                              </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                              <div className='preview_07_combo_box_text'>
                                OO &nbsp;
                              </div>
                              <div className='preview_07_combo_box_text'>
                                1002-010-010101
                              </div>
                            </div>
                          </div>
                          <div className="preview_07_combo_box_button">
                            <div className="preview_07_combo_box_label">계좌 복사하기</div>
                          </div>
                        </div>
                        <hr className="calendar-week_hairline"></hr>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: '10px', cursor: 'pointer' }}>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                              <div className='preview_07_combo_box_label'>
                                어머님 &nbsp;
                              </div>
                              <div className='preview_07_combo_box_text'>
                                OOO
                              </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                              <div className='preview_07_combo_box_text'>
                                OO &nbsp;
                              </div>
                              <div className='preview_07_combo_box_text'>
                                1002-010-010101
                              </div>
                            </div>
                          </div>
                          <div className="preview_07_combo_box_button">
                            <div className="preview_07_combo_box_label">계좌 복사하기</div>
                          </div>
                        </div>
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

          <Forms/>

        </div>

      </div>

    </main>
  );
}

export default Main;
