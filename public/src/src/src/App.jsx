import { useState, useRef, useEffect } from "react";

const COLORS = {
  "UNVRS":"#2563EB","Hï Ibiza":"#7C3AED","Ushuaïa":"#D97706","Pacha":"#DC2626",
  "Amnesia":"#EA580C","DC-10":"#1E293B","O Beach":"#0891B2","Chinois":"#BE185D",
  "Cova Santa":"#059669","Eden":"#16A34A","Es Paradis":"#65A30D","Lío":"#9D174D",
  "Ibiza Rocks":"#C2410C","Swag":"#1D4ED8","Tantra":"#92400E",
};

const INITIALES = {
  "UNVRS":"UN","Hï Ibiza":"HÏ","Ushuaïa":"US","Pacha":"PA","Amnesia":"AM",
  "DC-10":"DC","O Beach":"OB","Chinois":"CH","Cova Santa":"CS","Eden":"ED",
  "Es Paradis":"EP","Lío":"LÍO","Ibiza Rocks":"IR","Swag":"SW","Tantra":"TA",
};


const ADDRESSES = {
  "UNVRS":"Ctra. Ibiza-San Antonio, San Rafael","Hï Ibiza":"Platja d'en Bossa",
  "Ushuaïa":"Platja d'en Bossa","Pacha":"Avinguda 8 d'Agost, Ibiza Town",
  "Amnesia":"Ctra. Ibiza-San Antonio, San Rafael","DC-10":"Ctra. de l'Aeroport",
  "O Beach":"Platja d'en Bossa","Chinois":"Marina Botafoc, Ibiza Town",
  "Cova Santa":"Ctra. Ibiza-San José","Eden":"Carrer Salvador Espriu, Sant Antoni",
  "Es Paradis":"Carrer Salvador Espriu, Sant Antoni","Lío":"Marina Botafoc, Ibiza Town",
  "Ibiza Rocks":"Carrer de la Mar, Sant Antoni","Swag":"Platja d'en Bossa",
  "Tantra":"Ctra. de Platja d'en Bossa",
  "boat_day":"Port Marina Botafoc, Ibiza Town","boat_sunset":"Port Marina Botafoc, Ibiza Town",
  "formentera":"Port Marina Botafoc, Ibiza Town","tantra_ob":"Ctra. de Platja d'en Bossa",
  "rigatoni":"Platja d'en Bossa","goodlife":"Platja d'en Bossa",
};

