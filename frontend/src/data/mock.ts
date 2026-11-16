export type MetricKey = 'temperature' | 'humidity' | 'co2' | 'light' | 'ec' | 'ph'
export type Metric = { key:MetricKey; label:string; value:number; unit:string; status:'normal'|'warning'; delta:string; min:number; max:number }
export type DeviceKey = 'fan'|'pump'|'shade'|'heater'
export type Device = { id:DeviceKey; label:string; subtitle:string; category:string }
export type Alert = { id:number; level:'warning'|'info'|'critical'; title:string; description:string; time:string; seen:boolean }
export const greenhouses = [ {id:'A',name:'A동 · 방울토마토',subtitle:'제1재배구역', crop:'대추방울토마토'}, {id:'B',name:'B동 · 방울토마토',subtitle:'제2재배구역',crop:'스테비아 방울토마토'} ]
export const metricSeeds:Record<string,Metric[]> = {
 A:[
  {key:'temperature',label:'내부 온도',value:25.4,unit:'°C',status:'normal',delta:'+0.6°C',min:22,max:28},
  {key:'humidity',label:'상대 습도',value:72,unit:'%',status:'normal',delta:'-2%',min:60,max:85},
  {key:'co2',label:'CO₂ 농도',value:628,unit:'ppm',status:'normal',delta:'+35ppm',min:400,max:1000},
  {key:'light',label:'일사량',value:428,unit:'W/m²',status:'normal',delta:'+28W/m²',min:0,max:850},
  {key:'ec',label:'양액 EC',value:2.1,unit:'dS/m',status:'normal',delta:'+0.1',min:1.5,max:2.5},
  {key:'ph',label:'양액 pH',value:6.0,unit:'pH',status:'normal',delta:'-0.1',min:5.5,max:6.5}
 ],
 B:[
  {key:'temperature',label:'내부 온도',value:29.1,unit:'°C',status:'warning',delta:'+1.9°C',min:22,max:28},
  {key:'humidity',label:'상대 습도',value:67,unit:'%',status:'normal',delta:'-1%',min:60,max:85},
  {key:'co2',label:'CO₂ 농도',value:592,unit:'ppm',status:'normal',delta:'+21ppm',min:400,max:1000},
  {key:'light',label:'일사량',value:462,unit:'W/m²',status:'normal',delta:'+42W/m²',min:0,max:850},
  {key:'ec',label:'양액 EC',value:2.7,unit:'dS/m',status:'warning',delta:'+0.3',min:1.5,max:2.5},
  {key:'ph',label:'양액 pH',value:6.1,unit:'pH',status:'normal',delta:'+0.1',min:5.5,max:6.5}
 ]
}
export const devices:Device[]=[
 {id:'fan',label:'환기팬',subtitle:'온실 순환 팬 · 02',category:'환경 제어'},
 {id:'pump',label:'양액 공급 펌프',subtitle:'급액 라인 · 01',category:'양액 제어'},
 {id:'shade',label:'차광 커튼',subtitle:'천창 차광 · 01',category:'환경 제어'},
 {id:'heater',label:'난방 장치',subtitle:'온실 난방 · 01',category:'환경 제어'}
]
export const firstAlerts:Record<string,Alert[]> = {
 A:[
 {id:1,level:'warning',title:'급액 일정 확인',description:'다음 양액 공급까지 24분 남았습니다.',time:'10:36',seen:false},
 {id:2,level:'info',title:'센서 동기화 완료',description:'6개 환경 센서의 측정값을 업데이트했습니다.',time:'09:48',seen:true},
 {id:3,level:'info',title:'오늘 첫 급액 완료',description:'08:00 / 120L 공급 기록이 저장되었습니다.',time:'08:01',seen:true}
 ],
 B:[
 {id:4,level:'critical',title:'내부 온도 상한 초과',description:'현재 온도 29.1°C, 설정 상한 28°C',time:'10:34',seen:false},
 {id:5,level:'warning',title:'양액 EC 농도 확인',description:'현재 2.7 dS/m로 설정 범위를 벗어났습니다.',time:'10:22',seen:false},
 {id:6,level:'info',title:'센서 데이터 수집',description:'최신 측정값이 업데이트되었습니다.',time:'09:46',seen:true}
 ]
}
export const historySeed=[
 {t:'06:00',temperature:22.1,humidity:79,ec:1.9,ph:6.0},
 {t:'07:00',temperature:22.8,humidity:78,ec:2.0,ph:6.0},
 {t:'08:00',temperature:23.6,humidity:76,ec:2.1,ph:5.9},
 {t:'09:00',temperature:24.2,humidity:74,ec:2.0,ph:6.1},
 {t:'10:00',temperature:25.1,humidity:73,ec:2.1,ph:6.0},
 {t:'11:00',temperature:25.4,humidity:72,ec:2.1,ph:6.0},
 {t:'12:00',temperature:26.0,humidity:71,ec:2.1,ph:6.1},
 {t:'13:00',temperature:26.3,humidity:70,ec:2.2,ph:6.0},
 {t:'14:00',temperature:25.8,humidity:71,ec:2.1,ph:6.0},
 {t:'15:00',temperature:25.4,humidity:72,ec:2.1,ph:6.0},
 ]
export const initialLogs=[
 {id:1,time:'10:00',type:'급액',detail:'급액 스케줄 예약',amount:'120 L',state:'예정'},
 {id:2,time:'08:00',type:'급액',detail:'양액 공급 완료',amount:'120 L',state:'완료'},
 {id:3,time:'06:00',type:'급액',detail:'양액 공급 완료',amount:'110 L',state:'완료'},
 {id:4,time:'어제 16:00',type:'점검',detail:'pH 센서 영점 점검',amount:'—',state:'완료'}
]
export const growLogs=[
 {date:'11.15',label:'착과 관찰',description:'3화방 착과 확인, 과실 크기 균일',tag:'생육'},
 {date:'11.13',label:'측지 제거',description:'하엽 및 측지 정리 작업 완료',tag:'작업'},
 {date:'11.11',label:'양액 관리',description:'양액 EC 목표 2.1로 설정',tag:'관리'}
]
