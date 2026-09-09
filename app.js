const subjects=[
  {name:'MATHÉMATIQUES',teacher:'MOREAU M.',room:'207',color:'#2454bd',grades:[16,18,15],classAvg:12.8},
  {name:'FRANÇAIS',teacher:'BERNARD B.',room:'105',color:'#ff8154',grades:[14,16,19],classAvg:13.2},
  {name:'HISTOIRE-GÉOGRAPHIE',teacher:'PETIT C.',room:'206',color:'#43c9d6',grades:[17,15],classAvg:12.5},
  {name:'ANGLAIS LV1',teacher:'WILSON J.',room:'103',color:'#73b94b',grades:[18,17,16],classAvg:14.1},
  {name:'SCIENCES DE LA VIE ET DE LA TERRE',teacher:'SIMON A.',room:'Labo 2',color:'#1c296d',grades:[15,17],classAvg:13.5},
  {name:'PHYSIQUE-CHIMIE',teacher:'ROBERT N.',room:'Labo 1',color:'#a368c0',grades:[13,16],classAvg:12.4}
];
const tasks=[
  {id:1,subject:0,text:'Exercices n° 12 et 14 p. 48',date:'Pour jeudi 10 sept.',type:'Exercices'},
  {id:2,subject:1,text:'Lire les chapitres 3 et 4 du livre',date:'Pour jeudi 10 sept.',type:'Lecture'},
  {id:3,subject:3,text:'Apprendre « Introducing yourself »',date:'Pour vendredi 11 sept.',type:'À apprendre'},
  {id:4,subject:2,text:'Réviser les repères de la Première Guerre mondiale',date:'Pour vendredi 11 sept.',type:'Révisions'}
];
const schedule=[0,2,1,'break',4,3,5];
const times=['8h00','9h00','10h00','12h00','13h30','14h30','15h30'];
let completed=[];
try{const saved=JSON.parse(localStorage.getItem('campus-done')||'[]');if(Array.isArray(saved))completed=saved.filter(id=>tasks.some(t=>t.id===id))}catch{}
let filter='all';
const average=a=>a.reduce((x,y)=>x+y,0)/a.length;
const fmt=n=>n.toLocaleString('fr-FR',{minimumFractionDigits:2,maximumFractionDigits:2});
const overall=average(subjects.map(s=>average(s.grades)));
const panel=(title,body,link='')=>`<section class="panel">${link?`<a class="panel-link" href="${link}">Tout voir ↗</a>`:''}${title?`<h2 class="panel-title">${title}</h2>`:''}${body}</section>`;

