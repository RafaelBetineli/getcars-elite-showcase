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
  BadgeCheck,
  ClipboardCheck,
  Compass,
  KeyRound,
} from "lucide-react";

import heroCar from "@/assets/hero-car.jpg";
import logo from "@/assets/getcars-logo.png";
import { vehicles, type Vehicle } from "@/data/vehicles";

export const Route = createFileRoute("/")({
  component: Index,
});

const WHATSAPP_NUMBER = "5511997292805";
const INSTAGRAM_URL = "https://instagram.com/getcars_/";
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

const jornada = [
  {
    icon: Gem,
    step: "01",
    title: "Curadoria",
    text: "Selecionamos veículos premium com foco em qualidade, perfil comercial e oportunidade.",
  },
  {
    icon: ShieldCheck,
    step: "02",
    title: "Procedência",
    text: "Analisamos documentação, histórico e critérios essenciais para uma negociação segura.",
  },
  {
    icon: Handshake,
    step: "03",
    title: "Negociação",
    text: "Conduzimos cada etapa com transparência, discrição e atenção ao perfil do cliente.",
  },
  {
    icon: KeyRound,
    step: "04",
    title: "Entrega",
    text: "Oferecemos suporte até a conclusão do processo de compra, venda ou intermediação.",
  },
];

const etapasVenda = [
  {
    icon: ClipboardCheck,
    step: "01",
    title: "Avaliação",
    text: "Analisamos modelo, estado, histórico, documentação e perfil comercial do veículo.",
  },
  {
    icon: Compass,
    step: "02",
    title: "Estratégia",
    text: "Definimos a melhor forma de negociação, seja venda direta, troca ou intermediação.",
  },
  {
    icon: KeyRound,
    step: "03",
    title: "Negociação",
    text: "Conduzimos o contato com interessados de forma transparente, segura e personalizada.",
  },
];

const pilares = [
  {
    icon: Gem,
    title: "Curadoria premium",
    text: "Veículos selecionados com atenção ao perfil, estado e oportunidade.",
  },
  {
    icon: ShieldCheck,
    title: "Procedência e documentação",
    text: "Análise criteriosa para garantir mais segurança em cada negociação.",
  },
  {
    icon: Sparkles,
    title: "Atendimento personalizado",
    text: "Contato direto, consultivo e adaptado ao objetivo de cada cliente.",
  },
  {
    icon: Handshake,
    title: "Negociação segura",
    text: "Processo conduzido com clareza, discrição e suporte até a conclusão.",
  },
];

