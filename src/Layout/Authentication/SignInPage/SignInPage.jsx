import React, { useState, useRef } from "react";
import {
	Col,
	Row,
	Card,
	Form,
	InputGroup,
	FormControl,
	FormLabel,
	FormCheck,
	FormGroup,
	Button,
	Spinner
} from "react-bootstrap";
import "./SignInPage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeToken } from "Config/Redux/Slice/HeaderRequestSlice";
import { useTranslation } from "react-i18next";
import { authBusiness } from "Business";
import { WarningModal } from "Components/Modal";
import { SetIsPending } from "Config/Redux/Slice/UserSlice";

const SignInPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const [account, setAccount] = useState({
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState(false)
	const modalRef = useRef();

	const onSignIn = async (e) => {
		e.preventDefault();
		setLoading(true)
		let signIn = await authBusiness.SignIn(account.email, account.password);
		setLoading(false)
		if (signIn.data.httpCode === 200) {
			dispatch(changeToken(signIn.data.objectData.token));
			dispatch(SetIsPending());
			navigate("/manageCompany")
		} else {
			modalRef.current.setMessage("Wrong Email or Password!");
			modalRef.current.onToggleModal();
			setAccount({ email: account.email, password: "" });
		}
	};

	const onChangeValueEmail = (e) => {
		setAccount((prev) => ({ ...prev, email: e.target.value }));
	};

	const onChangeValuePassword = (e) => {
		setAccount((prev) => ({ ...prev, password: e.target.value }));
	};

	return (
		<div className="SignIn pt-3 mb-3">
			<WarningModal ref={modalRef} />
			<Row className="justify-content-center">
				<Col lg={4} xs={11}>
					<div className="text-center mb-1">
						<h4 className="SignIn__title">{t("Sign In")}</h4>
						<p className="text-muted">{t("Sign in to continue.")}</p>
					</div>

					<Card className="SignIn__card">
						<Card.Body className="p-3">
							<Form onSubmit={onSignIn}>
								<FormGroup className="mb-3">
									<FormLabel className="SignIn__form-label">
										{t("Email")}
									</FormLabel>
									<InputGroup className="mb-3">
										<InputGroup.Text className="SignIn__input-text">
											<i className="bi bi-person-fill" />
										</InputGroup.Text>

										<FormControl
											className="SignIn__form-control"
											placeholder={t("Enter Email")}
											aria-label="Enter Email"
											onChange={onChangeValueEmail}
											value={account.email}
											required
										/>
									</InputGroup>
								</FormGroup>
								<FormGroup className="mb-3">
									<FormLabel className="SignIn__form-label">
										{t("Password")}
									</FormLabel>
									<InputGroup className="mb-3">
										<InputGroup.Text className="SignIn__input-text">
											<i className="bi bi-lock-fill"></i>
										</InputGroup.Text>

										<FormControl
											className="SignIn__form-control"
											placeholder={t("Enter Password")}
											aria-label="Enter Password"
											type="password"
											autoComplete="true"
											value={account.password}
											onChange={onChangeValuePassword}
											required
										/>
									</InputGroup>
								</FormGroup>
								<Form.Group className="mb-3" controlId="formBasicCheckbox">
									<FormCheck
										className="SignIn__form-check"
										type="checkbox"
										label={t("Remember Me")}
									/>
								</Form.Group>

								<Button
									variant="primary"
									type="submit"
									className="SignIn__btn-signin w-100"
								>
									{loading ? <Spinner animation="border" variant="light" /> : t("Sign In")}
								</Button>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default SignInPage;
