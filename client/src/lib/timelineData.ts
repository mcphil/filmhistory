// Timeline data for "Die Geschichte des Bewegtbildes"
// Design: "Dunkles Lichtspiel" – Dark Editorial Cinema
// Technik-Meilensteine: gold | Filmsprache-Meilensteine: amber | Gegenreaktionen: red

export type EntryType = "technik" | "filmsprache" | "gegenreaktion" | "meilenstein";

export interface TimelineEntry {
  year: string;
  title: string;
  body: string;
  type: EntryType;
  quote?: string;
}

export interface TimelineEpoch {
  id: string;
  era: string;
  years: string;
  subtitle: string;
  description: string;
  entries: TimelineEntry[];
  image?: string;
}

export const epochs: TimelineEpoch[] = [
  {
    id: "vorfilm",
    era: "Vorfilm",
    years: "bis 1894",
    subtitle: "Die Vorgeschichte des Bewegtbildes",
    description: "Das Kino wurde nicht erfunden. Es wurde zusammengesetzt – aus Jahrhunderten von Experimenten, Spielzeug und Zaubertricks.",
    entries: [
      {
        year: "Antike–1650",
        title: "Camera Obscura",
        body: "Ein Loch in einer Wand, ein dunkler Raum, ein auf dem Kopf stehendes Bild der Außenwelt. Bekannt seit der Antike, beschrieben von arabischen Gelehrten im 11. Jahrhundert. Das Prinzip der Lichtbrechung ist so simpel, dass die Natur es täglich demonstriert – in jedem Blätterschatten bei Sonnenfinsternis.",
        type: "technik",
      },
      {
        year: "1659",
        title: "Laterna Magica",
        body: "Christiaan Huygens baut die erste Wunderlaterne – sie projiziert bemalte Glasdias auf eine Wand. Wanderprediger und Schausteller nutzen die Technik für Phantasmagoria-Spektakel: Geister aus dem Nichts, Rückprojektionen auf Rauch. Das erste Kino war ein Horrorshow-Zelt auf dem Jahrmarkt.",
        type: "technik",
        quote: "Das erste Kino war ein Horrorshow-Zelt auf dem Jahrmarkt. Manche Dinge ändern sich nie.",
      },
      {
        year: "1832",
        title: "Phénakistiskop",
        body: "Joseph Plateau veröffentlicht das Phénakistiskop – eine rotierende Scheibe mit Schlitzen, die beim Drehen vor einem Spiegel eine Bewegungsillusion erzeugt. Gleichzeitig entwickelt Simon von Stampfer in Wien das baugleiche Stroboskop. Das Gehirn kann getäuscht werden. Wenn Bilder schnell genug wechseln, sieht man Bewegung, wo keine ist. Die sogenannte Persistence of Vision ist die Grundlage jedes Films, der je gedreht wurde.",
        type: "technik",
      },
      {
        year: "1878",
        title: "Muybridge: Das Pferd im Galopp",
        body: "Eadweard Muybridge spannt 24 Kameras entlang einer Rennstrecke auf, verbindet sie mit Stolperdrähten und fotografiert ein Pferd im Galopp. Ergebnis: Ja, es hebt alle vier Hufe gleichzeitig. Und nebenbei hat Muybridge die erste Hochgeschwindigkeitsfotografie erfunden. Sein Zoopraxiscope projiziert die Bilder in Sequenz – das erste Mal, dass aufgenommene Bewegung wieder als Bewegung zu sehen ist.",
        type: "meilenstein",
      },
      {
        year: "1891",
        title: "Kinetoscope (Edison/Dickson)",
        body: "Thomas Edison lässt das Kinetoscope entwickeln: ein Peep-Show-Gerät, in das man eine Münze wirft und durch ein Okular auf einen 35mm-Filmstreifen schaut. Keine Projektion, kein gemeinsames Erlebnis, keine Leinwand. Edison dachte, das sei die Zukunft. Er lag falsch.",
        type: "technik",
      },
    ],
  },
  {
    id: "geburt",
    era: "Geburt",
    years: "1895–1910",
    subtitle: "Die Geburt des Kinos",
    description: "28. Dezember 1895. Ein Zug fährt in einen Bahnhof ein. Einige Zuschauer sollen aufgesprungen und weggerannt sein.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/101220242/eMM848s9vZH5Nks5dZfxni/lumiere_era-iZAxHf75ZboGFTbtC8hPJe.webp",
    entries: [
      {
        year: "28. Dez. 1895",
        title: "Cinématographe der Lumières",
        body: "Auguste und Louis Lumière zeigen im Salon Indien des Grand Café in Paris zehn kurze Filme vor zahlenden Zuschauern. Kein Drehbuch, keine Schauspieler, keine Geschichte. Nur das Leben, aufgenommen und zurückgespielt. Der Cinématographe ist Kamera, Drucker und Projektor in einem – leicht genug, um ihn in die Welt zu tragen.",
        type: "meilenstein",
        quote: "Das erste Kino war gleichzeitig das erste globale Medium.",
      },
      {
        year: "1895–1900",
        title: "Lumières Philosophie: Kamera als Zeuge",
        body: "Die Lumières glaubten, das Kino sei eine Attraktion ohne Zukunft. Dokumentarisches Zeugnis, nicht Kunst. Die Kamera stand fest. Die Welt lief vor ihr vorbei. Sie schickten Kameramänner nach Russland, Japan, Mexiko – überall hin. Aber die Kamera erzählte noch nicht.",
        type: "filmsprache",
      },
      {
        year: "1896–1902",
        title: "Georges Méliès: Zauberer des Kinos",
        body: "Der Pariser Zauberkünstler entdeckt den Stoppkameratrick durch Zufall: Die Kamera klemmt, er filmt weiter, und auf dem entwickelten Film verwandelt sich ein Omnibus in einen Leichenwagen. Aus diesem Zufall macht er ein System. Doppelbelichtung. Überblendung. Zeitraffer. Split Screen. Miniaturmodelle. Méliès dreht über 500 Filme.",
        type: "technik",
      },
      {
        year: "1902",
        title: "Voyage dans la Lune",
        body: "Der erste Science-Fiction-Film der Geschichte. 14 Minuten, handkoloriert, mit Raketen, Mondmenschen und dem berühmtesten Bild der frühen Filmgeschichte: dem Mond mit einer Rakete im Auge. Méliès denkt in Tableaux – frontale Totalen, wie auf einer Theaterbühne. Die Kamera ist der Zuschauerblick, nicht ein erzählendes Instrument. Das ist seine Grenze.",
        type: "meilenstein",
      },
    ],
  },
  {
    id: "filmsprache",
    era: "Filmsprache",
    years: "1908–1929",
    subtitle: "Die Erfindung der Filmsprache",
    description: "D.W. Griffith, die sowjetische Montagetheorie und der Deutsche Expressionismus erfinden das Kino als eigenständiges Erzählmedium.",
    entries: [
      {
        year: "1908–1915",
        title: "D.W. Griffith: Close-Up und Parallelmontage",
        body: "Wenn man eine Person nennen müsste, die aus dem Film ein eigenständiges Erzählmedium gemacht hat, wäre es D.W. Griffith. Das ist unbequem, weil sein bekanntester Film rassistische Propaganda ist. Beides ist wahr. Er entwickelt systematisch: die Großaufnahme, die Parallelmontage, den Flashback, die Iris-Blende.",
        type: "filmsprache",
        quote: "Griffith verstand, dass der Schnitt eine eigene Sprache ist. Dass ein Close-Up auf eine Hand mehr sagen kann als ein ganzer Monolog.",
      },
      {
        year: "1919–1927",
        title: "Deutscher Expressionismus",
        body: "Caligari (1920), Nosferatu (1922), Metropolis (1927) – Filme, in denen die Welt schief ist, weil die Seelen schief sind. Schräge Winkel, extreme Schatten, expressionistische Kulissen. Fritz Lang nutzt in Metropolis das Schüfftan-Verfahren – eine Spiegeltechnik, die Schauspieler in Miniaturkulissen integriert. Das erste Mal, dass Filmtechnik eine Realität erschafft, die es nicht gibt.",
        type: "filmsprache",
      },
      {
        year: "1921",
        title: "Kuleschow-Effekt",
        body: "Lew Kuleschow demonstriert sein berühmtes Experiment: Er schneidet denselben neutralen Gesichtsausdruck eines Schauspielers abwechselnd mit einem Teller Suppe, einem Sarg und einem spielenden Kind zusammen. Das Publikum sieht Hunger, Trauer und Freude – obwohl das Gesicht identisch ist. Bedeutung entsteht nicht im Bild, sondern zwischen den Bildern.",
        type: "meilenstein",
        quote: "Bedeutung entsteht nicht im Bild, sondern zwischen den Bildern.",
      },
      {
        year: "1925",
        title: "Eisenstein: Intellektuelle Montage",
        body: "Sergei Eisenstein baut auf Kuleschow auf und entwickelt die Intellektuelle Montage: Bilder, die zusammen eine Idee erzeugen, die keines der Bilder allein enthält. Die Odessa-Treppe in Panzerkreuzer Potemkin ist das bekannteste Beispiel – eine Sequenz, die durch Rhythmus, Kontrast und Wiederholung emotionale Wucht erzeugt, die weit über das Gezeigte hinausgeht.",
        type: "filmsprache",
      },
      {
        year: "1929",
        title: "Dziga Vertow: Der Mann mit der Kamera",
        body: "Vertows Manifest des Kino-Auges: Die Kamera sieht besser als das menschliche Auge. Zeitlupe, Zeitraffer, Doppelbelichtung, Splitscreen – alles als Werkzeuge der Wahrheit. Ein Film ohne Schauspieler, ohne Drehbuch, ohne Zwischentitel. Nur Kamera und Schnitt.",
        type: "filmsprache",
      },
    ],
  },
  {
    id: "tonfilm",
    era: "Tonfilm",
    years: "1927–1939",
    subtitle: "Befreiung und Gefangenschaft",
    description: "Der Tonfilm befreit den Film vom Zwischentitel – und fesselt die Kamera. Dann kommt die Farbe.",
    entries: [
      {
        year: "6. Okt. 1927",
        title: "The Jazz Singer",
        body: "Al Jolson singt und sagt: »Wait a minute, wait a minute. You ain't heard nothin' yet.« Der erste synchrone Dialog in einem Spielfilm. Die Stummfilm-Ära endet – nicht sofort, aber unaufhaltsam.",
        type: "meilenstein",
        quote: "»Wait a minute, wait a minute. You ain't heard nothin' yet.«",
      },
      {
        year: "1927–1930",
        title: "Der Blimp: Kamera in Gefangenschaft",
        body: "Die frühen Mikrofone sind so empfindlich, dass das Geräusch der Kamera alles übertönt. Die Lösung: Die Kamera kommt in einen schallisolierten Glaskasten, den Blimp. Plötzlich steht die Kamera wieder still, wie in den allerersten Jahren des Kinos. Drei Jahre Fortschritt in der Kamerabewegung – weg.",
        type: "technik",
        quote: "Drei Jahre Fortschritt in der Kamerabewegung – weg.",
      },
      {
        year: "1931",
        title: "Fritz Lang: M – Tondramaturgie als Kunst",
        body: "Fritz Langs M ist das erste Meisterwerk der neuen Tonsprache. Das Pfeifmotiv des Mörders – ein Leitmotiv, das ankündigt, bevor das Bild zeigt – war in einem Stummfilm schlicht unmöglich gewesen. Bild und Ton als eine Einheit denken: das ist die neue Aufgabe.",
        type: "filmsprache",
      },
      {
        year: "1932",
        title: "Technicolor Drei-Streifen",
        body: "Drei separate Negative für Rot, Grün und Blau, zusammengesetzt zu einem Farbbild. Walt Disney nutzt es 1932 für Flowers and Trees – der erste Animationsfilm in Vollfarbe. Der erste Spielfilm: Becky Sharp (1935).",
        type: "technik",
      },
      {
        year: "1939",
        title: "The Wizard of Oz: Farbe als Dramaturgie",
        body: "Kansas ist schwarz-weiß. Oz ist Technicolor. Das ist keine technische Entscheidung, das ist Dramaturgie. Farbe als Metapher. Von diesem Moment an ist klar: Technik und Filmsprache sind nicht getrennte Dinge. Sie sind dasselbe.",
        type: "meilenstein",
        quote: "Farbe als Metapher. Von diesem Moment an ist klar: Technik und Filmsprache sind nicht getrennte Dinge. Sie sind dasselbe.",
      },
    ],
  },
  {
    id: "goldenhollywood",
    era: "Goldenes Hollywood",
    years: "1941–1965",
    subtitle: "Tiefe, Noir und das Breitbild",
    description: "Orson Welles erfindet die Tiefenschärfe. Film Noir macht Licht zum Erzähler. Hollywood antwortet auf das Fernsehen mit dem Breitbild.",
    entries: [
      {
        year: "1941",
        title: "Citizen Kane: Tiefenschärfe und Weitwinkel",
        body: "Orson Welles war 25 Jahre alt, hatte noch nie einen Film gedreht und bekam vollständige künstlerische Kontrolle. Mit Kameramann Gregg Toland entwickelt er die Tiefenschärfe zu einem Stilmittel: Alles im Bild ist scharf, von vorne bis hinten. Extreme Untersichten, Deckenaufnahmen, Weitwinkelobjektive. Citizen Kane ist ein Lehrbuch der Kamerasprache, das bis heute in Filmschulen benutzt wird.",
        type: "meilenstein",
        quote: "Tiefenschärfe bedeutet, dass der Zuschauer selbst entscheiden kann, wohin er schaut.",
      },
      {
        year: "1940er–50er",
        title: "Film Noir: Licht als Erzähler",
        body: "Hartes Licht, tiefe Schatten, schräge Winkel, moralische Ambiguität. Technisch eine Frage der Beleuchtung: Wenig Licht, gezielt gesetzt, erzeugt mehr Spannung als ein ausgeleuchtetes Set. Der Deutsche Expressionismus, amerikanisiert.",
        type: "filmsprache",
      },
      {
        year: "1953",
        title: "CinemaScope: Antwort auf das Fernsehen",
        body: "Das Fernsehen hat 4:3. Hollywood antwortet mit CinemaScope, VistaVision, Todd-AO. Breiter. Größer. Mehr. Das Seitenverhältnis 2.35:1 ist bis heute das Standardformat für epische Filme – und es existiert, weil das Fernsehen 4:3 hatte.",
        type: "technik",
      },
      {
        year: "1958",
        title: "Dolly-Zoom: Technik als Psychologie",
        body: "Kameramann Irmin Roberts erfindet für Hitchcocks Vertigo den Dolly-Zoom-Effekt: Die Kamera fährt zurück, während das Objektiv gleichzeitig heranzoomt. Das Motiv bleibt gleich groß, aber der Hintergrund verändert sich dramatisch. Ein physisch unmögliches Gefühl – Schwindel, Desorientierung, Angst – direkt ins Bild übersetzt.",
        type: "meilenstein",
      },
    ],
  },
  {
    id: "nouvellvague",
    era: "Nouvelle Vague",
    years: "1958–1968",
    subtitle: "Die befreite Kamera",
    description: "Leichte Kameras, natürliches Licht, Straßen statt Studios. Die Nouvelle Vague macht aus Regelbrüchen eine neue Sprache.",
    entries: [
      {
        year: "1958",
        title: "Arriflex 35: Die Kamera wird leicht",
        body: "Eine Kamera, leicht genug, um sie auf der Schulter zu tragen. Zur gleichen Zeit entstehen leichtere Tonaufnahmegeräte. Das Ergebnis ist eine Bewegung, die nicht geplant war, aber unvermeidlich schien: die Nouvelle Vague.",
        type: "technik",
      },
      {
        year: "1959–1962",
        title: "Godard, Truffaut, Varda: Jump Cut und Auteur",
        body: "Godards Außer Atem (1960) ist das Manifest. Der Jump Cut – ein Schnitt, der gegen alle Regeln der Kontinuität verstößt – war kein Fehler. Er war eine Aussage: Kino muss nicht so tun, als wäre es unsichtbar. Die Nouvelle Vague etabliert die Auteur-Theorie: Der Regisseur ist der Autor des Films.",
        type: "filmsprache",
        quote: "Kino muss nicht so tun, als wäre es unsichtbar.",
      },
      {
        year: "1944–1960",
        title: "Neorealismo Italiano",
        body: "Vittorio De Sica, Roberto Rossellini: Außenaufnahmen, Laiendarsteller, natürliches Licht. Die Kamera geht auf die Straße. Martin Scorsese nannte den Neorealismus »die Rehabilitation einer ganzen Kultur und eines Volkes durch das Kino«.",
        type: "filmsprache",
      },
    ],
  },
  {
    id: "newhollywood",
    era: "New Hollywood",
    years: "1967–1980",
    subtitle: "Die Filmschule-Generation",
    description: "Scorsese, Coppola, Spielberg, Lucas. Sie hatten Eisenstein und Godard studiert und brachten das europäische Autorenkino nach Amerika.",
    entries: [
      {
        year: "1975",
        title: "Steadicam: Freiheit und Stabilität",
        body: "Garrett Brown erfindet die Steadicam. Ein Gegengewichtssystem entkoppelt die Kamera von den Bewegungen des Kameramanns. Das Ergebnis ist eine Bewegung, die fließend ist wie ein Dolly, aber überallhin kann. Erste Nutzung: Bound for Glory (1976). Berühmt durch Rocky (1976) und The Shining (1980).",
        type: "technik",
        quote: "Die Steadicam verbindet die Stabilität des Dollys mit der Freiheit der Handkamera.",
      },
      {
        year: "1975–1977",
        title: "Jaws und Star Wars: Der Blockbuster",
        body: "Spielberg und Lucas beenden das New Hollywood – nicht absichtlich, aber effektiv. Jaws (1975) und Star Wars (1977) erfinden den Blockbuster. Lucas gründet ILM und revolutioniert den Kinoton: Dolby Stereo macht aus dem Kino ein akustisches Erlebnis, das zu Hause nicht reproduzierbar war.",
        type: "meilenstein",
      },
      {
        year: "1980",
        title: "The Shining: Steadicam als Stilmittel",
        body: "Kubrick nutzt die Steadicam für die Labyrinth-Verfolgungssequenz – ein Effekt, der mit keiner anderen Technik möglich gewesen wäre. Scorseses Copacabana-Shot in Goodfellas (1990) wird das bekannteste Steadicam-Meisterwerk: fast drei Minuten ohne einen einzigen Schnitt.",
        type: "filmsprache",
      },
    ],
  },
  {
    id: "cgi",
    era: "CGI-Ära",
    years: "1973–1999",
    subtitle: "Der Computer betritt das Kino",
    description: "Von den ersten pixelierten Roboteraugen bis zu fotorealistischen Dinosauriern und einer Kamera, die überall sein kann.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/101220242/eMM848s9vZH5Nks5dZfxni/digital_era-U5XNHp92gayFefhXFnQP86.webp",
    entries: [
      {
        year: "1973",
        title: "Westworld: Erste digitale Bildverarbeitung",
        body: "Michael Crichtons Westworld nutzt digitale Bildverarbeitung, um die pixelierte Sicht eines Roboters zu simulieren. Das erste Mal, dass ein Computer Bilder für einen Kinofilm produziert. Niemand ahnte damals, was daraus werden würde.",
        type: "technik",
      },
      {
        year: "1982",
        title: "Tron: 15 Minuten CGI",
        body: "Tron zeigt 15 Minuten vollständig computergenerierter Bilder. Die Technik ist für die damalige Zeit atemberaubend. Das Publikum ist mäßig begeistert. Aber die Tür ist offen.",
        type: "technik",
      },
      {
        year: "1984",
        title: "EditDroid: Grundlage des digitalen Schnitts",
        body: "Lucasfilm zeigt auf der NAB-Messe den EditDroid – ein nichtlineares Schnittsystem auf LaserDisc-Basis. Erstmals kann man Clips in beliebiger Reihenfolge aufrufen, eine Timeline auf einem Bildschirm sehen und Schnitte ohne physisches Schneiden vornehmen. Die Grundkonzepte – Clip-Bins, Timeline, digitale Vorschau – sind bis heute in jedem Schnittprogramm zu finden.",
        type: "technik",
      },
      {
        year: "1989",
        title: "Avid Media Composer: Digitaler Schnitt",
        body: "Das erste volldigitale NLE-System, das auf einem Macintosh läuft. Teuer, Bildqualität bescheiden, Speicherkapazität begrenzt. Aber es funktioniert. Und es verändert die Branche innerhalb weniger Jahre vollständig.",
        type: "meilenstein",
      },
      {
        year: "1993",
        title: "Jurassic Park: CGI kann alles ersetzen",
        body: "Steven Spielberg fragt ILM, ob fotorealistische Dinosaurier möglich sind. Die Antwort: vielleicht. Das Ergebnis ist ein Wendepunkt der Filmgeschichte. Die CGI-Dinosaurier sehen nicht aus wie Computerbilder. Sie sehen aus wie Tiere. Das Publikum glaubt ihnen.",
        type: "meilenstein",
        quote: "Von diesem Moment an war klar: CGI kann alles ersetzen.",
      },
      {
        year: "1995",
        title: "Toy Story: Erster vollständig CGI-Film",
        body: "Pixar beweist, dass CGI nicht Realität imitieren muss, um zu funktionieren. Ein stilisierter, nicht-realistischer Look kann genauso emotional berühren wie jede Fotografie.",
        type: "meilenstein",
      },
      {
        year: "1995",
        title: "Dogme 95: Gegenreaktion auf CGI",
        body: "Lars von Trier und Thomas Vinterberg veröffentlichen ihr Manifest: Nur Handkamera, Originallicht, keine Spezialeffekte, kein Regisseur-Credit. Dogme 95 ist eine Gegenreaktion auf den CGI-Überfluss. Die Vows of Chastity als Befreiung durch Beschränkung.",
        type: "gegenreaktion",
        quote: "Befreiung durch Beschränkung.",
      },
      {
        year: "1999",
        title: "The Matrix: Bullet Time",
        body: "Ein Array von rund 99 bis 120 Fotokameras, in einem Bogen um den Schauspieler aufgestellt. Die Einzelbilder werden zu einer fließenden Bewegung zusammengesetzt, die eine Kamerabewegung simuliert, die es nicht gibt. Eine Einstellung, die das Kino verändert – und die in den nächsten Jahren in jedem Werbespot kopiert wird, bis sie zur Parodie wird.",
        type: "meilenstein",
      },
    ],
  },
  {
    id: "digital",
    era: "Digital",
    years: "2002–2015",
    subtitle: "Das Ende des Filmstreifens",
    description: "RED, DSLR, ARRI Alexa. Der Filmstreifen verschwindet aus den Kinos. Und ein Kämpfer hält dagegen.",
    entries: [
      {
        year: "2002",
        title: "Star Wars Episode II: Erster großer Digitalfilm",
        body: "George Lucas dreht Star Wars Episode II komplett digital auf der Sony HDW-F900. Der erste große Spielfilm ohne Filmstreifen.",
        type: "technik",
      },
      {
        year: "2007",
        title: "RED ONE: 4K für alle",
        body: "Jim Jannard gründet RED Digital Cinema. 4K-Auflösung für den Preis einer Filmkamera. Die Demokratisierung des professionellen Filmemachens beginnt.",
        type: "technik",
      },
      {
        year: "2008",
        title: "Canon 5D Mark II: Die DSLR-Revolution",
        body: "Eine Spiegelreflexkamera für Fotografen, die nebenbei Full-HD-Video aufnehmen kann. Flache Schärfentiefe, filmisches Bokeh – für 2.500 Euro. Eine Episode der Krankenhausserie House (M.D.) wird auf einer 5D Mark II gedreht – das erste Mal, dass eine DSLR für eine US-Fernsehproduktion eingesetzt wird. Jeder kann jetzt Bilder produzieren, die wie Kinofilm aussehen.",
        type: "meilenstein",
        quote: "Jeder kann jetzt Bilder produzieren, die wie Kinofilm aussehen.",
      },
      {
        year: "2009",
        title: "Avatar: Virtuelle Kamera",
        body: "James Cameron entwickelt eine virtuelle Kamera, mit der er durch die CGI-Welt navigieren kann wie durch ein echtes Set. 3D-Renaissance. Motion Capture auf neuem Level.",
        type: "technik",
      },
      {
        year: "2010",
        title: "ARRI Alexa: Digitales Filmaussehen",
        body: "Die Alexa wird zur dominanten Kamera in Hollywood – nicht wegen der Auflösung, sondern wegen des Bildes. Warme Hauttöne, natürliches Rauschen, ein Dynamikumfang, der an Filmmaterial erinnert. In einer Zeit, in der alles digital wird, bietet die Alexa das Beste beider Welten.",
        type: "technik",
      },
      {
        year: "2012",
        title: "Ende des 35mm-Filmstreifens im Kino",
        body: "In diesem Jahr haben die meisten Kinos weltweit auf digitale Projektion umgestellt. Der 35mm-Filmstreifen, der seit den 1890er Jahren das Medium des Kinos war, verschwindet aus den Vorführräumen. Keine schweren Filmrollen mehr. Aber auch: keine Patina, keine Unvollkommenheit.",
        type: "meilenstein",
      },
      {
        year: "2012",
        title: "Dolby Atmos: Objektbasierter Raumklang",
        body: "Statt fester Kanäle arbeitet Atmos mit Klangobjekten: Jedes Geräusch hat eine Position im dreidimensionalen Raum. Ein Hubschrauber fliegt über die Köpfe der Zuschauer. Das verändert, wie Regisseure über Ton denken.",
        type: "technik",
      },
      {
        year: "2014–heute",
        title: "Nolan kämpft für 35mm",
        body: "Christopher Nolan dreht Interstellar (2014), Dunkirk (2017), Oppenheimer (2023) auf 35mm oder 70mm. Das ist keine Sentimentalität. Es ist eine ästhetische Entscheidung, die eine bestimmte Bildqualität erzeugt. Der bekannteste Kämpfer für das analoge Filmmaterial in einer vollständig digitalen Welt.",
        type: "gegenreaktion",
      },
    ],
  },
  {
    id: "ki",
    era: "KI-Ära",
    years: "2015–2026",
    subtitle: "Grundsatzfragen",
    description: "Streaming, LED-Volumes, generative KI. Was bedeutet Filmemachen noch, wenn ein Satz Text ein Video erzeugt?",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/101220242/eMM848s9vZH5Nks5dZfxni/digital_era-U5XNHp92gayFefhXFnQP86.webp",
    entries: [
      {
        year: "2013–heute",
        title: "Netflix als Produzent",
        body: "House of Cards (2013) ist die erste von einem Studio produzierte Netflix-Serie – die allererste Netflix-Original-Serie war Lilyhammer (2012). Netflix verändert Finanzierung und Distribution. Binge-Watching verändert die Dramaturgie: Serielles Erzählen, Cliffhanger als Standard, Episodenstruktur als Kunstform.",
        type: "meilenstein",
      },
      {
        year: "2019",
        title: "The Mandalorian: LED-Volume",
        body: "Fast keine der Außenszenen wird draußen gedreht. Stattdessen steht die Crew in einer riesigen, kreisförmigen LED-Wand – dem ILM StageCraft-System. Echtzeit-Rendering mit Unreal Engine. Das Licht der Umgebung fällt tatsächlich auf die Schauspieler. Die Rückkehr zur kontrollierten Umgebung – aber mit Echtzeit-CGI statt bemalter Kulisse.",
        type: "meilenstein",
        quote: "Das ist die Rückkehr zu etwas, das Méliès schon wusste: Kontrolle über die Umgebung ist Kontrolle über das Bild.",
      },
      {
        year: "2022–2023",
        title: "Runway und KI in der Post-Production",
        body: "Everything Everywhere All at Once nutzt das KI-Tool Runway in der Post-Production – nicht für ganze Szenen, sondern als Hilfswerkzeug für Rotoscoping und Compositing. Ein kleines Team, wenig Budget, maximale Wirkung. Das ist der Punkt.",
        type: "technik",
      },
      {
        year: "2023",
        title: "WGA/SAG-AFTRA-Streik: KI als Bedrohung",
        body: "Der erste große Streik in Hollywood seit Jahrzehnten. Zentrale Fragen: Wer besitzt ein Drehbuch, das ein KI-System mitgeschrieben hat? Darf ein Studio das Gesicht eines Schauspielers digital in einem Film verwenden, für den er nicht bezahlt wurde? Diese Fragen sind bis heute nicht vollständig beantwortet.",
        type: "gegenreaktion",
      },
      {
        year: "Feb. 2024",
        title: "OpenAI Sora: Text-to-Video",
        body: "Ein Modell, das aus Textbeschreibungen Videos generiert. Die ersten Beispiele sind verblüffend. Nicht perfekt – Hände haben zu viele Finger, Physik verhält sich manchmal seltsam – aber verblüffend. Ein Strand, eine Frau, goldenes Licht, eine Kamerabewegung, die wie ein professioneller Dreh aussieht. Aus einem Satz Text.",
        type: "meilenstein",
        quote: "Wenn jede Kamerabewegung möglich ist, wenn jede Umgebung generiert werden kann – was ist dann die Aussage einer Einstellung?",
      },
      {
        year: "2025–2026",
        title: "Kling, Seedance, Sora 2: Das Uncanny Valley schließt sich",
        body: "Chinesische KI-Videotools produzieren Qualitäten, die manche als Schließung des Uncanny Valley beschreiben. Videos, die von echten Filmaufnahmen kaum zu unterscheiden sind. Sora 2 erscheint im September 2025. Die Grenze zwischen gedrehtem Film und generiertem Video wird unschärfer.",
        type: "meilenstein",
      },
    ],
  },
];

