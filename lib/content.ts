// Contenuto reale del portfolio di Eleonora Coppolella.
// Testi ed estratti provengono dai materiali forniti in data/ (vedi i
// riferimenti nei commenti). I campi marcati come placeholder sono gli
// unici punti dove manca materiale reale: cercali con "[CONTENUTO DA COMPLETARE".

export const site = {
  name: 'Eleonora Coppolella',
  role: 'Biologa Marina e Scientific Storyteller / Content Creator',
  description:
    'Biologa marina specializzata in bioacustica con base a Milano. Trasformo concetti scientifici complessi in storie visive e dal vivo capaci di ingaggiare il pubblico di massa.',
  url: 'https://coppolellaeleonora-png.github.io/portfolio/',
  ogImage: '/images/hero/eleonora-hero.webp',
};

export const nav = [
  { id: 'intro', label: 'Intro' },
  { id: 'scripting', label: 'Storytelling' },
  { id: 'media', label: 'Audio e media' },
  { id: 'live', label: 'Live e scuole' },
  { id: 'contatti', label: 'Contatti' },
];

// --- Sezione 1: Header & Intro -------------------------------------------
export const hero = {
  name: site.name,
  role: site.role,
  bio: 'Biologa marina specializzata in bioacustica con base a Milano. Trasformo concetti scientifici complessi — dai canti dei cetacei alle dinamiche marine — in storie visive e dal vivo capaci di ingaggiare il pubblico di massa. Curo la comunicazione social dell\'associazione di divulgazione scientifica "Baila Murena", co-ideo concept e scalette per i Reel e porto la bioacustica nelle scuole.',
  photo: '/images/hero/eleonora-hero.webp',
  // Fotogramma dal documentario TursioNet (vedi sezione Audio & Media), in
  // cui parla come analista dati bioacustici.
  photoAlt:
    'Eleonora Coppolella parla come analista di dati bioacustici durante un\'intervista per il documentario TursioNet',
};

// --- Sezione 2: Scripting & Video Storytelling ----------------------------
// Fonte: 03_Esperienze_Editoriali_e_Media/01_00_Reel_Ideazione_e_Regia.docx
//        03_Esperienze_Editoriali_e_Media/02_00_Rubrica_Bioacustica_Tartamare.docx
//        02_Divulgazione_Scuole_e_Live/00_Schede_Progetti_Didattici.docx
export type ScriptingProject = {
  id: string;
  // Etichetta di attribuzione mostrata sotto il titolo (es. "Per Baila
  // Murena"): rende evidente per quale progetto/associazione è stato
  // realizzato, senza il generico badge "Progetto reale" di prima.
  attribution: string;
  title: string;
  role: string;
  media:
    | { kind: 'instagram'; permalink: string; poster: string; posterAlt: string }
    | { kind: 'image'; src: string; alt: string; aspectClassName?: string };
  ctaLabel: string; // testo del bottone di espansione (es. "Dietro le quinte")
  behindTheScenes: string[]; // paragrafi mostrati una volta espanso
};

