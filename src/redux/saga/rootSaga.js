import { all } from "@redux-saga/core/effects";
import * as ToDoListSaga from "./ToDoListSaga";
// import { theoDoiActionGetTaskApi } from "./ToDoListSaga";

import * as Cyberbugs from "./CyberBugs/UserCyberbugsSaga";
import * as ProjectCategorySaga from "./CyberBugs/ProjectCategorySaga";
import * as ProjectSaga from "./CyberBugs/ProjectSaga";
import * as TaskTypeSaga from "./CyberBugs/TaskTypeSaga";
import * as PrioritySaga from "./CyberBugs/PrioritySaga";
import * as TaskSaga from "./CyberBugs/TaskSaga";
import * as StatusSaga from "./CyberBugs/StatusSaga"
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
    Cyberbugs.theoDoiGetUser(),
    Cyberbugs.theoDoiAddUserProject(),
    Cyberbugs.theoDoiRemoveUserProject(),
    Cyberbugs.theoDoigetUserByProjectIdSaga(),

    ProjectCategorySaga.theoDoiGetAllProjectCategory(),
    ProjectSaga.theoDoiCreateProjectSaga(),
    ProjectSaga.theoDoiGetListProjectSaga(),
    ProjectSaga.theoDoiUpdateProjectSaga(),
    ProjectSaga.theoDoiDeleteProjectSaga(),
    ProjectSaga.theoDoiGetProjectDetail(),
    ProjectSaga.theoDoiGetAllProjectSaga(),

    TaskTypeSaga.theoDoiGetAllTaskTypeSaga(),
    PrioritySaga.theoDoiGetAllPrioritySaga(),

    TaskSaga.theoDoiCreateTaskSaga(),
    TaskSaga.theoDoiGetTaskDetailSaga(),
    TaskSaga.theoDoiupdateTaskStatusSaga(),
    TaskSaga.theoDoiHandleChangePostApi(),
    TaskSaga.theoDoiUpdateTask(),
    
    StatusSaga.theoDoiGetAllStatusSaga()
  ])
}

