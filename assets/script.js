
function fmt(n){
  return 'RM ' + (Number(n)||0).toLocaleString('en-MY',{minimumFractionDigits:2,maximumFractionDigits:2});
}
function getNum(id){return Number(document.getElementById(id)?.value || 0);}
function salaryBreakdown(){
  const salary=getNum('salary');
  const bonus=getNum('bonus');
  const ot=getNum('ot');
  const epfRate=getNum('epfRate')/100;
  const epf=salary*epfRate;
  const socso=Math.min(salary*0.005,25);
  const eis=Math.min(salary*0.002,10);
  const gross=salary+bonus+ot;
  const roughTax=Math.max(0,(gross*12-9000)*0.03/12);
  const net=gross-epf-socso-eis-roughTax;
  document.getElementById('homeResult').innerHTML =
    `<p><strong>Estimated gross monthly pay:</strong> ${fmt(gross)}</p>
     <p><strong>Estimated EPF:</strong> ${fmt(epf)}</p>
     <p><strong>Estimated SOCSO:</strong> ${fmt(socso)}</p>
     <p><strong>Estimated EIS:</strong> ${fmt(eis)}</p>
     <p><strong>Very rough PCB estimate:</strong> ${fmt(roughTax)}</p>
     <p><strong>Estimated take-home pay:</strong> ${fmt(net)}</p>
     <p class="note">This is a simplified estimate for planning only.</p>`;
}
function toolCalc(type){
  const salary=getNum('salary');
  const amount=getNum('amount');
  const hours=getNum('hours');
  let out='';
  if(type==='salary'||type==='net'){
    const epf=salary*.11, socso=Math.min(salary*.005,25), eis=Math.min(salary*.002,10);
    out=`<p><strong>Gross salary:</strong> ${fmt(salary)}</p><p><strong>Estimated EPF:</strong> ${fmt(epf)}</p><p><strong>Estimated SOCSO:</strong> ${fmt(socso)}</p><p><strong>Estimated EIS:</strong> ${fmt(eis)}</p><p><strong>Estimated take-home before PCB:</strong> ${fmt(salary-epf-socso-eis)}</p>`;
  }
  if(type==='epf') out=`<p><strong>Employee EPF estimate:</strong> ${fmt(salary*.11)}</p><p><strong>Employer EPF estimate:</strong> ${fmt(salary*.13)}</p>`;
  if(type==='socso') out=`<p><strong>Estimated employee SOCSO:</strong> ${fmt(Math.min(salary*.005,25))}</p><p class="note">Actual SOCSO uses official wage schedules.</p>`;
  if(type==='eis') out=`<p><strong>Estimated employee EIS:</strong> ${fmt(Math.min(salary*.002,10))}</p>`;
  if(type==='tax'||type==='pcb') {
    const annual=salary*12, taxable=Math.max(0,annual-9000), tax=taxable*.03;
    out=`<p><strong>Estimated annual income:</strong> ${fmt(annual)}</p><p><strong>Very rough annual tax estimate:</strong> ${fmt(tax)}</p><p><strong>Estimated monthly PCB:</strong> ${fmt(tax/12)}</p>`;
  }
  if(type==='overtime'){
    const hourly=salary/26/8, pay=hourly*1.5*hours;
    out=`<p><strong>Estimated hourly rate:</strong> ${fmt(hourly)}</p><p><strong>Estimated overtime pay:</strong> ${fmt(pay)}</p>`;
  }
  if(type==='bonus'){
    out=`<p><strong>Monthly salary:</strong> ${fmt(salary)}</p><p><strong>Bonus amount:</strong> ${fmt(amount)}</p><p><strong>Total for bonus month:</strong> ${fmt(salary+amount)}</p>`;
  }
  document.getElementById('result').innerHTML=out;
}
