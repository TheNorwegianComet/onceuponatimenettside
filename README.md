# Hollywood 1969 🌴

En retro hyllest-nettside inspirert av den Awwwards-vinnende siden for
[*Once Upon a Time in Hollywood*](https://www.awwwards.com/sites/once-upon-a-time-in-hollywood)
(Watson Design Group).

Sommeren 1969, neonskilt, drive-in-kinoer og Tinseltowns siste gullalder —
bygget med ren HTML, CSS og vanilla JavaScript. Ingen rammeverk, ingen byggesteg.

## Kjør lokalt

Åpne `index.html` direkte i nettleseren, eller start en enkel server:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Høydepunkter

- **Filmleder-intro** — nedtelling i «countdown leader»-stil med filmriper
- **Gyllen time-panorama** — hero med sol, dis, åskammer (med Hollywood-skiltet),
  palmer i flere dybdelag og parallakse på rulling; «ONCE UPON A TIME» buet på
  SVG-kurve over et enormt HOLLYWOOD med trykk-forskjøvet skygge
- **Neon-natt** — panorama med stjernehimmel, måne, lyskastere fra en premiere
  og en bysilhuett med flimrende vinduer, under en revet papirkant
- **Trykk-tekstur** — animert filmkorn, eldet papir-vask per seksjon, halvtone
  og bevisst feilregistrert «ink» på titler
- **Plakatpaneler** — «The Players» som serigrafi-aktige paneler (vintage-TV,
  pilotbriller med solnedgangsrefleks, premierestjerne) med 3D-tilt
- **Filmstripe** — dra-for-å-rulle galleri med sprocket-hull, vignetter,
  filmriper og neonskilt i ren CSS/SVG
- **Kinoplakater på teaterteppe** — tape, stiplede rammer og starburst-badges
- **Egendefinert markør** og billettstubb-statistikk som teller opp
- **Respekterer `prefers-reduced-motion`** og fungerer uten JavaScript

## Struktur

```
index.html      – markup for alle seksjoner
css/style.css   – hele det visuelle uttrykket (palett, animasjoner, layout)
js/main.js      – intro, scroll-avsløringer, markør, tilt, filmstripe-drag
fonts/          – selvhostede woff2-fonter (Anton, Shrikhand, Bebas Neue, Work Sans)
```

Siden er helt selvforsynt: ingen eksterne avhengigheter, all grafikk er
CSS-gradienter og inline SVG, og fontene ligger i repoet.

*Uoffisiell fan-hyllest. Ingen tilknytning til Sony Pictures eller filmen.*
