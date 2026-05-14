import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const SERVICES: Record<string, { id: string; name: string; link: string }[]> = {
  MANICURAS: [
    { id: 'manicura-basica', name: 'Manicura básica', link: 'saranails/manicura-basica' },
    { id: 'manicura-esmalte-tradicional', name: 'Manicura esmalte tradicional', link: 'saranails/manicura-esmalte-tradicional' },
    { id: 'manicura-esmalte-semipermanente', name: 'Manicura esmalte semipermanente', link: 'saranails/manicura-esmalte-semipermanente' },
    { id: 'manicura-con-extension', name: 'Manicura con extensión', link: 'saranails/manicura-con-extension' },
  ],
  PEDICURAS: [
    { id: 'pedicura-express', name: 'Pedicura express', link: 'saranails/pedicura-express' },
    { id: 'pedicura-esmalte-tradicional', name: 'Pedicura esmalte tradicional', link: 'saranails/pedicura-esmalte-tradicionan' },
    { id: 'pedicura-esmalte-semipermanente', name: 'Pedicura esmalte semipermanente', link: 'saranails/pedicura-esmalte-semipermanente' },
    { id: 'pedicura-spa-sin-esmalte', name: 'Pedicura SPA sin esmalte', link: 'saranails/pedicura-spa-sin-esmalte' },
    { id: 'pedicura-spa-esmalte-tradicional', name: 'Pedicura SPA esmalte tradicional', link: 'saranails/pedicura-spa-esmalte-tradicional' },
    { id: 'pedicura-spa-esmalte-semipermanente', name: 'Pedicura SPA esmalte semipermanente', link: 'saranails/pedicura-spa-esmalte-semipermanente' },
  ]
};

