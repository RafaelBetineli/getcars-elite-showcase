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
  { icon: ShieldCheck, title: "Procedência Garantida", text: "Todos os veículos passam por criteriosa avaliação técnica e documental." },
  { icon: Sparkles, title: "Atendimento Personalizado", text: "Consultoria exclusiva para encontrar o carro ideal ao seu perfil." },
  { icon: Gem, title: "Veículos Premium", text: "Curadoria de esportivos, SUVs de luxo e caminhonetes de alto padrão." },
  { icon: Handshake, title: "Compra, Venda e Intermediação", text: "Negociações seguras, transparentes e conduzidas com discrição." },
];

const veiculos = [
  { img: car1, nome: "Porsche 911 Turbo S", ano: "2023", km: "8.400 km", blindagem: "Blindado Nível III-A" },
  { img: car2, nome: "Range Rover Autobiography", ano: "2024", km: "12.100 km", blindagem: "Blindado Nível III-A" },
  { img: car3, nome: "Mercedes-Benz G63 AMG", ano: "2023", km: "15.700 km", blindagem: "Original de fábrica" },
  { img: car4, nome: "BMW M5 Competition", ano: "2022", km: "22.300 km", blindagem: "Blindado Nível III-A" },
];

function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/85 backdrop-blur-xl border-b border-gold-subtle" : "bg-transparent"}`}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">
            <a href="#inicio" className="flex items-center gap-3 shrink-0">
              <img src={logo} alt="GETCARS" className="h-11 w-11 object-contain" width={44} height={44} />
              <span className="font-display text-2xl tracking-[0.2em] text-gold-gradient font-semibold">GETCARS</span>
            </a>

            <nav className="hidden lg:flex items-center gap-10">
              {nav.map((n) => (
                <a key={n.href} href={n.href} className="text-sm text-muted-foreground hover:text-gold transition-colors tracking-wide">
                  {n.label}
                </a>
              ))}
            </nav>

            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-gold-subtle text-gold text-sm hover:bg-gold hover:text-primary-foreground transition-all">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>

            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-gold p-2" aria-label="Menu">
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
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-gradient text-primary-foreground text-sm font-medium">
                <MessageCircle className="h-4 w-4" />
                Falar no WhatsApp
              </a>
            </div>
          )}
        </div>
      </header>

      <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroCar} alt="Veículo premium GETCARS" className="h-full w-full object-cover object-center opacity-70" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-32 pb-20 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-gold-subtle mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-xs tracking-[0.25em] text-gold uppercase">Concessionária Boutique</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-medium leading-[1.05] mb-6">
              Veículos <span className="text-gold-gradient italic">Premium</span>,<br />
              Exclusivos e <span className="text-gold-gradient italic">Blindados</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed mb-10">
              A GETCARS conecta você aos melhores veículos de alto padrão, com qualidade, procedência e atendimento personalizado.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#veiculos" className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gold-gradient text-primary-foreground font-medium tracking-wide hover:shadow-[0_0_40px_-5px_var(--gold)] transition-all">
                Ver veículos disponíveis
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-gold-subtle text-gold hover:bg-gold hover:text-primary-foreground transition-all">
                <MessageCircle className="h-4 w-4" />
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs tracking-[0.3em] text-gold uppercase mb-4">Diferenciais</p>
            <h2 className="font-display text-4xl lg:text-5xl font-medium">
              A experiência de quem <span className="text-gold-gradient italic">exige o melhor</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {diferenciais.map((d) => (
              <div key={d.title} className="card-premium card-premium-hover rounded-lg p-8 group">
                <div className="h-14 w-14 rounded-full border-gold-subtle flex items-center justify-center mb-6 group-hover:bg-gold/10 transition-colors">
                  <d.icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="font-display text-xl mb-3 text-foreground">{d.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{d.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="veiculos" className="py-24 lg:py-32 bg-surface/40 border-y border-gold-subtle">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-xs tracking-[0.3em] text-gold uppercase mb-4">Coleção</p>
              <h2 className="font-display text-4xl lg:text-5xl font-medium">
                Veículos em <span className="text-gold-gradient italic">destaque</span>
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md">
              Uma curadoria exclusiva atualizada semanalmente, com procedência verificada.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {veiculos.map((v) => (
              <article key={v.nome} className="card-premium card-premium-hover rounded-lg overflow-hidden group">
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <img src={v.img} alt={v.nome} loading="lazy" width={1200} height={800} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-background/80 backdrop-blur border-gold-subtle">
                    <Shield className="h-3 w-3 text-gold" />
                    <span className="text-[10px] tracking-wider uppercase text-gold">{v.blindagem}</span>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="font-display text-2xl mb-4">{v.nome}</h3>

                  <div className="flex flex-wrap gap-6 mb-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gold" />
                      <span>{v.ano}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Gauge className="h-4 w-4 text-gold" />
                      <span>{v.km}</span>
                    </div>
                  </div>

                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-gold border-b border-gold/40 pb-1 hover:border-gold transition-colors">
                    Tenho interesse
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="venda" className="py-24 lg:py-32 relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 relative">
          <div className="card-premium rounded-lg p-10 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.78_0.13_80/0.08),transparent_60%)]" />
            <div className="relative">
              <p className="text-xs tracking-[0.3em] text-gold uppercase mb-4">Avaliação</p>
              <h2 className="font-display text-4xl lg:text-5xl font-medium mb-6">
                Venda seu <span className="text-gold-gradient italic">veículo</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-lg">
                Solicite uma avaliação gratuita e receba uma proposta justa e transparente pelo seu veículo. Todo o processo é conduzido com sigilo e agilidade.
              </p>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gold-gradient text-primary-foreground font-medium tracking-wide hover:shadow-[0_0_40px_-5px_var(--gold)] transition-all">
                <MessageCircle className="h-5 w-5" />
                Solicitar avaliação no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="sobre" className="py-24 lg:py-32 bg-surface/40 border-y border-gold-subtle">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 text-center">
          <p className="text-xs tracking-[0.3em] text-gold uppercase mb-4">Sobre</p>
          <h2 className="font-display text-4xl lg:text-5xl font-medium mb-10">
            Uma concessionária <span className="text-gold-gradient italic">boutique</span>
          </h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              A <span className="text-gold-soft">GETCARS</span> nasceu do desejo de oferecer uma experiência diferenciada no mercado de veículos premium. Somos especialistas em carros esportivos, SUVs de luxo, caminhonetes de alto padrão e veículos blindados de procedência.
            </p>
            <p>
              Cada negociação é conduzida com discrição, transparência e um cuidado que transforma a compra ou venda de um veículo em uma experiência memorável. Nossos clientes contam com curadoria personalizada, suporte completo em documentação e assessoria em blindagem.
            </p>
          </div>
        </div>
      </section>

      <section id="contato" className="py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] text-gold uppercase mb-4">Contato</p>
            <h2 className="font-display text-4xl lg:text-5xl font-medium">
              Vamos <span className="text-gold-gradient italic">conversar</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="card-premium card-premium-hover rounded-lg p-10 flex items-center gap-6 group">
              <div className="h-16 w-16 rounded-full bg-gold-gradient flex items-center justify-center shrink-0">
                <MessageCircle className="h-7 w-7 text-primary-foreground" />
              </div>
              <div className="min-w-0">
                <p className="text-xs tracking-widest text-gold uppercase mb-1">WhatsApp</p>
                <p className="font-display text-2xl mb-1">Atendimento direto</p>
                <p className="text-sm text-muted-foreground truncate">Resposta imediata · Seg-Sáb 9h-19h</p>
              </div>
            </a>

            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="card-premium card-premium-hover rounded-lg p-10 flex items-center gap-6 group">
              <div className="h-16 w-16 rounded-full bg-gold-gradient flex items-center justify-center shrink-0">
                <Instagram className="h-7 w-7 text-primary-foreground" />
              </div>
              <div className="min-w-0">
                <p className="text-xs tracking-widest text-gold uppercase mb-1">Instagram</p>
                <p className="font-display text-2xl mb-1">@getcars</p>
                <p className="text-sm text-muted-foreground truncate">Novidades e coleção em tempo real</p>
              </div>
            </a>
          </div>

          <div className="mt-10 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-gold" />
            <span>Showroom em São Paulo · Atendimento em todo o Brasil</span>
          </div>
        </div>
      </section>

      <footer className="border-t border-gold-subtle bg-surface/60">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={logo} alt="GETCARS" className="h-10 w-10 object-contain" width={40} height={40} loading="lazy" />
                <span className="font-display text-xl tracking-[0.2em] text-gold-gradient font-semibold">GETCARS</span>
              </div>
              <p className="text-muted-foreground italic font-display text-lg">
                Veículos premium, exclusivos e blindados.
              </p>
            </div>

            <div>
              <p className="text-xs tracking-[0.25em] text-gold uppercase mb-5">Navegação</p>
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
              <p className="text-xs tracking-[0.25em] text-gold uppercase mb-5">Contato</p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors inline-flex items-center gap-2">
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

          <div className="pt-8 border-t border-gold-subtle flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground tracking-wider">
            <p>© {new Date().getFullYear()} GETCARS. Todos os direitos reservados.</p>
            <p className="uppercase tracking-[0.25em] text-gold/70">Qualidade · Procedência · Exclusividade</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
