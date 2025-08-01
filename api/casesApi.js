import apiUtils from "./apiUtils";

const GET_ALL_CASES = "Cases/GetCases";
const GET_CASE_BY_ID = "Cases/GetCase/";
const GET_CASE_BY_NAME = "Cases/GetCaseByName?caseName=";
const ADD_CASE = "Cases/AddCase";
const TAG_CASE = "Cases/TagCase/";
const DELETE_CASE = "Cases/DeleteCase/";
const UPDATE_CASE = "Cases/UpdateCase/";
const UPDATE_STAGE = "Cases/UpdateStage/";
const GET_TAGGED_CASES = "Cases/TaggedCases";
const LINK_WHATSAPP_GROUP = "Cases/LinkWhatsappGroup/";
const GET_TAGGED_CASES_BY_NAME = "Cases/TaggedCasesByName?caseName=";

const GET_MAIN_SCREEN_DATA = "Data/GetMainScreenData";

const GET_CASE_TYPE_BY_NAME = "CaseTypes/GetCaseTypeByName?caseTypeName=";
const DELETE_CASE_TYPE = "CaseTypes/DeleteCaseType/";
const GET_CASE_TYPE_BY_ID = "CaseTypes/GetCaseType/";
const UPDATE_CASE_TYPE = "CaseTypes/UpdateCaseType/";
const GET_ALL_CASES_TYPE = "CaseTypes/GetCasesType";
const GET_ALL_CASES_TYPE_FOR_FILTER = "CaseTypes/GetCasesTypeForFilter";
const ADD_CASE_TYPE = "CaseTypes/AddCaseType";

const casesApi = {
  getMainScreenData: async () => {
    return await apiUtils.get(GET_MAIN_SCREEN_DATA);
  },

  getAllCases: async () => {
    return await apiUtils.get(GET_ALL_CASES);
  },

  getAllTaggedCases: async () => {
    return await apiUtils.get(GET_TAGGED_CASES);
  },

  getCaseById: async (caseId) => {
    return await apiUtils.get(`${GET_CASE_BY_ID}${caseId}`);
  },

  getCaseByName: async (caseName) => {
    return await apiUtils.get(`${GET_CASE_BY_NAME}${encodeURIComponent(caseName)}`);
  },

  addCase: async (caseData) => {
    return await apiUtils.post(ADD_CASE, caseData);
  },

  updateCaseById: async (CaseId, caseData) => {
    return await apiUtils.put(`${UPDATE_CASE}${CaseId}`, caseData);
  },

  updateStageById: async (CaseId, caseData) => {
    return await apiUtils.put(`${UPDATE_STAGE}${CaseId}`, caseData);
  },

  deleteCaseById: async (CaseId) => {
    return await apiUtils.delete(`${DELETE_CASE}${CaseId}`);
  },

  tagCaseById: async (CaseId, caseData) => {
    return await apiUtils.put(`${TAG_CASE}${CaseId}`, caseData);
  },

  getTaggedCaseByName: async (caseName) => {
    return await apiUtils.get(`${GET_TAGGED_CASES_BY_NAME}${encodeURIComponent(caseName)}`);
  },

  linkWhatsappGroup: async (CaseId, whatsappLink) => {
    return await apiUtils.put(`${LINK_WHATSAPP_GROUP}${CaseId}`, whatsappLink);
  },
};

export const casesTypeApi = {
  getAllCasesType: async () => {
    return await apiUtils.get(GET_ALL_CASES_TYPE);
  },

  getAllCasesTypeForFilter: async () => {
    return await apiUtils.get(GET_ALL_CASES_TYPE_FOR_FILTER);
  },

  getCaseTypeById: async (caseTypeId) => {
    return await apiUtils.get(`${GET_CASE_TYPE_BY_ID}${caseTypeId}`);
  },

  getCaseTypeByName: async (caseTypeName) => {
    return await apiUtils.get(`${GET_CASE_TYPE_BY_NAME}${encodeURIComponent(caseTypeName)}`);
  },

  deleteCaseTypeById: async (CaseTypeId) => {
    return await apiUtils.delete(`${DELETE_CASE_TYPE}${encodeURIComponent(CaseTypeId)}`);
  },

  addCaseType: async (caseTypeData) => {
    return await apiUtils.post(ADD_CASE_TYPE, caseTypeData);
  },

  updateCaseTypeById: async (caseTypeId, caseTypeData) => {
    return await apiUtils.put(`${UPDATE_CASE_TYPE}${caseTypeId}`, caseTypeData);
  }
};

export default casesApi;
