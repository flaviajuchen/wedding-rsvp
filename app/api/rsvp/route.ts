import {getDb} from '../../../db';
import {responses} from '../../../db/schema';
import {normalizeRsvpName} from '../../../lib/rsvp-name';
const duplicate = () => Response.json({error:'duplicate',message:'Já recebemos uma resposta com esse nome.'},{status:409});
export async function POST(req:Request){
  try{
    if(!req.headers.get('content-type')?.includes('application/json'))return Response.json({error:'Formato inválido'},{status:400});
    const origin=req.headers.get('origin');
    if(origin&&origin!==new URL(req.url).origin&&origin!=='https://jessicaematheus.vercel.app')return new Response(null,{status:403});
    const b=await req.json() as Record<string,unknown>;
    if(b.website)return Response.json({ok:true});
    if(typeof b.name!=='string'||b.name.trim().length<3||b.name.length>120||!['sim','nao'].includes(String(b.attendance)))return Response.json({error:'Dados inválidos'},{status:400});
    if((b.guests&&typeof b.guests!=='string')||(b.message&&typeof b.message!=='string')||String(b.guests||'').length>1000||String(b.message||'').length>1000)return new Response(null,{status:400});
    const name=b.name.trim().replace(/\s+/gu,' ');
    const normalizedName=normalizeRsvpName(name);
    const db=getDb();
    // Include records created before normalized keys were introduced, without changing them.
    const existing=await db.select({name:responses.name}).from(responses);
    if(existing.some(row=>normalizeRsvpName(row.name)===normalizedName))return duplicate();
    // The unique key prevents concurrent submissions from creating duplicate rows.
    const inserted=await db.insert(responses).values({name,normalizedName,attendance:String(b.attendance),guests:b.attendance==='sim'?String(b.guests||''):'',message:String(b.message||'')}).onConflictDoNothing({target:responses.normalizedName}).returning({id:responses.id});
    if(!inserted.length)return duplicate();
    return Response.json({ok:true});
  }catch{return Response.json({error:'Tente novamente'},{status:500})}
}