export const UIOverlay = () => {
  const container = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof SERVICES>('MANICURAS');
  const [selectedServiceId, setSelectedServiceId] = useState(SERVICES['MANICURAS'][0].id);

  const activeService = [...SERVICES.MANICURAS, ...SERVICES.PEDICURAS].find(s => s.id === selectedServiceId)!;

  useGSAP(() => {
    // Fade in Sobre Mi content when it enters viewport
    gsap.to('#info-content', {
      scrollTrigger: {
        trigger: '#sobre-mi',
        start: 'top 60%',
        end: 'top 30%',
        scrub: 1,
      },
      opacity: 1,
      y: 0,
      ease: 'power2.out',
    });

    // Fade out Banner text when scrolling past it
    gsap.to('#banner-text', {
      scrollTrigger: {
        trigger: '#sobre-mi',
        start: 'top bottom',
        end: 'top 50%',
        scrub: 1,
      },
      opacity: 0,
      scale: 0.9,
    });

    // Fade in Citas
    gsap.to('#citas-title', {
      scrollTrigger: {
        trigger: '#citas',
        start: 'top 70%',
        end: 'top 40%',
        scrub: 1,
      },
      opacity: 1,
    });

    gsap.to('#citas-content', {
      scrollTrigger: {
        trigger: '#citas',
        start: 'top 60%',
        end: 'top 30%',
        scrub: 1,
      },
      opacity: 1,
      y: 0,
      ease: 'power3.out',
    });
  }, { scope: container });

  useEffect(() => {
    // Initialize Cal.com library once
    (function (C: any, A, L) {
      let p = function (a: any, ar: any) { a.q.push(ar); };
      let d = C.document;
      C.Cal = C.Cal || function () {
        let cal = C.Cal; let ar = arguments;
        if (!cal.loaded) {
          cal.ns = {}; cal.q = cal.q || [];
          let script = d.createElement("script");
          script.src = A;
          d.head.appendChild(script);
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api: any = function () { p(api, arguments); };
          const namespace = ar[1]; api.q = api.q || [];
          if(typeof namespace === "string"){
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");
  }, []);

  useEffect(() => {
    const Cal = (window as any).Cal;
    if (!Cal) return;

    // Initialize the specific namespace for the selected service
    const ns = activeService.id;
    Cal("init", ns, { origin: "https://app.cal.com" });
    Cal.ns[ns]("inline", {
      elementOrSelector: `#my-cal-inline-${ns}`,
      config: { "layout": "month_view", "useSlotsViewOnSmallScreen": "true" },
      calLink: activeService.link,
    });
    Cal.ns[ns]("ui", { "hideEventTypeDetails": false, "layout": "month_view" });
  }, [activeService]);

  const handleCategoryChange = (cat: keyof typeof SERVICES) => {
    setSelectedCategory(cat);
    setSelectedServiceId(SERVICES[cat][0].id);
  };

  return (
    <div ref={container} className="relative z-10 w-full pointer-events-none">
      
      {/* ───────────────────────────── HEADER ───────────────────────────── */}
      <header className="fixed top-0 w-full flex justify-between items-center px-6 md:px-12 py-6 z-50 pointer-events-auto drop-shadow-xl">
        <div className="flex items-center gap-4 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
          <img src="/img/ico/logo_n.jpg" alt="Sara Logo" className="h-10 w-10 md:h-12 md:w-12 object-cover rounded-full border border-white/20" />
          <span className="font-sans text-xl md:text-2xl tracking-widest text-white uppercase hidden sm:block pt-1">SARA VIERA</span>
        </div>
        <nav className="bg-black/20 backdrop-blur-md px-6 py-4 rounded-full border border-white/10">
          <ul className="flex gap-6 font-sans text-lg tracking-widest text-pink-300 uppercase">
            <li><a href="#sobre-mi" className="hover:text-pink-500 transition-colors drop-shadow-md">Sobre mi</a></li>
            <li><a href="#citas" className="hover:text-pink-500 transition-colors drop-shadow-md">Citas</a></li>
            <li className="hidden md:block"><a href="https://www.instagram.com/elrincondesara_nails/" target="_blank" rel="noreferrer" className="hover:text-pink-500 transition-colors drop-shadow-md">Instagram</a></li>
          </ul>
        </nav>
      </header>

      {/* ───────────────────────────── BANNER/HERO ───────────────────────────── */}
      <section id="banner-section" className="h-screen w-full flex items-center justify-center px-4 md:px-12 pointer-events-none">
        <div id="banner-text" className="text-center mix-blend-screen z-10 pointer-events-none">
          <h1 className="text-[15vw] md:text-[12vw] font-sans tracking-tighter leading-none text-white drop-shadow-[0_0_20px_rgba(236,72,153,0.3)]">
            EL RINCÓN
          </h1>
          <h1 className="text-[15vw] md:text-[12vw] font-sans tracking-tighter leading-none text-transparent" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.8)' }}>
            DE SARA
          </h1>
          <div className="mt-8 flex justify-center items-center gap-4 opacity-80">
            <div className="h-px w-12 md:w-24 bg-pink-500" />
            <span className="font-mono text-pink-500 text-sm md:text-xl tracking-[0.5em] uppercase drop-shadow-md">
              NAIL ARTISTRY
            </span>
            <div className="h-px w-12 md:w-24 bg-pink-500" />
          </div>
        </div>
      </section>

      {/* ───────────────────────────── SOBRE MI ───────────────────────────── */}
      <section id="sobre-mi" className="min-h-screen w-full flex flex-col justify-center px-4 md:px-24 py-32 pointer-events-none relative z-10">
        <div id="info-content" className="w-full max-w-3xl pointer-events-auto bg-black/40 backdrop-blur-2xl p-8 md:p-14 rounded-[2rem] border border-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col gap-10 opacity-0 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-sans uppercase text-white mb-8 drop-shadow-lg">Sobre Mi<span className="text-pink-500">.</span></h2>
            <p className="text-gray-300 font-sans text-xl md:text-2xl leading-relaxed tracking-wide drop-shadow-md">
              Soy Sara Viera, manicurista autónoma. Desde hace unos meses trabajo de forma independiente, dedicándome a ofrecer servicios de manicura personalizados y adaptados a cada clienta. Mi objetivo es seguir creciendo profesionalmente, potenciar mi marca personal y consolidar una cartera de clientas en Menorca basada en la confianza, la calidad y la atención al detalle. Me apasiona el mundo de la estética y busco constantemente mejorar mis técnicas para ofrecer siempre el mejor resultado.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
            <div className="overflow-hidden rounded-2xl md:col-span-1 col-span-2 aspect-[4/3] shadow-xl border border-white/10">
               <img src="/img/manis/mani1.webp" alt="Manicura 1" className="w-full h-full object-cover hover:scale-110 hover:rotate-2 transition-transform duration-700 brightness-90 hover:brightness-110" />
            </div>
            <div className="overflow-hidden rounded-2xl aspect-[4/3] shadow-xl border border-white/10">
               <img src="/img/manis/mani2.webp" alt="Manicura 2" className="w-full h-full object-cover hover:scale-110 hover:-rotate-2 transition-transform duration-700 brightness-90 hover:brightness-110" />
            </div>
            <div className="overflow-hidden rounded-2xl aspect-[4/3] shadow-xl border border-white/10 hidden md:block">
               <img src="/img/manis/mani3.webp" alt="Manicura 3" className="w-full h-full object-cover hover:scale-110 hover:rotate-2 transition-transform duration-700 brightness-90 hover:brightness-110" />
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────── CITAS ───────────────────────────── */}
      <section id="citas" className="min-h-screen w-full pt-32 pb-48 px-4 md:px-12 flex flex-col items-center pointer-events-none relative z-10">
         <h2 id="citas-title" className="text-6xl md:text-8xl font-sans uppercase text-white mb-8 text-center opacity-0 drop-shadow-[0_10px_30px_rgba(236,72,153,0.3)]">
            Reserva tu cita<span className="text-pink-500">.</span>
         </h2>
         
         <div id="citas-content" className="w-full max-w-5xl pointer-events-auto opacity-0 translate-y-24 flex flex-col gap-8">
            
            {/* Category Filter */}
            <div className="flex justify-center gap-4">
              {(Object.keys(SERVICES) as Array<keyof typeof SERVICES>).map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-8 py-3 rounded-full font-sans text-lg tracking-widest uppercase transition-all duration-300 border ${
                    selectedCategory === cat
                      ? 'bg-pink-500 text-white border-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.5)]'
                      : 'bg-white/5 text-pink-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Service Selection */}
            <div className="flex flex-wrap justify-center gap-3">
              {SERVICES[selectedCategory].map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedServiceId(service.id)}
                  className={`px-6 py-2 rounded-xl font-sans text-sm tracking-wider uppercase transition-all duration-300 border ${
                    selectedServiceId === service.id
                      ? 'bg-white/20 text-white border-white/40 shadow-lg'
                      : 'bg-black/40 text-gray-400 border-white/5 hover:border-white/20'
                  }`}
                >
                  {service.name}
                </button>
              ))}
            </div>

            {/* Booking Card */}
            <div className="group bg-black/60 backdrop-blur-3xl rounded-[2.5rem] p-6 md:p-10 border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative overflow-hidden transition-all duration-500 hover:border-pink-500/30">
                <div className="absolute inset-0 bg-gradient-to-b from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative z-10 flex items-center justify-between mb-8 px-4">
                    <h3 className="font-sans text-2xl md:text-3xl text-white tracking-widest uppercase drop-shadow-md">
                      {activeService.name}
                    </h3>
                    <div className="h-[2px] flex-1 mx-8 bg-gradient-to-r from-pink-500/50 to-transparent opacity-50" />
                </div>

                {/* Cal.com Containers - We keep them all in DOM but only show the active one to ensure script initialization works */}
                {[...SERVICES.MANICURAS, ...SERVICES.PEDICURAS].map((service) => (
                  <div
                    key={service.id}
                    id={`my-cal-inline-${service.id}`}
                    className={`relative z-10 w-full min-h-[600px] md:min-h-[700px] overflow-y-auto overflow-x-hidden rounded-3xl bg-black/80 shadow-inner custom-scrollbar-hide ${
                      selectedServiceId === service.id ? 'block' : 'hidden'
                    }`}
                  ></div>
                ))}
            </div>
         </div>
      </section>

      {/* ───────────────────────────── WHATSAPP FLOAT ───────────────────────────── */}
      <a href="https://wa.me/34623386030?text=Hola%20Sara%2C%20tengo%20una%20duda" target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 md:bottom-10 md:right-10 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.6)] z-50 pointer-events-auto hover:scale-110 hover:-translate-y-2 transition-all duration-300 border-2 border-white/20">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-8 h-8" />
      </a>

    </div>
  );
};

