export interface Character {
  name: string;
  species: string | string[];
  gender: string;
  homeworld: string;
  id?: number;
}

export interface CharactersResponse {
  characters: Character[];
  paginationResponse: PaginationResponse;
}

export interface PaginationResponse {
  link: string;
  total: string;
}
