let bankData, accessToken, transactions;

// Setters
function setBankData(data) {
  bankData = data;
}

function setAccessToken(token) {
  accessToken = token;
}

function setTransactions(trans) {
  transactions = trans;
}

// Getters
function getBankData() {
  return bankData;
}

function getAccessToken() {
  return accessToken;
}

function getTransactions() {
  return transactions;
}

export default {
  setBankData,
  setAccessToken,
  setTransactions,
  getBankData,
  getAccessToken,
  getTransactions,
};

