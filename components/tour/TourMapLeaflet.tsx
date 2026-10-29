"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./tour-map.css";
import { useEffect, useMemo, useRef } from "react";
import { Timeline, fmt, type LatLng } from "@/lib/tour-core";
import type { Tour } from "@/lib/tours";

/*
 * The Leaflet map (docs/13 §4, §7). Plain Leaflet, created once; React only passes in the tour,
 * the video time and what to do on a click. Loaded with next/dynamic (no server render), because
 * Leaflet needs `window`.
 */

const STATIC = "https://static-map-tiles-api.arcgis.com/arcgis/rest/services/static-basemap-tiles-service/v1/";
const POWERED = 'Powered by <a href="https://www.esri.com/">Esri</a>';

// Site colors for drawing on the map (app/globals.css). Leaflet styles take plain values.
const C = { linen: "#fbf6ee", hearth: "#3b2f2a", gold: "#f2b544", orange: "#ffc88f", sageDeep: "#5e7a4f" };

export type TourMapProps = {
  apiKey: string;
  tours: Tour[];
  index: number;
  time: number;
  playing: boolean;
  follow: boolean;
  /** Increases each time the visitor asks for the whole route. */
  fitRequest: number;
  reduce: boolean;
  start: { center: LatLng; zoom: number };
  onSeek: (t: number) => void;
  onSelect: (index: number) => void;
  /** The tiles won't load (missing, expired or blocked key): show the fallback panel instead. */
  onFail: () => void;
};

type Active = {
  travelled: L.Polyline;
  marker: L.Marker | null;
};

