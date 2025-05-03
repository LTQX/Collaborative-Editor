# Kollaborativer Editor

Eine kollaborative Echtzeit-Texteditor-Anwendung, die mit React und WebSocket erstellt wurde.

## Voraussetzungen

- Node.js (v14 oder höher)
- npm (Node Package Manager)

## Installation

1. Klonen Sie das Repository
2. Installieren Sie die Abhängigkeiten für Server und Client:

## Server-Abhängigkeiten installieren
npm installieren

# Client-Abhängigkeiten installieren
cd client
npm installieren


## Starten der Anwendung

Die Anwendung erfordert, dass sowohl der Server als auch der Client gleichzeitig ausgeführt werden. Sie benötigen zwei Terminalfenster.

### Terminal 1 - Starten Sie den Server
## Aus dem Stammverzeichnis
node server.js

Der Server wird auf Port 5002 gestartet.

### Terminal 2 - Starten Sie den Client
# Wechseln Sie in das Client-Verzeichnis
cd client

# Starten Sie den React-Entwicklungsserver
npm start

Der Client wird auf http://localhost:3000 gestartet.

## Zugriff auf die Anwendung

Sobald beide Server laufen:
- Öffnen Sie Ihren Webbrowser
- Navigieren Sie zu http://localhost:3000
- Die Anwendung sollte automatisch geladen werden

## Hinweise zur Entwicklung

- Der Server läuft auf Port 5002
- Der Client läuft auf Port 3000
- Der Entwicklungs-Build ist nicht optimiert. Für die Produktion verwenden Sie `npm run build` im Client-Verzeichnis
- Sie können die Anwendung in Ihrem lokalen Netzwerk unter http://172.20.10.2:3000 betrachten (Ihre IP kann abweichen)

## Beenden der Anwendung

Um die Anwendung zu beenden:
1. Drücken Sie `Strg + C` in jedem Terminalfenster, um beide Server zu stoppen
2. Schließen Sie das Browserfenster 

Übersetzt mit DeepL.com (kostenlose Version)