function scheduleRows(){
  return schedule.map((s,i)=>s==='break'
    ?`<div class="schedule-row break"><time>${times[i]}</time><i class="stripe"></i><div><strong>Pause déjeuner</strong><span>🍴 12h00 – 13h30</span></div></div>`
    :`<div class="schedule-row" style="--course:${subjects[s].color}"><time>${times[i]}</time><i class="stripe"></i><div><strong>${subjects[s].name}</strong><span>${subjects[s].teacher}</span><span>${subjects[s].room}</span></div></div>`).join('');
}
function homeworkRows(list=tasks){
  if(!list.length)return'<p class="notice-card">Aucun travail dans cette catégorie.</p>';
  return list.map(t=>{const done=completed.includes(t.id);return`<div class="homework"><i class="stripe" style="--subject:${subjects[t.subject].color}"></i><div><strong>${subjects[t.subject].name}</strong><p>${t.text}</p></div><div>${done?'<span class="status done">Fait</span>':'<span class="status">Non fait</span>'}<label><input type="checkbox" data-task="${t.id}" ${done?'checked':''}>J’ai terminé</label></div></div>`}).join('');
}
function gradeRows(limit=5){
  return subjects.slice(0,limit).map((s,i)=>`<a class="grade" href="#notes"><div><strong>${s.name}</strong><small>le ${[8,7,5,4,3][i]||2} sept.</small></div><b>${fmt(s.grades.at(-1))}<small> / 20</small></b></a>`).join('');
}
function resources(){
  const items=[
    ['SCIENCES DE LA VIE ET DE LA TERRE','Fiche – La cellule végétale.pdf','PDF','aujourd’hui'],
    ['MATHÉMATIQUES','Méthode – Calcul littéral.pdf','PDF','hier'],
    ['HISTOIRE-GÉOGRAPHIE','Carte mentale – 1914-1918.png','IMG','le 7 sept.']
  ];
  return `<div class="resource-list">${items.map(([subject,name,type,date])=>`<div class="resource"><span class="file-icon">${type}</span><div><strong>${subject}</strong><a href="#devoirs">${name}</a><small>déposé ${date}</small></div></div>`).join('')}</div>`;
}
function evaluations(){
  return `<div class="evaluation-list"><a href="#competences"><strong>TECHNOLOGIE</strong><small>le 8 sept.</small><span><i class="mastery mastery-blue"></i> Très bonne maîtrise</span></a><a href="#competences"><strong>FRANÇAIS</strong><small>le 5 sept.</small><span><i class="mastery mastery-green"></i> Maîtrise satisfaisante</span></a></div>`;
}
function home(){
  return `<div class="dashboard">
    <div class="dash-column">
      ${panel('Emploi du temps',`<div class="schedule-panel"><div class="date-switcher"><button class="round-button" aria-label="Jour précédent">‹</button><span class="date-chip">mer. 9 sept.</span><button class="round-button" aria-label="Jour suivant">›</button></div><div class="week-label">Semaine A</div><div class="schedule-list">${scheduleRows()}</div></div>`,'#vie')}
    </div>
    <div class="dash-column">
      ${panel('Pense-bête',`<textarea id="memo" placeholder="Inscrivez ici vos notes" aria-label="Pense-bête"></textarea>`).replace('class="panel"','class="panel memo"')}
      ${panel('Prochains DS',`<div class="next-test"><div class="event-row"><span class="date-square">14<small>sept.</small></span><div><strong>HISTOIRE-GÉOGRAPHIE</strong><p>Repères chronologiques · de 10h00 à 11h00 · Salle 206</p></div></div></div>`)}
      ${panel('Travail à faire pour les prochains jours',`<div class="homework-panel"><h3 class="due-heading">Pour jeudi 10 sept.</h3>${homeworkRows(tasks.slice(0,2))}<h3 class="due-heading">Pour vendredi 11 sept.</h3>${homeworkRows(tasks.slice(2))}</div>`,'#devoirs')}
      ${panel('Dernières ressources pédagogiques',resources(),'#ressources')}
      ${panel('Carnet de correspondance',`<div class="compact-list"><a href="#vie"><span class="round-status ok">✓</span><div><strong>Autorisation de sortie validée</strong><small>Signée le 8 septembre</small></div></a><a href="#vie"><span class="round-status">i</span><div><strong>Réunion de rentrée</strong><small>Mardi 15 septembre à 18h00</small></div></a></div>`,'#vie')}
      ${panel('Dernières notes',`<div class="grades-panel">${gradeRows(4)}</div>`,'#notes')}
      ${panel('Dernières évaluations',evaluations(),'#competences')}
    </div>
    <div class="dash-column">
      ${panel('Liens et numéros utiles',`<div class="chip-list"><a class="useful-link" href="#communication"><span>↗</span>Règlement intérieur du collège</a><a class="useful-link" href="#communication"><span>↗</span>Les éco-délégués, c’est quoi ?</a><a class="useful-link" href="#communication"><span>↗</span>Prévention du harcèlement</a><a class="useful-link" href="tel:3018"><span>☎</span>3018 · Aide aux jeunes victimes</a></div>`)}
      ${panel('Agenda',`<div class="agenda-panel"><div class="agenda-item"><span class="date-square">15<small>sept.</small></span><div><strong>Réunion parents-professeurs</strong><p>18h00 · Salle polyvalente</p></div></div><div class="agenda-item"><span class="date-square">18<small>sept.</small></span><div><strong>Photo de classe</strong><p>10h15 · Cour principale</p></div></div></div>`,'#communication')}
      ${panel('Informations & Sondages',`<div class="compact-list"><a href="#communication"><span class="round-status">2</span><div><strong>Élection des délégués</strong><small>Candidatures jusqu’au 18 septembre</small></div></a><a href="#communication"><span class="round-status ok">✓</span><div><strong>Bienvenue au collège</strong><small>Informations utiles pour la rentrée</small></div></a></div>`,'#communication')}
      ${panel('Discussions',`<div class="compact-list"><a href="#communication"><span class="message-avatar">CB</span><div><strong>Claire Bernard · Français</strong><small>Nouveau document pour le cours</small></div><b class="unread">1</b></a><a href="#communication"><span class="message-avatar">VS</span><div><strong>Vie scolaire</strong><small>Rappel pour la réunion</small></div><b class="unread">1</b></a></div>`,'#communication')}
      ${panel('Menu de la cantine',`<div class="canteen"><strong>Mercredi 9 septembre</strong><span>Salade de tomates</span><span>Poulet rôti · Haricots verts</span><span>Yaourt nature · Fruit de saison</span></div>`,'#communication')}
    </div>
  </div>`;
}
function notes(){
  return `<div class="simple-page"><div class="summary-strip"><div class="summary-box"><span>Ma moyenne générale</span><strong>${fmt(overall)} / 20</strong></div><div class="summary-box"><span>Moyenne de la classe</span><strong>13,08 / 20</strong></div><div class="summary-box"><span>Notes publiées</span><strong>${subjects.reduce((n,s)=>n+s.grades.length,0)}</strong></div></div>${panel('Mes notes',`<div class="toolbar"><span>Trimestre 1</span><select class="select" aria-label="Période"><option>Trimestre 1</option></select></div><div class="table-wrap"><table><thead><tr><th>Matière</th><th>Dernières notes</th><th>Ma moyenne</th><th>Classe</th></tr></thead><tbody>${subjects.map(s=>`<tr><td><strong>${s.name}</strong><br><small>${s.teacher}</small></td><td>${s.grades.map(n=>fmt(n)).join(' · ')}</td><td><strong>${fmt(average(s.grades))}</strong></td><td>${fmt(s.classAvg)}</td></tr>`).join('')}</tbody></table></div>`)}</div>`;
}
function devoirs(){
  const list=tasks.filter(t=>filter==='all'||(filter==='done')===completed.includes(t.id));
  return `<div class="simple-page">${panel('Travail à faire',`<div class="toolbar"><div class="filters">${[['all','Tout'],['todo','Non fait'],['done','Fait']].map(([id,label])=>`<button data-filter="${id}" class="${filter===id?'selected':''}" aria-pressed="${filter===id}">${label}</button>`).join('')}</div><span>${completed.length} travail${completed.length>1?'aux':''} terminé${completed.length>1?'s':''}</span></div><div class="homework-panel">${homeworkRows(list)}</div>`)}</div>`;
}
function vie(){
  return `<div class="simple-page"><div class="summary-strip"><div class="summary-box"><span>Absences</span><strong>0</strong></div><div class="summary-box"><span>Retards</span><strong>0</strong></div><div class="summary-box"><span>Observations</span><strong>0</strong></div></div>${panel('Emploi du temps du mercredi 9 septembre',`<div class="schedule-panel"><div class="schedule-list">${scheduleRows()}</div></div>`)}${panel('Carnet de correspondance',`<div class="notice-card"><strong>Réunion de rentrée · Classes de 3e</strong><p>Les familles sont invitées le mardi 15 septembre à 18h00 en salle polyvalente.</p></div>`)}</div>`;
}
function competences(){
  return `<div class="simple-page">${panel('Mes dernières évaluations',`<div class="competence"><strong>Résoudre des problèmes en utilisant les nombres</strong><i class="level"></i><i class="level"></i><i class="level on green"></i><i class="level"></i></div><div class="competence"><strong>Comprendre un texte littéraire et l’interpréter</strong><i class="level"></i><i class="level"></i><i class="level"></i><i class="level on blue"></i></div><div class="competence"><strong>S’exprimer à l’oral en continu</strong><i class="level"></i><i class="level on orange"></i><i class="level"></i><i class="level"></i></div><div class="notice-card">Rouge : maîtrise insuffisante · Orange : maîtrise fragile · Vert : maîtrise satisfaisante · Bleu : très bonne maîtrise</div>`)}</div>`;
}
function communication(){
  return `<div class="simple-page"><div class="two-panels">${panel('Informations & sondages',`<div class="compact-list"><a href="#"><span class="round-status">!</span><div><strong>Élection des délégués</strong><small>Publié aujourd’hui par la vie scolaire</small></div></a><a href="#"><span class="round-status ok">✓</span><div><strong>Bienvenue au collège</strong><small>Publié le 7 septembre</small></div></a></div>`)}${panel('Discussions',`<div class="compact-list"><a href="#"><span class="message-avatar">CB</span><div><strong>Claire Bernard</strong><small>Document ajouté au cours de français</small></div><b class="unread">1</b></a><a href="#"><span class="message-avatar">VS</span><div><strong>Vie scolaire</strong><small>Réunion de rentrée</small></div><b class="unread">1</b></a></div>`)}</div>${panel('Agenda',`<div class="agenda-panel"><div class="agenda-item"><span class="date-square">15<small>sept.</small></span><div><strong>Réunion parents-professeurs</strong><p>18h00 à 19h30 · Salle polyvalente</p></div></div><div class="agenda-item"><span class="date-square">18<small>sept.</small></span><div><strong>Photo de classe</strong><p>10h15 · Cour principale</p></div></div></div>`)}</div>`;
}
function stage(){
  return `<div class="simple-page"><div class="summary-strip"><div class="summary-box"><span>Convention</span><strong class="small-value">À compléter</strong></div><div class="summary-box"><span>Période</span><strong class="small-value">2–6 févr.</strong></div><div class="summary-box"><span>Vœux déposés</span><strong>1</strong></div></div>${panel('Mon stage de 3e',`<div class="stage-grid"><div class="notice-card"><strong>Recherche d’un lieu de stage</strong><p>Ajoute une entreprise et complète les coordonnées de ton tuteur.</p><button class="primary-action">Compléter ma fiche</button></div><div class="step-list"><span class="done-step">✓ Recherche commencée</span><span>2. Fiche de stage</span><span>3. Convention</span><span>4. Évaluation de l’accueil</span></div></div>`)}</div>`;
}
function generic(title,id){
  const copy={donnees:'Consulte tes informations personnelles et les documents partagés par le collège.',resultats:'Retrouve ici tes relevés, bulletins et résultats au brevet.',ressources:'Retrouve les documents et liens déposés par tes professeurs.'};
  return `<div class="simple-page">${panel(title,`<div class="notice-card">${copy[id]||'Cette rubrique regroupe les informations de ton espace scolaire.'}</div>${id==='ressources'?resources():''}`)}</div>`;
}
const pages={
  accueil:{title:"Page d'accueil",render:home},
  donnees:{title:'Mes données',render:()=>generic('Mes données','donnees')},
  devoirs:{title:'Cahier de textes',render:devoirs},
  ressources:{title:'Contenus et ressources',render:()=>generic('Contenus et ressources','ressources')},
  notes:{title:'Notes',render:notes},
  competences:{title:'Compétences',render:competences},
  resultats:{title:'Résultats',render:()=>generic('Résultats','resultats')},
  vie:{title:'Vie scolaire',render:vie},
  stage:{title:'Stage',render:stage},
  communication:{title:'Communication',render:communication}
};

