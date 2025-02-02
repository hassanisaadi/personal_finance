import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const InstitutionSelectionPage = () => {
  const initialInstitutions = [
    { name: "Royal Bank of Canada", logo: "/assets/logos/Royal_Bank_of_Canada-Logo.wine.svg" },
    { name: "National Bank of Canada", logo: "/assets/logos/National_Bank_of_Canada-Logo.wine.svg" },
    { name: "Tangerine", logo: "/assets/logos/Tangerine_Bank-Logo.wine.svg" },
  ];

  const [institutions] = useState(initialInstitutions);
  const [selectedInstitutions, setSelectedInstitutions] = useState([]);
  const [activeInstitutionIndex, setActiveInstitutionIndex] = useState(null);
  const [newAccount, setNewAccount] = useState({ name: "", fee: "", type: "" });

  const addInstitution = (institution) => {
    setSelectedInstitutions((prev) => [...prev, { ...institution, accounts: [] }]);
  };

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setNewAccount((prev) => ({ ...prev, [name]: value }));
  };

  const addAccount = (institutionIndex) => {
    setSelectedInstitutions((prev) => {
      const updated = [...prev];
      updated[institutionIndex].accounts.push({ ...newAccount });
      return updated;
    });
    setNewAccount({ name: "", fee: "", type: "" });
    setActiveInstitutionIndex(null);
  };

  return (
    <div className="bg-light vh-100 d-flex flex-column">
      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <h1 className="navbar-brand">FinanceApp</h1>
        </div>
      </nav>

      {/* Main Section */}
      <div className="container mt-4 flex-grow-1">
        <h2 className="text-center mb-4">Choose Institutions and Add Accounts</h2>

        {/* Institution List */}
        <div className="mb-4">
          <h4>Available Institutions</h4>
          <ul className="list-group">
            {institutions.map((institution, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-center">
                  <img
                    src={institution.logo}
                    alt={institution.name}
                    style={{ width: "40px", height: "40px", marginRight: "10px" }}
                  />
                  {institution.name}
                </div>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => addInstitution(institution)}
                >
                  Add Institution
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Selected Institutions */}
        <div>
          <h4>Selected Institutions</h4>
          {selectedInstitutions.length === 0 && <p>No institutions selected yet.</p>}
          {selectedInstitutions.map((institution, index) => (
            <div key={index} className="card mb-3">
              <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <img
                    src={institution.logo}
                    alt={institution.name}
                    style={{ width: "30px", height: "30px", marginRight: "10px" }}
                  />
                  <span>{institution.name}</span>
                </div>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() =>
                    setActiveInstitutionIndex(
                      activeInstitutionIndex === index ? null : index
                    )
                  }
                >
                  {activeInstitutionIndex === index ? "Close" : "Add Account"}
                </button>
              </div>

              {/* Account Form */}
              {activeInstitutionIndex === index && (
                <div className="card-body">
                  <div className="mb-3">
                    <label htmlFor="accountName" className="form-label">
                      Account Name
                    </label>
                    <input
                      type="text"
                      id="accountName"
                      name="name"
                      value={newAccount.name}
                      onChange={handleAccountChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="accountFee" className="form-label">
                      Account Fee
                    </label>
                    <input
                      type="number"
                      id="accountFee"
                      name="fee"
                      value={newAccount.fee}
                      onChange={handleAccountChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="accountType" className="form-label">
                      Account Type
                    </label>
                    <input
                      type="text"
                      id="accountType"
                      name="type"
                      value={newAccount.type}
                      onChange={handleAccountChange}
                      className="form-control"
                    />
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={() => addAccount(index)}
                  >
                    Add Account
                  </button>
                </div>
              )}

              <ul className="list-group list-group-flush">
                {institution.accounts.length === 0 && (
                  <li className="list-group-item">No accounts added yet.</li>
                )}
                {institution.accounts.map((account, accIndex) => (
                  <li key={accIndex} className="list-group-item">
                    {`Name: ${account.name}, Fee: ${account.fee}, Type: ${account.type}`}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-white text-center py-3">
        <p className="mb-0">© 2025 FinanceApp. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default InstitutionSelectionPage;
