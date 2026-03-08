// FAQ data – 30 questions for film enthusiasts
// Derived from the film history timeline content
// Optimized for SEO with FAQPage JSON-LD schema

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqDe: FaqItem[] = [
  {
    id: "faq-01",
    question: "Wann wurde der Film erfunden?",
    answer:
      "Es gibt keinen einzelnen Erfindungsmoment. Die Grundlagen wurden über Jahrzehnte gelegt: Die Camera Obscura war seit der Antike bekannt. 1832 entwickelte Joseph Plateau das Phénakistiskop, das erste Gerät zur Darstellung von Bewegungsillusion. 1878 fotografierte Eadweard Muybridge ein galoppierendes Pferd mit 24 Kameras und bewies damit, dass das Auge Bewegung aus Einzelbildern konstruiert. 1891 meldete Thomas Edison das Kinetoskop zum Patent an. Den Durchbruch als öffentliches Medium schafften die Gebrüder Lumière am 28. Dezember 1895 mit der ersten kommerziellen Filmvorführung im Grand Café in Paris."
  },
  {
    id: "faq-02",
    question: "Was war das erste Filmstudio der Geschichte?",
    answer:
      "Thomas Edisons 'Black Maria' in West Orange, New Jersey (1893) gilt als erstes Filmstudio der Welt. Es war ein drehbares schwarzes Gebäude, das der Sonne folgte, um maximales Tageslicht für die Aufnahmen zu nutzen. Dort entstanden die ersten Kinetoskop-Filme für Edisons Guckkastenautomaten."
  },
  {
    id: "faq-03",
    question: "Wie funktioniert die Illusion von Bewegung im Film?",
    answer:
      "Das Gehirn verbindet schnell aufeinanderfolgende Einzelbilder zu einer scheinbar fließenden Bewegung – ein Effekt, der als 'Phi-Phänomen' oder 'Beta-Bewegung' bezeichnet wird. Beim klassischen Kinofilm werden 24 Einzelbilder pro Sekunde projiziert. Jedes Bild erscheint kurz, dann folgt eine Dunkelphase, während das nächste Bild einrastet. Das Auge nimmt die Dunkelphase kaum wahr und empfindet die Abfolge als kontinuierliche Bewegung."
  },
  {
    id: "faq-04",
    question: "Wann begann die Ära des Tonfilms?",
    answer:
      "Der Tonfilm begann offiziell am 6. Oktober 1927 mit 'The Jazz Singer' von Alan Crosland. Al Jolson sprach darin den legendären Satz: 'Wait a minute, wait a minute, you ain't heard nothin' yet!' Das war kein vollständiger Tonfilm – nur wenige Szenen hatten synchronen Ton – aber es war der Moment, der die Stummfilmära beendete. Bis 1930 hatten die meisten großen Studios auf Tonfilm umgestellt."
  },
  {
    id: "faq-05",
    question: "Warum konnten viele Stummfilmstars im Tonfilm nicht Fuß fassen?",
    answer:
      "Der Übergang zum Tonfilm war für viele Stars brutal. Einige hatten Akzente, die nicht zum Image passten – ausländische Stars wie Emil Jannings oder Pola Negri verloren ihr Publikum. Andere hatten Stimmen, die zur Leinwandpersönlichkeit nicht passten. Dazu kam: Die frühen Tonfilmkameras mussten in schalldichten Kästen eingesperrt werden ('Blimp'), was die freie Kamerabewegung des Stummfilms zunichte machte. Die gesamte Filmsprache musste neu erfunden werden."
  },
  {
    id: "faq-06",
    question: "Wann wurde Farbfilm eingeführt?",
    answer:
      "Erste Farbexperimente gab es bereits um 1900 mit handkoloriertem Film. Das erste praktikable Farbfilmsystem war Technicolor, das ab 1922 eingesetzt wurde. Der Durchbruch kam 1939 mit 'Vom Winde verweht' und 'Der Zauberer von Oz', beide in dem aufwendigen Drei-Streifen-Technicolor-Verfahren gedreht. Kodak Eastmancolor (1950) machte Farbfilm erschwinglich und einfacher handhabbar, sodass er ab Mitte der 1950er Jahre zum Standard wurde."
  },
  {
    id: "faq-07",
    question: "Was ist der Unterschied zwischen 35mm und anderen Filmformaten?",
    answer:
      "35mm ist das Standardformat der Filmgeschichte, eingeführt von Thomas Edison und William Dickson um 1892. Es bietet ein gutes Gleichgewicht zwischen Bildqualität und Kosten. 70mm (wie Todd-AO oder IMAX) liefert deutlich höhere Auflösung und wird für Großproduktionen genutzt. 16mm ist ein günstigeres Format, das vor allem für Dokumentarfilme, Fernsehen und unabhängige Produktionen verwendet wurde. Super 8 war das Heimfilmformat der 1960er bis 1980er Jahre. Heute hat digitales Kino (DCI 4K) analoge Formate weitgehend verdrängt."
  },
  {
    id: "faq-08",
    question: "Was ist die Nouvelle Vague und warum war sie so einflussreich?",
    answer:
      "Die Nouvelle Vague ('Neue Welle') war eine französische Filmbewegung der späten 1950er und 1960er Jahre, angeführt von Regisseuren wie Jean-Luc Godard, François Truffaut und Claude Chabrol. Ihr Einfluss war revolutionär: Sie lehnten die Studiokonventionen ab, drehten mit kleinen Crews und natürlichem Licht auf den Straßen von Paris, experimentierten mit Schnitttechnik (Jump Cuts), brachen die vierte Wand und behandelten den Regisseur als 'Auteur' – als eigentlichen Autor des Films. Ihre Ideen beeinflussten New Hollywood, das Neue Deutsche Kino und praktisch jeden Arthouse-Film seither."
  },
  {
    id: "faq-09",
    question: "Was ist ein Jump Cut und wer hat ihn populär gemacht?",
    answer:
      "Ein Jump Cut ist ein Schnitt zwischen zwei Einstellungen, die sich nur minimal unterscheiden – dasselbe Motiv, leicht veränderte Position oder Zeit. Das Ergebnis ist ein 'Sprung' im Bild, der die Kontinuität bewusst unterbricht. Jean-Luc Godard machte den Jump Cut in 'Außer Atem' (1960) berühmt. Was ursprünglich als Fehler galt, wurde zum Stilmittel: Der Zuschauer wird daran erinnert, dass er einen Film schaut."
  },
  {
    id: "faq-10",
    question: "Wann und wie entstand Hollywood?",
    answer:
      "Hollywood als Filmzentrum entstand um 1910–1915. Filmemacher aus dem Osten der USA zogen nach Südkalifornien, angelockt vom ganzjährigen Sonnenschein, der vielfältigen Landschaft und – laut Überlieferung – um den Patentpool von Thomas Edisons MPPC zu umgehen. Carl Laemmle gründete 1915 Universal City, das erste große Filmstudio. Bis 1920 war Hollywood das unbestrittene Zentrum der Weltfilmproduktion."
  },
  {
    id: "faq-11",
    question: "Was war das 'Goldene Zeitalter' Hollywoods?",
    answer:
      "Das Goldene Zeitalter Hollywoods (ca. 1927–1960) war die Ära des Studiosystems: MGM, Paramount, Warner Bros., RKO und 20th Century Fox kontrollierten Produktion, Distribution und Kinos. Stars waren exklusiv an Studios gebunden. Es entstanden die großen Genres: Musical, Western, Screwball Comedy, Film Noir. Technisch war es die Zeit des Tonfilms, des Technicolor-Farbfilms und der Breitwandformate wie CinemaScope (1953)."
  },
  {
    id: "faq-12",
    question: "Was ist der 'Auteur'-Begriff im Film?",
    answer:
      "Der Auteur-Begriff (französisch für 'Autor') wurde von den Kritikern der Cahiers du Cinéma – vor allem François Truffaut – in den 1950er Jahren geprägt. Die These: Der Regisseur ist der eigentliche Autor eines Films, so wie ein Schriftsteller der Autor eines Romans ist. Ein echter Auteur erkenne man daran, dass sich sein persönlicher Stil, seine Themen und seine Weltsicht durch alle seine Filme ziehen – unabhängig vom Stoff oder den Produzenten. Die Theorie revolutionierte die Filmkritik und wertete den Regisseur gegenüber dem Studiosystem auf."
  },
  {
    id: "faq-13",
    question: "Was ist der Steadicam und wie veränderte er das Kino?",
    answer:
      "Die Steadicam wurde 1975 von Garrett Brown erfunden und erstmals 1976 in 'Bound for Glory' eingesetzt. Es ist ein mechanisches Stabilisierungssystem, das die Kamera vom Körper des Kameramanns entkoppelt und trotzdem frei beweglich hält. Das Ergebnis: fließende, schwebende Einstellungen, die weder die Steifheit einer Dolly-Fahrt noch das Zittern einer Handkamera haben. Stanley Kubrick nutzte sie für die berühmten Flur-Fahrten in 'The Shining' (1980), Scorsese für die Copacabana-Sequenz in 'Goodfellas' (1990)."
  },
  {
    id: "faq-14",
    question: "Wann begann die Ära der Computeranimation (CGI) im Film?",
    answer:
      "Die ersten CGI-Sequenzen im Kinofilm erschienen 1973 in 'Westworld'. Der erste vollständig computeranimierte Charakter war der 'Genesis-Effekt' in 'Star Trek II' (1982). 'Tron' (1982) nutzte CGI für ausgedehnte Sequenzen. Den eigentlichen Durchbruch markierte 'Jurassic Park' (1993), wo photorealiche CGI-Dinosaurier erstmals überzeugend mit echten Schauspielern interagierten. 'Toy Story' (1995) war der erste vollständig computeranimierte Spielfilm."
  },
  {
    id: "faq-15",
    question: "Was ist der Unterschied zwischen CGI und praktischen Effekten?",
    answer:
      "Praktische Effekte (Practical Effects) entstehen am Set: Modelle, Miniaturen, Pyrotechnik, Masken, Animatronics. CGI (Computer Generated Imagery) entsteht am Computer in der Postproduktion. Beide haben Vor- und Nachteile: Praktische Effekte erzeugen reales Licht, reale Schatten und reale Reaktionen der Schauspieler. CGI ermöglicht Dinge, die physisch unmöglich sind, und ist bei bestimmten Effekten kostengünstiger. Die meisten modernen Blockbuster kombinieren beide Ansätze."
  },
  {
    id: "faq-16",
    question: "Was ist New Hollywood und welche Filme gehören dazu?",
    answer:
      "New Hollywood (ca. 1967–1980) war eine Bewegung junger amerikanischer Regisseure, die das alte Studiosystem aufbrachen. Ausgelöst durch den Niedergang der großen Studios, den Einfluss der Nouvelle Vague und die gesellschaftlichen Umbrüche der 1960er Jahre, schufen Arthur Penn, Francis Ford Coppola, Martin Scorsese, Steven Spielberg, Brian De Palma und George Lucas ein neues amerikanisches Kino. Schlüsselfilme: 'Bonnie und Clyde' (1967), 'Easy Rider' (1969), 'Der Pate' (1972), 'Chinatown' (1974), 'Taxi Driver' (1976)."
  },
  {
    id: "faq-17",
    question: "Wie hat 'Star Wars' die Filmindustrie verändert?",
    answer:
      "'Star Wars' (1977) veränderte Hollywood auf mehreren Ebenen gleichzeitig. Kommerziell: Es erfand das moderne Blockbuster-System mit Sommerstart, globalem Marketing und Merchandising. Technisch: George Lucas gründete Industrial Light & Magic (ILM), das die Spezialeffekte-Industrie revolutionierte. Strukturell: Es verschob den Fokus der Studios von kleinen, charaktergetriebenen Filmen (New Hollywood) hin zu großen Franchise-Produktionen. Kulturell: Es schuf das Konzept des 'Event Movies', auf das das Publikum monatelang wartet."
  },
  {
    id: "faq-18",
    question: "Was ist der Dolby-Sound und wann wurde er eingeführt?",
    answer:
      "Dolby Stereo wurde 1975 eingeführt und erstmals in 'A Star Is Born' (1976) eingesetzt. Es ermöglichte Mehrkanal-Ton im Kino mit deutlich reduziertem Rauschen. Dolby Surround (1982) und später Dolby Digital (1992, erstmals in 'Batman Returns') erweiterten das System auf 5.1-Kanäle. Dolby Atmos (2012) fügte eine dreidimensionale Klangebene hinzu. Parallel entwickelte Lucasfilm THX (1983) als Qualitätsstandard für Kinowiedergabe."
  },
  {
    id: "faq-19",
    question: "Wann wurde der analoge Film durch digitale Technik abgelöst?",
    answer:
      "Der Übergang verlief graduell über etwa 15 Jahre. 'Star Wars Episode I' (1999) war der erste große Film, der teilweise digital gedreht wurde (mit Sony HDW-F900). 'Sin City' (2005) und 'Collateral' (2004) zeigten das kreative Potenzial digitaler Kameras. Bis 2012 hatten die meisten Kinos weltweit auf digitale Projektion umgestellt. Heute drehen nur noch wenige Regisseure bewusst auf Film – darunter Christopher Nolan und Quentin Tarantino, die das analoge Korn als ästhetische Entscheidung verteidigen."
  },
  {
    id: "faq-20",
    question: "Was ist der nicht-lineare Schnitt (NLE) und wie hat er den Filmschnitt verändert?",
    answer:
      "Nicht-linearer Schnitt (Non-Linear Editing, NLE) bedeutet, dass Szenen in beliebiger Reihenfolge bearbeitet werden können, ohne das Material physisch zu zerschneiden. Beim analogen Schnitt musste man Filmstreifen buchstäblich mit der Schere schneiden und kleben. Das erste digitale NLE-System war der Avid Media Composer (1989). Apple Final Cut Pro (1999) demokratisierte den Schnitt für unabhängige Filmemacher. Heute ist Adobe Premiere Pro das meistgenutzte System. NLE machte Experimente risikolos und beschleunigte den Schnitt dramatisch."
  },
  {
    id: "faq-21",
    question: "Was ist die '180-Grad-Regel' und warum ist sie wichtig?",
    answer:
      "Die 180-Grad-Regel ist eine Grundregel der Filmsprache: Bei einer Szene mit zwei oder mehr Personen gibt es eine imaginäre Achse zwischen ihnen. Alle Kameraeinstellungen sollten auf derselben Seite dieser Achse bleiben. Überschreitet man die Achse, scheinen die Personen plötzlich die Seiten gewechselt zu haben, was den Zuschauer desorientiert. Die Regel gilt nicht absolut – bewusstes Überschreiten ('Crossing the Line') kann als Stilmittel eingesetzt werden, um Verwirrung oder Desorientierung auszudrücken."
  },
  {
    id: "faq-22",
    question: "Was ist Motion Capture und in welchen Filmen wurde es eingesetzt?",
    answer:
      "Motion Capture (MoCap) ist ein Verfahren, bei dem die Bewegungen von Schauspielern durch Sensoren oder Kameras aufgezeichnet und auf digitale Charaktere übertragen werden. Frühe Experimente gab es in den 1990er Jahren. Der Durchbruch kam mit 'Der Herr der Ringe' (2001–2003), wo Andy Serkis als Gollum die erste vollständig MoCap-basierte Filmrolle spielte. 'Avatar' (2009) kombinierte MoCap mit Echtzeit-Vorschau auf dem Set. Heute wird MoCap auch für Gesichtsanimation (Performance Capture) eingesetzt."
  },
  {
    id: "faq-23",
    question: "Wie hat das Internet die Filmindustrie verändert?",
    answer:
      "Das Internet veränderte die Filmindustrie auf mehreren Ebenen: Distribution (Streaming statt Kino oder DVD), Finanzierung (Crowdfunding für unabhängige Filme), Marketing (Social Media, Trailer-Kultur, Fan-Communities) und Produktion (günstige Ausrüstung + Online-Distribution ermöglichten One-Person-Produktionen). Netflix startete 2007 seinen Streaming-Dienst und begann 2013 mit 'House of Cards' eigene Serien zu produzieren. Heute konkurrieren Netflix, Amazon, Disney+, Apple TV+ und andere direkt mit den traditionellen Studios."
  },
  {
    id: "faq-24",
    question: "Was ist IMAX und wie unterscheidet es sich vom normalen Kino?",
    answer:
      "IMAX (Image Maximum) wurde 1970 von einem kanadischen Konsortium entwickelt. Es nutzt ein deutlich größeres Filmformat (70mm horizontal statt vertikal) für massiv höhere Auflösung. IMAX-Leinwände sind bis zu 30 Meter hoch. Moderne digitale IMAX-Kinos bieten 12K-Projektion und speziell abgestimmten Mehrkanalton. Regisseure wie Christopher Nolan ('Interstellar', 'Dunkirk') drehen Teile ihrer Filme in echtem IMAX-Format, um die volle Bildqualität zu nutzen."
  },
  {
    id: "faq-25",
    question: "Was ist der Unterschied zwischen einem Dolly und einem Kran im Film?",
    answer:
      "Ein Dolly ist ein fahrbares Gestell, auf dem die Kamera montiert wird und das auf Schienen oder einem glatten Untergrund fährt – für horizontale Bewegungen. Ein Kran (Jib oder Crane) hebt die Kamera in die Höhe und ermöglicht vertikale Bewegungen sowie Übersichtsperspektiven. Der erste Kamerawagen (Dolly) wurde um 1907 entwickelt. Heute gibt es auch Kombisysteme wie den 'Technocrane', der Dolly und Kran vereint, sowie Drohnen für Luftaufnahmen."
  },
  {
    id: "faq-26",
    question: "Was ist die 'Kuleschow-Wirkung' und was sagt sie über das Kino aus?",
    answer:
      "Der sowjetische Filmtheoretiker Lew Kuleschow zeigte in den frühen 1920er Jahren ein faszinierendes Experiment: Er schnitt dasselbe neutrale Gesicht eines Schauspielers abwechselnd mit einem Suppenteller, einem Sarg und einem spielenden Kind zusammen. Das Publikum interpretierte das Gesicht als hungrig, traurig oder glücklich – obwohl es immer dasselbe Bild war. Die Kuleschow-Wirkung beweist: Bedeutung im Film entsteht nicht durch einzelne Bilder, sondern durch ihre Kombination. Der Schnitt ist das eigentliche Ausdrucksmittel des Kinos."
  },
  {
    id: "faq-27",
    question: "Was ist ein 'MacGuffin' und wer hat den Begriff geprägt?",
    answer:
      "Ein MacGuffin ist ein Handlungselement – ein Objekt, ein Ziel, ein Geheimnis –, das die Figuren motiviert und die Handlung vorantreibt, dessen eigentlicher Inhalt aber für die Geschichte irrelevant ist. Alfred Hitchcock prägte und popularisierte den Begriff. Klassische MacGuffins: der Koffer in 'Pulp Fiction', die Pläne des Todessterns in 'Star Wars', das Briefcase in 'Ronin'. Was im Koffer ist, spielt keine Rolle – wichtig ist, dass alle Figuren ihn wollen."
  },
  {
    id: "faq-28",
    question: "Wie hat KI die Filmproduktion bisher verändert?",
    answer:
      "KI hat die Filmproduktion auf mehreren Ebenen bereits verändert: De-Aging und digitale Verjüngung von Schauspielern ('The Irishman', 2019), Stimmenklonen für verstorbene Darsteller, automatisiertes Colorgrading, KI-gestützte Schnittvorschläge, Generierung von Hintergründen und Umgebungen (Virtual Production mit LED-Walls). 2024 erschütterte OpenAIs Sora die Branche: Das Modell generiert aus Textbeschreibungen überzeugende Videosequenzen. Gleichzeitig führten KI-Bedenken zu den großen Hollywood-Streiks von 2023 (SAG-AFTRA, WGA)."
  },
  {
    id: "faq-29",
    question: "Was ist der Unterschied zwischen einem Drehbuch und einem Treatment?",
    answer:
      "Ein Treatment ist eine Kurzfassung der Filmgeschichte – typischerweise 5 bis 30 Seiten – die Handlung, Charaktere und Ton beschreibt, aber noch keine ausgearbeiteten Dialoge enthält. Es dient als Verkaufsdokument oder Entwicklungsgrundlage. Ein Drehbuch (Screenplay) ist das vollständige Dokument mit allen Szenen, Dialogen und Regieanweisungen. Die Standardformatierung: eine Seite entspricht etwa einer Minute Laufzeit. Ein abendfüllendes Spielfilm-Drehbuch hat typischerweise 90–120 Seiten."
  },
  {
    id: "faq-30",
    question: "Welche Filme gelten als die wichtigsten der Filmgeschichte?",
    answer:
      "Verschiedene Institutionen erstellen regelmäßig Kanon-Listen. Das British Film Institute (Sight & Sound) wählt alle zehn Jahre: 'Vertigo' (Hitchcock) führte 2012, 'Jeanne Dielman' (Akerman) 2022. Das American Film Institute nennt 'Citizen Kane' (Welles, 1941) als wichtigsten amerikanischen Film. Technisch wegweisend: 'Reise zum Mond' (Méliès, 1902), 'Panzerkreuzer Potemkin' (Eisenstein, 1925), 'Citizen Kane' (1941), 'Rashomon' (Kurosawa, 1950), 'Außer Atem' (Godard, 1960), '2001: Odyssee im Weltraum' (Kubrick, 1968), 'Star Wars' (Lucas, 1977), 'Jurassic Park' (Spielberg, 1993)."
  }
];