export interface GlossaryEntry {
  term: string;
  category: "technik" | "filmsprache" | "format" | "bewegung";
  definition: string;
  year?: string;
}

export const glossary: GlossaryEntry[] = [
  // Technik
  { term: "35mm-Filmstreifen", category: "technik", year: "1892", definition: "Das von Edison und Dickson etablierte Standardformat für Kinofilm: 35 Millimeter breites Zelluloidmaterial mit Perforationslöchern an den Rändern. War von den 1890ern bis in die 2010er Jahre das dominierende Aufnahme- und Projektionsmedium." },
  { term: "Arriflex 35", category: "technik", year: "1937", definition: "Handgehaltene 35mm-Filmkamera der deutschen Firma ARRI. Durch ihr geringes Gewicht ermöglichte sie erstmals wirklich mobile Kameraarbeit und wurde zum technischen Fundament der Nouvelle Vague." },
  { term: "ARRI Alexa", category: "technik", year: "2010", definition: "Digitale Kinokamera von ARRI, die durch ihre Bildcharakteristik – warme Hauttöne, natürliches Rauschen, hoher Dynamikumfang – das analoge Filmmaterial ästhetisch imitiert. Seit ihrer Einführung die meistgenutzte Kamera in Hollywood-Produktionen." },
  { term: "Avid Media Composer", category: "technik", year: "1989", definition: "Erstes professionell genutztes nichtlineares Schnittsystem (NLE) auf Computerbasis. Revolutionierte die Post-Production: Statt physischem Schneiden von Filmstreifen wurden Clips digital auf einer Timeline arrangiert." },
  { term: "Blimp", category: "technik", year: "1927", definition: "Schallisolierter Gehäusekasten für Filmkameras, der das Betriebsgeräusch des Kameramotors dämpft. Wurde mit Einführung des Tonfilms notwendig, da empfindliche Mikrofone das Kameraklappern aufnahmen – und fesselte die Kamera für mehrere Jahre an den Stativ." },
  { term: "Bullet Time", category: "technik", year: "1999", definition: "In The Matrix entwickelte Effekttechnik: Hunderte Fotokameras sind in einem Bogen um das Motiv aufgestellt und lösen in schneller Folge aus. Die Einzelbilder ergeben eine Kamerabewegung, die physisch unmöglich wäre – die Welt scheint einzufrieren, während die Kamera um sie herumfährt." },
  { term: "Camera Obscura", category: "technik", definition: "Lat. \"dunkle Kammer\". Optisches Prinzip: Licht fällt durch ein kleines Loch in einen dunklen Raum und projiziert ein umgekehrtes Bild der Außenwelt auf die gegenüberliegende Wand. Bekannt seit der Antike, Vorläufer der Fotografie und des Kinos." },
  { term: "CGI", category: "technik", year: "1973", definition: "Computer-Generated Imagery. Computergenerierte Bilder und Animationen im Film. Erste Nutzung 1973 in Westworld, Durchbruch 1993 mit Jurassic Park, heute allgegenwärtig von Blockbustern bis zu Serienproduktionen." },
  { term: "Cinématographe", category: "technik", year: "1895", definition: "Von den Brüdern Lumière entwickeltes Gerät, das gleichzeitig Kamera, Filmdrucker und Projektor war. Leicht und transportabel, ermöglichte es erstmals öffentliche Filmvorführungen vor zahlendem Publikum. Am 28. Dezember 1895 in Paris uraufgeführt." },
  { term: "CinemaScope", category: "format", year: "1953", definition: "Anamorphotisches Breitbildformat mit einem Seitenverhältnis von 2.35:1, entwickelt als Antwort auf das aufkommende Fernsehen (4:3). Durch eine spezielle Linse wird das Bild beim Drehen horizontal gestaucht und bei der Projektion wieder gestreckt." },
  { term: "Dolby Atmos", category: "technik", year: "2012", definition: "Objektbasiertes Raumklangsystem von Dolby. Statt fester Tonspuren werden Klangobjekte mit dreidimensionalen Positionen im Raum definiert. Ermöglicht präzise Klangbewegungen über und um den Zuschauer herum." },
  { term: "Dolby Stereo", category: "technik", year: "1975", definition: "Mehrkanaliges Tonsystem, das mit Star Wars (1977) populär wurde. Erstmals konnte Kinoton räumlich erlebt werden – Geräusche kamen aus verschiedenen Richtungen. Machte das Kino als akustisches Erlebnis zu Hause nicht reproduzierbar." },
  { term: "Dolly", category: "technik", definition: "Fahrgestell auf Schienen oder Rädern, auf dem die Kamera montiert wird. Ermöglicht gleichmäßige, kontrollierte Kamerafahrten. Grundlegendes Werkzeug seit den frühen 1910er Jahren." },
  { term: "EditDroid", category: "technik", year: "1984", definition: "Von Lucasfilm entwickeltes nichtlineares Schnittsystem auf LaserDisc-Basis. Vorläufer moderner NLE-Software: Erstmals konnten Clips in beliebiger Reihenfolge aufgerufen und Schnitte ohne physisches Schneiden vorgenommen werden." },
  { term: "Kinetoscope", category: "technik", year: "1891", definition: "Von Thomas Edison und William Dickson entwickeltes Peep-Show-Gerät: Ein einzelner Betrachter schaut durch ein Okular auf einen laufenden 35mm-Filmstreifen. Keine Projektion, kein gemeinsames Erlebnis. Edison glaubte, das sei die Zukunft des Films – er irrte sich." },
  { term: "Laterna Magica", category: "technik", year: "1659", definition: "Von Christiaan Huygens entwickelter Vorläufer des Diaprojektors: Eine Lichtquelle projiziert bemalte Glasdias auf eine Wand oder einen Vorhang. Wurde von Schaustellern für Phantasmagoria-Spektakel genutzt – das erste \"Kino\" war ein Jahrmarktsspektakel." },
  { term: "LED-Volume", category: "technik", year: "2019", definition: "Auch \"Virtual Production Stage\": Eine riesige gebogene LED-Wand zeigt fotorealistisch gerenderte Hintergründe in Echtzeit. Schauspieler agieren vor der Wand, die Kamera nimmt Vordergrund und Hintergrund gemeinsam auf. Entwickelt von ILM für The Mandalorian." },
  { term: "Motion Capture", category: "technik", year: "2000er", definition: "Verfahren zur Aufzeichnung von Bewegungen: Schauspieler tragen Anzüge mit Markierungspunkten, deren Positionen von Kameras erfasst und auf digitale Charaktere übertragen werden. Ermöglicht fotorealistische CGI-Figuren mit menschlichen Bewegungsqualitäten." },
  { term: "NLE", category: "technik", year: "1989", definition: "Non-Linear Editing. Digitales Schnittsystem, bei dem Clips in beliebiger Reihenfolge auf einer computergestützten Timeline angeordnet werden können – im Gegensatz zum linearen Schnitt, bei dem Filmstreifen physisch geschnitten und geklebt wurden." },
  { term: "Phénakistiskop", category: "technik", year: "1832", definition: "Von Joseph Plateau erfundenes optisches Spielzeug: Eine rotierende Scheibe mit Schlitzen und gezeichneten Bewegungsphasen erzeugt beim Drehen vor einem Spiegel die Illusion von Bewegung. Nutzt das Prinzip der Persistence of Vision." },
  { term: "RED ONE", category: "technik", year: "2007", definition: "Erste 4K-Digitalkinokamera zu einem Preis, der auch für unabhängige Filmemacher erschwinglich war. Gegründet von Jim Jannard, demokratisierte RED die professionelle Filmproduktion erheblich." },
  { term: "Schüfftan-Verfahren", category: "technik", year: "1923", definition: "Von Eugen Schüfftan entwickelte Spiegeltechnik: Ein halbdurchlässiger Spiegel kombiniert Schauspieler mit Miniaturmodellen oder Hintergrundgemälden in einem einzigen Kamerabild. Erstmals in Metropolis (1927) eingesetzt – Vorläufer moderner Compositing-Verfahren." },
  { term: "Steadicam", category: "technik", year: "1975", definition: "Von Garrett Brown erfundenes Kamerastabilisierungssystem: Ein Gegengewichtsmechanismus entkoppelt die Kamera von den Körperbewegungen des Kameramanns. Das Ergebnis ist eine fließende, stabile Bewegung, die weder Dolly noch Handkamera ist." },
  { term: "Technicolor", category: "technik", year: "1916", definition: "Farbfilmverfahren, das in seiner Drei-Streifen-Version (1932) drei separate Negative für Rot, Grün und Blau belichtete und zu einem Farbbild zusammenführte. Bekannt durch The Wizard of Oz (1939) und viele Klassiker des Goldenen Hollywoods." },
  { term: "Zoopraxiscope", category: "technik", year: "1879", definition: "Von Eadweard Muybridge entwickelter Vorläufer des Filmprojektors: Eine rotierende Glasscheibe mit Fotografien in Bewegungssequenz wird vor einer Lichtquelle gedreht und projiziert die Bilder in schneller Folge – erstmals war aufgenommene Bewegung als Bewegung zu sehen." },
  // Filmsprache
  { term: "Auteur-Theorie", category: "filmsprache", year: "1954", definition: "Von den Cahiers du Cinéma-Kritikern (später Nouvelle-Vague-Regisseure) formulierte Theorie: Der Regisseur ist der eigentliche Autor eines Films – so wie ein Schriftsteller der Autor eines Romans ist. Der Regisseur prägt durch seinen persönlichen Stil alle Aspekte des Films." },
  { term: "Close-Up", category: "filmsprache", definition: "Großaufnahme: Die Kamera zeigt ein Detail aus nächster Nähe, meist ein Gesicht oder einen Gegenstand. Von D.W. Griffith systematisch als Erzählmittel eingesetzt: Ein Close-Up auf eine Hand kann mehr sagen als ein ganzer Monolog." },
  { term: "Dolly-Zoom", category: "filmsprache", year: "1958", definition: "Auch \"Vertigo-Effekt\" oder \"Hitchcock-Zoom\": Die Kamera fährt zurück (oder vor), während das Objektiv gleichzeitig heranzoomt (oder herauszoomt). Das Motiv bleibt gleich groß, aber der Hintergrund verändert sich dramatisch – ein physisch unmögliches Gefühl von Schwindel und Desorientierung." },
  { term: "Flashback", category: "filmsprache", definition: "Rückblende: Eine Szene, die zeitlich vor dem aktuellen Handlungsmoment liegt. Von D.W. Griffith als erzählerisches Mittel entwickelt, heute ein Standardelement der Filmdramaturgie." },
  { term: "Handkamera", category: "filmsprache", year: "1958", definition: "Die Kamera wird vom Kameramann getragen statt auf einem Stativ oder Dolly montiert. Erzeugt eine unruhige, dokumentarische Bildästhetik. Von der Nouvelle Vague als Stilmittel etabliert, von Dogme 95 zum Prinzip erhoben." },
  { term: "Intellektuelle Montage", category: "filmsprache", year: "1925", definition: "Von Sergei Eisenstein entwickeltes Schnittprinzip: Zwei Bilder, die zusammen eine Idee erzeugen, die keines der Bilder allein enthält. Über den Kuleschow-Effekt hinausgehend, zielt die intellektuelle Montage auf abstrakte Gedanken und politische Aussagen." },
  { term: "Jump Cut", category: "filmsprache", year: "1960", definition: "Ein Schnitt, der gegen die Kontinuitätsregeln verstößt: Zwei Einstellungen derselben Szene werden zusammengeschnitten, obwohl eine sichtbare Diskontinuität entsteht. Von Godard in Außer Atem (1960) bewusst als Stilmittel eingesetzt – kein Fehler, sondern eine Aussage." },
  { term: "Kino-Auge", category: "filmsprache", year: "1924", definition: "Dziga Vertows Theorie: Die Kamera sieht besser als das menschliche Auge. Zeitlupe, Zeitraffer, ungewöhnliche Winkel – all das sind Werkzeuge, um eine Wahrheit zu zeigen, die das bloße Auge nicht sehen kann. Grundlage des dokumentarischen Kinos." },
  { term: "Kuleschow-Effekt", category: "filmsprache", year: "1921", definition: "Von Lew Kuleschow demonstriertes Montageprinzip: Derselbe neutrale Gesichtsausdruck wirkt unterschiedlich, je nachdem, welches Bild davor oder danach geschnitten wird. Bedeutung entsteht nicht im Bild, sondern zwischen den Bildern." },
  { term: "Leitmotiv", category: "filmsprache", definition: "Wiederkehrendes musikalisches oder visuelles Motiv, das mit einer Figur, einem Ort oder einer Idee verknüpft ist. Im Tonfilm von Fritz Lang (M, 1931) als dramaturgisches Mittel eingesetzt: Das Pfeifmotiv des Mörders kündigt ihn an, bevor das Bild ihn zeigt." },
  { term: "Parallelmontage", category: "filmsprache", year: "1908", definition: "Von D.W. Griffith entwickelte Schnitttechnik: Zwei gleichzeitig stattfindende Handlungsstränge werden abwechselnd gezeigt. Erzeugt Spannung durch die implizite Frage: Wer kommt zuerst an?" },
  { term: "Persistence of Vision", category: "filmsprache", definition: "Physiologisches Phänomen: Das menschliche Gehirn behält ein Bild kurz nach dessen Verschwinden im Gedächtnis. Wenn Bilder schnell genug wechseln (ab ca. 16 Bilder pro Sekunde), nimmt das Gehirn sie als kontinuierliche Bewegung wahr. Grundprinzip des Kinos." },
  { term: "Phantasmagoria", category: "filmsprache", year: "1790er", definition: "Spektakelformat des 18. und frühen 19. Jahrhunderts: Mit der Laterna Magica wurden Geister und Schreckensbilder auf Rauch oder dünne Leinwände projiziert. Das erste \"Kino\" war ein Horrorshow-Zelt auf dem Jahrmarkt." },
  { term: "Tableau", category: "filmsprache", definition: "Frontale Totale, wie auf einer Theaterbühne: Die Kamera steht fest, die Schauspieler agieren vor ihr wie vor einem Publikum. Stilprinzip der frühen Filmgeschichte (Méliès, frühe Lumières), das von Griffith zugunsten des Schnitts überwunden wurde." },
  { term: "Tiefenschärfe", category: "filmsprache", year: "1941", definition: "Optisches Phänomen: Der Bereich, in dem das Bild scharf ist, erstreckt sich von nah bis weit. Von Orson Welles und Kameramann Gregg Toland in Citizen Kane (1941) als Stilmittel eingesetzt: Alles im Bild ist gleichzeitig scharf – der Zuschauer entscheidet selbst, wohin er schaut." },
  { term: "Tondramaturgie", category: "filmsprache", year: "1931", definition: "Der bewusste dramaturgische Einsatz von Ton, Musik und Stille als erzählerisches Mittel. Fritz Langs M (1931) gilt als erstes Meisterwerk der Tondramaturgie: Das Pfeifmotiv des Mörders ist nicht nur Klang, sondern Erzählung." },
  { term: "Uncanny Valley", category: "filmsprache", definition: "Psychologisches Phänomen: Wenn eine digitale Figur oder ein KI-generiertes Bild fast, aber nicht ganz wie ein Mensch aussieht, erzeugt das Unbehagen. Benannt nach dem japanischen Robotiker Masahiro Mori. Im Kontext von KI-Video: Das Uncanny Valley schließt sich, wenn generierte Bilder von echten nicht mehr zu unterscheiden sind." },
  // Bewegungen
  { term: "Dogme 95", category: "bewegung", year: "1995", definition: "Von Lars von Trier und Thomas Vinterberg verfasstes Filmmanifest: Nur Handkamera, Originallicht, keine Spezialeffekte, keine Genrefilme, kein Regisseur-Credit. Die \"Vows of Chastity\" als Gegenreaktion auf den CGI-Überfluss der 1990er Jahre – Befreiung durch Beschränkung." },
  { term: "Expressionismus", category: "bewegung", year: "1919", definition: "Filmästhetik des deutschen Stummfilms: Schräge Winkel, extreme Schatten, expressionistische Kulissen spiegeln die innere Zerrissenheit der Figuren wider. Caligari (1920), Nosferatu (1922), Metropolis (1927). Beeinflusste den amerikanischen Film Noir der 1940er Jahre." },
  { term: "Film Noir", category: "bewegung", year: "1940er", definition: "Amerikanische Filmästhetik der 1940er und 50er Jahre: Hartes Licht, tiefe Schatten, schräge Winkel, moralische Ambiguität. Technisch eine Frage der Beleuchtung – wenig Licht, gezielt gesetzt. Der Deutsche Expressionismus, amerikanisiert." },
  { term: "ILM", category: "technik", year: "1975", definition: "Industrial Light & Magic. Von George Lucas für Star Wars (1977) gegründetes Spezialeffektstudio. Entwickelte wegweisende Techniken für optische und digitale Spezialeffekte, darunter die CGI-Dinosaurier in Jurassic Park (1993) und das LED-Volume-System StageCraft (2019)." },
  { term: "Neorealismo", category: "bewegung", year: "1944", definition: "Italienische Filmbewegung nach dem Zweiten Weltkrieg: Außenaufnahmen, Laiendarsteller, natürliches Licht, soziale Themen. Vittorio De Sica, Roberto Rossellini. Die Kamera geht auf die Straße. Vorläufer der Nouvelle Vague und des Dokumentarfilms." },
  { term: "New Hollywood", category: "bewegung", year: "1967", definition: "Amerikanische Filmgeneration der späten 1960er und 1970er Jahre: Scorsese, Coppola, Spielberg, Lucas. Brachten das europäische Autorenkino nach Amerika – persönliche Geschichten, komplexe Charaktere, unkonventionelle Strukturen. Endete mit dem Blockbuster-Zeitalter ab 1975." },
  { term: "Nouvelle Vague", category: "bewegung", year: "1958", definition: "Französische Filmbewegung der späten 1950er und 1960er Jahre: Godard, Truffaut, Varda, Chabrol. Leichte Kameras, natürliches Licht, Straßendrehs statt Studioproduktionen. Etablierte die Auteur-Theorie und den Jump Cut als Stilmittel." },
  // Formate
  { term: "4:3", category: "format", definition: "Seitenverhältnis des frühen Kinos und des analogen Fernsehens. Annähernd quadratisch. Wurde vom Kino mit dem Breitbildformat überwunden, als das Fernsehen in den 1950er Jahren zur Konkurrenz wurde." },
  { term: "2.35:1", category: "format", definition: "Anamorphotisches Breitbildformat, eingeführt mit CinemaScope (1953). Heute Standardformat für epische Spielfilme. Existiert, weil das Fernsehen 4:3 hatte." },
  { term: "4K", category: "format", year: "2007", definition: "Digitale Auflösung von ca. 4096 × 2160 Pixeln (Kino) bzw. 3840 × 2160 Pixeln (UHD). Mit der RED ONE (2007) erstmals für unabhängige Filmemacher erschwinglich. Heute Standard in der Filmproduktion." },
  { term: "Virtual Production", category: "technik", year: "2019", definition: "Produktionsverfahren, bei dem digitale Umgebungen in Echtzeit auf LED-Wänden oder in Computern gerendert und direkt in die Kamera aufgenommen werden. Ermöglicht vollständige Kontrolle über Licht und Umgebung ohne Außendreh. Entwickelt von ILM für The Mandalorian." },
  { term: "VFX", category: "technik", definition: "Visual Effects. Visuelle Spezialeffekte, die in der Post-Production digital hinzugefügt oder verändert werden. Unterschied zu praktischen Effekten (am Set): VFX entstehen am Computer." },
  { term: "Bokeh", category: "filmsprache", definition: "Japanischer Begriff für die ästhetische Qualität des unscharfen Bereichs eines Fotos oder Filmbildes. Flaches Bokeh (geringe Schärfentiefe) erzeugt einen filmischen Look – der Hintergrund verschwimmt, das Motiv hebt sich ab. Mit der DSLR-Revolution (2008) für alle zugänglich." },
  { term: "Dynamikumfang", category: "technik", definition: "Der Bereich zwischen dem hellsten und dunkelsten Bereich, den ein Aufnahmemedium gleichzeitig darstellen kann. Filmisches Material hat traditionell einen höheren Dynamikumfang als digitale Sensoren – ein Grund, warum analoge Aufnahmen oft \"weicher\" wirken." },
  { term: "Doppelbelichtung", category: "technik", year: "1896", definition: "Technik, bei der dasselbe Filmstück zweimal belichtet wird, sodass zwei Bilder übereinander erscheinen. Von Méliès als Tricktechnik entdeckt und systematisch eingesetzt. Heute digital als \"Compositing\" realisiert." },
  { term: "Compositing", category: "technik", definition: "Digitales Zusammenfügen mehrerer Bildebenen zu einem finalen Bild. Modernes Äquivalent zum Schüfftan-Verfahren und zur Doppelbelichtung. Grundlage aller modernen VFX-Produktionen." },
  { term: "Seitenverhältnis", category: "format", definition: "Das Verhältnis von Breite zu Höhe eines Filmbildes. Bestimmt maßgeblich die visuelle Wirkung: 4:3 wirkt kompakt und intim, 2.35:1 episch und weit. Die Geschichte des Seitenverhältnisses ist eine Geschichte der Konkurrenz zwischen Kino und Fernsehen." },
];

