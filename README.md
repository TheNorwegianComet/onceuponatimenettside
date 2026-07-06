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

- **Filmleder-intro** — nedtelling i «countdown leader»-stil før siden avsløres
- **Buet herotypografi** — «ONCE UPON A TIME» på SVG-kurve over et enormt
  HOLLYWOOD i lagvis retro-skygge, med bokstav-for-bokstav-animasjon
- **Filmkorn** — animert SVG-støy over hele siden
- **Egendefinert markør** — ring + prikk som reagerer på lenker og kort
- **Marquee-bånd** — løpende tekstbånd mellom seksjoner
- **Polaroid-kort** — «The Players» med 3D-tilt på hover
- **Filmstripe** — horisontalt dra-for-å-rulle galleri med sprocket-hull,
  neonskilt og solnedgangsscener i ren CSS/SVG
- **Kinoplakater** — «Tonight's Double Feature» med starburst-badges
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