const RESIDENCES = {
  "UNVRS":      {days:{0:{s:"Experts Only",a:"John Summit",g:"Tech House · House"},1:{s:"ÆDEN",a:"Anyma",g:"Melodic Techno"},2:{s:"Paradise",a:"Jamie Jones",g:"Tech House · Minimal"},3:{s:"FISHER",a:"FISHER",g:"Techno · Tech House"},4:{s:"Galactic Circus",a:"David Guetta",g:"EDM · Big Room"},5:{s:"elrow",a:"elrow",g:"Techno · Tech House"},6:{s:"Carl Cox",a:"Carl Cox",g:"Techno"}}},
  "Hï Ibiza":   {days:{0:{s:"Solèy",a:"Francis Mercier",g:"Afrohouse · Deep House"},1:{s:"Eastenderz",a:"East End Dubs",g:"Tech House"},2:{s:"OUR HOUSE",a:"Meduza & James Hype",g:"House"},3:{s:"Make The Girls Dance",a:"HUGEL",g:"House · Melodic"},4:{s:"Dom Dolla",a:"Dom Dolla",g:"Tech House"},5:{s:"SAGA",a:"Black Coffee",g:"Afrohouse · Deep House"},6:{s:"MESTIZA & ARTCORE",a:"MESTIZA",g:"Techno · Hard Techno"}}},
  "Pacha":      {days:{0:{s:"Sonny Fodera",a:"Sonny Fodera",g:"Tech House"},1:{s:"Vintage Culture",a:"Vintage Culture",g:"Melodic House"},2:{s:"Abracadabra",a:"BLOND:ISH",g:"House · Disco"},3:{s:"Shimza & Co.",a:"Shimza",g:"Afrohouse"},4:{s:"Music On",a:"Marco Carola",g:"Techno · Tech House"},5:{s:"Flower Power",a:"Roger Sanchez",g:"House · Disco"},6:{s:"Solomun +1",a:"Solomun",g:"Melodic House"}}},
  "Ushuaïa":    {days:{0:{s:"F*** Me I'm Famous!",a:"David Guetta",g:"EDM · Big Room"},1:{s:"Ozuna",a:"Ozuna",g:"Reggaeton · Latin"},2:{s:"Tomorrowland",a:"Dimitri Vegas & Like Mike",g:"EDM · Big Room"},3:{s:"Armin van Buuren",a:"Armin van Buuren",g:"Trance · EDM"},4:{s:"Calvin Harris",a:"Calvin Harris",g:"EDM · Commercial"},5:{s:"ANTS",a:"CamelPhat",g:"Tech House"},6:{s:"I Love Reggaeton",a:"Nacho / J Balvin",g:"Reggaeton"}}},
  "Amnesia":    {days:{0:{s:"Steel City Dance Disc",a:"Kettama",g:"Techno"},3:{s:"You&Me",a:"Josh Baker",g:"House · Tech House"},4:{s:"Glitterbox",a:"Honey Dijon",g:"Disco House"},5:{s:"BRESH",a:"BRESH",g:"Reggaeton · Latin"},6:{s:"Pyramid",a:"Ricardo Villalobos",g:"Techno · Minimal"}}},
  "DC-10":      {days:{0:{s:"Circoloco",a:"&ME / Dixon / Rampa",g:"House · Techno"}}},
  "O Beach":    {days:{0:{s:"O Beach Music",a:"Résidents",g:"Commercial House · Pool"},1:{s:"Kisstory",a:"DJ Ace",g:"R&B · Hip-Hop"},2:{s:"House In Paradise",a:"Jamie Love",g:"Deep House"},3:{s:"O Beach Music",a:"Résidents",g:"Commercial House · Pool"},4:{s:"Pool Party",a:"Cameo",g:"Commercial House · Pool"},5:{s:"Soul Heaven",a:"Jamie Love",g:"Soul House · Deep House"},6:{s:"SIN Sundays",a:"Billie Clements",g:"R&B · Commercial"}}},
  "Chinois":    {days:{0:{s:"La Troya",a:"TBA",g:"Commercial · Latin"},3:{s:"Defected",a:"Jonas Blue",g:"House · Tech House"},4:{s:"Major League DJz",a:"Major League DJz",g:"Afrohouse · Amapiano"},5:{s:"The Masquerade",a:"Claptone",g:"House · Disco"},6:{s:"Meneito",a:"Darell",g:"Reggaeton"}}},
  "Cova Santa": {days:{0:{s:"Pantheøn",a:"Harry Romero",g:"Afrohouse"},1:{s:"PIV Ibiza",a:"Burnski",g:"Techno"},2:{s:"Woomoon",a:"Viken Arman",g:"Melodic House · Organic"},3:{s:"The Cuckoo's Nest",a:"Mr. Belt & Wezol",g:"Tech House"},4:{s:"Woomoon",a:"TBA",g:"Melodic House"},5:{s:"555 Ibiza",a:"Sam Divine",g:"Tech House"},6:{s:"Pantheøn",a:"Bastian Bux",g:"Afrohouse"}}},
  "Eden":       {days:{1:{s:"Cocoricò GALACTICA",a:"Charlie Sparks",g:"Techno · Rave"},2:{s:"23 Degrees",a:"Bakey",g:"Techno · UK Bass"},3:{s:"Encasa",a:"Yungness & Jaminn",g:"House · Commercial"},4:{s:"Fire In The Club",a:"Charlie Sloth",g:"Urban · R&B"},5:{s:"Fuego",a:"TBA",g:"Reggaeton · Latin"},6:{s:"Secret Sessions",a:"TBA",g:"House · Urban"}}},
  "Es Paradis": {days:{1:{s:"Ibiza Records",a:"Jan & Calvin",g:"House · Deep House"},2:{s:"The Most Beautiful Party",a:"TBA",g:"House"},3:{s:"Bubbles",a:"TBA",g:"House"},4:{s:"Puro Reggaeton",a:"TBA",g:"Reggaeton"},5:{s:"Fiesta del Agua",a:"TBA",g:"House · Foam"},6:{s:"Don't Tell Mama",a:"Pedro Cazanova",g:"House · Latino"}}},
  "Lío":        {days:{1:{s:"Blanche Ibiza",a:"TBA",g:"House · Deep House"},2:{s:"Toy Room",a:"Frank The Bear",g:"Hip-Hop · R&B · Reggaeton"},3:{s:"Tiempo",a:"Nomis",g:"House · Lounge"},4:{s:"Vintage",a:"Sebastian Gamboa",g:"House · Disco"},5:{s:"Kōdō",a:"TBA",g:"House · Show"},6:{s:"Travieso",a:"TBA",g:"Latin House · Reggaeton"}}},
  "Ibiza Rocks":{days:{0:{s:"Nothing New Pool Party",a:"Résidents",g:"Commercial · Pool"},1:{s:"Pool Party",a:"Résidents",g:"Commercial · Pool"},2:{s:"Bingo Brunch",a:"—",g:"Party · Fun"},4:{s:"WNDRLND Origins",a:"P.O.U.",g:"House"},5:{s:"Ibiza Anthems",a:"Chris Watson",g:"Commercial House"},6:{s:"R&B Affair",a:"TBA",g:"R&B · Hip-Hop"}}},
  "Swag":       {days:{0:{s:"Safari",a:"Résidents",g:"Reggaeton · Trap · Dembow"},5:{s:"Gloss",a:"Résidents",g:"Reggaeton · Latin · Hip-Hop"},6:{s:"Urban Night",a:"Nico Aloisio",g:"Reggaeton · Urban"}}},
};

