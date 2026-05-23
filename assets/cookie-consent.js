(function(){
  var STORAGE_KEY='salarytoolsmy_cookie_consent_v1';
  var defaultConsent={ad_storage:'denied',analytics_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'};
  function gtagConsent(mode,payload){if(typeof window.gtag==='function'){window.gtag('consent',mode,payload);}}
  gtagConsent('default',defaultConsent);
  function applyConsent(pref){
    var analytics=pref.analytics? 'granted':'denied';
    var ads=pref.advertising? 'granted':'denied';
    gtagConsent('update',{analytics_storage:analytics,ad_storage:ads,ad_user_data:ads,ad_personalization:ads});
  }
  function save(pref){localStorage.setItem(STORAGE_KEY,JSON.stringify(pref));applyConsent(pref);hide();}
  function hide(){var el=document.getElementById('salarytoolsmy-cookie-consent');if(el){el.style.display='none';}}
  function show(){var el=document.getElementById('salarytoolsmy-cookie-consent');if(el){el.style.display='block';}}
  function panel(open){var p=document.getElementById('salarytoolsmy-cookie-panel');if(!p)return;p.classList.toggle('is-open',open);}
  function read(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');}catch(e){return null;}}
  function build(){
    var wrap=document.createElement('div');wrap.id='salarytoolsmy-cookie-consent';
    wrap.innerHTML='<div class="cc-card" role="dialog" aria-label="Cookie consent" aria-live="polite"><p>We use cookies to improve your browsing experience, understand site usage, and support ads. You can accept all cookies, reject non-essential cookies, or manage your preferences.</p><div class="cc-links"><a href="/privacy.html">Privacy Policy</a><a href="/terms.html">Terms</a></div><div class="cc-actions"><button class="cc-primary" type="button" id="cc-accept">Accept All</button><button type="button" id="cc-reject">Reject Non-Essential</button><button type="button" id="cc-manage">Manage Preferences</button></div><div id="salarytoolsmy-cookie-panel"><div class="cc-option"><div><span class="cc-label">Essential Cookies</span><small>Always enabled for site functionality.</small></div><input class="cc-toggle" type="checkbox" checked disabled></div><div class="cc-option"><div><span class="cc-label">Analytics Cookies</span><small>Help us understand site usage.</small></div><input class="cc-toggle" type="checkbox" id="cc-analytics"></div><div class="cc-option"><div><span class="cc-label">Advertising Cookies</span><small>Support relevant ads and ad measurement.</small></div><input class="cc-toggle" type="checkbox" id="cc-advertising"></div><button class="cc-save cc-primary" type="button" id="cc-save">Save Preferences</button></div></div>';
    document.body.appendChild(wrap);
    document.getElementById('cc-accept').addEventListener('click',function(){save({essential:true,analytics:true,advertising:true,choice:'accept_all',updatedAt:new Date().toISOString()});});
    document.getElementById('cc-reject').addEventListener('click',function(){save({essential:true,analytics:false,advertising:false,choice:'reject_non_essential',updatedAt:new Date().toISOString()});});
    document.getElementById('cc-manage').addEventListener('click',function(){panel(true);});
    document.getElementById('cc-save').addEventListener('click',function(){save({essential:true,analytics:document.getElementById('cc-analytics').checked,advertising:document.getElementById('cc-advertising').checked,choice:'custom',updatedAt:new Date().toISOString()});});
  }
  function bindFooter(){
    var link=document.querySelectorAll('[data-cookie-preferences]');
    link.forEach(function(el){el.addEventListener('click',function(e){e.preventDefault();show();panel(true);var s=read();if(s){document.getElementById('cc-analytics').checked=!!s.analytics;document.getElementById('cc-advertising').checked=!!s.advertising;}});});
  }
  document.addEventListener('DOMContentLoaded',function(){
    build();bindFooter();
    var saved=read();
    if(saved){applyConsent(saved);} else {show();}
  });
})();
