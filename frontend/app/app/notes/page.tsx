import { NoteCard } from "@/components/notes/note-card";
import { FloatingButton } from "@/components/notes/new-note";

export default function Notes() {
  const exampleNotes = [
    "Jestem dzisiaj zdenerwowany. Janek jest denerwujący. Już dwa razy ten dziad zabrał mi piórnik.",
    "Jest git. Dzisiaj Gałach odwołał nam sprawdzian. Dobrze że chłop jest wyluzowany.",
    "Kurde! Znowu Janek zabrał mój piórnik. Na dodatek jeszcze wziął i go usyfił. W dodatku jeszcze nie oddał mi długopisa.",
    "Jestem dzisiaj zdenerwowany. Janek jest denerwujący. Już dwa razy ten dziad zabrał mi piórnik.",
    "Jest git. Dzisiaj Gałach odwołał nam sprawdzian. Dobrze że chłop jest wyluzowany.",
    "Kurde! Znowu Janek zabrał mój piórnik. Na dodatek jeszcze wziął i go usyfił. W dodatku jeszcze nie oddał mi długopisa.",
  ]

  return (
      <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {exampleNotes.map((note, index) => (
          <NoteCard key={index} content={note} />
      ))}
      </div>
      <FloatingButton label="Dodaj notatkę" />
      </>
  );
}
