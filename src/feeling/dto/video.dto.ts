export class CreateVideoDto {
  description:string;
  videoUrl:string;
  title:string;
}
export class CreateVideo extends CreateVideoDto{
  feelingId:number;
}

