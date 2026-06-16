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
    document.querySelectorAll('.statement .big,.statement .row,.sec-top,.listing,.stat,.approach-grid > *,.featured-in,.enquire-grid > *,.pcard,.founder-grid > *,.cred,.pagehead > *').forEach(function(el,i){
      el.classList.add('rev');el.style.transitionDelay=(i%3)*0.06+'s';io.observe(el);
    });
  }

  // ---- project filter (projects.html) ----
  var filterBar=document.getElementById('filters');
  if(filterBar){
    var cards=Array.prototype.slice.call(document.querySelectorAll('.pcard'));
    var noResults=document.getElementById('noResults');
    // fill counts
    filterBar.querySelectorAll('.filt').forEach(function(btn){
      var f=btn.getAttribute('data-filter');
      var n=f==='all'?cards.length:cards.filter(function(c){return c.getAttribute('data-type')===f;}).length;
      var c=btn.querySelector('.count'); if(c) c.textContent='('+n+')';
    });
    filterBar.addEventListener('click',function(e){
      var btn=e.target.closest('.filt'); if(!btn) return;
      filterBar.querySelectorAll('.filt').forEach(function(b){b.classList.remove('active');});
      btn.classList.add('active');
      var f=btn.getAttribute('data-filter'),shown=0;
      cards.forEach(function(c){
        var match=(f==='all'||c.getAttribute('data-type')===f);
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
