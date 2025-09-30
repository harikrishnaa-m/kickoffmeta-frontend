import { serverURL } from "./serverURL";
import { commonApI } from "./commonApI";

export const sendEmailAPI = (reqBody) => {
  return commonApI("POST", `${serverURL}/api/send-email`, reqBody, {
    "Content-Type": "application/json",
  });
};

//register api
export const registerAPI = (reqBody) => {
  return commonApI("POST", `${serverURL}/api/register`, reqBody, {});
};

//login api
export const loginAPI = (reqBody) => {
  return commonApI("POST", `${serverURL}/api/login`, reqBody, {});
};

//Google login api
export const GoogleloginAPI = (reqBody) => {
  return commonApI("POST", `${serverURL}/api/google-login`, reqBody, {});
};

//add competition
export const addCompetitionAPI = (reqBody, reqHeader) => {
  return commonApI(
    "POST",
    `${serverURL}/api/add-competition`,
    reqBody,
    reqHeader
  );
};

//fetch competitions
export const getAllCompetitionsAPI = (searchKey) => {
  return commonApI(
    "GET",
    `${serverURL}/api/allCompetitions?search=${searchKey}`
  );
};
//fetch competition details
export const getACompetitionAPI = (id) => {
  return commonApI("GET", `${serverURL}/api/competition/${id}`);
};
//stripe
export const createCheckoutSessionAPI = (reqBody) => {
  return commonApI("POST", `${serverURL}/api/create-checkout-session`, reqBody);
};
export const createCheckoutSession1API = (reqBody) => {
  return commonApI(
    "POST",
    `${serverURL}/api/create-checkout-session1`,
    reqBody
  );
};

//add team
export const addTeamAPI = (reqBody, reqHeader) => {
  return commonApI("POST", `${serverURL}/api/add-team`, reqBody, reqHeader);
};
//for updating competition's registeredTeams
export const registerTeamToCompetitionAPI = (reqBody, reqHeader) => {
  return commonApI(
    "PUT",
    `${serverURL}/api/competition/register-team`,
    reqBody,
    reqHeader
  );
};
//for updating activeCompetition array of team
export const addActiveCompetitionToTeamAPI = (reqBody, reqHeader) => {
  return commonApI(
    "PUT",
    `${serverURL}/api/team/add-active-competition`,
    reqBody,
    reqHeader
  );
};
//get users
export const getUserAPI = (reqHeader) => {
  return commonApI("GET", `${serverURL}/api/user`, null, reqHeader);
};
//update user
export const editUserAPI = (reqBody, reqHeader) => {
  return commonApI("PUT", `${serverURL}/api/user`, reqBody, reqHeader);
};

// get teams managed by the logged-in user
export const getTeamsManagedAPI = (reqHeader) => {
  return commonApI("GET", `${serverURL}/api/teamsmanaged`, null, reqHeader);
};

// Get competitions for organizer dashboard
export const getOrganizerDashboardCompetitionsAPI = (reqHeader) => {
  return commonApI(
    "GET",
    `${serverURL}/api/organizer/competitions`,
    null,
    reqHeader
  );
};

export const approveTeamForCompetitionAPI = (reqBody, reqHeader) => {
  return commonApI(
    "PUT",
    `${serverURL}/api/competition/approve-team`,
    reqBody,
    reqHeader
  );
};

export const updateActiveCompetitionStatusAPI = (reqBody, reqHeader) => {
  return commonApI(
    "PUT",
    `${serverURL}/api/team/update-active-competition-status`,
    reqBody,
    reqHeader
  );
};

export const saveNotificationAPI = (reqBody) => {
  return commonApI("POST", `${serverURL}/api/notification`, reqBody);
};

export const getNotificationsAPI = (userId) => {
  return commonApI("GET", `${serverURL}/api/notification/${userId}`);
};

export const addFixtureAPI = (reqBody) => {
  return commonApI("POST", `${serverURL}/api/competition/add-fixture`, reqBody);
};
export const removeFixtureAPI = (reqBody) => {
  return commonApI(
    "POST",
    `${serverURL}/api/competition/remove-fixture`,
    reqBody
  );
};

export const updateFixtureAPI = (reqBody) => {
  return commonApI(
    "PUT",
    `${serverURL}/api/competition/update-fixture`,
    reqBody
  );
};

export const updateFixtureScoreAPI = (reqBody) => {
  return commonApI(
    "PUT",
    `${serverURL}/api/competition/update-fixture-score`,
    reqBody
  );
};

export const getfixtureCompetitionAPI = (id) => {
  return commonApI("GET", `${serverURL}/api/fixturecompetition/${id}`);
};