const CILEX = [
  {id:"boat_day",    label:"☀️ Boat Day",            color:"#0EA5E9", start:"14:00", end:"17:00", price:100, com:20},
  {id:"boat_sunset", label:"🌅 Boat Sunset",          color:"#F97316", start:"17:00", end:"21:30", price:100, com:20},
  {id:"formentera",  label:"🏝️ Formentera Day Trip",  color:"#06B6D4", start:"09:00", end:"21:00", price:140, com:20},
  {id:"tantra_ob",   label:"🕯️ Tantra Open Bar",      color:"#EC4899", start:"22:00", end:"01:00", price:60,  com:12},
  {id:"rigatoni",    label:"🍝 Rigatoni Dinner Show", color:"#D97706", start:"20:00", end:"23:00", price:80,  com:16},
  {id:"goodlife",    label:"🌺 GoodLife Diner",        color:"#10B981", start:"20:00", end:"23:00", price:80,  com:16},
];

// Heures affichées : 16h → 06h (lendemain)
// On stocke en minutes depuis minuit. Pour positionner on fait :
// offset = (min >= 16*60) ? min - 16*60 : min + (24-16)*60
const HOUR_H  = 58;  // px par heure
const TIME_W  = 46;  // largeur colonne heures
const HOURS   = [16,17,18,19,20,21,22,23,0,1,2,3,4,5,6]; // 15 marqueurs
const TOTAL_H = HOURS.length; // 15 créneaux = 16h→06h

function tMin(t){ if(!t) return 0; const [h,m]=t.split(":").map(Number); return h*60+m; }
function toOffset(min){ return min>=16*60 ? min-16*60 : min+(24-16)*60; }
function dow(d){ return (d-1)%7; }

const DAYS_S = ["LUN","MAR","MER","JEU","VEN","SAM","DIM"];
const DAYS_L = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];
const TODAY  = 10;
const OFFSET_MOIS = 0; // 1 juin = lundi

function getClubs(day){
  const d = dow(day);
  return Object.entries(RESIDENCES).filter(([,v])=>v.days[d]).map(([name,v])=>({
    name, color:COLORS[name]||"#555", ...v.days[d],
    start:["O Beach","Ushuaïa","Ibiza Rocks"].includes(name)?"17:00":"23:00",
    end:"06:00",
  }));
}

function buildGrid(){
  const c=[];
  for(let i=0;i<OFFSET_MOIS;i++) c.push(null);
  for(let d=1;d<=30;d++) c.push(d);
  while(c.length%7!==0) c.push(null);
  const w=[]; for(let i=0;i<c.length;i+=7) w.push(c.slice(i,i+7)); return w;
}
const GRID = buildGrid();

function weekOf(a){ const d=dow(a); return Array.from({length:7},(_,i)=>a-d+i).filter(x=>x>=1&&x<=30); }

