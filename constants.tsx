
import React from 'react';

export const LABELS: Record<string, string> = {
  PAHT: "Prix d'Achat HT",
  PVHT: "Prix de Vente HT",
  PVTTC: "Prix de Vente TTC",
  TMarge: "Taux de Marge (%)",
  TMarque: "Taux de Marque (%)",
  MB: "Marge Brute",
  K: "Coeff Multiplicateur (K)",
  TVA_MT: "Montant de la TVA",
  TVA_Rate: "Taux de TVA"
};

export const UNIT: Record<string, string> = {
  PAHT: "€",
  PVHT: "€",
  PVTTC: "€",
  TMarge: "%",
  TMarque: "%",
  MB: "€",
  K: "",
  TVA_MT: "€",
  TVA_Rate: "%"
};

export const FORMULAS_DOC = [
  { title: "Marge Brute", formula: "MB = PVHT - PAHT" },
  { title: "Taux de Marque", formula: "TMarque = (MB / PVHT) × 100" },
  { title: "Taux de Marge", formula: "TMarge = (MB / PAHT) × 100" },
  { title: "Calcul PVHT (via Marque)", formula: "PVHT = PAHT / (1 - TMarque)" },
  { title: "Calcul PVHT (via Marge)", formula: "PVHT = PAHT × (1 + TMarge)" },
  { title: "Calcul PVTTC", formula: "PVTTC = PVHT × (1 + Taux TVA)" },
  { title: "Coefficient (K)", formula: "K = PVTTC / PAHT" }
];
