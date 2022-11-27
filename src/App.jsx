import "./App.css";
import { I18nextProvider } from "react-i18next";
import i18n from "./Config/Translate/i18n.js";
import PageTemplate from "Layout/Common/PageTemplate/PageTemplate";
import { SignInPage } from "Layout/Authentication";
import {
  MainPage,
  ManageCompany,
  ManageJob,
  ManageUser,
  CompanyInfo,
  JobInfo,
  Report,
} from "Layout";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "Config/Provider";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <PageTemplate>
          <Routes>
            <Route path="/SignIn" element={<SignInPage />} />
            {/* <Route path="/Home" element={<MainPage />} /> */}
            <Route path="/manageCompany" element={<ManageCompany />} />
            <Route path="/companyInfo/:id" element={<CompanyInfo />} />
            <Route path="/manageJob" element={<ManageJob />} />
            <Route path="/jobInfo/:id" element={<JobInfo />} />
            <Route path="/manageUser" element={<ManageUser />} />
            <Route path="/report" element={<Report />} />
            <Route path="*" element={<Navigate to="/manageCompany" />} />
          </Routes>
        </PageTemplate>
      </AuthProvider>
    </I18nextProvider>
  );
}

export default App;
