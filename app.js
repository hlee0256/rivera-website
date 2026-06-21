/* ============================================================
   Rivera — shared script (all pages: nav · lang · reveal · card filter ·
   carousel · Leaflet map · enquiry form · AURA detail-page block)
   ============================================================ */
(function(){
  // ---- nav: solid on scroll (skipped on pages that start "onlight") ----
  var nav=document.getElementById('nav');
  if(nav && !nav.classList.contains('onlight')){
    var onScroll=function(){nav.classList.toggle('solid',window.scrollY>40);};
    onScroll();window.addEventListener('scroll',onScroll,{passive:true});
  }

  // ---- mobile menu ----
  var burger=document.getElementById('burger');
  if(burger){
    burger.addEventListener('click',function(){document.body.classList.toggle('menu-open');});
    document.querySelectorAll('.menu a').forEach(function(a){
      a.addEventListener('click',function(){document.body.classList.remove('menu-open');});
    });
  }

  // ---- developer marquee: graceful fallback if a logo file is missing ----
  // (logos live in a local logo/ folder; until they're present, show the name as text)
  document.querySelectorAll('img.dev-logo').forEach(function(img){
    img.addEventListener('error',function(){
      var name=img.getAttribute('alt');
      if(!name){ img.remove(); return; }   // decorative duplicate — just drop it
      var span=document.createElement('span');
      span.className='dev';
      span.textContent=name;
      img.replaceWith(span);
    });
  });

  // ---- language toggle (VI default, EN after explicit toggle) ----
  function setLang(lang){
    if(lang!=='vi') lang='en';
    document.documentElement.setAttribute('lang',lang);
    document.querySelectorAll('[data-en]').forEach(function(el){
      var t=el.getAttribute('data-'+lang);
      if(t!==null) el.textContent=t;
    });
    document.querySelectorAll('[data-en-ph]').forEach(function(el){
      var t=el.getAttribute('data-'+lang+'-ph');
      if(t!==null) el.setAttribute('placeholder',t);
    });
    document.querySelectorAll('.lang span[data-l]').forEach(function(s){
      s.classList.toggle('on',s.getAttribute('data-l')===lang);
    });
    try{localStorage.setItem('rivera-lang',lang);}catch(e){}
  }
  var saved='vi';
  try{saved=localStorage.getItem('rivera-lang')||'vi';}catch(e){}
  setLang(saved);
  var langBtn=document.getElementById('lang');
  if(langBtn){
    langBtn.addEventListener('click',function(){
      var cur=document.documentElement.getAttribute('lang')==='vi'?'vi':'en';
      setLang(cur==='vi'?'en':'vi');
    });
  }

  // ---- scroll reveal ----
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
    },{threshold:.12});
    document.querySelectorAll('.statement .big,.statement .row,.sec-top,.listing,.stat,.approach-grid > *,.featured-in,.enquire-grid > *,.pcard,.note,.founder-grid > *,.cred,.pagehead > *').forEach(function(el,i){
      el.classList.add('rev');el.style.transitionDelay=(i%3)*0.06+'s';io.observe(el);
    });
  }

  // ---- card filter (projects.html gallery + insights.html feed) ----
  //   One handler drives both pages. The filter bar declares what it filters
  //   via data-card (a CSS selector) and data-attr (the attribute to match on
  //   each card); projects.html omits them and falls back to .pcard/data-type.
  var filterBar=document.getElementById('filters');
  if(filterBar){
    var cardSel=filterBar.getAttribute('data-card')||'.pcard';
    var attr=filterBar.getAttribute('data-attr')||'data-type';
    var cards=Array.prototype.slice.call(document.querySelectorAll(cardSel));
    var noResults=document.getElementById('noResults');
    // fill counts
    filterBar.querySelectorAll('.filt').forEach(function(btn){
      var f=btn.getAttribute('data-filter');
      var n=f==='all'?cards.length:cards.filter(function(c){return c.getAttribute(attr)===f;}).length;
      var c=btn.querySelector('.count'); if(c) c.textContent='('+n+')';
    });
    filterBar.addEventListener('click',function(e){
      var btn=e.target.closest('.filt'); if(!btn) return;
      filterBar.querySelectorAll('.filt').forEach(function(b){b.classList.remove('active');});
      btn.classList.add('active');
      var f=btn.getAttribute('data-filter'),shown=0;
      cards.forEach(function(c){
        var match=(f==='all'||c.getAttribute(attr)===f);
        c.classList.toggle('hide',!match);
        if(match) shown++;
      });
      if(noResults) noResults.classList.toggle('show',shown===0);
    });
  }

  // ---- gallery carousel: crossfade + category tabs (project detail pages) ----
  var carousel=document.getElementById('pcarousel');
  if(carousel){
    var allSlides=Array.prototype.slice.call(carousel.querySelectorAll('.pc-slide'));
    var dotsWrap=carousel.querySelector('.pc-dots');
    var tabs=Array.prototype.slice.call(document.querySelectorAll('#pcTabs .pc-tab'));
    var ci=0,cat='all',ctimer=null,visible=[],dots=[];
    function build(){
      visible=allSlides.filter(function(s){return cat==='all'||s.getAttribute('data-cat')===cat;});
      allSlides.forEach(function(s){s.classList.remove('on');s.style.display='none';});
      visible.forEach(function(s){s.style.display='';});
      dotsWrap.innerHTML='';
      dots=visible.map(function(_,k){
        var b=document.createElement('button');b.type='button';
        b.addEventListener('click',function(){cgo(k);creset();});
        dotsWrap.appendChild(b);return b;
      });
      dotsWrap.style.display=visible.length>1?'':'none';
      ci=0;cgo(0);
    }
    function cgo(k){
      if(!visible.length)return;
      ci=(k+visible.length)%visible.length;
      visible.forEach(function(s,j){s.classList.toggle('on',j===ci);});
      dots.forEach(function(d,j){d.classList.toggle('on',j===ci);});
    }
    function cnext(){cgo(ci+1);}
    function cprev(){cgo(ci-1);}
    function creset(){if(ctimer)clearInterval(ctimer);if(visible.length>1)ctimer=setInterval(cnext,4800);}
    var nb=carousel.querySelector('.pc-arrow.next'),pb=carousel.querySelector('.pc-arrow.prev');
    if(nb)nb.addEventListener('click',function(){cnext();creset();});
    if(pb)pb.addEventListener('click',function(){cprev();creset();});
    carousel.addEventListener('mouseenter',function(){if(ctimer)clearInterval(ctimer);});
    carousel.addEventListener('mouseleave',creset);
    var cx0=null;
    carousel.addEventListener('touchstart',function(e){cx0=e.touches[0].clientX;},{passive:true});
    carousel.addEventListener('touchend',function(e){
      if(cx0===null)return;
      var dx=e.changedTouches[0].clientX-cx0;
      if(Math.abs(dx)>40){dx<0?cnext():cprev();creset();}
      cx0=null;
    },{passive:true});
    tabs.forEach(function(t){
      t.addEventListener('click',function(){
        tabs.forEach(function(x){x.classList.remove('on');});
        t.classList.add('on');
        cat=t.getAttribute('data-cat');
        build();creset();
      });
    });
    build();creset();
  }

  // ============================================================
  //  Melbourne map (map.html) — Leaflet + OpenStreetMap, guarded block
  // ============================================================
  var mapEl=document.getElementById('rivera-map');
  if(mapEl && window.L){
    // Marker data lives in map-data.js (a plain window.MAP_LOCATIONS array,
    // loaded before app.js on map.html). Add/edit a pin there, not here.
    var MAP_LOCATIONS=window.MAP_LOCATIONS||[];

    // category → bilingual label
    var CATS={
      project:    { en:'Project',    vi:'Dự án' },
      university: { en:'University', vi:'Đại học' },
      shopping:   { en:'Shopping',   vi:'Mua sắm' },
      transit:    { en:'Transit',    vi:'Giao thông' },
      landmark:   { en:'Landmark',   vi:'Địa danh' }
    };
    var VIEW_LISTING={ en:'View listing', vi:'Xem chi tiết' };

    /* ----------------------------------------------------------
       CITIES — future-proofing only. A second city (e.g. Sydney)
       drops in as another entry with its own center, preset views
       and locations array; no city-switcher UI or Sydney data now.
       MAP_LOCATIONS stays the single source of truth for Melbourne.
    ---------------------------------------------------------- */
    var CITIES={
      melbourne:{
        center:[-37.8136,144.9631], zoom:15,   // default framing — the Hoddle Grid
        views:{
          cbd:       { center:[-37.8136,144.9631], zoom:15 },   // the Hoddle Grid (default)
          greater:   { center:[-37.8205,144.9560], zoom:14 },   // + Docklands & Southbank
          melbourne: { center:[-37.8120,144.9610], zoom:13 }    // wider — outer projects in view
        },
        locations:MAP_LOCATIONS
      }
      // sydney:{ center:[..], zoom:.., views:{..}, locations:[ /* ... */ ] }  // add later
    };
    var ACTIVE_CITY='melbourne';
    var city=CITIES[ACTIVE_CITY];

    function curLang(){ return document.documentElement.getAttribute('lang')==='vi'?'vi':'en'; }
    function esc(s){ return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }

    // ---- the map: framed on the Hoddle Grid. A clean CARTO "Voyager" basemap
    //      (OpenStreetMap data, rendered minimally — none of the dense shop/parking/POI
    //      icon clutter of raw OSM) so our markers are the points of interest. ----
    var map=L.map(mapEl,{ center:city.center, zoom:city.zoom, scrollWheelZoom:true, zoomControl:true });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',{
      subdomains:'abcd', minZoom:11, maxZoom:20,
      attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(map);

    // ---- marker glyphs: a thin line icon per non-project category (brand
    //      inline-SVG style). Projects keep their solid dot, no glyph. ----
    var GLYPH={
      university:'<path d="M12 4 1.8 9 12 14 22.2 9 12 4Z"/><path d="M6 11.2V16c0 1.3 2.7 2.6 6 2.6s6-1.3 6-2.6v-4.8"/><path d="M22.2 9v5"/>',
      shopping:'<path d="M5.5 8h13l-1 12h-11l-1-12Z"/><path d="M8.7 8V6.6a3.3 3.3 0 0 1 6.6 0V8"/>',
      transit:'<rect x="5.5" y="3.5" width="13" height="13" rx="3"/><path d="M5.5 11h13"/><path d="M9.3 16.5 7.3 20.5M14.7 16.5 16.7 20.5"/>',
      landmark:'<path d="M3.2 9.5 12 4.2l8.8 5.3"/><path d="M5.5 10v8M9.2 10v8M14.8 10v8M18.5 10v8"/><path d="M3.5 20.5h17"/>'
    };
    // categories hidden on first load (the visitor toggles them on)
    var OFF_BY_DEFAULT={ shopping:true, transit:true, landmark:true };

    // ---- markers: a project is a small solid dot (the hero); every other
    //      destination is a colour-coded icon chip (category fill + cream glyph) ----
    var markersByCat={}, markerById={};
    city.locations.forEach(function(loc){
      var isProj=loc.cat==='project';
      var sz=isProj?16:26;
      var html=isProj
        ? '<span class="rv-hero"></span>'
        : '<span class="rv-mk rv-mk--'+loc.cat+'"><svg viewBox="0 0 24 24" aria-hidden="true">'+(GLYPH[loc.cat]||'')+'</svg></span>';
      var icon=L.divIcon({ className:'', iconSize:[sz,sz], iconAnchor:[sz/2,sz/2], html:html });
      var m=L.marker([loc.lat,loc.lng],{ icon:icon, riseOnHover:true });
      // hover → quick tooltip, click → detailed popup; both read the live language
      m.bindTooltip(function(){ return cardHtml(loc,false); },{ direction:'top', offset:[0,isProj?-10:-14], className:'rv-tip', opacity:1 });
      m.bindPopup(function(){ return cardHtml(loc,true); },{ className:'rv-pop', maxWidth:268, minWidth:212, autoPanPadding:[26,26] });
      if(!OFF_BY_DEFAULT[loc.cat]) m.addTo(map);   // transit, shopping & landmarks start hidden
      (markersByCat[loc.cat]=markersByCat[loc.cat]||[]).push(m);
      markerById[loc.id]=m;
    });

    // shared card markup; detail=true adds the "View listing" link for projects
    function cardHtml(loc,detail){
      var l=curLang(), cat=CATS[loc.cat];
      var html='<div class="rv-card">'
        +'<div class="rv-eyebrow">'+esc(cat[l])+'</div>'
        +'<div class="rv-name">'+esc(loc[l==='vi'?'nameVi':'nameEn'])+'</div>'
        +'<div class="rv-addr">'+esc(loc.address)+'</div>'
        +'<div class="rv-desc">'+esc(loc[l==='vi'?'descVi':'descEn'])+'</div>';
      if(loc.status) html+='<div class="rv-status">'+esc(loc.status[l])+'</div>';
      if(detail && loc.cat==='project' && loc.url)
        html+='<a class="rv-btn" href="'+esc(loc.url)+'">'+esc(VIEW_LISTING[l])+' <span aria-hidden="true">&#8594;</span></a>';
      return html+'</div>';
    }

    // ---- category filters (each pill toggles its markers on/off) ----
    var filterBar=document.getElementById('rv-filters');
    var hintEl=document.getElementById('rv-hint');
    filterBar.addEventListener('click',function(e){
      var btn=e.target.closest('.filt'); if(!btn) return;
      // first interaction stops the first-visit nudge and retires the hint (fade, then remove)
      filterBar.classList.remove('rv-nudge');
      if(hintEl && !hintEl.classList.contains('gone')){
        hintEl.classList.add('gone');
        setTimeout(function(){ if(hintEl) hintEl.style.display='none'; },450);
      }
      btn.classList.toggle('active');
      var cat=btn.getAttribute('data-cat'), on=btn.classList.contains('active');
      (markersByCat[cat]||[]).forEach(function(m){ on?m.addTo(map):map.removeLayer(m); });
    });

    // ---- markers scale with zoom (so they don't blob together when zoomed out, and
    //      breathe when zoomed in). Reference zoom 15 = scale 1.0, clamped 0.5–1.3. The
    //      relative size hierarchy (project larger) is baked into the icon box, so it holds
    //      at every zoom. Pins read --rv-pin-scale and transform about their own centre,
    //      keeping each one anchored on its point (tooltip/popup anchors stay correct). ----
    function pinScale(z){ return Math.max(0.5, Math.min(1.3, 1 + (z - 15) * 0.12)); }
    function applyScale(){ mapEl.style.setProperty('--rv-pin-scale', pinScale(map.getZoom()).toFixed(3)); }
    map.on('zoom zoomend', applyScale);
    applyScale();

    // ---- view presets: re-frame the SAME map instance (no second map) ----
    var viewsBar=document.getElementById('rv-views');
    var reduceMotion=window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var fromPreset=false;
    function clearPresetActive(){ if(viewsBar) viewsBar.querySelectorAll('.rv-view').forEach(function(b){ b.classList.remove('active'); }); }
    function goView(key){
      var v=city.views && city.views[key]; if(!v) return;
      fromPreset=true;
      if(reduceMotion) map.setView(v.center, v.zoom, { animate:false });
      else map.flyTo(v.center, v.zoom);
    }
    if(viewsBar){
      viewsBar.addEventListener('click',function(e){
        var b=e.target.closest('.rv-view'); if(!b) return;
        clearPresetActive(); b.classList.add('active');
        goView(b.getAttribute('data-view'));
      });
    }
    // a manual pan or a manual zoom clears the active preset (a preset move keeps it)
    map.on('dragstart', clearPresetActive);
    map.on('zoomstart', function(){ if(!fromPreset) clearPresetActive(); });
    map.on('moveend', function(){ fromPreset=false; });

    // close any open popup when the language flips, so it reopens in the new language
    var langBtn2=document.getElementById('lang');
    if(langBtn2) langBtn2.addEventListener('click',function(){ map.closePopup(); });

    // ---- project search: type a residence, pick it, the map flies there and opens it ----
    var PROJECTS=MAP_LOCATIONS.filter(function(l){ return l.cat==='project'; });
    var sWrap=document.getElementById('rv-search');
    var sInput=document.getElementById('rv-search-input');
    var sList=document.getElementById('rv-search-list');
    var sClear=document.getElementById('rv-search-clear');
    if(sWrap && sInput && sList){
      var matches=[], activeIdx=-1;
      // accent-insensitive folding so "docklands" or VI text without marks still match
      var fold=function(s){ return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/đ/g,'d'); };
      var nameOf=function(loc){ return loc[curLang()==='vi'?'nameVi':'nameEn']; };
      var openList=function(){ sWrap.classList.add('open'); sInput.setAttribute('aria-expanded','true'); };
      var closeList=function(){ sWrap.classList.remove('open'); sInput.setAttribute('aria-expanded','false'); activeIdx=-1; };
      var render=function(){
        sList.innerHTML='';
        if(!matches.length){
          var em=document.createElement('li'); em.className='rv-sr-empty';
          em.textContent=curLang()==='vi'?'Không tìm thấy dự án nào.':'No matching residence.';
          sList.appendChild(em); return;
        }
        matches.forEach(function(loc,i){
          var li=document.createElement('li');
          li.setAttribute('role','option'); li.setAttribute('data-id',loc.id);
          li.setAttribute('aria-selected', i===activeIdx?'true':'false');
          var nm=document.createElement('span'); nm.className='rv-sr-name'; nm.textContent=nameOf(loc);
          var ad=document.createElement('span'); ad.className='rv-sr-addr'; ad.textContent=loc.address;
          li.appendChild(nm); li.appendChild(ad); sList.appendChild(li);
        });
      };
      var update=function(){
        var q=sInput.value.trim();
        sWrap.classList.toggle('has-text', q.length>0);
        if(!q){ matches=[]; closeList(); return; }
        var fq=fold(q);
        matches=PROJECTS.filter(function(loc){
          return fold(loc.nameEn).indexOf(fq)>-1 || fold(loc.nameVi).indexOf(fq)>-1 || fold(loc.address).indexOf(fq)>-1;
        }).slice(0,8);
        activeIdx=matches.length?0:-1;
        render(); openList();
      };
      // if a category is toggled off, switch it back on so the popup can show
      var ensureCat=function(cat){
        var pill=filterBar.querySelector('.filt[data-cat='+cat+']');
        if(pill && !pill.classList.contains('active')){
          pill.classList.add('active');
          (markersByCat[cat]||[]).forEach(function(m){ m.addTo(map); });
        }
      };
      var choose=function(loc){
        if(!loc) return;
        sInput.value=nameOf(loc); sWrap.classList.add('has-text');
        closeList(); sInput.blur();              // dismiss the mobile keyboard
        ensureCat(loc.cat);
        var m=markerById[loc.id]; if(!m) return;
        var ll=m.getLatLng(), z=Math.max(map.getZoom(),16);
        if(reduceMotion){ map.setView(ll,z,{animate:false}); m.openPopup(); }
        else { map.flyTo(ll,z); map.once('moveend', function(){ m.openPopup(); }); }
      };
      sInput.addEventListener('input', update);
      sInput.addEventListener('focus', function(){ if(sInput.value.trim()) update(); });
      sInput.addEventListener('keydown', function(e){
        if(e.key==='ArrowDown'){ e.preventDefault(); if(!sWrap.classList.contains('open')){ update(); return; }
          if(matches.length){ activeIdx=(activeIdx+1)%matches.length; render(); } }
        else if(e.key==='ArrowUp'){ e.preventDefault();
          if(matches.length){ activeIdx=(activeIdx-1+matches.length)%matches.length; render(); } }
        else if(e.key==='Enter'){ if(matches.length){ e.preventDefault(); choose(matches[activeIdx>-1?activeIdx:0]); } }
        else if(e.key==='Escape'){ sInput.value=''; sWrap.classList.remove('has-text'); closeList(); }
      });
      sList.addEventListener('click', function(e){
        var li=e.target.closest('li[data-id]'); if(!li) return;
        var id=li.getAttribute('data-id');
        choose(PROJECTS.filter(function(p){ return p.id===id; })[0]);
      });
      if(sClear) sClear.addEventListener('click', function(){
        sInput.value=''; matches=[]; sWrap.classList.remove('has-text'); closeList(); sInput.focus();
      });
      document.addEventListener('click', function(e){ if(!sWrap.contains(e.target)) closeList(); });
      if(langBtn2) langBtn2.addEventListener('click', closeList);   // labels differ per language
    }

    // keep the map sized correctly after first layout and on resize
    setTimeout(function(){ map.invalidateSize(); },0);
    window.addEventListener('resize',function(){ map.invalidateSize(); });
  }

  // ---- enquire form: POST to Formspree, fall back to on-page thanks ----
  document.querySelectorAll('form.efrm').forEach(function(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var email=f.querySelector('input[type=email]');
      if(!email.value||email.value.indexOf('@')===-1){email.focus();email.closest('.fld').style.borderColor='var(--brown)';return;}
      var action=f.getAttribute('action')||'';
      if(!action||action.indexOf('YOUR_FORM_ID')!==-1){f.classList.add('sent');return;}
      var data=new FormData(f);
      fetch(action,{method:'POST',body:data,headers:{'Accept':'application/json'}})
        .then(function(){f.classList.add('sent');})
        .catch(function(){f.classList.add('sent');});
    });
  });

  // ---- AURA landing film: hand its playback time to the detail-page hero (seamless zoom) ----
  var auFeat=document.querySelector('.featured .featvid');
  if(auFeat){
    var auSaveT=function(){ try{ sessionStorage.setItem('aura-hero-t', String(auFeat.currentTime||0)); }catch(e){} };
    var auFeatLink=document.querySelector('.featured a[href="aura-melbourne-square.html"]');
    if(auFeatLink) auFeatLink.addEventListener('click', auSaveT);
    window.addEventListener('pagehide', auSaveT);
  }

  // ---- AURA at Melbourne Square (aura-melbourne-square.html) ----
  // Page-scoped: own reveal observer + altitude rail. Does NOT touch the
  // shared reveal list above. Guarded so it never runs on other pages.
  var auPage=document.getElementById('aura-page');
  if(auPage){
    // resume the hero film where the landing film left off (seamless zoom continuity)
    var auHeroVid=auPage.querySelector('video.hero-vid');
    if(auHeroVid){
      var auT=0; try{ auT=parseFloat(sessionStorage.getItem('aura-hero-t'))||0; sessionStorage.removeItem('aura-hero-t'); }catch(e){}
      if(auT>0.1){
        var auSeek=function(){ var d=auHeroVid.duration; try{ auHeroVid.currentTime=(d&&isFinite(d))?(auT%d):auT; }catch(e){} };
        if(auHeroVid.readyState>=1) auSeek(); else auHeroVid.addEventListener('loadedmetadata', auSeek, {once:true});
      }
    }
    var auReduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(!auReduce&&'IntersectionObserver' in window){
      var auIo=new IntersectionObserver(function(es){
        es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');auIo.unobserve(e.target);}});
      },{threshold:.12});
      auPage.querySelectorAll('.au-rev').forEach(function(el,i){el.style.transitionDelay=(i%3)*0.06+'s';auIo.observe(el);});
    }else{
      auPage.querySelectorAll('.au-rev').forEach(function(el){el.classList.add('in');});
    }
    var auRail=document.getElementById('au-rail');
    var auBands=auPage.querySelectorAll('[data-band]');
    if(auRail&&auBands.length&&'IntersectionObserver' in window){
      var auBandIo=new IntersectionObserver(function(es){
        es.forEach(function(e){
          if(e.isIntersecting){
            var b=e.target.getAttribute('data-band');
            auRail.setAttribute('data-active',b);
            var dot=auRail.querySelector('.au-rail-dot');
            var tick=auRail.querySelector('.au-rail-tick[data-band="'+b+'"]');
            if(dot&&tick) dot.style.top=tick.offsetTop+'px';
          }
        });
      },{rootMargin:'-45% 0px -45% 0px'});
      auBands.forEach(function(s){auBandIo.observe(s);});
    }
    var auStrip=auPage.querySelector('.au-strip');var auProg=auPage.querySelector('.au-strip-prog');
    if(auStrip&&auProg) auStrip.addEventListener('scroll',function(){
      var max=auStrip.scrollWidth-auStrip.clientWidth;
      auProg.style.transform='scaleX('+(max>0?Math.max(.05,auStrip.scrollLeft/max):.18)+')';
    },{passive:true});
  }
})();
