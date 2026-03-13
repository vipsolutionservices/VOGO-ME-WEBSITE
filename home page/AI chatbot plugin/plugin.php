<?php
/**
 * Plugin Name: VOGO FAQ Chat (no-AI)
 * Description: Zero-cost rule-based FAQ chatbot. Floating bubble auto-injected. Settings under Plugins → VOGO → Settings.
 * Version: 1.3.0
 * Author: VOGO
 * License: GPLv2 or later
 */

/* ✅ BC respected, ✅ LOCK respected, ✅ SQL n/a */
if (!defined('ABSPATH')) exit;

final class VOGO_FAQ_Chat {
  private static $printed = false;
  const OPT = 'vogo_faq_chat';

  public function __construct(){
    add_action('admin_menu',        [$this,'admin_menu']);
    add_action('admin_init',        [$this,'register_settings']);
    add_action('wp_enqueue_scripts',[$this,'enqueue_assets']);
    add_shortcode('vogo_faq',       [$this,'shortcode']);
    add_action('wp_footer',         [$this,'auto_render']);
    add_action('wp_body_open',      [$this,'auto_render'], 5);

    // server-side debug sink
    add_action('wp_ajax_vogo_faq_log',        [$this,'ajax_log']);
    add_action('wp_ajax_nopriv_vogo_faq_log', [$this,'ajax_log']);
  }

  public function ajax_log(){
    $msg = isset($_POST['msg']) ? wp_unslash($_POST['msg']) : '';
    $ip  = $_SERVER['REMOTE_ADDR'] ?? 'IP?';
    $ua  = $_SERVER['HTTP_USER_AGENT'] ?? '?';
    $ref = $_SERVER['HTTP_REFERER'] ?? '-';
    error_log('[VOGO_FAQ_CHAT_LOG] '.$ip.' '.$ua.' '.$ref.' :: '.$msg);
    wp_send_json_success(['ok'=>1]);
  }

  /* ---------- Admin UI ---------- */
  public function admin_menu(){
    add_plugins_page('VOGO Settings','VOGO','manage_options','vogo-faq-chat',[$this,'settings_page']);
  }

  public function register_settings(){
    register_setting(self::OPT, self::OPT, ['sanitize_callback'=>[$this,'sanitize']]);
    add_settings_section('main','Knowledge Base','__return_false', self::OPT);

    $this->add_field('title','Widget Title', function($v){
      echo '<input type="text" style="width:100%" name="'.self::OPT.'[title]" value="'.esc_attr($v?:'VOGO Assistant').'" />';
    });
    $this->add_field('cta','Fallback CTA', function($v){
      echo '<input type="text" style="width:100%" name="'.self::OPT.'[cta]" value="'.esc_attr($v?:'Contact sales at sales@vogo.me or +40 723 313 296.').'" />';
    });
    $this->add_field('greeting','Initial Greeting', function($v){
      $def='Salut — sunt asistentul VOGO. Alege o opțiune: 1) Devino distribuitor 2) Consultant autorizat 3) Ambasador VOGO 4) Reseller 5) Reprezentanță pe teritoriu 6) Altă întrebare';
      echo '<textarea rows="3" style="width:100%" name="'.self::OPT.'[greeting]">'.esc_textarea($v?:$def).'</textarea>';
    });
    $this->add_field('show_menu','Show Start Menu', function($v){
      echo '<label><input type="checkbox" name="'.self::OPT.'[show_menu]" value="1" '.checked(!empty($v),'1',false).'/> Show numeric menu on start</label>';
    });
    $this->add_field('handoff_whatsapp','WhatsApp Handoff (tel: link)', function($v){
      echo '<input type="text" style="width:100%" name="'.self::OPT.'[handoff_whatsapp]" value="'.esc_attr($v?:'https://wa.me/40723313296').'" />';
      echo '<p style="margin:.4em 0 0;opacity:.8">Ex: https://wa.me/40723313296</p>';
    });
    $this->add_field('start_open','Open Panel on Load', function($v){
      echo '<label><input type="checkbox" name="'.self::OPT.'[start_open]" value="1" '.checked(!empty($v),'1',false).'/> Open the chat window automatically</label>';
    });
    $this->add_field('auto_inject','Auto Inject Bubble (footer)', function($v){
      echo '<label><input type="checkbox" name="'.self::OPT.'[auto_inject]" value="1" '.checked(($v===null?1:!empty($v)),'1',false).'/> Show bubble on all pages</label>';
      echo '<p style="margin:.4em 0 0;opacity:.8">If unchecked, use shortcode <code>[vogo_faq window="true"]</code>.</p>';
    });

    $kbph='[{"q":"pricing","a":"Starter €99/mo — 1 store, 1 locale. Growth €299/mo — multi-store, 3 locales. Enterprise — custom, 24/7 SLA.","lang":"en","tags":["price","plan","cost"]},{"q":"pachete","a":"Starter €99/lună; Growth €299/lună; Enterprise personalizat, SLA 24/7.","lang":"ro","tags":["pret","planuri","pachete"]},{"q":"suport local","a":"Suport local: RO, DE, TR. Timp răspuns: 2h (Enterprise), 8h (Growth).","lang":"ro"}]';
    $this->add_field('kb','JSON Q&A (array of items)', function($v) use ($kbph){
      echo '<textarea rows="16" style="width:100%" name="'.self::OPT.'[kb]">'.esc_textarea($v?:$kbph).'</textarea>';
    });
  }

