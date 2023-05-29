export interface MovieDetail {
    id: number;
    name?: string;
    title?: string;
    adult?: boolean;
    video?: boolean;
    vote_average?: number;
    release_date?: string;
    original_title?: string;
    original_language?: string;
    genres?: [{ id?: number; name?: string }];
    spoken_languages?: [{ iso_639_1?: string; name?: string }];
    production_countries?: [{ iso_3166_1?: string; name?: string }];
    production_companies?: [
      {
        name?: string;
        id?: number;
        logo_path?: string | null;
        origin_country?: string;
      }
    ];
    budget?: number;
    status?: string;
    revenue?: number;
    vote_count?: number;
    popularity?: number;
    overview?: string | null;
    poster_path?: string | null;
    backdrop_path?: string | null;
    belongs_to_collection?: null | object;
    runtime?: number | null;
    tagline?: string | null;
    imdb_id?: string | null;
    homepage?: string | null;
}


export interface Actor {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  character: string;
  credit_id: string;
  order: number;
}

export interface ActorsResponse {
  id: number;
  cast: Actor[];
  crew: any[];
}

export interface MoviePoster {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string | null;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface MoviePostersResponse {
  id: number;
  backdrops: MoviePoster[];
  posters: MoviePoster[];
}
