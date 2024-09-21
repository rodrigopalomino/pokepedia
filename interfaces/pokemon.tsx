export interface Tipo {
  id: number;
  tipo: string;
}

export interface Evolucion {
  id: number;
  nivel_evolucion: number | null; // Puede ser null si no tiene evolución
  nombre: string;
}

export interface OtrosStats {
  felicidad: number;
  ratioCaptura: number;
}

export interface Stats {
  ataque: number;
  ataqueEspecial: number;
  defensa: number;
  defensaEspecial: number;
  ps: number; // Puntos de salud
  total: number; // Suma total de stats
  velocidad: number;
}

export interface Pokemon {
  debilidades: Tipo[];
  description: string;
  evoluciones: Evolucion[];
  habilidades: string[];
  id: number;
  nombre: string;
  otros_stats: OtrosStats;
  peso: number;
  stats: Stats;
  tamaño: number;
  tipos: Tipo[];
  urlGif: string;
  urlImg: string;
}
