

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

const App = () => {
    const [accounts, setAccounts] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [newAccount, setNewAccount] = useState({
        name: '',
        institution: '',
        account_type: 'checking',
    });
    const [newTransaction, setNewTransaction] = useState({
        description: '',
        amount: '',
        transaction_type: 'cash',
        date: '',
        bank_account: null,
    });

    useEffect(() => {
        fetchAccounts();
        fetchTransactions();
    }, []);

    const fetchAccounts = () => {
        axios.get('/api/bank-accounts/')
            .then(response => setAccounts(response.data))
            .catch(error => console.error('Error fetching accounts:', error));
    };

    const fetchTransactions = () => {
        axios.get('/api/transactions/')
            .then(response => setTransactions(response.data))
            .catch(error => console.error('Error fetching transactions:', error));
    };

    const handleAccountInputChange = (e) => {
        const { name, value } = e.target;
        setNewAccount({ ...newAccount, [name]: value });
    };

    const handleTransactionInputChange = (e) => {
        const { name, value } = e.target;
        setNewTransaction({ ...newTransaction, [name]: value });
    };

    const handleAccountFormSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/bank-accounts/', newAccount)
            .then(() => {
                fetchAccounts();
                setNewAccount({ name: '', institution: '', account_type: 'checking' });
            })
            .catch(error => console.error('Error creating account:', error));
    };

    const handleTransactionFormSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/transactions/', newTransaction)
            .then(() => {
                fetchTransactions();
                setNewTransaction({ description: '', amount: '', transaction_type: 'cash', date: '', bank_account: null });
            })
            .catch(error => console.error('Error creating transaction:', error));
    };

    return (
        <Container className="my-4">
            <h1 className="text-center mb-4">Personal Finance Manager</h1>

            <Row>
                <Col md={6}>
                    <h2>Create Bank Account</h2>
                    <Form onSubmit={handleAccountFormSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Enter account name"
                                value={newAccount.name}
                                onChange={handleAccountInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Institution</Form.Label>
                            <Form.Control
                                type="text"
                                name="institution"
                                placeholder="Enter institution name"
                                value={newAccount.institution}
                                onChange={handleAccountInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Account Type</Form.Label>
                            <Form.Select
                                name="account_type"
                                value={newAccount.account_type}
                                onChange={handleAccountInputChange}
                            >
                                <option value="checking">Checking</option>
                                <option value="savings">Savings</option>
                                <option value="credit">Credit</option>
                            </Form.Select>
                        </Form.Group>
                        <Button type="submit" variant="primary">Add Account</Button>
                    </Form>
                </Col>

                <Col md={6}>
                    <h2>Create Transaction</h2>
                    <Form onSubmit={handleTransactionFormSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                placeholder="Enter transaction description"
                                value={newTransaction.description}
                                onChange={handleTransactionInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="number"
                                name="amount"
                                placeholder="Enter amount"
                                value={newTransaction.amount}
                                onChange={handleTransactionInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Transaction Type</Form.Label>
                            <Form.Select
                                name="transaction_type"
                                value={newTransaction.transaction_type}
                                onChange={handleTransactionInputChange}
                            >
                                <option value="cash">Cash</option>
                                <option value="bank">Bank</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={newTransaction.date}
                                onChange={handleTransactionInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Bank Account</Form.Label>
                            <Form.Select
                                name="bank_account"
                                value={newTransaction.bank_account || ''}
                                onChange={handleTransactionInputChange}
                            >
                                <option value="" disabled>Select Bank Account</option>
                                {accounts.map(account => (
                                    <option key={account.id} value={account.id}>{account.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Button type="submit" variant="primary">Add Transaction</Button>
                    </Form>
                </Col>
            </Row>

            <Row className="mt-5">
                <Col>
                    <h2>Bank Accounts</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Institution</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accounts.map((account, index) => (
                                <tr key={account.id}>
                                    <td>{index + 1}</td>
                                    <td>{account.name}</td>
                                    <td>{account.institution}</td>
                                    <td>{account.account_type}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            <Row className="mt-5">
                <Col>
                    <h2>Transactions</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Type</th>
                                <th>Date</th>
                                <th>Bank Account</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction, index) => (
                                <tr key={transaction.id}>
                                    <td>{index + 1}</td>
                                    <td>{transaction.description}</td>
                                    <td>${transaction.amount}</td>
                                    <td>{transaction.transaction_type}</td>
                                    <td>{transaction.date}</td>
                                    <td>{transaction.bank_account}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default App;