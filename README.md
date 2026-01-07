# EquiCite

Open access discovery tools that surface HBCU-affiliated scholarship and improve research visibility.

**Status:** MVP (actively evolving)  
**Demo:** [Visit the live demo](https://equicite.netlify.app)  
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

## Data Model
[Alt text](https://github.com/EquiCite/MVP/blob/main/img/openalex-schema-1024x967.png)

---

## Quick Start (Local Use)
You can run the MVP locally as a static site.

**With Python**
```bash
python -m http.server 5173
```
Visit http://localhost:5173

**With Node**
```bash
npx http-server . -p 5173
```
Visit http://localhost:5173

**Data Sources**
- OpenAlex (open bibliographic data).
- See ABOUT_THE_DATA.md for license, curation details, and caveats.

**Contributing**

We welcome help with code, data quality, UX, and documentation. See CONTRIBUTING.md for setup and guidelines.