export const scriptingProjects: ScriptingProject[] = [
  {
    id: 'reel-museo',
    attribution: 'Per "Baila Murena"',
    title: 'Storytelling visivo per la mostra "Oceani Perduti"',
    role: 'Ruolo: co-ideazione del concept, co-regia di campo, selezione video e brief di montaggio — in collaborazione con Kosmos, Museo di Storia Naturale dell\'Università di Pavia.',
    media: {
      kind: 'instagram',
      permalink: 'https://www.instagram.com/reel/DZuksc4svW_/',
      poster: '/images/projects/reel-museo-poster.webp',
      posterAlt:
        'Fotogramma del Reel Instagram girato al Museo Kosmos di Pavia per la mostra Oceani Perduti, con il ricercatore Riccardo davanti alla ricostruzione di un plesiosauro',
    },
    ctaLabel: 'Dietro le quinte',
    behindTheScenes: [
      'Format: divulgativo / ironico. Il Reel nasce per pubblicizzare la mostra "Oceani Perduti" ed è pubblicato sull\'account Instagram di "Baila Murena", il progetto di divulgazione scientifica di cui faccio parte.',
      '00:00–00:03 Hook — mezzobusto su Eleonora, seduta, che chiede a Fabio "Fabione, ma cosa stai facendo?".',
      '00:03–00:12 Gag di apertura — panoramica su Fabio, confuso e spaesato, che finge di non sapere dove si trovi mentre l\'inquadratura porta l\'attenzione sulla ricostruzione del plesiosauro: l\'obiettivo narrativo è creare curiosità con un tono leggero.',
      '00:13–00:26 Spiegazione e call to action — Riccardo interviene, identifica il plesiosauro e sposta lo sguardo dalla scena alla camera per rompere la quarta parete e invitare i follower a visitare la mostra.',
      '00:27–00:51 Montaggio della mostra — note di regia per il montatore: dall\'esterno del museo con transizione sulla locandina ufficiale, a una carrellata rapida e ritmata a tempo di musica sulle sale e i dettagli dell\'esposizione.',
      '00:52–00:56 Outro — schermata finale fissa con la locandina della proroga della mostra.',
    ],
  },
  {
    id: 'reel-cetacei',
    attribution: 'Per "Baila Murena"',
    title: 'Un giorno di avvistamento cetacei nel Santuario Pelagos',
    role: 'Ruolo: co-ideazione del concept, co-regia di campo, selezione video e brief di montaggio — in collaborazione con Golfo Paradiso Whale Watching.',
    media: {
      kind: 'instagram',
      permalink: 'https://www.instagram.com/reel/DaSiQJFMPqY/',
      poster: '/images/projects/reel-cetacei-poster.webp',
      posterAlt:
        'Fotogramma del Reel Instagram a bordo dell\'imbarcazione di Golfo Paradiso Whale Watching, durante il racconto di un avvistamento di zifi',
    },
    ctaLabel: 'Dietro le quinte',
    behindTheScenes: [
      'Format: informativo / esperienziale, pensato per far vivere allo spettatore la giornata in mare passo dopo passo.',
      '00:00–00:46 Hook e primo avvistamento (stenelle) — parlato in camera alternato a clip dinamiche: si parte dalla specie di cetaceo più comune nel Mediterraneo, con stacco immediato dal parlato al video degli avvistamenti e musica che sale di volume per dare impatto.',
      '00:47–01:07 Rivelazione ed enfasi (delfini comuni) — ritorno all\'intervista con inserti fotografici a pieno schermo per evidenziare la rarità e il valore scientifico dell\'avvistamento.',
      '01:08–01:58 Spiegazione scientifica (zifi) — parlato divulgativo sulla morfologia e la rarità di incontro in superficie degli zifi, seguito dallo stacco sulle prime riprese dell\'animale in acqua.',
      '01:59–02:00 Outro.',
    ],
  },
  {
    id: 'rubrica-tartamare',
    attribution: 'Per TartAmare',
    title: 'Rubrica di bioacustica "Il linguaggio del mare"',
    role: 'Ruolo: curatela dei testi scientifici e adattamento del linguaggio per Instagram, per l\'associazione TartAmare. Veste grafica a cura del social media manager dell\'associazione.',
    media: {
      kind: 'image',
      src: '/images/projects/rubrica-slide-1.webp',
      alt: 'Prima slide del carosello Instagram "Il linguaggio del mare", con spettrogramma e delfini in superficie',
      aspectClassName: 'aspect-square',
    },
    ctaLabel: 'Leggi lo script completo',
    behindTheScenes: [
      'Obiettivo: avvicinare il pubblico generale ai concetti di bioacustica e all\'impatto dell\'inquinamento acustico sugli ecosistemi marini, attraverso caroselli divulgativi su Instagram. Rubrica composta da 7 uscite editoriali in formato carosello da 5 slide ciascuna.',
      'Uscita 01 — Cos\'è la bioacustica? La bioacustica è una scienza interdisciplinare che combina biologia e acustica, ma anche psicologia, informatica e analisi numerica. Include lo studio dei suoni prodotti e percepiti da animali e uomini, gli organi coinvolti, i meccanismi neurofisiologici di produzione, ricezione e comprensione, e le applicazioni pratiche in ambito economico-commerciale.',
      'Cos\'è il suono? Il suono è dato da rapide fluttuazioni della pressione atmosferica che viaggiano a velocità dipendente dalla temperatura attraverso mezzi come l\'aria (343 m/s a 20°C), l\'acqua (1484 m/s a 20°C) o il terreno (~5000 m/s a seconda della porosità).',
      'Come funziona l\'udito? Le fluttuazioni vengono recepite da recettori dell\'orecchio interno e trasmesse al sistema nervoso centrale, che le trasforma in "sensazione sonora". Le alte frequenze si attenuano più delle basse: saranno quindi i suoni più bassi a raggiungere le maggiori distanze. L\'udito umano percepisce approssimativamente da 20 Hz a 20 kHz, ma la maggior parte degli animali si spinge oltre questo range (infrasuoni sotto i 20 Hz, ultrasuoni sopra i 20 kHz).',
      'Successivi capitoli della rubrica: cetacei (odontoceti e misticeti), Monitoraggio Acustico Passivo (PAM), inquinamento acustico e minacce sui cetacei, l\'impiego del suono tra le tartarughe marine, focus sullo zifio e focus sugli alfeidi.',
    ],
  },
  {
    id: 'lezione-cetacei-scuola',
    attribution: 'Con "Baila Murena"',
    title: 'I suoni del mare: bioacustica in classe',
    role: 'Ruolo: insieme al team di "Baila Murena", stesura della scaletta, adattamento del linguaggio scientifico e conduzione in aula, con un focus personale su cetacei e comunicazione acustica marina.',
    media: {
      kind: 'image',
      src: '/images/projects/lezione-cetacei-scuola.webp',
      alt: 'Eleonora Coppolella mostra a una classe di scuola secondaria gli spettrogrammi dei suoni del delfino comune e del capodoglio',
    },
    ctaLabel: 'Scopri di più',
    behindTheScenes: [
      'Format "Baila Murena at school", per le scuole secondarie di primo grado: l\'obiettivo è far conoscere la biologia marina attraverso i concetti di ecosistemi e biodiversità.',
      '"I suoni del mare" — gli alunni vengono guidati in un viaggio di ascolto immersivo alla scoperta dei repertori acustici degli abitanti del mare e di come li usano per comunicare, cacciare e orientarsi.',
      'Il mio contributo è la parte dedicata ai cetacei: dallo spettrogramma del delfino comune (Delphinus delphis) a quello del capodoglio (Physeter macrocephalus), per far letteralmente "vedere" come suonano sott\'acqua.',
    ],
  },
];