// ─── APP ──────────────────────────────────────────────────────────
export default function App(){
  const [view,setView]               = useState("week");
  const [anchor,setAnchor]           = useState(TODAY);
  const [client,setClient]           = useState("");
  const [events,setEvents]           = useState({});
  const [pickerDay,setPickerDay]     = useState(null);
  const [editEvt,setEditEvt]         = useState(null);
  const [showSummary,setShowSummary] = useState(false);
  const [revealed,setRevealed]       = useState(false);
  const [guess,setGuess]             = useState("");
  const uidRef = useRef(1);

  const getEvts = d => events[d]||[];
  const hasEvts = d => (events[d]||[]).length>0;

  function addEvt(day,item){
    setEvents(p=>({...p,[day]:[...(p[day]||[]),{...item,uid:uidRef.current++,day,startOverride:item.start||"23:00",endOverride:item.end||"06:00"}]}));
  }
  function delEvt(day,u){ setEvents(p=>({...p,[day]:(p[day]||[]).filter(e=>e.uid!==u)})); }
  function updEvt(day,u,s,e){ setEvents(p=>({...p,[day]:(p[day]||[]).map(ev=>ev.uid===u?{...ev,startOverride:s,endOverride:e}:ev)})); }

  const total = () => Object.values(events).flat().reduce((t,e)=>t+(e.price||0),0);
  const com   = () => Object.values(events).flat().reduce((t,e)=>t+(e.com||0),0);

  function sendWA(){
    let msg=`🌴 *IBIZA – ${client||"Mon Client"}*\n_by @bykiden · CILEX Ibiza_\n\n`;
    Object.keys(events).map(Number).filter(d=>hasEvts(d)).sort((a,b)=>a-b).forEach(day=>{
      msg+=`━━━━━━━━━━━━\n📅 *${DAYS_L[dow(day)].toUpperCase()} ${day} JUIN*\n`;
      getEvts(day).sort((a,b)=>tMin(a.startOverride)-tMin(b.startOverride)).forEach(e=>{
        const isCilex=!!e.id;
        msg+=`\n🎯 *${e.name||e.label}*\n`;
        msg+=`⏰ ${e.startOverride} – ${e.endOverride}\n`;
        const addr=ADDRESSES[e.id||e.name];
        if(addr) msg+=`📍 _${addr}_\n`;
        if(!isCilex){
          if(e.s) msg+=`🎉 ${e.s}\n`;
          if(e.a&&e.a!=="TBA"&&e.a!=="Résidents") msg+=`🎤 ${e.a}\n`;
          if(e.g) msg+=`🎵 ${e.g}\n`;
        }
      });
      msg+=`\n`;
    });
    msg+=`━━━━━━━━━━━━\n✨ Des questions ? Contacte-moi directement\n_@bykiden · CILEX Ibiza 2026_`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`,"_blank");
  }

  const wDays = weekOf(anchor);
  const nCols = wDays.length;

  // ── TOPBAR ────────────────────────────────────────────────────
  const Topbar = ()=>(
    <div style={{background:"#fff",borderBottom:"1px solid #e5e7eb",padding:"8px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:100,boxShadow:"0 1px 3px rgba(0,0,0,0.06)"}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <div style={{fontWeight:900,fontSize:15,letterSpacing:-0.5}}><span style={{color:"#2563EB"}}>CILEX</span> Ibiza</div>
        <div style={{display:"flex",background:"#f3f4f6",borderRadius:8,border:"1px solid #e5e7eb",overflow:"hidden"}}>
          {[["month","Mois"],["week","Semaine"]].map(([v,l])=>(
            <button key={v} onClick={()=>setView(v)} style={{padding:"5px 11px",border:"none",cursor:"pointer",fontSize:11,fontWeight:700,background:view===v?"#2563EB":"transparent",color:view===v?"#fff":"#6b7280"}}>{l}</button>
          ))}
        </div>
      </div>
      <div style={{display:"flex",gap:8,alignItems:"center"}}>
        <input placeholder="Nom client..." value={client} onChange={e=>setClient(e.target.value)}
          style={{background:"#f9fafb",border:"1px solid #e5e7eb",borderRadius:8,padding:"6px 10px",fontSize:12,outline:"none",width:120,color:"#111"}}/>
        <button onClick={()=>{setShowSummary(true);setRevealed(false);setGuess("");}} style={{background:"#2563EB",border:"none",borderRadius:8,padding:"7px 14px",fontSize:12,fontWeight:700,color:"#fff",cursor:"pointer"}}>
          Récap →
        </button>
      </div>
    </div>
  );

  // ── MONTH VIEW ────────────────────────────────────────────────
  if(view==="month") return (
    <div style={{background:"#fff",minHeight:"100vh",fontFamily:"system-ui,sans-serif",color:"#111",maxWidth:600,margin:"0 auto"}}>
      <Topbar/>
      <div style={{padding:"12px 8px 60px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,padding:"0 4px"}}>
          <span style={{fontSize:16,fontWeight:800}}>Juin 2026</span>
          <div style={{display:"flex",gap:4}}>
            <button onClick={()=>setAnchor(a=>Math.max(1,a-7))} style={S.nb}>‹</button>
            <button onClick={()=>setAnchor(a=>Math.min(30,a+7))} style={S.nb}>›</button>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",marginBottom:4}}>
          {["L","M","M","J","V","S","D"].map((d,i)=><div key={i} style={{textAlign:"center",fontSize:10,fontWeight:700,color:"#9ca3af",padding:"3px 0"}}>{d}</div>)}
        </div>
        {GRID.map((week,wi)=>(
          <div key={wi} style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2,marginBottom:2}}>
            {week.map((day,di)=>{
              if(!day) return <div key={di}/>;
              const isPast=day<TODAY, isToday=day===TODAY;
              const evts=getEvts(day);
              return (
                <div key={di} onClick={()=>{if(!isPast){setAnchor(day);setView("week");}}} style={{
                  minHeight:68,background:isToday?"#EFF6FF":isPast?"#fafafa":"#fff",
                  border:`1px solid ${isToday?"#2563EB":"#e5e7eb"}`,
                  borderRadius:8,padding:"4px 3px",cursor:isPast?"default":"pointer",opacity:isPast?.3:1,overflow:"hidden",
                }}>
                  <div style={{width:22,height:22,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",background:isToday?"#2563EB":"transparent",color:isToday?"#fff":isPast?"#9ca3af":"#111",fontSize:11,fontWeight:isToday?800:600,marginBottom:2}}>{day}</div>
                  <div style={{display:"flex",flexDirection:"column",gap:1}}>
                    {evts.slice(0,3).map((ev,i)=>(
                      <div key={i} style={{background:(ev.color||COLORS[ev.name]||"#2563EB")+"20",borderLeft:`2px solid ${ev.color||COLORS[ev.name]||"#2563EB"}`,borderRadius:3,padding:"1px 3px",fontSize:7,fontWeight:600,color:ev.color||COLORS[ev.name]||"#2563EB",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                        {ev.startOverride} {ev.name||ev.label}
                      </div>
                    ))}
                    {evts.length>3&&<div style={{fontSize:7,color:"#9ca3af",paddingLeft:3}}>+{evts.length-3}</div>}
                    {evts.length===0&&<div style={{display:"flex",flexWrap:"wrap",gap:2,marginTop:2}}>{getClubs(day).slice(0,5).map((c,i)=><div key={i} style={{width:4,height:4,borderRadius:"50%",background:c.color+"60"}}/>)}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {showSummary&&<SummaryModal {...{client,events,total,com,sendWA,revealed,setRevealed,guess,setGuess,onClose:()=>setShowSummary(false)}}/>}
      <style>{CSS}</style>
    </div>
  );

  // ── WEEK VIEW ─────────────────────────────────────────────────
  return (
    <div style={{background:"#fff",height:"100vh",display:"flex",flexDirection:"column",fontFamily:"system-ui,sans-serif",color:"#111",maxWidth:700,margin:"0 auto",overflow:"hidden"}}>
      <Topbar/>

      {/* Nav semaine */}
      <div style={{background:"#fff",borderBottom:"1px solid #e5e7eb",padding:"5px 12px",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
        <button onClick={()=>setAnchor(a=>Math.max(1,a-7))} style={S.nb}>‹ Préc.</button>
        <span style={{fontSize:13,fontWeight:800,color:"#111"}}>{wDays[0]} – {wDays[wDays.length-1]} Juin 2026</span>
        <button onClick={()=>setAnchor(a=>Math.min(30,a+7))} style={S.nb}>Suiv. ›</button>
      </div>

      {/* Headers jours */}
      <div style={{display:"flex",background:"#fff",borderBottom:"1px solid #e5e7eb",flexShrink:0}}>
        <div style={{width:TIME_W,flexShrink:0}}/>
        {wDays.map(day=>{
          const isToday=day===TODAY;
          return (
            <div key={day} style={{flex:1,textAlign:"center",padding:"5px 2px",borderLeft:"1px solid #f3f4f6"}}>
              <div style={{fontSize:9,fontWeight:700,color:"#9ca3af",letterSpacing:1}}>{DAYS_S[dow(day)]}</div>
              <div style={{width:26,height:26,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",background:isToday?"#2563EB":"transparent",color:isToday?"#fff":"#111",fontSize:14,fontWeight:800,margin:"2px auto"}}>{day}</div>
              <button onClick={()=>setPickerDay(day)} style={{background:"none",border:"1px solid #e5e7eb",borderRadius:6,color:"#9ca3af",fontSize:10,cursor:"pointer",padding:"1px 6px",fontWeight:600}}>+</button>
            </div>
          );
        })}
      </div>

      {/* ── TIMELINE SCROLLABLE : 16h → 06h ── */}
      <div style={{flex:1,overflowY:"auto"}}>
        <div style={{position:"relative",height:TOTAL_H*HOUR_H}}>

          {/* Lignes horaires */}
          {HOURS.map((h,i)=>(
            <div key={i} style={{position:"absolute",top:i*HOUR_H,left:0,right:0,display:"flex",pointerEvents:"none"}}>
              <div style={{width:TIME_W,flexShrink:0,textAlign:"right",paddingRight:8,paddingTop:2}}>
                <span style={{fontSize:9,color:"#d1d5db",fontWeight:500}}>{String(h).padStart(2,"0")}:00</span>
              </div>
              <div style={{flex:1,borderTop:"1px solid #f3f4f6"}}/>
            </div>
          ))}

          {/* Colonnes événements */}
          {wDays.map((day,ci)=>{
            const evts=getEvts(day).sort((a,b)=>tMin(a.startOverride)-tMin(b.startOverride));
            const left=`calc(${TIME_W}px + ${ci}*(100% - ${TIME_W}px)/${nCols})`;
            const width=`calc((100% - ${TIME_W}px)/${nCols})`;
            return (
              <div key={day} style={{position:"absolute",top:0,left,width,height:"100%",borderLeft:"1px solid #f3f4f6"}}>
                {evts.map(ev=>{
                  const sm = tMin(ev.startOverride);
                  const em = tMin(ev.endOverride);
                  const topPx   = toOffset(sm)/60*HOUR_H;
                  const durMin  = em>sm ? em-sm : em+24*60-sm;
                  const heightPx= Math.max(durMin/60*HOUR_H, 22);
                  const col     = ev.color||COLORS[ev.name]||"#2563EB";
                  const init    = INITIALES[ev.name]||"";
                  return (
                    <div key={ev.uid} onClick={()=>setEditEvt(ev)} style={{
                      position:"absolute",top:topPx,left:3,right:3,height:heightPx,
                      background:`${col}15`,border:`1px solid ${col}40`,borderLeft:`3px solid ${col}`,
                      borderRadius:5,padding:"3px 5px",cursor:"pointer",overflow:"hidden",zIndex:10,
                    }}>
                      <div style={{display:"flex",alignItems:"center",gap:3,marginBottom:1}}>
                        {heightPx>22&&init&&(
                          <div style={{width:14,height:14,borderRadius:3,background:col,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:5,fontWeight:900,flexShrink:0}}>{init}</div>
                        )}
                        <div style={{fontSize:9,fontWeight:800,color:col,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1}}>{ev.name||ev.label}</div>
                      </div>
                      {heightPx>32&&ev.s&&<div style={{fontSize:8,color:"#374151",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{ev.s}</div>}
                      {heightPx>44&&ev.a&&ev.a!=="TBA"&&<div style={{fontSize:7,color:"#6b7280",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>🎤 {ev.a}</div>}
                      <div style={{fontSize:7,color:"#9ca3af"}}>{ev.startOverride}–{ev.endOverride}</div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* PICKER */}
      {pickerDay&&(
        <Sheet title={`${DAYS_L[dow(pickerDay)]} ${pickerDay} Juin`} onClose={()=>setPickerDay(null)}>
          <div style={{paddingBottom:24}}>
            <SecLabel>Activités CILEX</SecLabel>
            {CILEX.map(item=>(
              <button key={item.id} onClick={()=>{addEvt(pickerDay,item);setPickerDay(null);}} style={S.row}>
                <div style={{display:"flex",alignItems:"center",gap:10,flex:1}}>
                  <div style={{width:44,height:44,borderRadius:8,background:item.color||"#2563EB",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{item.label.split(" ")[0]}</div>
                  <div style={{textAlign:"left"}}>
                    <div style={{fontSize:13,fontWeight:700,color:"#111"}}>{item.label}</div>
                    <div style={{fontSize:10,color:"#6b7280"}}>{item.start} – {item.end}</div>
                  </div>
                </div>
              </button>
            ))}
            <SecLabel>Clubs ce soir</SecLabel>
            {getClubs(pickerDay).map((c,i)=>{
              const inPlan=getEvts(pickerDay).find(e=>e.name===c.name);
              return (
                <button key={i} onClick={()=>{if(!inPlan){addEvt(pickerDay,c);setPickerDay(null);}}} style={{...S.row,opacity:inPlan?.4:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,flex:1,minWidth:0}}>
                    <div style={{width:44,height:44,borderRadius:8,background:c.color,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:10,fontWeight:900}}>{INITIALES[c.name]||c.name.slice(0,2)}</div>
                    <div style={{minWidth:0}}>
                      <div style={{fontSize:13,fontWeight:700,color:"#111"}}>{c.name}</div>
                      <div style={{fontSize:11,color:"#374151"}}>{c.s}</div>
                      {c.a!=="TBA"&&c.a!=="Résidents"&&<div style={{fontSize:10,color:c.color,fontWeight:600}}>🎤 {c.a}</div>}
                      <div style={{fontSize:9,color:"#9ca3af",fontStyle:"italic"}}>{c.g}</div>
                    </div>
                  </div>
                  <span style={{fontSize:14,color:inPlan?"#16a34a":"#d1d5db",fontWeight:700,flexShrink:0}}>{inPlan?"✓":"+"}</span>
                </button>
              );
            })}
          </div>
        </Sheet>
      )}

      {/* EDIT */}
      {editEvt&&(
        <Sheet title={editEvt.name||editEvt.label} onClose={()=>setEditEvt(null)}>
          <div style={{padding:"14px 18px 30px",display:"flex",flexDirection:"column",gap:10}}>
            {editEvt.s&&<IBox label="Soirée" val={editEvt.s}/>}
            {editEvt.a&&editEvt.a!=="TBA"&&editEvt.a!=="Résidents"&&<IBox label="Artiste" val={editEvt.a} c={editEvt.color}/>}
            {editEvt.g&&<IBox label="Genre" val={editEvt.g} c="#6b7280"/>}
            <div style={{display:"flex",gap:10}}>
              <div style={{flex:1}}>
                <div style={{fontSize:9,color:"#6b7280",marginBottom:3}}>DÉBUT</div>
                <input type="time" defaultValue={editEvt.startOverride} onChange={e=>{setEditEvt(p=>({...p,startOverride:e.target.value}));updEvt(editEvt.day,editEvt.uid,e.target.value,editEvt.endOverride);}} style={S.ti}/>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:9,color:"#6b7280",marginBottom:3}}>FIN</div>
                <input type="time" defaultValue={editEvt.endOverride} onChange={e=>{setEditEvt(p=>({...p,endOverride:e.target.value}));updEvt(editEvt.day,editEvt.uid,editEvt.startOverride,e.target.value);}} style={S.ti}/>
              </div>
            </div>
            <button onClick={()=>{delEvt(editEvt.day,editEvt.uid);setEditEvt(null);}} style={{background:"#fef2f2",border:"1px solid #fecaca",color:"#dc2626",borderRadius:8,padding:"10px",fontSize:13,fontWeight:700,cursor:"pointer"}}>🗑 Supprimer</button>
          </div>
        </Sheet>
      )}

      {showSummary&&<SummaryModal {...{client,events,total,com,sendWA,revealed,setRevealed,guess,setGuess,onClose:()=>setShowSummary(false)}}/>}
      <style>{CSS}</style>
    </div>
  );
}

// ── SUMMARY ───────────────────────────────────────────────────────
function SummaryModal({client,events,total,com,sendWA,revealed,setRevealed,guess,setGuess,onClose}){
  const days=Object.keys(events).map(Number).filter(d=>(events[d]||[]).length>0).sort((a,b)=>a-b);
  return (
    <Sheet title={`Récap — ${client||"Mon Client"}`} onClose={onClose}>
      <div style={{padding:"12px 18px 30px"}}>
        {days.length===0
          ? <div style={{color:"#9ca3af",fontStyle:"italic",padding:"10px 0"}}>Aucun événement planifié</div>
          : days.map(day=>(
            <div key={day} style={{marginBottom:14}}>
              <div style={{fontSize:11,fontWeight:800,color:"#2563EB",letterSpacing:0.5,marginBottom:6,textTransform:"uppercase"}}>{DAYS_L[dow(day)]} {day} Juin</div>
              {(events[day]||[]).sort((a,b)=>a.startOverride?.localeCompare(b.startOverride)).map((ev,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"6px 0",borderBottom:"1px solid #f3f4f6"}}>
                  <div style={{width:3,height:36,borderRadius:2,background:ev.color||COLORS[ev.name]||"#2563EB",flexShrink:0}}/>
                  <div style={{flex:1}}>
                    <div style={{fontSize:12,color:"#111",fontWeight:700}}>{ev.name||ev.label}</div>
                    {ev.s&&<div style={{fontSize:10,color:"#6b7280"}}>{ev.s}{ev.a&&ev.a!=="TBA"&&ev.a!=="Résidents"?` · ${ev.a}`:""}</div>}
                    <div style={{fontSize:9,color:"#9ca3af"}}>{ev.startOverride}</div>
                  </div>
                </div>
              ))}
            </div>
          ))
        }

        {days.length>0&&(
          <div style={{marginTop:16}}>
            {!revealed ? (
              <div style={{background:"#EFF6FF",border:"1px solid #BFDBFE",borderRadius:12,padding:"16px"}}>
                <div style={{fontSize:14,fontWeight:800,color:"#1e40af",textAlign:"center",marginBottom:6}}>💭 Combien pensez-vous que ça va vous coûter ?</div>
                <div style={{fontSize:11,color:"#3b82f6",textAlign:"center",marginBottom:12}}>Donnez votre estimation pour ce programme</div>
                <div style={{display:"flex",gap:8}}>
                  <input type="number" placeholder="Votre estimation €" value={guess} onChange={e=>setGuess(e.target.value)}
                    style={{flex:1,border:"1px solid #BFDBFE",borderRadius:8,padding:"10px 12px",fontSize:14,outline:"none",color:"#111"}}/>
                  <button onClick={()=>setRevealed(true)} style={{background:"#2563EB",border:"none",borderRadius:8,padding:"10px 16px",fontSize:13,fontWeight:800,color:"#fff",cursor:"pointer"}}>Révéler →</button>
                </div>
              </div>
            ):(
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {guess&&(
                  <div style={{background:"#f9fafb",borderRadius:10,padding:"10px 14px",textAlign:"center"}}>
                    <div style={{fontSize:11,color:"#6b7280"}}>Votre estimation</div>
                    <div style={{fontSize:22,fontWeight:900,color:"#374151"}}>{guess}€</div>
                  </div>
                )}
                <div style={{background:"#EFF6FF",border:"2px solid #2563EB",borderRadius:12,padding:"16px",textAlign:"center"}}>
                  <div style={{fontSize:11,color:"#3b82f6",fontWeight:600,marginBottom:4}}>PRIX TOTAL DU PROGRAMME</div>
                  <div style={{fontSize:38,fontWeight:900,color:"#2563EB"}}>{total()}€</div>
                  {guess&&<div style={{fontSize:11,color:"#6b7280",marginTop:4}}>{parseInt(guess)>total()?`🎉 Vous aviez estimé ${parseInt(guess)-total()}€ de plus`:parseInt(guess)<total()?`💡 ${total()-parseInt(guess)}€ de plus que prévu`:`✨ Estimation parfaite !`}</div>}
                </div>

                {/* Mini agenda après le prix */}
                <MiniAgenda events={events}/>

                <button onClick={sendWA} style={{width:"100%",background:"#25D366",color:"#fff",border:"none",borderRadius:10,padding:"13px",fontSize:14,fontWeight:800,cursor:"pointer"}}>📲 Envoyer sur WhatsApp</button>
              </div>
            )}
          </div>
        )}
      </div>
    </Sheet>
  );
}

// ── MINI AGENDA ───────────────────────────────────────────────────
function MiniAgenda({events}){
  const days=Object.keys(events).map(Number).filter(d=>(events[d]||[]).length>0).sort((a,b)=>a-b);
  if(!days.length) return null;
  const COL_W=50, ROW_H=4, HDR=38, TOTAL_H=15; // 16h→06h = 15 slots
  function tMin(t){if(!t)return 0;const[h,m]=t.split(":").map(Number);return h*60+m;}
  function toOff(min){return min>=16*60?min-16*60:min+(24-16)*60;}
  const HLABELS=[16,17,18,19,20,21,22,23,0,1,2,3,4,5,6];
  return (
    <div style={{marginBottom:4}}>
      <div style={{fontSize:10,fontWeight:700,color:"#6b7280",marginBottom:6,textTransform:"uppercase",letterSpacing:1}}>Vue agenda</div>
      <div style={{background:"#fafafa",border:"1px solid #e5e7eb",borderRadius:10,padding:"10px",overflowX:"auto"}}>
        <div style={{position:"relative",width:Math.max(days.length*COL_W+30,200),height:HDR+TOTAL_H*ROW_H}}>
          {HLABELS.map((h,i)=>(
            <div key={i} style={{position:"absolute",top:HDR+i*ROW_H,left:0,right:0,display:"flex",alignItems:"center",pointerEvents:"none"}}>
              <div style={{width:28,fontSize:6,color:"#d1d5db",textAlign:"right",paddingRight:3}}>{i%4===0?String(h).padStart(2,"0")+"h":""}</div>
              <div style={{flex:1,borderTop:"1px solid #f3f4f6"}}/>
            </div>
          ))}
          {days.map((day,ci)=>{
            const x=30+ci*COL_W;
            const d=dow(day);
            return (
              <div key={day} style={{position:"absolute",top:0,left:x,width:COL_W}}>
                <div style={{height:HDR,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",borderBottom:"2px solid #e5e7eb"}}>
                  <div style={{fontSize:7,color:"#9ca3af",fontWeight:700}}>{DAYS_S[d]}</div>
                  <div style={{width:20,height:20,borderRadius:"50%",background:"#2563EB",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:9,fontWeight:900}}>{day}</div>
                </div>
                {(events[day]||[]).map((ev,ei)=>{
                  const sm=tMin(ev.startOverride);
                  const em=tMin(ev.endOverride);
                  const off=toOff(sm);
                  const dur=em>sm?em-sm:em+24*60-sm;
                  const top=HDR+off*ROW_H/60;
                  const h=Math.max(dur*ROW_H/60,6);
                  const col=ev.color||COLORS[ev.name]||"#2563EB";
                  return (
                    <div key={ei} style={{position:"absolute",top,left:2,right:2,height:h,background:`${col}25`,borderLeft:`2px solid ${col}`,borderRadius:2,overflow:"hidden"}}>
                      <div style={{fontSize:5,fontWeight:800,color:col,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",padding:"0 2px"}}>{INITIALES[ev.name]||ev.label?.slice(0,3)||""}</div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:5,marginTop:6,paddingTop:6,borderTop:"1px solid #e5e7eb"}}>
          {[...new Map(days.flatMap(d=>(events[d]||[])).map(ev=>[ev.name||ev.label,ev])).values()].map((ev,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:3}}>
              <div style={{width:7,height:7,borderRadius:2,background:ev.color||COLORS[ev.name]||"#2563EB"}}/>
              <span style={{fontSize:8,color:"#6b7280",fontWeight:600}}>{ev.name||ev.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Composants utilitaires ────────────────────────────────────────
function Sheet({title,children,onClose}){
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.35)",zIndex:200,display:"flex",flexDirection:"column",justifyContent:"flex-end"}} onClick={onClose}>
      <div style={{background:"#fff",borderRadius:"18px 18px 0 0",maxHeight:"88vh",overflowY:"auto",boxShadow:"0 -4px 20px rgba(0,0,0,0.1)"}} onClick={e=>e.stopPropagation()}>
        <div style={{padding:"13px 18px 10px",borderBottom:"1px solid #f3f4f6",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,background:"#fff",zIndex:1}}>
          <span style={{fontSize:15,fontWeight:800,color:"#111"}}>{title}</span>
          <button onClick={onClose} style={{background:"#f3f4f6",border:"none",color:"#6b7280",fontSize:14,cursor:"pointer",borderRadius:"50%",width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}
function SecLabel({children}){return <div style={{padding:"10px 16px 5px",fontSize:9,color:"#9ca3af",letterSpacing:2,textTransform:"uppercase",fontWeight:700}}>{children}</div>;}
function IBox({label,val,c}){return <div style={{background:"#f9fafb",border:"1px solid #f3f4f6",borderRadius:8,padding:"7px 12px"}}><div style={{fontSize:8,color:"#9ca3af",marginBottom:1,letterSpacing:1,textTransform:"uppercase"}}>{label}</div><div style={{fontSize:13,fontWeight:700,color:c||"#111"}}>{val}</div></div>;}

const S = {
  nb: {background:"#f9fafb",border:"1px solid #e5e7eb",color:"#374151",borderRadius:7,padding:"4px 10px",fontSize:12,cursor:"pointer",fontWeight:600},
  row:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,width:"100%",padding:"10px 16px",background:"none",border:"none",borderBottom:"1px solid #f3f4f6",cursor:"pointer"},
  ti: {background:"#f9fafb",border:"1px solid #e5e7eb",borderRadius:8,padding:"9px 11px",color:"#111",fontSize:14,outline:"none",width:"100%"},
};

const CSS=`*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{width:4px;height:4px}::-webkit-scrollbar-thumb{background:#e5e7eb;border-radius:4px}input[type=time]{-webkit-appearance:none;color-scheme:light}`;
