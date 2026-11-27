/* UmerXD unified Blogger theme runtime — v4
 * Order: jQuery -> themeSettings/themeVariables -> this file.
 * All theme UI modules are initialized once after the DOM is ready.
 * Existing Blogger comment/runtime scripts remain owned by Blogger.
 */
(function(window,document){
  'use strict';
  if(window.__UMERXD_THEME_RUNTIME_V4__) return;
  window.__UMERXD_THEME_RUNTIME_V4__=true;
  var jQuery=window.jQuery, $=jQuery;
  if(!$){
    if(window.console&&console.error) console.error('[UmerXD] jQuery must load before theme-core.js');
    return;
  }
  try {
/*! Umer XD — Blogger Theme Core
 * Hosted from GitHub. Load this file after jQuery and after
 * <b:include name='theme-variables'/> has been rendered by Blogger.
 * This file contains the main JavaScript supplied by the theme owner.
 */

 /*! UmerXD Menu — safe two-level underscore parser */
!function($){
  $.fn.mainMenu = function(){
    return this.each(function(){
      var $root=$(this);
      var $list=$root.find('.LinkList ul').first();
      if(!$list.length) $list=$root.find('ul.main-nav').first();
      if(!$list.length) $list=$root.find('.widget-content > ul').first();
      if(!$list.length) return;

      var last=[];
      var items=$list.children('li').toArray();
      items.forEach(function(li){
        var $li=$(li), $a=$li.children('a').first();
        if(!$a.length) return;
        var label=$.trim($a.text()||'');
        var marks=(label.match(/^_+/)||[''])[0].length;
        var depth=Math.min(marks,2);
        if(marks) $a.text(label.substring(marks));
        if(depth>0 && last[depth-1]){
          var $parent=last[depth-1];
          var $sub=$parent.children('ul.sub-menu').first();
          if(!$sub.length){
            $sub=$('<ul/>').addClass('sub-menu sm-'+depth).appendTo($parent);
          }
          $li.appendTo($sub);
          $parent.addClass('has-sub');
        } else if(depth>0) {
          $li.appendTo($list);
          depth=0;
        }
        last[depth]=$li;
        last.length=depth+1;
      });
      $list.find('li').each(function(){if($(this).children('ul.sub-menu').length) $(this).addClass('has-sub');});
    });
  };
}(jQuery);

/*! jQuery Ticker - v1.0.0 ] */
!function(t){t.fn.newsTicker=function(){return this.each(function(){new class{constructor(t){this.ticker=t,this.active=0,this.tickerInit()}tickerActive(t){this.active=t,this.items.each(function(){this.classList.remove("active")}),this.items[t].classList.add("active"),this.tickerAuto()}tickerArrows(){this.ticker.append('<div class="ticker-nav"><button class="tn-prev" aria-label="Previous"/><button class="tn-next" aria-label="Next"/></div>')}prev(){this.active>0?this.tickerActive(this.active-1):this.tickerActive(this.items.length-1)}next(){this.active<this.items.length-1?this.tickerActive(this.active+1):this.tickerActive(0)}tickerNavigation(){const t=this.ticker.find(".tn-prev");this.ticker.find(".tn-next").on("click",this.next),t.on("click",this.prev)}tickerAuto(){clearTimeout(this.timeout),this.timeout=setTimeout(this.next,5e3)}tickerInit(){this.next=this.next.bind(this),this.prev=this.prev.bind(this),this.items=this.ticker.find(".ticker-posts > *");const t=this.items.length;t&&(this.tickerActive(0),t>=2&&(this.tickerArrows(),this.tickerNavigation()))}}(t(this))})}}(jQuery);

/*! UmerXD Lazy Images — native lazy-load with safe fallback */
!function($){
  $.fn.lazyLoader=function(){
    return this.each(function(){
      var img=this;
      if(img.__uxdLazyBound) return;
      img.__uxdLazyBound=true;
      var src=img.getAttribute('src')||img.getAttribute('data-src')||img.getAttribute('data-original')||img.getAttribute('data-lazy');
      if(!src) return;
      if(!img.getAttribute('src')) img.setAttribute('src',src);
      try{img.loading='lazy';}catch(e){}
      function reveal(){img.classList.add('lazyload');}
      if(img.complete && img.naturalWidth>0) reveal();
      else img.addEventListener('load',reveal,{once:true});
    });
  };
}(jQuery);

/*! jQuery Sticky Sidebar - v1.3.1 [ https://github.com/WeCodePixels/theia-sticky-sidebar ] */
!function($){$.fn.StickySidebar=function(options){var defaults={containerSelector:'',additionalMarginTop:0,additionalMarginBottom:0,updateSidebarHeight:true,minWidth:0,disableOnResponsiveLayouts:true,sidebarBehavior:'modern'};options=$.extend(defaults,options);options.additionalMarginTop=parseInt(options.additionalMarginTop)||0;options.additionalMarginBottom=parseInt(options.additionalMarginBottom)||0;tryInitOrHookIntoEvents(options,this);function tryInitOrHookIntoEvents(options,$that){var success=tryInit(options,$that);if(!success){console.log('TST: Body width smaller than options.minWidth. Init is delayed.');$(document).scroll(function(options,$that){return function(evt){var success=tryInit(options,$that);if(success){$(this).unbind(evt)}}}(options,$that));$(window).resize(function(options,$that){return function(evt){var success=tryInit(options,$that);if(success){$(this).unbind(evt)}}}(options,$that))}}function tryInit(options,$that){if(options.initialized===true){return true}if($('body').width()<options.minWidth){return false}init(options,$that);return true}function init(options,$that){options.initialized=true;$that.each(function(){var o={};o.sidebar=$(this);o.options=options||{};o.container=$(o.options.containerSelector);if(o.container.length==0){o.container=o.sidebar.parent()}o.sidebar.parents().css('-webkit-transform','none');o.sidebar.css({position:'relative',overflow:'visible','-webkit-box-sizing':'border-box','-moz-box-sizing':'border-box','box-sizing':'border-box'});o.stickySidebar=o.sidebar.find('.StickySidebar');if(o.stickySidebar.length==0){o.sidebar.find('script').remove();o.stickySidebar=$('<div>').addClass('StickySidebar').append(o.sidebar.children());o.sidebar.append(o.stickySidebar)}o.marginTop=parseInt(o.sidebar.css('margin-top'));o.marginBottom=parseInt(o.sidebar.css('margin-bottom'));o.paddingTop=parseInt(o.sidebar.css('padding-top'));o.paddingBottom=parseInt(o.sidebar.css('padding-bottom'));var collapsedTopHeight=o.stickySidebar.offset().top;var collapsedBottomHeight=o.stickySidebar.outerHeight();o.stickySidebar.css('padding-top',1);o.stickySidebar.css('padding-bottom',1);collapsedTopHeight-=o.stickySidebar.offset().top;collapsedBottomHeight=o.stickySidebar.outerHeight()-collapsedBottomHeight-collapsedTopHeight;if(collapsedTopHeight==0){o.stickySidebar.css('padding-top',0);o.stickySidebarPaddingTop=0}else{o.stickySidebarPaddingTop=1}if(collapsedBottomHeight==0){o.stickySidebar.css('padding-bottom',0);o.stickySidebarPaddingBottom=0}else{o.stickySidebarPaddingBottom=1}o.previousScrollTop=null;o.fixedScrollTop=0;resetSidebar();o.onScroll=function(o){if(!o.stickySidebar.is(":visible")){return}if($('body').width()<o.options.minWidth){resetSidebar();return}if(o.options.disableOnResponsiveLayouts){var sidebarWidth=o.sidebar.outerWidth(o.sidebar.css('float')=='none');if(sidebarWidth+50>o.container.width()){resetSidebar();return}}var scrollTop=$(document).scrollTop();var position='static';if(scrollTop>=o.container.offset().top+(o.paddingTop+o.marginTop-o.options.additionalMarginTop)){var offsetTop=o.paddingTop+o.marginTop+options.additionalMarginTop;var offsetBottom=o.paddingBottom+o.marginBottom+options.additionalMarginBottom;var containerTop=o.container.offset().top;var containerBottom=o.container.offset().top+getClearedHeight(o.container);var windowOffsetTop=0+options.additionalMarginTop;var windowOffsetBottom;var sidebarSmallerThanWindow=o.stickySidebar.outerHeight()+offsetTop+offsetBottom<$(window).height();if(sidebarSmallerThanWindow){windowOffsetBottom=windowOffsetTop+o.stickySidebar.outerHeight()}else{windowOffsetBottom=$(window).height()-o.marginBottom-o.paddingBottom-options.additionalMarginBottom}var staticLimitTop=containerTop-scrollTop+o.paddingTop+o.marginTop;var staticLimitBottom=containerBottom-scrollTop-o.paddingBottom-o.marginBottom;var top=o.stickySidebar.offset().top-scrollTop;var scrollTopDiff=o.previousScrollTop-scrollTop;if(o.stickySidebar.css('position')=='fixed'){if(o.options.sidebarBehavior=='modern'){top+=scrollTopDiff}}if(o.options.sidebarBehavior=='stick-to-top'){top=options.additionalMarginTop}if(o.options.sidebarBehavior=='stick-to-bottom'){top=windowOffsetBottom-o.stickySidebar.outerHeight()}if(scrollTopDiff>0){top=Math.min(top,windowOffsetTop)}else{top=Math.max(top,windowOffsetBottom-o.stickySidebar.outerHeight())}top=Math.max(top,staticLimitTop);top=Math.min(top,staticLimitBottom-o.stickySidebar.outerHeight());var sidebarSameHeightAsContainer=o.container.height()==o.stickySidebar.outerHeight();if(!sidebarSameHeightAsContainer&&top==windowOffsetTop){position='fixed'}else if(!sidebarSameHeightAsContainer&&top==windowOffsetBottom-o.stickySidebar.outerHeight()){position='fixed'}else if(scrollTop+top-o.sidebar.offset().top-o.paddingTop<=options.additionalMarginTop){position='static'}else{position='absolute'}}if(position=='fixed'){o.stickySidebar.css({position:'fixed',width:o.sidebar.width(),top:top,left:o.sidebar.offset().left+parseInt(o.sidebar.css('padding-left'))})}else if(position=='absolute'){var css={};if(o.stickySidebar.css('position')!='absolute'){css.position='absolute';css.top=scrollTop+top-o.sidebar.offset().top-o.stickySidebarPaddingTop-o.stickySidebarPaddingBottom}css.width=o.sidebar.width();css.left='';o.stickySidebar.css(css)}else if(position=='static'){resetSidebar()}if(position!='static'){if(o.options.updateSidebarHeight==true){o.sidebar.css({'min-height':o.stickySidebar.outerHeight()+o.stickySidebar.offset().top-o.sidebar.offset().top+o.paddingBottom})}}o.previousScrollTop=scrollTop};o.onScroll(o);$(document).scroll(function(o){return function(){o.onScroll(o)}}(o));$(window).resize(function(o){return function(){o.stickySidebar.css({position:'static'});o.onScroll(o)}}(o));function resetSidebar(){o.fixedScrollTop=0;o.sidebar.css({'min-height':'1px'});o.stickySidebar.css({position:'static',width:''})}function getClearedHeight(e){var height=e.height();e.children().each(function(){height=Math.max(height,$(this).height())});return height}})}}}(jQuery);


/*! UmerXD Auto Scroll — guarded */
!function($){
  $.fn.autoScrollTo=function(scrollElement,scrollSpeed){
    var $container=this,$target=$(scrollElement).first();
    if(!$container.length || !$target.length) return this;
    var cTop=$container.offset(),tTop=$target.offset();
    if(!cTop || !tTop) return this;
    var offset=tTop.top-cTop.top+$container.scrollTop();
    var isMobile=window.matchMedia('(max-width: 680px)').matches;
    var adjustment=(document.querySelector('#playlist-five')||document.querySelector('#playlist-six'))?(isMobile?10:15):(isMobile?5:10);
    return this.animate({scrollTop:offset-adjustment},scrollSpeed===undefined?600:scrollSpeed);
  };
}(jQuery);

/*! Gplay Movie Scripts - v3.4.2 by Umer xd */
$('#main-menu').mainMenu().find('.widget').addClass('show-menu');$('#main-search-wrap').each(function(){var $this=$(this);$('.show-search').click(function(){$('body').addClass('search-active'),$this.fadeIn(170).find('input').focus()});$('.search-close').click(function(){$('body').removeClass('search-active'),$this.fadeOut(170).find('input').blur().val('')})});(function(){
  var root=document.documentElement, saved='';
  try{ saved=window.localStorage.getItem('themeColor')||''; }catch(e){}
  root.classList.toggle('dark-mode',saved==='dark');
  $(document).off('click.uxdDarkMode','.darkmode-toggle').on('click.uxdDarkMode','.darkmode-toggle',function(){
    var isDark=!root.classList.contains('dark-mode');
    root.classList.toggle('dark-mode',isDark);
    this.setAttribute('aria-pressed',isDark?'true':'false');
    try{window.localStorage.setItem('themeColor',isDark?'dark':'light');}catch(e){}
  });
})();
$(function(){$('.entry-thumbnail .thumbnail,.entry-avatar .author-avatar').lazyLoader();$('.mobile-logo').each(function(){var $this=$(this),$logo=$('.main-logo a').clone();$logo.find('h1').remove(),$logo.appendTo($this)});$('#mobile-menu').each(function(){
  var $host=$(this),$nav=$('.main-nav').first().clone(false,false);
  if(!$nav.length) return;
  $nav.attr('class','mobile-nav').attr('id','mobile-nav');
  $nav.find('.has-sub > a').each(function(){
    if(!$(this).siblings('.submenu-toggle').length){
      $(this).after('<button type="button" class="submenu-toggle" aria-label="Expand submenu" aria-expanded="false"/>');
    }
  });
  $host.empty().append($nav);
});
$(document).off('click.uxdMenuOpen','.mobile-menu-toggle').on('click.uxdMenuOpen','.mobile-menu-toggle',function(){$('body').addClass('nav-active');});
$(document).off('click.uxdMenuClose','.hide-mobile-menu,.overlay').on('click.uxdMenuClose','.hide-mobile-menu,.overlay',function(){$('body').removeClass('nav-active');});
$(document).off('click.uxdSubmenu','.mobile-menu .submenu-toggle').on('click.uxdSubmenu','.mobile-menu .submenu-toggle',function(){
  var $btn=$(this),$li=$btn.closest('li'),$sub=$li.children('.sub-menu');
  var expanded=!$li.hasClass('expanded');
  $li.toggleClass('expanded',expanded);
  $btn.attr('aria-expanded',expanded?'true':'false');
  $sub.stop(true,true).slideToggle(170);
});
$('.header-inner').each(function(){var $this=$(this);if($this.length>0){var t=$(document).scrollTop(),w=$this.offset().top,s=$this.height(),h=w+s+s;$(window).scroll(function(){var n=$(document).scrollTop();if(n>h){$this.addClass('is-fixed')}else if(n<w||n<=1){$this.removeClass('is-fixed')}if(n<t){setTimeout(function(){$this.addClass('show')},170)}else{$this.removeClass('show')}t=$(document).scrollTop()})}});$('.Label a, a.b-label').each(function(){
    try{
      var u=new URL(this.href,window.location.href);
      if(!u.searchParams.has('max-results')) u.searchParams.set('max-results',String((window.themeSettings&&themeSettings.postPerPage)||8));
      this.href=u.href;
    }catch(e){}
  });$('.avatar-image-container img').each(function(){
    var src=this.getAttribute('src')||'';
    src=src.replace('/s35-c/','/s39-c/');
    src=src.replace('//resources.blogblog.com/img/blank.gif','//4.bp.blogspot.com/-oSjP8F09qxo/Wy1J9dp7b0I/AAAAAAAACF0/ggcRfLCFQ9s2SSaeL9BFSE2wyTYzQaTyQCK4BGAYYCw/s39/avatar.jpg');
    if(src) this.setAttribute('src',src);
  });$('time.published');$('.post-body .hcl').remove();$('.post-body b').each(function(){var $this=$(this),$type=$this.text().trim();if($type.match('{contactform}')){$this.replaceWith('<div class="contact-form"/>');$(".contact-form").append($("#ContactForm1"))}if($type.match('{leftsidebar}')){$('body').addClass('is-left');$this.remove()}if($type.match('{fullwidth}')){$('body').addClass('no-sidebar');$this.remove()}});$('#new-before-ad').each(function(){var $t=$(this);if($t.length){$('#before-ad').appendTo($t)}});$('#new-after-ad').each(function(){var $t=$(this);if($t.length){$('#after-ad').appendTo($t)}});$('#main-before-ad .widget').each(function(){var $t=$(this);if($t.length){$t.appendTo($('#before-ad'))}});$('#main-after-ad .widget').each(function(){var $t=$(this);if($t.length){$t.appendTo($('#after-ad'))}});$('.share-links .window-open').on('click',function(){var $this=$(this),url=$this.data('url'),wid=$this.data('width'),hei=$this.data('height'),wsw=window.screen.width,wsh=window.screen.height,mrl=Math.round(wsw/2-wid/2),mrt=Math.round(wsh/2-hei/2),win=window.open(url,'_blank','scrollbars=yes,resizable=yes,toolbar=no,location=yes,width='+wid+',height='+hei+',left='+mrl+',top='+mrt);if(win){try{win.focus()}catch(e){}}});$('.share-links').each(function(){var $t=$(this),$b=$t.find('.show-hid a');$b.on('click',function(){$t.toggleClass('show-hidden')})});var $side=$('#sidebar-wrapper');
if($side.length){
  $side.StickySidebar({containerSelector:'#content-wrapper > .container',additionalMarginTop:25,additionalMarginBottom:25,minWidth:981,disableOnResponsiveLayouts:true});
  $(window).on('load.uxdSidebar',function(){ $(window).trigger('resize'); $(document).trigger('scroll'); });
}$('.back-top').each(function(){var $this=$(this);$(window).on('scroll',function(){$(this).scrollTop()>=100?$this.fadeIn(250):$this.fadeOut(250)}),$this.click(function(){$('html, body').animate({scrollTop:0},500)})});$('#ticker .HTML .widget-content').each(function(isLabel){var $this=$(this),isData=$this.text().trim(),isTrim=isData.toLowerCase();isLabel=getAttr(isData,'label');ajaxTicker($this,'ticker',5,isLabel,isTrim)});$('.featured .HTML .widget-content').each(function(isNum,isLabel){var $this=$(this),isWindow=$(window),isData=$this.text().trim(),isTrim=isData.toLowerCase();isNum=getAttr(isData,'results');isLabel=getAttr(isData,'label');isWindow.on('load resize scroll',function isData(){isWindow.scrollTop()+isWindow.height()>=$this.offset().top&&(isWindow.off('load resize scroll',isData),ajaxFeatured($this,'featured',isNum,isLabel,isTrim))}).trigger('scroll')});$('.common-widget .HTML .widget-content').each(function(isLabel){var $this=$(this),isWindow=$(window),isData=$this.text().trim(),isTrim=isData.toLowerCase();isLabel=getAttr(isData,'label');isWindow.on('load resize scroll',function isData(){isWindow.scrollTop()+isWindow.height()>=$this.offset().top&&(isWindow.off('load resize scroll',isData),ajaxWidget($this,'gallery',9,isLabel,isTrim))}).trigger('scroll')});$('.related-content').each(function(){var $this=$(this),isWindow=$(window);isLabel=$this.find('.related-tag').data('label');isWindow.on('load resize scroll',function isData(){isWindow.scrollTop()+isWindow.height()>=$this.offset().top&&(isWindow.off('load resize scroll',isData),getPostData($this,'related',4,isLabel))}).trigger('scroll')});function qs(elem){return document.querySelector(elem)}function getAttr($this,$text,$type){for(var n=$this.split('$'),$regx=/[^{\}]+(?=})/g,a=0;a<n.length;a++){var e=n[a].split('=');if(e[0].trim()==$text){return null!=($type=e[1]).match($regx)&&String($type.match($regx)).trim()}}return false}function getPostLink(feed,i){for(var x=0;x<feed[i].link.length;x++)if(feed[i].link[x].rel=='alternate'){var link=feed[i].link[x].href;break}return link}function getPostTitle(feed,i,link){return feed[i].title.$t?feed[i].title.$t:themeVariables.noTitle}function getPostID(feed,i,n){return(n=feed[i].id.$t)?n.split('-').pop():''}function getFirstImage(html){
  var $img=$('<div>').html(html||'').find('img').first();
  var src=$img.attr('src')||$img.attr('data-src')||$img.attr('data-original')||'';
  if(!src) return 'https://resources.blogblog.com/img/blank.gif';
  var parts=src.split('/'),marker=parts.length>=2?'/'+parts[parts.length-2]:'';
  if(parts.length===9 && /^\/(?:s|w)\d+/i.test(marker)) src=src.replace(marker,'/w720');
  return src;
}
function getPostImage(feed,i){
  var item=(feed&&feed[i])||{};
  var html=(item.content&&item.content.$t)||(item.summary&&item.summary.$t)||'';
  var thumb=(item.media$thumbnail&&item.media$thumbnail.url)||'https://resources.blogblog.com/img/blank.gif';
  var img='https://resources.blogblog.com/img/blank.gif';
  var hasImage=html.indexOf('<img')>-1;
  var iframe=html.match(/<iframe(?:.+)?src=(?:.+)?(?:www\.youtube\.com)/i);
  if(iframe && (!hasImage || html.indexOf(iframe[0])<html.indexOf('<img'))){
    img=thumb.replace('img.youtube.com','i.ytimg.com').replace('/default.','/maxresdefault.');
  } else if(hasImage) {
    img=getFirstImage(html);
  } else if(thumb) {
    img=thumb.replace('img.youtube.com','i.ytimg.com').replace('/default.','/maxresdefault.');
  }
  return '<img class="thumbnail" loading="lazy" src="'+img.replace(/"/g,'%22')+'"/>';
}
function ajaxTicker($this,type,num,label,$type){if($type.match('getticker')){if(type=='ticker'){return getPostData($this,type,num,label)}else{$this.html(errorMessage())}}}function ajaxFeatured($this,type,num,label,$type){if($type.match('getfeatured')){if(type=='featured'){if(label=='recent'){var hreflink='/search'}else{hreflink='/search/label/'+label+''}$this.parent().find('.widget-title').addClass('heading-title').append('<a class="show-more" href="'+hreflink+'?&max-results='+themeSettings.postPerPage+'">'+themeVariables.showMore+'</a>');return getPostData($this,type,num,label)}else{$this.html(errorMessage())}}}function ajaxWidget($this,type,num,label,$type){if($type.match('getgallery')){if(type=='gallery'){return getPostData($this,type,num,label)}else{$this.html(errorMessage())}}}function getFeedUrl($this,num,label,url){switch(label){case'recent':url='/feeds/posts/default?alt=json&max-results='+num;break;default:url='/feeds/posts/default/-/'+label+'?alt=json&max-results='+num}return url}function loadAutoScroll(isElem,isOffset){$('html,body').animate({scrollTop:parseInt($(isElem).offset().top-isOffset)},2e3)}function beforeLoader(){return'<div class="loader"></div>'}function errorMessage(){return'<span class="error-msg"><b>Error:</b>&nbsp;'+themeVariables.noResults+'&nbsp;<i class="fa-regular fa-face-frown"></i></span>'}function getPostData($this,type,num,label){switch(type){case'ticker':case'featured':case'gallery':case'related':$.ajax({url:getFeedUrl(type,num,label),type:'GET',dataType:'json',cache:true,beforeSend:function(data){switch(type){case'ticker':case'featured':$this.html(beforeLoader()).parent().addClass('is-visible');break;case'gallery':case'related':$this.html(beforeLoader());break}},success:function(data){var html='';switch(type){case'ticker':html='<div class="ticker-posts">';break;case'featured':html='<div class="featured-posts grids">';break;case'gallery':html='<div class="gallery-posts">';break;case'related':html='<div class="related-posts grids">';break}var entry=data&&data.feed&&data.feed.entry;if(entry!=undefined){for(var i=0,feed=entry;i<feed.length;i++){var link=getPostLink(feed,i),title=getPostTitle(feed,i,link),image=getPostImage(feed,i,link),id=getPostID(feed,i);var content='';switch(type){case'ticker':content+='<article class="post item-'+i+'" data-id="'+id+'"><h2 class="entry-title"><a href="'+link+'" title="'+title+'">'+title+'</a></h2></article>';break;case'featured':content+='<article class="post item-'+i+'" data-id="'+id+'"><a class="entry-thumbnail" href="'+link+'" title="'+title+'">'+image+'<span class="entry-icon"></span></a><div class="entry-header"><h2 class="entry-title"><a href="'+link+'" title="'+title+'">'+title+'</a></h2></div></article>';break;case'gallery':content+='<article class="post item-'+i+'" data-id="'+id+'"><a class="entry-thumbnail" href="'+link+'" title="'+title+'">'+image+'<span class="entry-icon"></span><span class="entry-index">'+(i+1)+'</span></a></article>';break;case'related':content+='<article class="post item-'+i+'" data-id="'+id+'"><a class="entry-thumbnail" href="'+link+'" title="'+title+'">'+image+'<span class="entry-icon"></span></a><div class="entry-header"><h2 class="entry-title"><a href="'+link+'" title="'+title+'">'+title+'</a></h2></div></article>';break}html+=content}html+='</div>'}else{html=errorMessage()}switch(type){case'ticker':$this.html(html).parent().addClass('is-visible');$this.html(html).newsTicker();break;case'featured':$this.html(html).parent().addClass('is-visible');break;default:$this.html(html);break}$this.find('.thumbnail').lazyLoader()},error:function(){$this.html(errorMessage())}})}}$('.blog-post-comments').each(function(){var $this=$(this),$system=themeSettings.commentsSystem,$comment="comments-system-"+$system;switch($system){case"hide":$this.addClass("is-hidden");break;default:$this.addClass("comments-system-blogger is-visible")}var $reply=$this.find(".comments .comment-reply"),$continue=$this.find(".comments #top-continue"),$thread=$this.find("#top-ce.comment-replybox-thread");$reply.click(function(e){e.preventDefault(),$continue.show(),$thread.hide()});$continue.click(function(e){e.preventDefault(),$continue.hide(),$thread.show()})});

});

  } catch(err) {
    if(window.console&&console.error) console.error('[UmerXD core]',err);
  }


/* ================= UmerXD unified runtime extensions ================= */
(function(){
  'use strict';

  // Prevent duplicate initialization if Blogger or the browser evaluates the bundle twice.
  if(window.__UMERXD_THEME_EXTRAS_V4__) return;
  window.__UMERXD_THEME_EXTRAS_V4__=true;

  function safe(name,fn){
    try{fn();}
    catch(err){if(window.console&&console.error)console.error('[UmerXD '+name+']',err);}
  }

  function ready(fn){
    if(window.jQuery) window.jQuery(fn);
    else if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',fn,{once:true});
    else fn();
  }

  ready(function(){
    safe('collapsible',function(){
      var $=window.jQuery;
      $(document).off('click.uxdCollapse','.collapsible').on('click.uxdCollapse','.collapsible',function(){
        var $button=$(this),panel=this.nextElementSibling;
        $button.toggleClass('active');
        $button.attr('aria-expanded',$button.hasClass('active')?'true':'false');
        if(panel){
          var open=$button.hasClass('active');
          panel.style.display=open?'block':'none';
          panel.setAttribute('aria-hidden',open?'false':'true');
        }
      });
    });

    safe('product-title-price',function(){
      var $=window.jQuery;
      window.updatePostTitlesAndPrices=function(scope){
        var $scope=scope?$(scope):$('.blog-posts');
        $scope.find('.entry-title').each(function(){
          var $title=$(this),$link=$title.find('.entry-title-link').first();
          if(!$link.length) return;
          var raw=$link.attr('title')||$link.text().trim();
          var match=raw.match(/^(.*?)\s*\((.*?)\)$/);
          if(!match) return;
          var name=match[1].trim(),price=match[2].trim(),priceHtml='';
          var discount=price.match(/^(\d+)\*(\d+)%dis$/i);
          function esc(v){return $('<div>').text(v).html();}
          if(discount){
            var original=parseInt(discount[1],10),percent=parseInt(discount[2],10);
            if(percent<0||percent>100) return;
            var finalPrice=original-Math.round(original*percent/100);
            priceHtml='<span style="text-decoration:line-through;color:#aaa;margin-right:6px;">Starting From: $'+original+'</span>'+
              '<span style="color:#0a8f45;font-weight:bold;">Starting From: $'+finalPrice+'</span>'+
              ' <span style="margin-left:8px;background:#e63946;color:#fff;padding:2px 6px;border-radius:4px;font-size:12px;animation:flashMove 1.5s infinite;">-'+percent+'%</span>';
          } else {
            priceHtml='<b>Starting From: '+esc(price)+'</b>';
          }
          var $name=$title.find('.post-name').first();
          if($name.length) $name.text(name);
          else $link.text(name);
          var $price=$title.next('.price-text');
          if($price.length) $price.html(priceHtml);
        });
      };
      window.updatePostTitlesAndPrices();
    });

    safe('infinite-scroll',function(){
      var $=window.jQuery,$container=$('.blog-posts').first();
      if(!$container.length) return;
      var older=document.querySelector('a.blog-pager-older-link');
      if(!older || !older.href) return;

      var nextUrl=older.href,loading=false,finished=false,observer=null;
      var sentinel=document.createElement('div');
      sentinel.className='uxd-post-sentinel';
      sentinel.setAttribute('aria-hidden','true');
      sentinel.style.cssText='height:2px;width:100%;clear:both;';
      $container.after(sentinel);

      function setNext(doc){
        var next=doc.querySelector('a.blog-pager-older-link');
        nextUrl=next&&next.href?next.href:'';
        if(!nextUrl){
          finished=true;
          if(observer) observer.disconnect();
          if(sentinel.parentNode) sentinel.parentNode.removeChild(sentinel);
        }
      }

      function appendPage(html){
        var doc=new DOMParser().parseFromString(html,'text/html');
        var source=doc.querySelector('.blog-posts');
        if(!source) return false;
        var nodes=Array.prototype.slice.call(source.children).filter(function(node){
          return !node.matches('.blog-pager,.blog-pager-older-link,.blog-pager-newer-link,.blog-pager');
        });
        if(!nodes.length) return false;
        var added=[];
        nodes.forEach(function(node){
          var imported=document.importNode(node,true);
          $container.append(imported);
          added.push(imported);
        });
        added.forEach(function(node){
          $(node).find('img.thumbnail,.entry-avatar .author-avatar').lazyLoader();
        });
        if(typeof window.updatePostTitlesAndPrices==='function') window.updatePostTitlesAndPrices($(added));
        setNext(doc);
        return true;
      }

      function loadNext(){
        if(loading||finished||!nextUrl) return;
        loading=true;
        sentinel.classList.add('uxd-loading');
        fetch(nextUrl,{credentials:'same-origin'})
          .then(function(response){
            if(!response.ok) throw new Error('HTTP '+response.status);
            return response.text();
          })
          .then(function(html){
            var success=appendPage(html);
            if(!success){
              finished=true;
              if(observer) observer.disconnect();
              if(sentinel.parentNode) sentinel.parentNode.removeChild(sentinel);
            }
          })
          .catch(function(err){
            if(window.console&&console.warn) console.warn('[UmerXD pagination]',err);
            sentinel.setAttribute('aria-label','Posts load nahi ho sake. Page refresh karke dobara koshish karein.');
          })
          .finally(function(){
            loading=false;
            sentinel.classList.remove('uxd-loading');
          });
      }

      if('IntersectionObserver' in window){
        observer=new IntersectionObserver(function(entries){
          entries.forEach(function(entry){if(entry.isIntersecting) loadNext();});
        },{root:null,rootMargin:'900px 0px',threshold:0});
        observer.observe(sentinel);
      } else {
        var check=function(){
          if(finished||loading||!sentinel.isConnected) return;
          var rect=sentinel.getBoundingClientRect();
          if(rect.top<window.innerHeight+900) loadNext();
        };
        window.addEventListener('scroll',check,{passive:true});
        window.addEventListener('resize',check);
        check();
      }
    });

    safe('checkout-tracking',function(){
      var $=window.jQuery;
      $(document).off('click.uxdCheckout','.buy-now-btn,#sr-btn').on('click.uxdCheckout','.buy-now-btn,#sr-btn',function(){
        if(typeof window.fbq==='function'){
          try{window.fbq('track','InitiateCheckout',{}, {eventID:'initiate_checkout_click'});}catch(e){}
        }
      });
    });

    safe('product-rating',function(){
      var box=document.getElementById('productRating');
      if(!box) return;
      var rating=Number(box.getAttribute('data-rating'));
      var count=parseInt(box.getAttribute('data-review-count')||'',10);
      if(!isFinite(rating)||rating<0||rating>5||!isFinite(count)||count<1) return;
      var stars=Math.round(rating);
      var row=document.createElement('div');
      row.style.cssText='display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:10px 0;';
      var star=document.createElement('div');
      star.style.cssText='color:#f5a623;font-size:20px;letter-spacing:2px;';
      star.textContent='★'.repeat(stars)+'☆'.repeat(5-stars);
      var text=document.createElement('div');
      text.style.cssText='font-size:14px;color:#555;';
      text.textContent=rating.toFixed(1)+' out of 5 | Based on '+count.toLocaleString()+' reviews';
      row.appendChild(star);row.appendChild(text);box.replaceChildren(row);
    });

    safe('authentic-reviews',function(){
      var container=document.getElementById('bro-review-container');
      var records=window.BRO_REAL_REVIEWS||window.BRO_REVIEW_DATA;
      if(!container||!Array.isArray(records)||!records.length) return;
      records=records.filter(function(r){
        return r&&typeof r.name==='string'&&r.name.trim()&&typeof r.text==='string'&&r.text.trim()&&Number(r.rating)>=1&&Number(r.rating)<=5;
      });
      if(!records.length) return;

      function render(){
        var average=records.reduce(function(sum,r){return sum+Number(r.rating);},0)/records.length;
        var root=document.createElement('div');
        root.className='bro-reviews';
        var summary=document.createElement('div');
        summary.className='bro-summary';
        var score=document.createElement('div');
        score.className='bro-big-score';
        var scoreNumber=document.createElement('span');
        scoreNumber.className='bro-score-num';scoreNumber.textContent=average.toFixed(1);
        var scoreMeta=document.createElement('div');
        var scoreStars=document.createElement('div');
        scoreStars.className='bro-score-stars';scoreStars.textContent='★'.repeat(Math.round(average))+'☆'.repeat(5-Math.round(average));
        var scoreLabel=document.createElement('div');
        scoreLabel.className='bro-score-label';scoreLabel.textContent='Based on '+records.length+' customer reviews';
        scoreMeta.appendChild(scoreStars);scoreMeta.appendChild(scoreLabel);score.appendChild(scoreNumber);score.appendChild(scoreMeta);
        var bars=document.createElement('div');bars.className='bro-bars';
        for(var star=5;star>=1;star--){
          var count=records.filter(function(r){return Math.round(Number(r.rating))===star;}).length;
          var percent=Math.round(count/records.length*100);
          var line=document.createElement('div');line.className='bro-bar-row';
          var label=document.createElement('span');label.textContent=star+'★';
          var track=document.createElement('div');track.className='bro-bar-track';
          var fill=document.createElement('div');fill.className='bro-bar-fill';fill.style.width=percent+'%';track.appendChild(fill);
          var pct=document.createElement('span');pct.textContent=percent+'%';
          line.appendChild(label);line.appendChild(track);line.appendChild(pct);bars.appendChild(line);
        }
        summary.appendChild(score);summary.appendChild(bars);
        var heading=document.createElement('h3');heading.className='bro-heading';heading.textContent='Customer Reviews';
        var slider=document.createElement('div');slider.className='swiper broSwiper-uxd';
        var wrap=document.createElement('div');wrap.className='swiper-wrapper';
        records.forEach(function(r){
          var slide=document.createElement('div');slide.className='swiper-slide';slide.style.cssText='height:auto;display:flex;box-sizing:border-box;';
          var card=document.createElement('div');card.className='bro-card';
          var top=document.createElement('div');top.className='bro-card-top';
          var nameWrap=document.createElement('div');
          var name=document.createElement('div');name.className='bro-name';name.textContent=r.name;
          if(r.verifiedPurchase===true){
            var badge=document.createElement('span');badge.className='bro-verified-badge';badge.textContent='Verified Purchase';name.appendChild(badge);
          }
          nameWrap.appendChild(name);
          if(r.location){var loc=document.createElement('div');loc.className='bro-location';loc.textContent=r.location;nameWrap.appendChild(loc);}
          top.appendChild(nameWrap);
          if(r.date){var date=document.createElement('div');date.className='bro-date';date.textContent=r.date;top.appendChild(date);}
          var stars=document.createElement('div');stars.className='bro-stars';stars.textContent='★'.repeat(Math.round(Number(r.rating)))+'☆'.repeat(5-Math.round(Number(r.rating)));
          var title=document.createElement('div');title.className='bro-title';title.textContent=r.title||'';
          var body=document.createElement('div');body.className='bro-text';body.textContent=r.text;
          card.appendChild(top);card.appendChild(stars);if(r.title)card.appendChild(title);card.appendChild(body);
          if(r.verifiedPurchase===true&&r.product){var purchase=document.createElement('div');purchase.className='bro-purchase-tag';purchase.textContent='Verified Purchase: '+r.product;card.appendChild(purchase);}
          slide.appendChild(card);wrap.appendChild(slide);
        });
        slider.appendChild(wrap);root.appendChild(summary);root.appendChild(heading);root.appendChild(slider);container.replaceChildren(root);

        function startSwiper(){
          if(!window.Swiper) return;
          new Swiper(slider,{
            slidesPerView:1,spaceBetween:14,loop:false,
            autoplay:{delay:4200,disableOnInteraction:false},
            breakpoints:{600:{slidesPerView:2},900:{slidesPerView:3}}
          });
        }
        if(window.Swiper){startSwiper();}
        else{
          if(!document.querySelector('link[data-uxd-swiper-css]')){
            var css=document.createElement('link');css.rel='stylesheet';css.href='https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css';css.setAttribute('data-uxd-swiper-css','1');document.head.appendChild(css);
          }
          var script=document.querySelector('script[data-uxd-swiper-js]');
          if(!script){
            script=document.createElement('script');script.src='https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js';script.async=true;script.setAttribute('data-uxd-swiper-js','1');document.head.appendChild(script);
          }
          script.addEventListener('load',startSwiper,{once:true});
        }
      }
      render();
    });
  });
})();

})(window,document);
