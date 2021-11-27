import { all } from "@redux-saga/core/effects";
import * as ToDoListSaga from "./ToDoListSaga";
// import { theoDoiActionGetTaskApi } from "./ToDoListSaga";

import * as Cyberbugs from "./CyberBugs/UserCyberbugsSaga";
import * as ProjectCategorySaga from "./CyberBugs/ProjectCategorySaga";
import * as ProjectSaga from "./CyberBugs/ProjectSaga";
import { theoDoiCreateProjectSaga } from "./CyberBugs/ProjectSaga";


export function* rootSaga() {
 
  yield all([
    // Nghiệp vụ theo dõi các action saga ToDoList
    ToDoListSaga.theoDoiActionGetTaskApi(),
    ToDoListSaga.theoDoiActionAddTaskApi(),
    ToDoListSaga.theoDoiActionDeleteTaskApi(),
    ToDoListSaga.theoDoiActionCheckDoneTaskApi(),
    ToDoListSaga.theoDoiActionRejectTaskApi(),

    // Nghiệp vụ Cyberbugs
    Cyberbugs.theoDoiSignIn(),
    ProjectCategorySaga.theoDoiGetAllProjectCategory(),
    ProjectSaga.theoDoiCreateProjectSaga()
  ])
}
