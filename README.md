# rns-download
Utility for downloading release notes from the Release Notes Service

## Installation
```npm i -g rns-download```

## Basic Usage
Get help
```rns-download -h```

Download Release notes in markdown format
```rns-download -p <<YOUR_PROJECT_ID>> -v <<SEMANTIC_VERSION>> -s [all|minor|patch] -o <<OUTPATH/ReleaseNotes.md>>```