// --- Sezione 3: Audio & Media -----------------------------------------
// Fonte: 01_Podcast_e_Social/00_Schede_Podcast_e_Link.docx
//        03_Esperienze_Editoriali_e_Media/03_00_Documentario_Estratto.docx
export type PodcastEpisode = {
  id: string;
  code: string;
  title: string;
  spotifyEmbedUrl: string;
  listenLinks: { label: string; url: string }[];
  lineTopic: string;
  lineStructure: string;
};

export const podcastEpisodes: PodcastEpisode[] = [
  {
    id: 's3e2',
    code: 'S3 E2',
    title: 'Restoration ecology e altre traiettorie dell\'ecologia',
    spotifyEmbedUrl: 'https://open.spotify.com/embed/episode/14HYoC7dplrDBR0viOdCLa',
    listenLinks: [
      { label: 'Apple Podcasts', url: 'https://podcasts.apple.com/it/podcast/s3-e2-restoration-ecology-e-altre-traiettorie-dellecologia/id1815495308?i=1000760445934' },
      { label: 'Amazon Music', url: "https://music.amazon.co.uk/podcasts/8e226517-3c92-46e0-95e3-f553993b6e3a/episodes/475a6d70-7179-4baa-b490-f01cc9646967/baila-murena-s3-e2-restoration-ecology-e-altre-traiettorie-dell'ecologia" },
      { label: 'Castos', url: 'https://baila-murena.castos.com/episodes/s3e2-restoration-ecology-e-altre-traiettorie-dellecologia' },
    ],
    lineTopic: 'Tema: ecologia e strategie di tutela degli ecosistemi marini.',
    lineStructure:
      'Minuto chiave 24:30–25:29 — introduce il concetto di restoration ecology e il processo decisionale tra conservazione e restauro di un ambiente danneggiato.',
  },
  {
    id: 's3e5',
    code: 'S3 E5',
    title: 'Cetacei, oltre il mito',
    spotifyEmbedUrl: 'https://open.spotify.com/embed/episode/0i7uYYqZVpt0DSryaUWOil',
    listenLinks: [
      { label: 'Apple Podcasts', url: 'https://podcasts.apple.com/it/podcast/s3-e5-cetacei-oltre-il-mito/id1815495308?i=1000764778089' },
      { label: 'Amazon Music', url: 'https://music.amazon.co.uk/podcasts/8e226517-3c92-46e0-95e3-f553993b6e3a/episodes/54517835-2b89-4547-bfb4-3c6914567b39/baila-murena-s3-e5-cetacei-oltre-il-mito' },
      { label: 'Castos', url: 'https://baila-murena.castos.com/episodes/s3-e5-cetacei-oltre-il-mito' },
    ],
    lineTopic: 'Tema: etologia e fisiologia dei delfini.',
    lineStructure:
      'Minuto chiave 16:41–23:51 — immersione nel sonno dei delfini, tra somiglianze e differenze con l\'essere umano.',
  },
];

