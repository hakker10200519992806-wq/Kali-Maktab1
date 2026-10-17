/* Kali Maktab Plus2: Bandit, Subnet, Kripto, Regex, Izoh, Sertifikat, Ctrl+K */
(()=>{
const K='kms_p2';let P={b:0,n:{},name:'',pro:false};try{Object.assign(P,JSON.parse(localStorage.getItem(K)||'{}'))}catch(e){}
const sv=()=>{try{localStorage.setItem(K,JSON.stringify(P))}catch(e){}};
const E=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const rng=a=>()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const W=['alfa','beta','gamma','delta','omega','kali','root','shell','port','node'];
/* ---- Bandit ---- */
const T=['cat bilan faylni o\'qing (ls bilan fayllarni ko\'ring)','grep bilan PAROL qatorini toping','sort | uniq -u: faqat bir marta uchraydigan qator','base64 -d bilan kodni oching','grep ERROR fayl | wc -l: ERROR qatorlari sonini yozing'];
function lvl(i){const r=rng(i*977+13),p=()=>W[r()*10|0],pw=Array.from({length:10},()=>'abcdefghjkmnpqrstuvwxyz23456789'[r()*31|0]).join(''),t=i%5,n=8+i*2,f={},ans=pw;
if(t==0){f['readme']='Xush kelibsiz!\nParol: '+pw;f['eski.txt']='bo\'sh';f['eslatma.txt']='parol bu yerda emas'}
if(t==1){const L=Array.from({length:n*2},()=>'INFO '+p()+' '+(r()*999|0));L.splice(r()*L.length|0,0,'PAROL='+pw);f['server.log']=L.join('\n')}
if(t==2){let L=[];for(let k=0;k<n;k++){const s=p()+(r()*99|0);L.push(s,s)}L.push(pw);f['royxat.txt']=L.sort(()=>r()-.5).join('\n')}
if(t==3){f['kod.b64']=btoa('Parol: '+pw)}
if(t==4){const c=3+(r()*9|0);let L=Array.from({length:n},()=>'INFO '+p());for(let k=0;k<c;k++)L.push('ERROR '+p());f['app.log']=L.sort(()=>r()-.5).join('\n');return{f,a:String(c),h:T[t]}}
return{f,a:ans,h:T[t]}}
function sh(line,F){let inp=null;try{for(const st of line.split('|')){const a=(st.match(/"[^"]*"|'[^']*'|\S+/g)||[]).map(x=>x.replace(/^["']|["']$/g,'')),c=a.shift(),fl=a.filter(x=>x[0]=='-'),ar=a.filter(x=>x[0]!='-'),fn=ar.find(x=>x in F),get=()=>fn?F[fn]:inp;
if(!c)continue;let o;
if(c=='ls')o=Object.keys(F).join('  ');
else if(c=='cat')o=ar.map(x=>F[x]??('cat: '+x+': fayl yo\'q')).join('\n');
else if(c=='grep'){const pat=ar[0],tx=get();if(tx==null)throw'grep: kirish yo\'q';let L=tx.split('\n'),ic=fl.includes('-i'),m=x=>ic?x.toLowerCase().includes(pat.toLowerCase()):x.includes(pat);L=L.filter(x=>fl.includes('-v')?!m(x):m(x));o=fl.includes('-c')?String(L.length):L.join('\n')}
else if(c=='wc'){const tx=get()||'';o=String(tx?tx.split('\n').length:0)}
else if(c=='sort')o=(get()||'').split('\n').sort().join('\n');
else if(c=='uniq'){const L=(get()||'').split('\n'),m={};L.forEach(x=>m[x]=(m[x]||0)+1);const u=[...new Set(L)];o=u.filter(x=>fl.includes('-u')?m[x]==1:fl.includes('-d')?m[x]>1:1).map(x=>fl.includes('-c')?m[x]+' '+x:x).join('\n')}
else if(c=='head'||c=='tail'){const nn=+(ar.find(x=>/^\d+$/.test(x))||10),L=(get()||'').split('\n');o=(c=='head'?L.slice(0,nn):L.slice(-nn)).join('\n')}
else if(c=='base64'){try{o=atob((get()||'').trim())}catch(e){o='base64: noto\'g\'ri'}}
else throw c+': buyruq topilmadi (ls cat grep wc sort uniq head tail base64)';
inp=o}return inp??''}catch(e){return String(e)}}
function bandit(el){const done=P.b;el.innerHTML='<p>20 daraja. Oldingisini yechmasdan keyingisi ochilmaydi. Parolni toping va kiriting.</p><div id=bl style="display:flex;flex-wrap:wrap;gap:6px"></div><div id=bv></div>';
const bl=el.querySelector('#bl');for(let i=0;i<20;i++){const b=document.createElement('button');b.textContent=i+1;b.disabled=i>done&&!P.pro;b.style.cssText='width:44px;height:44px;'+(i<done?'background:#1f6f43;color:#fff':'');b.onclick=()=>open(i);bl.append(b)}
function open(i){const L=lvl(i),v=el.querySelector('#bv');v.innerHTML=`<h3>${i+1}-daraja</h3><p>Maslahat: ${E(L.h)}</p><pre id=bo style="min-height:80px;background:#000;color:#6f6;padding:8px;white-space:pre-wrap;overflow:auto">$ ls\n${E(Object.keys(L.f).join('  '))}</pre><input id=bc placeholder="buyruq" style="width:100%"><br><input id=ba placeholder="parol / javob" style="width:70%"><button id=bk>Tekshirish</button><div id=bm></div>`;
const o=v.querySelector('#bo');v.querySelector('#bc').onkeydown=e=>{if(e.key=='Enter'){o.textContent+='\n$ '+e.target.value+'\n'+sh(e.target.value,L.f);e.target.value=''}};
v.querySelector('#bk').onclick=()=>{const ok=v.querySelector('#ba').value.trim()==L.a;v.querySelector('#bm').textContent=ok?'To\'g\'ri!':'Noto\'g\'ri, qayta urining';if(ok&&P.b==i){P.b=i+1;sv();bandit(el);open(i)}}}}
/* ---- Subnet ---- */
const ip2n=s=>{const p=s.trim().split('.').map(Number);if(p.length!=4||p.some(x=>!(x>=0&&x<256)))return null;return((p[0]<<24)|(p[1]<<16)|(p[2]<<8)|p[3])>>>0},n2ip=n=>[n>>>24,n>>>16&255,n>>>8&255,n&255].join('.');
function sub(el){el.innerHTML='<input id=si value="192.168.1.77/26" style="width:70%"><button id=sg>Hisobla</button><pre id=so></pre><h4>Mashq</h4><p id=sq></p><input id=sa style="width:40%"><button id=sc>Tekshir</button> <span id=sr></span>';
const calc=()=>{const[a,b]=el.querySelector('#si').value.split('/'),ip=ip2n(a),p=+b,o=el.querySelector('#so');if(ip==null||!(p>=0&&p<=32)){o.textContent='Format: 192.168.1.10/24';return}const m=p?(0xFFFFFFFF<<(32-p))>>>0:0,net=(ip&m)>>>0,br=(net|~m)>>>0,h=p>=31?(p==32?1:2):2**(32-p)-2;o.textContent=`Maska: ${n2ip(m)}\nWildcard: ${n2ip(~m>>>0)}\nTarmoq: ${n2ip(net)}\nBroadcast: ${n2ip(br)}\nBirinchi host: ${n2ip(net+1)}\nOxirgi host: ${n2ip(br-1)}\nHostlar soni: ${h}`};
el.querySelector('#sg').onclick=calc;calc();let q;const nq=()=>{q=16+(Math.random()*15|0);el.querySelector('#sq').textContent=`/${q} maskada nechta host (ishlatiladigan IP) bor?`;el.querySelector('#sa').value=''};nq();
el.querySelector('#sc').onclick=()=>{const ok=+el.querySelector('#sa').value==2**(32-q)-2;el.querySelector('#sr').textContent=ok?'To\'g\'ri! (2^(32-p)-2)':'Noto\'g\'ri: 2^(32-'+q+')-2 = '+(2**(32-q)-2);if(ok)setTimeout(nq,900)}}
/* ---- Kripto ---- */
function cry(el){el.innerHTML='<h4>Sezar shifri</h4><input id=ct value="salom kali" style="width:60%"> siljish <input id=cs type=number value=3 style="width:50px"><pre id=co></pre><h4>Base64 (shifr EMAS, faqat kodlash)</h4><input id=bt value="parol123" style="width:60%"><pre id=bo2></pre><h4>SHA-256 (xesh, qaytarib bo\'lmaydi)</h4><input id=ht value="parol123" style="width:60%"><pre id=ho style="white-space:pre-wrap;word-break:break-all"></pre><h4>Mini-o\'yin: Sezar shifrini ochish</h4><p id=gq></p><input id=ga><button id=gk>Tekshir</button> <span id=gr></span>';
const caes=(s,k)=>s.replace(/[a-z]/gi,c=>{const b=c<='Z'?65:97;return String.fromCharCode((c.charCodeAt(0)-b+k%26+26)%26+b)}),q=s=>el.querySelector(s);
q('#ct').oninput=q('#cs').oninput=()=>q('#co').textContent=caes(q('#ct').value,+q('#cs').value||0);q('#ct').oninput();
q('#bt').oninput=()=>{let v=q('#bt').value;q('#bo2').textContent='kodlangan: '+btoa(unescape(encodeURIComponent(v)))};q('#bt').oninput();
q('#ht').oninput=async()=>{const h=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(q('#ht').value));q('#ho').textContent=[...new Uint8Array(h)].map(x=>x.toString(16).padStart(2,'0')).join('')};q('#ht').oninput();
let w,k;const ng=()=>{w=W[Math.random()*10|0];k=1+(Math.random()*24|0);q('#gq').textContent='Shifrlangan: '+caes(w,k)+' (siljish nomalum, 1-25)';q('#ga').value=''};ng();
q('#gk').onclick=()=>{const ok=q('#ga').value.trim().toLowerCase()==w;q('#gr').textContent=ok?'To\'g\'ri! siljish='+k:'Yo\'q, davom eting';if(ok)setTimeout(ng,1000)}}
/* ---- Regex ---- */
function rx(el){el.innerHTML='<p>Regex (grep -E / sed -E uslubi):</p><input id=rp value="[0-9]+" style="width:60%"> bayroqlar <input id=rf value=g style="width:40px"><textarea id=rt rows=6 style="width:100%">192.168.1.10 port 22\nerror: 404 /admin\nuser=kali id=1000</textarea><div id=ro style="white-space:pre-wrap;background:#000;color:#ddd;padding:8px"></div><p id=rm></p>';
const f=()=>{const t=el.querySelector('#rt').value;try{const re=new RegExp(el.querySelector('#rp').value,el.querySelector('#rf').value.includes('g')?el.querySelector('#rf').value:el.querySelector('#rf').value+'g');let o='',l=0,c=0,m;while((m=re.exec(t))&&c<500){if(!m[0]){re.lastIndex++;continue}o+=E(t.slice(l,m.index))+'<mark>'+E(m[0])+'</mark>';l=m.index+m[0].length;c++}el.querySelector('#ro').innerHTML=o+E(t.slice(l));el.querySelector('#rm').textContent=c+' ta moslik'}catch(e){el.querySelector('#rm').textContent='Xato: '+e.message}};
['#rp','#rf','#rt'].forEach(s=>el.querySelector(s).oninput=f);f()}
/* ---- Izohlar ---- */
function nts(el){el.innerHTML='<input id=nq placeholder="Qidirish..." style="width:100%"><input id=nk placeholder="Mavzu (masalan: grep darsi)" style="width:100%"><textarea id=nv rows=5 style="width:100%" placeholder="Izohingiz"></textarea><button id=ns>Saqlash</button><div id=nl></div>';
const q=s=>el.querySelector(s),lst=()=>{const f=q('#nq').value.toLowerCase();q('#nl').innerHTML=Object.entries(P.n).filter(([k,v])=>(k+v).toLowerCase().includes(f)).map(([k,v])=>`<p><b>${E(k)}</b> <a href=# data-k="${E(k)}">tahrir</a> <a href=# data-d="${E(k)}">o'chirish</a><br>${E(v)}</p>`).join('')||'<p>Izoh yo\'q</p>'};
q('#ns').onclick=()=>{if(q('#nk').value.trim()){P.n[q('#nk').value.trim()]=q('#nv').value;sv();lst()}};q('#nq').oninput=lst;
q('#nl').onclick=e=>{const k=e.target.dataset.k,d=e.target.dataset.d;if(k){q('#nk').value=k;q('#nv').value=P.n[k]}if(d){delete P.n[d];sv();lst()}e.preventDefault()};lst()}
/* ---- Sertifikat ---- */
function cer(el){const R=req();if(!P.pro&&!R.ok){el.innerHTML=`<p>Yakuniy sertifikat uchun shartlar:</p><p>${R.l?'✔':'○'} barcha darslar o'qilgan<br>${R.t?'✔':'○'} yakuniy test kamida 10/15<br>${R.b?'✔':'○'} Bandit 20/20</p><p>PRO rejimida bu shartlar talab qilinmaydi (Sozlamalar).</p>`;return}el.innerHTML=`<p>Bandit darajalari: <b>${P.b}/20</b></p><input id=cn placeholder="Ismingiz" value="${E(P.name)}"><button id=cg>PNG yaratish</button><br><canvas id=cc width=1000 height=640 style="max-width:100%;margin-top:8px"></canvas><br><a id=cd download=sertifikat.png>Yuklab olish</a>`;
el.querySelector('#cg').onclick=()=>{P.name=el.querySelector('#cn').value;sv();const c=el.querySelector('#cc'),x=c.getContext('2d');x.fillStyle='#0d1320';x.fillRect(0,0,1000,640);x.strokeStyle='#3fa9f5';x.lineWidth=6;x.strokeRect(20,20,960,600);x.fillStyle='#fff';x.textAlign='center';x.font='bold 54px sans-serif';x.fillText('SERTIFIKAT',500,140);x.font='28px sans-serif';x.fillText('Kali Terminal Maktabi',500,200);x.font='bold 48px sans-serif';x.fillStyle='#3fa9f5';x.fillText(P.name||'Ism Familiya',500,330);x.fillStyle='#fff';x.font='26px sans-serif';x.fillText(`Terminal mashqlari: ${P.b}/20 daraja bajarildi`,500,410);x.fillText(new Date().toLocaleDateString('uz'),500,520);const a=el.querySelector('#cd');a.href=c.toDataURL('image/png')};}

