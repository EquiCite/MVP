# About the Data

EquiCite uses open bibliographic records (initially from [OpenAlex](https://openalex.org)) and applies curation to better represent HBCU-affiliated scholarship.

---

## Sources & Terms
- **OpenAlex** — open, community-maintained bibliographic data.  
  See their [terms](https://docs.openalex.org/download-snapshot/snapshot-licensing) for attribution and usage guidelines.  
- EquiCite does **not** redistribute the entire OpenAlex dataset. Instead, we work with curated subsets relevant to HBCU institutions.

---

## Curation Pipeline (MVP)
1. Build a seed list of HBCU institutions (names, aliases, identifiers such as ROR or GRID).  
2. Query or subset works with HBCU affiliations.  
3. Export minimal fields into `data/works.json` for use in the demo app.  
4. Flag anomalies for community fix-ups (e.g. messy author affiliations).

---

## Known Caveats
- **Affiliation strings** are messy: one author may map to multiple IDs.  
- **Institution mergers/renames** can cause duplicates or missing works.  
- **Citation formats** in the MVP are placeholders — users should verify citations before publishing.  

---

## Attribution
If you use EquiCite data subsets, screenshots, or curated lists in your work, please cite both **OpenAlex** and **EquiCite**.  
