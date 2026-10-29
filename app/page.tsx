"use client";
import {useEffect,useRef,useState,type FormEvent} from "react";
import {ArrowRight,ArrowUpRight,Award,Box,Check,ChevronDown,ChevronLeft,ChevronRight,Leaf,Mail,Menu,PackageCheck,PencilRuler,Plus,Sparkles,Users,X} from "lucide-react";
const categories=["Tümü","Pasta Kutusu","Pasta Altlığı","Kargo Kutusu","Karton Kutu","Oluklu Mukavva","Lüks Kutu","Etiket & Baskı"];
const projects=[
  {
    "id": 11,
    "title": "Pencereli Pasta Kutusu",
    "category": "Pasta Kutusu",
    "detail": "Beyaz karton gövde, pencereli kapak ve ön yüzde logo baskısı bulunan pasta kutusu."
  },
  {
    "id": 12,
    "title": "Saplı Kraft Pasta Kutusu",
    "category": "Pasta Kutusu",
    "detail": "Taşıma sapı ve şeffaf penceresi bulunan kraft pasta kutusu."
  },
  {
    "id": 13,
    "title": "Yuvarlak Pasta Altlığı",
    "category": "Pasta Altlığı",
    "detail": "Altın renkli, yuvarlak ve kenarları dilimli pasta sunum altlığı."
  },
  {
    "id": 14,
    "title": "Kare Pasta Altlığı",
    "category": "Pasta Altlığı",
    "detail": "Gümüş renkli, kare formda pasta sunum altlığı."
  },
  {
    "id": 15,
    "title": "Beyaz Kargo Kutusu",
    "category": "Kargo Kutusu",
    "detail": "Beyaz oluklu kartondan, kendinden kapaklı ve iç kapağı logo baskılı kargo kutusu."
  },
  {
    "id": 8,
    "title": "Kraft Kargo Kutusu",
    "category": "Kargo Kutusu",
    "detail": "İç kapağında logo baskısı bulunan katlanır kraft kargo kutusu."
  },
  {
    "id": 16,
    "title": "Kilitli Kargo Kutusu",
    "category": "Kargo Kutusu",
    "detail": "Geçme kapaklı, üst yüzeyi logo baskılı kraft e-ticaret kargo kutusu."
  },
  {
    "id": 4,
    "title": "Oluklu Mukavva Koli",
    "category": "Oluklu Mukavva",
    "detail": "Logo baskısı ve baskılı bant uygulaması bulunan oluklu mukavva koli."
  },
  {
    "id": 5,
    "title": "Baskılı Kraft Kutu",
    "category": "Karton Kutu",
    "detail": "Botanik desen ve logo baskısı bulunan doğal kraft kutu."
  },
  {
    "id": 7,
    "title": "Siyah Sunum Kutusu",
    "category": "Lüks Kutu",
    "detail": "Mat siyah yüzey üzerine altın renkli logo uygulanmış sunum kutusu."
  },
  {
    "id": 1,
    "title": "Zeytinyağı Kutusu",
    "category": "Karton Kutu",
    "detail": "Zeytin yeşili yüzey, bitkisel desen ve altın renkli baskı içeren ürün kutusu."
  },
  {
    "id": 9,
    "title": "Baskılı Kutu ve Pelür",
    "category": "Etiket & Baskı",
    "detail": "İç yüzeyi desenli, logo baskılı pelür ile birlikte kullanılan siyah kutu."
  },
  {
    "id": 10,
    "title": "Krem Sunum Kutusu",
    "category": "Lüks Kutu",
    "detail": "Krem renkli yüzey üzerine altın renkli logo uygulanmış sunum kutusu."
  },
  {
    "id": 3,
    "title": "Pelürlü Karton Kutu",
    "category": "Karton Kutu",
    "detail": "Beyaz pelür kâğıdı ve ön yüzde logo baskısı bulunan kraft karton kutu."
  },
  {
    "id": 2,
    "title": "Dikey Kraft Kutu",
    "category": "Karton Kutu",
    "detail": "Dikey dikdörtgen formda, logo baskılı kraft ürün kutusu."
  },
  {
    "id": 6,
    "title": "Kapaklı Kraft Kutu",
    "category": "Lüks Kutu",
    "detail": "Geniş ön yüzünde logo baskısı bulunan yatay kraft kutu."
  }
];
type Project=typeof projects[number];
const assetPath=(path:string)=>(process.env.NEXT_PUBLIC_BASE_PATH||"")+path;
const img=(id:number)=>assetPath(`/images/box-${String(id).padStart(2,"0")}.webp`);
function Brand({className=""}:{className?:string}){return <img className={`brand ${className}`} src={assetPath("/images/arslan-logo.png")} alt="Arslan Ambalaj" width="212" height="72"/>;}
export default function Home(){
 const[menuOpen,setMenuOpen]=useState(false),[active,setActive]=useState("Tümü"),[expanded,setExpanded]=useState(false),[selected,setSelected]=useState<Project|null>(null),[quoteType,setQuoteType]=useState(""),[prepared,setPrepared]=useState(false);
 const dialog=useRef<HTMLDialogElement>(null),previousFocus=useRef<HTMLElement|null>(null);
 const visibleProjects=projects.filter(p=>active==="Tümü"||p.category===active).slice(0,expanded||active!=="Tümü"?projects.length:8);
 useEffect(()=>{const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("is-visible");observer.unobserve(e.target);}}),{threshold:.08});document.querySelectorAll(".reveal").forEach(e=>observer.observe(e));return()=>observer.disconnect();},[]);
 useEffect(()=>{if(selected)document.body.style.overflow="hidden";if(selected&&dialog.current&&!dialog.current.open){previousFocus.current=document.activeElement as HTMLElement;dialog.current.showModal();document.body.style.overflow="hidden";}if(!selected&&dialog.current?.open)dialog.current.close();return()=>{document.body.style.overflow="";};},[selected]);
 useEffect(()=>{if(!menuOpen)return;const close=(e:KeyboardEvent)=>{if(e.key==="Escape")setMenuOpen(false);};document.addEventListener("keydown",close);return()=>document.removeEventListener("keydown",close);},[menuOpen]);
 const closeProject=()=>{setSelected(null);previousFocus.current?.focus();};
 const stepProject=(direction:number)=>{if(!selected)return;const index=projects.findIndex(p=>p.id===selected.id);setSelected(projects[(index+direction+projects.length)%projects.length]);};
 const requestQuote=(category:string)=>{setQuoteType(category);closeProject();window.setTimeout(()=>document.getElementById("iletisim")?.scrollIntoView({behavior:"smooth"}),50);};
 const prepareEmail=(e:FormEvent<HTMLFormElement>)=>{e.preventDefault();const data=new FormData(e.currentTarget);const body=`Ad Soyad: ${data.get("name")}\nE-posta: ${data.get("email")}\nAmbalaj türü: ${data.get("type")}\nTahmini adet: ${data.get("quantity")||"Belirtilmedi"}\n\nProje detayları:\n${data.get("message")}`;window.location.href=`mailto:info@arslanambalaj.com?subject=${encodeURIComponent("Ambalaj projesi / Teklif talebi")}&body=${encodeURIComponent(body)}`;setPrepared(true);};
 return <>
 <a className="skip-link" href="#icerik">İçeriğe geç</a>
 <header className="site-header"><div className="header-inner container"><a className="brand-link" href="#ana-sayfa" aria-label="Arslan Ambalaj ana sayfa" onClick={()=>setMenuOpen(false)}><Brand/></a><nav aria-label="Ana menü" className={menuOpen?"main-nav is-open":"main-nav"} id="main-nav">{[["Ana Sayfa","ana-sayfa"],["Hakkımızda","hakkimizda"],["Portfolyo","portfolyo"],["İletişim","iletisim"]].map(([label,id],i)=><a key={id} href={`#${id}`} className={i===0?"nav-home":""} onClick={()=>setMenuOpen(false)}>{label}</a>)}</nav><a className="button button-outline header-quote" href="#iletisim">Teklif al <ArrowRight size={17}/></a><button className="menu-toggle" aria-controls="main-nav" aria-expanded={menuOpen} aria-label={menuOpen?"Menüyü kapat":"Menüyü aç"} onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X/>:<Menu/>}</button></div></header>
 <main id="icerik">
 <section className="hero" id="ana-sayfa" aria-labelledby="hero-title"><div className="hero-watermark" aria-hidden="true"><Brand/></div><div className="container hero-inner"><div className="hero-copy"><span className="eyebrow hero-eyebrow"><span/> Detaylarda saklı bir fark</span><h1 id="hero-title">ARSLAN<br/><span>AMBALAJ</span></h1><h2>Markanızı en iyi şekilde<br/>sarıyoruz.</h2><span className="fine-rule"/><p>Doğru malzeme, incelikli tasarım ve<br className="desktop-break"/> özenli üretimle markanıza değer katıyoruz.</p><a href="#portfolyo" className="button button-solid">Portfolyomuzu incele <ArrowRight size={19}/></a></div><div className="hero-art"><img src={assetPath("/images/hero.webp")} alt="Tek Arslan Ambalaj logosuyla tasarlanmış kraft kutu koleksiyonu" className="hero-image" fetchPriority="high" width="1536" height="1024"/><span className="hero-caption" aria-hidden="true">TASARIMDAN İLK DOKUNUŞA.</span></div></div><a href="#hizmetlerimiz" className="scroll-cue" aria-label="Hizmetlerimizi keşfedin"><span>Keşfet</span><ChevronDown size={16}/></a></section>
 <section className="values" id="hizmetlerimiz" aria-label="Yaklaşımımız"><div className="container values-inner">{[{Icon:PencilRuler,title:"Özel tasarım",text:"Markanıza ve ürününüze uygun ambalaj çözümleri."},{Icon:Award,title:"Özenli üretim",text:"Malzemeden son dokunuşa kadar düşünülen detaylar."},{Icon:Leaf,title:"Doğal dokular",text:"Kraft, karton ve kâğıdın yalın estetiği."},{Icon:Users,title:"Birlikte tasarlıyoruz",text:"İhtiyacınızı dinleyen, projenize odaklanan yaklaşım."}].map(({Icon,title,text})=><div className="value" key={title}><Icon strokeWidth={1} size={43}/><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></section>
 <section className="portfolio section-pad container" id="portfolyo" aria-labelledby="portfolio-title"><div className="section-heading reveal"><span className="eyebrow">Portfolyo</span><h2 id="portfolio-title">Ambalaj Ürünlerimiz</h2><span className="fine-rule"/><p>Pasta kutuları, pasta altlıkları, kargo kutuları ve markanıza özel ambalaj seçenekleri.</p></div><div className="filters" role="group" aria-label="Portfolyo kategorileri">{categories.map(c=><button key={c} aria-pressed={active===c} className={active===c?"filter active":"filter"} onClick={()=>{setActive(c);setExpanded(false);}}>{c}</button>)}</div><div className="project-grid" aria-live="polite">{visibleProjects.map((project,index)=><button className="project" key={project.id} onClick={()=>setSelected(project)} aria-label={`${project.title} ürününü incele`} style={{animationDelay:`${Math.min(index,3)*65}ms`}}><div className={`project-image-wrap ${project.id===1||project.id===2?"portrait-product":""}`}><img src={img(project.id)} alt={`${project.title} — Arslan Ambalaj ${project.category.toLocaleLowerCase("tr")}`} loading="lazy" width="800" height="800"/><span className="project-open"><Plus size={22} strokeWidth={1}/></span></div><div className="project-description"><div><span>{project.category}</span><h3>{project.title}</h3></div><ArrowUpRight size={19} strokeWidth={1.2}/></div></button>)}</div>{active==="Tümü"&&<div className="portfolio-bottom"><span className="project-count">{String(visibleProjects.length).padStart(2,"0")} / {projects.length} ürün</span><button className="button button-outline" onClick={()=>setExpanded(!expanded)}>{expanded?"Daha az göster":"Tüm ürünleri gör"} {expanded?<ChevronDown className="up" size={18}/>:<ArrowRight size={18}/>}</button><span className="portfolio-footnote" aria-hidden="true"/></div>}</section>
 <section className="about" id="hakkimizda" aria-labelledby="about-title"><div className="container about-inner"><div className="about-copy reveal"><span className="eyebrow">Hakkımızda</span><h2 id="about-title">Ambalajda şıklık,<br/>markanızda <em>fark yaratır.</em></h2><span className="fine-rule"/><p>Bir ambalaj, ürününüzle kurulan ilk bağdır. Arslan Ambalaj olarak bu ilk dokunuşu; estetik, işlev ve markanızın karakteriyle birlikte düşünüyoruz.</p><p>Pasta kutuları ve pasta altlıklarından karton kutulara, özel baskılı ambalajlardan sunum kutularına kadar her detayı aynı tasarım anlayışıyla ele alıyoruz.</p><a href="#iletisim" className="button button-outline">İletişime geç <ArrowRight size={18}/></a></div><div className="about-art"><img src={img(10)} alt="Krem ve altın tonlarında Arslan Ambalaj sunum kutusu" loading="lazy" width="900" height="900"/><span className="about-image-caption"><span>01 — Malzeme & karakter</span><span>Arslan Ambalaj</span></span></div></div></section>
 <section className="process container section-pad" id="surecimiz" aria-labelledby="process-title"><div className="process-heading reveal"><div><span className="eyebrow">Birlikte, adım adım</span><h2 id="process-title">Fikirden ilk açılışa.</h2></div><p>Markanızın ihtiyacını anlamakla başlayan,<br/>detaylarla şekillenen bir yolculuk.</p></div><div className="process-grid">{[{n:"01",Icon:Box,title:"İhtiyacınızı anlayalım",text:"Ürününüzü, ölçüleri, kullanım amacını ve beklentilerinizi birlikte netleştirelim."},{n:"02",Icon:Sparkles,title:"Birlikte şekillendirelim",text:"Malzeme, renk ve baskı detaylarıyla markanıza ait tasarım dilini oluşturalım."},{n:"03",Icon:PackageCheck,title:"Son dokunuşu yapalım",text:"Tasarım ve uygulama detaylarını değerlendirerek projenizi üretime hazırlayalım."}].map(({n,Icon,title,text})=><div className="process-step reveal" key={n}><div className="step-top"><span>{n}</span><Icon size={29} strokeWidth={1}/></div><h3>{title}</h3><p>{text}</p></div>)}</div></section>
 <section className="contact" id="iletisim" aria-labelledby="contact-title"><div className="container contact-inner"><div className="contact-copy reveal"><span className="eyebrow">Yeni bir başlangıç</span><h2 id="contact-title">Güzel bir fikir,<br/><em>bir kutuya sığar.</em></h2><p>Projenizden bahsedin.<br/>Markanıza yakışan ambalajı birlikte düşünelim.</p><a className="contact-email" href="mailto:info@arslanambalaj.com"><Mail size={20} strokeWidth={1.2}/><span>info@arslanambalaj.com</span><ArrowUpRight size={18}/></a><div className="contact-brand"><Brand/><span>İlk dokunuştan itibaren.</span></div></div><form className="quote-form" onSubmit={prepareEmail} onChange={()=>setPrepared(false)}><div className="form-top"><h3>Projenizi konuşalım</h3><span>TEKLİF TALEBİ</span></div><div className="form-row"><label>Adınız soyadınız <span>*</span><input name="name" autoComplete="name" placeholder="Adınız Soyadınız" required maxLength={120}/></label><label>E-posta adresiniz <span>*</span><input type="email" name="email" autoComplete="email" placeholder="ornek@markaniz.com" required maxLength={160}/></label></div><div className="form-row"><label>Ambalaj türü <span>*</span><select name="type" value={quoteType} onChange={e=>setQuoteType(e.target.value)} required><option value="" disabled>Bir tür seçin</option><option>Pasta Kutusu</option><option>Pasta Altlığı</option><option>Kargo Kutusu</option><option>Karton Kutu</option><option>Oluklu Mukavva</option><option>Lüks Kutu</option><option>Etiket & Baskı</option><option>Birlikte karar verelim</option></select></label><label>Tahmini adet<input type="number" name="quantity" placeholder="Örn. 1.000" min="1" max="100000000"/></label></div><label>Biraz projenizden bahsedin <span>*</span><textarea name="message" placeholder="Ürününüz, kutu ölçüleri, baskı beklentiniz..." required rows={3} maxLength={4000}/></label><div className="form-bottom"><button className="button button-solid" type="submit">Talebi hazırla <ArrowRight size={18}/></button></div>{prepared&&<p role="status" className="form-status"><Check size={16}/> E-posta uygulamanız için talep hazırlandı. Gönderimi uygulamanızdan tamamlayabilirsiniz.</p>}</form></div></section>
 </main>
 <footer className="site-footer container"><p>© {new Date().getFullYear()} Arslan Ambalaj. Tüm hakları saklıdır.</p><a href="#ana-sayfa">Yukarı dön <ArrowRight size={15}/></a><span>Özenle tasarlandı. Sevgiyle paketlendi.</span></footer>
 <dialog ref={dialog} className="project-dialog" onCancel={e=>{e.preventDefault();closeProject();}} onClick={e=>{if(e.target===e.currentTarget)closeProject();}} onKeyDown={e=>{if(e.key==="ArrowRight")stepProject(1);if(e.key==="ArrowLeft")stepProject(-1);}} aria-labelledby="project-dialog-title">{selected&&<div className="dialog-inner"><button className="dialog-close icon-button" onClick={closeProject} aria-label="Ürün detayını kapat"><X size={22}/></button><div className="dialog-image"><img src={img(selected.id)} alt={selected.title} width="900" height="900"/></div><div className="dialog-copy"><span className="eyebrow">{selected.category}</span><h2 id="project-dialog-title">{selected.title}</h2><span className="fine-rule"/><p>{selected.detail}</p><a href="#iletisim" className="button button-solid" onClick={e=>{e.preventDefault();requestQuote(selected.category);}}>Bu ürün için teklif al <ArrowRight size={17}/></a><div className="dialog-controls"><span>{String(projects.findIndex(p=>p.id===selected.id)+1).padStart(2,"0")} / {projects.length}</span><div><button className="icon-button" aria-label="Önceki ürün" onClick={()=>stepProject(-1)}><ChevronLeft size={20}/></button><button className="icon-button" aria-label="Sonraki ürün" onClick={()=>stepProject(1)}><ChevronRight size={20}/></button></div></div></div></div>}</dialog>
 </>;
}
