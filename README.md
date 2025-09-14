# EquiCite

Open access discovery tools that surface HBCU-affiliated scholarship and improve research visibility.

**Status:** MVP (actively evolving)  
**Demo:** [Visit the live demo](https://<your-demo-url>)  
**Docs:** See [CONTRIBUTING.md](CONTRIBUTING.md) if you’d like to get involved.

---

## Why EquiCite?
Research by HBCU scholars is under-indexed and harder to find in mainstream discovery tools.  
EquiCite makes that work more visible by:
- Indexing open bibliographic data (via [OpenAlex](https://openalex.org/)) with an HBCU lens
- Providing simple, fast search & filters
- Generating copy-ready citations

---

## Features (MVP)
- 🔎 Faceted search (author, institution, year, type)
- 📥 Copy citation to clipboard
- 🔗 Direct links to source records
- 🏷️ Institution tagging (seed list of HBCUs)

Planned next:
- Institution logos
- Relevance tuning
- Author disambiguation
- Bulk export

---

## Quick Start (Local Use)
You can run the MVP locally as a static site.

**With Python**
```bash
python -m http.server 5173
