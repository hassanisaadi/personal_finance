import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const institutions = [
  { id: 1, name: "RBC", logo_url: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8d/Royal_Bank_of_Canada_Logo.svg/1200px-Royal_Bank_of_Canada_Logo.svg.png" },
  { id: 2, name: "TD", logo_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/TD_Bank_logo.svg/1200px-TD_Bank_logo.svg.png" },
  { id: 3, name: "BMO", logo_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/BMO_Harris_Bank_logo.svg/1200px-BMO_Harris_Bank_logo.svg.png" }
];

const optionalFields = [
  { key: "account_type", label: "Account Type" },
  { key: "monthly_fee", label: "Monthly Fee" },
  { key: "annual_fee", label: "Annual Fee" },
  { key: "interest", label: "Interest" },
  { key: "overdraft_limit", label: "Overdraft Limit" },
  { key: "cash_back", label: "Cash Back (Rewards)" },
  { key: "credit_limit", label: "Credit Limit" },
  { key: "description", label: "Description" },
  { key: "currency", label: "Currency" },
  { key: "current_balance", label: "Current Balance" }
];

function CreateAccountsPage() {
  const navigate = useNavigate();
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [accountData, setAccountData] = useState({ account_name: "" });
  const [selectedFields, setSelectedFields] = useState({});
  const [createdAccounts, setCreatedAccounts] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check if user is authenticated
    const userLoggedIn = localStorage.getItem('userToken');
    if (!userLoggedIn) {
      navigate('/login'); // Redirect to login page if not authenticated
    }
  }, [navigate]);

  const handleInstitutionSelect = (institution) => {
    setSelectedInstitution(institution);
    setMessage("");
    setAccountData({ account_name: "" });
    setSelectedFields({});
  };

  const handleCheckboxChange = (e, key) => {
    setSelectedFields({
      ...selectedFields,
      [key]: e.target.checked
    });
  };

  const handleInputChange = (e, key) => {
    setAccountData({
      ...accountData,
      [key]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedInstitution) {
      setMessage("Please select an institution.");
      return;
    }
    if (!accountData.account_name) {
      setMessage("Account name is required.");
      return;
    }

    let payload = { account_name: accountData.account_name };
    optionalFields.forEach(field => {
      if (selectedFields[field.key]) {
        payload[field.key] = accountData[field.key];
      }
    });

    setCreatedAccounts([...createdAccounts, { institution: selectedInstitution.name, ...payload }]);

    setAccountData({ account_name: "" });
    setSelectedFields({});
    setMessage("Account created successfully.");
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken'); // Remove token
    navigate('/'); // Redirect to landing page
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Create Account</h2>
      
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-danger me-2" onClick={handleLogout}>Logout</button>
        <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>Skip</button>
      </div>

      {message && <div className="alert alert-info">{message}</div>}

      {!selectedInstitution ? (
        <>
          <h4>Select an Institution</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Logo</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {institutions.map(inst => (
                <tr key={inst.id}>
                  <td>
                    <img src={inst.logo_url} alt={inst.name} style={{ width: "50px" }}/>
                  </td>
                  <td>{inst.name}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => handleInstitutionSelect(inst)}>
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <h4>Creating Account for: {selectedInstitution.name}</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">
                Account Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                value={accountData.account_name}
                onChange={(e) => handleInputChange(e, 'account_name')}
                required
              />
            </div>

            <h5>Optional Fields</h5>
            {optionalFields.map(field => (
              <div key={field.key} className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`checkbox-${field.key}`}
                  checked={selectedFields[field.key] || false}
                  onChange={(e) => handleCheckboxChange(e, field.key)}
                />
                <label className="form-check-label" htmlFor={`checkbox-${field.key}`}>
                  {field.label}
                </label>
                {selectedFields[field.key] && (
                  <input
                    type="text"
                    className="form-control mt-2"
                    placeholder={field.label}
                    value={accountData[field.key] || ""}
                    onChange={(e) => handleInputChange(e, field.key)}
                  />
                )}
              </div>
            ))}

            <button type="submit" className="btn btn-success me-2">Create Account</button>
            <button className="btn btn-secondary" onClick={() => setSelectedInstitution(null)}>Choose Different Institution</button>
          </form>
        </>
      )}

      {createdAccounts.length > 0 && (
        <div className="mt-4">
          <h4>Created Accounts</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Institution</th>
                <th>Account Name</th>
                {optionalFields.map(field => (
                  <th key={field.key}>{field.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {createdAccounts.map((account, index) => (
                <tr key={index}>
                  <td>{account.institution}</td>
                  <td>{account.account_name}</td>
                  {optionalFields.map(field => (
                    <td key={field.key}>{account[field.key] || '-'}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CreateAccountsPage;
