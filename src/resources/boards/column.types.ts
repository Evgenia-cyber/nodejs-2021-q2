interface IColumnDataFromRequestBody {
  title: string ;
  order: number ;
 }
 interface IColumn extends IColumnDataFromRequestBody {
   id: string;
 }
 
 export { IColumn, IColumnDataFromRequestBody };