// Esempi di grafica e contenuti social curati per il podcast Baila Murena
// (non legati 1:1 agli episodi sopra): content curation, locandine e Stories.
export const socialContentSamples = [
  { src: '/images/media/locandina-s3e1.webp', alt: 'Locandina Instagram Baila Murena, episodio S3E1, con ospite Marco Contardi' },
  { src: '/images/media/locandina-s3e3.webp', alt: 'Locandina Instagram Baila Murena, episodio S3E3' },
  { src: '/images/media/locandina-s3e6.webp', alt: 'Locandina Instagram Baila Murena, episodio S3E6' },
  { src: '/images/media/quiz-s3e5.webp', alt: 'Quiz interattivo per Instagram Stories legato all\'episodio S3E5 sui delfini' },
];

export const documentary = {
  title: 'TursioNet — mitigare il conflitto fra delfini e pescatori',
  role: 'Ruolo: analista dati bioacustici, per NAUTA scientific srl.',
  // #t=4m9s fa partire la riproduzione già al minuto del suo intervento
  // (senza tagliare il video: si può comunque riavvolgere fino all'inizio).
  vimeoEmbedUrl: 'https://player.vimeo.com/video/1144840417?h=1ea4452de9#t=4m9s',
  cover: '/images/media/documentario-cover.webp',
  coverAlt:
    'Fotogramma del documentario TursioNet con Eleonora Coppolella, analista dati bioacustici per NAUTA scientific srl, in laboratorio',
  caption:
    'Intervento come esperta di bioacustica marina all\'interno del documentario "TursioNet — mitigare il conflitto fra delfini e pescatori", progetto di monitoraggio acustico del tursiope legato alla rete TursioNet (min. 04:09–05:35).',
  description:
    'Elaborazione e analisi dei dati audio dai sistemi di registrazione acustica del progetto TursioNet per il tracciamento e lo studio del comportamento del tursiope, con spiegazione dei risultati resa accessibile al pubblico generalista.',
};

// --- Sezione 4: Live & Scuole ---------------------------------------------
// Fonte: 02_Divulgazione_Scuole_e_Live/00_Schede_Progetti_Didattici.docx
export const livePhotos = [
  { src: '/images/live/laboratorio-estivo.webp', alt: 'Eleonora mostra una tavola illustrata di cetacei e delfini del Mediterraneo a un gruppo di bambini durante un laboratorio estivo in spiaggia' },
  { src: '/images/live/lezione-primaria.webp', alt: 'Eleonora spiega cos\'è il plancton a una classe di scuola primaria, con un bambino che alza la mano per fare una domanda' },
  { src: '/images/live/bergeggi-marefest.webp', alt: 'Il team di Baila Murena, con Eleonora, al Bergeggi MareFest davanti allo stand del podcast' },
  { src: '/images/live/ocean-film-festival.webp', alt: 'Il team di Baila Murena all\'Ocean Film Festival World Tour Italia, davanti al photo wall dell\'evento' },
];

