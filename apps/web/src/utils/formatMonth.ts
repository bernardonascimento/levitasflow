/**
 * Formata mês/ano em PT-BR com primeira letra maiúscula (ex: "Março de 2026").
 */
export function formatMonthCapitalized(date: Date): string {
  const formatter = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric"
  });
  const formatted = formatter.format(date);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}
