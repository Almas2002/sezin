export class CreateExerciseDto{
  description:string;
  name:string;
  seconds:number;
}
export class CreateExercise extends CreateExerciseDto{
  feelingId:number
}