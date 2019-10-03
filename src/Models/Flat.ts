import { EnumFlatRatingColouring } from "Models/Enums";

export interface Flat {
  latitude: number;
  longitude: number;
  img_url: string;
  lister_url: string;
  price: number;
  bedroom_number: number;
  price_formatted: string;
  price_type: string;
  property_type: string;
  title: string;
  updated_in_days: number;
  flat_rating: EnumFlatRatingColouring
}

export class FlatMaker {

  static create(flat: Flat): Flat {
    return {
      bedroom_number: flat.bedroom_number,
      latitude: flat.latitude,
      longitude: flat.longitude,
      img_url: flat.img_url,
      lister_url: flat.lister_url,
      price: flat.price,
      price_formatted: flat.price_formatted,
      price_type: flat.price_type,
      property_type: flat.property_type,
      title: flat.title,
      updated_in_days: flat.updated_in_days,
      flat_rating: FlatMaker.setFlatRating(flat.updated_in_days)
    }
  }

  static setFlatRating (updatedDay: number): EnumFlatRatingColouring {
    if (updatedDay >= 30) {
      return EnumFlatRatingColouring.Old;
    }

    if (updatedDay < 30 && updatedDay >= 20) {
      return EnumFlatRatingColouring.Half;
    }

    if (updatedDay > 10) {
      return EnumFlatRatingColouring.Mid;
    }

    return EnumFlatRatingColouring.New;
  }
}