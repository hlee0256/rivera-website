/* ============================================================
   Rivera — shared script (index / projects / about)
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
    /* ----------------------------------------------------------
       MAP_LOCATIONS — the single source of truth for every marker.
       Add a pin = append one object (the same "copy a block"
       ergonomic as a card in projects.html).
         id        unique string
         cat       'project'|'university'|'shopping'|'transit'|'landmark'
         nameEn/nameVi   label
         lat, lng        real coordinates
         address         street address / suburb (a proper noun, not translated)
         descEn/descVi   one calm line of description
         status          OPTIONAL {en,vi} — availability, shown for projects
         url             OPTIONAL — only projects carry a listing link
    ---------------------------------------------------------- */
    var MAP_LOCATIONS=[
      // --- Projects (the brand-brown heroes) ---
      { id:'collins-wharf-aluna', cat:'project', url:'collins-wharf-aluna.html',
        nameEn:'Collins Wharf · Aluna', nameVi:'Collins Wharf · Aluna',
        lat:-37.8202, lng:144.9395,
        address:'989 Collins Street, Docklands VIC',
        descEn:'Waterfront apartments on Collins Wharf, between the Yarra and Victoria Harbour.',
        descVi:'Căn hộ ven sông trên Collins Wharf, giữa sông Yarra và cảng Victoria.',
        status:{ en:'Off the plan · 2029', vi:'Theo bản vẽ · 2029' } },
      { id:'collins-wharf-ancora', cat:'project', url:'collins-wharf-ancora.html',
        nameEn:'Collins Wharf · Ancora', nameVi:'Collins Wharf · Ancora',
        lat:-37.8222, lng:144.9443,
        address:'971 Collins Street, Docklands VIC',
        descEn:'Waterfront apartments by Lendlease where Collins Street meets Victoria Harbour.',
        descVi:'Căn hộ ven nước của Lendlease, nơi phố Collins gặp cảng Victoria Harbour.',
        status:{ en:'Off the plan · 2027', vi:'Theo bản vẽ · 2027' } },
      { id:'380-melbourne', cat:'project', url:'380-melbourne.html',
        nameEn:'380 Melbourne', nameVi:'380 Melbourne',
        lat:-37.8118, lng:144.9601,
        address:'380 Lonsdale Street, Melbourne VIC',
        descEn:'CBD residence steps from Melbourne Central, RMIT and Queen Victoria Market.',
        descVi:'Căn hộ trung tâm, vài bước tới Melbourne Central, RMIT và chợ Queen Victoria.',
        status:{ en:'Move-in ready', vi:'Sẵn sàng dọn vào' } },
      { id:'aspire', cat:'project', url:'aspire.html',
        nameEn:'Aspire Melbourne', nameVi:'Aspire Melbourne',
        lat:-37.8133, lng:144.9556,
        address:'301 King Street, Melbourne VIC',
        descEn:'Tower apartments at the quiet western edge of the grid.',
        descVi:'Căn hộ tầng cao ở rìa tây yên tĩnh của lưới phố.',
        status:{ en:'Move-in ready', vi:'Sẵn sàng dọn vào' } },

      // --- Universities ---
      { id:'unimelb', cat:'university',
        nameEn:'University of Melbourne (Parkville)', nameVi:'Đại học Melbourne (Parkville)',
        lat:-37.7964, lng:144.9612,
        address:'Parkville, VIC',
        descEn:'Leading university, a short tram north in Parkville.',
        descVi:'Đại học hàng đầu, một chuyến tram ngắn lên phía bắc ở Parkville.' },
      { id:'rmit', cat:'university',
        nameEn:'RMIT University', nameVi:'Đại học RMIT',
        lat:-37.8076, lng:144.9632,
        address:'La Trobe Street, Melbourne VIC',
        descEn:'City campus along the north edge of the grid.',
        descVi:'Khuôn viên trung tâm dọc rìa bắc của lưới phố.' },
      { id:'monash-college-docklands', cat:'university',
        nameEn:'Monash College (Docklands)', nameVi:'Monash College (Docklands)',
        lat:-37.8204, lng:144.9450,
        address:'750 Collins Street, Docklands VIC',
        descEn:'Pathway college in Docklands, beside Collins Square.',
        descVi:'Trường dự bị tại Docklands, cạnh Collins Square.' },
      { id:'victoria-university', cat:'university',
        nameEn:'Victoria University (City)', nameVi:'Đại học Victoria (Thành phố)',
        lat:-37.8108, lng:144.9580,
        address:'370 Little Lonsdale Street, Melbourne VIC',
        descEn:'City campus tower on Little Lonsdale Street.',
        descVi:'Khuôn viên trung tâm trên phố Little Lonsdale.' },
      { id:'monash-clayton', cat:'university',
        nameEn:'Monash University (Clayton)', nameVi:'Đại học Monash (Clayton)',
        lat:-37.9106, lng:145.1347,
        address:'Wellington Road, Clayton VIC',
        descEn:'Australia’s largest university, in the south-east at Clayton.',
        descVi:'Đại học lớn nhất nước Úc, ở phía đông nam tại Clayton.' },

      // --- Shopping ---
      { id:'emporium', cat:'shopping',
        nameEn:'Emporium Melbourne', nameVi:'Emporium Melbourne',
        lat:-37.8123, lng:144.9645,
        address:'287 Lonsdale Street, Melbourne VIC',
        descEn:'Connected laneway shopping between Lonsdale and Bourke.',
        descVi:'Khu mua sắm nối liền trong hẻm giữa Lonsdale và Bourke.' },
      { id:'qv', cat:'shopping',
        nameEn:'QV Melbourne', nameVi:'QV Melbourne',
        lat:-37.8110, lng:144.9659,
        address:'Lonsdale & Swanston Street, Melbourne VIC',
        descEn:'Open-air precinct of shops and grocers off Swanston.',
        descVi:'Khu phố mở với cửa hàng và chợ thực phẩm cạnh Swanston.' },

      // --- Transit. The Metro Tunnel stations opened 30 Nov 2025; the new-station
      //     coordinates below are APPROXIMATE (street-level estimates, not surveyed). ---
      { id:'flinders-st', cat:'transit',
        nameEn:'Flinders Street Station', nameVi:'Ga Flinders Street',
        lat:-37.8183, lng:144.9671,
        address:'Flinders Street, Melbourne VIC',
        descEn:'The city’s main rail hub, on the river.',
        descVi:'Ga đường sắt chính của thành phố, bên dòng sông.' },
      { id:'southern-cross', cat:'transit',
        nameEn:'Southern Cross Station', nameVi:'Ga Southern Cross',
        lat:-37.8183, lng:144.9525,
        address:'Spencer Street, Melbourne VIC',
        descEn:'Regional trains and airport coaches on Spencer.',
        descVi:'Tàu liên vùng và xe sân bay trên phố Spencer.' },
      { id:'flagstaff', cat:'transit',
        nameEn:'Flagstaff Station', nameVi:'Ga Flagstaff',
        lat:-37.8113, lng:144.9558,   // approximate
        address:'William Street, Melbourne VIC',
        descEn:'City Loop station at the quiet north-west corner of the grid.',
        descVi:'Ga City Loop ở góc tây bắc yên tĩnh của lưới phố.' },
      { id:'parliament', cat:'transit',
        nameEn:'Parliament Station', nameVi:'Ga Parliament',
        lat:-37.8110, lng:144.9727,
        address:'Spring Street, Melbourne VIC',
        descEn:'City Loop station beneath Spring Street and the gardens.',
        descVi:'Ga City Loop bên dưới phố Spring và khu vườn.' },
      { id:'state-library-station', cat:'transit',
        nameEn:'State Library Station', nameVi:'Ga State Library',
        lat:-37.8094, lng:144.9645,   // approximate (Metro Tunnel, new)
        address:'Swanston Street, Melbourne VIC',
        descEn:'New Metro Tunnel station beneath the library precinct.',
        descVi:'Ga Metro Tunnel mới bên dưới khu thư viện.' },
      { id:'town-hall-station', cat:'transit',
        nameEn:'Town Hall Station', nameVi:'Ga Town Hall',
        lat:-37.8158, lng:144.9668,   // approximate (Metro Tunnel, new)
        address:'Swanston Street, Melbourne VIC',
        descEn:'New Metro Tunnel station by the Town Hall on Swanston.',
        descVi:'Ga Metro Tunnel mới cạnh Tòa thị chính trên phố Swanston.' },
      { id:'parkville-station', cat:'transit',
        nameEn:'Parkville Station', nameVi:'Ga Parkville',
        lat:-37.7983, lng:144.9583,   // approximate (Metro Tunnel, new)
        address:'Grattan Street, Parkville VIC',
        descEn:'New Metro Tunnel station at the university and hospitals.',
        descVi:'Ga Metro Tunnel mới tại khu đại học và bệnh viện.' },

      // --- Landmarks (iconic civic places + market/library; a normal toggleable category) ---
      { id:'town-hall', cat:'landmark',
        nameEn:'Melbourne Town Hall', nameVi:'Tòa thị chính Melbourne',
        lat:-37.8148, lng:144.9665,
        address:'Swanston & Collins Street, Melbourne VIC',
        descEn:'Civic landmark on the Swanston and Collins corner.',
        descVi:'Công trình biểu tượng ở góc Swanston và Collins.' },
      { id:'parliament-house', cat:'landmark',
        nameEn:'Parliament House', nameVi:'Tòa nhà Nghị viện',
        lat:-37.8113, lng:144.9730,
        address:'Spring Street, Melbourne VIC',
        descEn:'State parliament and gardens at the top of the grid.',
        descVi:'Nghị viện bang và vườn cây ở đỉnh lưới phố.' },
      { id:'state-library', cat:'landmark',
        nameEn:'State Library of Victoria', nameVi:'Thư viện Bang Victoria',
        lat:-37.8098, lng:144.9652,
        address:'328 Swanston Street, Melbourne VIC',
        descEn:'The city’s reading rooms and front lawn on Swanston.',
        descVi:'Phòng đọc và bãi cỏ phía trước của thành phố trên phố Swanston.' },
      { id:'fed-square', cat:'landmark',
        nameEn:'Federation Square', nameVi:'Quảng trường Federation',
        lat:-37.8180, lng:144.9691,
        address:'Swanston & Flinders Street, Melbourne VIC',
        descEn:'Riverside plaza for galleries and gatherings.',
        descVi:'Quảng trường bên sông cho phòng tranh và sự kiện.' },
      { id:'queen-vic-market', cat:'landmark',
        nameEn:'Queen Victoria Market', nameVi:'Chợ Queen Victoria',
        lat:-37.8076, lng:144.9568,
        address:'Queen Street, Melbourne VIC',
        descEn:'Heritage produce market just north-west of the grid.',
        descVi:'Khu chợ di sản bán nông sản, ngay phía tây bắc lưới phố.' },
      { id:'melbourne-central', cat:'landmark',
        nameEn:'Melbourne Central', nameVi:'Melbourne Central',
        lat:-37.8102, lng:144.9628,
        address:'211 La Trobe Street, Melbourne VIC',
        descEn:'Major retail and a Metro station under one roof.',
        descVi:'Trung tâm mua sắm lớn và một ga Metro dưới cùng một mái.' }
    ];

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
    var OFF_BY_DEFAULT={ shopping:true, landmark:true };

    // ---- markers: a project is a small solid dot (the hero); every other
    //      destination is a colour-coded icon chip (category fill + cream glyph) ----
    var markersByCat={};
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
      if(!OFF_BY_DEFAULT[loc.cat]) m.addTo(map);   // shopping & landmarks start hidden
      (markersByCat[loc.cat]=markersByCat[loc.cat]||[]).push(m);
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
      // first interaction stops the first-visit nudge and retires the hint
      filterBar.classList.remove('rv-nudge');
      if(hintEl) hintEl.classList.add('gone');
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
})();
