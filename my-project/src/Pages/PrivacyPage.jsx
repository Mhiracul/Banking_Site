import React from "react";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";

const PrivacyPage = () => {
  return (
    <div className="overflow-y-auto oveflow-hidden absolute">
      <Navbar />
      <div className="privacy text-center py-20">
        <h1 className="text-[#e9e7e7] text-5xl font-bold">Privacy Policy</h1>
      </div>
      <div className="bg-white py-10 px-20">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4">
          At XYZ Bank, we take your privacy seriously. This Privacy Policy
          explains how we collect, use, and protect your personal information.
        </p>
        <p className="mb-4">
          We collect personal information from you when you open an account,
          apply for a loan, use our services, or interact with us in any way.
          This information may include your name, address, contact details,
          financial information, and other relevant data necessary for providing
          our banking services.
        </p>
        <p className="mb-4">
          We use your personal information to process your transactions, provide
          you with our banking services, and comply with legal and regulatory
          requirements. We may also use your information to communicate with
          you, improve our services, and personalize your banking experience.
        </p>
        <p className="mb-4">
          XYZ Bank implements strict security measures to protect your personal
          information from unauthorized access, disclosure, or misuse. We
          maintain physical, electronic, and procedural safeguards to ensure the
          confidentiality and integrity of your data.
        </p>
        <p className="mb-4">
          We may share your personal information with trusted third parties who
          assist us in providing our services, such as payment processors or
          credit bureaus. However, we only disclose your information to the
          extent necessary and require these parties to maintain the
          confidentiality and security of your data.
        </p>
        <p className="mb-4">
          We do not sell or rent your personal information to third parties for
          marketing purposes. We may, however, share anonymized and aggregated
          data for research or statistical purposes.
        </p>
        <p className="mb-4">
          You have the right to access, correct, or delete your personal
          information held by XYZ Bank. If you have any questions, concerns, or
          requests regarding your privacy or data protection, please contact our
          customer support team.
        </p>
        <p className="mb-4">
          By using our banking services, you consent to the collection, use, and
          disclosure of your personal information as described in this Privacy
          Policy.
        </p>
        <p className="mb-4">
          This Privacy Policy is subject to change. We encourage you to review
          this page periodically for any updates or revisions.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPage;
