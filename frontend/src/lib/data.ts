import {historySeed, metricSeeds, type Metric, type MetricKey} from '../data/mock'
export type DataMode = 'demo' | 'api'
export type Reading = { greenhouseId:string; measuredAt:string; metrics:Metric[] }
export async function loadLatest(greenhouseId:string, mode:DataMode):Promise<Reading> {
 if(mode==='demo')return {greenhouseId,measuredAt:new Date().toISOString(),metrics:metricSeeds[greenhouseId].map(m=>({...m}))}
 const url=import.meta.env.VITE_API_BASE_URL ?? '/api'
 const response=await fetch(`${url}/zones/${greenhouseId}/environment/latest`)
 if(!response.ok)throw new Error(`센서 조회 실패 (HTTP ${response.status})`)
 const raw=await response.json()
 return { greenhouseId, measuredAt:raw.measuredAt, metrics:metricSeeds[greenhouseId].map(metric=> {
 const value=Number(raw[metric.key]); return {...metric,value,status:(value < metric.min || value > metric.max)?'warning':'normal'}
 }) }
}
export function simulatedHistory(period:string, greenhouseId:string) {
 const base=historySeed.map((point,i)=> ({...point,temperature:point.temperature+(greenhouseId==='B'?2.4:0),ec:point.ec+(greenhouseId==='B'?0.4:0),humidity:point.humidity+Math.sin(i*1.3)*.6}))
 if(period==='24시간')return base
 return Array.from({length:period==='7일'?7:30},(_,i)=>({t:period==='7일'?`${i+1}일`:`${i+1}`, temperature:24.7 + Math.sin(i*.85)*1.6+(greenhouseId==='B'?2:0),humidity:72+Math.cos(i*.7)*5,ec:2.0+Math.sin(i*.6)*.15+(greenhouseId==='B'?.4:0),ph:6+Math.sin(i*.4)*.15}))
}
export function downloadCSV(filename:string, rows:Record<string,string|number>[]) {
 if(rows.length===0)return
 const columns=Object.keys(rows[0])
 const escape=(v:string|number)=>`"${String(v).replaceAll('"','""')}"`
 const csv='\ufeff'+[columns.join(','), ...rows.map(row=>columns.map(key=>escape(row[key])).join(','))].join('\r\n')
 const blob=new Blob([csv],{type:'text/csv;charset=utf-8;'})
 const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=filename;a.click();URL.revokeObjectURL(a.href)
}
export const displayMetric = (key:MetricKey,value:number)=>key==='temperature'||key==='ec'||key==='ph'?value.toFixed(1):Math.round(value).toLocaleString('ko-KR')
