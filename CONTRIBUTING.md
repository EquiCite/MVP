# Contributing to EquiCite

Thanks for your interest in improving EquiCite! This guide explains how to set up your environment and contribute.

---

## Code of Conduct
Please be respectful and constructive.  
See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for details.

---

## How You Can Help
- **Data curation:** improve HBCU institution mapping (names, aliases, IDs), clean up affiliations, de-duplicate authors.  
- **Front-end/UX:** polish search and filters, improve accessibility, add responsive design, refine citation copy UX.  
- **Integrations:** add institution logos via Wikipedia APIs, export (CSV / BibTeX), ORCID linking.  
- **Relevance & quality:** ranking tweaks, query helpers, stop-word lists, synonym maps.  
- **Documentation:** screenshots, quickstart videos, troubleshooting steps.  

---

## Local Setup

### Prerequisites
- **Python 3.10+** (for quick static server)  
- or **Node.js 18+** (for http-server)  

### Run the app locally
**With Python**
```bash
python -m http.server 5173
```
Open http://localhost:5173

**With Node**
```bash
npx http-server . -p 5173
```
Open http://localhost:5173

## Workflow
1. Fork the repo and create a branch:
```bash
git checkout -b feat/<short-description>
```
2. Make your changes.
3. Commit with a clear message (use Conventional Commits if possible).
4. Push your branch and open a Pull Request.
5. Link any relevant issues in your PR description.

## Issue Labels
- good first issue — beginner-friendly tasks
- help wanted — areas where maintainers need support
- data-quality — curation/cleanup tasks
- frontend / infra / docs — specific areas of work

## Review Process
- PRs should be under ~400 lines where possible.
- Include before/after screenshots for UI changes.
- Maintainers will review and may request edits before merging.

## Security
If you find a vulnerability, please do not open a public issue.
Email us as described in SECURITY.md

