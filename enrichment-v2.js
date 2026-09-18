// Application Command Center enrichment v2. Loaded after app.js and before the user unlocks the vault.
// All compensation shown here is a role-based 2026 market estimate unless a future record explicitly includes employer-disclosed pay.

salaryProfile=function(role='',cat='Other',sen='Mid'){
  const s=role.toLowerCase();
  let min=24000,max=36000,remoteMin=30000,remoteMax=46000,confidence='Medium',variable='',remoteVariable='';
  if(/customer success engineer|support engineer/.test(s)){min=40000;max=60000;remoteMin=52000;remoteMax=80000}
  else if(/technical support/.test(s)){min=27000;max=42000;remoteMin=35000;remoteMax=55000}
  else if(/customer success lead|head of customer success/.test(s)){min=48000;max=70000;remoteMin=65000;remoteMax=95000}
  else if(/customer success manager|customer success/.test(s)){min=34000;max=52000;remoteMin=45000;remoteMax=72000}
  else if(/customer support|customer service|community support/.test(s)){min=22000;max=34000;remoteMin=28000;remoteMax=44000}
  else if(/revenue operations/.test(s)){min=35000;max=55000;remoteMin=46000;remoteMax=70000}
  else if(/sales operations/.test(s)){min=30000;max=48000;remoteMin=40000;remoteMax=62000}
  else if(/product & ops|operations|fulfilment/.test(s)){min=24000;max=39000;remoteMin=30000;remoteMax=49000}
  else if(/qa tester|quality assurance|\bqa\b/.test(s)){min=25000;max=41000;remoteMin=32000;remoteMax=52000}
  else if(/account executive/.test(s)){min=34000;max=52000;remoteMin=45000;remoteMax=68000;variable='OTE ~€45k–€75k';remoteVariable='Remote EMEA OTE ~€60k–€95k'}
  else if(/sales development|\bsdr\b|business development representative/.test(s)){min=24000;max=37000;remoteMin=30000;remoteMax=46000;variable='OTE ~€32k–€52k';remoteVariable='Remote EMEA OTE ~€42k–€65k'}
  else if(/sales executive|b2b business development/.test(s)){min=30000;max=48000;remoteMin=40000;remoteMax=62000;variable='OTE ~€40k–€70k';remoteVariable='Remote EMEA OTE ~€55k–€90k'}
  else if(/growth marketing manager|growth manager|marketing lead/.test(s)){min=34000;max=54000;remoteMin=45000;remoteMax=72000}
  else if(/content marketing manager|social media marketing manager|social media manager|community manager|content strategist|seo/.test(s)){min=26000;max=43000;remoteMin=33000;remoteMax=52000}
  else if(/content writer|creative producer/.test(s)){min=23000;max=38000;remoteMin=29000;remoteMax=46000}
  else if(/trust|moderator|safety/.test(s)){min=22000;max=35000;remoteMin=28000;remoteMax=44000}
  else if(/ai operations|ai trainer|annotation|localization|translation/.test(s)){min=25000;max=42000;remoteMin=33000;remoteMax=56000}
  else if(/technical assistant/.test(s)){min=24000;max=40000;remoteMin=31000;remoteMax=50000}
  if(/open application|unsolicited|open introduction/.test(s)){confidence='Low';min=Math.max(22000,min-2000);max=Math.max(min+8000,max-3000)}
  if(sen==='Intern'){min=12000;max=22000;remoteMin=16000;remoteMax=28000;confidence='Medium'}
  if(sen==='Lead'){min=Math.round(min*1.18);max=Math.round(max*1.25);remoteMin=Math.round(remoteMin*1.12);remoteMax=Math.round(remoteMax*1.18)}
  if(sen==='Senior'){min=Math.round(min*1.10);max=Math.round(max*1.16);remoteMin=Math.round(remoteMin*1.08);remoteMax=Math.round(remoteMax*1.14)}
  const explicitRegional=/\bemea\b|\beurope\b|\beu\b/.test(s);
  if(explicitRegional){min=Math.round(min*1.05);max=Math.round(max*1.10);confidence=confidence==='Low'?'Low':'Medium-high'}
  return{min,max,mid:(min+max)/2,monthlyMin:min/12,monthlyMax:max/12,remoteMin,remoteMax,remoteMonthlyMin:remoteMin/12,remoteMonthlyMax:remoteMax/12,confidence,note:'Market estimate',variable,remoteVariable,explicitRegional};
};