export const faqEn: FaqItem[] = [
  {
    id: "faq-01",
    question: "When was film invented?",
    answer:
      "There is no single moment of invention. The foundations were laid over decades: The Camera Obscura was known since antiquity. In 1832, Joseph Plateau developed the Phenakistoscope, the first device to create the illusion of movement. In 1878, Eadweard Muybridge photographed a galloping horse with 24 cameras, proving that the eye constructs movement from individual frames. In 1891, Thomas Edison patented the Kinetoscope. The breakthrough as a public medium came when the Lumière brothers held the first commercial film screening on December 28, 1895 at the Grand Café in Paris."
  },
  {
    id: "faq-02",
    question: "What was the first film studio in history?",
    answer:
      "Thomas Edison's 'Black Maria' in West Orange, New Jersey (1893) is considered the world's first film studio. It was a rotating black building that followed the sun to maximize daylight for filming. Edison's early Kinetoscope films were produced there."
  },
  {
    id: "faq-03",
    question: "How does the illusion of movement in film work?",
    answer:
      "The brain connects rapidly successive individual frames into an apparently fluid movement – an effect known as the 'phi phenomenon' or 'beta movement'. In classical cinema, 24 individual frames are projected per second. Each frame appears briefly, then a dark phase follows while the next frame locks into place. The eye barely perceives the dark phase and experiences the sequence as continuous movement."
  },
  {
    id: "faq-04",
    question: "When did the era of sound film begin?",
    answer:
      "Sound film officially began on October 6, 1927 with Alan Crosland's 'The Jazz Singer'. Al Jolson spoke the legendary line: 'Wait a minute, wait a minute, you ain't heard nothin' yet!' It was not a fully sound film – only a few scenes had synchronized sound – but it was the moment that ended the silent film era. By 1930, most major studios had switched to sound."
  },
  {
    id: "faq-05",
    question: "Why couldn't many silent film stars succeed in sound films?",
    answer:
      "The transition to sound film was brutal for many stars. Some had accents that didn't match their image – foreign stars like Emil Jannings or Pola Negri lost their audiences. Others had voices that didn't suit their screen persona. Additionally, early sound film cameras had to be enclosed in soundproof boxes ('blimps'), eliminating the free camera movement of silent film. The entire film language had to be reinvented."
  },
  {
    id: "faq-06",
    question: "When was color film introduced?",
    answer:
      "Early color experiments existed around 1900 with hand-colored film. The first practical color film system was Technicolor, used from 1922. The breakthrough came in 1939 with 'Gone with the Wind' and 'The Wizard of Oz', both shot in the elaborate three-strip Technicolor process. Kodak Eastmancolor (1950) made color film affordable and easier to handle, making it the standard by the mid-1950s."
  },
  {
    id: "faq-07",
    question: "What is the difference between 35mm and other film formats?",
    answer:
      "35mm is the standard format of film history, introduced by Thomas Edison and William Dickson around 1892. It offers a good balance between image quality and cost. 70mm (such as Todd-AO or IMAX) delivers significantly higher resolution and is used for major productions. 16mm is a cheaper format used primarily for documentaries, television, and independent productions. Super 8 was the home film format of the 1960s to 1980s. Today, digital cinema (DCI 4K) has largely displaced analog formats."
  },
  {
    id: "faq-08",
    question: "What is the Nouvelle Vague and why was it so influential?",
    answer:
      "The Nouvelle Vague ('New Wave') was a French film movement of the late 1950s and 1960s, led by directors such as Jean-Luc Godard, François Truffaut, and Claude Chabrol. Their influence was revolutionary: they rejected studio conventions, filmed with small crews and natural light on the streets of Paris, experimented with editing techniques (jump cuts), broke the fourth wall, and treated the director as 'auteur' – the true author of the film. Their ideas influenced New Hollywood, the New German Cinema, and virtually every art house film since."
  },
  {
    id: "faq-09",
    question: "What is a jump cut and who popularized it?",
    answer:
      "A jump cut is a cut between two shots that differ only minimally – the same subject, slightly changed position or time. The result is a 'jump' in the image that deliberately interrupts continuity. Jean-Luc Godard made the jump cut famous in 'Breathless' (1960). What was originally considered an error became a stylistic device: the viewer is reminded that they are watching a film."
  },
  {
    id: "faq-10",
    question: "When and how did Hollywood emerge?",
    answer:
      "Hollywood as a film center emerged around 1910–1915. Filmmakers from the eastern US moved to Southern California, attracted by year-round sunshine, diverse landscapes, and – according to legend – to circumvent Thomas Edison's MPPC patent pool. Carl Laemmle founded Universal City in 1915, the first major film studio. By 1920, Hollywood was the undisputed center of world film production."
  },
  {
    id: "faq-11",
    question: "What was the 'Golden Age' of Hollywood?",
    answer:
      "The Golden Age of Hollywood (ca. 1927–1960) was the era of the studio system: MGM, Paramount, Warner Bros., RKO, and 20th Century Fox controlled production, distribution, and cinemas. Stars were exclusively contracted to studios. The great genres emerged: musicals, westerns, screwball comedies, film noir. Technically, it was the era of sound film, Technicolor, and widescreen formats like CinemaScope (1953)."
  },
  {
    id: "faq-12",
    question: "What is the 'auteur' concept in film?",
    answer:
      "The auteur concept (French for 'author') was coined by critics at Cahiers du Cinéma – especially François Truffaut – in the 1950s. The thesis: the director is the true author of a film, just as a writer is the author of a novel. A true auteur can be recognized by their personal style, themes, and worldview running through all their films – regardless of the subject matter or producers. The theory revolutionized film criticism and elevated the director's status against the studio system."
  },
  {
    id: "faq-13",
    question: "What is the Steadicam and how did it change cinema?",
    answer:
      "The Steadicam was invented by Garrett Brown in 1975 and first used in 1976 in 'Bound for Glory'. It is a mechanical stabilization system that decouples the camera from the camera operator's body while keeping it freely movable. The result: flowing, floating shots that have neither the rigidity of a dolly shot nor the shakiness of a handheld camera. Stanley Kubrick used it for the famous corridor shots in 'The Shining' (1980), Scorsese for the Copacabana sequence in 'Goodfellas' (1990)."
  },
  {
    id: "faq-14",
    question: "When did the era of computer animation (CGI) in film begin?",
    answer:
      "The first CGI sequences in theatrical film appeared in 'Westworld' in 1973. The first fully computer-animated character was the 'Genesis Effect' in 'Star Trek II' (1982). 'Tron' (1982) used CGI for extended sequences. The real breakthrough was 'Jurassic Park' (1993), where photorealistic CGI dinosaurs convincingly interacted with real actors for the first time. 'Toy Story' (1995) was the first fully computer-animated feature film."
  },
  {
    id: "faq-15",
    question: "What is the difference between CGI and practical effects?",
    answer:
      "Practical effects are created on set: models, miniatures, pyrotechnics, masks, animatronics. CGI (Computer Generated Imagery) is created on computers in post-production. Both have advantages and disadvantages: practical effects produce real light, real shadows, and real actor reactions. CGI enables things that are physically impossible and is more cost-effective for certain effects. Most modern blockbusters combine both approaches."
  },
  {
    id: "faq-16",
    question: "What is New Hollywood and which films belong to it?",
    answer:
      "New Hollywood (ca. 1967–1980) was a movement of young American directors who broke up the old studio system. Triggered by the decline of the major studios, the influence of the Nouvelle Vague, and the social upheavals of the 1960s, Arthur Penn, Francis Ford Coppola, Martin Scorsese, Steven Spielberg, Brian De Palma, and George Lucas created a new American cinema. Key films: 'Bonnie and Clyde' (1967), 'Easy Rider' (1969), 'The Godfather' (1972), 'Chinatown' (1974), 'Taxi Driver' (1976)."
  },
  {
    id: "faq-17",
    question: "How did 'Star Wars' change the film industry?",
    answer:
      "'Star Wars' (1977) changed Hollywood on multiple levels simultaneously. Commercially: it invented the modern blockbuster system with summer releases, global marketing, and merchandising. Technically: George Lucas founded Industrial Light & Magic (ILM), which revolutionized the special effects industry. Structurally: it shifted studio focus from small, character-driven films (New Hollywood) toward large franchise productions. Culturally: it created the concept of 'event movies' that audiences wait months for."
  },
  {
    id: "faq-18",
    question: "What is Dolby sound and when was it introduced?",
    answer:
      "Dolby Stereo was introduced in 1975 and first used in 'A Star Is Born' (1976). It enabled multi-channel sound in cinemas with significantly reduced noise. Dolby Surround (1982) and later Dolby Digital (1992, first in 'Batman Returns') expanded the system to 5.1 channels. Dolby Atmos (2012) added a three-dimensional sound layer. Lucasfilm simultaneously developed THX (1983) as a quality standard for cinema playback."
  },
  {
    id: "faq-19",
    question: "When was analog film replaced by digital technology?",
    answer:
      "The transition occurred gradually over about 15 years. 'Star Wars Episode I' (1999) was the first major film partially shot digitally (with Sony HDW-F900). 'Sin City' (2005) and 'Collateral' (2004) demonstrated the creative potential of digital cameras. By 2012, most cinemas worldwide had switched to digital projection. Today, only a few directors consciously shoot on film – including Christopher Nolan and Quentin Tarantino, who defend the analog grain as an aesthetic choice."
  },
  {
    id: "faq-20",
    question: "What is non-linear editing (NLE) and how did it change film editing?",
    answer:
      "Non-linear editing (NLE) means that scenes can be edited in any order without physically cutting the material. In analog editing, film strips literally had to be cut with scissors and spliced. The first digital NLE system was the Avid Media Composer (1989). Apple Final Cut Pro (1999) democratized editing for independent filmmakers. Today, Adobe Premiere Pro is the most widely used system. NLE made experimentation risk-free and dramatically accelerated the editing process."
  },
  {
    id: "faq-21",
    question: "What is the '180-degree rule' and why is it important?",
    answer:
      "The 180-degree rule is a fundamental rule of film language: in a scene with two or more people, there is an imaginary axis between them. All camera positions should remain on the same side of this axis. Crossing the axis makes the people appear to have suddenly switched sides, disorienting the viewer. The rule is not absolute – deliberate crossing ('crossing the line') can be used as a stylistic device to express confusion or disorientation."
  },
  {
    id: "faq-22",
    question: "What is motion capture and in which films was it used?",
    answer:
      "Motion capture (MoCap) is a process where actors' movements are recorded by sensors or cameras and transferred to digital characters. Early experiments occurred in the 1990s. The breakthrough came with 'The Lord of the Rings' (2001–2003), where Andy Serkis as Gollum played the first fully MoCap-based film role. 'Avatar' (2009) combined MoCap with real-time preview on set. Today, MoCap is also used for facial animation (performance capture)."
  },
  {
    id: "faq-23",
    question: "How has the internet changed the film industry?",
    answer:
      "The internet changed the film industry on multiple levels: distribution (streaming instead of cinema or DVD), financing (crowdfunding for independent films), marketing (social media, trailer culture, fan communities), and production (cheap equipment + online distribution enabled one-person productions). Netflix launched its streaming service in 2007 and began producing original series with 'House of Cards' in 2013. Today, Netflix, Amazon, Disney+, Apple TV+, and others compete directly with traditional studios."
  },
  {
    id: "faq-24",
    question: "What is IMAX and how does it differ from regular cinema?",
    answer:
      "IMAX (Image Maximum) was developed in 1970 by a Canadian consortium. It uses a significantly larger film format (70mm horizontal instead of vertical) for massively higher resolution. IMAX screens can be up to 30 meters high. Modern digital IMAX cinemas offer 12K projection and specially tuned multi-channel sound. Directors like Christopher Nolan ('Interstellar', 'Dunkirk') shoot parts of their films in true IMAX format to utilize the full image quality."
  },
  {
    id: "faq-25",
    question: "What is the difference between a dolly and a crane in film?",
    answer:
      "A dolly is a wheeled platform on which the camera is mounted, moving on tracks or a smooth surface – for horizontal movements. A crane (jib or crane) lifts the camera into the air and enables vertical movements and overview perspectives. The first camera dolly was developed around 1907. Today there are also combination systems like the 'Technocrane' that combines dolly and crane, as well as drones for aerial shots."
  },
  {
    id: "faq-26",
    question: "What is the 'Kuleshov Effect' and what does it tell us about cinema?",
    answer:
      "Soviet film theorist Lev Kuleshov demonstrated a fascinating experiment in the early 1920s: he intercut the same neutral face of an actor with a bowl of soup, a coffin, and a playing child. The audience interpreted the face as hungry, sad, or happy – even though it was always the same image. The Kuleshov Effect proves: meaning in film is not created by individual images, but by their combination. Editing is cinema's true means of expression."
  },
  {
    id: "faq-27",
    question: "What is a 'MacGuffin' and who coined the term?",
    answer:
      "A MacGuffin is a plot element – an object, a goal, a secret – that motivates the characters and drives the action, but whose actual content is irrelevant to the story. Alfred Hitchcock coined and popularized the term. Classic MacGuffins: the briefcase in 'Pulp Fiction', the Death Star plans in 'Star Wars', the briefcase in 'Ronin'. What's in the case doesn't matter – what matters is that all characters want it."
  },
  {
    id: "faq-28",
    question: "How has AI changed film production so far?",
    answer:
      "AI has already changed film production on several levels: de-aging and digital rejuvenation of actors ('The Irishman', 2019), voice cloning for deceased performers, automated color grading, AI-assisted editing suggestions, generation of backgrounds and environments (virtual production with LED walls). In 2024, OpenAI's Sora shook the industry: the model generates convincing video sequences from text descriptions. At the same time, AI concerns led to the major Hollywood strikes of 2023 (SAG-AFTRA, WGA)."
  },
  {
    id: "faq-29",
    question: "What is the difference between a screenplay and a treatment?",
    answer:
      "A treatment is a short version of the film story – typically 5 to 30 pages – that describes the plot, characters, and tone, but does not yet contain developed dialogue. It serves as a sales document or development basis. A screenplay is the complete document with all scenes, dialogue, and stage directions. Standard formatting: one page equals approximately one minute of screen time. A feature-length screenplay typically has 90–120 pages."
  },
  {
    id: "faq-30",
    question: "Which films are considered the most important in film history?",
    answer:
      "Various institutions regularly compile canon lists. The British Film Institute (Sight & Sound) votes every ten years: 'Vertigo' (Hitchcock) led in 2012, 'Jeanne Dielman' (Akerman) in 2022. The American Film Institute names 'Citizen Kane' (Welles, 1941) as the most important American film. Technically groundbreaking: 'A Trip to the Moon' (Méliès, 1902), 'Battleship Potemkin' (Eisenstein, 1925), 'Citizen Kane' (1941), 'Rashomon' (Kurosawa, 1950), 'Breathless' (Godard, 1960), '2001: A Space Odyssey' (Kubrick, 1968), 'Star Wars' (Lucas, 1977), 'Jurassic Park' (Spielberg, 1993)."
  }
];