  private function add_field($id,$label,$cb){
    add_settings_field($id,$label,function() use ($id,$cb){
      $o=get_option(self::OPT,[]); $v=$o[$id]??null; $cb($v);
    },self::OPT,'main');
  }

  public function sanitize($in){
    return [
      'title'            => isset($in['title']) ? sanitize_text_field($in['title']) : 'VOGO Assistant',
      'cta'              => isset($in['cta']) ? wp_strip_all_tags($in['cta']) : '',
      'greeting'         => isset($in['greeting']) ? trim(wp_kses_post($in['greeting'])) : '',
      'show_menu'        => !empty($in['show_menu']) ? 1 : 0,
      'handoff_whatsapp' => isset($in['handoff_whatsapp']) ? esc_url_raw($in['handoff_whatsapp']) : 'https://wa.me/40723313296',
      'start_open'       => !empty($in['start_open']) ? 1 : 0,
      'auto_inject'      => isset($in['auto_inject']) ? (int)!empty($in['auto_inject']) : 1,
      'kb'               => isset($in['kb']) ? trim($in['kb']) : '[]',
    ];
  }

  public function settings_page(){ ?>
    <div class="wrap">
      <h1>VOGO FAQ Chat</h1>
      <form method="post" action="options.php">
        <?php settings_fields(self::OPT); do_settings_sections(self::OPT); submit_button(); ?>
      </form>
    </div>
  <?php }

  /* ---------- Frontend ---------- */
  public function enqueue_assets(){
    wp_register_style('vogo-faq-chat', false);
    wp_add_inline_style('vogo-faq-chat', $this->css());
    wp_enqueue_style('vogo-faq-chat');

    $o = get_option(self::OPT,[]);
    $cfg = [
      'title'      => $o['title']      ?? 'VOGO Assistant',
      'cta'        => $o['cta']        ?? '',
      'start_open' => !empty($o['start_open']) ? 1 : 0,
      'greeting'   => $o['greeting']   ?? '',
      'show_menu'  => !empty($o['show_menu']) ? 1 : 0,
      'handoff'    => $o['handoff_whatsapp'] ?? 'https://wa.me/40723313296',
      'kb'         => $this->decode_kb($o['kb'] ?? '[]'),
      'ajax_url'   => admin_url('admin-ajax.php'),
      'debug'      => 1
    ];

    wp_register_script('vogo-faq-chat', false, [], null, true);
    wp_add_inline_script('vogo-faq-chat','window.VOGO_FAQ_CFG='.wp_json_encode($cfg).';','before');
    wp_add_inline_script('vogo-faq-chat', $this->js());
    wp_enqueue_script('vogo-faq-chat');
  }

  private function decode_kb($raw){ $j=json_decode($raw,true); return is_array($j)?$j:[]; }

  public function shortcode($atts){
    $a = shortcode_atts(['window'=>'true'], $atts, 'vogo_faq');
    $floating = ($a['window']==='true');
    return $this->render_html($floating);
  }

