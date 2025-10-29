import { Route } from "@angular/router";
import { EditTask } from "../task/edit-task/edit-task";

export const routes: Route[] = [{
      path:'tasks/:id',
      component: EditTask
}];