export const milestoneTable = [
  { year: "1833", technik: "Phénakistiskop", filmsprache: "Grundprinzip der Bewegungsillusion" },
  { year: "1878", technik: "Muybridge: Horse in Motion", filmsprache: "Erste Bewegungssequenz aus Fotos" },
  { year: "1895", technik: "Cinématographe (Lumière)", filmsprache: "Erste öffentliche Kinovorführung" },
  { year: "1902", technik: "Stoppkameratrick (Méliès)", filmsprache: "Erste Tricktechnik, erste Sci-Fi" },
  { year: "1908–15", technik: "Leichtere Kameras", filmsprache: "Close-Up, Parallelmontage (Griffith)" },
  { year: "1921", technik: "Schnittexperiment", filmsprache: "Kuleschow-Effekt: Bedeutung zwischen Bildern" },
  { year: "1927", technik: "Tonfilm / Blimp", filmsprache: "Kamera erstarrt, dann Befreiung" },
  { year: "1932–39", technik: "Technicolor 3-Strip", filmsprache: "Farbe als dramaturgisches Mittel" },
  { year: "1941", technik: "Tiefenschärfe / Weitwinkel", filmsprache: "Citizen Kane – Kamera als Erzähler" },
  { year: "1953", technik: "CinemaScope", filmsprache: "Breitbild als Antwort auf TV" },
  { year: "1958", technik: "Arriflex 35 (leicht)", filmsprache: "Nouvelle Vague, Jump Cut, Handkamera" },
  { year: "1975", technik: "Steadicam", filmsprache: "Fließende Bewegung ohne Dolly" },
  { year: "1977", technik: "ILM / Dolby Stereo", filmsprache: "Spezialeffekte und Ton als Erlebnis" },
  { year: "1989", technik: "Avid Media Composer", filmsprache: "Digitaler Schnitt revolutioniert Post-Production" },
  { year: "1993", technik: "CGI (Jurassic Park)", filmsprache: "Fotorealistisches CGI – Wendepunkt" },
  { year: "1995", technik: "Dogme 95", filmsprache: "Gegenreaktion: Befreiung durch Beschränkung" },
  { year: "1999", technik: "Bullet Time (Matrix)", filmsprache: "Physisch unmögliche Kamerabewegungen" },
  { year: "2008", technik: "Canon 5D Mark II", filmsprache: "DSLR-Revolution, Indie-Film für alle" },
  { year: "2012", technik: "Dolby Atmos / Digitale Projektion", filmsprache: "Ende des 35mm-Filmstreifens im Kino" },
  { year: "2019", technik: "LED-Volume (ILM StageCraft)", filmsprache: "Virtual Production als neuer Standard" },
  { year: "2024", technik: "OpenAI Sora", filmsprache: "Text-to-Video – Grundsatzfragen" },
];
