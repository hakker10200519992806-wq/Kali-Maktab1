/* Kali Maktab Plus v3: CTF, bash skript, zaif joylar, takrorlash, sozlamalar */
(()=>{
S.ui=S.ui||{};S.w=S.w||[];S.sr=S.sr||{};
const ENV={HOME:"/home/kali",USER:"kali",SHELL:"/usr/bin/zsh",PATH:"/usr/local/bin:/usr/bin:/bin",LAB:"192.168.56.101"};
const sx=s=>s.replace(/\$\{?(\w+)\}?/g,(_,k)=>ENV[k]??"");
/* CTF fayllari */
fs.c.home.c.kali.c.lab.c.ctf=d({".bayroq":f("FLAG{yashirin_fayl_topildi}\n"),"server.log":f("INFO: tizim ishga tushdi\nINFO: foydalanuvchi kirdi (kali)\nERROR: parol xato (user=admin)\nINFO: fayl yuklandi\nERROR: parol xato (user=admin)\nWARN: disk 80%\nINFO: tor ulandi\nERROR: ulanish uzildi\nINFO: zaxira tayyor\nINFO: chiqish\n"),notes:d({"eslatma.txt":f("Bugun lab tayyor.\nFLAG{grep_r_topdi}\n")}),arxiv:d({eski:d({"lab.key":f("KEY{find_ishlaydi}\n")})}),"secret.b64":f(btoa("FLAG{base64_ochildi}")+"\n")});
CH.push(
["CTF 1: lab/ctf ichida yashirin fayl bor. Uni toping va o'qing",/^cat\s+\S*\.bayroq/,"cat lab/ctf/.bayroq"],
["CTF 2: server.log dan faqat ERROR qatorlarini chiqaring",/^grep\s+.*ERROR\s+\S*server\.log/,"grep ERROR lab/ctf/server.log"],
["CTF 3: server.log necha qatordan iborat? wc bilan sanang",/^wc\s+-l\s+\S*server\.log/,"wc -l lab/ctf/server.log"],
["CTF 4: find bilan .key faylini toping",/^find\s.*-name\s+["']?\*\.key/,'find lab -name "*.key"'],
["CTF 5: secret.b64 ni base64 bilan oching",/base64\s+(-d|--decode)/,"base64 -d lab/ctf/secret.b64"],
["CTF 6: lab papkasida FLAG so'zini rekursiv qidiring",/^grep\s+-\w*r\w*\s+\S*FLAG/,"grep -r FLAG lab"],
["CTF 7: skript yozing, bajariladigan qiling va ishga tushiring",/\.\/\S+\.sh|^(bash|sh)\s+\S+\.sh/,"echo 'echo salom' > s.sh && chmod +x s.sh && ./s.sh"]);
/* yangi darslar */
const A=(c,n,dd,x)=>D.push({c,n,d:dd,x});
A("Fayllar","nano","Matn muharriri. Simulyatorda matn so'raladi (qator ajratish: \\n).",[["nano salom.txt","fayl yaratish/tahrirlash"]]);
A("Fayllar","file","Fayl turini aytadi.",[["file notes.txt","tur"]]);
A("Fayllar","hexdump","Fayl baytlarini o'n oltilik ko'rinishda ko'rsatadi.",[["hexdump notes.txt","hex"]]);
A("Matn","base64","Base64 kodlash/ochish (shifrlash emas!).",[["echo salom | base64","kodlash"],["echo c2Fsb20= | base64 -d","ochish"]]);
A("Matn","strings","Fayldan o'qiladigan matn qatorlarini ajratadi.",[["strings notes.txt","matnlar"]]);
A("Matn","grep -r","Papkani ichma-ich qidiradi.",[["grep -r nmap .","hamma fayllarda"]]);
A("Bash","export","O'zgaruvchi yaratadi; $NOM bilan ishlatiladi. env hammasini ko'rsatadi.",[["export ISM=Ali","o'zgaruvchi"],["echo Salom $ISM","ishlatish"],["env","ro'yxat"]]);
A("Bash","bash skript","Skript yozing, chmod +x qiling va ./ bilan ishga tushiring. for va if ishlaydi.",[["echo 'for i in 1 2 3; do echo son $i; done' > s.sh","skript yozish"],["chmod +x s.sh","ruxsat"],["./s.sh","ishga tushirish"]]);
A("Tizim","jobs","Fon jarayonlarini ko'rsatadi (bg, fg bilan).",[["jobs","fon ishlari"]]);
A("Tizim","journalctl","Tizim jurnalini ko'rsatadi.",[["journalctl -n 5","oxirgi 5 yozuv"]]);
A("Tarmoq","netstat","Ulanishlar va portlar (ss ning eskisi).",[["netstat -tuln","portlar"]]);
/* buyruqlar */
const E0=C.echo,G0=C.grep;
Object.assign(C,{
echo:a=>E0(a.map(x=>sx(x).replace(/\u0001/g,"$"))),
grep:(a,i)=>{const fl=a.filter(x=>x[0]=="-").join("");if(!/r/.test(fl))return G0(a,i);const ar=a.filter(x=>x[0]!="-"),re=new RegExp(ar[0]),o=[];(function w(n,p){if(!n)return;if(n.t=="f")lines(n.v).forEach(l=>re.test(l)&&o.push(p+":"+l));else Object.keys(n.c).forEach(k=>w(n.c[k],p+"/"+k))})(node(ar[1]||"."),ar[1]||".");return o.join("\n")},
nano:a=>{const p=a[0];if(!p)return "nano: fayl nomi kerak";const[pp,n]=par(p);if(!pp||pp.t!="d")return "nano: yo'l noto'g'ri, topilmadi";const old=pp.c[n]&&pp.c[n].t=="f"?pp.c[n].v:"";const v=prompt("nano — "+p+" (qator ajratish: \\n)",old.replace(/\n$/,"").replace(/\n/g,"\\n"));if(v===null)return "nano: bekor qilindi";pp.c[n]=f(v.replace(/\\n/g,"\n")+"\n");return p+" saqlandi"},
file:a=>{const n=a[0]&&node(a[0]);return !a[0]?"file: fayl nomi kerak":n?a[0]+(n.t=="d"?": directory":": ASCII text"):"file: "+a[0]+": topilmadi"},
hexdump:a=>{const n=node(a.filter(x=>x[0]!="-")[0]||"");if(!n||n.t!="f")return "hexdump: fayl topilmadi";return "00000000  "+[...n.v].slice(0,32).map(c=>c.charCodeAt(0).toString(16).padStart(2,"0")).join(" ")},
base64:(a,i)=>{const dec=a.includes("-d")||a.includes("--decode"),ar=a.filter(x=>x[0]!="-"),t=(ar.length?txt(ar,i,"base64"):(i||"")).replace(/\n$/,"");try{return dec?decodeURIComponent(escape(atob(t.trim()))):btoa(unescape(encodeURIComponent(t)))}catch(e){return "base64: noto'g'ri kirish"}},
strings:(a,i)=>lines(txt(a.filter(x=>x[0]!="-"),i,"strings")).filter(l=>l.length>3).join("\n"),
env:()=>Object.entries(ENV).map(([k,v])=>k+"="+v).join("\n"),
export:a=>{a.forEach(x=>{const m=x.match(/^(\w+)=(.*)$/);if(m)ENV[m[1]]=m[2]});return ""},
jobs:()=>"Fon jarayonlari yo'q.",
journalctl:()=>"Oct 16 12:00:01 kali systemd[1]: Started tor@default.service.\nOct 16 12:00:04 kali tor[612]: Bootstrapped 100% (done)\nOct 16 12:01:10 kali sshd[701]: Server listening on 0.0.0.0 port 22.",
netstat:()=>"Proto Local Address      State\ntcp   127.0.0.1:9050     LISTEN\ntcp   0.0.0.0:22         LISTEN"});
/* bash skript yurgizgichi */
function line(l,out){l=l.trim();if(!l||l[0]=="#")return;let m=l.match(/^for\s+(\w+)\s+in\s+(.+?);\s*do\s+(.+?);?\s*done$/);
if(m){m[2].trim().split(/\s+/).forEach(v=>{ENV[m[1]]=v;m[3].split(";").forEach(x=>line(x,out))});return}
m=l.match(/^if\s+\[\s+(\S+)\s+(-eq|-gt|-lt|==)\s+(\S+)\s+\];\s*then\s+(.+?);\s*(?:else\s+(.+?);\s*)?fi$/);
if(m){const a=sx(m[1]),b=sx(m[3]),ok=m[2]=="-eq"||m[2]=="=="?a==b:m[2]=="-gt"?+a>+b:+a<+b,body=ok?m[4]:m[5];body&&body.split(";").forEach(x=>line(x,out));return}
m=l.match(/^(\w+)=(.*)$/);if(m){ENV[m[1]]=sx(m[2]).replace(/^["']|["']$/g,"");return}
const r=sx(l).split("|").reduce((x,s)=>run(s.trim(),x),"");if(r)out.push(r)}
const X=exec;exec=function(t,inp){const c=t[0];
if(/^\w+=/.test(c)&&t.length==1){const m=c.match(/^(\w+)=(.*)$/);ENV[m[1]]=m[2];return ""}
if(c=="bash"||c=="sh"||/^\.\//.test(c)){const dot=/^\.\//.test(c),p=dot?c:t[1],n=p&&node(p);if(!n||n.t!="f")return (p||"bash")+": fayl topilmadi";const m=n.m||"";if(dot&&!(m=="+x"||/^\d{3}$/.test(m)&&(m[0]&1)))return "zsh: "+c+": ruxsat rad etildi (chmod +x kerak)";const o=[];n.v.split("\n").forEach(l=>line(l,o));return o.join("\n")}
return X(t,inp)};
/* yangi tablar: takrorlash va zaif joylar */
document.querySelector(".tabs").insertAdjacentHTML("beforeend",'<button data-t="r">Takror</button><button data-t="w">Zaif joylar</button>');
let SRB=false,CUR=null;
function sr(){if(!S.l.length){pane.innerHTML="<h2>Takrorlash</h2><p class='mu'>Avval Darslarda o'rgangan buyruqlaringizni belgilang.</p>";return}
const now=Date.now(),due=D.filter(x=>S.l.includes(x.n)&&(!S.sr[x.n]||S.sr[x.n].due<=now));
if(!due.length){const n=Math.min(...Object.values(S.sr).map(v=>v.due));pane.innerHTML=`<h2>Takrorlash</h2><p>Bugungi takrorlar tugadi 🎉</p><p class="mu">Keyingisi: ${new Date(n).toLocaleString()}</p>`;return}
const x=CUR=due[0],e=x.x[0][0];
pane.innerHTML=`<h2>Takrorlash (1-3-7-14-30 kun)</h2><p class="mu">Navbatda: ${due.length}</p><div class="cm"><p class="mu">${esc(x.c)}</p><h3>${esc(x.d)}</h3>`+(SRB?`<div class="ex"><code>${esc(e)}</code><button class="b" data-run="${esc(e)}">▶ Terminalda</button></div><p>Buyruq: <b class="nm">${esc(x.n)}</b></p><button class="b" data-sra="1">Bilaman</button> <button class="b" data-sra="0">Qiyin</button>`:`<button class="b big" data-sra="s">Javobni ko'rsatish</button>`)+"</div>"}
function weak(){let P={};try{P=JSON.parse(localStorage.getItem("kms_plus_profile_v1")||"{}")}catch(e){}
const wk=Object.entries(P.daily||{}).filter(([k])=>Date.now()-new Date(k)<7*864e5).reduce((s,[,v])=>s+v,0);
pane.innerHTML=`<h2>Haftalik hisobot</h2><div class="cm"><p>7 kunlik faoliyat: <b>${wk}</b> · Darslar: <b>${S.l.length}/${D.length}</b> · Mashqlar: <b>${S.c.length}/${CH.length}</b> · Test rekordi: <b>${S.q}/15</b> · XP: <b>${P.xp||0}</b></p></div><h3>Zaif joylar (${S.w.length})</h3>`+(S.w.length?S.w.map(w=>`<div class="cm"><b>${esc(w.q)}</b><p class="mu">${esc(w.e)}</p></div>`).join("")+'<button class="b big" data-wq>Xatolarni qayta ishlash</button>':'<p class="mu">Hozircha xato yo\'q. Testda xato qilingan savollar shu yerga tushadi.</p>')}
const S0=show;show=function(){if(tab=="r"||tab=="w"){document.querySelectorAll(".tabs button").forEach(b=>b.classList.toggle("on",b.dataset.t==tab));tab=="r"?sr():weak();prog();return}S0()};
pane.addEventListener("click",e=>{const t=e.target,v=t.dataset&&t.dataset.sra;
if(v!==undefined&&CUR){if(v=="s")SRB=true;else{const r=S.sr[CUR.n]||{b:0},b0=r.b||0,ok=v=="1";r.b=ok?Math.min(b0+1,4):0;r.due=Date.now()+(ok?[1,3,7,14,30][b0]*864e5:6e5);S.sr[CUR.n]=r;save();SRB=false}sr();return}
if(t.dataset&&"wq" in t.dataset){Q={qs:sh(S.w.map(w=>({q:w.q,o:w.o,a:w.a,e:w.e}))).slice(0,15),i:0,s:0,d:false};tab="q";show()}});
pane.addEventListener("click",e=>{const t=e.target.closest(".opt");if(!t||!Q||Q.i>=Q.qs.length)return;const q=Q.qs[Q.i];if(!q||q.rec)return;q.rec=1;vib(t.dataset.o===q.a?20:[50,40,50]);
if(t.dataset.o===q.a)S.w=S.w.filter(w=>w.q!==q.q);else if(!S.w.some(w=>w.q===q.q))S.w.push({q:q.q,o:q.o,a:q.a,e:q.e});save()});
/* sozlamalar: Android uchun markaziy panel (ovoz, vibratsiya, shrift, kontrast) */
const vib=p=>{try{S.ui.vb!==false&&navigator.vibrate&&navigator.vibrate(p)}catch(e){}};
document.head.insertAdjacentHTML("beforeend",`<style>html.hc{--tx:#000;--mu:#1a1a1a;--ln:#444}html.hc[data-theme=dark]{--tx:#fff;--mu:#e6ecf8;--ln:#9fb0cf}@media(prefers-color-scheme:dark){html.hc:not([data-theme=light]){--tx:#fff;--mu:#e6ecf8;--ln:#9fb0cf}}
button,.b,.opt,.tabs button,#mnav button{touch-action:manipulation;-webkit-user-select:none;user-select:none}
.kr{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:12px 4px;border-bottom:1px solid var(--ln);min-height:52px;flex-wrap:wrap}.kr input[type=checkbox]{width:26px;height:26px;accent-color:var(--ac);flex:none}
#kst,#ked{position:fixed;inset:0;background:#06101dcc;z-index:210;display:none;justify-content:center}#kst{align-items:flex-end}#ked{align-items:center;z-index:220;padding:12px}#kst.open,#ked.open{display:flex}
#kst>div,#ked>div{width:min(520px,100%);max-height:88dvh;overflow:auto;background:var(--pn);color:var(--tx);border:1px solid var(--ln);border-radius:18px 18px 0 0;padding:16px 16px calc(16px + env(safe-area-inset-bottom,0px))}
#ked>div{border-radius:14px;display:flex;flex-direction:column;gap:10px;width:min(560px,100%)}#ked textarea{min-height:40dvh;font:14px "JetBrains Mono",ui-monospace,monospace}.kh{display:flex;justify-content:space-between;align-items:center}
@media(min-width:861px){#kst{align-items:center}#kst>div{border-radius:18px}}@media(max-width:860px){.hm{display:none!important}}@media(max-height:480px){#rb{width:52px!important}}</style>`);
const FS=[15,17,19],ui=()=>{document.body.style.fontSize=FS[S.ui.fs||0]+"px";document.documentElement.classList.toggle("hc",!!S.ui.hc)};ui();
const th=$("#th"),rbs=[...document.querySelectorAll(".hd button")].find(b=>b.textContent.startsWith("Robot ⚙"));
[th,$("#rbt"),rbs].forEach(b=>b&&b.classList.add("hm"));
const kst=document.createElement("div");kst.id="kst";document.body.appendChild(kst);
const row=(id,t,s,on)=>`<label class="kr"><span><b>${t}</b><br><small class="mu">${s}</small></span><input type="checkbox" id="${id}" ${on?"checked":""}></label>`;
let sOpen=false;
function renderS(){kst.innerHTML=`<div role="dialog" aria-label="Sozlamalar"><div class="kh"><h2>⚙ Sozlamalar</h2><button class="b" id="ks-x">✕ Yopish</button></div>`
+row("ks-snd","Ovoz effektlari","Robotning to'g'ri/xato signallari",!S.mute)
+row("ks-sp","Robot ovozli o'qishi","Robot gaplarini ovoz chiqarib o'qiydi",!!S.ui.sp)
+row("ks-vb","Vibratsiya","Javob, mashq va xatolarda tebranish",S.ui.vb!==false)
+row("ks-hc","Yuqori kontrast","Matn aniqroq ko'rinadi",!!S.ui.hc)
+`<label class="kr"><b>Shrift o'lchami</b><select id="ks-fs" class="in" style="width:auto">${["Kichik","O'rta","Katta"].map((t,i)=>`<option value="${i}" ${(S.ui.fs||0)==i?"selected":""}>${t}</option>`).join("")}</select></label><div class="kr" style="border:0"><button class="b" id="ks-th">Mavzu: och/qorong'i</button><button class="b" id="ks-rb">Robotni yashirish/ko'rsatish</button><button class="b" id="ks-rs">Robot sozlamalari</button><button class="b" id="ks-vt">Vibratsiyani sinash</button></div>`+extra()+`</div>`}
function openS(){renderS();kst.classList.add("open");if(!sOpen){history.pushState({s:1},"");sOpen=true}}
function closeS(pop){kst.classList.remove("open");if(sOpen){sOpen=false;if(!pop)history.back()}}
kst.addEventListener("change",e=>{const i=e.target.id,c=e.target.checked;if(i=="ks-snd"){S.mute=!c;if(S.mute&&window.speechSynthesis)speechSynthesis.cancel()}else if(i=="ks-sp"){S.ui.sp=c;if(!c&&window.speechSynthesis)speechSynthesis.cancel()}else if(i=="ks-vb"){S.ui.vb=c;if(c)vib(30)}else if(i=="ks-hc")S.ui.hc=c;else if(i=="ks-fs")S.ui.fs=+e.target.value;save();ui()});
kst.addEventListener("click",e=>{const i=e.target.id;if(e.target===kst||i=="ks-x")closeS();else if(i=="ks-th")th.click();else if(i=="ks-rb")$("#rbt").click();else if(i=="ks-rs"&&rbs)rbs.click();else if(i=="ks-vt"){if(!navigator.vibrate)toast("Bu qurilmada vibratsiya yo'q");else if(S.ui.vb===false)toast("Vibratsiya o'chirilgan");else vib([60,40,60])}});
/* ilova nomi, ikonka va saqlangan matnlar */
const IK="kms_icon",NP=15,NI=()=>S.ui.nm||"Kali Terminal Maktabi";let CI=null;S.notes=S.notes||[];
document.head.insertAdjacentHTML("beforeend",`<style>.kd{border:1px solid var(--ln);border-radius:10px;padding:6px 12px;margin:10px 0}.kd summary{cursor:pointer;font-weight:600;min-height:44px;display:flex;align-items:center}.kig{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-bottom:8px}.kib{padding:0;border:2px solid var(--ln);border-radius:12px;background:var(--cd);overflow:hidden;aspect-ratio:1;cursor:pointer}.kib.on{border-color:var(--ac)}.kib img{width:100%;height:100%;object-fit:cover;display:block}</style>`);
const nt=v=>v.trim().split("\n")[0].slice(0,28)||"Eslatma";
function extra(){const n=S.notes;return `<details id="d-app" class="kd"><summary>📱 Ilova nomi va ikonkasi</summary><label class="mu">Ilova nomi<input id="ks-nm" class="in" maxlength="24" value="${esc(S.ui.nm||"")}" placeholder="Kali Terminal Maktabi"></label><div class="mu" style="margin:8px 0">Ikonka tanlang:</div><div class="kig">${Array.from({length:NP},(_,i)=>`<button class="kib${CI==="p"+i?" on":""}" data-pi="${i}" aria-label="Ikonka ${i+1}"><img src="icons/p${i}.jpg" alt="" loading="lazy"></button>`).join("")}</div><div class="kr" style="border:0"><button class="b" id="ks-ig">🖼 Galereyadan</button><button class="b" id="ks-ir">↺ Asl ikonka</button></div><input type="file" id="ks-if" accept="image/*" hidden>${nativeBox()}</details><details id="d-notes" class="kd"><summary>📝 Saqlangan matnlar (${n.length})</summary><div class="kr" style="border:0"><button class="b" id="kn-new">＋ Yangi matn</button><button class="b" id="kn-term">Terminal chiqishini saqlash</button></div>`+(n.length?n.map((x,i)=>`<div class="cm"><b>${esc(x.t)}</b><p class="mu" style="white-space:pre-wrap;max-height:5em;overflow:hidden">${esc(x.v.slice(0,200))}</p><div class="ex"><button class="b" data-nc="${i}">Nusxa</button><button class="b" data-ne="${i}">Tahrir</button><button class="b" data-nr="${i}">▶ Terminalda</button><button class="b" data-nd="${i}">O'chirish</button></div></div>`).join(""):'<p class="mu">Hozircha bo\'sh. Buyruq, eslatma yoki terminal natijasini saqlang.</p>')+"</details>"}
function renderKeep(){if(!kst.classList.contains("open"))return;const sc=kst.firstChild.scrollTop,op=[...kst.querySelectorAll("details[open]")].map(x=>x.id);renderS();op.forEach(i=>{const d=document.getElementById(i);if(d)d.open=true});kst.firstChild.scrollTop=sc}
const loadImg=s=>new Promise((r,j)=>{const i=new Image();i.onload=()=>r(i);i.onerror=j;i.src=s});
const sq=(im,z)=>{const c=document.createElement("canvas");c.width=c.height=z;const w=im.naturalWidth,h=im.naturalHeight,m=Math.min(w,h);c.getContext("2d").drawImage(im,(w-m)/2,(h-m)/2,m,m,0,0,z,z);return c.toDataURL("image/png")};
async function setIcon(src,id){try{const im=await loadImg(src);localStorage.setItem(IK,JSON.stringify({a:sq(im,192),b:sq(im,512),id}));applyIcon();toast("Ikonka almashtirildi");renderKeep()}catch(e){toast("Rasm ochilmadi")}}
function applyManifest(o){const l=document.querySelector("link[rel=manifest]");if(!l)return;if(!o&&!S.ui.nm){l.href="manifest.webmanifest";return}const b=new URL("./",location.href).href,n=NI(),ic=o?[{src:o.a,sizes:"192x192",type:"image/png",purpose:"any"},{src:o.b,sizes:"512x512",type:"image/png",purpose:"any"}]:[{src:b+"icon-192.png",sizes:"192x192",type:"image/png"},{src:b+"icon-512.png",sizes:"512x512",type:"image/png"}];l.href=URL.createObjectURL(new Blob([JSON.stringify({id:b+"index.html",name:n,short_name:n.slice(0,12),lang:"uz",start_url:b+"index.html",scope:b,display:"standalone",orientation:"any",background_color:"#0d1320",theme_color:"#141c2d",icons:ic})],{type:"application/manifest+json"}))}
function applyIcon(){let o=null;try{o=JSON.parse(localStorage.getItem(IK))}catch(e){}const a=o?o.a:"icon-192.png";document.querySelectorAll("link[rel=icon],link[rel=apple-touch-icon]").forEach(l=>l.href=a);let im=document.getElementById("hdic");if(!im){im=document.createElement("img");im.id="hdic";im.alt="";im.style.cssText="width:28px;height:28px;border-radius:8px;flex:none;object-fit:cover";document.querySelector(".hd").prepend(im)}im.src=a;CI=o?o.id:null;applyManifest(o)}
/* APK (Capacitor) ichida: bosh ekran ikonkasi va nomini native plugin orqali almashtirish */
const NAT=()=>!!(window.Capacitor&&Capacitor.isNativePlatform&&Capacitor.isNativePlatform()&&Capacitor.nativePromise);
const LA=(m,o)=>Capacitor.nativePromise("Launcher",m,o||{});
const er=e=>(e&&(e.message||e.errorMessage))||String(e);
function nativeBox(){return NAT()?`<div class="kr" style="border:0"><button class="b" id="ks-main">🏠 Asosiy ikonkani almashtirish</button><button class="b" id="ks-pin">📌 Bosh ekranga yorliq</button></div><p class="mu"><small>«Asosiy ikonka» ilovaning o'zini almashtiradi: yuqorida tanlagan tayyor ikonka va unga biriktirilgan nom qo'llanadi. «Yorliq» siz yozgan nom va tanlagan rasm (galereya ham bo'ladi) bilan bosh ekranga qo'shimcha ikonka qo'yadi.</small></p>`:`<p class="mu"><small>Ilova ichida ikonka va nom darhol almashadi. Bosh ekranga qo'llash tugmalari faqat o'rnatilgan APK ilovada chiqadi.</small></p>`}
async function mainIcon(){const id=CI===null?"default":(/^p\d+$/.test(CI)?CI:null);if(!id){toast("Galereya rasmi asosiy ikonka bo'la olmaydi. «Bosh ekranga yorliq» dan foydalaning");return}try{const r=await LA("setPreset",{id});toast("Asosiy ikonka: "+(r.label||id)+". Bosh ekranda bir necha soniyada yangilanadi")}catch(e){toast("Almashmadi: "+er(e))}}
async function pinIcon(){try{let o=null;try{o=JSON.parse(localStorage.getItem(IK))}catch(e){}const a=o?o.a:sq(await loadImg("icon-192.png"),192);const r=await LA("pinShortcut",{name:NI(),icon:a.split(",")[1]});toast(r.supported===false?"Bu launcher yorliq qo'shishni qo'llamaydi":"Bosh ekran so'rovini tasdiqlang")}catch(e){toast("Yorliq qo'shilmadi: "+er(e))}}
function applyName(){document.title=NI();const h=document.querySelector(".hd h1");if(h)h.textContent=NI();applyIcon()}
const addNote=(v,t)=>{S.notes.unshift({t:t||nt(v),v,d:Date.now()});save();renderKeep()};
kst.addEventListener("change",e=>{const t=e.target;if(t.id=="ks-nm"){S.ui.nm=t.value.trim().slice(0,24);save();applyName();toast("Nom saqlandi")}else if(t.id=="ks-if"&&t.files[0]){setIcon(URL.createObjectURL(t.files[0]),"u");t.value=""}});
kst.addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;const d=b.dataset,id=b.id,N=S.notes[+(d.nc??d.ne??d.nr??d.nd)];
if(d.pi!==undefined)setIcon("icons/p"+d.pi+".jpg","p"+d.pi);else if(id=="ks-ig")document.getElementById("ks-if").click();else if(id=="ks-ir"){localStorage.removeItem(IK);applyIcon();toast("Asl ikonka qaytdi");renderKeep()}else if(id=="ks-main")mainIcon();else if(id=="ks-pin")pinIcon();
else if(id=="kn-new")edit("Yangi matn","",v=>{if(v.trim())addNote(v)});else if(id=="kn-term")addNote(out.innerText.trim()||"(bo'sh)","Terminal "+new Date().toLocaleTimeString().slice(0,5));
else if(N&&d.nc!==undefined)copy(N.v);else if(N&&d.ne!==undefined)edit("Matnni tahrirlash",N.v,v=>{if(v.trim()){N.v=v;N.t=nt(v);save();renderKeep()}});
else if(N&&d.nd!==undefined){S.notes.splice(+d.nd,1);save();renderKeep()}
else if(N&&d.nr!==undefined){closeS();setTimeout(()=>{bd.dataset.v="t";N.v.split("\n").forEach(l=>l.trim()&&sub(l.trim()))},300)}});
applyName();
const sb=document.createElement("button");sb.className="b";sb.textContent="⚙ Sozlamalar";sb.onclick=openS;th.before(sb);
addEventListener("keydown",e=>{if(e.key=="Escape"&&sOpen)closeS()});
/* ovozli o'qish (Ovoz o'chiq bo'lsa gapirmaydi) */
const bb=$("#rbb");let ls="";new MutationObserver(()=>{if(!S.ui.sp||S.mute||!window.speechSynthesis||!bb.classList.contains("s")||bb.textContent==ls)return;ls=bb.textContent;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(ls);u.lang="uz-UZ";speechSynthesis.speak(u)}).observe(bb,{attributes:true,childList:true,characterData:true,subtree:true});
/* vibratsiya hodisalari */
const T0=toast;toast=function(m){if(/Mashq bajarildi/.test(m))vib([30,40,60]);else if(/Nusxalandi/.test(m))vib(10);return T0(m)};
const U0=sub;sub=function(l){const n=out.childElementCount;U0(l);if([...out.children].slice(n).some(e=>e.classList.contains("er")))vib(40)};
document.addEventListener("click",e=>{if(e.target.closest("#mnav button,#qk button,.tabs button"))vib(8)});
/* Android orqaga tugmasi: terminal/sozlamadan oldingi ekranga qaytadi */
const bd=document.body;let pushed=false;
new MutationObserver(()=>{const t=bd.dataset.v=="t"&&innerWidth<=860;if(t&&!pushed){history.pushState({t:1},"");pushed=true}else if(!t&&pushed){pushed=false;history.back()}}).observe(bd,{attributes:true,attributeFilter:["data-v"]});
addEventListener("popstate",()=>{if(sOpen){closeS(true);return}if(pushed){pushed=false;bd.dataset.v="l"}});
/* nano va progress kodi uchun sahifa ichidagi oyna (WebView'da prompt() ishlamaydi) */
const ked=document.createElement("div");ked.id="ked";document.body.appendChild(ked);let kcb=null;
function edit(t,v,cb){kcb=cb;ked.innerHTML=`<div><b>${esc(t)}</b><textarea class="in" id="ked-t" spellcheck="false" autocapitalize="off"></textarea><div class="kr" style="border:0"><button class="b" id="ked-c">Bekor</button><button class="b big" id="ked-s">Saqlash</button></div></div>`;ked.classList.add("open");$("#ked-t").value=v}
ked.addEventListener("click",e=>{const i=e.target.id;if(i=="ked-c"||i=="ked-s"||e.target===ked){const v=$("#ked-t").value,cb=kcb;kcb=null;ked.classList.remove("open");if(i=="ked-s"&&cb)cb(v)}});
$("#im").onclick=()=>edit("Progress kodini kiriting","",v=>{v=v.trim();if(!v)return;try{S=Object.assign(S,JSON.parse(decodeURIComponent(escape(atob(v)))));save();show()}catch(e){toast("Kod noto'g'ri")}});
/* mobil: Ctrl+C, Esc */
const qk=$("#qk");if(qk)[["Ctrl+C","c"],["Esc","e"]].forEach(([l,k])=>{const b=document.createElement("button");b.type="button";b.textContent=l;b.onclick=()=>{ti.focus();if(k=="c")pr("^C");ti.value=""};qk.appendChild(b)});
/* yangi versiya xabari */
if("serviceWorker" in navigator){const had=!!navigator.serviceWorker.controller;navigator.serviceWorker.addEventListener("controllerchange",()=>{if(had)toast("Yangi versiya o'rnatildi — sahifani yangilang")})}
prog();
})();
