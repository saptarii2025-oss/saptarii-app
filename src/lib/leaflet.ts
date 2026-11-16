// Lazy leaflet instance to avoid SSR issues
let leafletInstance: typeof import("leaflet") | null = null;

export const getLeaflet = (): typeof import("leaflet") => {
  if (!leafletInstance) {
    if (typeof window === "undefined") {
      throw new Error("Leaflet can only be used on the client side");
    }
    leafletInstance = require("leaflet");
  }
  return leafletInstance!;
};
