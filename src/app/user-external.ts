//Using external API
export interface UserExternalServerResponse {
  count: number;
  results: [];
  //Object
  name: { title: string; first: string; last: string };
  //Object
  dob: { date: string; age: number };
  cell: number;
  gender: string;
}
