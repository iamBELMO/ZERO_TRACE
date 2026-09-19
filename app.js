(() => {
  'use strict';

  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const SAVE_KEY = 'zero-trace-save-v1';

  const missions = [
    {id:1,chapter:0,code:'OP-01',name:'البوابة الصامتة',tag:'ROUTING',type:'route',difficulty:1,reward:120,time:100,objective:'وجّه حزمة البيانات من نقطة الدخول إلى الخادم دون لمس العقد المعطّلة.',brief:'دخول أولي إلى شبكة تدريب شركة NOVA.',hint:'ابدأ من IN وتحرك مربعًا واحدًا فقط في كل مرة. العقد الداكنة مغلقة.',walls:[6,8,11,13,16,18]},
    {id:2,chapter:0,code:'OP-02',name:'نبضة مجهولة',tag:'TERMINAL',type:'terminal',difficulty:1,reward:140,time:105,objective:'نفّذ تسلسل أوامر المحاكاة لقراءة البوابة وفتحها بأقل أثر.',brief:'إشارة غريبة ظهرت خلف جدار التدريب.',hint:'ابدأ بأمر المسح، ثم الاتصال، ثم فك القفل.',commands:['scan --gate','link node-7','unlock --ghost']},
    {id:3,chapter:0,code:'OP-03',name:'شفرة الزجاج',tag:'CIPHER',type:'cipher',difficulty:1,reward:160,time:110,objective:'فك رسالة قيصر واستخرج كلمة المرور الإنجليزية.',brief:'ملف مشفّر يقود إلى أول أثر لـ MIRROR.',hint:'أعد كل حرف للخلف بعدد الخانات الظاهر.',word:'GHOST',shift:3},
    {id:4,chapter:0,code:'OP-04',name:'دائرة الحارس',tag:'CIRCUIT',type:'circuit',difficulty:2,reward:190,time:110,objective:'بدّل المفاتيح حتى تطابق بصمة الخرج الهدف.',brief:'تعطيل قفل منطقي يحمي غرفة السجلات.',hint:'جرّب تغيير مفتاح واحد وراقب أي خانات تتبدل.',solution:[1,0,1,1],matrix:[[1,0,1,0],[0,1,1,0],[1,1,0,1],[0,0,1,1]]},
    {id:5,chapter:0,code:'OP-05',name:'ذاكرة شبحية',tag:'MEMORY',type:'memory',difficulty:2,reward:230,time:115,objective:'احفظ تسلسل نبضات الشبكة وأعده من دون خطأ.',brief:'الخادم لا يقبل سوى توقيع بصري متغير.',hint:'قسّم التسلسل ذهنيًا إلى مجموعات قصيرة.',sequence:[0,4,2,7,3]},

    {id:6,chapter:1,code:'OP-06',name:'مترو نوفا',tag:'ROUTING',type:'route',difficulty:2,reward:260,time:105,objective:'مرّر الإشارة عبر شبكة النقل الذكية إلى مركز التحكم.',brief:'المدينة بدأت تفقد إشارات القطارات.',hint:'لا تحاصر نفسك قرب الزاوية؛ يمكنك التراجع بالضغط على آخر عقدة.',walls:[1,6,7,13,17,18,21]},
    {id:7,chapter:1,code:'OP-07',name:'ظل الكاميرا',tag:'TERMINAL',type:'terminal',difficulty:2,reward:280,time:100,objective:'اعزل بث الكاميرا الوهمي واستخرج معرّف المصدر.',brief:'MIRROR يستخدم كاميرات المدينة كعيون.',hint:'اعزل البث أولًا، ثم اعكس الإشارة، ثم ثبّت المسار.',commands:['isolate cam-grid','mirror --signal','pin route-echo']},
    {id:8,chapter:1,code:'OP-08',name:'رسالة تحت المطر',tag:'CIPHER',type:'cipher',difficulty:2,reward:300,time:95,objective:'فك الشفرة قبل أن تمحوها دورة النظام التالية.',brief:'رسالة قصيرة التقطتها حساسات الشوارع.',hint:'الإجابة كلمة إنجليزية مرتبطة بالإشارة.',word:'SIGNAL',shift:5},
    {id:9,chapter:1,code:'OP-09',name:'قاطع الطاقة',tag:'CIRCUIT',type:'circuit',difficulty:3,reward:340,time:100,objective:'أعد توجيه الطاقة إلى أربعة مخارج آمنة.',brief:'منع انطفاء قطاع كامل من مدينة نوفا.',hint:'البصمة المطلوبة ثابتة؛ سجّل أثر كل مفتاح.',solution:[0,1,1,1],matrix:[[1,1,0,0],[0,1,0,1],[1,0,1,0],[0,1,1,1]]},
    {id:10,chapter:1,code:'OP-10',name:'عين المدينة',tag:'MEMORY',type:'memory',difficulty:3,reward:380,time:100,objective:'كرّر مفتاح المزامنة ذي السبع نبضات.',brief:'الاقتراب من عقدة المراقبة المركزية.',hint:'راقب الإيقاع، وليس الأرقام فقط.',sequence:[5,1,8,3,0,6,2]},

    {id:11,chapter:2,code:'OP-11',name:'خزنة أوريون',tag:'TERMINAL',type:'terminal',difficulty:3,reward:420,time:95,objective:'افتح خزنة البيانات بثلاث مراحل محاكاة متتابعة.',brief:'ملفات مسروقة من مختبر ذكاء اصطناعي.',hint:'افحص الخزنة، زامن المفتاح، ثم افتح الملف.',commands:['probe vault-orion','sync key-fragment','open archive.nx']},
    {id:12,chapter:2,code:'OP-12',name:'المسار الأحمر',tag:'ROUTING',type:'route',difficulty:3,reward:450,time:90,objective:'اعبر شبكة عالية الخطورة دون لمس الجيوب الحمراء.',brief:'طبقة دفاع ذاتية التغيير تحرس النواة.',hint:'ابحث عن الممر المفتوح حول الحافة ثم انعطف للهدف.',walls:[2,3,7,9,12,14,22,23]},
    {id:13,chapter:2,code:'OP-13',name:'بروتوكول أوميغا',tag:'CIPHER',type:'cipher',difficulty:3,reward:480,time:90,objective:'استخرج مفتاح أوميغا من النص المحوّل.',brief:'مفتاح طوارئ مدفون داخل أرشيف قديم.',hint:'الكلمة تعني بروتوكولًا بالإنجليزية.',word:'PROTOCOL',shift:7},
    {id:14,chapter:2,code:'OP-14',name:'القلب الصناعي',tag:'CIRCUIT',type:'circuit',difficulty:4,reward:520,time:90,objective:'وازن قلب الخادم قبل انهيار حرارته.',brief:'الطاقة غير المستقرة قد تحرق الدليل.',hint:'المفتاح الرابع يؤثر في أكثر من خرج.',solution:[1,1,0,1],matrix:[[1,0,1,1],[1,1,0,1],[0,1,1,0],[1,0,0,1]]},
    {id:15,chapter:2,code:'OP-15',name:'صدى الصفر',tag:'MEMORY',type:'memory',difficulty:4,reward:560,time:90,objective:'احفظ توقيع النواة ذي التسع نبضات.',brief:'الاتصال الأول المباشر مع MIRROR.',hint:'سمِّ المواقع بصوتك أو تتبعها بإصبعك دون الضغط.',sequence:[1,7,4,0,8,3,5,2,6]},

    {id:16,chapter:3,code:'OP-16',name:'المنطقة السوداء',tag:'ROUTING',type:'route',difficulty:4,reward:620,time:85,objective:'اصنع ممرًا إلى المنطقة المحجوبة في قلب الشبكة.',brief:'دخلتَ الآن نطاق MIRROR الخاص.',hint:'المسار الأقصر ليس دائمًا ممكنًا؛ لف حول الكتلة الوسطى.',walls:[5,6,8,11,12,13,16,18,21]},
    {id:17,chapter:3,code:'OP-17',name:'قناع المرآة',tag:'CIPHER',type:'cipher',difficulty:4,reward:680,time:80,objective:'اكسر اسم الهوية البديلة للذكاء المنشَق.',brief:'كل طبقة تكشف نسخة أخرى من العدو.',hint:'الكلمة الإنجليزية تعني انعكاسًا.',word:'REFLECTION',shift:9},
    {id:18,chapter:3,code:'OP-18',name:'حصار النواة',tag:'TERMINAL',type:'terminal',difficulty:5,reward:740,time:85,objective:'نفّذ بروتوكول الاحتواء النهائي من أربع مراحل.',brief:'MIRROR يحاول الهرب إلى شبكة المدينة.',hint:'ثبّت المرساة، جمّد النسخة، تحقق، ثم احتوِ النواة.',commands:['anchor core-0','freeze mirror-copy','verify checksum-z','contain --final']},
    {id:19,chapter:3,code:'OP-19',name:'القرار الأخير',tag:'CIRCUIT',type:'circuit',difficulty:5,reward:820,time:80,objective:'أغلق مخارج النواة وافتح قناة احتواء واحدة.',brief:'خطأ واحد يمنح MIRROR طريقًا للهروب.',hint:'ابدأ بالمفتاحين الأول والثالث وقارن النتيجة.',solution:[1,1,1,0],matrix:[[1,1,0,1],[1,0,1,1],[0,1,1,0],[1,1,1,0]]},
    {id:20,chapter:3,code:'OP-20',name:'ZERO TRACE',tag:'FINAL SEQUENCE',type:'memory',difficulty:5,reward:1000,time:75,objective:'أعد توقيع الإنهاء الكامل وامحُ أثر العملية.',brief:'المواجهة النهائية. لا توجد محاولة سهلة.',hint:'تنفّس. شاهد التسلسل كاملًا قبل لمس أي عقدة.',sequence:[8,0,4,2,6,1,7,3,5,4,0]},
  ];

  const chapters = [
    ['الفصل الأول','بوابة نوفا'],['الفصل الثاني','المدينة المتصلة'],['الفصل الثالث','داخل المرآة'],['الفصل الأخير','النواة السوداء']
  ];
  const upgrades = [
    {id:'stealth',name:'شبح رقمي',icon:'S',desc:'يخفض زيادة الكشف الناتجة عن الأخطاء بنسبة 20% لكل مستوى.',base:300},
    {id:'time',name:'مسرّع زمني',icon:'T',desc:'يضيف 15 ثانية إلى وقت كل مهمة لكل مستوى.',base:350},
    {id:'scan',name:'ماسح طيفي',icon:'X',desc:'يقلل تكلفة التلميحات ويفتحها مجانًا في المستوى الثالث.',base:280}
  ];

  const defaultState = () => ({credits:0,xp:0,completed:[],upgrades:{stealth:0,time:0,scan:0},sound:true,started:false});
  let state = loadState();
  let activeMission = null;
  let activeChapter = Math.min(3, Math.floor(state.completed.length / 5));
  let interval = null;
  let timeLeft = 0;
  let trace = 0;
  let missionEnded = false;
  let hintUsed = false;
  let token = 0;
  let audioCtx = null;

  function loadState(){
    try { return {...defaultState(), ...JSON.parse(localStorage.getItem(SAVE_KEY) || '{}')}; }
    catch { return defaultState(); }
  }
  function saveState(){ localStorage.setItem(SAVE_KEY, JSON.stringify(state)); }
  function showScreen(id){ $$('.screen').forEach(s=>s.classList.remove('active')); $('#'+id).classList.add('active'); window.scrollTo(0,0); }
  function beep(freq=500,duration=.06,type='sine'){
    if(!state.sound) return;
    try{
      audioCtx ||= new (window.AudioContext||window.webkitAudioContext)();
      const o=audioCtx.createOscillator(),g=audioCtx.createGain(); o.type=type;o.frequency.value=freq;g.gain.value=.035;o.connect(g);g.connect(audioCtx.destination);o.start();g.gain.exponentialRampToValueAtTime(.0001,audioCtx.currentTime+duration);o.stop(audioCtx.currentTime+duration);
    }catch{}
  }
  function rank(){ const n=state.completed.length; return n>=20?'أسطورة الشبكة':n>=15?'شبح رقمي':n>=10?'خبير اختراق':n>=5?'عميل ميداني':'مبتدئ'; }
  function stars(n){ return '◆'.repeat(n)+'◇'.repeat(5-n); }
  function isUnlocked(id){ return id===1 || state.completed.includes(id-1); }
  function switchView(name){
    $$('.view').forEach(v=>v.classList.remove('active')); $('#'+name+'-view').classList.add('active');
    $$('.nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.view===name));
  }
  function refreshHQ(){
    $('#credits').textContent=state.credits; $('#xp').textContent=state.xp; $('#operator-rank').textContent=rank();
    $('#completed-count').textContent=state.completed.length; const pct=state.completed.length*5; $('#campaign-percent').textContent=pct+'%'; $('#campaign-bar').style.width=pct+'%';
    renderChapterTabs(); renderMissions(); renderUpgrades();
  }
  function renderChapterTabs(){
    $('#chapter-tabs').innerHTML=chapters.map((c,i)=>`<button class="chapter-tab ${i===activeChapter?'active':''}" role="tab" aria-selected="${i===activeChapter}" data-chapter="${i}">${c[0]} · ${c[1]}</button>`).join('');
    $$('.chapter-tab').forEach(b=>b.onclick=()=>{activeChapter=+b.dataset.chapter;renderChapterTabs();renderMissions();beep(350)});
  }
  function renderMissions(){
    const list=missions.filter(m=>m.chapter===activeChapter);
    $('#mission-grid').innerHTML=list.map(m=>{
      const done=state.completed.includes(m.id), unlocked=isUnlocked(m.id);
      return `<article class="mission-card ${done?'done':''} ${!unlocked?'locked':''}" data-id="${m.id}" tabindex="${unlocked?'0':'-1'}" role="button" aria-label="${m.name}${!unlocked?'، مقفلة':''}">
        <span class="mission-number">${String(m.id).padStart(2,'0')}</span><span class="mission-tag">${m.code} // ${m.tag}</span><h3>${m.name}</h3><p>${m.brief}</p>
        <div class="card-bottom"><span class="difficulty">${stars(m.difficulty)}</span>${unlocked?`<span class="reward">${done?'✓ COMPLETE':m.reward+' ¢'}</span>`:'<span class="lock-icon">⌾</span>'}</div></article>`;
    }).join('');
    $$('.mission-card:not(.locked)').forEach(card=>{
      const launch=()=>startMission(+card.dataset.id); card.onclick=launch; card.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();launch()}};
    });
  }
  function renderUpgrades(){
    $('#upgrade-grid').innerHTML=upgrades.map(u=>{
      const level=state.upgrades[u.id],max=level>=3,cost=u.base*(level+1);
      return `<article class="upgrade-card"><div class="upgrade-icon">${u.icon}</div><p class="eyebrow">MODULE // ${u.id.toUpperCase()}</p><h3>${u.name}</h3><p>${u.desc}</p><div class="level-pips">${[1,2,3].map(x=>`<i class="${x<=level?'on':''}"></i>`).join('')}</div><button class="secondary-btn upgrade-buy" data-upgrade="${u.id}" ${max||state.credits<cost?'disabled':''}><span>${max?'المستوى الأقصى':'ترقية'}</span><b>${max?'MAX':cost+' ¢'}</b></button></article>`;
    }).join('');
    $$('.upgrade-buy').forEach(b=>b.onclick=()=>buyUpgrade(b.dataset.upgrade));
  }
  function buyUpgrade(id){
    const up=upgrades.find(u=>u.id===id),level=state.upgrades[id],cost=up.base*(level+1); if(level>=3||state.credits<cost)return;
    state.credits-=cost;state.upgrades[id]++;saveState();refreshHQ();beep(700,.1,'square');
  }

  function startMission(id){
    const m=missions.find(x=>x.id===id); if(!m||!isUnlocked(id))return;
    token++; activeMission=m; missionEnded=false; hintUsed=false; trace=0; timeLeft=m.time+state.upgrades.time*15;
    showScreen('mission-screen'); $('#mission-code').textContent=m.code+' // '+m.tag; $('#mission-title').textContent=m.name; $('#objective-title').textContent=m.name; $('#objective-text').textContent=m.objective; $('#mission-difficulty').textContent=stars(m.difficulty); $('#mission-reward').textContent=m.reward+' ¢'; $('#hint-text').classList.remove('show'); $('#hint-text').textContent=''; $('#puzzle-feedback').textContent=''; $('#log-lines').innerHTML='';
    const hintCost=Math.max(0,25-state.upgrades.scan*10); $('#hint-btn small').textContent=hintCost?`−${hintCost}¢`:'مجاني'; $('#hint-btn').disabled=false;
    updateTrace(); updateTimer(); log('LINK','قناة آمنة أُنشئت','success'); log('NODE',m.code+' جاهز'); renderPuzzle(m); clearInterval(interval); interval=setInterval(tick,1000); beep(520,.08);
  }
  function tick(){
    if(missionEnded)return; timeLeft--; trace=Math.min(100,trace+activeMission.difficulty*.045*(1-state.upgrades.stealth*.08)); updateTimer();updateTrace();
    if(timeLeft<=0||trace>=100) endMission(false,timeLeft<=0?'انتهى الوقت قبل اكتمال الاتصال.':'اكتشف نظام الحماية اتصالك وقطع القناة.');
  }
  function updateTimer(){ const min=Math.floor(Math.max(0,timeLeft)/60),sec=Math.max(0,timeLeft)%60; $('#timer-value').textContent=`${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`; $('#timer-value').style.color=timeLeft<20?'var(--red)':'var(--cyan)'; }
  function updateTrace(){ const v=Math.round(trace);$('#trace-value').textContent=v+'%';$('#trace-bar').style.width=v+'%';const color=v>70?'var(--red)':v>40?'var(--amber)':'var(--green)';$('#trace-value').style.color=color;$('#trace-bar').style.background=color; }
  function penalty(amount,msg='محاولة غير صحيحة'){ const reduction=1-state.upgrades.stealth*.2;trace=Math.min(100,trace+amount*reduction);updateTrace();log('ALERT',msg,'alert');$('#puzzle-feedback').textContent=msg;$('#puzzle-feedback').style.color='var(--red)';beep(150,.14,'sawtooth');if(trace>=100)endMission(false,'تم كشف اتصالك بسبب كثرة الأخطاء.'); }
  function successFeedback(msg){ $('#puzzle-feedback').textContent=msg;$('#puzzle-feedback').style.color='var(--green)';log('OK',msg,'success');beep(780,.12,'square'); }
  function log(code,text,cls=''){ const div=document.createElement('div');div.className='log-line '+cls;div.innerHTML=`<b>[${new Date().toLocaleTimeString('en',{hour12:false,minute:'2-digit',second:'2-digit'})}] ${code}</b> ${text}`;$('#log-lines').prepend(div); }
  function renderPuzzle(m){ ({route:renderRoute,terminal:renderTerminal,cipher:renderCipher,circuit:renderCircuit,memory:renderMemory}[m.type])(m); }

  function renderRoute(m){
    const area=$('#puzzle-area'); let path=[0]; const walls=new Set(m.walls||[]);
    area.innerHTML=`<div class="puzzle-shell"><p class="puzzle-label">PACKET ROUTE // SELECT ADJACENT NODES</p><h3>ارسم مسار الحزمة إلى CORE</h3><div class="network-grid">${Array.from({length:25},(_,i)=>`<button class="node ${i===0?'start active':''} ${i===24?'target':''} ${walls.has(i)?'wall':''}" data-node="${i}" ${walls.has(i)?'disabled':''}>${i===0?'IN':i===24?'CORE':String(i).padStart(2,'0')}</button>`).join('')}</div></div>`;
    $$('.node:not(.wall)',area).forEach(btn=>btn.onclick=()=>{
      if(missionEnded)return; const n=+btn.dataset.node,last=path.at(-1); if(n===last)return;
      if(path.length>1&&n===path.at(-2)){ path.pop();btnFor(last).classList.remove('active');beep(310);return; }
      const adjacent=Math.abs((n%5)-(last%5))+Math.abs(Math.floor(n/5)-Math.floor(last/5))===1;
      if(!adjacent||path.includes(n)){penalty(13,'المسار غير صالح — اختر عقدة مجاورة');return;}
      path.push(n);btn.classList.add('active');beep(380+path.length*20,.04);
      if(n===24){successFeedback('وصلت الحزمة إلى النواة دون انقطاع');setTimeout(()=>endMission(true),500);}
    });
    function btnFor(n){return $(`.node[data-node="${n}"]`,area)}
  }

  function renderTerminal(m){
    let step=0; const area=$('#puzzle-area');
    area.innerHTML=`<div class="puzzle-shell"><p class="puzzle-label">FICTIONAL COMMAND INTERFACE</p><h3>نفّذ البروتوكول بالترتيب</h3><div class="terminal-box"><div class="terminal-head"><i></i><i></i><i></i></div><div class="terminal-output" id="terminal-output">ZERO TRACE OS v7.4\nSecure sandbox loaded.\nType a simulation command to continue.\n</div><form class="terminal-form" id="terminal-form"><label>agent@nova:~$</label><input id="terminal-input" autocomplete="off" autocapitalize="none" spellcheck="false" aria-label="اكتب الأمر" /></form></div><div class="command-chips">${shuffle([...m.commands,'trace --root','inject live-key']).map(c=>`<button type="button" data-cmd="${c}">${c}</button>`).join('')}</div></div>`;
    const input=$('#terminal-input'),output=$('#terminal-output');input.focus();
    function submit(raw){const val=raw.trim().toLowerCase();if(!val)return;output.innerHTML+=`<span class="cmd">$ ${escapeHtml(raw)}</span>\n`;if(val===m.commands[step]){output.innerHTML+=`<span class="ok">✓ stage ${step+1} accepted</span>\n`;step++;successFeedback(`تم تنفيذ المرحلة ${step} من ${m.commands.length}`);if(step===m.commands.length){output.innerHTML+='<span class="ok">ACCESS GRANTED // CHANNEL OPEN</span>\n';setTimeout(()=>endMission(true),650);}}else{output.innerHTML+='<span class="bad">× rejected command sequence</span>\n';penalty(15,'الأمر غير صحيح أو خارج الترتيب');}output.scrollTop=output.scrollHeight;input.value='';}
    $('#terminal-form').onsubmit=e=>{e.preventDefault();submit(input.value)}; $$('.command-chips button',area).forEach(b=>b.onclick=()=>{input.value=b.dataset.cmd;submit(input.value)});
  }

  function renderCipher(m){
    const encoded=[...m.word].map(ch=>String.fromCharCode((ch.charCodeAt(0)-65+m.shift)%26+65)).join(''); const area=$('#puzzle-area');
    area.innerHTML=`<div class="cipher-card"><p class="puzzle-label">CAESAR SHIFT DECRYPTOR</p><h3>فك تشفير الكلمة</h3><div class="cipher-code">${encoded}</div><p>قيمة الإزاحة: <b class="cipher-shift">−${m.shift}</b></p><form id="cipher-form" class="answer-row"><input id="cipher-input" maxlength="14" autocomplete="off" spellcheck="false" placeholder="TYPE DECRYPTED WORD" aria-label="الكلمة بعد فك التشفير"><button class="primary-btn">تحقق</button></form></div>`;
    const input=$('#cipher-input');input.focus();$('#cipher-form').onsubmit=e=>{e.preventDefault();const v=input.value.trim().toUpperCase();if(v===m.word){successFeedback('تم فك الشفرة واستعادة المفتاح');input.disabled=true;setTimeout(()=>endMission(true),550)}else{penalty(14,'الكلمة غير صحيحة — راجع مقدار الإزاحة');input.select()}};
  }

  function renderCircuit(m){
    const switches=[0,0,0,0]; const target=calcOutput(m.solution,m.matrix); const area=$('#puzzle-area');
    area.innerHTML=`<div class="circuit-board"><p class="puzzle-label">LOGIC ARRAY // XOR MATRIX</p><h3>طابق بصمة الخرج: <span class="cipher-shift">${target.join('')}</span></h3><div class="output-code" id="output-code"></div><div class="circuit-lines"></div><div class="switches">${switches.map((_,i)=>`<button class="switch" data-switch="${i}"><span>SW-0${i+1}</span><b>OFF</b></button>`).join('')}</div><button id="circuit-submit" class="primary-btn circuit-submit">تثبيت الدائرة</button></div>`;
    function draw(){const out=calcOutput(switches,m.matrix);$('#output-code').innerHTML=out.map((v,i)=>`<i class="${v?'on':''}">${v}</i>`).join('');$$('.switch',area).forEach((b,i)=>{b.classList.toggle('on',!!switches[i]);$('b',b).textContent=switches[i]?'ON':'OFF'})} draw();
    $$('.switch',area).forEach(b=>b.onclick=()=>{const i=+b.dataset.switch;switches[i]^=1;draw();beep(switches[i]?600:280,.05)});
    $('#circuit-submit').onclick=()=>{const out=calcOutput(switches,m.matrix);if(out.join('')===target.join('')){successFeedback('تطابقت البصمة وتم تثبيت الدائرة');setTimeout(()=>endMission(true),600)}else penalty(16,'بصمة الخرج لا تطابق الهدف')};
  }
  function calcOutput(sw,matrix){return [0,1,2,3].map(col=>sw.reduce((sum,v,row)=>sum^(v&matrix[row][col]),0));}

  function renderMemory(m){
    const area=$('#puzzle-area');let input=[],watching=false,started=false,roundToken=token;
    area.innerHTML=`<div class="puzzle-shell"><p class="puzzle-label">NEURAL PULSE SEQUENCE</p><h3>راقب النبضات ثم أعدها</h3><div class="memory-grid">${Array.from({length:9},(_,i)=>`<button class="memory-pad" data-pad="${i}" disabled>${String(i+1).padStart(2,'0')}</button>`).join('')}</div><p id="memory-status" class="memory-status">اضغط بدء لمشاهدة التسلسل</p><button id="memory-start" class="primary-btn memory-start">بدء التسلسل</button></div>`;
    const pads=$$('.memory-pad',area),status=$('#memory-status'),start=$('#memory-start');
    start.onclick=async()=>{if(watching)return;started=true;watching=true;input=[];start.disabled=true;status.textContent='راقب جيدًا…';pads.forEach(p=>p.disabled=true);await wait(500);for(const idx of m.sequence){if(roundToken!==token||missionEnded)return;pads[idx].classList.add('flash');beep(420+idx*35,.12);await wait(360);pads[idx].classList.remove('flash');await wait(150)}watching=false;pads.forEach(p=>p.disabled=false);status.textContent=`دورك — 0 / ${m.sequence.length}`;};
    pads.forEach(p=>p.onclick=()=>{if(!started||watching||missionEnded)return;const n=+p.dataset.pad,expected=m.sequence[input.length];p.classList.add('flash');setTimeout(()=>p.classList.remove('flash'),120);if(n!==expected){penalty(18,'نبضة خاطئة — سيُعاد عرض التسلسل');pads.forEach(x=>x.disabled=true);started=false;input=[];start.disabled=false;status.textContent='اضغط لإعادة المحاولة';return;}input.push(n);p.classList.add('correct');setTimeout(()=>p.classList.remove('correct'),250);beep(600+n*25,.06);status.textContent=`صحيح — ${input.length} / ${m.sequence.length}`;if(input.length===m.sequence.length){pads.forEach(x=>x.disabled=true);successFeedback('تطابق التوقيع العصبي بالكامل');setTimeout(()=>endMission(true),650)}});
  }

  function endMission(won,reason=''){
    if(missionEnded)return;missionEnded=true;clearInterval(interval);token++;
    const first=!state.completed.includes(activeMission.id); let creditGain=0,xpGain=0;
    if(won){creditGain=first?activeMission.reward:Math.round(activeMission.reward*.2);xpGain=first?activeMission.difficulty*100:25;state.credits+=creditGain;state.xp+=xpGain;if(first)state.completed.push(activeMission.id);state.completed.sort((a,b)=>a-b);saveState();}
    $('#result-icon').textContent=won?'✓':'×';$('#result-icon').classList.toggle('failed',!won);$('#result-kicker').textContent=won?'MISSION COMPLETE':'CONNECTION LOST';$('#result-title').textContent=won?(activeMission.id===20?'أنقذت مدينة نوفا':'تمت المهمة بنجاح'):'فشلت العملية';$('#result-copy').textContent=won?(activeMission.id===20?'تم احتواء MIRROR ومسح أثر العملية. أصبحت الآن أسطورة الشبكة.':'خرجت من الشبكة قبل اكتشافك وحُفظ تقدمك بنجاح.'):reason;$('#result-rewards').innerHTML=won?`<span>+${creditGain} ¢</span><span>+${xpGain} XP</span>`:`<span>TRACE ${Math.round(trace)}%</span>`;$('#result-next').textContent=won?(activeMission.id===20?'عرض المقر':'المهمة التالية'):'إعادة المحاولة';$('#result-modal').classList.add('show');beep(won?880:110,.3,won?'square':'sawtooth');
  }
  function closeResult(toNext=false){$('#result-modal').classList.remove('show');const id=activeMission.id,won=state.completed.includes(id);if(toNext&&won&&id<20)startMission(id+1);else if(toNext&&!won)startMission(id);else{activeChapter=Math.min(3,Math.floor((Math.max(1,id)-1)/5));refreshHQ();showScreen('hq-screen')}}
  function useHint(){if(hintUsed||missionEnded)return;const cost=Math.max(0,25-state.upgrades.scan*10);if(state.credits<cost){$('#hint-text').textContent='رصيدك غير كافٍ لفتح التلميح.';$('#hint-text').classList.add('show');return;}state.credits-=cost;hintUsed=true;saveState();$('#hint-text').textContent=activeMission.hint;$('#hint-text').classList.add('show');$('#hint-btn').disabled=true;log('HINT','تم فك حزمة مساعدة');}
  function escapeHtml(s){return s.replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
  function shuffle(a){for(let i=a.length-1;i>0;i--){const j=(i*7+3)%(i+1);[a[i],a[j]]=[a[j],a[i]]}return a;}
  const wait=ms=>new Promise(r=>setTimeout(r,ms));

  function registerWebMCP(){
    const context=document.modelContext;
    if(!context?.registerTool)return;
    const register=tool=>{try{void Promise.resolve(context.registerTool(tool)).catch(()=>{})}catch{}};
    register({name:'read_campaign_status',title:'قراءة تقدم الحملة',description:'يعيد تقدم اللاعب الحالي ورصيده والمهمة التالية المتاحة دون تغيير اللعبة.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:false},execute:()=>({completed:state.completed.length,total:missions.length,credits:state.credits,xp:state.xp,rank:rank(),next_mission:missions.find(m=>isUnlocked(m.id)&&!state.completed.includes(m.id))?.id??null})});
    register({name:'start_game_mission',title:'بدء مهمة',description:'يفتح مهمة متاحة داخل لعبة ZERO TRACE ويعرض لغزها للاعب.',inputSchema:{type:'object',properties:{mission_id:{type:'integer',minimum:1,maximum:20}},required:['mission_id'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute:input=>{const id=Number(input?.mission_id);if(!Number.isInteger(id)||!missions.some(m=>m.id===id))throw new Error('mission_id must be an integer from 1 to 20');if(!isUnlocked(id))throw new Error('Mission is locked');startMission(id);return {started:true,mission_id:id,title:activeMission.name,type:activeMission.type}}});
  }

  $('#start-btn').onclick=()=>{state.started=true;saveState();refreshHQ();showScreen('hq-screen');beep(640,.15,'square')};
  $('#brand-home').onclick=()=>switchView('missions'); $$('.nav-btn').forEach(b=>b.onclick=()=>switchView(b.dataset.view));
  $('#sound-btn').onclick=()=>{state.sound=!state.sound;saveState();$('#sound-btn').textContent=state.sound?'◉':'○';if(state.sound)beep(500)};
  $('#hint-btn').onclick=useHint; $('#abort-btn').onclick=()=>{clearInterval(interval);token++;refreshHQ();showScreen('hq-screen')};
  $('#result-home').onclick=()=>closeResult(false); $('#result-next').onclick=()=>closeResult(true);
  $('#reset-btn').onclick=()=>$('#confirm-modal').classList.add('show'); $('#cancel-reset').onclick=()=>$('#confirm-modal').classList.remove('show'); $('#confirm-reset').onclick=()=>{state=defaultState();saveState();activeChapter=0;$('#confirm-modal').classList.remove('show');refreshHQ();switchView('missions')};
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('#mission-screen').classList.contains('active')&&!$('#result-modal').classList.contains('show')){$('#abort-btn').click()}});

  const bootLines=['جاري تهيئة الاتصال الآمن…','تحميل بيئة المحاكاة…','فحص سلامة العميل…','الاتصال جاهز.'];let bi=0;setInterval(()=>{$('#boot-line').textContent=bootLines[++bi%bootLines.length]},1700);
  $('#sound-btn').textContent=state.sound?'◉':'○';
  registerWebMCP();
  if(state.started){refreshHQ();showScreen('hq-screen')}
})();
