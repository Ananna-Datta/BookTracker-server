interface IBook{
    title:string;
    author:string;
    genre:"FICTION"| "NON_FICTION"| "SCIENCE"| "HISTORY"| "BIOGRAPHY"| "FANTASY";
    isbn:string;
    description:string;
    copies:number;
    available?:boolean;
}
interface BookQuery {
  filter?: string;
  sortBy?: string;
  sort?: "asc" | "desc";
  limit?: string;
}
export  {IBook,BookQuery};