duties=function(role='',cat='Other'){
  const s=role.toLowerCase();
  if(/account executive/.test(s))return['Run demos, discovery calls and commercial conversations','Build pipeline, negotiate and close new business','Keep CRM, follow-ups and forecasts accurate'];
  if(/sdr|sales development/.test(s))return['Research and qualify prospects','Cold email/call prospects and book meetings','Track outreach, replies and pipeline in the CRM'];
  if(/business development|sales executive/.test(s))return['Find new customers or commercial partners','Pitch the offer, follow up and negotiate','Own activity/revenue targets and CRM hygiene'];
  if(/customer success engineer/.test(s))return['Solve technical customer problems and integration issues','Guide customers through APIs, setup and product workflows','Escalate reproducible issues to engineering and follow them through'];
  if(/customer success/.test(s))return['Onboard customers and teach them how to get value','Run check-ins, solve account issues and coordinate internally','Improve adoption, retention, renewals and customer health'];
  if(/technical support|helpdesk|technical assistant/.test(s))return['Diagnose software, hardware or account problems','Handle support tickets and guide users step by step','Document fixes and escalate harder technical cases'];
  if(/customer support|customer service|community support/.test(s))return['Answer customer questions across email/chat/tickets','Resolve account, order, product and billing problems','Maintain fast response times and strong satisfaction'];
  if(/revenue operations/.test(s))return['Keep CRM and revenue data clean and useful','Build reports, dashboards and sales-process workflows','Support forecasting, automation and handoffs across GTM teams'];
  if(/sales operations/.test(s))return['Maintain pipeline, CRM fields and sales reporting','Support reps with process, tooling and data accuracy','Improve handoffs, forecasting and operational discipline'];
  if(/product & ops/.test(s))return['Coordinate product/operations tasks and internal workflows','Track issues, requests, data and delivery status','Turn recurring problems into cleaner processes'];
  if(/operations|fulfilment/.test(s))return['Run daily operational workflows and exception handling','Track orders, tasks, records or inventory accurately','Coordinate teams and improve speed/accuracy'];
  if(/qa|tester|quality assurance/.test(s))return['Test product flows, devices or releases systematically','Write clear reproducible bug reports with evidence','Retest fixes and maintain regression/test checklists'];
  if(/trust|moderator|safety/.test(s))return['Review content/accounts against policy rules','Handle abuse reports, escalations and edge cases','Document decisions consistently and protect user safety'];
  if(/growth marketing|growth manager/.test(s))return['Run acquisition and conversion experiments','Track funnel, campaign and channel performance','Scale what works across paid, organic, lifecycle or partnerships'];
  if(/content marketing/.test(s))return['Plan and publish content for acquisition or brand','Write/edit campaigns, landing pages and thought-leadership assets','Measure traffic, leads, engagement and conversion'];
  if(/community|social media/.test(s))return['Run social/community channels and editorial calendar','Create posts and respond to users/creators','Measure engagement and grow an active audience'];
  if(/seo|content strategist/.test(s))return['Research keywords, competitors and audience questions','Build the SEO/content roadmap and briefs','Measure rankings, traffic, leads and conversion'];
  if(/writer/.test(s))return['Research and write useful on-brand content','Edit for clarity, accuracy and SEO where relevant','Manage publishing cadence and deadlines'];
  if(/creative producer/.test(s))return['Plan and coordinate creator/UGC production','Manage briefs, assets, revisions and deadlines','Keep output aligned with campaign goals and brand'];
  if(/ai operations|ai trainer|annotation/.test(s))return['Review, label or evaluate AI data and outputs','Follow detailed quality rubrics consistently','Flag edge cases and improve evaluation/operations workflows'];
  return['Own the day-to-day workflow implied by the role','Coordinate with customers or internal teams','Track tasks, issues and outcomes in company tools'];
};

