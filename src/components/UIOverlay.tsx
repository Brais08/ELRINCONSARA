import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const UIOverlay = () => {
  const container = useRef<HTMLDivElement>(null);

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
    // Cal inline embed code
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

    const Cal = (window as any).Cal;
    Cal("init", "mani-base", {origin:"https://app.cal.com"});
    Cal.ns["mani-base"]("inline", {
      elementOrSelector:"#my-cal-inline-mani-base",
      config: {"layout":"month_view","useSlotsViewOnSmallScreen":"true"},
      calLink: "brais-manent-miranda-kyxgw2/mani-base",
    });
    Cal.ns["mani-base"]("ui", {"cssVarsPerTheme":{"light":{"cal-brand":"#ec4899"},"dark":{"cal-brand":"#ec4899"}},"hideEventTypeDetails":false,"layout":"month_view"});

    Cal("init", "mani-comple", {origin:"https://app.cal.com"});
    Cal.ns["mani-comple"]("inline", {
      elementOrSelector:"#my-cal-inline-mani-comple",
      config: {"layout":"month_view","useSlotsViewOnSmallScreen":"true"},
      calLink: "brais-manent-miranda-kyxgw2/mani-comple",
    });
    Cal.ns["mani-comple"]("ui", {"cssVarsPerTheme":{"light":{"cal-brand":"#ec4899"},"dark":{"cal-brand":"#ec4899"}},"hideEventTypeDetails":false,"layout":"month_view"});
  }, []);

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
      <section id="citas" className="min-h-[120vh] w-full pt-32 pb-48 px-4 md:px-12 flex flex-col items-center pointer-events-none relative z-10">
         <h2 id="citas-title" className="text-6xl md:text-8xl font-sans uppercase text-white mb-16 text-center opacity-0 drop-shadow-[0_10px_30px_rgba(236,72,153,0.3)]">
            Reserva tu cita<span className="text-pink-500">.</span>
         </h2>
         <div id="citas-content" className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 pointer-events-auto opacity-0 translate-y-24">
            
            <div className="group bg-black/60 backdrop-blur-3xl rounded-[2.5rem] p-6 md:p-10 border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative overflow-hidden transition-all duration-500 hover:border-pink-500/50">
                <div className="absolute inset-0 bg-gradient-to-b from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10 flex items-center justify-between mb-8 px-4">
                    <h3 className="font-sans text-3xl md:text-4xl text-white tracking-widest uppercase drop-shadow-md">Base</h3>
                    <div className="h-[2px] flex-1 mx-8 bg-gradient-to-r from-pink-500 to-transparent opacity-50" />
                </div>
                <div id="my-cal-inline-mani-base" className="relative z-10 w-full min-h-[700px] overflow-y-auto overflow-x-hidden rounded-3xl bg-black/80 shadow-inner custom-scrollbar-hide"></div>
            </div>
            
            <div className="group bg-black/60 backdrop-blur-3xl rounded-[2.5rem] p-6 md:p-10 border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative overflow-hidden transition-all duration-500 hover:border-pink-500/50">
                <div className="absolute inset-0 bg-gradient-to-b from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10 flex items-center justify-between mb-8 px-4">
                    <h3 className="font-sans text-3xl md:text-4xl text-white tracking-widest uppercase drop-shadow-md">Completa</h3>
                    <div className="h-[2px] flex-1 mx-8 bg-gradient-to-r from-pink-500 to-transparent opacity-50" />
                </div>
                <div id="my-cal-inline-mani-comple" className="relative z-10 w-full min-h-[700px] overflow-y-auto overflow-x-hidden rounded-3xl bg-black/80 shadow-inner custom-scrollbar-hide"></div>
            </div>

         </div>
      </section>

      {/* ───────────────────────────── WHATSAPP FLOAT ───────────────────────────── */}
      <a href="https://wa.me/34657331751?text=Hola%20Sara%2C%20tengo%20una%20duda" target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 md:bottom-10 md:right-10 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.6)] z-50 pointer-events-auto hover:scale-110 hover:-translate-y-2 transition-all duration-300 border-2 border-white/20">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-8 h-8" />
      </a>

    </div>
  );
};
