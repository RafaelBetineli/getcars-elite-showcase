import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ShieldCheck,
  Sparkles,
  Gem,
  Handshake,
  Menu,
  X,
  Instagram,
  MessageCircle,
  ArrowRight,
  MapPin,
  Calendar,
  Gauge,
  Shield,
} from "lucide-react";

import heroCar from "@/assets/hero-car.jpg";
import logo from "@/assets/getcars-logo.png";
import car1 from "@/assets/car-1.jpg";
import car2 from "@/assets/car-2.jpg";
import car3 from "@/assets/car-3.jpg";
import car4 from "@/assets/car-4.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const WHATSAPP_NUMBER = "5511999999999";
const INSTAGRAM_URL = "https://instagram.com/getcars";
const BADGE = "Revenda Especializada em Veículos Premium";

function whatsappLink(mensagem?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base;
}

const nav = [
  { label: "Início", href: "#inicio" },
  { label: "Veículos", href: "#veiculos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Venda seu veículo", href: "#venda" },
  { label: "Contato", href: "#contato" },
];

const diferenciais = [
  { icon: ShieldCheck, title: "Procedência Garantida", text: "Avaliação técnica e documental criteriosa em todos os veículos negociados." },
  { icon: Sparkles, title: "Atendimento Personalizado", text: "Consultoria exclusiva para conectar você ao veículo ideal ao seu perfil." },
  { icon: Gem, title: "Premium e Blindados", text: "Curadoria de esportivos, SUVs de luxo, caminhonetes e veículos blindados." },
  { icon: Handshake, title: "Compra, Venda e Intermediação", text: "Negociações seguras, transparentes e conduzidas com discrição absoluta." },
];

const veiculos = [
  { img: car1, nome: "Porsche 911 Turbo S", ano: "2023", km: "8.400 km", blindagem: "Blindado Nível III-A", destaque: "Esportivo · Coleção" },
  { img: car2, nome: "Range Rover Autobiography", ano: "2024", km: "12.100 km", blindagem: "Blindado Nível III-A", destaque: "SUV de Luxo" },
  { img: car3, nome: "Mercedes-Benz G63 AMG", ano: "2023", km: "15.700 km", blindagem: "Original de fábrica", destaque: "Ícone off-road" },
  { img: car4, nome: "BMW M5 Competition", ano: "2022", km: "22.300 km", blindagem: "Blindado Nível III-A", destaque: "Alta performance" },
];