locationSignal=function(role=''){
  const s=role.toLowerCase();
  if(/\bemea\b/.test(s))return{label:'EMEA scope',note:'Title explicitly says EMEA; exact Greece eligibility still needs listing verification',score:8};
  if(/\beurope\b|\beu\b/.test(s))return{label:'Europe scope',note:'Title explicitly says Europe/EU; exact residence rules still need listing verification',score:8};
  return{label:'Not verified',note:'No reliable location/work-mode fact is encoded in the saved role title',score:5};
};

const previousEnrich=enrich;
enrich=function(x){const a=previousEnrich(x),loc=locationSignal(x.role),pay=salaryProfile(x.role,a.category,a.seniority),sc=score(x.role,a.category,a.seniority,pay);return{...a,pay,duties:duties(x.role,a.category),location:loc,...sc}};

showDetail=function(a){if(!a)return;const li=x=>`<li>${esc(x)}</li>`;const monthly=`€${Math.round(a.pay.monthlyMin).toLocaleString()}–€${Math.round(a.pay.monthlyMax).toLocaleString()}/mo`;const remote=`${eur(a.pay.remoteMin)}–${eur(a.pay.remoteMax)}`;$('#detailBody').innerHTML=`
  <div class="eyebrow">${a.action} · ${esc(a.category)} · ${esc(a.seniority)}</div>
  <h1>${esc(a.company)}</h1><p class="role">${esc(a.role)}</p>
  <div class="payHero"><div><span>EXPECTED FOR GREECE / EMEA APPLICANT · MARKET ESTIMATE</span><strong>${eur(a.pay.min)}–${eur(a.pay.max)}</strong><div class="tasksub">${monthly} gross · confidence ${a.pay.confidence}${a.pay.variable?' · '+a.pay.variable:''}</div></div><div><span>REMOTE EMEA UPSIDE</span><strong>${remote}</strong><div class="tasksub">gross/year${a.pay.remoteVariable?' · '+a.pay.remoteVariable:''}</div></div></div>
  <div class="detailScores">${[['Overall',Math.round(a.overall)+'/100'],['CV fit',a.fit.toFixed(1)],['Ease',a.ease.toFixed(1)],['Traction',a.traction.toFixed(1)],['Pay',a.payScore.toFixed(1)],['Future tech',a.future.toFixed(1)],['Location',a.location.label],['Action',a.action]].map(([l,v])=>`<div class="detailScore"><span>${l}</span><b>${v}</b></div>`).join('')}</div>
  <div class="detailGrid"><div class="detailBox"><h3>What you would actually do</h3><ul>${a.duties.map(li).join('')}</ul></div><div class="detailBox"><h3>Why your CV matches</h3><ul>${a.cvReasons.map(li).join('')}</ul></div></div>
  <div class="meta"><b>Location/work mode:</b> ${a.location.label} — ${a.location.note}<br><b>Pay basis:</b> Role-title + seniority market estimate, not employer-disclosed compensation unless later verified against the actual listing.<br><b>Duties basis:</b> Role-family inference from the saved application title; exact employer responsibilities require listing verification.<br><b>Gmail record:</b> ${a.gmailMessageId}<br><br><b>How to read the scores:</b> Fit = CV alignment. Ease = seniority/requirements accessibility. Traction = heuristic blend of fit + accessibility, not a probability. Action = quick triage signal, not a guarantee.</div>`;$('#detail').showModal()};

exportCsv=function(){const rows=filtered(),cols=['company','role','category','seniority','action','pay_min_est','pay_max_est','remote_emea_min_est','remote_emea_max_est','pay_confidence','fit','ease','traction','overall','location_signal','what_you_do','gmailMessageId'];const out=[cols.join(','),...rows.map(a=>[a.company,a.role,a.category,a.seniority,a.action,a.pay.min,a.pay.max,a.pay.remoteMin,a.pay.remoteMax,a.pay.confidence,a.fit,a.ease,a.traction,Math.round(a.overall),a.location.label,a.duties.join(' | '),a.gmailMessageId].map(v=>'"'+String(v).replaceAll('"','""')+'"').join(','))].join('\n');const u=URL.createObjectURL(new Blob([out],{type:'text/csv'})),x=document.createElement('a');x.href=u;x.download='application-command-center-enriched.csv';x.click();URL.revokeObjectURL(u)};
