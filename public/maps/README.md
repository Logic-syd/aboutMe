# Geographic map extracts

These five simplified GeoJSON files contain real geographic features from OpenStreetMap, not invented street layouts. The files include roads, water, waterways and selected green spaces. They are loaded from this site's origin and rendered using an original Leaflet style; no public tile servers, Google Maps, external runtime API, tracking script or API key is used.

Map data © OpenStreetMap contributors. Licensed under the Open Data Commons Open Database License (ODbL) 1.0: https://opendatacommons.org/licenses/odbl/1-0/. Attribution and copyright details: https://www.openstreetmap.org/copyright. The GeoJSON extracts themselves are distributed under that licence, independently of the application source code. Each feature retains its public OSM way/relation identifier, and each file records its source, retrieval time and actual bounding box.

Generated manually with `python3 scripts/export-place-maps.py` using the official read-only OSM bounding-box API. The export narrows dense extracts to respect the API's 50,000-node limit, filters out buildings and unrelated objects, rounds coordinates to six decimals and simplifies geometry. The site renders the actual source extent. These are curated area maps, not complete, live navigation maps. The dashed reference circle marks a city area or nearby landmark, not a verified office location.
