# NEOM PM Workspace

A lightweight React/Vite workspace designed to help NEOM project teams capture project portfolio data, stage gates, BIM deliverables, LUP registers, and QMS evidence with full traceability to SharePoint/EDMS sources. All data is stored in the browser via `localStorage` and can be exported or imported as JSON for handover.

## Getting started

```bash
npm install
npm run dev
```

The development server runs on port 5173 by default. Use `npm run build` to produce a static bundle for hosting.

## Features

- Portfolio register with geospatial preview (Leaflet optional install)
- Stage gate checklist management aligned to NEOM procedures
- BIM deliverable matrix per discipline and stage
- Land Use Permit tracking aligned to NUP-PRC-001
- QMS evidence tracker for PQD, Method Statements, EHS, and more
- Custom task board with discipline assignments and due dates
- Admin controls for disciplines and LUP review sectors

Install `react-leaflet` and `leaflet` if you want to enable the interactive map tiles in the Portfolio view.
