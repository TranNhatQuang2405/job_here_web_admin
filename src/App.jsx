import "./App.css";
import { I18nextProvider } from "react-i18next";
import i18n from "./Config/Translate/i18n.js";
import PageTemplate from "Layout/Common/PageTemplate/PageTemplate";
import { SignInPage } from "Layout/Authentication";
import MainPage from "Layout/MainPage/MainPage.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "Config/Provider";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <PageTemplate>
          <Routes>
            <Route path="/SignIn" element={<SignInPage />}></Route>
            <Route path="/Home" element={<MainPage />}></Route>
            <Route path="*" element={<Navigate to="/Home" />} />
          </Routes>
        </PageTemplate>
      </AuthProvider>
    </I18nextProvider>
  );
}

export default App;
