export class CreateArticleDto{
  description:string;
  title:string;
}

export class CreateArticle extends CreateArticleDto{
  feelingId:number;
}