  public function auto_render(){
    $o=get_option(self::OPT,[]);
    $inject = array_key_exists('auto_inject',$o) ? !empty($o['auto_inject']) : true;
    if(!$inject || self::$printed) return;
    echo $this->render_html(true);
    self::$printed = true;
  }

  private function render_html($floating){
    $title = esc_html((get_option(self::OPT,[])['title']??'VOGO Assistant'));
    ob_start(); ?>
    <div class="vogo-faq <?php echo $floating?'vogo-faq--floating':''; ?>">
      <button class="vogo-faq__toggle" type="button"><span>💬</span><strong><?php echo $title; ?></strong></button>
      <div class="vogo-faq__panel" aria-hidden="true">
        <div class="vogo-faq__head"><strong><?php echo $title; ?></strong><button class="vogo-faq__close">✕</button></div>
        <div class="vogo-faq__msgs"></div>
        <form class="vogo-faq__form"><input class="vogo-faq__input" type="text" placeholder="Întreabă despre pachete, suport, prețuri..."><button>Trimite</button></form>
      </div>
    </div>
    <?php return ob_get_clean();
  }

  private function css(){
    return <<<CSS
.vogo-faq{position:relative;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif}
.vogo-faq--floating{position:fixed;right:16px;bottom:16px;z-index:99999}
.vogo-faq__toggle{display:flex;align-items:center;gap:8px;background:#0F5132;color:#fff;border:0;border-radius:999px;padding:12px 16px;cursor:pointer;font-weight:800;box-shadow:0 10px 24px rgba(0,0,0,.25)}
.vogo-faq__panel{position:absolute;right:0;bottom:58px;width:340px;max-height:65vh;background:#fff;border:1px solid #e5e7eb;border-radius:16px;box-shadow:0 18px 40px rgba(0,0,0,.22);display:none;flex-direction:column;overflow:hidden}
.vogo-faq__panel[aria-hidden="false"]{display:flex}
.vogo-faq__head{display:flex;justify-content:space-between;align-items:center;background:#0F5132;color:#fff;padding:10px}
.vogo-faq__msgs{padding:12px;height:260px;overflow:auto;background:#f8fafc}
.vogo-faq__msg{margin:8px 0;padding:8px 10px;border-radius:10px;max-width:90%}
.vogo-faq__msg--user{background:#e6f4ea;margin-left:auto}
.vogo-faq__msg--bot{background:#fff;border:1px solid #ddd}
.vogo-faq__form{display:flex;gap:6px;padding:8px;border-top:1px solid #ddd;background:#fff}
.vogo-faq__input{flex:1;padding:8px 10px;border:1px solid #ccc;border-radius:10px}
.vogo-faq__form button{background:#0F5132;color:#fff;border:0;border-radius:10px;padding:8px 12px;font-weight:700;cursor:pointer}
CSS;
  }

  private function js(){
    return <<<JS
(function(){
  var cfg=window.VOGO_FAQ_CFG||{}; var DEBUG=!!cfg.debug;
  function dbg(){if(DEBUG&&console&&console.log)console.log('[FAQ]',...arguments);try{if(cfg.ajax_url){var f=new FormData();f.append('action','vogo_faq_log');f.append('msg',Array.prototype.join.call(arguments,' '));navigator.sendBeacon?navigator.sendBeacon(cfg.ajax_url,f):fetch(cfg.ajax_url,{method:'POST',body:f});}}catch(_){}}  
  window.addEventListener('error',e=>dbg('JSERR',e.message||e)); window.addEventListener('unhandledrejection',e=>dbg('JSPROM',e.reason||'unknown'));
  function segLang(){var s=(location.pathname.split('/')[1]||'').toLowerCase();var m={ro:'ro',en:'en',fr:'fr',es:'es',it:'it',de:'de'};return m[s]||'ro';}
  function tok(s){return(s||'').toLowerCase().replace(/[^a-z0-9ăâîșț\s]/g,' ').split(/\\s+/).filter(Boolean);}
  function jacc(a,b){var A=new Set(a),B=new Set(b),i=0;A.forEach(x=>{if(B.has(x))i++;});var u=new Set([...A,...B]).size||1;return i/u;}
  function lev(a,b){if(a===b)return 0;var m=a.length,n=b.length;if(!m)return n;if(!n)return m;var d=Array(n+1);for(var j=0;j<=n;j++)d[j]=j;for(var i=1;i<=m;i++){var p=d[0];d[0]=i;for(var j=1;j<=n;j++){var t=d[j];d[j]=Math.min(d[j]+1,d[j-1]+1,p+(a[i-1]===b[j-1]?0:1));p=t;}}return d[n];}
  function sim(q1,q2){var t1=tok(q1),t2=tok(q2);var jac=jacc(t1,t2);var L=Math.max(1,Math.max(q1.length,q2.length));var ln=1-Math.min(lev(q1,q2),L)/L;return 0.6*jac+0.4*ln;}
  function best(kb,q){var l=segLang(),best=null,max=-1;for(var i=0;i<kb.length;i++){var k=kb[i],s=sim(q,k.q||'');if(s>max){max=s;best=k;}}dbg('match',q,max,best&&best.q);return{item:best,score:max};}
  var MENU_TEXT_RO="Salut — sunt asistentul VOGO. Alege:\\n1) Devino distribuitor\\n2) Consultant autorizat\\n3) Ambasador VOGO\\n4) Reseller\\n5) Reprezentanță\\n6) Altă întrebare";
  var MENU_REPLY_RO={"1":"Detalii distribuitor: contactează <a href='"+(cfg.handoff||"#")+"'>Mihai</a>.","2":"Consultant autorizat: training + certificare. <a href='"+(cfg.handoff||"#")+"'>Mihai</a>.","3":"Ambasador VOGO: comisioane. <a href='"+(cfg.handoff||"#")+"'>Mihai</a>.","4":"Reseller: portal B2B. <a href='"+(cfg.handoff||"#")+"'>Mihai</a>.","5":"Reprezentanță: discută pe <a href='"+(cfg.handoff||"#")+"'>WhatsApp</a>.","6":"Scrie întrebarea ta."};
  function mountOne(w){try{
    var btn=w.querySelector('.vogo-faq__toggle'),pan=w.querySelector('.vogo-faq__panel'),cls=w.querySelector('.vogo-faq__close'),msgs=w.querySelector('.vogo-faq__msgs'),form=w.querySelector('.vogo-faq__form'),inp=w.querySelector('.vogo-faq__input');
    if(!btn||!pan)return;dbg('mount ok');
    function add(role,html){var d=document.createElement('div');d.className='vogo-faq__msg '+(role==='user'?'vogo-faq__msg--user':'vogo-faq__msg--bot');d.innerHTML=html;msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight;}
    function open(){pan.setAttribute('aria-hidden','false');dbg('open');}
    function close(){pan.setAttribute('aria-hidden','true');dbg('close');}
    btn.addEventListener('click',e=>{e.preventDefault();pan.getAttribute('aria-hidden')==='true'?open():close();});
    if(cls)cls.addEventListener('click',e=>{e.preventDefault();close();});
    add('assistant',(cfg.greeting||MENU_TEXT_RO)); if(cfg.show_menu)add('assistant','<b>Răspunde cu 1–6</b>');
    form.addEventListener('submit',e=>{e.preventDefault();var q=inp.value.trim();if(!q)return;add('user',q);inp.value='';var n=(q.match(/^([1-6])$/)||[])[1];if(n&&MENU_REPLY_RO[n]){add('assistant',MENU_REPLY_RO[n]);return;}var r=best(cfg.kb||[],q);
    if(r.item&&r.score>=0.25){add('assistant',r.item.a);
if(r.item&&r.score>=0.25){
  add('assistant',r.item.a);
}else if(/^(salut|buna|hello|hei|hey|ce faci)/i.test(q)){
  add('assistant','Salut! 👋 Eu sunt asistentul VOGO. Cum pot să te ajut?');
}else{
  add('assistant','Conversația ta poate fi preluată de un consultant Vogo: <a href="'+(cfg.handoff||'#')+'">WhatsApp</a>.');
}

    }else{add('assistant','Conversația ta poate fi preluată de Mihai: <a href="'+(cfg.handoff||'#')+'">WhatsApp</a>.');}});
  }catch(e){dbg('mount err',e.message);}}
  function mountAll(){document.querySelectorAll('.vogo-faq').forEach(mountOne);dbg('mountAll done');}
  if(document.readyState==='complete')mountAll();else window.addEventListener('load',mountAll,{once:true});
})();
JS;
  }
}
new VOGO_FAQ_Chat();