function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const veiculoDestaque = veiculos[0];
  const veiculosGrid = veiculos.slice(1);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/80 backdrop-blur-xl border-b border-gold-subtle" : "bg-transparent"}`}>
        <div className="mx-auto max-w-[1720px] px-6 md:px-10 lg:px-16 xl:px-24">
          <div className="grid grid-cols-[auto_1fr_auto] items-center h-20 lg:h-24 gap-6">
            <a href="#inicio" className="flex items-center gap-3 shrink-0">
              <img src={logo} alt="GETCARS" className="h-11 w-11 object-contain" width={44} height={44} />
              <span className="font-display text-2xl tracking-[0.28em] text-gold-gradient font-semibold">GETCARS</span>
            </a>

            <nav className="hidden lg:flex items-center justify-center gap-12">
              {nav.map((n) => (
                <a key={n.href} href={n.href} className="text-[13px] text-muted-foreground hover:text-gold transition-colors tracking-[0.15em] uppercase">
                  {n.label}
                </a>
              ))}
            </nav>

            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-gold-subtle text-gold text-xs uppercase tracking-[0.2em] hover:bg-gold hover:text-primary-foreground transition-all">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>

            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-gold p-2 justify-self-end" aria-label="Menu">
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {menuOpen && (
            <div className="lg:hidden pb-6 pt-2 space-y-1 border-t border-gold-subtle">
              {nav.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="block px-2 py-3 text-muted-foreground hover:text-gold transition-colors">
                  {n.label}
                </a>
              ))}
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-gradient text-primary-foreground text-sm font-medium">
                <MessageCircle className="h-4 w-4" />
                Falar no WhatsApp
              </a>
            </div>
          )}
        </div>
      </header>

      {/* HERO */}
      <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image full width, positioned right */}
        <div className="absolute inset-0">
          <img
            src={heroCar}
            alt="Veículo premium GETCARS"
            className="h-full w-full object-cover object-[70%_center] lg:object-[75%_center]"
            width={1920}
            height={1080}
          />
          {/* Cinematic overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 md:via-background/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,oklch(0.08_0.005_60/0.6),transparent_60%)]" />
          {/* Grain-like subtle vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/80" />
        </div>

        <div className="relative mx-auto max-w-[1720px] w-full px-6 md:px-10 lg:px-16 xl:px-24 pt-32 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 xl:col-span-5">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border-gold-subtle mb-10 bg-background/40 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                <span className="text-[10px] sm:text-xs tracking-[0.3em] text-gold uppercase">{BADGE}</span>
              </div>

              <h1 className="font-display text-[2.75rem] sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-medium leading-[1.02] mb-8 tracking-tight">
                Veículos <span className="text-gold-gradient italic">Premium</span>,
                <br />
                Exclusivos e <span className="text-gold-gradient italic">Blindados</span>
              </h1>

              <p className="text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed mb-12">
                Revenda especializada em veículos de alto padrão, com atendimento personalizado, qualidade e procedência.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#veiculos" className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gold-gradient text-primary-foreground font-medium tracking-wide hover:shadow-[0_0_50px_-5px_var(--gold)] transition-all">
                  Ver veículos disponíveis
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href={whatsappLink("Olá, GETCARS! Gostaria de conhecer os veículos disponíveis.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-gold-subtle text-gold hover:bg-gold hover:text-primary-foreground transition-all">
                  <MessageCircle className="h-4 w-4" />
                  Falar no WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Bottom scroll indicator / meta */}
          <div className="absolute left-6 md:left-10 lg:left-16 xl:left-24 right-6 md:right-10 lg:right-16 xl:right-24 bottom-8 hidden md:flex items-end justify-between text-[10px] tracking-[0.3em] uppercase text-muted-foreground/70">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold/50" />
              <span>Coleção 2026</span>
            </div>
            <div className="flex items-center gap-3">
              <span>Role para descobrir</span>
              <span className="h-px w-10 bg-gold/50" />
            </div>
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="py-28 lg:py-40 relative">
        <div className="mx-auto max-w-[1720px] px-6 md:px-10 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20 items-end">
            <div className="lg:col-span-6">
              <p className="text-[11px] tracking-[0.35em] text-gold uppercase mb-5">Nossos Diferenciais</p>
              <h2 className="font-display text-4xl lg:text-6xl font-medium leading-[1.05]">
                A experiência de quem <span className="text-gold-gradient italic">exige o melhor</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Cada etapa da negociação é conduzida com discrição, transparência e um cuidado que só uma revenda especializada em veículos premium pode oferecer.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gold/10 rounded-lg overflow-hidden border-gold-subtle">
            {diferenciais.map((d, i) => (
              <div
                key={d.title}
                className="bg-background hover:bg-surface/60 transition-colors duration-500 p-10 lg:p-14 group relative"
              >
                <div className="flex items-start gap-6">
                  <div className="shrink-0 h-16 w-16 rounded-full border-gold-subtle flex items-center justify-center group-hover:bg-gold/10 group-hover:border-gold/60 transition-all duration-500">
                    <d.icon className="h-6 w-6 text-gold" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] tracking-[0.3em] text-gold/60 uppercase">0{i + 1}</span>
                      <span className="h-px flex-1 bg-gold/20" />
                    </div>
                    <h3 className="font-display text-2xl lg:text-3xl mb-3 text-foreground">{d.title}</h3>
                    <p className="text-[15px] text-muted-foreground leading-relaxed">{d.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VEÍCULOS */}
      <section id="veiculos" className="py-28 lg:py-40 bg-surface/40 border-y border-gold-subtle relative">
        <div className="mx-auto max-w-[1720px] px-6 md:px-10 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 items-end">
            <div className="lg:col-span-7">
              <p className="text-[11px] tracking-[0.35em] text-gold uppercase mb-5">Coleção em destaque</p>
              <h2 className="font-display text-4xl lg:text-6xl font-medium leading-[1.05]">
                Veículos em <span className="text-gold-gradient italic">destaque</span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-muted-foreground leading-relaxed">
                Uma curadoria exclusiva, atualizada semanalmente, com procedência verificada e veículos preparados para entrega imediata.
              </p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground/80 italic max-w-4xl mb-16 leading-relaxed border-l-2 border-gold/40 pl-5">
            Os valores são informados mediante consulta para garantir uma negociação personalizada, considerando forma de pagamento, troca, financiamento e condições comerciais.
          </p>

          {/* Editorial layout: 1 hero card + grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Featured car */}
            <article className="lg:col-span-7 card-premium card-premium-hover rounded-lg overflow-hidden group flex flex-col">
              <div className="relative aspect-[16/11] overflow-hidden bg-black">
                <img src={veiculoDestaque.img} alt={veiculoDestaque.nome} loading="lazy" width={1600} height={1100} className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/70 backdrop-blur border-gold-subtle">
                  <Shield className="h-3.5 w-3.5 text-gold" />
                  <span className="text-[10px] tracking-[0.25em] uppercase text-gold">{veiculoDestaque.blindagem}</span>
                </div>
                <div className="absolute top-6 right-6 text-[10px] tracking-[0.3em] uppercase text-gold/80">
                  {veiculoDestaque.destaque}
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2">Destaque da semana</p>
                  <h3 className="font-display text-3xl lg:text-5xl">{veiculoDestaque.nome}</h3>
                </div>
              </div>
              <div className="p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center gap-8">
                <div className="flex-1 min-w-0">
                  <p className="text-gold-soft text-sm tracking-wide mb-4">Valor mediante consulta</p>
                  <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-gold" /><span>{veiculoDestaque.ano}</span></div>
                    <div className="flex items-center gap-2"><Gauge className="h-4 w-4 text-gold" /><span>{veiculoDestaque.km}</span></div>
                  </div>
                </div>
                <a
                  href={whatsappLink(`Olá, GETCARS! Tenho interesse no ${veiculoDestaque.nome} e gostaria de receber mais informações.`)}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gold-gradient text-primary-foreground text-sm font-medium tracking-wide hover:shadow-[0_0_40px_-8px_var(--gold)] transition-all shrink-0"
                >
                  <MessageCircle className="h-4 w-4" />
                  Tenho interesse
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </article>

            {/* Side grid */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-8">
              {veiculosGrid.map((v) => (
                <article key={v.nome} className="card-premium card-premium-hover rounded-lg overflow-hidden group grid grid-cols-1 sm:grid-cols-2">
                  <div className="relative aspect-[4/3] sm:aspect-auto overflow-hidden bg-black">
                    <img src={v.img} alt={v.nome} loading="lazy" width={800} height={600} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur border-gold-subtle">
                      <Shield className="h-3 w-3 text-gold" />
                      <span className="text-[9px] tracking-wider uppercase text-gold">{v.blindagem}</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col">
                    <p className="text-[10px] tracking-[0.25em] uppercase text-gold/70 mb-2">{v.destaque}</p>
                    <h3 className="font-display text-xl lg:text-2xl mb-2 leading-tight">{v.nome}</h3>
                    <p className="text-gold-soft text-xs tracking-wide mb-4">Valor mediante consulta</p>
                    <div className="flex flex-wrap gap-4 mb-5 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-gold" />{v.ano}</div>
                      <div className="flex items-center gap-1.5"><Gauge className="h-3.5 w-3.5 text-gold" />{v.km}</div>
                    </div>
                    <a
                      href={whatsappLink(`Olá, GETCARS! Tenho interesse no ${v.nome} e gostaria de receber mais informações.`)}
                      target="_blank" rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border-gold-subtle text-gold text-xs uppercase tracking-[0.15em] hover:bg-gold hover:text-primary-foreground transition-all"
                    >
                      Consultar veículo
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VENDA */}
      <section id="venda" className="py-28 lg:py-40 relative overflow-hidden">
        <div className="mx-auto max-w-[1720px] px-6 md:px-10 lg:px-16 xl:px-24">
          <div className="relative rounded-lg overflow-hidden border-gold-subtle">
            <div className="absolute inset-0">
              <img src={heroCar} alt="" className="h-full w-full object-cover object-center opacity-40" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,oklch(0.78_0.13_80/0.15),transparent_55%)]" />
            </div>

            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 p-10 md:p-16 lg:p-24 items-center min-h-[520px]">
              <div className="lg:col-span-7">
                <p className="text-[11px] tracking-[0.35em] text-gold uppercase mb-5">Avaliação Premium</p>
                <h2 className="font-display text-4xl lg:text-6xl font-medium mb-8 leading-[1.05]">
                  Venda ou negocie seu <span className="text-gold-gradient italic">veículo premium</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mb-10 leading-relaxed">
                  A GETCARS avalia veículos de alto padrão e oferece uma negociação transparente, segura e personalizada.
                </p>
                <a href={whatsappLink("Olá, GETCARS! Gostaria de vender meu veículo e solicitar uma avaliação.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-9 py-4 rounded-full bg-gold-gradient text-primary-foreground font-medium tracking-wide hover:shadow-[0_0_50px_-5px_var(--gold)] transition-all">
                  <MessageCircle className="h-5 w-5" />
                  Solicitar avaliação
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="py-28 lg:py-40 bg-surface/40 border-y border-gold-subtle">
        <div className="mx-auto max-w-[1720px] px-6 md:px-10 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <p className="text-[11px] tracking-[0.35em] text-gold uppercase mb-5">Sobre a GETCARS</p>
              <h2 className="font-display text-4xl lg:text-6xl font-medium leading-[1.05]">
                Uma revenda para quem <span className="text-gold-gradient italic">reconhece valor</span>
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-8 text-lg text-muted-foreground leading-relaxed">
              <p>
                A <span className="text-gold-soft">GETCARS</span> é uma revenda especializada em compra, venda e intermediação de veículos premium, exclusivos e blindados. Nosso compromisso é oferecer uma experiência segura, transparente e personalizada para clientes que buscam veículos diferenciados, com qualidade e procedência.
              </p>
              <p>
                Atuamos com atendimento consultivo, negociação personalizada e suporte completo durante o processo de compra ou venda.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-6 border-t border-gold-subtle">
                <div>
                  <p className="font-display text-4xl text-gold-gradient mb-1">+10 anos</p>
                  <p className="text-sm">de mercado premium</p>
                </div>
                <div>
                  <p className="font-display text-4xl text-gold-gradient mb-1">100%</p>
                  <p className="text-sm">procedência verificada</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="py-28 lg:py-40">
        <div className="mx-auto max-w-[1720px] px-6 md:px-10 lg:px-16 xl:px-24">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <p className="text-[11px] tracking-[0.35em] text-gold uppercase mb-5">Contato</p>
            <h2 className="font-display text-4xl lg:text-6xl font-medium">
              Vamos <span className="text-gold-gradient italic">conversar</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <a href={whatsappLink("Olá, GETCARS! Gostaria de falar com um consultor.")} target="_blank" rel="noopener noreferrer" className="card-premium card-premium-hover rounded-lg p-10 lg:p-12 flex items-center gap-6 group">
              <div className="h-16 w-16 rounded-full bg-gold-gradient flex items-center justify-center shrink-0">
                <MessageCircle className="h-7 w-7 text-primary-foreground" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] tracking-[0.3em] text-gold uppercase mb-1">WhatsApp</p>
                <p className="font-display text-2xl mb-1">Atendimento direto</p>
                <p className="text-sm text-muted-foreground truncate">Seg-Sáb · 9h às 19h</p>
              </div>
            </a>

            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="card-premium card-premium-hover rounded-lg p-10 lg:p-12 flex items-center gap-6 group">
              <div className="h-16 w-16 rounded-full bg-gold-gradient flex items-center justify-center shrink-0">
                <Instagram className="h-7 w-7 text-primary-foreground" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] tracking-[0.3em] text-gold uppercase mb-1">Instagram</p>
                <p className="font-display text-2xl mb-1">@getcars</p>
                <p className="text-sm text-muted-foreground truncate">Coleção em tempo real</p>
              </div>
            </a>
          </div>

          <div className="mt-12 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-gold" />
            <span>Showroom em São Paulo · Atendimento em todo o Brasil</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gold-subtle bg-surface/60">
        <div className="mx-auto max-w-[1720px] px-6 md:px-10 lg:px-16 xl:px-24 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <img src={logo} alt="GETCARS" className="h-10 w-10 object-contain" width={40} height={40} loading="lazy" />
                <span className="font-display text-xl tracking-[0.28em] text-gold-gradient font-semibold">GETCARS</span>
              </div>
              <p className="text-muted-foreground italic font-display text-lg leading-relaxed">
                Veículos premium, exclusivos e blindados.
              </p>
            </div>

            <div>
              <p className="text-[10px] tracking-[0.3em] text-gold uppercase mb-6">Navegação</p>
              <ul className="space-y-3">
                {nav.map((n) => (
                  <li key={n.href}>
                    <a href={n.href} className="text-sm text-muted-foreground hover:text-gold transition-colors">
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[10px] tracking-[0.3em] text-gold uppercase mb-6">Contato</p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors inline-flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </a>
                </li>
                <li>
                  <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors inline-flex items-center gap-2">
                    <Instagram className="h-4 w-4" /> @getcars
                  </a>
                </li>
                <li className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> São Paulo, Brasil
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gold-subtle flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-muted-foreground tracking-[0.2em]">
            <p>© {new Date().getFullYear()} GETCARS · Todos os direitos reservados.</p>
            <p className="uppercase text-gold/70">Qualidade · Procedência · Exclusividade</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