function StatusBadge({ vehicle, size = "md" }: { vehicle: Vehicle; size?: "sm" | "md" }) {
  const Icon = vehicle.statusType === "armored" ? Shield : BadgeCheck;
  const isSm = size === "sm";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-background/75 backdrop-blur border-gold-subtle ${
        isSm ? "px-2.5 py-1" : "px-3.5 py-1.5"
      }`}
    >
      <Icon className={isSm ? "h-3 w-3 text-gold" : "h-3.5 w-3.5 text-gold"} />
      <span
        className={`uppercase text-gold ${
          isSm ? "text-[9px] tracking-wider" : "text-[10px] tracking-[0.25em]"
        }`}
      >
        {vehicle.statusLabel}
      </span>
    </span>
  );
}

function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const veiculoDestaque = vehicles.find((v) => v.destaque) ?? vehicles[0];
  const veiculosGrid = vehicles.filter((v) => v.id !== veiculoDestaque.id);

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
        <div className="absolute inset-0">
          <img
            src={heroCar}
            alt="Veículo premium GETCARS"
            className="h-full w-full object-cover object-[70%_center] lg:object-[75%_center]"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 md:via-background/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,oklch(0.08_0.005_60/0.6),transparent_60%)]" />
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

      {/* JORNADA GETCARS — timeline editorial */}
      <section className="py-28 lg:py-40 relative">
        <div className="mx-auto max-w-[1720px] px-6 md:px-10 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
            {/* Editorial column */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
              <p className="text-[11px] tracking-[0.35em] text-gold uppercase mb-6">A jornada GETCARS</p>
              <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-medium leading-[1.05] mb-8">
                Uma experiência premium do <span className="text-gold-gradient italic">primeiro contato</span> à entrega
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                Cada veículo é tratado com critério, cada negociação com transparência e cada cliente com atendimento personalizado.
              </p>
              <div className="hidden lg:block relative aspect-[4/5] rounded-lg overflow-hidden border-gold-subtle">
                <img
                  src={heroCar}
                  alt="Detalhe automotivo premium"
                  loading="lazy"
                  className="h-full w-full object-cover object-[60%_center] grayscale-[15%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              </div>
            </div>

            {/* Timeline column */}
            <div className="lg:col-span-7 relative">
              <div className="absolute left-6 lg:left-7 top-3 bottom-3 w-px bg-gradient-to-b from-gold/40 via-gold/15 to-transparent" aria-hidden />
              <ol className="space-y-10 lg:space-y-14">
                {jornada.map((j) => (
                  <li key={j.step} className="relative pl-20 lg:pl-24 group">
                    <div className="absolute left-0 top-0 h-12 w-12 lg:h-14 lg:w-14 rounded-full border-gold-subtle bg-background flex items-center justify-center group-hover:border-gold/60 group-hover:bg-gold/5 transition-all duration-500">
                      <j.icon className="h-5 w-5 text-gold" />
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] tracking-[0.35em] text-gold/70 uppercase">{j.step}</span>
                      <span className="h-px w-10 bg-gold/25" />
                    </div>
                    <h3 className="font-display text-2xl lg:text-3xl mb-3 text-foreground leading-tight">
                      {j.title}
                    </h3>
                    <p className="text-[15px] text-muted-foreground leading-relaxed max-w-xl">{j.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>



      {/* VEÍCULOS */}
      <section id="veiculos" className="py-28 lg:py-40 bg-surface/40 border-y border-gold-subtle relative">
        <div className="mx-auto max-w-[1720px] px-6 md:px-10 lg:px-16 xl:px-24">
          <div className="max-w-4xl mb-16 lg:mb-20">
            <p className="text-[11px] tracking-[0.35em] text-gold uppercase mb-5">Coleção em destaque</p>
            <h2 className="font-display text-4xl lg:text-6xl font-medium leading-[1.05] mb-8">
              Veículos em <span className="text-gold-gradient italic">destaque</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-3xl">
              Uma seleção de veículos premium, exclusivos e blindados, escolhidos com foco em qualidade, procedência e oportunidade.
            </p>
            <div className="max-w-3xl border-l-2 border-gold/50 pl-5 py-1">
              <p className="text-sm text-muted-foreground/85 italic leading-relaxed">
                Os valores são informados mediante consulta para garantir uma negociação personalizada, considerando forma de pagamento, troca, financiamento e condições comerciais.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Featured car */}
            <article className="lg:col-span-7 card-premium card-premium-hover rounded-lg overflow-hidden group flex flex-col">
              <div className="relative aspect-[16/11] overflow-hidden bg-black">
                <img src={veiculoDestaque.img} alt={veiculoDestaque.nome} loading="lazy" width={1600} height={1100} className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute top-6 left-6">
                  <StatusBadge vehicle={veiculoDestaque} />
                </div>
                <div className="absolute top-6 right-6 text-[10px] tracking-[0.3em] uppercase text-gold/80">
                  {veiculoDestaque.categoria}
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
                  href={whatsappLink(veiculoDestaque.whatsappMensagem)}
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
                <article key={v.id} className="card-premium card-premium-hover rounded-lg overflow-hidden group grid grid-cols-1 sm:grid-cols-2">
                  <div className="relative aspect-[4/3] sm:aspect-auto overflow-hidden bg-black">
                    <img src={v.img} alt={v.nome} loading="lazy" width={800} height={600} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute top-3 left-3">
                      <StatusBadge vehicle={v} size="sm" />
                    </div>
                  </div>
                  <div className="p-6 flex flex-col">
                    <p className="text-[10px] tracking-[0.25em] uppercase text-gold/70 mb-2">{v.categoria}</p>
                    <h3 className="font-display text-xl lg:text-2xl mb-2 leading-tight">{v.nome}</h3>
                    <p className="text-gold-soft text-xs tracking-wide mb-4">Valor mediante consulta</p>
                    <div className="flex flex-wrap gap-4 mb-5 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-gold" />{v.ano}</div>
                      <div className="flex items-center gap-1.5"><Gauge className="h-3.5 w-3.5 text-gold" />{v.km}</div>
                    </div>
                    <a
                      href={whatsappLink(v.whatsappMensagem)}
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

      {/* VENDA — serviço premium */}
      <section id="venda" className="py-28 lg:py-40 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.78_0.13_80/0.08),transparent_60%)]" />
        </div>
        <div className="relative mx-auto max-w-[1720px] px-6 md:px-10 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 mb-16 lg:mb-20 items-end">
            <div className="lg:col-span-7">
              <p className="text-[11px] tracking-[0.35em] text-gold uppercase mb-5">Avaliação · Intermediação</p>
              <h2 className="font-display text-4xl lg:text-6xl font-medium leading-[1.05]">
                Seu veículo premium em uma <span className="text-gold-gradient italic">negociação à altura</span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-lg text-muted-foreground leading-relaxed">
                A GETCARS auxilia proprietários que desejam vender, trocar ou intermediar veículos de alto padrão com segurança, discrição e posicionamento adequado.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-14">
            {etapasVenda.map((e) => (
              <div
                key={e.step}
                className="group rounded-lg border-gold-subtle bg-surface/50 hover:bg-surface/80 transition-all duration-500 p-8 lg:p-10 flex flex-col"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="h-12 w-12 rounded-full border-gold-subtle flex items-center justify-center group-hover:bg-gold/10 group-hover:border-gold/60 transition-all">
                    <e.icon className="h-5 w-5 text-gold" />
                  </div>
                  <span className="font-display text-4xl text-gold-gradient">{e.step}</span>
                </div>
                <h3 className="font-display text-2xl lg:text-3xl mb-3 leading-tight">{e.title}</h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">{e.text}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={whatsappLink("Olá, GETCARS! Gostaria de solicitar uma avaliação para o meu veículo.")}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gold-gradient text-primary-foreground font-medium tracking-wide hover:shadow-[0_0_50px_-5px_var(--gold)] transition-all"
            >
              Solicitar avaliação
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={whatsappLink("Olá, GETCARS! Gostaria de entender como funciona a intermediação de veículos.")}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-gold-subtle text-gold hover:bg-gold hover:text-primary-foreground transition-all"
            >
              Entender como funciona
            </a>
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="py-28 lg:py-40 bg-surface/40 border-y border-gold-subtle">
        <div className="mx-auto max-w-[1720px] px-6 md:px-10 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 mb-16 lg:mb-24">
            <div className="lg:col-span-5">
              <p className="text-[11px] tracking-[0.35em] text-gold uppercase mb-5">Sobre a GETCARS</p>
              <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-medium leading-[1.05]">
                Uma revenda para quem valoriza <span className="text-gold-gradient italic">procedência, discrição e alto padrão</span>
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-7 text-lg text-muted-foreground leading-relaxed">
              <p>
                A <span className="text-gold-soft">GETCARS</span> atua na compra, venda e intermediação de veículos premium, exclusivos e blindados, oferecendo uma experiência segura, transparente e personalizada para clientes que buscam veículos diferenciados.
              </p>
              <p>
                Mais do que apresentar veículos, nosso trabalho é conduzir cada negociação com critério, atenção aos detalhes e suporte completo durante todo o processo de compra ou venda.
              </p>
            </div>
          </div>

          <div className="mb-10 flex items-center gap-4">
            <span className="h-px w-10 bg-gold/50" />
            <p className="text-[11px] tracking-[0.35em] text-gold uppercase">O padrão GETCARS</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {pilares.map((p, i) => (
              <div
                key={p.title}
                className="group relative rounded-lg border-gold-subtle bg-background/50 hover:bg-surface/70 transition-all duration-500 p-8 lg:p-10 flex flex-col min-h-[240px]"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="h-12 w-12 rounded-full border-gold-subtle flex items-center justify-center group-hover:bg-gold/10 group-hover:border-gold/60 transition-all">
                    <p.icon className="h-5 w-5 text-gold" />
                  </div>
                  <span className="text-[10px] tracking-[0.35em] text-gold/60 uppercase">0{i + 1}</span>
                </div>
                <h3 className="font-display text-xl lg:text-2xl mb-3 leading-tight text-foreground">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="py-28 lg:py-40 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.78_0.13_80/0.06),transparent_65%)]" />
        </div>
        <div className="relative mx-auto max-w-[1720px] px-6 md:px-10 lg:px-16 xl:px-24">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <p className="text-[11px] tracking-[0.35em] text-gold uppercase mb-5">Contato</p>
            <h2 className="font-display text-4xl lg:text-6xl font-medium leading-[1.05] mb-6">
              Pronto para encontrar seu próximo <span className="text-gold-gradient italic">veículo premium?</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Fale com a GETCARS para consultar veículos disponíveis, negociar seu veículo ou receber atendimento personalizado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            <a href={whatsappLink("Olá, GETCARS! Gostaria de falar com um consultor.")} target="_blank" rel="noopener noreferrer" className="card-premium card-premium-hover rounded-lg p-10 lg:p-12 flex flex-col group">
              <div className="flex items-center gap-5 mb-6">
                <div className="h-14 w-14 rounded-full bg-gold-gradient flex items-center justify-center shrink-0">
                  <MessageCircle className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.3em] text-gold uppercase mb-1">WhatsApp</p>
                  <p className="font-display text-2xl">Atendimento direto</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Atendimento direto para consultas, avaliações e negociações.
              </p>
              <span className="mt-auto inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold group-hover:gap-3 transition-all">
                Iniciar conversa <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </a>

            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="card-premium card-premium-hover rounded-lg p-10 lg:p-12 flex flex-col group">
              <div className="flex items-center gap-5 mb-6">
                <div className="h-14 w-14 rounded-full bg-gold-gradient flex items-center justify-center shrink-0">
                  <Instagram className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.3em] text-gold uppercase mb-1">Instagram</p>
                  <p className="font-display text-2xl">@getcars_</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Acompanhe oportunidades, novidades e veículos em destaque.
              </p>
              <span className="mt-auto inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold group-hover:gap-3 transition-all">
                Seguir perfil <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </a>
          </div>

          <div className="mt-14 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-gold" />
            <span>Atendimento em São Paulo e em todo o Brasil</span>
          </div>
        </div>
      </section>


      {/* FOOTER */}
      <footer className="border-t border-gold-subtle bg-surface/60">
        <div className="mx-auto max-w-[1720px] px-6 md:px-10 lg:px-16 xl:px-24 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={logo} alt="GETCARS" className="h-9 w-9 object-contain" width={36} height={36} loading="lazy" />
                <span className="font-display text-lg tracking-[0.28em] text-gold-gradient font-semibold">GETCARS</span>
              </div>
              <p className="text-muted-foreground italic font-display text-base leading-relaxed max-w-xs">
                Veículos premium com qualidade, procedência e exclusividade.
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