function render(){
  let id=location.hash.slice(1)||'accueil';
  if(!pages[id])id='accueil';
  document.querySelector('#page-title').textContent=pages[id].title;
  document.querySelector('#last-login').hidden=id!=='accueil';
  document.title=`${pages[id].title} · Campus`;
  document.querySelectorAll('[data-page]').forEach(a=>{
    a.classList.toggle('active',a.dataset.page===id);
    if(a.dataset.page===id)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');
  });
  document.querySelector('#content').innerHTML=pages[id].render();
  if(id==='accueil'){
    const memo=document.querySelector('#memo');
    try{memo.value=localStorage.getItem('campus-memo')||''}catch{}
    memo?.addEventListener('input',e=>{try{localStorage.setItem('campus-memo',e.target.value)}catch{}});
  }
}
function showPortal(){
  document.querySelector('#login-view').hidden=true;
  document.querySelector('#portal-shell').hidden=false;
  if(!location.hash)location.hash='accueil';else render();
}
function showLogin(){
  document.querySelector('#portal-shell').hidden=true;
  document.querySelector('#login-view').hidden=false;
  document.title='Connexion · Campus';
  setTimeout(()=>document.querySelector('#login-identifier')?.focus(),0);
}

document.querySelector('#login-form').addEventListener('submit',event=>{
  event.preventDefault();
  const identifier=document.querySelector('#login-identifier').value.trim().toLowerCase();
  const password=document.querySelector('#login-password').value;
  const error=document.querySelector('#login-error');
  if(identifier==='demonstration'&&password==='campus'){
    error.hidden=true;
    try{sessionStorage.setItem('campus-auth','1')}catch{}
    showPortal();
  }else{
    error.hidden=false;
    document.querySelector('#login-password').select();
  }
});
document.querySelector('#toggle-password').addEventListener('click',event=>{
  const input=document.querySelector('#login-password');
  const visible=input.type==='text';
  input.type=visible?'password':'text';
  event.currentTarget.setAttribute('aria-pressed',String(!visible));
  event.currentTarget.setAttribute('aria-label',visible?'Afficher le mot de passe':'Masquer le mot de passe');
  input.focus();
});
document.querySelector('#logout-button').addEventListener('click',()=>{
  try{sessionStorage.removeItem('campus-auth')}catch{}
  document.querySelector('#login-password').value='';
  showLogin();
});
document.addEventListener('change',e=>{
  if(!e.target.matches('[data-task]'))return;
  const id=Number(e.target.dataset.task);
  completed=completed.filter(x=>x!==id);
  if(e.target.checked)completed.push(id);
  try{localStorage.setItem('campus-done',JSON.stringify(completed))}catch{}
  render();
});
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-filter]');
  if(!b)return;
  filter=b.dataset.filter;
  render();
  document.querySelector(`[data-filter="${filter}"]`)?.focus();
});
addEventListener('hashchange',()=>{
  if(document.querySelector('#portal-shell').hidden)return;
  render();scrollTo(0,0);document.querySelector('#content').focus();
});

let authenticated=false;
try{authenticated=sessionStorage.getItem('campus-auth')==='1'}catch{}
if(authenticated)showPortal();else showLogin();
