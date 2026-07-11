import car1 from "@/assets/car-1.jpg";
import car2 from "@/assets/car-2.jpg";
import car3 from "@/assets/car-3.jpg";
import car4 from "@/assets/car-4.jpg";

export type VehicleStatus = "blindado" | "original" | "colecao" | "custom";

export interface Vehicle {
  id: string;
  nome: string;
  categoria: string;
  ano: string;
  km: string;
  status: VehicleStatus;
  statusLabel: string;
  blindado: boolean;
  nivelBlindagem?: string;
  img: string;
  descricao: string;
  destaque: boolean;
  whatsappMensagem: string;
}

export const vehicles: Vehicle[] = [
  {
    id: "porsche-911-carrera-t",
    nome: "Porsche 911 Carrera T",
    categoria: "Esportivo · Coleção",
    ano: "2024",
    km: "7.800 km",
    status: "colecao",
    statusLabel: "Peça de coleção",
    blindado: false,
    img: car1,
    descricao: "Esportivo icônico, baixa quilometragem e procedência impecável.",
    destaque: true,
    whatsappMensagem:
      "Olá, GETCARS! Tenho interesse no Porsche 911 Carrera T e gostaria de receber mais informações.",
  },
  {
    id: "suburban-high-country",
    nome: "Suburban High Country",
    categoria: "SUV de Luxo",
    ano: "2026",
    km: "ZERO km",
    status: "original",
    statusLabel: "Original de fábrica",
    blindado: false,
    img: car2,
    descricao: "SUV full-size de topo de linha, zero km, pronto para entrega.",
    destaque: false,
    whatsappMensagem:
      "Olá, GETCARS! Tenho interesse no Suburban High Country e gostaria de receber mais informações.",
  },
  {
    id: "bmw-330e",
    nome: "BMW 330e",
    categoria: "Alta performance",
    ano: "2025",
    km: "19.000 km",
    status: "original",
    statusLabel: "Original de fábrica",
    blindado: false,
    img: car3,
    descricao: "Sedan híbrido plug-in com performance e sofisticação alemã.",
    destaque: false,
    whatsappMensagem:
      "Olá, GETCARS! Tenho interesse no BMW 330e e gostaria de receber mais informações.",
  },
  {
    id: "nivus-gts-blindado",
    nome: "Nivus GTS",
    categoria: "Esportividade urbana",
    ano: "2026",
    km: "6.000 km",
    status: "blindado",
    statusLabel: "Blindado nível III-A",
    blindado: true,
    nivelBlindagem: "III-A",
    img: car4,
    descricao: "SUV coupé esportivo com blindagem nível III-A discreta.",
    destaque: false,
    whatsappMensagem:
      "Olá, GETCARS! Tenho interesse no Nivus GTS blindado e gostaria de receber mais informações.",
  },
];