export const methodology = {
  intro: 'Portare la biologia marina nelle scuole',
  fixedText:
    'Insieme al team di "Baila Murena" porto la bioacustica marina nelle scuole e negli eventi dal vivo, adattando linguaggio e attività pratiche all\'età del pubblico.',
  expandTitle: 'Scopri il metodo usato a scuola',
  formats: [
    {
      name: '"Baila Murena at school" — Scuole primarie',
      objective: 'Far conoscere la biologia marina, spiegandone le basi.',
      role: 'Insieme ad altri membri del team, mi occupo della stesura della scaletta, della preparazione della presentazione, dell\'organizzazione delle attività pratiche, dell\'adattamento del linguaggio scientifico per gli alunni e della conduzione dell\'evento dal vivo, focalizzandomi sulle conoscenze e attività bioacustiche.',
      steps: [
        'Presentazione generale: basi e curiosità di biologia marina, collegamenti con cultura pop e cartoni animati.',
        'Riproduzione di una piccola scogliera superficiale del Mar Ligure: gli alunni riproducono la zonazione della scogliera, quindi la posizione degli organismi.',
        'Memory: per ogni organismo marino, gli alunni devono scovare il suo corrispettivo dei cartoni animati (tra cui "Alla ricerca di Nemo", "Pokémon", "Spongebob").',
        'Il gioco della tartaruga appena nata: gli alunni si immedesimano in una piccola tartaruga che, uscita dal guscio, deve raggiungere il mare affrontando gli ostacoli del mondo di oggi (inquinamento acustico, luminoso, etc.).',
        'Conclusione: momento dedicato alle domande e alle curiosità degli alunni.',
      ],
    },
    {
      name: '"Baila Murena at school" — Scuole secondarie di primo grado',
      objective: 'Far conoscere la biologia marina attraverso i concetti di ecosistemi e biodiversità.',
      role: 'Stesso ruolo trasversale del format per le primarie, con contenuti e linguaggio adattati a un pubblico più grande.',
      steps: [
        'Presentazione generale: nozioni base e intermedie di biologia marina, con approfondimento di alcuni aspetti tecnici.',
        'Riproduzione di una piccola scogliera superficiale del Mar Ligure: gli alunni riproducono la zonazione della scogliera e la posizione degli organismi.',
        'I suoni del mare: gli alunni vengono guidati in un viaggio di ascolto immersivo alla scoperta dei repertori acustici degli abitanti del mare e del loro utilizzo del suono per comunicare, cacciare e orientarsi.',
        'Conclusione: momento dedicato alle domande e alle curiosità degli alunni.',
      ],
    },
  ],
};

// --- Footer / Contatti ------------------------------------------------------
// Fonte: 00_LEGGIMI_Presentazione_e_Progetti.docx
export const contact = {
  email: 'coppolellaeleonora@gmail.com',
  linkedin: 'https://www.linkedin.com/in/eleonora-coppolella-2a53753a3',
  location: 'Milano',
};

// Testo esteso "Chi sono" (per eventuale futura sezione "Biografia estesa" —
// non richiesto esplicitamente dalla struttura attuale ma disponibile).
export const aboutLong =
  "Unisco due anni di esperienza nell'analisi e nell'elaborazione di dati bioacustici — condotta con software dedicati e sfociata in report, conferenze e interventi in università — alla passione per la divulgazione e la progettazione multimediale in team. Negli anni ho sviluppato una spiccata attitudine al lavoro multidisciplinare, collaborando quotidianamente con figure diverse — colleghi ricercatori, illustratori, insegnanti, sound designer e video editor — per tradurre la scienza in format ingaggianti.";
