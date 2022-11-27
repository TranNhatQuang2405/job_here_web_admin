import React, { memo } from "react";
import { Nav, Col, Row } from "react-bootstrap";
import { Logo } from "..";
import "./Footer.css";
import { useTranslation } from "react-i18next";

const Footer = () => {
	const { t } = useTranslation();

	return (
		<Row className="Footer__layout bg m-0">
			<Col md={3}>
				<div className="align-items-center justify-content-center mb-1">
					<Logo isDark />
				</div>
				<Nav className="flex-column">
					<Nav.Item>
						<p className="Footer__item-text">
							<i className="bi bi-geo-alt-fill Footer__text-muted" style={{ marginRight: 5 }} />
							{t("jh-address")}
						</p>
					</Nav.Item>
					<Nav.Item>
						<p className="Footer__item-text Footer__text-muted ">
							<i className="bi bi-telephone-fill Footer__text-muted" style={{ marginRight: 5 }} />
							037 999 9999
						</p>
					</Nav.Item>
					<Nav.Item>
						<p className="Footer__item-text Footer__text-muted">
							<i className="bi bi-envelope-fill Footer__text-muted" style={{ marginRight: 5 }} />
							contact@jobhere.com
						</p>
					</Nav.Item>
					<Nav.Item>
						<p className="Footer__item-text Footer__text-muted">
							© Copyright JOB HERE COMPANY
						</p>
					</Nav.Item>

				</Nav>
			</Col>
			<Col md={{ offset: 1, span: 2 }}>
				<div className="text-uppercase fw-bold mb-2 Footer__group-text">
					{t("About Job Here")}
				</div>
				<Nav className="flex-column">
					<Nav.Item>
						<Nav.Link href="#" className="Footer__item-text">
							{t("About Us")}
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link href="#" className="Footer__item-text">
							{t("Terms of Service")}
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link href="#" className="Footer__item-text">
							{t("Privacy Policy")}
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link href="#" className="Footer__item-text">
							{t("Help")}
						</Nav.Link>
					</Nav.Item>
				</Nav>
			</Col>
			<Col md={{ offset: 1, span: 2 }}>
				<div className="text-uppercase fw-bold mb-2 Footer__group-text">
					{t("Community")}
				</div>
				<Nav className="flex-column">
					<Nav.Item>
						<Nav.Link
							href="https://www.facebook.com/jobhere.tech"
							className="Footer__item-text"
						>
							{t("Facebook Fanpage")}
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link
							href="https://www.youtube.com/channel/UCCSfeNxFPc5vUVI-KA9DMVw"
							className="Footer__item-text"
						>
							{t("Offical Youtube Channel")}
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link
							href="https://www.linkedin.com/"
							className="Footer__item-text"
						>
							{t("Linkedin")}
						</Nav.Link>
					</Nav.Item>
				</Nav>
			</Col>
			<Col md={{ offset: 1, span: 2 }}>
				<div className="text-uppercase fw-bold mb-2 Footer__group-text">
					{t("Profile & CV")}
				</div>
				<Nav className="flex-column">
					<Nav.Item>
						<Nav.Link href="#" className="Footer__item-text">
							{t("CV Manage")}
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link href="#" className="Footer__item-text">
							{t("CV Template")}
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link href="#" className="Footer__item-text">
							{t("Write CV Guide")}
						</Nav.Link>
					</Nav.Item>
				</Nav>
			</Col>
		</Row>
	);
};

export default memo(Footer);
