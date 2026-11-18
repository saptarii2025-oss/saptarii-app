import { GooglePlaceDetails, SingleAddressResponseDto } from "@/types/address";
import { Reason, ResponseDto } from "@/types/utils";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_PLACES_URL = process.env.GOOGLE_PLACES_URL;

const findGoogleLocationByQuery = async (
  query: string,
): Promise<ResponseDto<SingleAddressResponseDto | null>> => {
  if (!GOOGLE_API_KEY || !GOOGLE_PLACES_URL) {
    return {
      data: null,
      error: {
        message: "Missing Google API config",
        reason: Reason.EXTERNAL_API_ERROR,
      },
    };
  }

  try {
    const placeId = await getPlaceIdFromGoogle(query);
    if (!placeId) {
      return {
        data: null,
        error: {
          message: "Could not resolve placeId from Google",
          reason: Reason.EXTERNAL_API_ERROR,
        },
      };
    }

    const details = await getPlaceDetailsFromGoogle(placeId);

    if (!details) {
      return {
        data: null,
        error: null,
      };
    }

    const address = mapGoogleDetailsToAddress(placeId, details);
    return { data: address, error: null };
  } catch (error) {
    return {
      data: null,
      error: {
        message: error instanceof Error ? error.message : "Google API error",
        reason: Reason.EXTERNAL_API_ERROR,
      },
    };
  }
};

const findGoogleLocationByPlaceId = async (
  placeId: string,
): Promise<ResponseDto<SingleAddressResponseDto | null>> => {
  if (!GOOGLE_API_KEY || !GOOGLE_PLACES_URL) {
    return {
      data: null,
      error: {
        message: "Missing Google API config",
        reason: Reason.EXTERNAL_API_ERROR,
      },
    };
  }

  try {
    const details = await getPlaceDetailsFromGoogle(placeId);

    if (!details) {
      return {
        data: null,
        error: null,
      };
    }

    const address = mapGoogleDetailsToAddress(placeId, details);
    return { data: address, error: null };
  } catch (error) {
    return {
      data: null,
      error: {
        message: error instanceof Error ? error.message : "Google API error",
        reason: Reason.EXTERNAL_API_ERROR,
      },
    };
  }
};
 
const getPlaceIdFromGoogle = async (query: string): Promise<string | null> => { 
  const baseUrl = GOOGLE_PLACES_URL?.endsWith('/') ? GOOGLE_PLACES_URL.slice(0, -1) : GOOGLE_PLACES_URL;
  
  const res = await fetch(`${baseUrl}/places:autocomplete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": GOOGLE_API_KEY!,
    },
    body: JSON.stringify({
      input: query,
      languageCode: "ro",
      includedRegionCodes: ["ro"],
    }),
  });
  
  const text = await res.text();
  try {
    const json = JSON.parse(text);
    const firstSuggestion = json.suggestions?.[0]?.placePrediction;
    return firstSuggestion?.placeId ?? null;
  } catch (e) {
    console.error("Google Places Autocomplete non-JSON response:", text);
    throw new Error("Google Places API returned an invalid response. Check your GOOGLE_PLACES_URL config.");
  }
};

const getPlaceDetailsFromGoogle = async (
  placeId: string,
): Promise<any | null> => {
  const baseUrl = GOOGLE_PLACES_URL?.endsWith('/') ? GOOGLE_PLACES_URL.slice(0, -1) : GOOGLE_PLACES_URL;

  const res = await fetch(`${baseUrl}/places/${placeId}`, {
    method: "GET",
    headers: {
      "X-Goog-Api-Key": GOOGLE_API_KEY!,
      "X-Goog-FieldMask": "formattedAddress,addressComponents,location",
    },
  });
  
  const text = await res.text();
  try {
    const json = JSON.parse(text);
    return json?.id ? json : null;
  } catch (e) {
    console.error("Google Places Details non-JSON response:", text);
    throw new Error("Google Places API returned an invalid response. Check your GOOGLE_PLACES_URL config.");
  }
};

const findAddressComponentLongName = (
  details: any,
  ...types: string[]
): string => {
  return (
    details.addressComponents?.find((c: any) =>
      types.some((t) => c.types.includes(t)),
    )?.longText ?? ""
  );
};

const mapGoogleDetailsToAddress = (
  placeId: string,
  details: any,
): SingleAddressResponseDto => ({
  placeId,
  displayName: details.formattedAddress,
  street: [
    findAddressComponentLongName(details, "route"),
    findAddressComponentLongName(details, "street_number"),
  ]
    .filter(Boolean)
    .join(" "),
  city: findAddressComponentLongName(
    details,
    "locality",
    "administrative_area_level_2",
  ),
  county: findAddressComponentLongName(details, "administrative_area_level_1"),
  postalCode: findAddressComponentLongName(details, "postal_code"),
  country: findAddressComponentLongName(details, "country"),
  latitude: details.location?.latitude ?? 0,
  longitude: details.location?.longitude ?? 0,
  createdAt: new Date(),
  updatedAt: new Date(),
});

export { findGoogleLocationByQuery, findGoogleLocationByPlaceId };