export function TourMapLeaflet(props: TourMapProps) {
  const { apiKey, tours, index, time, playing, follow, fitRequest, reduce, start } = props;
  const el = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const otherLayer = useRef<L.LayerGroup | null>(null);
  const activeLayer = useRef<L.LayerGroup | null>(null);
  const active = useRef<Active | null>(null);
  // The active route, and whether the view is still the automatic fit (true until the visitor pans or zooms).
  const routeRef = useRef<LatLng[]>([]);
  const autoView = useRef(true);
  // Latest callbacks and settings, read inside Leaflet's own event handlers.
  const live = useRef(props);
  useEffect(() => {
    live.current = props;
  });

  const tour = tours[index];
  const timeline = useMemo(() => new Timeline(tour), [tour]);

  // Create the map once.
  useEffect(() => {
    const node = el.current;
    if (!node) return;
    const still = live.current.reduce;
    const map = L.map(node, {
      center: start.center,
      zoom: start.zoom,
      maxZoom: 20,
      scrollWheelZoom: false, // the page scrolls past the map; zoom with the buttons, a pinch or double-click
      zoomAnimation: !still,
      fadeAnimation: !still,
      markerZoomAnimation: !still,
    });
    map.attributionControl.setPrefix(false);

    // Satellite imagery plus Esri's labels overlay. Attribution is a license condition: keep it visible.
    const imagery = L.tileLayer(
      `https://ibasemaps-api.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}?token=${apiKey}`,
      { maxNativeZoom: 19, maxZoom: 20, attribution: `${POWERED} | Imagery: Esri, Vantor, Earthstar Geographics, and the GIS User Community` },
    );
    const labels = L.tileLayer(`${STATIC}arcgis/imagery/labels/static/tile/{z}/{y}/{x}?token=${apiKey}`, {
      tileSize: 512,
      zoomOffset: -1,
      maxNativeZoom: 19,
      maxZoom: 20,
      attribution: "Labels: Esri, TomTom, Garmin, FAO, NOAA, USGS, © OpenStreetMap contributors",
    });

    // If a layer's first tiles all fail (bad or expired key, or this address isn't on the key's
    // list), give up calmly. Watch both: the imagery service can answer a bad key with tiles anyway,
    // while the labels service refuses it (401, "Token Invalid").
    const watch = (layer: L.TileLayer) => {
      let loaded = 0;
      let failed = 0;
      layer.on("tileload", () => loaded++);
      layer.on("tileerror", () => {
        failed++;
        if (failed >= 3 && loaded === 0) live.current.onFail();
      });
    };
    watch(imagery);
    watch(labels);
    imagery.addTo(map);
    labels.addTo(map);

    otherLayer.current = L.layerGroup().addTo(map);
    activeLayer.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    // Once the visitor moves the map themselves, a resize no longer re-fits it.
    const handOver = () => {
      autoView.current = false;
    };
    node.addEventListener("pointerdown", handOver);
    node.addEventListener("keydown", handOver);

    // The map's box changes size with the video's shape and the window: keep the route fitted.
    const ro = new ResizeObserver(() => {
      map.invalidateSize({ animate: false });
      if (autoView.current) fitToRoute(map, routeRef.current, true);
    });
    ro.observe(node);

    return () => {
      node.removeEventListener("pointerdown", handOver);
      node.removeEventListener("keydown", handOver);
      ro.disconnect();
      map.remove();
      mapRef.current = null;
      active.current = null;
    };
    // The map is built once; later changes arrive through the effects below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Draw the other tours (faint, clickable) and the active one; fit the view to it.
  useEffect(() => {
    const map = mapRef.current;
    const others = otherLayer.current;
    const layer = activeLayer.current;
    if (!map || !others || !layer) return;
    others.clearLayers();
    layer.clearLayers();
    map.invalidateSize({ animate: false });

    tours.forEach((t, i) => {
      if (i === index || !t.route || t.route.length < 2) return;
      L.polyline(t.route, { color: C.linen, opacity: 0.55, weight: 3, dashArray: "1 7", lineCap: "round", className: "tour-map-other" })
        .bindTooltip(t.title, { sticky: true, className: "tour-map-tag", direction: "top", offset: [0, -8] })
        .on("click", () => live.current.onSelect(i))
        .addTo(others);
    });

    const path = timeline.path;
    const route = path.pts as LatLng[];
    let travelled = L.polyline([], { color: C.gold, weight: 6, opacity: 1, lineCap: "round", interactive: false });
    if (route.length >= 2) {
      L.polyline(route, { color: C.hearth, weight: 9, opacity: 0.25, lineCap: "round", interactive: false }).addTo(layer);
      L.polyline(route, { color: C.linen, weight: 5, opacity: 1, dashArray: "10 8", lineCap: "butt", interactive: false }).addTo(layer);
      travelled = travelled.addTo(layer);
      // A wide, invisible line on top catches clicks: jump the video to that point on the route.
      L.polyline(route, { color: C.hearth, weight: 26, opacity: 0, className: "tour-map-hit" })
        .on("click", (e: L.LeafletMouseEvent) => {
          const hit = path.project([e.latlng.lat, e.latlng.lng]);
          if (hit) live.current.onSeek(timeline.timeAt(hit.m));
        })
        .addTo(layer);
      L.circleMarker(route[0], { radius: 6, color: C.linen, weight: 2, fillColor: C.sageDeep, fillOpacity: 1, interactive: false }).addTo(layer);
      L.circleMarker(route[route.length - 1], { radius: 6, color: C.linen, weight: 2, fillColor: C.hearth, fillOpacity: 1, interactive: false }).addTo(layer);
    }

    // Landmarks: orange dots that jump to their moment.
    tour.landmarks.forEach((l) => {
      const pos = timeline.positionAt(l.t);
      if (!pos) return;
      L.circleMarker(pos.ll, { radius: 5.5, color: C.hearth, weight: 1.5, fillColor: C.orange, fillOpacity: 1 })
        .bindTooltip(`${fmt(l.t)} · ${l.label}`, { className: "tour-map-tag", direction: "top", offset: [0, -6] })
        .on("click", () => live.current.onSeek(l.t))
        .addTo(layer);
    });

    const first = timeline.positionAt(0);
    const marker = first
      ? L.marker(first.ll, {
          interactive: false,
          keyboard: false,
          zIndexOffset: 1000,
          icon: L.divIcon({
            className: "tour-marker-icon",
            iconSize: [36, 36],
            iconAnchor: [18, 18],
            html: `<span class="tour-marker"><span class="tour-marker-arrow"${path.length > 0 ? "" : " hidden"}></span><span class="tour-marker-dot"></span></span>`,
          }),
        }).addTo(layer)
      : null;
    active.current = { travelled, marker };

    routeRef.current = route;
    autoView.current = true;
    fitToRoute(map, route, live.current.reduce);
  }, [tours, index, tour, timeline]);

  // Follow the video: move the marker, grow the travelled line, keep the marker in view.
  useEffect(() => {
    const map = mapRef.current;
    const a = active.current;
    if (!map || !a) return;
    const pos = timeline.positionAt(time);
    if (!pos) return;
    a.marker?.setLatLng(pos.ll);
    const arrow = a.marker?.getElement()?.querySelector<HTMLElement>(".tour-marker-arrow");
    if (arrow) arrow.style.transform = `rotate(${pos.heading}deg)`;
    if (timeline.path.pts.length >= 2) a.travelled.setLatLngs(timeline.path.slice(0, pos.m));
    // Pan only when the marker nears the edge, so pressing Play doesn't move a freshly fitted view.
    if (follow && playing && !map.getBounds().pad(-0.08).contains(pos.ll)) {
      map.panTo(pos.ll, { animate: !reduce, duration: 0.6 });
    }
  }, [time, timeline, follow, playing, reduce, index]);

  // "Whole route".
  useEffect(() => {
    if (fitRequest > 0 && mapRef.current) {
      autoView.current = true;
      fitToRoute(mapRef.current, timeline.path.pts as LatLng[], live.current.reduce);
    }
  }, [fitRequest, timeline]);

  return <div ref={el} role="region" aria-label="Map of the tour route" className="tour-map size-full min-h-[380px] lg:min-h-[320px]" />;
}

function fitToRoute(map: L.Map, route: LatLng[], reduce: boolean) {
  if (route.length >= 2) map.fitBounds(L.latLngBounds(route), { padding: [40, 40], maxZoom: 18, animate: !reduce });
  else if (route.length === 1) map.setView(route[0], 18, { animate: !reduce });
}