/* ---- PRO ---- */
const HASH='a519508c9a2385e3a428e51777207b4baa7984105f704df1c850e15241e11a48';
const req=()=>{const ok=typeof S!=='undefined'&&typeof D!=='undefined',l=ok&&(S.l||[]).length>=D.length,t=ok&&S.q>=10,b=P.b>=20;return{l,t,b,ok:l&&t&&b}};
function set(el){const q=s=>el.querySelector(s),draw=()=>{el.innerHTML=`<p>Holat: <b>${P.pro?'PRO (VIP) faol ✓':'Oddiy'}</b></p><p>PRO rejimida: darslarni tugatmasdan Test/Mashqlar/Kartalarga o'tish, yakuniy testni o'tkazib yuborish, sertifikat olish, Bandit darajalarining hammasi ochiq.</p><input id=kc type=password placeholder="Kod" style="width:60%"><button id=ks>Saqlash</button> ${P.pro?'<button id=ko>PRO ni o\'chirish</button>':''}<p id=km></p>`;
q('#ks').onclick=async()=>{const h=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(q('#kc').value.trim()));if([...new Uint8Array(h)].map(x=>x.toString(16).padStart(2,'0')).join('')==HASH){P.pro=true;sv();draw();q('#km').textContent='PRO yoqildi!'}else q('#km').textContent='Kod noto\'g\'ri'};
if(P.pro)q('#ko').onclick=()=>{P.pro=false;sv();draw()}};draw()}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('.tabs button,#mnav button');if(!b||!b.dataset.t||b.dataset.t=='l'||P.pro)return;if(typeof S!=='undefined'&&typeof D!=='undefined'&&(S.l||[]).length<D.length){e.preventDefault();e.stopImmediatePropagation();alert('Avval barcha darslarni o\'qing yoki Plus ▸ Sozlamalarda PRO kodni kiriting.')}},true);
/* ---- Panel ---- */
const M=[['Bandit mashqlari (20 daraja)',bandit],['Subnet kalkulyatori',sub],['Kriptografiya',cry],['Regex sinov maydoni',rx],['Izohlar',nts],['Sertifikat',cer],['Sozlamalar (PRO kod)',set]];
const ov=document.createElement('div');ov.style.cssText='display:none;position:fixed;inset:0;z-index:99999;background:#0d1320;color:#e6edf7;overflow:auto;padding:12px;font:15px system-ui';document.body.append(ov);
function menu(f=''){ov.innerHTML='<button id=px style="float:right">✕</button><h3>Plus 2</h3><input id=pf placeholder="Qidirish (Ctrl+K)" style="width:100%">'+M.filter(m=>m[0].toLowerCase().includes(f)).map((m,i)=>`<button data-i="${M.indexOf(m)}" style="display:block;width:100%;margin:6px 0;padding:12px;text-align:left">${m[0]}</button>`).join('');
ov.querySelector('#px').onclick=()=>ov.style.display='none';const pf=ov.querySelector('#pf');pf.value=f;pf.oninput=()=>{menu(pf.value.toLowerCase());ov.querySelector('#pf').focus()};
ov.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{const m=M[b.dataset.i];ov.innerHTML='<button id=pb>← Orqaga</button><h3>'+m[0]+'</h3><div id=pm></div>';ov.querySelector('#pb').onclick=()=>menu();m[1](ov.querySelector('#pm'))})}
const fb=document.createElement('button');fb.textContent='＋';fb.title='Plus 2 (Ctrl+K)';fb.style.cssText='position:fixed;left:10px;bottom:70px;z-index:9998;width:44px;height:44px;border-radius:50%;border:0;background:#3fa9f5;color:#fff;font-size:22px';
const op=()=>{ov.style.display='block';menu();ov.querySelector('#pf').focus()};fb.onclick=op;document.body.append(fb);
addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key=='k'){e.preventDefault();op()}});
})();
