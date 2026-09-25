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
      m._riveraId=loc.id;
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
      if(loc.facts) html+='<div class="rv-facts">'+esc(loc.facts[l])+'</div>';
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

    // ---- hooks for the Map 2.0 page block (rail + precinct shortcuts) ----
    window.riveraMap={
      map:map,
      focus:function(id){
        var m=markerById[id]; if(!m) return;
        var loc=MAP_LOCATIONS.filter(function(l){ return l.id===id; })[0];
        if(loc){
          var pill=filterBar.querySelector('.filt[data-cat='+loc.cat+']');
          if(pill && !pill.classList.contains('active')){ pill.classList.add('active'); (markersByCat[loc.cat]||[]).forEach(function(mk){ mk.addTo(map); }); }
        }
        var ll=m.getLatLng(), z=Math.max(map.getZoom(),16);
        if(reduceMotion){ map.setView(ll,z,{animate:false}); m.openPopup(); }
        else { map.flyTo(ll,z); map.once('moveend', function(){ m.openPopup(); }); }
      },
      view:function(center,zoom){
        clearPresetActive(); map.closePopup(); fromPreset=true;
        if(reduceMotion) map.setView(center,zoom,{animate:false}); else map.flyTo(center,zoom);
      }
    };

    // keep the map sized correctly after first layout and on resize
    setTimeout(function(){ map.invalidateSize(); },0);
    window.addEventListener('resize',function(){ map.invalidateSize(); });
  }

  // ============================================================
  //  Map 2.0 page block (map.html, gated on #map2): the dawn-to-night
  //  hero, the residence rail and the precinct shortcuts. Reads
  //  window.MAP_LOCATIONS and the window.riveraMap hooks exposed above.
  // ============================================================
  var m2=document.getElementById('map2');
  if(m2){
    var m2Lang=function(){ return document.documentElement.getAttribute('lang')==='vi'?'vi':'en'; };
    var m2Reduce=window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---- 1. The sky: one still photograph, graded through a full day.
    //      A loop of DAY_LEN seconds maps to 24 hours (night is compressed so
    //      the golden hour and the blue hour get most of the loop). Every
    //      visual is a keyframe in HOUR space, interpolated linearly, and
    //      written to CSS custom properties on the hero. ----
    var hero=document.getElementById('m2-hero');
    var skyLabel=document.getElementById('m2-sky-label');
    var skyClock=document.getElementById('m2-sky-clock');
    var skyRange=document.getElementById('m2-sky-range');
    var DAY_LEN=110;                                 // seconds per full day
    // loop position (0..1) → hour of day; night runs faster than day
    var TIME_WARP=[[0,5.4],[.14,7.6],[.42,15.5],[.56,18.2],[.68,20.2],[.84,24.6],[1,29.4]];
    // hour → [brightness, saturate, contrast, sepia, hue, dawn, dusk, night, glow, stars, haze]
    var KEYS=[
      [ 4.8,[.34,.55,1.10,.10,-16, 0,  0, .78,.55,.90,.10]],   // deep night
      [ 5.6,[.44,.62,1.08,.14,-12,.18, 0, .62,.55,.70,.14]],   // first light
      [ 6.6,[.90,.88,1.02,.18, -2,.50, 0, .10,.22,.10,.16]],   // dawn
      [ 8.0,[1.02,.92,1.00,.06,  2,.22, 0,   0,  0,  0,.12]],  // morning
      [12.5,[1.10,.86,.98,0,     4, 0,  0,   0,  0,  0,.06]],  // midday, a little bleached
      [16.0,[1.04,.96,1.00,.04,  2, 0,.10,   0,  0,  0,.06]],  // afternoon
      [17.8,[1.00,1.02,1.02,.06,  0, 0,.42,   0,.10,  0,.04]], // golden hour (the photo itself)
      [18.8,[.86,.98,1.04,.10, -3, 0,.66,.08,.28,  0,.06]],    // sunset
      [19.8,[.60,.80,1.08,.12, -9, 0,.40,.34,.45,.15,.08]],    // blue hour
      [21.0,[.42,.62,1.10,.12,-14, 0,.10,.66,.55,.55,.10]],    // night falls
      [24.0,[.34,.55,1.10,.10,-16, 0,  0, .78,.55,.90,.10]]    // deep night
    ];
    var LABELS={
      dawn:  { en:'Dawn',        vi:'Bình minh' },
      morning:{ en:'Morning',    vi:'Buổi sáng' },
      midday:{ en:'Midday',      vi:'Giữa trưa' },
      afternoon:{ en:'Afternoon',vi:'Buổi chiều' },
      golden:{ en:'Golden hour', vi:'Giờ vàng' },
      dusk:  { en:'Dusk',        vi:'Hoàng hôn' },
      blue:  { en:'Blue hour',   vi:'Giờ xanh' },
      night: { en:'Night',       vi:'Đêm' }
    };
    function lerp(a,b,t){ return a+(b-a)*t; }
    function interp(table,x){
      if(x<=table[0][0]) return table[0][1];
      for(var i=1;i<table.length;i++){
        if(x<=table[i][0]){
          var a=table[i-1],b=table[i],t=(x-a[0])/(b[0]-a[0]);
          if(typeof a[1]==='number') return lerp(a[1],b[1],t);
          return a[1].map(function(v,k){ return lerp(v,b[1][k],t); });
        }
      }
      return table[table.length-1][1];
    }
    function phaseOf(h){
      if(h<5.4) return 'night'; if(h<7.2) return 'dawn'; if(h<11) return 'morning';
      if(h<14.5) return 'midday'; if(h<16.8) return 'afternoon'; if(h<18.4) return 'golden';
      if(h<19.4) return 'dusk'; if(h<20.4) return 'blue'; return 'night';
    }
    function paintHour(h){
      var v=interp(KEYS,h%24), st=hero.style;
      st.setProperty('--sky-filter','brightness('+v[0].toFixed(3)+') saturate('+v[1].toFixed(3)+') contrast('+v[2].toFixed(3)+') sepia('+v[3].toFixed(3)+') hue-rotate('+v[4].toFixed(1)+'deg)');
      st.setProperty('--dawn',v[5].toFixed(3)); st.setProperty('--dusk',v[6].toFixed(3));
      st.setProperty('--night',v[7].toFixed(3)); st.setProperty('--glow',v[8].toFixed(3));
      st.setProperty('--stars',v[9].toFixed(3)); st.setProperty('--haze',v[10].toFixed(3));
      var ph=phaseOf(h%24), l=m2Lang();
      if(skyLabel){ skyLabel.setAttribute('data-en',LABELS[ph].en); skyLabel.setAttribute('data-vi',LABELS[ph].vi); skyLabel.textContent=LABELS[ph][l]; }
      if(skyClock){ var hh=Math.floor(h%24), mm=Math.floor((h%1)*60); skyClock.textContent=(hh<10?'0':'')+hh+':'+(mm<10?'0':'')+mm; }
    }
    // stars: a scatter of warm-white points in the upper sky, each with its own twinkle
    var starField=document.getElementById('m2-stars');
    if(starField){
      var frag=document.createDocumentFragment();
      for(var si=0;si<90;si++){
        var s=document.createElement('i');
        var big=Math.random()<.18;
        s.style.left=(Math.random()*100).toFixed(2)+'%';
        s.style.top=(Math.pow(Math.random(),1.4)*46).toFixed(2)+'%';
        s.style.width=s.style.height=(big?3:1.8)+'px';
        s.style.opacity=(0.35+Math.random()*0.65).toFixed(2);
        s.style.animationDelay=(-Math.random()*6).toFixed(2)+'s';
        s.style.animationDuration=(3+Math.random()*4).toFixed(2)+'s';
        frag.appendChild(s);
      }
      starField.appendChild(frag);
    }
    if(hero){
      if(m2Reduce){ paintHour(17.8); if(skyRange) skyRange.value=17.8; }
      else {
        var t0=performance.now(), offset=DAY_LEN*0.539, holdUntil=0, held=false;   // start on the golden hour, the photograph itself
        var frame=function(now){
          if(!held){
            var p=(((now-t0)/1000+offset)%DAY_LEN)/DAY_LEN;
            var h=interp(TIME_WARP,p)%24;
            paintHour(h);
            if(skyRange && document.activeElement!==skyRange) skyRange.value=h.toFixed(2);
          } else if(now>holdUntil){ held=false; }
          requestAnimationFrame(frame);
        };
        requestAnimationFrame(frame);
        // the visitor can scrub the day; the loop resumes from there after a pause
        if(skyRange){
          var scrub=function(){
            var h=parseFloat(skyRange.value); paintHour(h);
            held=true; holdUntil=performance.now()+5000;
            // find the loop position that corresponds to this hour and resume from it
            for(var i=1;i<TIME_WARP.length;i++){
              var a=TIME_WARP[i-1], b=TIME_WARP[i];
              var hh=h<5.4?h+24:h;
              if(hh>=a[1] && hh<=b[1]){ var p=lerp(a[0],b[0],(hh-a[1])/(b[1]-a[1])); offset=p*DAY_LEN-((performance.now()-t0)/1000); break; }
            }
          };
          skyRange.addEventListener('input',scrub);
        }
      }
    }

    // ---- 2. Residence rail: every project in MAP_LOCATIONS, generated so it can
    //      never drift from the map. Leaf spans carry data-en/data-vi so the shared
    //      language toggle keeps working on them. ----
    var rail=document.getElementById('m2-rail');
    var locs=window.MAP_LOCATIONS||[];
    var projects=locs.filter(function(l){ return l.cat==='project'; });
    // live counts in the hero (so they never drift from the data)
    document.querySelectorAll('[data-count]').forEach(function(el){
      var cat=el.getAttribute('data-count');
      el.textContent=locs.filter(function(l){ return l.cat===cat; }).length;
    });
    function leaf(tag,cls,en,vi){
      var el=document.createElement(tag); if(cls) el.className=cls;
      el.setAttribute('data-en',en); el.setAttribute('data-vi',vi);
      el.textContent=m2Lang()==='vi'?vi:en; return el;
    }
    if(rail){
      projects.forEach(function(loc,i){
        var card=document.createElement('article'); card.className='m2-res'; card.setAttribute('data-id',loc.id);
        card.setAttribute('tabindex','0'); card.setAttribute('role','button');
        var ph=document.createElement('div'); ph.className='photo m2-res-ph'+(loc.img?' has-img':'');
        if(loc.img) ph.style.backgroundImage='url("'+loc.img+'")';
        var num=document.createElement('span'); num.className='m2-res-n'; num.textContent=(i<9?'0':'')+(i+1);
        ph.appendChild(num);
        var body=document.createElement('div'); body.className='m2-res-b';
        body.appendChild(leaf('h3','m2-res-h',loc.nameEn,loc.nameVi));
        var sub=document.createElement('div'); sub.className='m2-res-sub'; sub.textContent=loc.suburb||loc.address;
        body.appendChild(sub);
        if(loc.status) body.appendChild(leaf('span','m2-res-st',loc.status.en,loc.status.vi));
        card.appendChild(ph); card.appendChild(body);
        var go=function(){
          rail.querySelectorAll('.m2-res.on').forEach(function(c){ c.classList.remove('on'); });
          card.classList.add('on');
          if(window.riveraMap) window.riveraMap.focus(loc.id);
          if(window.innerWidth<900){ var mapBox=document.getElementById('rivera-map'); if(mapBox) mapBox.scrollIntoView({behavior:m2Reduce?'auto':'smooth',block:'center'}); }
        };
        card.addEventListener('click',go);
        card.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); go(); } });
        rail.appendChild(card);
      });
      var count=document.getElementById('m2-count'); if(count) count.textContent=projects.length;
      // keep the rail in step when a marker is opened from the map itself
      if(window.riveraMap && window.riveraMap.map){
        window.riveraMap.map.on('popupopen',function(e){
          var id=e.popup && e.popup._source && e.popup._source._riveraId; if(!id) return;
          rail.querySelectorAll('.m2-res').forEach(function(c){ c.classList.toggle('on',c.getAttribute('data-id')===id); });
        });
      }
    }

    // ---- 3. Precinct shortcuts: fly the map to a district ----
    document.querySelectorAll('[data-fly]').forEach(function(btn){
      btn.addEventListener('click',function(){
        var parts=btn.getAttribute('data-fly').split(',').map(parseFloat);
        if(window.riveraMap) window.riveraMap.view([parts[0],parts[1]],parts[2]);
        var mapBox=document.getElementById('rivera-map'); if(mapBox) mapBox.scrollIntoView({behavior:m2Reduce?'auto':'smooth',block:'center'});
      });
    });

    // ---- 4. Reveal the Map 2.0 sections with the shared observer pattern ----
    if('IntersectionObserver' in window){
      var io2=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io2.unobserve(e.target); } }); },{threshold:.12});
      document.querySelectorAll('.m2-sec-top,.m2-prec,.m2-stat,.m2-news,.m2-mk,.m2-way,.m2-cta-in > *').forEach(function(el,i){
        el.classList.add('rev'); el.style.transitionDelay=(i%3)*0.06+'s'; io2.observe(el);
      });
    }
    // ---- 4. The flight: a 1:1 Melbourne rendered in Blender. The intro flies in from a plane
    //      window and lands on the CBD stop; the precinct buttons fly between three stops.
    //      Every leg starts and ends on a shared still, so any cut lands on the same frame.
    var fl=document.getElementById('m2-flight');
    if(fl){
      var heroEl=document.getElementById('m2-hero');
      var chip=document.getElementById('m2-zonechip');
      var zoneBtns=[].slice.call(document.querySelectorAll('.m2-zone'));
      var zoneLabel=document.getElementById('m2-zone-label'), zoneName=document.getElementById('m2-zone-name');
      var zoneRes=document.getElementById('m2-zoneres'), skipBtn=document.getElementById('m2-skip');
      var vids={}, stills={};
      var small=window.matchMedia && window.matchMedia('(max-width: 760px)').matches;
      [].forEach.call(fl.querySelectorAll('video'),function(v){
        if(small) v.src=v.getAttribute('src').replace(/\.mp4$/,'-m.mp4');     // 720p copies for phones
        vids[v.getAttribute('data-leg')]=v;
      });
      [].forEach.call(fl.querySelectorAll('img'),function(i){ stills[i.getAttribute('data-zone')]=i; });
      var ZONE={
        cbd:{en:'Melbourne CBD',vi:'Trung tâm Melbourne',suburbs:['Melbourne CBD','Melbourne']},
        docklands:{en:'Docklands',vi:'Docklands',suburbs:['Docklands']},
        southbank:{en:'Southbank',vi:'Southbank',suburbs:['Southbank']}
      };
      var LAB={landed:{en:'Now over',vi:'Đang ở trên'},flying:{en:'Flying to',vi:'Đang bay tới'},intro:{en:'Approaching',vi:'Đang bay vào'}};
      var cur=null, busy=false;
      function label(k,z){ var l=m2Lang(); zoneLabel.textContent=LAB[k][l]; zoneLabel.setAttribute('data-en',LAB[k].en); zoneLabel.setAttribute('data-vi',LAB[k].vi); zoneName.textContent=z?ZONE[z][l]:'Melbourne'; }
      function residences(z){
        zoneRes.innerHTML='';
        (window.MAP_LOCATIONS||[]).filter(function(p){ return p.cat==='project' && p.url && ZONE[z].suburbs.indexOf(p.suburb)!==-1; }).forEach(function(p){
          var a=document.createElement('a'); a.href=p.url; a.textContent=m2Lang()==='vi'?p.nameVi:p.nameEn; zoneRes.appendChild(a);
        });
      }
      function land(z){
        Object.keys(stills).forEach(function(k){ stills[k].classList.toggle('on',k===z); });
        Object.keys(vids).forEach(function(k){ vids[k].classList.remove('on'); });
        cur=z; busy=false;
        zoneBtns.forEach(function(b){ b.disabled=false; b.setAttribute('aria-pressed',String(b.getAttribute('data-zone')===z)); });
        chip.classList.remove('is-flying'); chip.classList.add('is-landed'); label('landed',z); residences(z);
        // warm the legs out of this stop
        Object.keys(vids).forEach(function(k){ if(k.indexOf(z+'>')===0 && vids[k].preload==='none'){ vids[k].preload='auto'; vids[k].load(); } });
      }
      function fly(key,to){
        var v=vids[key];
        if(m2Reduce||!v){ land(to); return; }
        busy=true; chip.classList.add('is-flying'); label(key==='intro'?'intro':'flying',to);
        zoneBtns.forEach(function(b){ b.disabled=true; });
        var done=false, finish=function(){ if(done) return; done=true; v.onended=null; land(to); };
        v.onended=finish;
        v.onerror=finish;
        var show=function(){ v.classList.add('on'); Object.keys(stills).forEach(function(k){ stills[k].classList.remove('on'); }); };
        try{ v.currentTime=0; }catch(e){}
        var p=v.play();
        if(p&&p.then) p.then(show,finish); else show();
      }
      zoneBtns.forEach(function(b){ b.addEventListener('click',function(){ var to=b.getAttribute('data-zone'); if(busy||to===cur) return; fly(cur+'>'+to,to); }); });
      skipBtn.addEventListener('click',function(){ var v=vids.intro; if(v){ v.onended=null; v.pause(); } land('cbd'); });
      // a hidden tab pauses video: resume on return, or land if it will not play
      document.addEventListener('visibilitychange',function(){
        if(document.hidden||!busy) return;
        Object.keys(vids).forEach(function(k){ var v=vids[k]; if(v.classList.contains('on')&&v.paused&&!v.ended){ var p=v.play(); if(p&&p.catch) p.catch(function(){ if(v.onended) v.onended(); }); } });
      });
      heroEl.classList.add('m2-flying');
      label('intro',null);
      if(m2Reduce){ land('cbd'); }
      else { fly('intro','cbd'); }
      // language switch re-renders the chip labels
      var langBtn=document.getElementById('lang'); if(langBtn) langBtn.addEventListener('click',function(){ setTimeout(function(){ if(cur){ label('landed',cur); residences(cur); } },0); });
    }

  }

  // ---- enquire form: same Apps Script backend as enquire.html ----
  var FORM_ENDPOINT = "https://script.google.com/macros/s/AKfycbwurdZI9R-458lfe4Aelh67iBZJ4-8ZAxO4iTIANxkyLkSsqjkrTHJb0fN8nv8NhV52Qw/exec";
  document.querySelectorAll('form.efrm').forEach(function(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var email=f.querySelector('input[type=email]');
      var nameI=f.querySelector('input[name=name]');
      if(!email||!email.value||email.value.indexOf('@')===-1){if(email){email.focus();if(email.closest('.fld'))email.closest('.fld').style.borderColor='var(--brown)';}return;}
      var looking=((f.querySelector('[name=looking]')||{}).value||'').trim();
      var message=((f.querySelector('[name=message]')||{}).value||'').trim();
      var payload={
        name:     ((nameI&&nameI.value)||'').trim(),
        phone:    '',
        email:    email.value.trim(),
        interest: looking ? [looking] : ['unsure'],
        intent:   'exploring',
        message:  message
      };
      fetch(FORM_ENDPOINT,{
        method:'POST',
        mode:'no-cors',
        headers:{'Content-Type':'text/plain;charset=utf-8'},
        body:JSON.stringify(payload)
      }).then(function(){f.classList.add('sent');})
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
