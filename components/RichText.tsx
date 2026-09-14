// Corsivo automatico per nomi propri che, per convenzione, non vanno mai fra
// virgolette nel sito (nomi di associazioni) o che il rigore scientifico
// vuole in corsivo (binomi latini). L'ordine conta: le frasi più lunghe
// vanno elencate prima, così "Baila Murena at school" viene individuata per
// intero invece di lasciare fuori dal corsivo " at school".
const ITALIC_TERMS = [
  'Baila Murena at school',
  'Baila Murena',
  'TartAmare',
  'Delphinus delphis',
  'Physeter macrocephalus',
];

const pattern = new RegExp(
  `(${ITALIC_TERMS.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
  'g'
);

export default function RichText({ text }: { text: string }) {
  const parts = text.split(pattern);
  return (
    <>
      {parts.map((part, i) =>
        ITALIC_TERMS.includes(part) ? (
          <em key={i} className="italic">
            {part}
          </em>
        ) : (
          part
        )
      )}
    </>
  );
}
