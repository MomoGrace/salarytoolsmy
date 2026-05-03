
function money(n){return 'RM ' + (Number(n)||0).toLocaleString('en-MY',{minimumFractionDigits:2,maximumFractionDigits:2});}
function calcGeneric(type){
  const salary = Number(document.querySelector('[data-salary]')?.value || 0);
  const hours = Number(document.querySelector('[data-hours]')?.value || 0);
  const bonus = Number(document.querySelector('[data-bonus]')?.value || 0);
  let html = '';
  if(type==='salary'){
    const epf=salary*0.11, socso=Math.min(salary*0.005,25), eis=Math.min(salary*0.002,10);
    html = `<p><strong>Gross salary:</strong> ${money(salary)}</p><p><strong>Estimated EPF:</strong> ${money(epf)}</p><p><strong>Estimated SOCSO:</strong> ${money(socso)}</p><p><strong>Estimated EIS:</strong> ${money(eis)}</p><p><strong>Estimated take-home before PCB:</strong> ${money(salary-epf-socso-eis)}</p>`;
  } else if(type==='epf'){
    html = `<p><strong>Employee EPF estimate:</strong> ${money(salary*0.11)}</p><p><strong>Employer EPF estimate:</strong> ${money(salary*0.13)}</p>`;
  } else if(type==='socso'){
    html = `<p><strong>Estimated employee SOCSO:</strong> ${money(Math.min(salary*0.005,25))}</p><p class="note">Actual SOCSO follows official wage schedules.</p>`;
  } else if(type==='eis'){
    html = `<p><strong>Estimated employee EIS:</strong> ${money(Math.min(salary*0.002,10))}</p>`;
  } else if(type==='tax' || type==='pcb'){
    const annual=salary*12, taxable=Math.max(0,annual-9000), tax=Math.max(0,taxable*0.03);
    html = `<p><strong>Estimated annual income:</strong> ${money(annual)}</p><p><strong>Very rough annual tax estimate:</strong> ${money(tax)}</p><p><strong>Rough monthly PCB:</strong> ${money(tax/12)}</p>`;
  } else if(type==='overtime'){
    const hourly=salary/26/8, ot=hourly*1.5*hours;
    html = `<p><strong>Estimated hourly rate:</strong> ${money(hourly)}</p><p><strong>Estimated overtime pay:</strong> ${money(ot)}</p>`;
  } else if(type==='bonus'){
    const total=salary+bonus;
    html = `<p><strong>Monthly salary:</strong> ${money(salary)}</p><p><strong>Bonus:</strong> ${money(bonus)}</p><p><strong>Total for bonus month:</strong> ${money(total)}</p>`;
  }
  document.getElementById('result').innerHTML=html;
}
